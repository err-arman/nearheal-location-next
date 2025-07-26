import Link from "next/link"
import Image from "next/image"

export const HeroSection = () => {
  return (
    <section className="bg-white py-12 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="max-w-xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 sm:mb-6 leading-tight">
              Your Complete Healthcare & Learning Platform
            </h1>
            <p className="text-lg sm:text-xl text-primary-foreground/90 mb-6 sm:mb-8">
              Discover opportunities in healthcare, education, and more with Nearheal's comprehensive suite of services.
            </p>
            <Link
              href="/providers"
              className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-base sm:text-lg font-medium"
            >
              Get Started
            </Link>
          </div>
          <div className="relative mt-8 lg:mt-0">
            <Image
              src="https://images.unsplash.com/photo-1713942589752-6c6bb58ca8b6?auto=format&fit=crop&w=800"
              alt="Healthcare Professional"
              width={800}
              height={600}
              className="rounded-lg shadow-xl w-full h-auto"
              priority
            />
            <div className="absolute inset-0 bg-primary/10 rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
