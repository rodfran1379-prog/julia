'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const preguntas = [
  {
    pregunta: '¿Cuánto tiempo dura un juicio sucesorio en Nuevo León?',
    respuesta: 'La duración varía según la complejidad del caso. En promedio, un juicio sucesorio intestamentario en Nuevo León puede durar entre 18 y 36 meses. Factores como el número de herederos, la existencia de conflictos entre ellos, y la disponibilidad de documentación pueden acelerar o retrasar el proceso.',
  },
  {
    pregunta: '¿Qué pasa si no hay testamento?',
    respuesta: 'Cuando no existe testamento, se procede a una sucesión intestamentaria. En este caso, la ley determina quiénes son los herederos y en qué proporción les corresponde la herencia. Generalmente, el cónyuge y los hijos son los herederos forzosos que reciben la legítima.',
  },
  {
    pregunta: '¿Cuánto cuesta un juicio sucesorio?',
    respuesta: 'Los costos varían según el valor de los bienes. Generalmente incluyen: ISAI (2-3% del valor), honorarios notariales (1-2%), honorarios de abogado (variable), y otros gastos como edictos y peritajes. En JULIA ofrecemos financiamiento para que no pagues nada al inicio.',
  },
  {
    pregunta: '¿Quiénes son los herederos forzosos?',
    respuesta: 'Los herederos forzosos son aquellos que la ley protege y a quienes no se les puede quitar su parte de la herencia mediante testamento. En México, son los descendientes (hijos, nietos), el cónyuge, y en su defecto, los ascendientes (padres, abuelos).',
  },
  {
    pregunta: '¿Puedo vender una propiedad que heredé antes de terminar la sucesión?',
    respuesta: 'No. Mientras no se concluya el juicio sucesorio y se realice la adjudicación formal, los bienes no pueden ser vendidos, hipotecados ni transferidos. Es necesario esperar a que el juez emita la resolución que adjudica los bienes a cada heredero.',
  },
  {
    pregunta: '¿Qué es la legítima?',
    respuesta: 'La legítima es la parte de la herencia que por ley corresponde a los herederos forzosos y que no puede ser menoscabada por el testador. En México, la legítima corresponde a dos tercios del patrimonio cuando existen herederos forzosos.',
  },
  {
    pregunta: '¿Cómo funciona el financiamiento de JULIA?',
    respuesta: 'Nuestro modelo de financiamiento permite iniciar el juicio sucesorio sin costo inicial. Un inversionista aporta el capital necesario (aproximadamente 10% del valor de los bienes) para cubrir gastos judiciales. Al final del proceso, el cliente paga un porcentaje del valor recuperado.',
  },
  {
    pregunta: '¿Puedo hacer testamento si ya tengo una herencia pendiente?',
    respuesta: 'Sí, puedes hacer testamento de tus propios bienes en cualquier momento, incluso si tienes una herencia pendiente por recibir. Es recomendable hacerlo para evitar que tus bienes también queden en una sucesión intestamentaria.',
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [abierta, setAbierta] = useState<number | null>(null);

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
      id="faq"
      ref={sectionRef}
      className="julia-section relative bg-white"
    >
      <div className="julia-container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="reveal mb-6">
            <span className="julia-label">Preguntas Frecuentes</span>
          </div>
          <h2 className="reveal animate-delay-100 julia-heading-lg text-julia-blue mb-6">
            Resolvemos tus Dudas
          </h2>
          <p className="reveal animate-delay-200 julia-body">
            Respuestas a las preguntas más comunes sobre herencias, sucesiones y 
            nuestros servicios legales en Nuevo León.
          </p>
        </div>

        {/* FAQ List */}
        <div className="reveal animate-delay-300 max-w-3xl mx-auto space-y-4">
          {preguntas.map((item, index) => (
            <div
              key={index}
              className="border border-julia-blue/10 overflow-hidden"
            >
              <button
                onClick={() => setAbierta(abierta === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-julia-cream/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <HelpCircle size={20} className="text-julia-gold flex-shrink-0" />
                  <span className="font-serif text-lg text-julia-blue">{item.pregunta}</span>
                </div>
                <ChevronDown
                  size={20}
                  className={`text-julia-gold flex-shrink-0 transition-transform ${
                    abierta === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {abierta === index && (
                <div className="px-6 pb-6 pl-14">
                  <p className="julia-body-sm">{item.respuesta}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="reveal animate-delay-500 mt-12 text-center">
          <p className="julia-body-sm text-julia-gray mb-4">
            ¿No encuentras la respuesta que buscas?
          </p>
          <a href="#contacto" className="julia-btn-outline">
            Contáctanos directamente
          </a>
        </div>
      </div>
    </section>
  );
}
