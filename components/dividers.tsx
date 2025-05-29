import { Leaf, Heart, FlowerIcon, Flower2 } from "lucide-react"
import styles from "./dividers.module.css"

export function WaveDivider({ className = "", flip = false }) {
  return (
    <div className={`${styles.waveDivider} ${className}`}>
      <svg
        className={`${styles.waveSvg} ${flip ? styles.waveSvgFlipped : ""}`}
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
      </svg>
    </div>
  )
}

export function LeafDivider({ className = "" }) {
  return (
    <div className={`${styles.leafDivider} ${className}`}>
      <div className={styles.dividerContent}>
        <div className={styles.dividerLine}>
          <div className={styles.dividerHr}></div>
          <div className={styles.dividerIcons}>
            <Leaf className={`${styles.leafIcon} ${styles.leafIconLeft}`} />
            <Heart className={styles.heartIcon} />
            <Leaf className={`${styles.leafIcon} ${styles.leafIconRight}`} />
          </div>
          <div className={styles.dividerHr}></div>
        </div>
      </div>
    </div>
  )
}

export function FlowerDivider({ className = "" }) {
  return (
    <div className={`${styles.flowerDivider} ${className}`}>
      <div className={styles.dividerContent}>
        <div className={styles.dividerLine}>
          <div className={styles.dividerHr}></div>
          <div className={styles.dividerIcons}>
            <FlowerIcon className={styles.flowerIcon} />
            <Flower2 className={styles.flowerIconCenter} />
            <FlowerIcon className={styles.flowerIcon} />
          </div>
          <div className={styles.dividerHr}></div>
        </div>
      </div>
    </div>
  )
}

export function DiamondDivider({ className = "" }) {
  return (
    <div className={`${styles.diamondDivider} ${className}`}>
      <div className={styles.dividerContent}>
        <div className={styles.dividerLine}>
          <div className={styles.dividerHr}></div>
          <div className={styles.diamondIcons}>
            <div className={`${styles.diamond} ${styles.diamond1}`}></div>
            <div className={`${styles.diamond} ${styles.diamond2}`}></div>
            <div className={`${styles.diamond} ${styles.diamond3}`}></div>
            <div className={`${styles.diamond} ${styles.diamond4}`}></div>
            <div className={`${styles.diamond} ${styles.diamond5}`}></div>
            <div className={`${styles.diamond} ${styles.diamond6}`}></div>
            <div className={`${styles.diamond} ${styles.diamond7}`}></div>
          </div>
          <div className={styles.dividerHr}></div>
        </div>
      </div>
    </div>
  )
}
