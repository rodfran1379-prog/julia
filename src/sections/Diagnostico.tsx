'use client';

import { useEffect, useRef, useState } from 'react';
import { Bot, User, CheckCircle, AlertTriangle, RefreshCw, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import WhatsAppButton from '@/components/WhatsAppButton';

interface Message {
  id: number;
  type: 'bot' | 'user';
  content: string;
  options?: string[];
}

const flujoDiagnostico: Record<string, { mensajes: Message[]; siguiente?: string }> = {
  inicio: {
    mensajes: [
      {
        id: 1,
        type: 'bot',
        content: '¡Hola! Soy JUL-IA, el asistente legal de JULIA Herencias & Sucesiones.',
      },
      {
        id: 2,
        type: 'bot',
        content: 'Voy a hacerte algunas preguntas para evaluar tu caso y darte un diagnóstico inicial gratuito.',
      },
      {
        id: 3,
        type: 'bot',
        content: '¿Quién falleció?',
        options: ['Padre/Madre', 'Cónyuge', 'Abuelo/Abuela', 'Otro familiar'],
      },
    ],
    siguiente: 'testamento',
  },
  testamento: {
    mensajes: [
      {
        id: 4,
        type: 'bot',
        content: '¿La persona falleció con testamento o sin testamento?',
        options: ['Con testamento', 'Sin testamento (intestado)', 'No estoy seguro'],
      },
    ],
    siguiente: 'bienes',
  },
  bienes: {
    mensajes: [
      {
        id: 5,
        type: 'bot',
        content: '¿Qué tipo de bienes dejó la persona fallecida?',
        options: ['Casa o departamento', 'Terreno', 'Vehículo', 'Dinero en banco', 'No estoy seguro', 'No dejó bienes'],
      },
    ],
    siguiente: 'herederos',
  },
  herederos: {
    mensajes: [
      {
        id: 6,
        type: 'bot',
        content: '¿Cuántos herederos potenciales hay? (incluyéndote a ti)',
        options: ['Soy el único heredero', '2 herederos', '3-5 herederos', 'Más de 5 herederos', 'No estoy seguro'],
      },
    ],
    siguiente: 'conflicto',
  },
  conflicto: {
    mensajes: [
      {
        id: 7,
        type: 'bot',
        content: '¿Hay algún conflicto o desacuerdo entre los herederos?',
        options: ['Sí, hay conflicto grave', 'Hay pequeños desacuerdos', 'No, todos estamos de acuerdo', 'No tengo contacto con los otros herederos'],
      },
    ],
    siguiente: 'tiempo',
  },
  tiempo: {
    mensajes: [
      {
        id: 8,
        type: 'bot',
        content: '¿Cuánto tiempo ha pasado desde el fallecimiento?',
        options: ['Menos de 6 meses', '6 meses - 1 año', '1-3 años', 'Más de 3 años'],
      },
    ],
    siguiente: 'resultado',
  },
};

const resultados: Record<string, { titulo: string; descripcion: string; nivel: 'alto' | 'medio' | 'bajo'; siguiente: string }> = {
  alto: {
    titulo: '¡Buenas noticias! Tu caso tiene alto potencial',
    descripcion: 'Basado en tu información, tienes un caso viable para iniciar un proceso sucesorio. Hay bienes que recuperar y una ruta legal clara.',
    nivel: 'alto',
    siguiente: 'Te recomendamos agendar una consulta gratuita con nuestros especialistas para evaluar tu caso en detalle.',
  },
  medio: {
    titulo: 'Tu caso requiere análisis profesional',
    descripcion: 'Hay elementos positivos pero también algunos factores que necesitan revisión. Un abogado especializado puede aclarar tu situación.',
    nivel: 'medio',
    siguiente: 'Agenda tu diagnóstico legal gratuito para que analicemos tu caso a fondo.',
  },
  bajo: {
    titulo: 'Necesitamos más información',
    descripcion: 'Tu caso presenta algunas complicaciones o falta información importante. No te preocupes, muchos casos que parecen difíciles tienen solución.',
    nivel: 'bajo',
    siguiente: 'Te sugerimos hablar directamente con uno de nuestros abogados para explorar todas las opciones.',
  },
};

export default function Diagnostico() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>(flujoDiagnostico.inicio.mensajes);
  const [respuestas, setRespuestas] = useState<Record<string, string>>({});
  const [etapa, setEtapa] = useState('inicio');
  const [showResultado, setShowResultado] = useState(false);
  const [resultado, setResultado] = useState<typeof resultados['alto'] | null>(null);
  const [contacto, setContacto] = useState({ nombre: '', telefono: '', email: '' });
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

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleOptionClick = (option: string) => {
    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: option,
    };

    setMessages((prev) => [...prev, userMessage]);
    setRespuestas((prev) => ({ ...prev, [etapa]: option }));

    const flujoActual = flujoDiagnostico[etapa];
    
    if (flujoActual.siguiente && flujoActual.siguiente !== 'resultado') {
      setTimeout(() => {
        const siguienteFlujo = flujoDiagnostico[flujoActual.siguiente!];
        setEtapa(flujoActual.siguiente!);
        siguienteFlujo.mensajes.forEach((msg, index) => {
          setTimeout(() => {
            setMessages((prev) => [...prev, msg]);
          }, (index + 1) * 600);
        });
      }, 500);
    } else if (flujoActual.siguiente === 'resultado') {
      setTimeout(() => {
        calcularResultado();
      }, 500);
    }
  };

  const calcularResultado = () => {
    let puntos = 0;
    
    // Evaluar respuestas
    if (respuestas.bienes && respuestas.bienes !== 'No dejó bienes' && respuestas.bienes !== 'No estoy seguro') {
      puntos += 2;
    }
    if (respuestas.herederos && (respuestas.herederos === 'Soy el único heredero' || respuestas.herederos === '2 herederos')) {
      puntos += 2;
    }
    if (respuestas.conflicto && respuestas.conflicto === 'No, todos estamos de acuerdo') {
      puntos += 2;
    }
    if (respuestas.tiempo && respuestas.tiempo !== 'Más de 3 años') {
      puntos += 1;
    }
    if (respuestas.testamento && respuestas.testamento !== 'No estoy seguro') {
      puntos += 1;
    }

    let tipoResultado: 'alto' | 'medio' | 'bajo' = 'medio';
    if (puntos >= 6) tipoResultado = 'alto';
    else if (puntos <= 3) tipoResultado = 'bajo';

    setResultado(resultados[tipoResultado]);
    setShowResultado(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const reiniciar = () => {
    setMessages(flujoDiagnostico.inicio.mensajes);
    setRespuestas({});
    setEtapa('inicio');
    setShowResultado(false);
    setResultado(null);
    setSubmitted(false);
    setContacto({ nombre: '', telefono: '', email: '' });
  };

  return (
    <section
      id="diagnostico"
      ref={sectionRef}
      className="julia-section relative bg-white"
    >
      <div className="julia-container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="reveal mb-6">
            <span className="julia-label">Diagnóstico Legal Gratuito</span>
          </div>
          <h2 className="reveal animate-delay-100 julia-heading-lg text-julia-blue mb-6">
            Descubre si tu caso es viable en 2 minutos
          </h2>
          <p className="reveal animate-delay-200 julia-body">
            Responde unas preguntas simples y nuestro asistente legal te dará un diagnóstico inicial
            sin costo y sin compromiso.
          </p>
          <div className="reveal animate-delay-300 mt-6">
            <WhatsAppButton
              message="Hola, quiero hacer el diagnóstico legal gratuito"
              variant="gold"
              className="inline-flex"
            >
              <MessageCircle size={18} className="mr-2" />
              Descubrelo aquí
            </WhatsAppButton>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="reveal animate-delay-300 max-w-2xl mx-auto">
          <div className="bg-julia-cream border border-julia-blue/10 overflow-hidden">
            {/* Chat Header */}
            <div className="bg-julia-blue p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                <Bot size={20} className="text-julia-gold" />
              </div>
              <div>
                <p className="font-serif text-white">JUL-IA</p>
                <p className="font-sans text-xs text-white/60">Asistente Legal de JULIA</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'bot'
                        ? 'bg-julia-blue/10'
                        : 'bg-julia-gold/20'
                    }`}
                  >
                    {message.type === 'bot' ? (
                      <Bot size={14} className="text-julia-blue" />
                    ) : (
                      <User size={14} className="text-julia-gold" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] p-4 ${
                      message.type === 'bot'
                        ? 'bg-white'
                        : 'bg-julia-blue text-white'
                    }`}
                  >
                    <p className="font-sans text-sm">{message.content}</p>
                    {message.options && (
                      <div className="mt-4 space-y-2">
                        {message.options.map((option) => (
                          <button
                            key={option}
                            onClick={() => handleOptionClick(option)}
                            className="block w-full text-left p-3 bg-julia-cream hover:bg-julia-gold/10 border border-julia-blue/10 font-sans text-sm text-julia-blue transition-colors"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </div>

          {/* Resultado */}
          {showResultado && resultado && (
            <div className="mt-6 bg-julia-blue text-white p-8">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle size={32} className="text-julia-gold" />
                <h3 className="font-serif text-2xl">{resultado.titulo}</h3>
              </div>
              <p className="font-sans text-white/80 mb-4">{resultado.descripcion}</p>
              <p className="font-sans text-julia-gold mb-6">{resultado.siguiente}</p>
              
              {!submitted ? (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <p className="font-sans text-sm text-white/60 mb-4">
                    Déjanos tus datos para contactarte:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      placeholder="Nombre completo"
                      value={contacto.nombre}
                      onChange={(e) => setContacto({...contacto, nombre: e.target.value})}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      required
                    />
                    <Input
                      placeholder="Teléfono"
                      value={contacto.telefono}
                      onChange={(e) => setContacto({...contacto, telefono: e.target.value})}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      required
                    />
                    <Input
                      type="email"
                      placeholder="Correo electrónico"
                      value={contacto.email}
                      onChange={(e) => setContacto({...contacto, email: e.target.value})}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      required
                    />
                  </div>
                  <WhatsAppButton
                    message="Hola, acabo de hacer el diagnóstico legal y me gustaría más información"
                    variant="gold"
                    className="w-full"
                  >
                    <MessageCircle size={16} className="mr-2" />
                    Contactar por WhatsApp
                  </WhatsAppButton>
                </form>
              ) : (
                <div className="text-center py-4">
                  <CheckCircle size={48} className="mx-auto text-julia-gold mb-4" />
                  <p className="font-serif text-xl">¡Gracias!</p>
                  <p className="font-sans text-white/70">Nos pondremos en contacto contigo en menos de 24 horas.</p>
                </div>
              )}
              
              <button
                onClick={reiniciar}
                className="mt-6 flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
              >
                <RefreshCw size={14} />
                Hacer otro diagnóstico
              </button>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="reveal animate-delay-500 mt-8 max-w-2xl mx-auto">
          <div className="flex items-start gap-3 bg-julia-gold/10 p-4">
            <AlertTriangle size={20} className="text-julia-gold flex-shrink-0 mt-0.5" />
            <p className="text-sm text-julia-gray">
              Este diagnóstico es orientativo y no constituye asesoría legal. 
              Cada caso es único y requiere evaluación profesional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
