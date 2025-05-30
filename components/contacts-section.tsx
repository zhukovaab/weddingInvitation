"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Sprout, Leaf, Phone, MessageCircle } from "lucide-react"
import BotanicalPattern from "./botanical-pattern"

type Contact = {
  name: string
  role: string
  phone: string
  telegram: string
  image: string
}

type ContactsSectionProps = {
  contacts: Contact[]
}

export default function ContactsSection({ contacts }: ContactsSectionProps) {
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
    <section
      id="contacts"
      className="relative min-h-screen py-20 px-4 bg-white"
      // style={{
      //   backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   backgroundAttachment: "fixed",
      // }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-white/90"></div>

      {/* Botanical background pattern */}
      <BotanicalPattern />

      {/* Decorative elements */}
      <motion.div className="absolute top-40 right-20 opacity-10 hidden md:block" animate={floatingAnimation}>
        <Sprout className="h-32 w-32 text-green-600" />
      </motion.div>

      <motion.div className="absolute bottom-40 left-20 opacity-10 hidden md:block" animate={rotateAnimation}>
        <Leaf className="h-32 w-32 text-green-600 rotate-45" />
      </motion.div>

      <motion.div
        className="max-w-4xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-serif text-center text-green-800 mb-12"
          variants={itemVariants}
          whileInView={{
            opacity: [0, 1],
            y: [30, 0],
            transition: { duration: 0.8 },
          }}
          viewport={{ once: true }}
        >
          Контакты
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
          Если у вас возникли вопросы или вам нужна дополнительная информация, пожалуйста, не стесняйтесь связаться с
          нами или с нашим ведущим.
        </motion.p>

        <motion.div className="grid md:grid-cols-3 gap-8" variants={itemVariants}>
          {contacts.map((contact, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border border-green-100 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.3 },
              }}
            >
              <motion.div
                className="w-32 h-32 mx-auto mb-4 relative overflow-hidden rounded-full border-4 border-green-100"
                whileInView={{
                  scale: [0, 1],
                  transition: { type: "spring", stiffness: 200, damping: 10, delay: index * 0.2 + 0.2 },
                }}
                viewport={{ once: true }}
              >
                <Image src={contact.image || "/placeholder.svg"} alt={contact.name} fill className="object-cover" />
                {/* Botanical frame */}
                <div className="absolute inset-0 border-4 border-transparent pointer-events-none">
                  <div className="absolute top-0 left-0">
                    <Leaf className="h-6 w-6 text-green-500 opacity-70 transform -rotate-45" />
                  </div>
                  <div className="absolute bottom-0 right-0">
                    <Leaf className="h-6 w-6 text-green-500 opacity-70 transform rotate-135" />
                  </div>
                </div>
              </motion.div>
              <h2 className="text-xl font-serif text-green-700 mb-1">{contact.name}</h2>
              <p className="text-gray-500 mb-4">{contact.role}</p>

              <div className="space-y-3">
                <motion.a
                  href={`tel:${contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="flex items-center justify-center gap-2 text-gray-700 hover:text-green-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="h-4 w-4" />
                  <span>{contact.phone}</span>
                </motion.a>
                {contact.telegram &&<motion.a
                  href={`https://t.me/${contact.telegram.substring(1)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-gray-700 hover:text-green-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>{contact.telegram}</span>
                </motion.a>}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
