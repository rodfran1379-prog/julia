'use client';

import { useEffect, useRef, useState } from 'react';
import { TrendingUp, Shield, Clock, DollarSign, Users, CheckCircle, PieChart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const estadisticas = [
  { valor: '$50M+', label: 'Patrimonio administrado', icon: DollarSign },
  { valor: '100+', label: 'Sucesiones en portafolio', icon: PieChart },
  { valor: '25%', label: 'ROI promedio anual', icon: TrendingUp },
  { valor: '98%', label: 'Tasa de éxito', icon: CheckCircle },
];

const beneficios = [
  {
    icon: Shield,
    titulo: 'Activos Garantizados',
    descripcion: 'Cada inversión está respaldada por bienes inmuebles reales con valor comprobable.',
  },
  {
    icon: Clock,
    titulo: 'Plazos Definidos',
    descripcion: 'Los procesos sucesorios tienen duración estimada de 18-36 meses.',
  },
  {
    icon: TrendingUp,
    titulo: 'Retorno Atractivo',
    descripcion: 'ROI promedio del 25% anual, superior a instrumentos tradicionales.',
  },
  {
    icon: Users,
    titulo: 'Diversificación',
    descripcion: 'Portafolio diversificado con múltiples sucesiones en diferentes etapas.',
  },
];

const proceso = [
  { numero: '01', titulo: 'Evaluación', desc: 'Analizamos cada caso y su viabilidad legal' },
  { numero: '02', titulo: 'Integración', desc: 'El caso se agrega al portafolio de inversión' },
  { numero: '03', titulo: 'Financiamiento', desc: 'El inversionista aporta capital inicial' },
  { numero: '04', titulo: 'Litigio', desc: 'JULIA gestiona todo el proceso judicial' },
  { numero: '05', titulo: 'Adjudicación', desc: 'Se adjudican los bienes a los herederos' },
  { numero: '06', titulo: 'Retorno', desc: 'Distribución de utilidades según contrato' },
];

export default function Inversionistas() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    monto: '',
  });
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setShowForm(false);
      setSubmitted(false);
      setFormData({ nombre: '', email: '', telefono: '', monto: '' });
    }, 2000);
  };

  return (
    <section
      id="inversionistas"
      ref={sectionRef}
      className="julia-section relative bg-julia-blue text-white"
    >
      <div className="julia-container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="reveal mb-6">
            <span className="font-sans text-xs uppercase tracking-[0.2em] font-medium text-julia-gold">
              Oportunidad de Inversión
            </span>
          </div>
          <h2 className="reveal animate-delay-100 font-serif text-3xl md:text-4xl lg:text-5xl font-medium mb-6">
            Fondo de Sucesiones JULIA
          </h2>
          <p className="reveal animate-delay-200 font-sans text-base md:text-lg leading-relaxed text-white/80">
            Invierte en el mercado de sucesiones respaldadas por bienes inmuebles. 
            Un modelo de inversión alternativa con retornos atractivos y activos tangibles.
          </p>
        </div>

        {/* Stats */}
        <div className="reveal animate-delay-300 grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {estadisticas.map((stat, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm p-6 text-center">
              <stat.icon size={32} className="mx-auto mb-4 text-julia-gold" />
              <p className="font-serif text-3xl lg:text-4xl text-julia-gold mb-2">{stat.valor}</p>
              <p className="font-sans text-sm text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="reveal animate-delay-400 grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {beneficios.map((beneficio, index) => (
            <div key={index} className="flex gap-4 bg-white/5 backdrop-blur-sm p-6">
              <div className="w-12 h-12 bg-julia-gold/20 flex items-center justify-center flex-shrink-0">
                <beneficio.icon size={24} className="text-julia-gold" />
              </div>
              <div>
                <h3 className="font-serif text-xl mb-2">{beneficio.titulo}</h3>
                <p className="font-sans text-sm text-white/70">{beneficio.descripcion}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="reveal animate-delay-500 mb-16">
          <h3 className="font-serif text-2xl text-center mb-10">Proceso de Inversión</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {proceso.map((paso, index) => (
              <div key={index} className="text-center">
                <span className="font-serif text-3xl text-julia-gold/60">{paso.numero}</span>
                <h4 className="font-serif text-lg mt-2 mb-1">{paso.titulo}</h4>
                <p className="font-sans text-xs text-white/60">{paso.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Example */}
        <div className="reveal animate-delay-600 bg-white/5 backdrop-blur-sm p-8 lg:p-12 mb-16">
          <h3 className="font-serif text-2xl text-center mb-8">Ejemplo de Inversión</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="font-sans text-sm text-white/60 mb-2">Inversión Inicial</p>
              <p className="font-serif text-4xl text-julia-gold">$300,000</p>
              <p className="font-sans text-xs text-white/50 mt-1">10% del valor estimado</p>
            </div>
            <div>
              <p className="font-sans text-sm text-white/60 mb-2">Valor Recuperado</p>
              <p className="font-serif text-4xl text-white">$690,000</p>
              <p className="font-sans text-xs text-white/50 mt-1">23% del valor total</p>
            </div>
            <div>
              <p className="font-sans text-sm text-white/60 mb-2">Retorno Neto</p>
              <p className="font-serif text-4xl text-julia-gold">$390,000</p>
              <p className="font-sans text-xs text-white/50 mt-1">130% de ganancia</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="reveal animate-delay-700 text-center">
          <h3 className="font-serif text-2xl mb-4">¿Interesado en invertir?</h3>
          <p className="font-sans text-white/70 mb-6 max-w-xl mx-auto">
            Agenda una reunión con nuestro equipo para conocer el portafolio actual 
            y las oportunidades de inversión disponibles.
          </p>
          <button 
            onClick={() => setShowForm(true)}
            className="julia-btn-gold inline-flex items-center gap-2"
          >
            Quiero más información
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Form Dialog */}
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="max-w-md bg-white">
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl text-julia-blue">
                Información para Inversionistas
              </DialogTitle>
            </DialogHeader>
            
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle size={48} className="mx-auto text-julia-gold mb-4" />
                <h4 className="font-serif text-xl text-julia-blue mb-2">¡Gracias!</h4>
                <p className="julia-body-sm">Nos pondremos en contacto contigo pronto.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-julia-charcoal mb-2">
                    Nombre completo
                  </label>
                  <Input
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    placeholder="Tu nombre"
                    className="border-julia-blue/20"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-julia-charcoal mb-2">
                    Correo electrónico
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="tu@email.com"
                    className="border-julia-blue/20"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-julia-charcoal mb-2">
                    Teléfono
                  </label>
                  <Input
                    value={formData.telefono}
                    onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                    placeholder="(81) 0000 0000"
                    className="border-julia-blue/20"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-julia-charcoal mb-2">
                    Monto aproximado de inversión
                  </label>
                  <Input
                    value={formData.monto}
                    onChange={(e) => setFormData({...formData, monto: e.target.value})}
                    placeholder="Ej: $500,000"
                    className="border-julia-blue/20"
                  />
                </div>
                <Button type="submit" className="w-full julia-btn-primary">
                  Enviar solicitud
                </Button>
                <p className="text-xs text-julia-gray text-center">
                  Esta información es confidencial y será utilizada únicamente para contactarte.
                </p>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
