"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Sprout, CheckCircle2, AlertCircle } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import BotanicalPattern from "./botanical-pattern";
import { useEffect } from "react";
import { Checkbox, Input, Radio } from "antd";

type FormData = {
  fullName: string;
  attendance: "yes" | "no";
  zagsAttendance: "yes" | "no";
  hasEscort: boolean;
  escort: string;
  allergies: string;
  alcoholPreferences: string[];
  comments: string;
};

type GuestData = {
  Id: number;
  name?: string;
  willBe?: boolean;
  drinks?: string;
  allergy?: string;
  comments?: string;
  lastname?: string;
  willBeInZAGS?: boolean;
  lastUpdate?: string;
  escort?: string;
  canAddEscort?: boolean;
  [key: string]: any;
};

type RsvpSectionProps = {
  isSubmitted: boolean;
  isSubmitting: boolean;
  setIsSubmitted: (value: boolean) => void;
  onSubmit: (data: FormData) => Promise<void>;
  guestData?: GuestData;
};

const noop = () => {};

export default function RsvpSection({
  isSubmitted,
  isSubmitting,
  setIsSubmitted,
  onSubmit,
  guestData,
}: RsvpSectionProps) {
  // Replace the alcoholOptions usage with this mapping
  const alcoholMapping = {
    Шампанское: "champagne",
    "Белое вино": "white_vine",
    "Красное вино": "red_vine",
    Водка: "vodka",
    Коньяк: "cognac",
    "Безалкогольные напитки": "nonalcoholic",
  };

  const alcoholOptions = Object.keys(alcoholMapping);

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      fullName: guestData
        ? [guestData.name, guestData.lastname].filter(Boolean).join(" ")
        : "",
      attendance: guestData?.willBe ? "yes" : "no",
      zagsAttendance: guestData?.willBeInZAGS ? "yes" : "no",
      hasEscort: guestData?.escort ? true : false,
      escort: guestData?.escort ? guestData.escort : "",
      allergies: guestData?.allergy || "",
      alcoholPreferences: guestData?.drinks
        ? guestData.drinks
            .split(",")
            .map(
              (backendKey) =>
                Object.keys(alcoholMapping).find(
                  (label) => alcoholMapping[label] === backendKey.trim()
                ) || backendKey
            )
            .filter(Boolean)
        : [],
      comments: guestData?.comments || "",
    },
  });

  // Update form when guestData changes
  useEffect(() => {
    if (guestData) {
      const fullName = [guestData.name, guestData.lastname]
        .filter(Boolean)
        .join(" ");
      reset({
        fullName: fullName,
        attendance: guestData.willBe ? "yes" : "no",
        zagsAttendance: guestData.willBeInZAGS ? "yes" : "no",
        hasEscort: guestData.escort ? true : false,
        escort: guestData.escort ? guestData.escort : "",
        allergies: guestData.allergy || "",
        alcoholPreferences: guestData.drinks
          ? guestData.drinks
              .split(",")
              .map(
                (backendKey) =>
                  Object.keys(alcoholMapping).find(
                    (label) => alcoholMapping[label] === backendKey.trim()
                  ) || backendKey
              )
              .filter(Boolean)
          : [],
        comments: guestData.comments || "",
      });
    }
  }, [guestData, reset]);

  const attendance = watch("attendance");
  const hasEscort = watch("hasEscort");

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

  // Animation variants for form sections
  const sectionVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      marginTop: 0,
      marginBottom: 0,
    },
    visible: {
      opacity: 1,
      height: "auto",
      marginTop: "1.5rem",
      marginBottom: 0,
      transition: {
        height: {
          duration: 0.4,
          ease: "easeInOut",
        },
        opacity: {
          duration: 0.3,
          delay: 0.1,
        },
        marginTop: {
          duration: 0.4,
          ease: "easeInOut",
        },
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      marginTop: 0,
      marginBottom: 0,
      transition: {
        opacity: {
          duration: 0.2,
        },
        height: {
          duration: 0.3,
          delay: 0.1,
          ease: "easeInOut",
        },
        marginTop: {
          duration: 0.3,
          delay: 0.1,
          ease: "easeInOut",
        },
      },
    },
  };
  return (
    <section
      id="rsvp"
      className="relative min-h-screen py-20 px-4 bg-white"
      // style={{
      //   backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   backgroundAttachment: "fixed",
      // }}
    >
      {/* Overlay for better form readability */}
      <div className="absolute inset-0 bg-white/90"></div>

      {/* Botanical background pattern */}
      <BotanicalPattern />

      {/* Decorative elements */}
      <motion.div
        className="absolute top-40 right-10 opacity-10 hidden md:block"
        animate={floatingAnimation}
      >
        <Leaf className="h-32 w-32 text-green-600 rotate-45" />
      </motion.div>

      <motion.div
        className="absolute bottom-40 left-10 opacity-10 hidden md:block"
        animate={rotateAnimation}
      >
        <Sprout className="h-32 w-32 text-green-600" />
      </motion.div>

      <motion.div
        className="max-w-2xl mx-auto relative z-10"
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
          Опрос для гостей
        </motion.h1>

        <motion.p
          className="text-center text-gray-600 mb-12"
          variants={itemVariants}
          whileInView={{
            opacity: [0, 1],
            y: [20, 0],
            transition: { duration: 0.8, delay: 0.2 },
          }}
          viewport={{ once: true }}
        >
          Пожалуйста, заполните форму, чтобы мы могли подготовиться к вашему
          приезду
        </motion.p>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              className="bg-white p-8 rounded-lg shadow-md border border-green-100 text-center"
              initial={{ opacity: 0, scale: 0.9, height: 0 }}
              animate={{ opacity: 1, scale: 1, height: "auto" }}
              exit={{ opacity: 0, scale: 0.9, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 10,
                  delay: 0.2,
                }}
              >
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
              </motion.div>
              <h2 className="text-2xl font-serif text-green-800 mb-4">
                Спасибо за ответ!
              </h2>
              <p className="text-gray-600 mb-6">
                Мы получили вашу информацию и очень рады, что вы сможете
                разделить с нами этот особенный день.
              </p>
              <motion.button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Изменить ответ
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-green-100 overflow-hidden"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileInView={{
                opacity: [0, 1],
                y: [30, 0],
                transition: { duration: 0.8, delay: 0.4 },
              }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ФИО
                  </label>
                  <Controller
                    name="fullName"
                    control={control}
                    rules={{ required: "Пожалуйста, укажите ваше ФИО" }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="fullName"
                        type="text"
                        className={`w-full px-4 py-2 border ${
                          errors.fullName ? "border-red-300" : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                        placeholder="Иван Иванов"
                        onChange={noop}
                      />
                    )}
                  />
                  <AnimatePresence>
                    {errors.fullName && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-1 text-sm text-red-600 flex items-center"
                      >
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.fullName.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Сможете ли вы присутствовать?
                  </label>
                  <div className="space-y-2">
                    <Controller
                      name="attendance"
                      control={control}
                      render={({ field }) => (
                        <Radio.Group
                          className="flex flex-col gap-2"
                          options={[
                            {
                              value: "yes",
                              label: "Да, я буду присутствовать",
                              id: "attendance-yes",
                            },
                            {
                              value: "no",
                              label: "К сожалению, я не смогу присутствовать",
                              id: "attendance-no",
                            },
                          ]}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </div>

                <AnimatePresence>
                  {attendance === "yes" && (
                    <motion.div
                      key="attendance-fields"
                      variants={sectionVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      // className="overflow-hidden"
                    >
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Хотели ли вы присутствовать на церемонии в ЗАГСе?
                          </label>
                          <div className="space-y-2">
                            <Controller
                              name="zagsAttendance"
                              control={control}
                              render={({ field }) => (
                                <Radio.Group
                                  className="flex flex-col gap-2"
                                  options={[
                                    {
                                      value: "yes",
                                      label:
                                        "Да, хотел бы присутствовать на церемонии",
                                      id: "zags-yes",
                                    },
                                    {
                                      value: "no",
                                      label:
                                        "Нет, приду только на празднование",
                                      id: "zags-no",
                                    },
                                  ]}
                                  {...field}
                                />
                              )}
                            />
                          </div>
                          <motion.p
                            className="mt-2 text-xs text-gray-500 italic"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            Обратите внимание: количество мест в ЗАГСе, к
                            сожалению, ограничено. Мы постараемся учесть все
                            пожелания, но не можем гарантировать присутствие
                            всех желающих на церемонии.
                          </motion.p>
                        </div>
                        {guestData?.canAddEscort && (
                          <div>
                            <Controller
                              name="hasEscort"
                              control={control}
                              render={({ field }) => (
                                <div className="flex items-center">
                                  <label className="relative flex items-center">
                                    <Checkbox
                                      id="hasEscort"
                                      checked={field.value}
                                      onChange={(e) =>
                                        field.onChange(e.target.checked)
                                      }
                                      className="mr-2"
                                    />
                                    <div className="text-sm cursor-pointer">
                                      Будет ли кто-то Вас сопровождать?
                                    </div>
                                  </label>
                                </div>
                              )}
                            />

                            <AnimatePresence>
                              {hasEscort && (
                                <motion.div
                                  key="escort-field"
                                  variants={sectionVariants}
                                  initial="hidden"
                                  animate="visible"
                                  exit="exit"
                                  // className="overflow-hidden"
                                >
                                  <label
                                    htmlFor="escort"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                  >
                                    ФИО сопровождающего
                                  </label>
                                  <Controller
                                    name="escort"
                                    control={control}
                                    rules={{
                                      required: hasEscort
                                        ? "Пожалуйста, укажите ФИО сопровождающего"
                                        : false,
                                    }}
                                    render={({ field }) => (
                                      <Input
                                        {...field}
                                        id="escort"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="ФИО сопровождающего"
                                      />
                                    )}
                                  />
                                  <AnimatePresence>
                                    {errors.escort && (
                                      <motion.p
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="mt-1 text-sm text-red-600 flex items-center"
                                      >
                                        <AlertCircle className="h-4 w-4 mr-1" />
                                        {errors.escort.message}
                                      </motion.p>
                                    )}
                                  </AnimatePresence>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}

                        <div>
                          <label
                            htmlFor="allergies"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Есть ли у вас аллергии или пищевые ограничения?
                          </label>
                          <Controller
                            name="allergies"
                            control={control}
                            render={({ field }) => (
                              <Input.TextArea
                                {...field}
                                id="allergies"
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Укажите, если у вас есть аллергии или пищевые ограничения"
                              />
                            )}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Пожелания по алкоголю
                          </label>
                          <motion.div
                            className="grid grid-cols-2 gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, staggerChildren: 0.05 }}
                          >
                            {alcoholOptions.map((option, index) => (
                              <Controller
                                key={index}
                                name="alcoholPreferences"
                                control={control}
                                render={({ field }) => (
                                  <Checkbox
                                    key={option}
                                    value={option}
                                    checked={field.value?.includes(option)}
                                    onChange={(e) => {
                                      const checked = e.target.checked;
                                      const value = e.target.value;
                                      if (checked) {
                                        field.onChange([
                                          ...(field.value || []),
                                          value,
                                        ]);
                                      } else {
                                        field.onChange(
                                          (field.value || []).filter(
                                            (v: string) => v !== value
                                          )
                                        );
                                      }
                                    }}
                                    className="flex items-center"
                                  >
                                    <span className="text-sm text-gray-700">
                                      {option}
                                    </span>
                                  </Checkbox>
                                )}
                              />
                            ))}
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <label
                    htmlFor="comments"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Дополнительные комментарии
                  </label>
                  <Controller
                    name="comments"
                    control={control}
                    render={({ field }) => (
                      <Input.TextArea
                        {...field}
                        id="comments"
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Если у вас есть дополнительные пожелания или вопросы"
                      />
                    )}
                  />
                </div>

                <div className="pt-4">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300 ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    <AnimatePresence mode="wait">
                      {isSubmitting ? (
                        <motion.span
                          key="submitting"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center"
                        >
                          <motion.div
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "linear",
                            }}
                          />
                          Отправка...
                        </motion.span>
                      ) : (
                        <motion.span
                          key="submit"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          Отправить ответ
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
