"use client";

import type React from "react";

import { motion } from "framer-motion";
import { Clock, Sprout, FlowerIcon } from "lucide-react";
import BotanicalPattern from "./botanical-pattern";

type Event = {
  time: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

type ScheduleSectionProps = {
  events: Event[];
};

export default function ScheduleSection({ events }: ScheduleSectionProps) {
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
    <section
      id="schedule"
      className="relative min-h-screen py-20 px-4 bg-white"
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-white/90"></div>

      {/* Botanical background pattern */}
      <BotanicalPattern />

      {/* Decorative elements */}
      <motion.div
        className="absolute top-40 left-10 opacity-10 hidden md:block"
        animate={floatingAnimation}
      >
        <Sprout className="h-32 w-32 text-green-600" />
      </motion.div>

      <motion.div
        className="absolute bottom-40 right-10 opacity-10 hidden md:block"
        animate={rotateAnimation}
      >
        <FlowerIcon className="h-32 w-32 text-green-600" />
      </motion.div>

      <motion.div
        className="max-w-4xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        style={{ position: "relative", zIndex: 200 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-serif text-center text-green-800 mb-12"
          variants={itemVariants}
          whileInView={{
            opacity: [0, 1],
            scale: [0.9, 1],
            transition: { duration: 0.8 },
          }}
          viewport={{ once: true }}
        >
          План мероприятия
        </motion.h1>

        <motion.div className="relative" variants={itemVariants}>
          {/* Timeline line */}
          <motion.div
            className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 bg-green-200 transform md:-translate-x-0.5"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
          ></motion.div>

          {/* Timeline events */}
          <div className="space-y-12">
            {events.map((event, index) => (
              <motion.div
                key={index}
                className={`flex flex-col md:flex-row max-md:origin-left ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className={`md:w-1/2 flex md:pl-0 pl-16 relative ${
                    index % 2 === 0 ? "md:pr-8 md:justify-start" : "md:justify-end"
                  }`}
                >
                  <div
                    className={`bg-white p-5 rounded-lg shadow-md border border-green-100 max-w-sm relative ${
                      index % 2 === 0 ? "md:ml-8" : "md:mr-8"
                    }`}
                  >
                    <h3 className="text-xl font-serif text-green-700 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                  {/* Timeline dot */}
                  <motion.div
                    className={`absolute left-0 ${index % 2 === 0 ? "md:-left-5" : "md:-right-5 md:left-auto"} top-6 md:translate-x-1/2 md:-translate-y-0 -translate-y-1/2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center z-10 shadow-md`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      delay: index * 0.1 + 0.2,
                    }}
                    viewport={{ once: true }}
                  >
                    <div className="text-white flex items-center justify-center w-6 h-6">
                      {event.icon}
                    </div>
                  </motion.div>
                </div>
                <div
                  className={`md:w-1/2 flex items-start justify-start pl-16 md:pr-0 pt-2  ${
                    index % 2 === 0
                      ? "md:justify-end md:pr-8 md:pt-8"
                      : "md:justify-start md:pl-8 md:pt-8"
                  }`}
                >
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-green-500" />
                    <span className="text-lg font-medium text-green-700">
                      {event.time}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
