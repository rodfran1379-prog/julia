import { useEffect, useRef } from 'react';
import { FileText, Home, Gavel, Calculator, Scale, Shield } from 'lucide-react';

const servicios = [
  {
    icon: FileText,
    title: 'Juicios Sucesorios Intestamentarios',
    description: 'Cuando no existe testamento, gestionamos todo el proceso de declaración de herederos, inventario de bienes y adjudicación final del patrimonio.',
    features: ['Sin costo inicial', 'Financiamiento disponible', 'Todo Nuevo León'],
  },
  {
    icon: Home,
    title: 'Recuperación de Herencias',
    description: 'Identificamos bienes inmuebles abandonados o en litigio y trabajamos para su regularización y recuperación patrimonial completa.',
    features: ['Casa, terrenos, departamentos', 'Bienes olvidados', 'Herencias extranjeras'],
  },
  {
    icon: Gavel,
    title: 'Defensa de Derechos Hereditarios',
    description: 'Protegemos tu legítima ante cualquier vulneración, incluyendo conflictos entre coherederos e impugnación de testamentos.',
    features: ['Legítima forzosa', 'Colación de donaciones', 'Acciones de nulidad'],
  },
  {
    icon: Scale,
    title: 'Regularización Patrimonial',
    description: 'Estructuramos esquemas jurídicos que permiten la correcta transmisión de bienes entre generaciones de forma ordenada.',
    features: ['Planeación sucesoria', 'Fideicomisos', 'Sociedades patrimoniales'],
  },
  {
    icon: Calculator,
    title: 'Cálculo de Impuestos y Gastos',
    description: 'Determinamos con precisión todos los costos involucrados en el proceso sucesorio para que tomes decisiones informadas.',
    features: ['ISAI', 'Honorarios notariales', 'Gastos de juicio'],
  },
  {
    icon: Shield,
    title: 'Asesoría Preventiva',
    description: 'Te ayudamos a estructurar tu patrimonio de manera que la transmisión a tus herederos sea lo más sencilla posible.',
    features: ['Testamentos', 'Donaciones', 'Poderes'],
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
      className="julia-section relative bg-white"
    >
      <div className="julia-container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="reveal mb-6">
            <span className="julia-label">Nuestros Servicios</span>
          </div>
          <h2 className="reveal animate-delay-100 julia-heading-lg text-julia-blue mb-6">
            Especialistas en Derecho Sucesorio
          </h2>
          <p className="reveal animate-delay-200 julia-body">
            Ofrecemos soluciones jurídicas integrales en materia de herencias y sucesiones. 
            Todos nuestros servicios están disponibles en el estado de Nuevo León.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicios.map((servicio, index) => (
            <div
              key={servicio.title}
              className="reveal julia-card group hover:shadow-xl transition-all duration-300 border border-julia-blue/5"
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-julia-blue/5 flex items-center justify-center transition-colors group-hover:bg-julia-gold/10 flex-shrink-0">
                  <servicio.icon
                    size={24}
                    className="text-julia-blue transition-colors group-hover:text-julia-gold"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-serif text-xl text-julia-blue leading-tight">
                  {servicio.title}
                </h3>
              </div>
              
              <p className="julia-body-sm mb-6">{servicio.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {servicio.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1 bg-julia-blue/5 text-julia-blue text-xs font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="reveal animate-delay-700 mt-12 text-center">
          <p className="julia-body-sm text-julia-charcoal/60 mb-6">
            ¿No encuentras lo que buscas? Contáctanos para una evaluación personalizada.
          </p>
          <a href="#contacto" className="julia-btn-outline">
            Solicitar información
          </a>
        </div>
      </div>
    </section>
  );
}
