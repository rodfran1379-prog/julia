'use client';

import { useEffect, useRef } from 'react';
import { FileX, Users, Home, Scale, AlertCircle, Clock, DollarSign, MessageCircle } from 'lucide-react';
import WhatsAppButton from '@/components/WhatsAppButton';

const problemas = [
  {
    icon: FileX,
    titulo: 'No hay testamento',
    descripcion: 'Tu familiar falleció sin dejar testamento y no sabes cómo reclamar tu parte de la herencia.',
    sintomas: ['No sabes quiénes son los herederos', 'No hay documentos claros', 'La familia está en desacuerdo'],
  },
  {
    icon: Users,
    titulo: 'Conflicto entre herederos',
    descripcion: 'Tu hermano, tío o primo no quiere repartir los bienes de forma justa.',
    sintomas: ['Discusiones constantes', 'Alguien quiere quedarse con todo', 'No hay comunicación'],
  },
  {
    icon: Home,
    titulo: 'Propiedad sin escriturar',
    descripcion: 'Tienes una casa o terreno que no puedes vender, rentar ni escriturar a tu nombre.',
    sintomas: ['No puedes demostrar que es tuyo', 'No puedes vender', 'Está abandonado'],
  },
  {
    icon: Scale,
    titulo: 'Juicio detenido',
    descripcion: 'Iniciaste un juicio sucesorio pero lleva años sin avanzar o te quedaste sin abogado.',
    sintomas: ['Años sin respuesta', 'Abogado desapareció', 'No sabes en qué etapa va'],
  },
  {
    icon: DollarSign,
    titulo: 'No tienes dinero para el juicio',
    descripcion: 'Sabes que tienes derecho a una herencia pero no puedes pagar los gastos legales.',
    sintomas: ['Honorarios de abogado', 'Gastos de juicio', 'Impuestos y trámites'],
  },
  {
    icon: Clock,
    titulo: 'Herencia en el extranjero',
    descripcion: 'Tienes derechos hereditarios en México pero vives en otro país.',
    sintomas: ['No puedes viajar', 'No conoces el proceso', 'Te piden estar presente'],
  },
];

export default function Problemas() {
  const sectionRef = useRef<HTMLDivElement>(null);

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

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => {
      el.classList.add('opacity-0');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="problemas"
      ref={sectionRef}
      className="julia-section relative bg-julia-blue text-white"
    >
      <div className="julia-container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="reveal mb-6">
            <span className="font-sans text-xs uppercase tracking-[0.2em] font-medium text-julia-gold">
              ¿Te suena familiar?
            </span>
          </div>
          <h2 className="reveal animate-delay-100 font-serif text-3xl md:text-4xl lg:text-5xl font-medium mb-6">
            Problemas que resolvemos todos los días
          </h2>
          <p className="reveal animate-delay-200 font-sans text-lg text-white/80">
            Si te identificas con alguna de estas situaciones, tenemos una solución para ti.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="reveal animate-delay-300 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {problemas.map((problema) => (
            <div
              key={problema.titulo}
              className="bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-julia-gold/20 flex items-center justify-center flex-shrink-0 group-hover:bg-julia-gold/30 transition-colors">
                  <problema.icon size={24} className="text-julia-gold" />
                </div>
                <div>
                  <h3 className="font-serif text-xl mb-2">{problema.titulo}</h3>
                  <p className="font-sans text-sm text-white/70">{problema.descripcion}</p>
                </div>
              </div>
              
              <div className="pl-16">
                <p className="text-xs text-white/50 mb-2">Síntomas comunes:</p>
                <ul className="space-y-1">
                  {problema.sintomas.map((sintoma, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-white/60">
                      <AlertCircle size={12} className="text-julia-gold flex-shrink-0" />
                      {sintoma}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="reveal animate-delay-500 text-center">
          <p className="font-sans text-white/70 mb-6">
            ¿Te identificas con alguno de estos problemas?
          </p>
          <WhatsAppButton
            message="Hola, tengo un problema sucesorio y me gustaría recibir orientación"
            variant="gold"
            className="inline-flex items-center gap-2"
          >
            <MessageCircle size={18} />
            Obtén tu diagnóstico por WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
