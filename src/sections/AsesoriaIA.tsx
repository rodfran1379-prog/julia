'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: number;
  type: 'bot' | 'user';
  content: string;
  options?: string[];
}

const initialMessages: Message[] = [
  {
    id: 1,
    type: 'bot',
    content: 'Hola, soy JUL-IA, asistente jurídica de JULIA Herencias & Sucesiones.',
  },
  {
    id: 2,
    type: 'bot',
    content: 'Puedo ayudarte a saber si tienes derecho a una herencia. ¿En qué puedo orientarte?',
    options: [
      'Tengo un conflicto de herencia',
      'Mi familiar falleció sin testamento',
      'Quiero saber si tengo derecho a una herencia',
      'Necesito iniciar una sucesión',
    ],
  },
];

const conversationFlows: Record<string, Message[]> = {
  'Tengo un conflicto de herencia': [
    { id: 3, type: 'bot', content: 'Entiendo. Los conflictos de herencia son complejos. Para orientarte mejor, necesito hacerte algunas preguntas.' },
    { id: 4, type: 'bot', content: '¿Quién falleció y cuándo ocurrió el fallecimiento?', options: ['Menos de 1 año', '1-5 años', 'Más de 5 años'] },
  ],
  'Mi familiar falleció sin testamento': [
    { id: 3, type: 'bot', content: 'Cuando no hay testamento, se trata de una sucesión intestamentaria. Esto es precisamente nuestra especialidad.' },
    { id: 4, type: 'bot', content: '¿Sabes si la persona tenía bienes a su nombre? (casa, terreno, departamento)', options: ['Sí, sé que tenía bienes', 'No estoy seguro', 'Creo que no tenía bienes'] },
  ],
  'Quiero saber si tengo derecho a una herencia': [
    { id: 3, type: 'bot', content: 'Para determinar si tienes derecho hereditario, necesito conocer tu parentesco con la persona fallecida.' },
    { id: 4, type: 'bot', content: '¿Qué parentesco tienes con la persona fallecida?', options: ['Cónyuge', 'Hijo/a', 'Nieto/a', 'Hermano/a', 'Otro'] },
  ],
  'Necesito iniciar una sucesión': [
    { id: 3, type: 'bot', content: 'Perfecto. En JULIA nos especializamos en juicios sucesorios. Podemos financiar tu caso si cumple ciertos requisitos.' },
    { id: 4, type: 'bot', content: '¿En qué estado se encuentra la propiedad o bienes a heredar?', options: ['Nuevo León', 'Ciudad de México', 'Jalisco', 'Otro estado'] },
  ],
};

const followUpMessages: Record<string, Message> = {
  'Menos de 1 año': { id: 5, type: 'bot', content: 'Excelente. El plazo para iniciar la sucesión está dentro del tiempo óptimo. ¿Sabes si existe algún bien inmueble (casa, terreno) a nombre del fallecido?', options: ['Sí, hay una casa', 'Sí, hay terreno', 'No estoy seguro', 'No creo que haya bienes'] },
  '1-5 años': { id: 5, type: 'bot', content: 'Aún estamos dentro de plazos razonables. ¿Sabes si existe algún bien inmueble a nombre del fallecido?', options: ['Sí, hay bienes', 'No estoy seguro', 'No hay bienes'] },
  'Más de 5 años': { id: 5, type: 'bot', content: 'El tiempo transcurrido puede complicar el proceso, pero no imposibilita la sucesión. ¿Hay bienes inmuebles involucrados?', options: ['Sí, hay bienes', 'No estoy seguro'] },
  'Sí, sé que tenía bienes': { id: 5, type: 'bot', content: 'Eso es positivo. Los bienes inmuebles son los que permiten estructurar un caso viable para financiamiento. ¿Tienes acceso a alguna escritura o documento que acredite la propiedad?', options: ['Sí, tengo escritura', 'Tengo copia de predial', 'No tengo documentos'] },
  'Sí, hay una casa': { id: 6, type: 'bot', content: 'Una casa es un activo que generalmente permite estructurar un caso de sucesión financiable. ¿Conoces el valor aproximado del inmueble?', options: ['Menos de $1 millón', '$1-3 millones', '$3-5 millones', 'Más de $5 millones', 'No sé el valor'] },
  'Sí, hay terreno': { id: 6, type: 'bot', content: 'El terreno también es un activo válido para sucesión. ¿Conoces la ubicación y valor aproximado?', options: ['Sí, conozco ambos', 'Solo la ubicación', 'Solo el valor aproximado', 'No tengo información'] },
  'Hijo/a': { id: 5, type: 'bot', content: 'Como hijo/a tienes derecho a la legítima, que es la parte de la herencia que por ley te corresponde. ¿Hay otros hermanos?', options: ['Soy hijo único', 'Tengo 1-2 hermanos', 'Tengo 3+ hermanos', 'No estoy seguro'] },
  'Cónyuge': { id: 5, type: 'bot', content: 'Como cónyuge, tienes derechos importantes en la sucesión, incluyendo la parte social conyugal. ¿Existen hijos del matrimonio?', options: ['Sí, tenemos hijos', 'No hay hijos', 'Hay hijos de otra relación'] },
  'Nuevo León': { id: 5, type: 'bot', content: 'Operamos en Nuevo León. ¿En qué ciudad específicamente se encuentra el bien?', options: ['Monterrey', 'San Pedro', 'Apodaca', 'Escobedo', 'Otra'] },
};

