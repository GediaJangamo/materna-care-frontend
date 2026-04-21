import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import {
  Heart,
  Calendar,
  MapPin,
  Bell,
  Shield,
  Smartphone,
  CheckCircle,
  Baby,
  Stethoscope,
  Users,
  Activity,
  FileText,
  Navigation,
  TrendingUp,
  Award,
  HeartHandshake,
  AlertCircle,
  BookOpen,
  Clock,
} from "lucide-react";

export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen bg-white">


      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-white focus:text-pink-700 focus:px-4 focus:py-2 focus:rounded focus:shadow-lg focus:font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500"
      >
        Skip to main content
      </a>

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="/" aria-label="MaternaCare home" className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded">
              <Heart className="w-8 h-8 text-pink-500 fill-pink-500 mr-2" aria-hidden="true" />
              <span className="text-2xl font-bold text-gray-900">
                Materna<span className="text-pink-500">Care</span>
              </span>
            </a>

            <div className="flex items-center gap-6">
              <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6">
                <a href="#education" className="text-gray-600 hover:text-pink-500 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded px-1">
                  Education
                </a>
                <a href="#features" className="text-gray-600 hover:text-pink-500 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded px-1">
                  Features
                </a>
                <a href="#why" className="text-gray-600 hover:text-pink-500 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded px-1">
                  Why MaternaCare
                </a>
                <a href="#impact" className="text-gray-600 hover:text-pink-500 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded px-1">
                  Our Impact
                </a>
              </nav>

              <Link href="/login">
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-6 rounded-full shadow-lg hover:shadow-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2">
                  Sign in
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        aria-labelledby="hero-heading"
        className="relative bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 text-white overflow-hidden pt-20"
      >
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Heart className="w-5 h-5 mr-2 fill-white" aria-hidden="true" />
                <span className="text-sm font-medium">Care for you and your baby</span>
              </div>

              <h1 id="hero-heading" className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Track your pregnancy with confidence
              </h1>

              <p className="text-xl md:text-2xl mb-8 text-pink-50 leading-relaxed">
                MaternaCare connects you to the healthcare you deserve. Appointment reminders, nearby hospitals, and your medical history always at hand.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/login">
                  <Button
                    size="lg"
                    className="bg-white text-pink-600 hover:bg-pink-50 font-semibold text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-pink-600"
                  >
                    Get Started
                    <Heart className="ml-2 w-5 h-5" aria-hidden="true" />
                  </Button>
                </Link>
                <a href="#education">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold text-lg px-8 py-6 rounded-full w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-pink-600"
                  >
                    Learn More
                  </Button>
                </a>
              </div>

              <ul aria-label="Key highlights" className="mt-10 flex flex-wrap gap-6 justify-center md:justify-start text-sm list-none">
                {["100% Free", "Works Offline", "Secure Data"].map((item) => (
                  <li key={item} className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                    <CheckCircle className="w-4 h-4 mr-2" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden md:block" aria-hidden="true">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-3xl transform rotate-6"></div>
                <div className="relative bg-white/30 backdrop-blur-xl rounded-3xl p-8 border border-white/40">
                  <div className="flex items-center justify-center h-96">
                    <Baby className="w-48 h-48 text-white/80" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Section */}
      <section id="education" aria-labelledby="education-heading" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-100 rounded-full px-5 py-2 mb-6">
              <BookOpen className="w-5 h-5 mr-2 text-blue-600" aria-hidden="true" />
              <span className="text-sm font-semibold text-blue-700">IMPORTANT INFORMATION</span>
            </div>
            <h2 id="education-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              When to Start Prenatal Care?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Many expectant mothers in Mozambique attend their first consultation only in the late second trimester. Let's understand why starting early makes all the difference.
            </p>
          </div>

          {/* Timeline of Pregnancy */}
          <div className="mb-16">
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 p-8 md:p-12">
              <div className="flex items-start gap-4 mb-8">
                <div className="bg-amber-500 rounded-full p-3 flex-shrink-0">
                  <AlertCircle className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    The Current Challenge in Mozambique
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Many women present to health centres for their first prenatal consultation only in the late second trimester (6th–7th month). This means they miss important months of follow-up that could prevent complications.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6" role="list" aria-label="Pregnancy trimesters">
                {[
                  {
                    num: "1st",
                    numColor: "text-red-600",
                    numBg: "bg-red-100",
                    border: "border-red-200",
                    bgSection: "bg-red-50",
                    labelColor: "text-red-800",
                    listColor: "text-red-700",
                    title: "First Trimester",
                    weeks: "Weeks 1–12",
                    sectionLabel: " When to start:",
                    items: ["As soon as you find out", "Ideally before 12 weeks", "First consultation is crucial"],
                  },
                  {
                    num: "2nd",
                    numColor: "text-orange-600",
                    numBg: "bg-orange-100",
                    border: "border-orange-200",
                    bgSection: "bg-orange-50",
                    labelColor: "text-orange-800",
                    listColor: "text-orange-700",
                    title: "Second Trimester",
                    weeks: "Weeks 13–26",
                    sectionLabel: " Common late arrival:",
                    items: ["Many arrive here first", "Important exams already missed", "Hidden risks may exist"],
                  },
                  {
                    num: "3rd",
                    numColor: "text-purple-600",
                    numBg: "bg-purple-100",
                    border: "border-purple-200",
                    bgSection: "bg-purple-50",
                    labelColor: "text-purple-800",
                    listColor: "text-purple-700",
                    title: "Third Trimester",
                    weeks: "Weeks 27–40",
                    sectionLabel: " Final preparation:",
                    items: ["Birth preparation", "Intensive monitoring", "Emergency plan"],
                  },
                ].map(({ num, numColor, numBg, border, bgSection, labelColor, listColor, title, weeks, sectionLabel, items }) => (
                  <div key={num} role="listitem" className={`bg-white rounded-xl p-6 border-2 ${border}`}>
                    <div className="flex items-center mb-4">
                      <div className={`${numBg} rounded-full w-12 h-12 flex items-center justify-center mr-3`} aria-hidden="true">
                        <span className={`text-2xl font-bold ${numColor}`}>{num}</span>
                      </div>
                      <h4 className="font-bold text-gray-900">{title}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{weeks}</p>
                    <div className={`${bgSection} rounded-lg p-4`}>
                      <p className={`text-sm font-semibold ${labelColor} mb-2`}>{sectionLabel}</p>
                      <ul className="space-y-1">
                        {items.map((item) => (
                          <li key={item} className={`text-sm ${listColor}`}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Why Early Care Matters */}
          <div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Why Starting Prenatal Care Early Matters
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white border-2 border-green-200 p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-green-100 rounded-full p-3 mr-4">
                    <Stethoscope className="w-8 h-8 text-green-600" aria-hidden="true" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">Early Risk Detection</h4>
                </div>
                <ul className="space-y-4">
                  {[
                    { title: "High Blood Pressure (Pre-eclampsia)", desc: "Identify and control before it becomes serious" },
                    { title: "Anaemia", desc: "Treat with iron supplements in time" },
                    { title: "Gestational Diabetes", desc: "Blood sugar control protects mother and baby" },
                    { title: "Infections", desc: "HIV, syphilis and others can be treated" },
                  ].map(({ title, desc }) => (
                    <li key={title} className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <div>
                        <p className="font-semibold text-gray-900">{title}</p>
                        <p className="text-gray-600 text-sm">{desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="bg-white border-2 border-blue-200 p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <Baby className="w-8 h-8 text-blue-600" aria-hidden="true" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">Healthy Baby Development</h4>
                </div>
                <ul className="space-y-4">
                  {[
                    { title: "Folic Acid Supplementation", desc: "Prevents nervous system malformations" },
                    { title: "Ultrasounds at the Right Time", desc: "Monitor growth and detect problems early" },
                    { title: "Vaccination", desc: "Protect mother and baby against tetanus and other diseases" },
                    { title: "Nutritional Guidance", desc: "Proper diet for the baby's development" },
                  ].map(({ title, desc }) => (
                    <li key={title} className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-blue-500 mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <div>
                        <p className="font-semibold text-gray-900">{title}</p>
                        <p className="text-gray-600 text-sm">{desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>

          {/* WHO Schedule */}
          <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200 p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center bg-pink-500 text-white rounded-full px-6 py-3 mb-4">
                <Calendar className="w-6 h-6 mr-2" aria-hidden="true" />
                <span className="font-bold">WHO Recommended Schedule</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Minimum 6 Consultations During Pregnancy
              </h3>
              <p className="text-gray-600">The earlier you start, the better for you and your baby</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6" role="list" aria-label="Recommended consultation schedule">
              {[
                { label: "1st Consultation", labelColor: "text-pink-600", timing: "Before 12 weeks", desc: "Start of follow-up, initial exams, folic acid" },
                { label: "2nd–3rd Consultations", labelColor: "text-purple-600", timing: "20–26 weeks", desc: "Morphology scan, vaccines, monitoring" },
                { label: "4th–6th Consultations", labelColor: "text-indigo-600", timing: "30–40 weeks", desc: "Birth preparation, emergency plan" },
              ].map(({ label, labelColor, timing, desc }) => (
                <div key={label} role="listitem" className="bg-white rounded-xl p-6 shadow-md">
                  <div className={`${labelColor} font-bold text-lg mb-3`}>{label}</div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{timing}</div>
                  <p className="text-gray-600 text-sm">{desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-white rounded-xl p-6 border-2 border-pink-300" role="note">
              <div className="flex items-start gap-4">
                <Clock className="w-8 h-8 text-pink-600 flex-shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <p className="font-bold text-gray-900 text-lg mb-2">
                    Remember: It's Never Too Late to Start!
                  </p>
                  <p className="text-gray-700">
                    Even if you're already in the second or third trimester, seek a health centre immediately. Every consultation makes a difference for your health and your baby's. MaternaCare helps you stay organised and never miss an appointment.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Why MaternaCare */}
      <section id="why" aria-labelledby="why-heading" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="why-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why MaternaCare Matters
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We know that access to prenatal care in Mozambique still faces challenges. We're here to help.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                iconBg: "from-orange-100 to-red-100",
                icon: <MapPin className="w-8 h-8 text-orange-600" aria-hidden="true" />,
                title: "Distance to Hospitals",
                problem: "Many expectant mothers in Mozambique live far from health centres, making regular prenatal visits difficult.",
                solution: "MaternaCare helps you find the nearest hospital and plan your visits in advance.",
              },
              {
                iconBg: "from-blue-100 to-cyan-100",
                icon: <Calendar className="w-8 h-8 text-blue-600" aria-hidden="true" />,
                title: "Regular Follow-up",
                problem: "Regular prenatal consultations are essential to detect and prevent complications during pregnancy.",
                solution: "Automatic reminders ensure you never miss an important consultation.",
              },
              {
                iconBg: "from-purple-100 to-pink-100",
                icon: <Activity className="w-8 h-8 text-purple-600" aria-hidden="true" />,
                title: "Early Detection",
                problem: "Identifying warning signs early can make all the difference for a healthy pregnancy.",
                solution: "Our monitoring system helps health professionals identify risks quickly.",
              },
            ].map(({ iconBg, icon, title, problem, solution }) => (
              <Card key={title} className="bg-white border-none shadow-lg p-8">
                <div className={`bg-gradient-to-br ${iconBg} rounded-full w-16 h-16 flex items-center justify-center mb-6`}>
                  {icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{problem}</p>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <p className="text-green-800 font-medium text-sm flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    {solution}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200 p-10">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-pink-500 rounded-full p-3 flex-shrink-0">
                <HeartHandshake className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Our Mission: Care for Every Mother
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We believe every mother in Mozambique deserves access to quality healthcare during pregnancy. MaternaCare was created to make that possible, using simple technology that works for everyone, everywhere in the country.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" aria-labelledby="features-heading" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="features-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need in one place
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple and powerful tools to follow every stage of your pregnancy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { iconBg: "from-pink-100 to-rose-100", icon: <Bell className="w-8 h-8 text-pink-600" aria-hidden="true" />, title: "Appointment Reminders", desc: "Never miss a prenatal consultation. Receive automatic notifications and organise your health calendar." },
              { iconBg: "from-purple-100 to-indigo-100", icon: <Navigation className="w-8 h-8 text-purple-600" aria-hidden="true" />, title: "Nearby Hospitals", desc: "Quickly find the hospitals and health centres closest to you, with contact information." },
              { iconBg: "from-blue-100 to-cyan-100", icon: <FileText className="w-8 h-8 text-blue-600" aria-hidden="true" />, title: "Medical History", desc: "Access your full pregnancy history, exams and medical follow-up in one secure place." },
              { iconBg: "from-green-100 to-emerald-100", icon: <Activity className="w-8 h-8 text-green-600" aria-hidden="true" />, title: "Health Monitoring", desc: "Track vital signs, weight, blood pressure and other important health indicators." },
              { iconBg: "from-orange-100 to-amber-100", icon: <Shield className="w-8 h-8 text-orange-600" aria-hidden="true" />, title: "Risk Identification", desc: "System helps health professionals identify situations that need special attention." },
              { iconBg: "from-violet-100 to-purple-100", icon: <Smartphone className="w-8 h-8 text-violet-600" aria-hidden="true" />, title: "Mobile Access", desc: "Use anywhere, anytime. Designed to work even with limited internet connectivity." },
            ].map(({ iconBg, icon, title, desc }) => (
              <Card key={title} className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow p-8">
                <div className={`bg-gradient-to-br ${iconBg} rounded-2xl w-16 h-16 flex items-center justify-center mb-6`}>
                  {icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section aria-labelledby="how-heading" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="how-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to start caring for you and your baby
            </p>
          </div>

          <ol className="grid md:grid-cols-3 gap-8 list-none">
            {[
              { num: "1", gradient: "from-pink-500 to-rose-500", title: "Create your account", desc: "Register for free with your basic information. Quick and secure." },
              { num: "2", gradient: "from-purple-500 to-indigo-500", title: "Complete your profile", desc: "Add information about your pregnancy and follow-up preferences." },
              { num: "3", gradient: "from-blue-500 to-cyan-500", title: "Start using it", desc: "Done! Access all features and follow your pregnancy with peace of mind." },
            ].map(({ num, gradient, title, desc }) => (
              <li key={num} className="text-center">
                <div
                  className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${gradient} text-white rounded-full text-3xl font-bold mb-6 shadow-lg`}
                  aria-hidden="true"
                >
                  {num}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" aria-labelledby="impact-heading" className="py-20 bg-gradient-to-br from-pink-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="impact-heading" className="text-3xl md:text-4xl font-bold mb-4">
              MaternaCare by the numbers
            </h2>
            <p className="text-xl text-pink-100">
              Together, we're building a better future for mothers in Mozambique
            </p>
          </div>

          <dl className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: <Users className="w-8 h-8" aria-hidden="true" />, value: "120+", label: "Registered Mothers" },
              { icon: <Calendar className="w-8 h-8" aria-hidden="true" />, value: "500+", label: "Appointments Scheduled" },
              { icon: <CheckCircle className="w-8 h-8" aria-hidden="true" />, value: "95%", label: "Satisfaction" },
              { icon: <TrendingUp className="w-8 h-8" aria-hidden="true" />, value: "+40%", label: "Consultation Adherence" },
            ].map(({ icon, value, label }) => (
              <div key={label} className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                  {icon}
                </div>
                <dd className="text-4xl font-bold mb-2">{value}</dd>
                <dt className="text-pink-100">{label}</dt>
              </div>
            ))}
          </dl>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-10 text-center">
            <Award className="w-16 h-16 mx-auto mb-6 text-yellow-300" aria-hidden="true" />
            <h3 className="text-2xl font-bold mb-4">
              Our Goal: Transform Maternal Health
            </h3>
            <p className="text-lg text-pink-100 max-w-3xl mx-auto leading-relaxed">
              We want every expectant mother in Mozambique to have easy access to quality prenatal care. With simple, accessible technology, we're building a future where all mothers can follow their pregnancy with confidence and safety.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section aria-labelledby="cta-heading" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-16 h-16 text-pink-500 mx-auto mb-6 fill-pink-500" aria-hidden="true" />
          <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to begin your journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join hundreds of mothers who already trust MaternaCare to follow their pregnancy.
          </p>
          <Link href="/login">
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold text-lg px-12 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
            >
              Create Free Account
              <Heart className="ml-2 w-5 h-5" aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <p className="text-white font-bold text-xl mb-4 flex items-center">
                <Heart className="w-6 h-6 mr-2 text-pink-500 fill-pink-500" aria-hidden="true" />
                MaternaCare
              </p>
              <p className="text-gray-400 leading-relaxed">
                Caring for mothers and babies in Mozambique with technology and heart.
              </p>
            </div>

            <nav aria-label="Footer navigation">
              <h3 className="text-white font-semibold mb-4">Useful Links</h3>
              <ul className="space-y-2 list-none">
                {[
                  { href: "#education", label: "Education" },
                  { href: "#features", label: "Features" },
                  { href: "#why", label: "Why MaternaCare" },
                  { href: "#impact", label: "Our Impact" },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <a href={href} className="hover:text-pink-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Support navigation">
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 list-none">
                {["Help centre", "Privacy policy", "Terms of use"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-pink-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2026 Gédia Jangamo · All rights reserved</p>
            <p className="mt-2 text-sm">Built with care for the mothers of Mozambique</p>
          </div>
        </div>
      </footer>

    </main>
  );
}