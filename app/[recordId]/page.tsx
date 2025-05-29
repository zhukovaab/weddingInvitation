import { Suspense } from "react"
import { notFound } from "next/navigation"
import WeddingPage from "@/components/wedding-page"
import LoadingScreen from "@/components/loading-screen"

// Fetch guest data from NocoDB API
async function getGuestData(recordId: string) {
  try {
    const response = await fetch(`https://app.nocodb.com/api/v2/tables/mnmhshwfwx45sd3/records/${recordId}`, {
      headers: {
        "Content-Type": "application/json",
        "xc-token": "YwI2ziEpX2HsW9I0zAzNPsS0Fk_6EF-boUo_4G95",
      },
      cache: "no-store", // Don't cache the response to ensure fresh data
    })

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(`Failed to fetch guest data: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching guest data:", error)
    return null
  }
}

export default async function GuestPage({ params }: { params: { recordId: string } }) {
  const { recordId } = params
  const guestData = await getGuestData(recordId)

  // If no guest data found, show 404 page
  if (!guestData) {
    notFound()
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <WeddingPage guestData={guestData} recordId={recordId} />
    </Suspense>
  )
}
