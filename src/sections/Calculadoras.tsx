'use client';

import { useEffect, useRef, useState } from 'react';
import { Users, DollarSign, Percent, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Calculadora de Herederos
function CalculadoraHerederos() {
  const [valorBienes, setValorBienes] = useState('');
  const [numHijos, setNumHijos] = useState('');
  const [conyuge, setConyuge] = useState(false);
  const [resultado, setResultado] = useState<{
    legConyuge: number;
    legHijos: number;
    libre: number;
    porHijo: number;
  } | null>(null);

  const calcular = () => {
    const valor = parseFloat(valorBienes) || 0;
    const hijos = parseInt(numHijos) || 0;
    
    let legConyuge = 0;
    let legHijos = 0;
    
    if (conyuge) {
      legConyuge = valor * 0.5;
      legHijos = valor * 0.5;
    } else {
      legHijos = valor;
    }
    
    const porHijo = hijos > 0 ? legHijos / hijos : 0;
    const libre = 0; // En intestado no hay porción libre
    
    setResultado({ legConyuge, legHijos, libre, porHijo });
  };

  return (
    <div className="bg-white p-8 border border-julia-blue/10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-julia-blue/5 flex items-center justify-center">
          <Users size={24} className="text-julia-blue" />
        </div>
        <div>
          <h3 className="font-serif text-xl text-julia-blue">Calculadora de Herederos</h3>
          <p className="text-sm text-julia-gray">Distribución de la legítima</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-julia-charcoal mb-2">
            Valor total de los bienes ($)
          </label>
          <Input
            type="number"
            value={valorBienes}
            onChange={(e) => setValorBienes(e.target.value)}
            placeholder="Ej: 3,000,000"
            className="border-julia-blue/20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-julia-charcoal mb-2">
            Número de hijos
          </label>
          <Input
            type="number"
            value={numHijos}
            onChange={(e) => setNumHijos(e.target.value)}
            placeholder="Ej: 3"
            className="border-julia-blue/20"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="conyuge"
            checked={conyuge}
            onChange={(e) => setConyuge(e.target.checked)}
            className="w-5 h-5 accent-julia-blue"
          />
          <label htmlFor="conyuge" className="text-sm text-julia-charcoal">
            ¿Hay cónyuge sobreviviente?
          </label>
        </div>

        <Button onClick={calcular} className="w-full julia-btn-primary">
          Calcular Distribución
        </Button>
      </div>

      {resultado && (
        <div className="bg-julia-blue/5 p-6 space-y-3">
          <h4 className="font-serif text-lg text-julia-blue mb-4">Resultado:</h4>
          {conyuge && (
            <div className="flex justify-between">
              <span className="text-sm">Al cónyuge:</span>
              <span className="font-medium">{resultado.legConyuge.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-sm">A los hijos (total):</span>
            <span className="font-medium">{resultado.legHijos.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</span>
          </div>
          {parseInt(numHijos) > 0 && (
            <div className="flex justify-between border-t border-julia-blue/10 pt-3">
              <span className="text-sm">Por cada hijo:</span>
              <span className="font-medium text-julia-gold">{resultado.porHijo.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</span>
            </div>
          )}
        </div>
      )}

      <p className="text-xs text-julia-gray mt-4 flex items-start gap-2">
        <Info size={14} className="flex-shrink-0 mt-0.5" />
        Esta calculación es orientativa. Los porcentajes pueden variar según la situación específica.
      </p>
    </div>
  );
}

// Calculadora de Gastos
function CalculadoraGastos() {
  const [valorBienes, setValorBienes] = useState('');
  const [resultado, setResultado] = useState<{
    isai: number;
    notaria: number;
    honorarios: number;
    gastos: number;
    total: number;
  } | null>(null);

  const calcular = () => {
    const valor = parseFloat(valorBienes) || 0;
    
    // ISAI en Nuevo León: aproximadamente 2-3% del valor
    const isai = valor * 0.025;
    
    // Honorarios notariales: aproximadamente 1-2%
    const notaria = valor * 0.015;
    
    // Honorarios de abogado: variable
    const honorarios = valor * 0.07;
    
    // Otros gastos (edictos, peritajes, etc.)
    const gastos = valor * 0.03;
    
    const total = isai + notaria + honorarios + gastos;
    
    setResultado({ isai, notaria, honorarios, gastos, total });
  };

  return (
    <div className="bg-white p-8 border border-julia-blue/10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-julia-blue/5 flex items-center justify-center">
          <DollarSign size={24} className="text-julia-blue" />
        </div>
        <div>
          <h3 className="font-serif text-xl text-julia-blue">Calculadora de Gastos</h3>
          <p className="text-sm text-julia-gray">Estimación de costos del proceso</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-julia-charcoal mb-2">
            Valor estimado de los bienes ($)
          </label>
          <Input
            type="number"
            value={valorBienes}
            onChange={(e) => setValorBienes(e.target.value)}
            placeholder="Ej: 3,000,000"
            className="border-julia-blue/20"
          />
        </div>

        <Button onClick={calcular} className="w-full julia-btn-primary">
          Calcular Gastos
        </Button>
      </div>

      {resultado && (
        <div className="bg-julia-blue/5 p-6 space-y-3">
          <h4 className="font-serif text-lg text-julia-blue mb-4">Estimación de gastos:</h4>
          <div className="flex justify-between">
            <span className="text-sm">ISAI (2.5%):</span>
            <span className="font-medium">{resultado.isai.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Honorarios notariales (1.5%):</span>
            <span className="font-medium">{resultado.notaria.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Honorarios abogado (7%):</span>
            <span className="font-medium">{resultado.honorarios.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Otros gastos (3%):</span>
            <span className="font-medium">{resultado.gastos.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</span>
          </div>
          <div className="flex justify-between border-t border-julia-blue/20 pt-3 mt-3">
            <span className="font-medium">Total estimado:</span>
            <span className="font-bold text-julia-gold text-lg">{resultado.total.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-julia-gray">Porcentaje del valor:</span>
            <span className="text-julia-blue font-medium">{(resultado.total / parseFloat(valorBienes) * 100).toFixed(1)}%</span>
          </div>
        </div>
      )}

      <p className="text-xs text-julia-gray mt-4 flex items-start gap-2">
        <Info size={14} className="flex-shrink-0 mt-0.5" />
        Los montos son estimaciones. Los costos reales pueden variar según el caso específico.
      </p>
    </div>
  );
}

export default function Calculadoras() {
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
      id="calculadoras"
      ref={sectionRef}
      className="julia-section relative bg-white"
    >
      <div className="julia-container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="reveal mb-6">
            <span className="julia-label">Herramientas Útiles</span>
          </div>
          <h2 className="reveal animate-delay-100 julia-heading-lg text-julia-blue mb-6">
            Calculadoras Legales
          </h2>
          <p className="reveal animate-delay-200 julia-body">
            Herramientas interactivas para estimar la distribución de herencias y los costos 
            asociados a un proceso sucesorio en Nuevo León.
          </p>
        </div>

        {/* Calculators Grid */}
        <div className="reveal animate-delay-300 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CalculadoraHerederos />
          <CalculadoraGastos />
        </div>

        {/* Disclaimer */}
        <div className="reveal animate-delay-500 mt-12 bg-julia-gold/10 p-6">
          <div className="flex items-start gap-4">
            <Percent size={24} className="text-julia-gold flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-serif text-lg text-julia-blue mb-2">Importante</h4>
              <p className="julia-body-sm">
                Estas calculadoras proporcionan estimaciones orientativas basadas en criterios generales. 
                Cada caso es único y los montos reales pueden variar. Para una evaluación precisa de tu 
                situación, te recomendamos agendar una consulta con nuestros especialistas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
