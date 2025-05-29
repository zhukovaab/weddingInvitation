"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Heart, Leaf, MessageCircle, Phone, Mail } from "lucide-react"
import BotanicalPattern from "@/components/botanical-pattern"

export default function Home() {
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
    <div className="min-h-screen bg-green-50 relative overflow-hidden">
      {/* Botanical background pattern */}
      <BotanicalPattern />

      {/* Decorative elements */}
      <motion.div className="absolute top-20 left-20 opacity-10 hidden md:block" animate={floatingAnimation}>
        <Leaf className="h-32 w-32 text-green-600 rotate-45" />
      </motion.div>

      <motion.div className="absolute top-40 right-20 opacity-10 hidden md:block" animate={rotateAnimation}>
        <Heart className="h-24 w-24 text-green-600 fill-green-200" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-20 opacity-10 hidden md:block"
        animate={floatingAnimation}
        custom={2}
      >
        <Leaf className="h-28 w-28 text-green-600 -rotate-45" />
      </motion.div>

      <motion.div className="absolute bottom-40 right-20 opacity-10 hidden md:block" animate={rotateAnimation}>
        <Heart className="h-20 w-20 text-green-600 fill-green-200" />
      </motion.div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo/Icon */}
          <motion.div
            className="mb-8"
            variants={itemVariants}
            whileInView={{
              scale: [0, 1],
              rotate: [45, 0],
              transition: { type: "spring", stiffness: 200, damping: 10 },
            }}
            viewport={{ once: true }}
          >
            <div className="inline-block p-6 bg-white rounded-full shadow-lg border border-green-100">
              <Image
                src="/images/wedding-logo.png"
                alt="Георгий и Анастасия"
                width={80}
                height={80}
                className="mx-auto"
              />
            </div>
          </motion.div>

          {/* Main content */}
          <motion.div
            className="bg-white p-8 md:p-12 rounded-lg shadow-lg border border-green-100"
            variants={itemVariants}
            whileHover={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
            }}
          >
            <motion.h1 className="text-3xl md:text-4xl font-serif text-green-800 mb-6" variants={itemVariants}>
              Упс! Кажется, приглашение заблудилось 🌿
            </motion.h1>

            <motion.p className="text-lg text-gray-700 mb-6 leading-relaxed" variants={itemVariants}>
              К сожалению, похоже, что персональное приглашение на свадьбу Георгия и Анастасии не дошло до вас.
              Возможно, оно застряло где-то между букетами и бутоньерками! 💐
            </motion.p>

            <motion.p className="text-gray-600 mb-8" variants={itemVariants}>
              Если вы считаете, что должны были получить приглашение, или у вас есть вопросы, пожалуйста, свяжитесь с
              нами любым удобным способом.
            </motion.p>

            {/* Contact options */}
            <motion.div className="grid md:grid-cols-3 gap-4 mb-8" variants={itemVariants}>
              <motion.a
                href="tel:+79091581578"
                className="flex items-center justify-center gap-2 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="h-5 w-5 text-green-600 group-hover:scale-110 transition-transform" />
                <span className="text-green-700 font-medium">Позвонить</span>
              </motion.a>

              <motion.a
                href="https://t.me/girl_with_violin"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="h-5 w-5 text-green-600 group-hover:scale-110 transition-transform" />
                <span className="text-green-700 font-medium">Telegram</span>
              </motion.a>

              <motion.a
                href="mailto:zhukovaab@gmail.com"
                className="flex items-center justify-center gap-2 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="h-5 w-5 text-green-600 group-hover:scale-110 transition-transform" />
                <span className="text-green-700 font-medium">Email</span>
              </motion.a>
            </motion.div>

            <motion.p className="text-sm text-gray-500 italic" variants={itemVariants}>
              "Любовь не знает границ, но приглашения иногда теряются в пути" 💌
            </motion.p>
          </motion.div>

          {/* Footer */}
          <motion.p className="mt-8 text-green-700 font-serif text-lg" variants={itemVariants}>
            С любовью, Георгий и Анастасия 💚
          </motion.p>
        </motion.div>
      </div>

      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-green-100 via-green-200 to-green-100 opacity-50"></div>
    </div>
  )
}
