'use client';

import { useEffect, useRef, useState } from 'react';
import { Calculator, Users, DollarSign, Percent, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Simulador() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'herederos' | 'gastos' | 'financiamiento'>('herederos');
  
  // Calculadora de Herederos
  const [valorBienes, setValorBienes] = useState('');
  const [numHijos, setNumHijos] = useState('');
  const [conyuge, setConyuge] = useState(false);
  const [padresVivos, setPadresVivos] = useState(false);
  const [resultadoHerederos, setResultadoHerederos] = useState<{
    legConyuge: number;
    legHijos: number;
    legPadres: number;
    porHijo: number;
    porPadre: number;
  } | null>(null);

  // Calculadora de Gastos
  const [valorGastos, setValorGastos] = useState('');
  const [resultadoGastos, setResultadoGastos] = useState<{
    isai: number;
    notaria: number;
    honorarios: number;
    gastos: number;
    total: number;
    porcentaje: number;
  } | null>(null);

  // Calculadora de Financiamiento
  const [valorFinanciamiento, setValorFinanciamiento] = useState('');
  const [resultadoFinanciamiento, setResultadoFinanciamiento] = useState<{
    inversion: number;
    retornoInversionista: number;
    retornoCliente: number;
    honorariosJULIA: number;
    gananciaInversionista: number;
    roi: number;
  } | null>(null);

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

  const calcularHerederos = () => {
    const valor = parseFloat(valorBienes) || 0;
    const hijos = parseInt(numHijos) || 0;
    
    let legConyuge = 0;
    let legHijos = 0;
    let legPadres = 0;
    
    // Cálculo simplificado de legítima
    if (conyuge) {
      legConyuge = valor * 0.5;
      const resto = valor * 0.5;
      if (hijos > 0) {
        legHijos = resto;
      } else if (padresVivos) {
        legPadres = resto;
      }
    } else {
      if (hijos > 0) {
        legHijos = valor * 0.5;
      } else if (padresVivos) {
        legPadres = valor * 0.5;
      }
    }
    
    const porHijo = hijos > 0 ? legHijos / hijos : 0;
    const porPadre = padresVivos && hijos === 0 ? legPadres / 2 : 0;
    
    setResultadoHerederos({ legConyuge, legHijos, legPadres, porHijo, porPadre });
  };

  const calcularGastos = () => {
    const valor = parseFloat(valorGastos) || 0;
    
    const isai = valor * 0.025;
    const notaria = valor * 0.015;
    const honorarios = valor * 0.07;
    const gastos = valor * 0.03;
    const total = isai + notaria + honorarios + gastos;
    const porcentaje = (total / valor) * 100;
    
    setResultadoGastos({ isai, notaria, honorarios, gastos, total, porcentaje });
  };

  const calcularFinanciamiento = () => {
    const valor = parseFloat(valorFinanciamiento) || 0;
    
    const inversion = valor * 0.1; // 10% del valor
    const retornoInversionista = valor * 0.23; // 23% del valor
    const honorariosJULIA = valor * 0.07; // 7% del valor
    const retornoCliente = valor - retornoInversionista - honorariosJULIA;
    const gananciaInversionista = retornoInversionista - inversion;
    const roi = (gananciaInversionista / inversion) * 100;
    
    setResultadoFinanciamiento({
      inversion,
      retornoInversionista,
      retornoCliente,
      honorariosJULIA,
      gananciaInversionista,
      roi,
    });
  };

  const formatearPesos = (valor: number) => {
    return valor.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });
  };

  return (
    <section
      id="simulador"
      ref={sectionRef}
      className="julia-section relative bg-white"
    >
      <div className="julia-container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="reveal mb-6">
            <span className="julia-label">Herramientas Interactivas</span>
          </div>
          <h2 className="reveal animate-delay-100 julia-heading-lg text-julia-blue mb-6">
            Simulador de Herencias
          </h2>
          <p className="reveal animate-delay-200 julia-body">
            Calcula la distribución de bienes, estima los gastos del proceso o evalúa 
            el modelo de financiamiento. Todo en tiempo real.
          </p>
        </div>

        {/* Tabs */}
        <div className="reveal animate-delay-300 flex flex-wrap justify-center gap-2 mb-8">
          {[
            { id: 'herederos', label: 'Distribución', icon: Users },
            { id: 'gastos', label: 'Gastos', icon: DollarSign },
            { id: 'financiamiento', label: 'Financiamiento', icon: Percent },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-julia-blue text-white'
                  : 'bg-julia-cream text-julia-charcoal hover:bg-julia-blue/10'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="reveal animate-delay-400 max-w-3xl mx-auto">
          {/* Distribución de Herederos */}
          {activeTab === 'herederos' && (
            <div className="bg-julia-cream p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-julia-blue/10 flex items-center justify-center">
                  <Users size={24} className="text-julia-blue" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-julia-blue">Distribución de Herederos</h3>
                  <p className="text-sm text-julia-gray">Calcula cuánto te corresponde</p>
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

                <div className="grid grid-cols-2 gap-4">
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
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={conyuge}
                        onChange={(e) => setConyuge(e.target.checked)}
                        className="w-5 h-5 accent-julia-blue"
                      />
                      <span className="text-sm">¿Hay cónyuge?</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={padresVivos}
                        onChange={(e) => setPadresVivos(e.target.checked)}
                        className="w-5 h-5 accent-julia-blue"
                      />
                      <span className="text-sm">¿Padres vivos? (sin hijos)</span>
                    </label>
                  </div>
                </div>

                <Button onClick={calcularHerederos} className="w-full julia-btn-primary">
                  <Calculator size={18} className="mr-2" />
                  Calcular Distribución
                </Button>
              </div>

              {resultadoHerederos && (
                <div className="bg-white p-6 space-y-3">
                  <h4 className="font-serif text-lg text-julia-blue mb-4">Resultado:</h4>
                  {resultadoHerederos.legConyuge > 0 && (
                    <div className="flex justify-between py-2 border-b border-julia-blue/10">
                      <span className="text-sm">Al cónyuge:</span>
                      <span className="font-medium">{formatearPesos(resultadoHerederos.legConyuge)}</span>
                    </div>
                  )}
                  {resultadoHerederos.legHijos > 0 && (
                    <>
                      <div className="flex justify-between py-2 border-b border-julia-blue/10">
                        <span className="text-sm">A los hijos (total):</span>
                        <span className="font-medium">{formatearPesos(resultadoHerederos.legHijos)}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-julia-blue/10">
                        <span className="text-sm">Por cada hijo:</span>
                        <span className="font-medium text-julia-gold">{formatearPesos(resultadoHerederos.porHijo)}</span>
                      </div>
                    </>
                  )}
                  {resultadoHerederos.legPadres > 0 && (
                    <>
                      <div className="flex justify-between py-2 border-b border-julia-blue/10">
                        <span className="text-sm">A los padres (total):</span>
                        <span className="font-medium">{formatearPesos(resultadoHerederos.legPadres)}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-julia-blue/10">
                        <span className="text-sm">Por cada padre:</span>
                        <span className="font-medium text-julia-gold">{formatearPesos(resultadoHerederos.porPadre)}</span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Gastos */}
          {activeTab === 'gastos' && (
            <div className="bg-julia-cream p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-julia-blue/10 flex items-center justify-center">
                  <DollarSign size={24} className="text-julia-blue" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-julia-blue">Estimación de Gastos</h3>
                  <p className="text-sm text-julia-gray">Cuánto cuesta un juicio sucesorio</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-julia-charcoal mb-2">
                    Valor estimado de los bienes ($)
                  </label>
                  <Input
                    type="number"
                    value={valorGastos}
                    onChange={(e) => setValorGastos(e.target.value)}
                    placeholder="Ej: 3,000,000"
                    className="border-julia-blue/20"
                  />
                </div>

                <Button onClick={calcularGastos} className="w-full julia-btn-primary">
                  <Calculator size={18} className="mr-2" />
                  Calcular Gastos
                </Button>
              </div>

              {resultadoGastos && (
                <div className="bg-white p-6 space-y-3">
                  <h4 className="font-serif text-lg text-julia-blue mb-4">Estimación de gastos:</h4>
                  <div className="flex justify-between py-2 border-b border-julia-blue/10">
                    <span className="text-sm">ISAI (2.5%):</span>
                    <span className="font-medium">{formatearPesos(resultadoGastos.isai)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-julia-blue/10">
                    <span className="text-sm">Honorarios notariales (1.5%):</span>
                    <span className="font-medium">{formatearPesos(resultadoGastos.notaria)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-julia-blue/10">
                    <span className="text-sm">Honorarios abogado (7%):</span>
                    <span className="font-medium">{formatearPesos(resultadoGastos.honorarios)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-julia-blue/10">
                    <span className="text-sm">Otros gastos (3%):</span>
                    <span className="font-medium">{formatearPesos(resultadoGastos.gastos)}</span>
                  </div>
                  <div className="flex justify-between py-3 border-t-2 border-julia-blue/20 mt-3">
                    <span className="font-medium">Total estimado:</span>
                    <span className="font-bold text-julia-gold text-lg">{formatearPesos(resultadoGastos.total)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-julia-gray">Porcentaje del valor:</span>
                    <span className="text-julia-blue font-medium">{resultadoGastos.porcentaje.toFixed(1)}%</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Financiamiento */}
          {activeTab === 'financiamiento' && (
            <div className="bg-julia-cream p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-julia-blue/10 flex items-center justify-center">
                  <Percent size={24} className="text-julia-blue" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-julia-blue">Simulador de Financiamiento</h3>
                  <p className="text-sm text-julia-gray">Sin costo inicial, solo pagas al final</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-julia-charcoal mb-2">
                    Valor estimado de recuperación ($)
                  </label>
                  <Input
                    type="number"
                    value={valorFinanciamiento}
                    onChange={(e) => setValorFinanciamiento(e.target.value)}
                    placeholder="Ej: 3,000,000"
                    className="border-julia-blue/20"
                  />
                </div>

                <Button onClick={calcularFinanciamiento} className="w-full julia-btn-primary">
                  <Calculator size={18} className="mr-2" />
                  Calcular Financiamiento
                </Button>
              </div>

              {resultadoFinanciamiento && (
                <div className="bg-white p-6 space-y-3">
                  <h4 className="font-serif text-lg text-julia-blue mb-4">Distribución al finalizar:</h4>
                  <div className="flex justify-between py-2 border-b border-julia-blue/10">
                    <span className="text-sm">Inversión inicial (10%):</span>
                    <span className="font-medium">{formatearPesos(resultadoFinanciamiento.inversion)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-julia-blue/10">
                    <span className="text-sm">Retorno inversionista (23%):</span>
                    <span className="font-medium">{formatearPesos(resultadoFinanciamiento.retornoInversionista)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-julia-blue/10">
                    <span className="text-sm">Honorarios JULIA (7%):</span>
                    <span className="font-medium">{formatearPesos(resultadoFinanciamiento.honorariosJULIA)}</span>
                  </div>
                  <div className="flex justify-between py-3 border-t-2 border-julia-blue/20 mt-3">
                    <span className="font-medium">Tú recibes:</span>
                    <span className="font-bold text-julia-gold text-lg">{formatearPesos(resultadoFinanciamiento.retornoCliente)}</span>
                  </div>
                  <div className="bg-julia-blue/5 p-4 mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-julia-gray">Ganancia del inversionista:</span>
                      <span className="text-julia-blue font-medium">{formatearPesos(resultadoFinanciamiento.gananciaInversionista)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-julia-gray">ROI del inversionista:</span>
                      <span className="text-julia-gold font-bold">{resultadoFinanciamiento.roi.toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="reveal animate-delay-500 mt-8 max-w-3xl mx-auto">
          <div className="flex items-start gap-3 bg-julia-gold/10 p-4">
            <Info size={20} className="text-julia-gold flex-shrink-0 mt-0.5" />
            <p className="text-sm text-julia-gray">
              Estas calculadoras proporcionan estimaciones orientativas. Los montos reales pueden variar 
              según la complejidad del caso, el estado donde se tramite y otros factores específicos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
