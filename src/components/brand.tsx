import styles from "./ormac.module.css";

export function Brand() {
  return (
    <span className={styles.brand}>
      <svg width="36" height="37" viewBox="0 0 520 540" fill="none" strokeWidth="40" strokeLinecap="round" aria-hidden="true">
        <path stroke="currentColor" d="M153 395 A195 195 0 1 1 442 317 C408 390 297 430 238 497" />
        <path stroke="#D2A84F" d="M250 335 C205 350 138 331 122 273 A148 148 0 1 1 410 266 C395 335 210 414 85 497" />
      </svg>
      <span>ormac</span>
    </span>
  );
}
