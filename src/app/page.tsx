"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, BrainCircuit, Users, Quote } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { SignInButton, useAuth } from "@clerk/nextjs";

const testimonials = [
  {
    quote: "SmartDrive transformed how we operate. The AI search alone saves our team hours every single week. It’s a complete game-changer.",
    name: "John Doe",
    title: "CEO of ExampleCorp",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&auto=format&fit=facearea&facepad=2",
  },
  {
    quote: "The collaboration features are incredibly intuitive. Our project workflow has never been smoother. I can't imagine going back.",
    name: "Jane Smith",
    title: "Project Manager, Innovate Ltd.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&auto=format&fit=facearea&facepad=2",
  },
  {
    quote: "Finally, a file management system that understands how modern teams work. The secure sharing gives us complete peace of mind.",
    name: "Alex Johnson",
    title: "CTO, Tech Solutions",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=256&h=256&auto=format&fit=facearea&facepad=2",
  },
  {
    quote: "As a designer, I'm constantly sharing large files. SmartDrive handles them effortlessly and the version history is a lifesaver.",
    name: "Emily White",
    title: "Lead Designer, Creative Co.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256&h=256&auto=format&fit=facearea&facepad=2",
  },
  {
    quote: "The onboarding process was seamless. We had our entire 100-person organization set up and running in less than a day.",
    name: "Michael Brown",
    title: "Head of Operations, Global Synergy",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=256&h=256&auto=format&fit=facearea&facepad=2",
  },
  {
    quote: "I love being able to find any document just by asking a question in plain English. The semantic search is pure magic.",
    name: "Sarah Davis",
    title: "Marketing Director, MarketPro",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&h=256&auto=format&fit=facearea&facepad=2",
  },
  {
    quote: "The mobile app is just as powerful as the desktop version, allowing our field team to stay perfectly in sync.",
    name: "David Wilson",
    title: "Regional Manager, FieldWorks Inc.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&auto=format&fit=facearea&facepad=2",
  },
  {
    quote: "Switching to SmartDrive was one of the best business decisions we've made. It has tangibly increased our team's productivity.",
    name: "Jessica Miller",
    title: "Founder, Startup Hub",
    image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=256&h=256&auto=format&fit=facearea&facepad=2",
  },
  {
    quote: "The level of security and control over our sensitive documents is top-notch. It meets all our compliance requirements with ease.",
    name: "Chris Martinez",
    title: "IT Security Analyst, SecureData",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=256&h=256&auto=format&fit=facearea&facepad=2",
  },
  {
    quote: "From legal contracts to marketing assets, everything is organized and instantly findable. It's the central brain for our entire company.",
    name: "Laura Taylor",
    title: "General Counsel, Legal Eagles LLP",
    image: "https://images.unsplash.com/photo-1589571894960-204526740f4d?q=80&w=256&h=256&auto=format&fit=facearea&facepad=2",
  },
];

