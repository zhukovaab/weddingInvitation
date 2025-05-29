"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Flower2, Leaf } from "lucide-react"
import BotanicalPattern from "./botanical-pattern"

type CouplePhoto = {
  src: string
  alt: string
  caption: string
}

type DecorImage = {
  src: string
  alt: string
}

type GallerySectionProps = {
  couplePhotos: CouplePhoto[]
  decorImages: DecorImage[]
}

export default function GallerySection({ couplePhotos, decorImages }: GallerySectionProps) {
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
    <section id="gallery" className="relative min-h-screen py-20 px-4 bg-green-50">
      {/* Botanical background pattern */}
      <BotanicalPattern />

      {/* Decorative elements */}
      <motion.div className="absolute top-20 right-20 opacity-10 hidden md:block" animate={floatingAnimation}>
        <Flower2 className="h-32 w-32 text-green-600" />
      </motion.div>

      <motion.div className="absolute bottom-20 left-20 opacity-10 hidden md:block" animate={rotateAnimation}>
        <Leaf className="h-32 w-32 text-green-600" />
      </motion.div>

      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-serif text-center text-green-800 mb-6"
          variants={itemVariants}
          whileInView={{
            opacity: [0, 1],
            y: [30, 0],
            transition: { duration: 0.8 },
          }}
          viewport={{ once: true }}
        >
          Фотографии
        </motion.h1>

        <motion.p
          className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
          variants={itemVariants}
          whileInView={{
            opacity: [0, 1],
            y: [20, 0],
            transition: { duration: 0.8, delay: 0.2 },
          }}
          viewport={{ once: true }}
        >
          Несколько моментов из нашей истории любви
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {couplePhotos.map((photo, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-md bg-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.01,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div className="relative aspect-[2/3]">
                <Image src={photo.src || "/placeholder.svg"} alt={photo.alt} fill className="object-cover" />
                {/* Botanical corner decorations */}
                <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none">
                  <Leaf className="h-8 w-8 text-green-500 opacity-70 transform -rotate-45" />
                </div>
                <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none">
                  <Leaf className="h-8 w-8 text-green-500 opacity-70 transform rotate-45" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-serif text-green-700">{photo.caption}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.h2
          className="text-2xl md:text-3xl font-serif text-center text-green-700 mb-8 mt-16"
          variants={itemVariants}
          whileInView={{
            opacity: [0, 1],
            y: [30, 0],
            transition: { duration: 0.8 },
          }}
          viewport={{ once: true }}
        >
          Элементы декора
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {decorImages.map((image, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-md"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.01,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div className="relative aspect-square">
                <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
