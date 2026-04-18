"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, AlertTriangle, MessageCircle } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const elements = heroRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => {
      el.classList.add("opacity-0");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-julia-cream via-white to-julia-cream" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-julia-blue/[0.03] to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-julia-gold/[0.05] rounded-full blur-3xl" />

      <div className="relative z-10 julia-container">
        <div className="max-w-5xl mx-auto">
          {/* Alert Banner */}
          <div className="reveal mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 bg-julia-gold/10 border border-julia-gold/30 px-4 py-2 rounded-full">
              <AlertTriangle size={16} className="text-julia-gold" />
              <span className="text-sm font-medium text-julia-charcoal">
                Más de 2,000 familias en Nuevo León tienen bienes bloqueados por
                sucesiones sin resolver
              </span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="reveal animate-delay-100 text-center mb-6">
            <span className="julia-heading-xl text-julia-blue block mb-4">
              Especialistas en Herencias y Sucesiones
            </span>
            <span className="font-serif text-2xl md:text-3xl lg:text-4xl text-julia-charcoal/80 block">
              en Nuevo León
            </span>
          </h1>

          {/* Value Proposition */}
          <p className="reveal animate-delay-200 text-center julia-body max-w-3xl mx-auto mb-10 text-xl">
            Resolvemos conflictos hereditarios de forma{" "}
            <span className="text-julia-blue font-medium">clara</span>,
            <span className="text-julia-blue font-medium"> rápida</span> y
            <span className="text-julia-blue font-medium">
              {" "}
              legalmente segura
            </span>
            .
            <br />
            <span className="text-julia-gold font-medium">
              Sin costo inicial.
            </span>{" "}
            Solo pagas cuando recuperes tu patrimonio.
          </p>

          {/* CTA Buttons */}
          <div className="reveal animate-delay-300 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <WhatsAppButton
              message="Hola, me interesa agendar una consulta sobre herencias"
              className="julia-btn-primary group text-lg py-5 px-10"
            >
              Agenda tu diagnóstico legal{" "}
              <ArrowRight
                size={18}
                className="ml-2 transition-transform group-hover:translate-x-1"
              />
            </WhatsAppButton>
            <a href="#problemas" className="julia-btn-outline text-julia-gold border-julia-gold hover:text-white hover:border-julia-gold hover:bg-julia-gold border-2">
              ¿Te suena familiar?
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="reveal animate-delay-400 flex flex-wrap justify-center gap-8 mb-12 text-center">
            <div>
              <p className="font-serif text-3xl text-julia-gold">100+</p>
              <p className="text-sm text-julia-gray">Sucesiones resueltas</p>
            </div>
            <div>
              <p className="font-serif text-3xl text-julia-gold">$50M+</p>
              <p className="text-sm text-julia-gray">Patrimonio recuperado</p>
            </div>
            <div>
              <p className="font-serif text-3xl text-julia-gold">98%</p>
              <p className="text-sm text-julia-gray">Clientes satisfechos</p>
            </div>
          </div>

          {/* Company Logo */}
          <div className="reveal animate-delay-500 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-julia-gold/20 rounded-full blur-2xl" />
              <img
                src="/images/julia.png"
                alt="Julia - Especialistas en Herencias"
                className="relative w-48 h-48 md:w-56 md:h-56 object-contain rounded-full border-4 border-white shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