export default function LandingPage() {
  const { userId } = useAuth();

  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const cardContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const cardItem: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="bg-white text-gray-800 overflow-x-hidden">

      {/* Section 1: Hero */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center isolate overflow-hidden px-6 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-x-0 -top-40 transform-gpu blur-3xl sm:-top-80">
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}
            />
          </div>
        </div>

        <motion.div className="mx-auto max-w-3xl text-center" initial="hidden" animate="visible" variants={cardContainer}>
          <motion.div variants={cardItem}>
            <Image src="/logo.png" width="220" height="220" alt="SmartDrive logo" className="inline-block mb-8" />
          </motion.div>
          <motion.h1 variants={cardItem} className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            The smartest way to share files with your company
          </motion.h1>
          <motion.p variants={cardItem} className="mt-6 text-lg leading-8 text-gray-600">
            Make an account and start managing your files with the power of AI in less than a minute.
          </motion.p>
          <motion.div variants={cardItem} className="mt-10 flex items-center justify-center gap-x-6">
            {userId ? (
              <Link
                href="/dashboard/files"
                className="rounded-md bg-indigo-600 px-5 py-3 text-base font-semibold text-white shadow-xl transition-transform duration-300 hover:bg-indigo-500 hover:scale-105 focus-visible:outline-indigo-600"
              >
                Go to Dashboard
              </Link>
            ) : (
              <SignInButton mode="modal" afterSignInUrl="/">
                <button
                  className="rounded-md bg-indigo-600 px-5 py-3 text-base font-semibold text-white shadow-xl transition-transform duration-300 hover:bg-indigo-500 hover:scale-105 focus-visible:outline-indigo-600"
                >
                  Get started
                </button>
              </SignInButton>
            )}
            <a href="#features" className="text-base font-semibold leading-6 text-gray-900 transition-transform duration-300 hover:scale-105">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </motion.div>
        </motion.div>
      </section>


      {/* Section 2: Features */}
      <section id="features" className="relative isolate py-24 sm:py-32">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-[50rem] w-[120rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-violet-100 via-pink-100 to-red-100 opacity-60 blur-3xl"></div>
        </div>
        <motion.div className="mx-auto max-w-7xl px-6 lg:px-8" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeIn}>
          <div className="mx-auto max-w-3xl lg:text-center">
            <h2 className="text-xl font-semibold leading-7 text-indigo-600">Why SmartDrive?</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Everything you need, nothing you don&apos;t
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Stop managing files and start using them. Our platform is designed to be powerful yet simple, intelligent yet secure.
            </p>
          </div>
        </motion.div>

        <motion.div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-6xl px-6 lg:px-8" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={cardContainer}>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: ShieldCheck, title: "Secure Sharing", text: "Control who sees your files. Share with specific people or create team-wide access with robust permission controls that keep your data safe." },
              { icon: BrainCircuit, title: "Semantic AI Search", text: "Ask questions like 'Find invoices from April' and let our AI find the exact files you need, instantly." },
              { icon: Users, title: "Effortless Collaboration", text: "Designed for teams. Organize your files by project or department, making collaboration seamless and intuitive." }
            ].map((feature, index) => (
              <motion.div key={index} variants={cardItem} className="flex flex-col rounded-2xl bg-white/60 p-8 shadow-2xl ring-1 ring-gray-900/10 backdrop-blur-xl transition-all duration-300 hover:!scale-105 hover:shadow-indigo-300/50">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="mt-6 text-xl font-semibold leading-7 text-gray-900">{feature.title}</h3>
                <p className="mt-4 flex-auto text-base leading-7 text-gray-700">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>


      {/* Section 3: Testimonials - FINAL ENHANCED VERSION */}
      <section className="relative isolate bg-slate-50 py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-0 top-1/2 h-[50rem] w-[50rem] -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-100 to-transparent opacity-50 blur-3xl"></div>
          <div className="absolute right-0 top-1/2 h-[50rem] w-[50rem] -translate-y-1/2 rounded-full bg-gradient-to-bl from-purple-100 to-transparent opacity-50 blur-3xl"></div>
        </div>
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mx-auto max-w-3xl text-center px-6 lg:px-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Loved by Teams Everywhere</h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              See what our customers have to say about their new favorite productivity tool.
            </p>
          </motion.div>

          <div
            className="group relative mt-16 w-full overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'
            }}
          >
            <motion.div
              className="flex flex-nowrap animate-marquee group-hover:[animation-play-state:paused]"
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div key={index} className="gradient-border-container mx-4 flex-shrink-0">
                  <figure className="h-full w-80 rounded-2xl bg-white/80 p-8 shadow-lg backdrop-blur-md md:w-96 lg:w-[28rem]">
                    <blockquote className="text-left text-lg font-medium leading-7 text-gray-900">
                      <p>“{testimonial.quote}”</p>
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-x-4">
                      <Image className="h-12 w-12 rounded-full object-cover" src={testimonial.image} alt={`Photo of ${testimonial.name}`} width="48" height="48" />
                      <div>
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        <div className="text-gray-600">{testimonial.title}</div>
                      </div>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}