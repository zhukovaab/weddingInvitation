"use client"

import { useEffect, useRef } from "react"

declare global {
  interface Window {
    ymaps: any
  }
}

export default function YandexMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    // Function to initialize the map
    const initMap = () => {
      if (!window.ymaps || !mapRef.current) return

      window.ymaps.ready(() => {
        // Create the map
        const map = new window.ymaps.Map(
          mapRef.current,
          {
            center: [55.745, 37.597], // Moscow center coordinates
            zoom: 12,
            controls: ["zoomControl", "fullscreenControl"],
          },
          {
            scrollZoom: false, // Disable scroll zoom
            suppressMapOpenBlock: true, // Prevent map from blocking page scroll
          },
        )

        // ZAGS location marker
        const zagsPlacemark = new window.ymaps.Placemark(
          [55.738951, 37.670282], // Tagansky ZAGS coordinates
          {
            balloonContentHeader: "<strong>Таганский ЗАГС</strong>",
            balloonContentBody: "Церемония бракосочетания<br/>14 июня, 13:15",
            balloonContentFooter: "Место проведения официальной церемонии",
            hintContent: "Таганский ЗАГС - Церемония бракосочетания",
          },
          {
            preset: "islands#redHeartIcon",
            iconColor: "#dc2626",
          },
        )

        // Boat location marker
        const boatPlacemark = new window.ymaps.Placemark(
          [55.748709, 37.546673], // Moscow City area coordinates
          {
            balloonContentHeader: '<strong>Теплоход "Крокус"</strong>',
            balloonContentBody: "Празднование свадьбы<br/>14 июня, 15:30",
            balloonContentFooter: "Место проведения праздничного банкета",
            hintContent: 'Теплоход "Крокус" - Празднование свадьбы',
          },
          {
            preset: "islands#blueHeartIcon",
            iconColor: "#2563eb",
          },
        )

        // Add markers to the map
        map.geoObjects.add(zagsPlacemark)
        map.geoObjects.add(boatPlacemark)

        // Store map instance
        mapInstanceRef.current = map

        // Set bounds to show both markers
        map.setBounds(map.geoObjects.getBounds(), {
          checkZoomRange: true,
          zoomMargin: 50,
        })
      })
    }

    // Load Yandex Maps API if not already loaded
    if (!window.ymaps) {
      const script = document.createElement("script")
      script.src = `https://api-maps.yandex.ru/2.1/?apikey=9629cef8-0352-4cb7-a05b-a95088044046&lang=ru_RU`
      script.async = true
      script.onload = initMap
      document.head.appendChild(script)

      return () => {
        // Cleanup script on unmount
        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }
      }
    } else {
      initMap()
    }

    // Cleanup map instance on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy()
        mapInstanceRef.current = null
      }
    }
  }, [])

  return (
    <div
      ref={mapRef}
      className="w-full h-96 rounded-lg shadow-md border border-green-100 overflow-hidden"
      style={{ minHeight: "400px" }}
    />
  )
}
