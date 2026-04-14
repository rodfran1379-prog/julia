import { useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown, Globe, TrendingUp, MessageCircle } from 'lucide-react';

const charlas = [
  {
    icon: Globe,
    title: 'Contacto y Sitio Web',
    description: 'Presencia digital profesional que genera confianza desde el primer contacto.',
  },
  {
    icon: TrendingUp,
    title: 'Migración Web',
    description: 'Digitalización completa de procesos legales para mayor eficiencia.',
  },
  {
    icon: MessageCircle,
    title: 'Post Viral Abogado',
    description: 'Estrategia de contenido que posiciona tu marca como referente.',
  },
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = heroRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => {
      el.classList.add('opacity-0');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-julia-cream via-white to-julia-cream" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-julia-blue/[0.02] to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-julia-gold/[0.03] rounded-full blur-3xl" />
      
      {/* Content */}
      <div className="relative z-10 julia-container pt-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Label */}
          <div className="reveal mb-8">
            <span className="julia-label">Herencias & Sucesiones en Nuevo León</span>
          </div>
          
          {/* Main Title */}
          <h1 className="reveal animate-delay-100 mb-6">
            <span className="julia-heading-xl text-julia-blue block">
              JULIA
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="reveal animate-delay-200 font-serif text-xl md:text-2xl lg:text-3xl text-julia-charcoal/80 mb-8 tracking-wide">
            Recuperamos patrimonios. Sin costo inicial.
          </p>
          
          {/* Description */}
          <p className="reveal animate-delay-300 julia-body max-w-2xl mx-auto mb-12">
            Especialistas en juicios sucesorios intestamentarios en Nuevo León. 
            Si tienes derecho a una herencia pero no los recursos para iniciar el proceso, 
            nosotros financiamos tu caso y recuperamos tu patrimonio.
          </p>
          
          {/* CTA Buttons */}
          <div className="reveal animate-delay-400 flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <button
              onClick={() => scrollToSection('#servicios')}
              className="julia-btn-primary group"
            >
              Conoce nuestros servicios
              <ArrowRight
                size={16}
                className="ml-2 transition-transform group-hover:translate-x-1"
              />
            </button>
            <button
              onClick={() => scrollToSection('#contacto')}
              className="julia-btn-outline"
            >
              Consulta gratuita
            </button>
          </div>
          
          {/* Three Pillars - Las 3 Charlas Históricas */}
          <div className="reveal animate-delay-500 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pt-12 border-t border-julia-blue/10">
            {charlas.map((charla) => (
              <div key={charla.title} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-6 bg-julia-blue/5 flex items-center justify-center transition-all group-hover:bg-julia-gold/10">
                  <charla.icon
                    size={28}
                    className="text-julia-blue transition-colors group-hover:text-julia-gold"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="julia-divider mx-auto mb-6" />
                <h3 className="font-serif text-xl md:text-2xl text-julia-blue mb-4">
                  {charla.title}
                </h3>
                <p className="julia-body-sm">{charla.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown size={24} className="text-julia-gold/60" />
      </div>
    </section>
  );
}
