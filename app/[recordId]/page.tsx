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
