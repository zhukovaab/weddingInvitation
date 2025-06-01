"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FlowerIcon, Flower2, Gift, Copy, Check } from "lucide-react";
import BotanicalPattern from "./botanical-pattern";
import { useState } from "react";

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

  const [isCopiedLeft, setIsCopiedLeft] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  return (
    <section
      id="gifts"
      className="relative min-h-screen py-20 px-4 bg-green-50"
    >
      {/* Botanical background pattern */}
      <BotanicalPattern />

      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 left-20 opacity-10 hidden md:block"
        animate={rotateAnimation}
      >
        <FlowerIcon className="h-32 w-32 text-green-600" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-20 opacity-10 hidden md:block"
        animate={floatingAnimation}
      >
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
          <h1 className="text-4xl md:text-5xl font-serif text-green-800 mb-4">
            Подарки
          </h1>
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
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
        >
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Друзья! Для нас главное — что вы будете с нами в этот день. Но если
            хотите сделать подарок, мы с радостью примем вашу помощь, которая
            очень нам пригодится для обустройства нового семейного гнездышка.
            Спасибо!
          </p>
          <p className="text-lg font-medium text-green-700">
            С любовью, Георгий и Анастасия
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-8"
          variants={itemVariants}
        >
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
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            <h2 className="text-xl font-serif text-green-700 mb-4">
              Реквизиты для перевода
            </h2>
            <div className="space-y-3 text-left">
              <div>
                <p className="text-sm text-gray-500">Номер телефона:</p>
                <div className="flex items-center gap-2">
                  <p className="font-medium">+7 (906) 076-88-56</p>
                  <motion.button
                    onClick={() => {
                      navigator.clipboard.writeText("+79060768856");
                      setIsCopiedLeft(true);
                      setTimeout(() => setIsCopied(false), 2000);
                    }}
                    className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title={isCopiedLeft ? "Скопировано!" : "Копировать номер"}
                  >
                    <motion.div
                      initial={false}
                      animate={{ scale: isCopied ? [1, 1.2, 1] : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isCopiedLeft ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </motion.div>
                  </motion.button>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Получатель:</p>
                <p className="font-medium">Георгий Т.</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Банк:</p>
                <p className="font-medium">Альфа-Банк или Т-Банк</p>
              </div>
            </div>
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
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            <h2 className="text-xl font-serif text-green-700 mb-4">
              Реквизиты для перевода
            </h2>
            <div className="space-y-3 text-left">
              <div>
                <p className="text-sm text-gray-500">Номер телефона:</p>
                <div className="flex items-center gap-2">
                  <p className="font-medium">+7 (909) 158-15-78</p>
                  <motion.button
                    onClick={() => {
                      navigator.clipboard.writeText("+79091581578");
                      setIsCopied(true);
                      setTimeout(() => setIsCopied(false), 2000);
                    }}
                    className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title={isCopied ? "Скопировано!" : "Копировать номер"}
                  >
                    <motion.div
                      initial={false}
                      animate={{ scale: isCopied ? [1, 1.2, 1] : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isCopied ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </motion.div>
                  </motion.button>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Получатель:</p>
                <p className="font-medium">Анастасия Ж.</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Банк:</p>
                <p className="font-medium">Альфа-Банк или Т-Банк</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
