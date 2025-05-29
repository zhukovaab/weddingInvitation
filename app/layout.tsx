import type React from "react"
import type { Metadata } from "next"
import { Inter, Cormorant_Garamond } from "next/font/google"
import "./globals.css"
import { ConfigProvider } from "antd"

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" })
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Свадьба Георгия и Анастасии",
  description: "Приглашение на свадьбу Георгия и Анастасии, которая состоится 14 июня в Москве",
  generator: 'v0.dev',
  openGraph: {
      title: "Свадьба Георгия и Анастасии",
      description: "Приглашение на свадьбу Георгия и Анастасии, которая состоится 14 июня в Москве",
      type: "website",
      images: [
        {
          url: "https://wedding-invitation-rho-rust.vercel.app/images/we.jpg",
          width: 1200,
          height: 630,
          alt: "Приглашение на свадьбу",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Приглашение на свадьбу",
      description: "Вы приглашены на нашу свадьбу! Нажмите, чтобы узнать подробности.",
      images: ["https://wedding-invitation-rho-rust.vercel.app/images/we.jpg"],
    },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={`${inter.variable} ${cormorant.variable} font-sans bg-green-50 min-h-screen`}><ConfigProvider
    theme={{
      token: {
        colorPrimary: '#488f68',
        fontFamily  : 'var(--font-inter)',
      },
    }}
  >{children}</ConfigProvider></body>
    </html>
  )
}
