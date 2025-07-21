import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Code, Palette, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600"></div>
              <h1 className="text-xl font-bold">Your App</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Home
              </a>
              <a href="#" className="text-sm font-medium hover:text-blue-600 transition-colors">
                About
              </a>
              <a href="#" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Contact
              </a>
              <Button size="sm">Get Started</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <Badge variant="secondary" className="mb-4">
          Next.js + shadcn/ui + Tailwind CSS
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to Your New
          <br />
          Next.js Project
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
          A modern, fully-configured Next.js project with shadcn/ui components and Tailwind CSS. Ready for you to
          migrate your React.js application.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8">
            Start Building
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
            View Documentation
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">What's Included</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle>Next.js 15</CardTitle>
              <CardDescription>
                Latest Next.js with App Router, Server Components, and all modern features
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle>shadcn/ui</CardTitle>
              <CardDescription>Beautiful, accessible components built with Radix UI and Tailwind CSS</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                <Palette className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle>Tailwind CSS</CardTitle>
              <CardDescription>Utility-first CSS framework for rapid UI development</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Migration Checklist */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Migration Checklist</h2>
          <Card>
            <CardHeader>
              <CardTitle>Steps to Migrate Your React.js Project</CardTitle>
              <CardDescription>
                Follow these steps to successfully migrate your existing React.js project
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Set up Next.js project structure</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    ✅ Already done! This project is ready with App Router structure
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="h-5 w-5 rounded-full border-2 border-slate-300 mt-0.5 flex-shrink-0"></div>
                <div>
                  <p className="font-medium">Move your components to the components folder</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Copy your React components to the components directory
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="h-5 w-5 rounded-full border-2 border-slate-300 mt-0.5 flex-shrink-0"></div>
                <div>
                  <p className="font-medium">Update routing to App Router</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Convert React Router routes to Next.js App Router pages
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="h-5 w-5 rounded-full border-2 border-slate-300 mt-0.5 flex-shrink-0"></div>
                <div>
                  <p className="font-medium">Replace CSS with Tailwind classes</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Gradually replace your existing CSS with Tailwind utility classes
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="h-5 w-5 rounded-full border-2 border-slate-300 mt-0.5 flex-shrink-0"></div>
                <div>
                  <p className="font-medium">Integrate shadcn/ui components</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Replace custom components with shadcn/ui components where applicable
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-slate-600 dark:text-slate-400">
            <p>Built with Next.js, shadcn/ui, and Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
