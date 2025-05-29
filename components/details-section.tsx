"use client";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, TreePine, Palmtree } from "lucide-react";
import BotanicalPattern from "./botanical-pattern";
import dynamic from "next/dynamic";
import styles from "./details-section.module.css";

// Dynamically import the Yandex map component to avoid SSR issues
const YandexMapComponent = dynamic(() => import("@/components/yandex-map"), {
  ssr: false,
  loading: () => (
    <div className="h-96 bg-green-100 animate-pulse rounded-lg"></div>
  ),
});

type VenueImage = {
  src: string;
  alt: string;
  title: string;
  description: string;
};

type DetailsSectionProps = {
  mounted: boolean;
};

export default function DetailsSection({ mounted }: DetailsSectionProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  };

  const rotateAnimation = {
    rotate: [0, 10, 0, -10, 0],
    transition: {
      duration: 8,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  };

  return (
    <section id="details" className={styles.section}>
      {/* Botanical background pattern */}
      <BotanicalPattern />

      {/* Decorative elements */}
      <motion.div
        className={`${styles.decorElement} ${styles.decorTree}`}
        animate={rotateAnimation}
      >
        <TreePine className="h-32 w-32 text-green-700" />
      </motion.div>

      <motion.div
        className={`${styles.decorElement} ${styles.decorPalm}`}
        animate={floatingAnimation}
      >
        <Palmtree className="h-32 w-32 text-green-700" />
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
            y: [50, 0],
            transition: { duration: 0.8 },
          }}
          viewport={{ once: true }}
        >
          Когда и где
        </motion.h1>

        <div className={styles.venuesGrid}>
          <motion.div
            className={styles.venueCard}
            variants={itemVariants}
            whileInView={{
              opacity: [0, 1],
              x: [-50, 0],
              transition: { duration: 0.8, delay: 0.1 },
            }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.03,
              boxShadow:
                "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div className={styles.venueHeader}>
              <div className={styles.venueIconWrapper}>
                <Calendar className={styles.venueIcon} />
              </div>
              <h2 className={styles.venueTitle}>Церемония</h2>
            </div>
            <div className={styles.venueDetails}>
              <p className={styles.venueInfo}>
                <Clock className={styles.venueInfoIcon} />
                14 июня, 13:15
              </p>
              <p className={styles.venueInfo}>
                <MapPin className={styles.venueInfoIcon} />
                Таганский ЗАГС
              </p>
              <p className={styles.venueDescription}>
                Торжественная церемония бракосочетания пройдет в Таганском ЗАГСе
              </p>
              <a
                href="https://yandex.ru/maps/-/CHCxqVjL"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.venueMapLink}
              >
                Посмотреть на карте
              </a>
            </div>
          </motion.div>

          <motion.div
            className={styles.venueCard}
            variants={itemVariants}
            whileInView={{
              opacity: [0, 1],
              x: [50, 0],
              transition: { duration: 0.8, delay: 0.3 },
            }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.03,
              boxShadow:
                "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div className={styles.venueHeader}>
              <div className={styles.venueIconWrapper}>
                <Calendar className={styles.venueIcon} />
              </div>
              <h2 className={styles.venueTitle}>Празднование</h2>
            </div>
            <div className={styles.venueDetails}>
              <p className={styles.venueInfo}>
                <Clock className={styles.venueInfoIcon} />
                14 июня, 15:30
              </p>
              <p className={styles.venueInfo}>
                <MapPin className={styles.venueInfoIcon} />
                Теплоход "Крокус", причал<br/>"Национальный центр Россия"
              </p>
              <p className={styles.venueDescription}>
                Празднование свадьбы пройдет на теплоходе "Крокус"
                <br />
                Место встречи - Москва Сити, причал "Национальный центр Россия"
              </p>
              <a
                href="https://yandex.ru/maps/-/CHCxmK~9"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.venueMapLink}
              >
                Посмотреть на карте
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          whileInView={{
            opacity: [0, 1],
            y: [50, 0],
            transition: { duration: 0.8, delay: 0.5 },
          }}
          viewport={{ once: true }}
        >
          <h2 className={styles.mapTitle}>Карта мест проведения</h2>
          {mounted && <YandexMapComponent />}
        </motion.div>
      </motion.div>
    </section>
  );
}
