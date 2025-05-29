"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import styles from "./header.module.css"

type MenuItem = {
  id: string
  label: string
}

type HeaderProps = {
  activeSection: string
  menuItems: MenuItem[]
  scrollToSection: (sectionId: string) => void
}

export default function Header({ activeSection, menuItems, scrollToSection }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Close menu when section changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [activeSection])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isMenuOpen && !target.closest("header")) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside)
      return () => document.removeEventListener("click", handleClickOutside)
    }
  }, [isMenuOpen])

  const handleMobileNavClick = (sectionId: string) => {
    // Close menu first
    setIsMenuOpen(false)
    // Small delay to ensure menu closes before scrolling
    setTimeout(() => {
      scrollToSection(sectionId)
    }, 100)
  }

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsMenuOpen(false)
    scrollToSection("home")
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button onClick={handleLogoClick} className={styles.logo}>
          <div className={styles.logoImageWrapper}>
            <Image
              src="/images/wedding-logo.png"
              alt="Георгий и Анастасия"
              width={40}
              height={40}
              className={styles.logoImage}
            />
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={activeSection === item.id ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={styles.menuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={styles.mobileNav}
          >
            <nav>
              <div className="divide-y divide-green-50">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleMobileNavClick(item.id)}
                    className={
                      activeSection === item.id
                        ? `${styles.mobileNavLink} ${styles.activeMobileNavLink}`
                        : styles.mobileNavLink
                    }
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
