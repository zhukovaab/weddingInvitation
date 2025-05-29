"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { FlowerIcon, Flower2, Gift } from "lucide-react"
import BotanicalPattern from "./botanical-pattern"

export default function GiftsSection() {
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
    <section id="gifts" className="relative min-h-screen py-20 px-4 bg-green-50">
      {/* Botanical background pattern */}
      <BotanicalPattern />

      {/* Decorative elements */}
      <motion.div className="absolute top-20 left-20 opacity-10 hidden md:block" animate={rotateAnimation}>
        <FlowerIcon className="h-32 w-32 text-green-600" />
      </motion.div>

      <motion.div className="absolute bottom-20 right-20 opacity-10 hidden md:block" animate={floatingAnimation}>
        <Flower2 className="h-32 w-32 text-green-600 opacity-20" />
      </motion.div>

      <motion.div
        className="max-w-3xl mx-auto z-index-10 relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          className="text-center mb-12"
          variants={itemVariants}
          whileInView={{
            opacity: [0, 1],
            y: [30, 0],
            transition: { duration: 0.8 },
          }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block p-4 bg-green-100 rounded-full mb-4"
            whileInView={{
              scale: [0, 1],
              rotate: [45, 0],
              transition: { type: "spring", stiffness: 200, damping: 10 },
            }}
            viewport={{ once: true }}
          >
            <Gift className="h-10 w-10 text-green-600" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-serif text-green-800 mb-4">Подарки</h1>
        </motion.div>

        <motion.div
          className="bg-white p-8 rounded-lg shadow-md border border-green-100 text-center mb-12"
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
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Дорогие гости! Ваше присутствие на нашей свадьбе — уже самый ценный подарок для нас. Но если вы хотите
            порадовать нас чем-то особенным, мы будем благодарны за вклад в наше совместное будущее.
          </p>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Мы мечтаем о путешествии в свадебное путешествие и обустройстве нашего семейного гнездышка. Любая помощь в
            осуществлении этих планов будет для нас бесценна.
          </p>
          <p className="text-lg font-medium text-green-700">С любовью, Георгий и Анастасия</p>
        </motion.div>

        <motion.div className="flex flex-col md:flex-row items-center justify-center gap-8" variants={itemVariants}>
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md border border-green-100 text-center max-w-xs w-full"
            whileInView={{
              opacity: [0, 1],
              x: [-30, 0],
              transition: { duration: 0.8, delay: 0.4 },
            }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            <h2 className="text-xl font-serif text-green-700 mb-4">Перевод по QR-коду</h2>
            <div className="mb-4 bg-white p-4 inline-block rounded-lg border border-green-100">
              <Image
                src="/placeholder.svg?height=200&width=200"
                alt="QR-код для перевода"
                width={200}
                height={200}
                className="mx-auto"
              />
            </div>
            <p className="text-sm text-gray-600">Отсканируйте QR-код для перевода через любое банковское приложение</p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow-md border border-green-100 text-center max-w-xs w-full"
            whileInView={{
              opacity: [0, 1],
              x: [30, 0],
              transition: { duration: 0.8, delay: 0.6 },
            }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            <h2 className="text-xl font-serif text-green-700 mb-4">Реквизиты для перевода</h2>
            <div className="space-y-3 text-left">
              <div>
                <p className="text-sm text-gray-500">Номер карты:</p>
                <p className="font-medium">5555 5555 5555 5555</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Получатель:</p>
                <p className="font-medium">Георгий А.</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Банк:</p>
                <p className="font-medium">Сбербанк</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
