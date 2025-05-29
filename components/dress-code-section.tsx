"use client"

import { motion } from "framer-motion"
import { Flower2, Leaf, Sparkles } from "lucide-react"
import BotanicalPattern from "./botanical-pattern"
import styles from "./dress-code-section.module.css"

export default function DressCodeSection() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  }

  const rotateAnimation = {
    rotate: [0, 10, 0, -10, 0],
    transition: {
      duration: 8,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  }

  return (
    <section id="dress-code" className={styles.section}>
      {/* Botanical background pattern */}
      <BotanicalPattern />

      {/* Decorative elements */}
      <motion.div className={`${styles.decorElement} ${styles.decorFlower}`} animate={floatingAnimation}>
        <Flower2 className="h-32 w-32 text-green-600" />
      </motion.div>

      <motion.div className={`${styles.decorElement} ${styles.decorLeaf}`} animate={rotateAnimation}>
        <Leaf className="h-32 w-32 text-green-600" />
      </motion.div>

      <motion.div
        className={styles.container}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h1
          className={styles.title}
          variants={itemVariants}
          whileInView={{
            opacity: [0, 1],
            y: [30, 0],
            transition: { duration: 0.8 },
          }}
          viewport={{ once: true }}
        >
          Дресс код
        </motion.h1>

        <motion.div
          className={styles.card}
          variants={itemVariants}
          whileInView={{
            opacity: [0, 1],
            y: [50, 0],
            transition: { duration: 0.8, delay: 0.2 },
          }}
          viewport={{ once: true }}
          whileHover={{
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
        >
          <div className={styles.iconWrapper}>
            <div className={styles.iconCircle}>
              <Sparkles className={styles.icon} />
            </div>
          </div>

          <h2 className={styles.subtitle}>Праздничная одежда</h2>

          <p className={styles.text}>
            Дорогие гости! Для нашего торжества мы выбрали праздничный дресс-код. Наденьте, пожалуйста, нарядную одежду,
            в которой вам будет комфортно и празднично.
          </p>

          <p className={styles.text}>
            Особых требований к цветовой гамме нет, но обращаем ваше внимание, что оформление свадьбы будет выполнено
            преимущественно в зеленых тонах.
          </p>

          <div className={styles.colorPalette}>
            <div className={`${styles.colorSwatch} ${styles.swatch1}`}></div>
            <div className={`${styles.colorSwatch} ${styles.swatch2}`}></div>
            <div className={`${styles.colorSwatch} ${styles.swatch3}`}></div>
            <div className={`${styles.colorSwatch} ${styles.swatch4}`}></div>
            <div className={`${styles.colorSwatch} ${styles.swatch5}`}></div>
            <div className={`${styles.colorSwatch} ${styles.swatch6}`}></div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
