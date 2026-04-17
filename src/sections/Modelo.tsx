'use client';

import { useEffect, useRef } from 'react';
import { TrendingUp, Wallet, Shield, CheckCircle } from 'lucide-react';

const pasos = [
  {
    number: '01',
    title: 'Captación de sucesiones',
    description: 'Identificamos casos con bienes inmuebles y evaluamos su viabilidad legal.',
  },
  {
    number: '02',
    title: 'Análisis del caso',
    description: 'Estudiamos documentación, valor del bien y situación de herederos.',
  },
  {
    number: '03',
    title: 'Integración al portafolio',
    description: 'El caso se estructura como activo financiero y se ofrece a inversionistas.',
  },
  {
    number: '04',
    title: 'Financiamiento inicial',
    description: 'El fondo aporta capital equivalente al 10% del valor estimado.',
  },
  {
    number: '05',
    title: 'Litigio sucesorio',
    description: 'JULIA gestiona todo el proceso judicial hasta la adjudicación.',
  },
  {
    number: '06',
    title: 'Distribución',
    description: 'Al recuperar, el cliente recibe su herencia y se distribuyen honorarios.',
  },
];

export default function Modelo() {
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
      id="modelo"
      ref={sectionRef}
      className="julia-section relative bg-julia-blue text-white"
    >
      <div className="julia-container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="reveal mb-6">
            <span className="font-sans text-xs uppercase tracking-[0.2em] font-medium text-julia-gold">
              Asset-Backed Litigation
            </span>
          </div>
          <h2 className="reveal animate-delay-100 font-serif text-3xl md:text-4xl lg:text-5xl font-medium mb-6">
            Modelo de Financiamiento
          </h2>
          <p className="reveal animate-delay-200 font-sans text-base md:text-lg leading-relaxed text-white/80">
            Un sistema que permite recuperar herencias sin costo inicial. 
            El inversionista financia el proceso y participa en el retorno.
          </p>
        </div>

        {/* How it works - Cards */}
        <div className="reveal animate-delay-300 grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Cliente */}
          <div className="bg-white/5 backdrop-blur-sm p-8 lg:p-10">
            <div className="w-12 h-12 bg-julia-gold/20 flex items-center justify-center mb-6">
              <Wallet size={24} className="text-julia-gold" />
            </div>
            <h3 className="font-serif text-xl mb-4">Para el heredero</h3>
            <ul className="space-y-3 font-sans text-sm text-white/80">
              <li className="flex items-start gap-3">
                <CheckCircle size={16} className="text-julia-gold mt-0.5 flex-shrink-0" />
                <span>No pagas nada al inicio</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={16} className="text-julia-gold mt-0.5 flex-shrink-0" />
                <span>Nosotros cubrimos todos los gastos</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={16} className="text-julia-gold mt-0.5 flex-shrink-0" />
                <span>Pagas solo el 30% al final, del valor recuperado</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={16} className="text-julia-gold mt-0.5 flex-shrink-0" />
                <span>Recibes el 70% de tu herencia</span>
              </li>
            </ul>
          </div>

          {/* Inversionista */}
          <div className="bg-white/5 backdrop-blur-sm p-8 lg:p-10">
            <div className="w-12 h-12 bg-julia-gold/20 flex items-center justify-center mb-6">
              <TrendingUp size={24} className="text-julia-gold" />
            </div>
            <h3 className="font-serif text-xl mb-4">Para el inversionista</h3>
            <ul className="space-y-3 font-sans text-sm text-white/80">
              <li className="flex items-start gap-3">
                <CheckCircle size={16} className="text-julia-gold mt-0.5 flex-shrink-0" />
                <span>Aportas el 10% del valor estimado</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={16} className="text-julia-gold mt-0.5 flex-shrink-0" />
                <span>Recibes el 23% del valor recuperado</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={16} className="text-julia-gold mt-0.5 flex-shrink-0" />
                <span>ROI aproximado: 2.3x</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={16} className="text-julia-gold mt-0.5 flex-shrink-0" />
                <span>Portafolio diversificado de sucesiones</span>
              </li>
            </ul>
          </div>

          {/* JULIA */}
          <div className="bg-white/5 backdrop-blur-sm p-8 lg:p-10">
            <div className="w-12 h-12 bg-julia-gold/20 flex items-center justify-center mb-6">
              <Shield size={24} className="text-julia-gold" />
            </div>
            <h3 className="font-serif text-xl mb-4">JULIA</h3>
            <ul className="space-y-3 font-sans text-sm text-white/80">
              <li className="flex items-start gap-3">
                <CheckCircle size={16} className="text-julia-gold mt-0.5 flex-shrink-0" />
                <span>Originamos y estructuramos casos</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={16} className="text-julia-gold mt-0.5 flex-shrink-0" />
                <span>Litigamos todo el proceso</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={16} className="text-julia-gold mt-0.5 flex-shrink-0" />
                <span>Recibimos el 7% por operación</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={16} className="text-julia-gold mt-0.5 flex-shrink-0" />
                <span>Administramos el portafolio</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Example */}
        <div className="reveal animate-delay-400 bg-white/5 backdrop-blur-sm p-8 lg:p-12 mb-16">
          <h3 className="font-serif text-2xl text-center mb-8">Ejemplo práctico</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="font-sans text-sm text-white/60 mb-2">Valor del inmueble</p>
              <p className="font-serif text-3xl lg:text-4xl text-julia-gold">$3,000,000</p>
            </div>
            <div>
              <p className="font-sans text-sm text-white/60 mb-2">Inversión inicial</p>
              <p className="font-serif text-3xl lg:text-4xl text-white">$300,000</p>
            </div>
            <div>
              <p className="font-sans text-sm text-white/60 mb-2">Retorno inversionista</p>
              <p className="font-serif text-3xl lg:text-4xl text-julia-gold">$690,000</p>
            </div>
            <div>
              <p className="font-sans text-sm text-white/60 mb-2">Heredero recibe</p>
              <p className="font-serif text-3xl lg:text-4xl text-white">$2,100,000</p>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="reveal animate-delay-500">
          <h3 className="font-serif text-2xl text-center mb-10">Proceso completo</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pasos.map((paso) => (
              <div key={paso.number} className="flex gap-4">
                <span className="font-serif text-2xl text-julia-gold/60">{paso.number}</span>
                <div>
                  <h4 className="font-serif text-lg mb-2">{paso.title}</h4>
                  <p className="font-sans text-sm text-white/70">{paso.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
