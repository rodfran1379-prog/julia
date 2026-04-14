import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, User, CheckCircle, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function Contacto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: '',
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
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="julia-section relative bg-julia-cream"
    >
      <div className="julia-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Info */}
          <div>
            <div className="reveal mb-6">
              <span className="julia-label">Contacto</span>
            </div>
            
            <h2 className="reveal animate-delay-100 julia-heading-lg text-julia-blue mb-6">
              ¿Necesitas una asesoría profesional?
            </h2>
            
            <p className="reveal animate-delay-200 julia-body mb-10">
              Si crees que tienes derecho a una herencia o necesitas iniciar un proceso 
              sucesorio en Nuevo León, ponte en contacto con nosotros. Analizaremos tu caso 
              con criterio y estrategia.
            </p>

            {/* Abogado Info */}
            <div className="reveal animate-delay-300 bg-white p-6 mb-8 border-l-4 border-julia-gold">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-julia-blue/10 flex items-center justify-center">
                  <User size={32} className="text-julia-blue" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-julia-blue">Lic. Eben Francisco Rodríguez Vela</h3>
                  <p className="text-sm text-julia-gray">Abogado Especialista en Derecho Sucesorio</p>
                </div>
              </div>
              <p className="julia-body-sm">
                Con años de experiencia en juicios sucesorios en Nuevo León, 
                te acompañamos en todo el proceso de recuperación de tu patrimonio.
              </p>
            </div>

            <div className="reveal animate-delay-400 space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-julia-blue/5 flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-julia-blue" />
                </div>
                <div>
                  <p className="font-sans text-sm text-julia-gray mb-1">Dirección</p>
                  <p className="font-serif text-lg text-julia-blue">
                    Pegasos 234, Arcadia<br />
                    Juárez, Nuevo León, México
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-julia-blue/5 flex items-center justify-center flex-shrink-0">
                  <Phone size={20} className="text-julia-blue" />
                </div>
                <div>
                  <p className="font-sans text-sm text-julia-gray mb-1">Teléfono / WhatsApp</p>
                  <p className="font-serif text-lg text-julia-blue">720 318 7601</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-julia-blue/5 flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-julia-blue" />
                </div>
                <div>
                  <p className="font-sans text-sm text-julia-gray mb-1">Correo electrónico</p>
                  <p className="font-serif text-lg text-julia-blue">contacto@julialegalconsulting.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-julia-blue/5 flex items-center justify-center flex-shrink-0">
                  <Clock size={20} className="text-julia-blue" />
                </div>
                <div>
                  <p className="font-sans text-sm text-julia-gray mb-1">Horario de atención</p>
                  <p className="font-serif text-lg text-julia-blue">Lunes a Viernes, 9:00 - 18:00</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-julia-blue/5 flex items-center justify-center flex-shrink-0">
                  <MessageSquare size={20} className="text-julia-blue" />
                </div>
                <div>
                  <p className="font-sans text-sm text-julia-gray mb-1">Cobertura</p>
                  <p className="font-serif text-lg text-julia-blue">Todo el estado de Nuevo León</p>
                </div>
              </div>
            </div>

            {/* Slogan */}
            <div className="reveal animate-delay-500 pt-8 border-t border-julia-blue/10">
              <p className="font-serif text-2xl text-julia-gold">
                Análisis jurídico. Solución con estrategia.
              </p>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="reveal animate-delay-300">
            <div className="bg-white p-8 lg:p-10">
              <h3 className="font-serif text-2xl text-julia-blue mb-2">
                Consulta Gratuita
              </h3>
              <p className="julia-body-sm mb-6">
                Completa el formulario y nos pondremos en contacto contigo.
              </p>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-julia-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-julia-gold" />
                  </div>
                  <h4 className="font-serif text-xl text-julia-blue mb-2">
                    ¡Mensaje enviado!
                  </h4>
                  <p className="julia-body-sm">
                    Nos pondremos en contacto contigo en menos de 24 horas.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block font-sans text-sm text-julia-gray mb-2">
                      Nombre completo
                    </label>
                    <Input
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Tu nombre"
                      className="border-julia-blue/20 focus:border-julia-gold"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-sans text-sm text-julia-gray mb-2">
                        Correo electrónico
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        className="border-julia-blue/20 focus:border-julia-gold"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-sm text-julia-gray mb-2">
                        Teléfono
                      </label>
                      <Input
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="720 318 7601"
                        className="border-julia-blue/20 focus:border-julia-gold"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans text-sm text-julia-gray mb-2">
                      Tipo de asunto
                    </label>
                    <select
                      name="asunto"
                      value={formData.asunto}
                      onChange={handleChange}
                      className="w-full h-10 px-3 border border-julia-blue/20 rounded-md text-julia-charcoal focus:border-julia-gold focus:outline-none"
                      required
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="sucesion">Juicio sucesorio</option>
                      <option value="testamento">Testamento</option>
                      <option value="consulta">Consulta general</option>
                      <option value="inversion">Inversión</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-sans text-sm text-julia-gray mb-2">
                      Cuéntanos tu caso
                    </label>
                    <Textarea
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      placeholder="Describe brevemente tu situación..."
                      className="border-julia-blue/20 focus:border-julia-gold min-h-[120px]"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full julia-btn-primary"
                  >
                    Enviar mensaje
                    <Send size={16} className="ml-2" />
                  </Button>

                  <p className="font-sans text-xs text-julia-gray text-center">
                    Al enviar este formulario, aceptas nuestra política de privacidad. 
                    Tu información es confidencial.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
