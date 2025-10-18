import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, BrainCircuit, Users } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-white text-gray-800">
      {/* Section 1: Hero */}
      <section className="relative isolate overflow-hidden px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-3xl py-24 sm:py-32">
          <div className="text-center">
            <Image
              src="/logo.png"
              width="220"
              height="220"
              alt="SmartDrive logo"
              className="inline-block mb-8"
            />
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              The smartest way to share files with your company
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Make an account and start managing your files with the power of AI in less than a minute.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/dashboard/files"
                className="rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>
              <a
                href="#features"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </section>

      {/* Section 2: Features */}
      <section id="features" className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
              Why SmartDrive?
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to manage your files
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Securely share files with individuals or your entire organization. Then, find what you need in an instant with our groundbreaking semantic AI search.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <div className="flex items-center gap-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600">
                    <ShieldCheck className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold leading-7 text-gray-900">
                    Secure Sharing
                  </h3>
                </div>
                <p className="mt-4 flex-auto text-base leading-7 text-gray-600">
                  Control who sees your files. Share with specific people or create team-wide access with robust permission controls that keep your data safe.
                </p>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600">
                    <BrainCircuit className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold leading-7 text-gray-900">
                    Semantic AI Search
                  </h3>
                </div>
                <p className="mt-4 flex-auto text-base leading-7 text-gray-600">
                  Stop searching by keyword. Ask a question like <span className="font-semibold text-gray-800">&quot;Find invoices from April&quot;</span> and let our AI find the exact files you need.
                </p>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold leading-7 text-gray-900">
                    Effortless Collaboration
                  </h3>
                </div>
                <p className="mt-4 flex-auto text-base leading-7 text-gray-600">
                  Designed for teams. Organize your files by project or department, making collaboration seamless and intuitive for your entire organization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section 3: About / Call to Action */}
      <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Mission</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
                We believe that finding and managing your company&apos;s data should be simple, intuitive, and intelligent. SmartDrive was built to eliminate the frustration of lost files and inefficient workflows, empowering teams to focus on what matters most.
            </p>
            <figure className="mt-10">
                <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
                    <p>
                        “SmartDrive transformed how we operate. The AI search alone saves our team hours every single week. It’s a complete game-changer.”
                    </p>
                </blockquote>
                <figcaption className="mt-10">
                    <Image
                        className="mx-auto h-12 w-12 rounded-full"
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="Testimonial from a happy customer"
                        width="48"
                        height="48"
                    />
                    <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                        <div className="font-semibold text-gray-900">John Doe</div>
                        <svg viewBox="0 0 2 2" width={3} height={3} aria-hidden="true" className="fill-gray-900">
                            <circle cx={1} cy={1} r={1} />
                        </svg>
                        <div className="text-gray-600">CEO of ExampleCorp</div>
                    </div>
                </figcaption>
            </figure>
        </div>
      </section>

    </div>
  );
}