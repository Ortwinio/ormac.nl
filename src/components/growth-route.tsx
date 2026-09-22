import type { Locale } from "@/lib/i18n";
import styles from "./ormac.module.css";

export function GrowthRoute({ locale }: { locale: Locale }) {
  const nl = locale === "nl";
  return (
    <div className={styles.route}>
      <div className={styles.routeTag}>
        <b>Smart capital</b>
        <span>{nl ? "Kapitaal, advisory board en go-to-market in elke fase" : "Capital, advisory board and go-to-market at every stage"}</span>
      </div>
      <svg viewBox="0 0 580 620" role="img" aria-label={nl ? "Van werkend product via seed, early growth en scale-up naar winnende propositie" : "From working product through seed, early growth and scale-up to winning proposition"}>
        <g stroke="#fff" strokeOpacity="0.06"><path d="M0 124H580M0 248H580M0 372H580M0 496H580M116 0V620M232 0V620M348 0V620M464 0V620" /></g>
        <path d="M84 520C170 512 190 430 230 408S300 350 330 318 400 230 440 196 480 140 496 116" stroke="#E2C27F" strokeOpacity="0.22" strokeWidth="22" fill="none" strokeLinecap="round" />
        <path className={styles.routePath} d="M84 520C170 512 190 430 230 408S300 350 330 318 400 230 440 196 480 140 496 116" stroke="#E2C27F" strokeWidth="3" fill="none" strokeLinecap="round" />
        <rect x="52" y="488" width="64" height="64" rx="6" fill="none" stroke="#A9BFB1" strokeWidth="2" strokeDasharray="6 6" />
        <text x="52" y="584" fill="#A9BFB1" fontSize="16" fontWeight="600">{nl ? "Werkend product" : "Working product"}</text>
        <g><circle cx="230" cy="408" r="11" fill="#123C39" stroke="#E2C27F" strokeWidth="3" />
          <text x="252" y="428" fill="#fff" fontSize="17" fontWeight="700">Seed</text>
          <text x="252" y="449" fill="#A9BFB1" fontSize="15">€25k – €50k</text>
        </g>
        <g><circle cx="330" cy="318" r="11" fill="#123C39" stroke="#E2C27F" strokeWidth="3" />
          <text x="352" y="336" fill="#fff" fontSize="17" fontWeight="700">Early growth</text>
          <text x="352" y="357" fill="#A9BFB1" fontSize="15">€50k – €100k</text>
        </g>
        <g><circle cx="440" cy="196" r="11" fill="#123C39" stroke="#E2C27F" strokeWidth="3" />
          <text x="418" y="186" textAnchor="end" fill="#fff" fontSize="17" fontWeight="700">Scale-up</text>
          <text x="418" y="207" textAnchor="end" fill="#A9BFB1" fontSize="15">€50k – €100k {nl ? "per ronde" : "per round"}</text>
        </g>
        <rect x="470" y="62" width="64" height="64" rx="16" fill="#E2C27F" />
        <path d="M488 95l10 10 20-22" stroke="#123C39" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="534" y="152" textAnchor="end" fill="#E2C27F" fontSize="16" fontWeight="600">{nl ? "Winnende propositie" : "Winning proposition"}</text>
      </svg>
    </div>
  );
}
