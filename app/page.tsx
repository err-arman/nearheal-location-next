import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Code, Heart, Users } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 sm:py-16 text-center">
        <Badge variant="secondary" className="mb-4">
          Healthcare • Learning • Community
        </Badge>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
          Welcome to Nearheal
          <br />
          Healthcare Platform
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto px-4">
          Your complete healthcare and learning platform, connecting professionals worldwide. Access telehealth
          services, professional development, and a thriving community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
          <Button size="lg" className="text-lg px-8 w-full sm:w-auto">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent w-full sm:w-auto">
            Learn More
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-8 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <Card className="text-center">
            <CardHeader className="pb-4">
              <div className="mx-auto h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-lg sm:text-xl">Telehealth Services</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Connect with healthcare professionals remotely for consultations and medical advice
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader className="pb-4">
              <div className="mx-auto h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle className="text-lg sm:text-xl">Professional Learning</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Access courses, certifications, and continuing education for healthcare professionals
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center sm:col-span-2 lg:col-span-1">
            <CardHeader className="pb-4">
              <div className="mx-auto h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-lg sm:text-xl">Community Network</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Join a global community of healthcare professionals and patients
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">About Nearheal</h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 px-4">
            Nearheal is revolutionizing healthcare by creating a comprehensive platform that bridges the gap between
            healthcare professionals and patients. Our mission is to make quality healthcare accessible, affordable, and
            convenient for everyone.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 sm:mt-12">
            <div className="text-center p-4">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600 text-sm sm:text-base">Healthcare Professionals</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">50K+</div>
              <div className="text-gray-600 text-sm sm:text-base">Patients Served</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">100+</div>
              <div className="text-gray-600 text-sm sm:text-base">Countries Reached</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Get in Touch</h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 px-4">
            Ready to join the Nearheal community? Contact us to learn more about our services and how we can help you
            achieve your healthcare goals.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="text-left">
                <div className="space-y-2 text-sm sm:text-base">
                  <p>
                    <strong>Email:</strong> contact@nearheal.com
                  </p>
                  <p>
                    <strong>Phone:</strong> +61 451 645 094
                  </p>
                  <p>
                    <strong>Address:</strong> 3/8 Mackie st, Coniston, NSW 2500, Australia
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Business Hours</CardTitle>
              </CardHeader>
              <CardContent className="text-left">
                <div className="space-y-2 text-sm sm:text-base">
                  <p>
                    <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM
                  </p>
                  <p>
                    <strong>Saturday:</strong> 10:00 AM - 4:00 PM
                  </p>
                  <p>
                    <strong>Sunday:</strong> Closed
                  </p>
                  <p>
                    <strong>Emergency:</strong> 24/7 Support Available
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
