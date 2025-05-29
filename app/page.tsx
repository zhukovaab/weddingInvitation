"use client"

import { useState, useEffect, useRef } from "react"
import { useScroll, useSpring } from "framer-motion"
import { redirect } from "next/navigation"

// Components
import Header from "@/components/header"
import HomeSection from "@/components/home-section"
import DetailsSection from "@/components/details-section"
import ScheduleSection from "@/components/schedule-section"
import RsvpSection from "@/components/rsvp-section"
import GiftsSection from "@/components/gifts-section"
import ContactsSection from "@/components/contacts-section"
import DressCodeSection from "@/components/dress-code-section"
import Footer from "@/components/footer"
import { WaveDivider, LeafDivider, FlowerDivider } from "@/components/dividers"

// Icons
import { HeartHandshake, Camera, Ship, Utensils, Music, Sparkles, Cake } from "lucide-react"

type FormData = {
  fullName: string
  attendance: "yes" | "no"
  plusOnes: boolean
  guests: { name: string }[]
  allergies: string
  alcoholPreferences: string[]
  comments: string
}

export default function Home() {
  // Redirect to a default record or to a selection page
  redirect("/1")

  const [activeSection, setActiveSection] = useState("home")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Scroll-based animations
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  // Section refs for intersection observer
  const homeRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)
  const scheduleRef = useRef<HTMLDivElement>(null)
  const rsvpRef = useRef<HTMLDivElement>(null)
  const giftsRef = useRef<HTMLDivElement>(null)
  const contactsRef = useRef<HTMLDivElement>(null)
  const dressCodeRef = useRef<HTMLDivElement>(null)

  // Menu items
  const menuItems = [
    { id: "home", label: "Главная" },
    { id: "details", label: "Когда и где" },
    { id: "schedule", label: "План мероприятия" },
    { id: "rsvp", label: "Опрос" },
    { id: "gifts", label: "Подарки" },
    { id: "contacts", label: "Контакты" },
    { id: "dress-code", label: "Дресс код" },
  ]

  // Alcohol options for the form
  const alcoholOptions = [
    "Шампанское",
    "Белое вино",
    "Красное вино",
    "Водка",
    "Виски",
    "Коньяк",
    "Безалкогольные напитки",
  ]

  // Timeline events
  const events = [
    {
      time: "13:15",
      title: "Церемония бракосочетания",
      description: "Торжественная церемония в Таганском ЗАГСе",
      icon: <HeartHandshake className="h-5 w-5" />,
    },
    {
      time: "14:00",
      title: "Фотосессия",
      description: "Памятные фотографии с гостями",
      icon: <Camera className="h-5 w-5" />,
    },
    {
      time: "16:00",
      title: "Сбор гостей",
      description: "Встреча гостей на теплоходе 'Крокус', Москва Сити",
      icon: <Ship className="h-5 w-5" />,
    },
    {
      time: "16:30",
      title: "Отправление теплохода",
      description: "Начало праздничного круиза по Москве-реке",
      icon: <Ship className="h-5 w-5" />,
    },
    {
      time: "17:00",
      title: "Праздничный ужин",
      description: "Изысканные блюда и напитки",
      icon: <Utensils className="h-5 w-5" />,
    },
    {
      time: "18:30",
      title: "Развлекательная программа",
      description: "Конкурсы, танцы и музыка",
      icon: <Music className="h-5 w-5" />,
    },
    {
      time: "21:00",
      title: "Свадебный торт",
      description: "Разрезание свадебного торта",
      icon: <Cake className="h-5 w-5" />,
    },
    {
      time: "23:00",
      title: "Завершение вечера",
      description: "Возвращение теплохода, прощание с гостями",
      icon: <Sparkles className="h-5 w-5" />,
    },
  ]

  // Contact information
  const contacts = [
    {
      name: "Георгий",
      role: "Жених",
      phone: "+7 (999) 123-45-67",
      telegram: "@george_wedding",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Анастасия",
      role: "Невеста",
      phone: "+7 (999) 765-43-21",
      telegram: "@anastasia_wedding",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Алексей",
      role: "Ведущий",
      phone: "+7 (999) 111-22-33",
      telegram: "@alex_host",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  // Venue images
  const venueImages = [
    {
      src: "/placeholder.svg?height=500&width=800",
      alt: "Таганский ЗАГС",
      title: "Таганский ЗАГС",
      description: "Место проведения церемонии бракосочетания",
    },
    {
      src: "/placeholder.svg?height=500&width=800",
      alt: "Теплоход Крокус",
      title: "Теплоход 'Крокус'",
      description: "Место проведения праздничного банкета",
    },
  ]

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      const sections = [
        { id: "home", ref: homeRef },
        { id: "details", ref: detailsRef },
        { id: "schedule", ref: scheduleRef },
        { id: "rsvp", ref: rsvpRef },
        { id: "gifts", ref: giftsRef },
        { id: "contacts", ref: contactsRef },
        { id: "dress-code", ref: dressCodeRef },
      ]

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.ref.current && section.ref.current.offsetTop <= scrollPosition) {
          setActiveSection(section.id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log(data)
    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  return (
    <>
      {/* Header */}
      <Header activeSection={activeSection} menuItems={menuItems} scrollToSection={scrollToSection} />

      {/* Home Section */}
      <div ref={homeRef}>
        <HomeSection scrollYProgress={smoothProgress} scrollToSection={scrollToSection} />
      </div>

      {/* Wave divider */}
      <WaveDivider className="bg-green-50" />

      {/* Details Section */}
      <div ref={detailsRef}>
        <DetailsSection mounted={mounted} />
      </div>

      {/* Flower divider */}
      <FlowerDivider />

      {/* Schedule Section */}
      <div ref={scheduleRef}>
        <ScheduleSection events={events} />
      </div>

      {/* Leaf divider */}
      <LeafDivider />

      {/* RSVP Section */}
      <div ref={rsvpRef}>
        <RsvpSection
          alcoholOptions={alcoholOptions}
          isSubmitted={isSubmitted}
          isSubmitting={isSubmitting}
          setIsSubmitted={setIsSubmitted}
          onSubmit={onSubmit}
        />
      </div>

      {/* Flower divider */}
      <FlowerDivider />

      {/* Gifts Section */}
      <div ref={giftsRef}>
        <GiftsSection />
      </div>

      {/* Leaf divider */}
      <LeafDivider />

      {/* Contacts Section */}
      <div ref={contactsRef}>
        <ContactsSection contacts={contacts} />
      </div>

      {/* Flower divider */}
      <FlowerDivider />

      {/* Dress Code Section */}
      <div ref={dressCodeRef}>
        <DressCodeSection />
      </div>

      {/* Footer */}
      <Footer />
    </>
  )
}
