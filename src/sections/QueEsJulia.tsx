import { useEffect, useRef } from 'react';
import { Search, HandCoins, Scale, Users } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Detección de casos',
    description:
      'Identificamos sucesiones con bienes inmuebles no regularizados y rastreamos a posibles herederos.',
  },
  {
    icon: HandCoins,
    title: 'Financiamiento integral',
    description:
      'El inversionista cubre gastos judiciales, honorarios, peritajes y trámites. El cliente paga solo al final.',
  },
  {
    icon: Scale,
    title: 'Litigio especializado',
    description:
      'Abogados expertos en derecho sucesorio que gestionan todo el proceso hasta la adjudicación.',
  },
  {
    icon: Users,
    title: 'Conexión de actores',
    description:
      'Conectamos herederos, abogados e inversionistas en un modelo de beneficio mutuo.',
  },
];

export default function QueEsJulia() {
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
      id="que-es"
      ref={sectionRef}
      className="julia-section relative bg-white"
    >
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-julia-blue/10 to-transparent" />
      
      <div className="julia-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column - Main Content */}
          <div>
            <div className="reveal mb-6">
              <span className="julia-label">Nuestro Modelo</span>
            </div>
            
            <h2 className="reveal animate-delay-100 julia-heading-lg text-julia-blue mb-8">
              ¿Qué es JULIA?
            </h2>
            
            <div className="reveal animate-delay-200 space-y-6">
              <p className="julia-body text-julia-charcoal/90">
                JULIA es una plataforma de originación y gestión de sucesiones respaldadas 
                por bienes inmuebles. Integramos el razonamiento jurídico humano con 
                herramientas de análisis asistido para estructurar casos de herencia 
                como activos financieros invertibles.
              </p>
              
              <div className="py-8 border-y border-julia-blue/10 my-8">
                <p className="font-serif text-xl md:text-2xl text-julia-blue leading-relaxed">
                  &ldquo;No somos un despacho tradicional. Somos una plataforma que libera 
                  el valor de bienes inmuebles bloqueados por procesos sucesorios.&rdquo;
                </p>
              </div>
              
              <div className="bg-julia-blue/[0.02] p-6 lg:p-8">
                <h4 className="font-serif text-lg text-julia-blue mb-3">
                  Tres actores, un objetivo
                </h4>
                <p className="julia-body-sm mb-4">
                  Nuestro modelo conecta:
                </p>
                <ul className="space-y-2 julia-body-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-julia-gold font-medium">•</span>
                    <span><strong>El heredero</strong> — quien tiene derecho pero no liquidez</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-julia-gold font-medium">•</span>
                    <span><strong>JULIA</strong> — el despacho que litiga y gestiona</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-julia-gold font-medium">•</span>
                    <span><strong>El inversionista</strong> — quien financia y participa en el retorno</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Right Column - Features */}
          <div className="lg:pt-16">
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="reveal group"
                  style={{ animationDelay: `${300 + index * 100}ms` }}
                >
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-julia-blue/5 flex items-center justify-center transition-colors group-hover:bg-julia-gold/10">
                        <feature.icon
                          size={24}
                          className="text-julia-blue transition-colors group-hover:text-julia-gold"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-serif text-xl text-julia-blue mb-3">
                        {feature.title}
                      </h3>
                      <p className="julia-body-sm">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Stats */}
            <div className="reveal mt-12 pt-8 border-t border-julia-blue/10">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <span className="font-serif text-4xl lg:text-5xl text-julia-gold">100+</span>
                  <p className="julia-body-sm mt-2">Sucesiones en portafolio</p>
                </div>
                <div>
                  <span className="font-serif text-4xl lg:text-5xl text-julia-gold">$200M</span>
                  <p className="julia-body-sm mt-2">Valor estimado del portafolio</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