const closingMessage: Message = {
  id: 99,
  type: 'bot',
  content: 'Gracias por la información. Con base en lo que me has compartido, parece que tienes un caso potencial. Un abogado de JULIA se pondrá en contacto contigo para una evaluación más detallada.',
};

export default function AsesoriaIA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [showContactForm, setShowContactForm] = useState(false);

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

    // Find response
    let responseMessages: Message[] = [];
    
    if (conversationFlows[option]) {
      responseMessages = conversationFlows[option];
    } else if (followUpMessages[option]) {
      responseMessages = [followUpMessages[option]];
    } else {
      // Generic response or closing
      responseMessages = [closingMessage];
      setTimeout(() => setShowContactForm(true), 1000);
    }

    responseMessages.forEach((msg, index) => {
      setTimeout(() => {
        setMessages((prev) => [...prev, msg]);
      }, (index + 1) * 800);
    });
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    
    setTimeout(() => {
      setMessages((prev) => [...prev, closingMessage]);
      setShowContactForm(true);
    }, 1000);
  };

  return (
    <section
      id="asesoria"
      ref={sectionRef}
      className="julia-section relative bg-white"
    >
      <div className="julia-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column - Info */}
          <div>
            <div className="reveal mb-6">
              <span className="julia-label">Asistencia Inicial</span>
            </div>
            
            <h2 className="reveal animate-delay-100 julia-heading-lg text-julia-blue mb-6">
              Asesoría inicial con JUL-IA
            </h2>
            
            <p className="reveal animate-delay-200 julia-body mb-8">
              JUL-IA es una herramienta de orientación jurídica inicial diseñada para 
              ayudarte a comprender tu situación legal, identificar posibles riesgos y 
              preparar información relevante antes de una asesoría profesional.
            </p>

            <div className="reveal animate-delay-300 bg-julia-blue/[0.03] p-6 lg:p-8 mb-8">
              <div className="flex items-start gap-4">
                <AlertTriangle size={24} className="text-julia-gold flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-lg text-julia-blue mb-2">Aviso importante</h4>
                  <p className="julia-body-sm">
                    JUL-IA no emite dictámenes legales, no sustituye al abogado y no genera 
                    relación abogado–cliente. Es una herramienta de orientación inicial.
                  </p>
                </div>
              </div>
            </div>

            <div className="reveal animate-delay-400 space-y-4">
              <p className="font-serif text-lg text-julia-blue">¿Qué puede hacer JUL-IA?</p>
              <ul className="space-y-3">
                {[
                  'Detectar si tienes un caso de herencia viable',
                  'Hacerte preguntas claras para ordenar información',
                  'Orientarte sobre el proceso sucesorio',
                  'Agendar una consulta con un abogado de JULIA',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 julia-body-sm">
                    <span className="text-julia-gold font-medium">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Chat */}
          <div className="reveal animate-delay-300">
            <div className="bg-julia-cream border border-julia-blue/10 overflow-hidden">
              {/* Chat Header */}
              <div className="bg-julia-blue p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <Bot size={20} className="text-julia-gold" />
                </div>
                <div>
                  <p className="font-serif text-white">JUL-IA</p>
                  <p className="font-sans text-xs text-white/60">Asistente jurídica</p>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.type === 'user' ? 'flex-row-reverse' : ''
                    }`}
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

              {/* Chat Input */}
              <div className="p-4 bg-white border-t border-julia-blue/10">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Escribe tu mensaje..."
                    className="flex-1 border-julia-blue/20 focus:border-julia-gold"
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="bg-julia-blue hover:bg-julia-charcoal"
                  >
                    <Send size={16} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Form (shown after conversation) */}
            {showContactForm && (
              <div className="mt-6 bg-julia-blue/[0.03] p-6">
                <p className="font-serif text-lg text-julia-blue mb-4">
                  Déjanos tus datos para contactarte
                </p>
                <div className="space-y-4">
                  <Input placeholder="Nombre completo" className="border-julia-blue/20" />
                  <Input placeholder="Teléfono" className="border-julia-blue/20" />
                  <Input placeholder="Correo electrónico" className="border-julia-blue/20" />
                  <Input placeholder="Ciudad" className="border-julia-blue/20" />
                  <Button className="w-full julia-btn-primary">
                    Solicitar asesoría
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
