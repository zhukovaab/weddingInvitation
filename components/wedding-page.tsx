"use client"

import { useState, useEffect, useRef } from "react"
import { useScroll, useSpring } from "framer-motion"

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
  zagsAttendance: "yes" | "no"
  hasEscort: boolean
  escort: string
  allergies: string
  alcoholPreferences: string[]
  comments: string
}

type GuestData = {
  id: string
  fullName?: string
  email?: string
  phone?: string
  // Add other fields that might come from the API
  [key: string]: any
}

type WeddingPageProps = {
  guestData: GuestData
  recordId: string
}

// Add this mapping object near the top of the component, after the type definitions
const alcoholMapping = {
  Шампанское: "champagne",
  "Белое вино": "white_vine",
  "Красное вино": "red_vine",
  Водка: "vodka",
  Коньяк: "cognac",
  "Безалкогольные напитки": "nonalcoholic",
}

export default function WeddingPage({ guestData, recordId }: WeddingPageProps) {
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

  // Timeline events
  const events = [
    {
      time: "13:15",
      title: "Церемония бракосочетания",
      description: "Торжественная церемония в Таганском ЗАГСе",
      icon: <HeartHandshake className="h-5 w-5" />,
    },
    // {
    //   time: "14:00",
    //   title: "Фотосессия",
    //   description: "Памятные фотографии с гостями",
    //   icon: <Camera className="h-5 w-5" />,
    // },
    {
      time: "15:30",
      title: "Сбор гостей",
      description: "Встреча гостей около теплохода 'Крокус', Москва Сити",
      icon: <Ship className="h-5 w-5" />,
    },
    {
      time: "16:00",
      title: "Отправление теплохода",
      description: "Начало праздничного круиза по Москве-реке",
      icon: <Ship className="h-5 w-5" />,
    },
    {
      time: "16:30",
      title: "Праздничный ужин",
      description: "Изысканные блюда и напитки",
      icon: <Utensils className="h-5 w-5" />,
    },
    {
      time: "17:00",
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
      time: "22:00",
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
      phone: "+7 (906) 076-88-56",
      telegram: "@GeorgiiTedeev",
      image: "/images/groom.jpg?height=300&width=300",
    },
    {
      name: "Анастасия",
      role: "Невеста",
      phone: "+7 (909) 158-15-78",
      telegram: "@girl_with_violin",
      image: "/images/bride.jpg?height=300&width=300",
    },
    {
      name: "Олег",
      role: "Ведущий",
      phone: "+7 (926) 877-16-10",
      telegram: "",
      image: "/images/lead.jpg?height=300&width=300",
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

    try {
      // Map form data to API field names
      const apiData = {
        Id: Number.parseInt(recordId), // Convert recordId to number
        name: data.fullName.split(" ")[0] || data.fullName,
        lastname: data.fullName.split(" ").slice(1).join(" ") || "",
        willBe: data.attendance === "yes",
        willBeInZAGS: data.zagsAttendance === "yes",
        escort: data.hasEscort && data.escort ? data.escort : "",
        allergy: data.allergies,
        drinks: data.alcoholPreferences
          .map((label) => alcoholMapping[label])
          .filter(Boolean)
          .join(","),
        comments: data.comments,
        lastUpdate: new Date()
          .toISOString()
          .replace("T", " ")
          .replace(/\.\d{3}Z$/, "+00:00"),
      }

      // Submit the form data to NocoDB API
      const response = await fetch(`https://app.nocodb.com/api/v2/tables/mnmhshwfwx45sd3/records`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "xc-token": "YwI2ziEpX2HsW9I0zAzNPsS0Fk_6EF-boUo_4G95",
        },
        body: JSON.stringify(apiData),
      })

      if (!response.ok) {
        throw new Error(`Failed to submit response: ${response.status}`)
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Personalized greeting based on guest data
  const personalizedGreeting = (() => {
    if (guestData.name || guestData.lastname) {
      const fullName = [guestData.name, guestData.lastname].filter(Boolean).join(" ")
      return `Дорогой гость, ${fullName}!`
    }
    return "Дорогой гость!"
  })()

  return (
    <>
      {/* Header */}
      <Header activeSection={activeSection} menuItems={menuItems} scrollToSection={scrollToSection} />

      {/* Home Section */}
      <div ref={homeRef}>
        <HomeSection
          scrollYProgress={smoothProgress}
          scrollToSection={scrollToSection}
          personalizedGreeting={personalizedGreeting}
          guestData={guestData}
        />
      </div>

      {/* Wave divider */}
      <WaveDivider className="bg-green-50" />

      {/* Details Section */}
      <div ref={detailsRef}>
        <DetailsSection  mounted={mounted} />
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
          isSubmitted={isSubmitted}
          isSubmitting={isSubmitting}
          setIsSubmitted={setIsSubmitted}
          onSubmit={onSubmit}
          guestData={guestData}
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
