"use client"
import { motion, useTransform } from "framer-motion"
import Image from "next/image"
import { Heart, Leaf, Calendar, ChevronDown, Flower2, FlowerIcon, Sprout } from "lucide-react"
import styles from "./home-section.module.css"

type HomeSectionProps = {
  scrollYProgress: any
  scrollToSection: (sectionId: string) => void
  personalizedGreeting?: string
  guestData?: any
}

export default function HomeSection({
  scrollYProgress,
  scrollToSection,
  personalizedGreeting,
  guestData,
}: HomeSectionProps) {
  // Animations
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.6])
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50])

  // Parallax effects
  const leafParallax1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const leafParallax2 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const heartParallax = useTransform(scrollYProgress, [0, 1], [0, -150])
  const flowerParallax1 = useTransform(scrollYProgress, [0, 1], [0, -120])
  const flowerParallax2 = useTransform(scrollYProgress, [0, 1], [0, -180])
  const sproutParallax = useTransform(scrollYProgress, [0, 1], [0, -90])

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

  const nameVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: 0.5,
      },
    },
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

  // Personalized greeting based on guest data
  const getPersonalizedGreeting = () => {
    if (personalizedGreeting) {
      return personalizedGreeting
    }

    if (guestData?.name || guestData?.lastname) {
      const fullName = [guestData.name, guestData.lastname].filter(Boolean).join(" ")
      return `Дорогой гость, ${fullName}!`
    }

    return "Дорогой гость!"
  }

  const greeting = getPersonalizedGreeting()

  return (
    <section id="home" className={styles.section}>
      {/* Decorative elements with parallax */}
      <motion.div
        className={`${styles.decorElement} ${styles.decorLeaf1}`}
        style={{ y: leafParallax1 }}
        animate={floatingAnimation}
        custom={1}
      >
        <Leaf className="h-24 w-24 text-green-600 rotate-45" />
      </motion.div>

      <motion.div
        className={`${styles.decorElement} ${styles.decorLeaf2}`}
        style={{ y: leafParallax2 }}
        animate={floatingAnimation}
        custom={2}
      >
        <Leaf className="h-24 w-24 text-green-600 -rotate-45" />
      </motion.div>

      <motion.div
        className={`${styles.decorElement} ${styles.decorHeart}`}
        style={{ y: heartParallax }}
        animate={floatingAnimation}
        custom={3}
      >
        <Heart className="h-16 w-16 text-green-600 fill-green-200" />
      </motion.div>

      <motion.div
        className={`${styles.decorElement} ${styles.decorFlower1}`}
        style={{ y: flowerParallax1 }}
        animate={rotateAnimation}
      >
        <Flower2 className="h-16 w-16 text-green-600" />
      </motion.div>

      <motion.div
        className={`${styles.decorElement} ${styles.decorFlower2}`}
        style={{ y: flowerParallax2 }}
        animate={rotateAnimation}
      >
        <FlowerIcon className="h-16 w-16 text-green-600" />
      </motion.div>

      <motion.div
        className={`${styles.decorElement} ${styles.decorSprout}`}
        style={{ y: sproutParallax }}
        animate={floatingAnimation}
      >
        <Sprout className="h-16 w-16 text-green-600" />
      </motion.div>

      <div className={styles.container}>
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ scale, opacity, y }}
        >
          <motion.div variants={itemVariants} className={styles.iconWrapper}>
             <div className="relative w-16 h-16 mx-auto">
              <Image
                src="/images/ring.png"
                alt="Обручальные кольца"
                width={64}
                height={64}
                className="w-full h-full object-contain"
              />
            </div>
            <div className={styles.leafIconLeft}>
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
            <div className={styles.leafIconRight}>
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
          </motion.div>

          {greeting !== "Дорогой гость!" && (
            <motion.h3 variants={itemVariants} className="text-xl md:text-2xl font-serif text-green-700 mb-4">
              {greeting}
            </motion.h3>
          )}

          <motion.h2 variants={itemVariants} className={styles.subtitle}>
            Приглашаем на свадьбу
          </motion.h2>

          <motion.h1 variants={nameVariants} className={styles.title}>
            Георгия и Анастасии
          </motion.h1>

          <motion.div variants={itemVariants} className={styles.dateWrapper}>
            <Calendar className="h-5 w-5" />
            <span className={styles.dateText}>14 июня 2025</span>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className={styles.imageWrapper}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src={'/images/we.jpg'}
              alt="Георгий и Анастасия"
              fill
              className={styles.image}
            />
            {/* Botanical frame overlay */}
            <div className={styles.imageFrame}>
              <div className={`${styles.frameLeaf} ${styles.frameLeafTopLeft}`}>
                <Leaf className="h-12 w-12 text-green-500 opacity-70 transform -rotate-45" />
              </div>
              <div className={`${styles.frameLeaf} ${styles.frameLeafTopRight}`}>
                <Leaf className="h-12 w-12 text-green-500 opacity-70 transform rotate-45" />
              </div>
              <div className={`${styles.frameLeaf} ${styles.frameLeafBottomLeft}`}>
                <Leaf className="h-12 w-12 text-green-500 opacity-70 transform -rotate-135" />
              </div>
              <div className={`${styles.frameLeaf} ${styles.frameLeafBottomRight}`}>
                <Leaf className="h-12 w-12 text-green-500 opacity-70 transform rotate-135" />
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className={styles.ctaWrapper}>
            <motion.a
              href="#details"
              onClick={() => scrollToSection("details")}
              className={styles.ctaLink}
              whileHover={{ scale: 1.05 }}
            >
              <span className={styles.ctaButton}>Подробнее</span>
              <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
                <ChevronDown className="h-6 w-6 text-green-700" />
              </motion.div>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom decorative border */}
      <div className={styles.bottomBorder}></div>
    </section>
  )
}
