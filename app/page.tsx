import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Camera, Code, Mail, Phone } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';


export default function HomePage() {
  return (
    <div className="animate-page">
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-12 md:pt-24 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-1">
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-stone-300 text-xs font-semibold tracking-widest text-stone-600 uppercase">
              Computer Science @ NC State
            </div>

            <h1 className="text-6xl md:text-8xl font-serif text-stone-900 mb-6 leading-[1.1] tracking-tight">
              Developer.
              <br />
              <span className="italic text-stone-500">Designer.</span>
              <br />
              Creator.
            </h1>

            <p className="text-lg md:text-xl text-stone-600 mb-10 max-w-lg leading-relaxed font-light">
              I build intelligent systems through the lens of a photographer.
              By merging rigorous computer science with creative visual design,
              I bring a unique perspective to software engineering, data
              science, and machine learning.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/projects"
                className="px-8 py-4 bg-stone-900 hover:bg-stone-800 text-white font-medium rounded-sm transition-all flex items-center justify-center gap-2 group"
              >
                View CS Projects
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>

              <Link
                href="/photography"
                className="px-8 py-4 bg-white hover:bg-stone-50 text-stone-900 font-medium rounded-sm transition-all border border-stone-200 flex items-center justify-center gap-2 group"
              >
                See Photography
                <Camera
                  size={18}
                  className="text-stone-400 group-hover:text-stone-900 transition-colors"
                />
              </Link>
            </div>
          </div>

          <div className="order-2 relative">
            <div className="aspect-[4/5] w-full max-w-md mx-auto lg:ml-auto relative">
              <div className="absolute inset-0 bg-stone-200 translate-x-4 translate-y-4" />

              <Image
                src="/photography/APC_0642.jpg"
                alt="Computer workspace"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 500px"
                className="object-cover grayscale-[30%] contrast-125"
              />

              <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-xl border border-stone-100 max-w-xs hidden md:block animate-card">
                <Code className="text-stone-400 mb-3" size={24} />
                <p className="text-sm text-stone-600 font-medium">
                  &quot;Architecture and framing follow the same principles—
                  it&apos;s all about focus, balance, and removing the
                  unnecessary.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-100 border-t border-stone-200 py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-serif text-stone-900 mb-6 tracking-tight">
              Let&apos;s Connect
            </h2>
            <div className="w-16 h-1 bg-stone-900 mx-auto mb-8" />
            <p className="text-stone-600 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              I am currently seeking internship opportunities for this summer
              in Software Engineering, Data Science, or Machine Learning.
              Whether you have a role in mind or just want to discuss tech and
              photography, my inbox is open.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-16">
            <a
              href="mailto:supratikg4@gmail.com"
              className="flex items-center justify-center gap-3 px-8 py-5 bg-white border border-stone-200 rounded-sm hover:border-stone-900 transition-colors w-full md:w-auto min-w-[280px] shadow-sm hover:shadow-md group"
            >
              <Mail className="text-stone-400 group-hover:text-stone-900 transition-colors" />
              <span className="text-stone-700 font-medium tracking-wide">
                supratikg4@gmail.com
              </span>
            </a>

            <a
              href="tel:+19784947811"
              className="flex items-center justify-center gap-3 px-8 py-5 bg-white border border-stone-200 rounded-sm hover:border-stone-900 transition-colors w-full md:w-auto min-w-[280px] shadow-sm hover:shadow-md group"
            >
              <Phone className="text-stone-400 group-hover:text-stone-900 transition-colors" />
              <span className="text-stone-700 font-medium tracking-wide">
                (978) 494-7811
              </span>
            </a>
          </div>

          <div className="flex justify-center gap-8">
            <a
              href="https://github.com/supratikg4"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex flex-col items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors group"
            >
              <div className="p-4 bg-white border border-stone-200 rounded-full group-hover:border-stone-900 shadow-sm">
                <FaGithub size={24} />
              </div>
              <span className="text-xs font-medium">GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/supratikg4"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex flex-col items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors group"
            >
              <div className="p-4 bg-white border border-stone-200 rounded-full group-hover:border-stone-900 shadow-sm">
                <FaLinkedin size={24} />
              </div>
              <span className="text-xs font-medium">LinkedIn</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
