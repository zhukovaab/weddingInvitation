import styles from "./botanical-pattern.module.css"

export default function BotanicalPattern() {
  return (
    <svg className={styles.pattern} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
      <path
        fill="#046307"
        d="M20 20 L25 25 L20 30 L15 25 Z M40 20 L45 25 L40 30 L35 25 Z M60 20 L65 25 L60 30 L55 25 Z M30 40 L35 45 L30 50 L25 45 Z M50 40 L55 45 L50 50 L45 45 Z M20 60 L25 65 L20 70 L15 65 Z M40 60 L45 65 L40 70 L35 65 Z M60 60 L65 65 L60 70 L55 65 Z"
      />
      <path
        fill="#046307"
        d="M10 10 C15 10, 15 15, 10 15 C5 15, 5 10, 10 10 Z M70 10 C75 10, 75 15, 70 15 C65 15, 65 10, 70 10 Z M10 70 C15 70, 15 75, 10 75 C5 75, 5 70, 10 70 Z M70 70 C75 70, 75 75, 70 75 C65 75, 65 70, 70 70 Z"
      />
    </svg>
  )
}
