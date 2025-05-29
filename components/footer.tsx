"use client"

import { motion } from "framer-motion"
import { Leaf } from "lucide-react"
import styles from "./footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.decorLeafLeft}>
        <Leaf className={styles.leafIconLeft} />
      </div>
      <div className={styles.decorLeafRight}>
        <Leaf className={styles.leafIconRight} />
      </div>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <p className={styles.text}>С любовью, Георгий и Анастасия • 14 июня 2025</p>
      </motion.div>
    </footer>
  )
}
