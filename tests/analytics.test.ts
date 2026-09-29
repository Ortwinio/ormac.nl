import assert from 'node:assert/strict';
import { test } from 'node:test';
import { analyticsAllowed, createAnalytics, safePage } from '../src/lib/analytics-core.ts';
import { cookieNotice, parseConsent, type Consent } from '../src/lib/cookie-notice.ts';

function fixture(origin = 'https://ormac.nl', id = 'G-54FCVYT04J') {
  let consent: Consent = 'unset';
  let disabled = true;
  let loads = 0;
  let clears = 0;
  const calls: unknown[][] = [];
  const engine = createAnalytics({
    id, origin, consent: () => consent,
    command: (...args) => calls.push(args),
    load: () => { loads++; }, disable: value => { disabled = value; },
    clearCookies: () => { clears++; }, clearQueue: () => { calls.length = 0; },
  });
  return { engine, calls, setConsent: (value: Consent) => { consent = value; }, state: () => ({ disabled, loads, clears }) };
}

test('old acknowledgements, malformed and expired choices never grant analytics consent', () => {
  const now = 1_800_000_000_000;
  for (const cookie of ['', 'ormac-cookie-notice=2', 'ormac-cookie-consent=granted', 'ormac-cookie-consent=0:granted:1800000000000', `ormac-cookie-consent=1:granted:${now + 1}`, `ormac-cookie-consent=1:granted:${now - cookieNotice.maxAge * 1000}`, 'ormac-cookie-consent=1:granted:NaN']) {
    assert.equal(parseConsent(cookie, now).choice, 'unset');
  }
  for (const choice of ['granted', 'denied']) assert.equal(parseConsent(`ormac-lang=en; ormac-cookie-consent=1:${choice}:${now}`, now).choice, choice);
});

test('no consent or refusal means no script, no events and no Google consent pings', () => {
  const f = fixture();
  for (const choice of ['unset', 'denied'] as const) {
    f.setConsent(choice); f.engine.pageView('/en/'); f.engine.lead('en');
    assert.equal(f.state().disabled, true);
    assert.equal(f.state().loads, 0);
    assert.deepEqual(f.calls, []);
  }
});

test('permission loads Analytics once, with denied advertising and sanitized page data', () => {
  const f = fixture();
  f.setConsent('granted'); f.engine.pageView('/en/?email=private@example.com#contact');
  f.engine.pageView('/en/');
  assert.equal(f.state().loads, 1);
  assert.equal(f.state().disabled, false);
  assert.deepEqual(f.calls[0], ['consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' }]);
  const config = f.calls.find(c => c[0] === 'config')?.[2] as Record<string, unknown>;
  assert.equal(config.send_page_view, false);
  assert.equal(config.allow_google_signals, false);
  assert.equal(config.allow_ad_personalization_signals, false);
  assert.equal(config.cookie_expires, 15552000);
  assert.equal(config.cookie_update, false);
  assert.equal(f.calls.filter(c => c[1] === 'page_view').length, 1);
  assert.ok(!JSON.stringify(f.calls).includes('private@example.com'));
  f.engine.pageView('/en/privacy/');
  assert.equal(f.calls.filter(c => c[1] === 'page_view').length, 2);
});

test('withdrawal immediately disables collection, drops queued measurements and clears cookies', () => {
  const f = fixture();
  f.setConsent('granted'); f.engine.pageView('/');
  const cleared = f.state().clears;
  f.setConsent('denied'); f.engine.sync(); f.engine.lead('nl'); f.engine.pageView('/privacy/');
  assert.equal(f.state().disabled, true);
  assert.ok(f.state().clears > cleared);
  assert.equal(f.calls.filter(c => c[0] === 'event').length, 0);
  assert.equal((f.calls.at(-1)?.[2] as Record<string, string>).analytics_storage, 'denied');
  f.setConsent('granted'); f.engine.pageView('/privacy/');
  assert.equal(f.calls.filter(c => c[1] === 'page_view').length, 1);
});

test('consent expiry blocks conversions even before the UI updates', () => {
  const f = fixture();
  f.setConsent('granted'); f.engine.pageView('/');
  f.setConsent('unset'); f.engine.lead('nl');
  assert.equal(f.state().disabled, true);
  assert.equal(f.calls.filter(c => c[1] === 'generate_lead').length, 0);
});

test('conversion events contain only a fixed form name and language', () => {
  const f = fixture(); f.setConsent('granted'); f.engine.pageView('/en/'); f.engine.lead('en');
  assert.deepEqual(f.calls.at(-1), ['event', 'generate_lead', { language: 'en', form_name: 'investment_plan', send_to: 'G-54FCVYT04J' }]);
});

test('localhost, preview domains and missing or malformed IDs cannot send measurements', () => {
  for (const [origin, id] of [['http://127.0.0.1:43130', 'G-54FCVYT04J'], ['https://preview.vercel.app', 'G-54FCVYT04J'], ['https://ormac.nl.attacker.com', 'G-54FCVYT04J'], ['https://ormac.nl', ''], ['https://ormac.nl', 'G-bad&value']]) {
    const f = fixture(origin, id); f.setConsent('granted'); f.engine.pageView('/');
    assert.equal(f.state().loads, 0); assert.deepEqual(f.calls, []);
  }
  assert.equal(analyticsAllowed('G-54FCVYT04J', 'https://www.ormac.nl'), true);
  assert.equal(safePage('/private-person-name'), '/not-found');
});
