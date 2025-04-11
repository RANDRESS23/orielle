import { useState, useEffect, useRef } from "react"
import { MoveRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

// Datos del carrusel
const carouselData = [
  {
    id: 1,
    title: "JEWELRY SETS",
    subtitle: "GET UP TO 10% OFF",
    description: "Sparkle and Save: Enjoy our stunning jewelry collection at discounted prices!",
    image: "/images/hero-slide-1.webp",
  },
  {
    id: 2,
    title: "ELEGANT NECKLACES",
    subtitle: "NEW COLLECTION",
    description: "Discover our exquisite selection of handcrafted necklaces for any occasion.",
    image: "/images/hero-slide-2.webp",
  },
  {
    id: 3,
    title: "LUXURY WATCHES",
    subtitle: "SPECIAL OFFER",
    description: "Timeless elegance on your wrist. Explore our premium watch collection today.",
    image: "/images/hero-slide-3.webp",
  },
]

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const slideInterval = useRef<number | null>(null)
  const transitionDuration = 700 // ms

  // Función para avanzar al siguiente slide
  const nextSlide = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev + 1) % carouselData.length)

    setTimeout(() => {
      setIsTransitioning(false)
    }, transitionDuration)
  }

  // Función para retroceder al slide anterior
  const prevSlide = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length)

    setTimeout(() => {
      setIsTransitioning(false)
    }, transitionDuration)
  }

  // Configurar el intervalo para el cambio automático
  useEffect(() => {
    slideInterval.current = window.setInterval(() => {
      nextSlide()
    }, 10000) // Cambiar cada 10 segundos

    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current)
      }
    }
  }, [])

  // Reiniciar el intervalo cuando se navega manualmente
  const handleManualNavigation = (direction: "prev" | "next") => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current)
    }

    if (direction === "prev") {
      prevSlide()
    } else {
      nextSlide()
    }

    slideInterval.current = window.setInterval(() => {
      nextSlide()
    }, 10000)
  }

  const currentSlideData = carouselData[currentSlide] 

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#f5ede6]">
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20 h-full">
        <div className="flex flex-col md:flex-row items-center h-full">
          <div className="w-full md:w-1/2 space-y-6 z-10 mb-8 md:mb-0 overflow-hidden">
            {carouselData.map((slide, index) => (
              <div
                key={slide.id}
                className="absolute w-full transition-all duration-700 ease-in-out -translate-y-28"
                style={{
                  opacity: currentSlide === index ? 1 : 0,
                  transform: `translateX(${(index - currentSlide) * 30}px)`,
                  pointerEvents: currentSlide === index ? "auto" : "none",
                  transition: `transform 700ms ease-in-out, opacity 700ms ease-in-out`,
                }}
              >
                <p className="text-sm uppercase tracking-widest text-neutral-600">TIMELESS BEAUTY</p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display tracking-tight text-neutral-900 leading-tight font-semibold">
                  {slide.title}
                  <br />
                  {slide.subtitle}
                </h1>
                <p className="text-neutral-700 max-w-md">{slide.description}</p>
                <Link
                  to="/shop"
                  className="inline-flex justify-center items-center border border-neutral-800 px-8 py-3 text-neutral-800 hover:bg-neutral-900 hover:text-white transition-colors duration-200 group mt-6"
                >
                  <span className="transition-transform duration-300 translate-x-3 group-hover:translate-x-0">
                    Shop now
                  </span>
                  <MoveRight className="ml-2 h-4 w-4 transition-all duration-300 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0" />
                </Link>
              </div>
            ))}
          </div>
          <div className="w-full md:w-1/2 relative overflow-hidden">
            <div
              className="carousel-container relative w-full h-full"
              style={{
                height: "600px",
                overflow: "hidden",
              }}
            >
              {carouselData.map((slide, index) => (
                <div
                  key={slide.id}
                  className="absolute w-full h-full transition-all duration-500 ease-in-out"
                  style={{
                    opacity: currentSlide === index ? 1 : 0,
                    transform: `translateX(${(index - currentSlide) * 50}px)`,
                    transition: `transform 700ms ease-in-out, opacity 700ms ease-in-out`,
                  }}
                >
                  <img
                    src={slide.image || "/placeholder.svg"}
                    width={600}
                    height={600}
                    alt={`${slide.title} - ${slide.subtitle}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Controles de navegación */}
      <button
        onClick={() => handleManualNavigation("prev")}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-20 transition-all duration-200 cursor-pointer"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="h-6 w-6 text-neutral-800" />
      </button>
      <button
        onClick={() => handleManualNavigation("next")}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-20 transition-all duration-200 cursor-pointer"
        aria-label="Siguiente slide"
      >
        <ChevronRight className="h-6 w-6 text-neutral-800" />
      </button>

      {/* Indicadores de slide */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index)
              if (slideInterval.current) {
                clearInterval(slideInterval.current)
                slideInterval.current = window.setInterval(() => {
                  nextSlide()
                }, 10000)
              }
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
              currentSlide === index ? "w-4 bg-neutral-800" : "bg-neutral-400"
            }`}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
