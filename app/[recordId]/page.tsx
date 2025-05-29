import { Suspense } from "react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import WeddingPage from "@/components/wedding-page"
import LoadingScreen from "@/components/loading-screen"

// Получение данных гостя из NocoDB API
async function getGuestData(recordId: string) {
  try {
    const response = await fetch(`https://app.nocodb.com/api/v2/tables/mnmhshwfwx45sd3/records/${recordId}`, {
      headers: {
        "Content-Type": "application/json",
        "xc-token": "YwI2ziEpX2HsW9I0zAzNPsS0Fk_6EF-boUo_4G95",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(`Не удалось получить данные гостя: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Ошибка при получении данных гостя:", error)
    return null
  }
}

// Метаданные для Open Graph и SEO
export async function generateMetadata({ params }: { params: { recordId: string } }): Promise<Metadata> {
  // При необходимости можно получить данные гостя для персонализации метаданных
  // const guestData = await getGuestData(params.recordId)

  return {
    title: "Приглашение на свадьбу",
    description: "Вы приглашены на нашу свадьбу! Нажмите, чтобы узнать подробности.",
    openGraph: {
      title: "Приглашение на свадьбу",
      description: "Вы приглашены на нашу свадьбу! Нажмите, чтобы узнать подробности.",
      url: `https://wedding-invitation-rho-rust.vercel.app/${params.recordId}`,
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
}

export default async function GuestPage({ params }: { params: { recordId: string } }) {
  const { recordId } = params
  const guestData = await getGuestData(recordId)

  if (!guestData) {
    notFound()
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <WeddingPage guestData={guestData} recordId={recordId} />
    </Suspense>
  )
}
