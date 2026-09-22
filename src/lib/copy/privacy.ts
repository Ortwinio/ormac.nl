import type { Copy } from "./types";
import type { Locale } from "@/lib/i18n";

export const privacyCopy = {
  nl: {
    title: "Privacyverklaring",
    lead: "We gaan zorgvuldig om met je persoonsgegevens. Hier lees je welke gegevens Ormac gebruikt, waarom dat gebeurt en welke keuzes en rechten je hebt.",
    updated: "Laatst bijgewerkt: 22 september 2026",
    controllerTitle: "Wie is verantwoordelijk?",
    controller: "Ormac B.V. is verantwoordelijk voor de verwerking van persoonsgegevens voor deze website en voor vragen en investeringsaanvragen die je aan ons richt.",
    preview: "Als je het aanvraagformulier verstuurt, verwerkt onze server je ingevulde gegevens en documenten en biedt deze via Resend per e-mail aan Ormac aan. De website bewaart je aanvraag niet in een eigen database. Voor verzending moet de menscontrole slagen. Is verzenden niet beschikbaar? Dan toont het formulier dat en kun je het later opnieuw proberen.",
    sections: [
      { id: "gegevens", title: "Welke gegevens gebruiken we?", paragraphs: [
        "Als je het formulier verstuurt of ons mailt, ontvangen we je e-mailadres, je bericht en de gegevens en bijlagen die je zelf meestuurt. Bij een investeringsaanvraag kunnen dit je naam, functie, telefoonnummer, bedrijfsgegevens, financiële informatie, pitchdeck en informatie over je team of mede-investeerders zijn. Stuur alleen persoonsgegevens mee die nodig zijn voor je vraag of aanvraag.",
        "Bij een bezoek aan de website worden technische gegevens, zoals je IP-adres, opgevraagde pagina en browserinformatie, gebruikt om de pagina te kunnen leveren. Hostingdiensten kunnen dergelijke gegevens ook verwerken voor beveiliging en het oplossen van storingen."
      ] },
      { id: "doelen", title: "Waarom gebruiken we deze gegevens?", paragraphs: [
        "We gebruiken contact- en aanvraaggegevens om je vraag te beantwoorden, je investeringsvoorstel te beoordelen en contact met je te onderhouden. Wanneer je zelf om stappen richting een mogelijke overeenkomst vraagt, kan die voorbereiding de grondslag zijn. Voor zakelijk contact met vertegenwoordigers van bedrijven baseren we ons op ons gerechtvaardigde belang om aanvragen te beoordelen en correspondentie te voeren.",
        "Technische gegevens gebruiken we voor ons gerechtvaardigde belang om een werkende en veilige website te bieden. Als een wettelijke verplichting verwerking of bewaring vereist, baseren we ons daarop. Als we voor een apart doel toestemming vragen, kun je die toestemming altijd weer intrekken. Deze website gebruikt geen gegevens voor advertentieprofielen of uitsluitend geautomatiseerde investeringsbeslissingen."
      ] },
      { id: "delen", title: "Met wie delen we gegevens?", paragraphs: [
        "Alleen mensen die je vraag of aanvraag behandelen, hebben de betreffende informatie nodig. We delen een plan alleen met relevante experts of mede-investeerders als dat nodig is voor de beoordeling, en na overleg met jou. We verkopen geen persoonsgegevens.",
        "Dienstverleners voor hosting, e-mail en IT kunnen gegevens verwerken voor hun dienstverlening. Waar zij namens Ormac verwerken, moeten passende afspraken gelden over vertrouwelijkheid, beveiliging en het gebruik van de gegevens. We verstrekken daarnaast gegevens als de wet dat vereist."
      ] },
      { id: "bewaren", title: "Hoe lang bewaren we gegevens?", paragraphs: [
        "We bewaren correspondentie en aanvraaggegevens zolang deze nodig zijn voor het beantwoorden van je vraag, het beoordelen van je voorstel en het afhandelen van de daaruit voortvloeiende contacten of afspraken. Daarna worden ze verwijderd, tenzij een wettelijke bewaarplicht of de afhandeling van een geschil verdere bewaring nodig maakt. De relevante factoren zijn dus de duur van de beoordeling, een eventuele samenwerking en toepasselijke wettelijke verplichtingen. Je kunt ons vragen welke bewaartermijn op jouw gegevens van toepassing is.",
        "De bewaartermijnen van de cookies staan hieronder. Aanvragen worden tijdens verzending tijdelijk op de server verwerkt en daarna via de e-maildienst en onze mailbox bewaard. Voor misbruikbeperking houdt de server maximaal 15 minuten een teller bij met een hash van het e-mailadres; deze teller bevat geen aanvraag of documenten."
      ] },
      { id: "menscontrole", title: "E-mailverzending en menscontrole", paragraphs: [
        "Resend verwerkt de inhoud en bijlagen van je aanvraag om de e-mail af te leveren. Cloudflare Turnstile controleert in de laatste formulierstap of de inzending van een mens komt. Daarbij verwerkt Cloudflare technische gegevens, zoals je IP-adres en browsersignalen, voor beveiliging en het voorkomen van misbruik, op basis van ons gerechtvaardigde belang bij een veilige website. We sturen je aanvraagvelden en documenten niet naar de verificatie-API van Cloudflare.",
        "De menscontrole is geen toestemming voor advertenties. De website activeert geen Turnstile pre-clearance-cookie. Bij vragen over de menscontrole kun je contact opnemen via de contactmogelijkheden op deze website."
      ] },
      { id: "buiten-eer", title: "Verwerking buiten de EER", paragraphs: [
        "Bij het gebruik van internationale dienstverleners kan verwerking buiten de Europese Economische Ruimte aan de orde zijn. Een dergelijke doorgifte mag alleen plaatsvinden met een geldige waarborg, bijvoorbeeld een adequaatheidsbesluit of goedgekeurde standaardcontractbepalingen en, waar nodig, aanvullende maatregelen. Je kunt via de contactmogelijkheden op deze website informatie vragen over de dienstverleners, locaties en waarborgen die op jouw gegevens van toepassing zijn."
      ] },
      { id: "rechten", title: "Je privacyrechten", paragraphs: [
        "Je kunt ons vragen om inzage, correctie of verwijdering van je persoonsgegevens. Afhankelijk van de situatie kun je ook beperking van verwerking of overdracht van gegevens vragen en bezwaar maken tegen verwerking op basis van een gerechtvaardigd belang. Toestemming kun je intrekken zonder dat dit de rechtmatigheid van eerdere verwerking verandert.",
        "Neem voor een privacyverzoek contact met ons op via de contactmogelijkheden op deze website. We kunnen aanvullende informatie vragen om je identiteit te controleren, maar vragen niet standaard om een kopie van je identiteitsbewijs. We reageren in beginsel binnen één maand. Als een verlenging nodig en toegestaan is, laten we dat binnen die maand weten. Je kunt ook een klacht indienen bij de Autoriteit Persoonsgegevens."
      ] },
    ],
    cookiesTitle: "Cookies op deze website",
    cookiesIntro: "We gebruiken alleen functionele cookies. Er zijn geen analytische cookies, advertentiecookies of ingesloten sociale-mediatrackers. Beide cookies worden door deze website zelf geplaatst.",
    cookiePurpose: "Doel", cookieDuration: "Bewaartermijn",
    languagePurpose: "Onthoudt de laatst bezochte taalversie (Nederlands of Engels), zodat de website je taalvoorkeur kan gebruiken.",
    languageDuration: "1 jaar na het instellen of vernieuwen van de taalvoorkeur.",
    noticePurpose: "Onthoudt dat je de cookiemelding hebt gesloten, zodat deze niet bij ieder bezoek terugkomt. Dit is geen toestemming voor tracking.",
    noticeDuration: "180 dagen na het sluiten van de melding.",
    cookieControls: "Via ‘Cookie-informatie’ in de footer kun je de melding opnieuw openen. Je kunt cookies ook verwijderen of blokkeren in je browser. De website blijft bereikbaar; je taalvoorkeur wordt dan mogelijk niet onthouden en de melding kan opnieuw verschijnen.",
    contactTitle: "Vragen en wijzigingen",
    contact: "Heb je vragen over je gegevens? Neem contact met ons op via de contactmogelijkheden op deze website. Als de website of onze verwerking verandert, passen we deze verklaring aan. De datum bovenaan geeft aan wanneer de tekst voor het laatst is bijgewerkt.",
    authority: "Autoriteit Persoonsgegevens",
  },
  en: {
    title: "Privacy statement",
    lead: "We handle your personal data with care. This statement explains which data Ormac uses, why we use it, and your choices and rights.",
    updated: "Last updated: 22 September 2026",
    controllerTitle: "Who is responsible?",
    controller: "Ormac B.V. is responsible for processing personal data for this website and for enquiries and investment proposals you send to us.",
    preview: "When you submit the application form, our server processes your entries and documents and passes them to Resend for email delivery to Ormac. The website does not keep applications in its own database. The human check must succeed before sending. If sending is unavailable, the form tells you and you can try again later.",
    sections: [
      { id: "data", title: "Which data do we use?", paragraphs: [
        "When you submit the form or email us, we receive your email address, message and the information and attachments you choose to send. For an investment proposal, this may include your name, role, phone number, company details, financial information, pitch deck, and information about your team or co-investors. Only include personal data necessary for your enquiry or application.",
        "When you visit the website, technical data such as your IP address, requested page and browser information are used to deliver the page. Hosting services may also process this information for security and troubleshooting."
      ] },
      { id: "purposes", title: "Why do we use this data?", paragraphs: [
        "We use contact and application information to answer your enquiry, assess your investment proposal and stay in touch with you. Where you request steps towards a possible agreement, that preparation may be the legal basis. For business contact with company representatives, we rely on our legitimate interest in assessing proposals and handling correspondence.",
        "We use technical data for our legitimate interest in providing a working, secure website. Where the law requires processing or retention, we rely on that legal obligation. If we ask for consent for a separate purpose, you can withdraw it at any time. This website does not use data for advertising profiles or solely automated investment decisions."
      ] },
      { id: "sharing", title: "Who receives your data?", paragraphs: [
        "Information is needed only by the people handling your enquiry or proposal. We share a plan with relevant experts or co-investors only where needed for assessment, and after consulting you. We do not sell personal data.",
        "Hosting, email and IT service providers may process data to deliver their services. Where they process it on Ormac’s behalf, appropriate arrangements must cover confidentiality, security and use of the data. We also disclose information where required by law."
      ] },
      { id: "retention", title: "How long do we keep data?", paragraphs: [
        "We keep correspondence and application information for as long as needed to answer your enquiry, assess your proposal, and handle the resulting discussions or agreements. It is then deleted unless a legal retention requirement or a dispute requires further retention. The relevant criteria are the duration of the assessment, any resulting relationship and applicable legal obligations. You can ask us which retention period applies to your information.",
        "Cookie lifetimes are listed below. Applications are processed temporarily on the server during sending, then retained by the email service and in our mailbox. To limit abuse, the server keeps an attempt counter with a hash of the email address for up to 15 minutes; this counter contains no application or documents."
      ] },
      { id: "human-check", title: "Email delivery and human verification", paragraphs: [
        "Resend processes your application content and attachments to deliver the email. Cloudflare Turnstile checks in the final form step whether the submission comes from a human. Cloudflare processes technical information such as your IP address and browser signals for security and abuse prevention, based on our legitimate interest in a secure website. We do not send your application fields or documents to Cloudflare’s verification API.",
        "The human check is not consent to advertising. The website does not enable a Turnstile pre-clearance cookie. For questions about the human check, use the contact options on this website."
      ] },
      { id: "outside-eea", title: "Processing outside the EEA", paragraphs: [
        "Using international service providers may involve processing outside the European Economic Area. Such transfers may take place only with a valid safeguard, such as an adequacy decision or approved standard contractual clauses and additional measures where needed. Use the contact options on this website for information about the providers, locations and safeguards applicable to your data."
      ] },
      { id: "rights", title: "Your privacy rights", paragraphs: [
        "You can ask to access, correct or delete your personal data. Depending on the circumstances, you may also request restriction or portability and object to processing based on a legitimate interest. You can withdraw consent without affecting the lawfulness of earlier processing.",
        "For a privacy request, please use the contact options on this website. We may ask for additional information to verify your identity, but do not routinely request a copy of your identity document. We normally respond within one month. If a permitted extension is necessary, we will tell you within that month. You may also complain to the Dutch Data Protection Authority (Autoriteit Persoonsgegevens)."
      ] },
    ],
    cookiesTitle: "Cookies on this website",
    cookiesIntro: "We use only functional cookies. There are no analytics cookies, advertising cookies or embedded social-media trackers. Both cookies are set by this website itself.",
    cookiePurpose: "Purpose", cookieDuration: "Lifetime",
    languagePurpose: "Remembers the last language version visited (Dutch or English), so the website can use your language preference.",
    languageDuration: "1 year after the language preference is set or renewed.",
    noticePurpose: "Remembers that you dismissed the cookie notice so it does not appear on every visit. This does not give consent to tracking.",
    noticeDuration: "180 days after you dismiss the notice.",
    cookieControls: "Use ‘Cookie information’ in the footer to reopen the notice. You can also delete or block cookies in your browser. The website remains accessible; your language preference may no longer be remembered and the notice may reappear.",
    contactTitle: "Questions and updates",
    contact: "For questions about your data, please use the contact options on this website. We update this statement when the website or our processing changes. The date above shows when this text was last updated.",
    authority: "Dutch Data Protection Authority",
  },
} satisfies Record<Locale, Copy["privacy"]>;
