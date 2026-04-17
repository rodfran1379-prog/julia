'use client';

import { useEffect, useRef } from 'react';
import { FileText, Home, Gavel, Scale, CheckCircle, MessageCircle } from 'lucide-react';
import WhatsAppButton from '@/components/WhatsAppButton';

const servicios = [
  {
    icon: FileText,
    titulo: 'Juicios Sucesorios Intestamentarios',
    descripcion: 'Cuando no existe testamento, gestionamos todo el proceso de declaración de herederos, inventario de bienes y adjudicación final del patrimonio.',
    imagen: '/images/servicio-documentos.jpg',
    beneficios: [
      'Sin costo inicial',
      'Financiamiento disponible',
      'Cobertura en todo Nuevo León',
      'Abogado especializado asignado',
    ],
    tiempo: '18-36 meses promedio',
  },
  {
    icon: Home,
    titulo: 'Recuperación de Herencias',
    descripcion: 'Identificamos bienes inmuebles abandonados o en litigio y trabajamos para su regularización y recuperación patrimonial completa.',
    imagen: '/images/servicio-casa.jpg',
    beneficios: [
      'Casas, terrenos, departamentos',
      'Bienes olvidados o abandonados',
      'Herencias desde el extranjero',
      'Rastreo de documentación',
    ],
    tiempo: 'Según complejidad',
  },
  {
    icon: Gavel,
    titulo: 'Defensa de Derechos Hereditarios',
    descripcion: 'Protegemos tu legítima ante cualquier vulneración, incluyendo conflictos entre coherederos e impugnación de testamentos.',
    imagen: '/images/servicio-juzgado.jpg',
    beneficios: [
      'Legítima forzosa protegida',
      'Colación de donaciones',
      'Acciones de nulidad',
      'Defensa en juicio',
    ],
    tiempo: 'Variable',
  },
  {
    icon: Scale,
    titulo: 'Regularización Patrimonial',
    descripcion: 'Estructuramos esquemas jurídicos que permiten la correcta transmisión de bienes entre generaciones de forma ordenada.',
    imagen: '/images/servicio-finanzas.jpg',
    beneficios: [
      'Planeación sucesoria',
      'Fideicomisos testamentarios',
      'Sociedades patrimoniales',
      'Testamentos vitales',
    ],
    tiempo: '2-4 semanas',
  },
];

export default function Servicios() {
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
      id="servicios"
      ref={sectionRef}
      className="julia-section relative bg-julia-cream"
    >
      <div className="julia-container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="reveal mb-6">
            <span className="julia-label">Nuestros Servicios</span>
          </div>
          <h2 className="reveal animate-delay-100 julia-heading-lg text-julia-blue mb-6">
            Soluciones legales para cada situación
          </h2>
          <p className="reveal animate-delay-200 julia-body">
            Cada caso de herencia es único. Por eso ofrecemos servicios especializados 
            adaptados a tu situación específica.
          </p>
        </div>

        {/* Services Grid */}
        <div className="reveal animate-delay-300 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {servicios.map((servicio) => (
            <div
              key={servicio.titulo}
              className="bg-white overflow-hidden hover:shadow-xl transition-all duration-300 border border-julia-blue/5 group"
            >
              {/* Service Image */}
              <div className="aspect-video overflow-hidden">
                <img 
                  src={servicio.imagen} 
                  alt={servicio.titulo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-julia-blue/5 flex items-center justify-center transition-colors group-hover:bg-julia-gold/10 flex-shrink-0">
                    <servicio.icon
                      size={28}
                      className="text-julia-blue transition-colors group-hover:text-julia-gold"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl text-julia-blue mb-3 group-hover:text-julia-gold transition-colors">
                      {servicio.titulo}
                    </h3>
                    <p className="julia-body-sm mb-6">{servicio.descripcion}</p>
                    
                    <div className="space-y-2 mb-6">
                      {servicio.beneficios.map((beneficio, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-julia-charcoal">
                          <CheckCircle size={14} className="text-julia-gold flex-shrink-0" />
                          {beneficio}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-julia-blue/10">
                      <span className="text-sm text-julia-gray">
                        <span className="font-medium">Tiempo:</span> {servicio.tiempo}
                      </span>
                      <WhatsAppButton
                        message={`Hola, me interesa el servicio de ${servicio.titulo}`}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1 text-sm font-medium text-julia-blue hover:text-julia-gold transition-colors"
                      >
                        <MessageCircle size={14} />
                        Cotizar aquí
                      </WhatsAppButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="reveal animate-delay-500 mt-12 text-center">
          <p className="julia-body-sm text-julia-gray mb-6">
            ¿No encuentras lo que buscas? Contáctanos para una evaluación personalizada.
          </p>
          <a href="#contacto" className="julia-btn-primary">
            Hablar con un especialista
          </a>
        </div>
      </div>
    </section>
  );
}
