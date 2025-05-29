"use client"

import { motion } from "framer-motion"
import { Heart, Leaf } from "lucide-react"

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-green-50 flex flex-col items-center justify-center z-50">
      <motion.div
        className="relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        >
          <Heart className="h-20 w-20 text-green-600 fill-green-200" />
        </motion.div>

        <motion.div
          className="absolute -top-4 -left-4"
          animate={{ rotate: [0, 45, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        >
          <Leaf className="h-8 w-8 text-green-500" />
        </motion.div>

        <motion.div
          className="absolute -top-4 -right-4"
          animate={{ rotate: [0, -45, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        >
          <Leaf className="h-8 w-8 text-green-500" />
        </motion.div>
      </motion.div>

      <motion.h2
        className="mt-8 text-2xl font-serif text-green-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Загрузка приглашения...
      </motion.h2>

      <motion.div
        className="mt-6 w-48 h-1 bg-green-200 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="h-full bg-green-600"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  )
}
