import { useEffect, useRef, useState } from 'react';
import { FileText, Check, ShoppingCart, Shield, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const contratos = [
  {
    id: 1,
    nombre: 'Testamento Simple',
    descripcion: 'Testamento básico para distribución de bienes entre herederos.',
    precio: 3500,
    precioOriginal: 5000,
    caracteristicas: [
      'Redacción por abogado especializado',
      'Revisión de documentación',
      'Instrucciones para firma',
      'Formato listo para notario',
    ],
    tiempo: '3-5 días hábiles',
    popular: false,
  },
  {
    id: 2,
    nombre: 'Testamento con Fideicomiso',
    descripcion: 'Testamento con disposiciones de fideicomiso para menores de edad.',
    precio: 8500,
    precioOriginal: 12000,
    caracteristicas: [
      'Estructura de fideicomiso testamentario',
      'Designación de fiduciario',
      'Disposiciones para menores',
      'Revisión legal completa',
    ],
    tiempo: '5-7 días hábiles',
    popular: true,
  },
  {
    id: 3,
    nombre: 'Contrato de Compraventa',
    descripcion: 'Contrato para la venta de bienes inmuebles entre particulares.',
    precio: 2800,
    precioOriginal: 4000,
    caracteristicas: [
      'Cláusulas de garantía',
      'Forma de pago detallada',
      'Entrega de posesión',
      'Resolución de conflictos',
    ],
    tiempo: '2-3 días hábiles',
    popular: false,
  },
  {
    id: 4,
    nombre: 'Contrato de Arrendamiento',
    descripcion: 'Contrato de renta de inmueble con cláusulas de protección.',
    precio: 1800,
    precioOriginal: 2500,
    caracteristicas: [
      'Depósito en garantía',
      'Obligaciones de partes',
      'Mantenimiento y reparaciones',
      'Rescisión y renovación',
    ],
    tiempo: '1-2 días hábiles',
    popular: false,
  },
  {
    id: 5,
    nombre: 'Poder General',
    descripcion: 'Poder notarial amplio para representación legal.',
    precio: 2200,
    precioOriginal: 3000,
    caracteristicas: [
      'Facultades amplias',
      'Plazo de vigencia',
      'Revocación incluida',
      'Instrucciones de uso',
    ],
    tiempo: '2-3 días hábiles',
    popular: false,
  },
  {
    id: 6,
    nombre: 'Contrato de Sociedad',
    descripcion: 'Constitución de sociedad civil o mercantil.',
    precio: 12000,
    precioOriginal: 18000,
    caracteristicas: [
      'Estatutos sociales',
      'Aportaciones de socios',
      'Administración y dirección',
      'Disolución y liquidación',
    ],
    tiempo: '7-10 días hábiles',
    popular: false,
  },
];

export default function Contratos() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedContrato, setSelectedContrato] = useState<typeof contratos[0] | null>(null);
  const [cart, setCart] = useState<number[]>([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (id: number) => {
    if (!cart.includes(id)) {
      setCart([...cart, id]);
    }
    setShowCart(true);
  };

  const cartItems = contratos.filter(c => cart.includes(c.id));
  const cartTotal = cartItems.reduce((sum, item) => sum + item.precio, 0);

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
      id="contratos"
      ref={sectionRef}
      className="julia-section relative bg-julia-cream"
    >
      <div className="julia-container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="reveal mb-6">
            <span className="julia-label">Tienda Legal</span>
          </div>
          <h2 className="reveal animate-delay-100 julia-heading-lg text-julia-blue mb-6">
            Contratos en Línea
          </h2>
          <p className="reveal animate-delay-200 julia-body">
            Contratos civiles y mercantiles redactados por abogados especialistas. 
            Recibe tu documento listo para firmar en pocos días.
          </p>
        </div>

        {/* Cart Button */}
        {cart.length > 0 && (
          <div className="reveal animate-delay-300 fixed bottom-6 right-6 z-40">
            <button
              onClick={() => setShowCart(true)}
              className="bg-julia-blue text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-julia-charcoal transition-colors"
            >
              <ShoppingCart size={20} />
              <span>{cart.length} item(s)</span>
              <span className="bg-julia-gold px-2 py-0.5 rounded text-sm">
                ${cartTotal.toLocaleString()}
              </span>
            </button>
          </div>
        )}

        {/* Contracts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contratos.map((contrato, index) => (
            <div
              key={contrato.id}
              className="reveal bg-white group hover:shadow-xl transition-all duration-300 border border-julia-blue/5 relative"
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              {contrato.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-julia-gold text-white text-xs px-4 py-1 font-medium">
                  MÁS POPULAR
                </div>
              )}
              
              <div className="p-6">
                {/* Icon */}
                <div className="w-14 h-14 bg-julia-blue/5 flex items-center justify-center mb-4 group-hover:bg-julia-gold/10 transition-colors">
                  <FileText size={28} className="text-julia-blue group-hover:text-julia-gold transition-colors" />
                </div>
                
                {/* Title */}
                <h3 className="font-serif text-xl text-julia-blue mb-2">{contrato.nombre}</h3>
                
                {/* Description */}
                <p className="julia-body-sm mb-4">{contrato.descripcion}</p>
                
                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {contrato.caracteristicas.slice(0, 3).map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-julia-gray">
                      <Check size={14} className="text-julia-gold mt-1 flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                
                {/* Time */}
                <div className="flex items-center gap-2 text-sm text-julia-gray mb-4">
                  <Clock size={14} className="text-julia-gold" />
                  {contrato.tiempo}
                </div>
                
                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-serif text-2xl text-julia-blue">
                    ${contrato.precio.toLocaleString()}
                  </span>
                  <span className="text-sm text-julia-gray line-through">
                    ${contrato.precioOriginal.toLocaleString()}
                  </span>
                </div>
                
                {/* Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedContrato(contrato)}
                    className="flex-1 py-2 border border-julia-blue text-julia-blue text-sm font-medium hover:bg-julia-blue hover:text-white transition-colors"
                  >
                    Ver detalles
                  </button>
                  <button
                    onClick={() => addToCart(contrato.id)}
                    className="flex-1 py-2 bg-julia-blue text-white text-sm font-medium hover:bg-julia-charcoal transition-colors"
                  >
                    {cart.includes(contrato.id) ? 'En carrito' : 'Agregar'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="reveal animate-delay-700 mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 bg-white p-6">
            <Shield size={32} className="text-julia-gold" />
            <div>
              <h4 className="font-serif text-lg text-julia-blue">Garantía de Calidad</h4>
              <p className="text-sm text-julia-gray">Revisado por abogados especialistas</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white p-6">
            <Clock size={32} className="text-julia-gold" />
            <div>
              <h4 className="font-serif text-lg text-julia-blue">Entrega Rápida</h4>
              <p className="text-sm text-julia-gray">Recibe tu contrato en días hábiles</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white p-6">
            <Star size={32} className="text-julia-gold" />
            <div>
              <h4 className="font-serif text-lg text-julia-blue">Soporte Incluido</h4>
              <p className="text-sm text-julia-gray">Dudas resueltas por nuestro equipo</p>
            </div>
          </div>
        </div>

        {/* Detail Dialog */}
        <Dialog open={!!selectedContrato} onOpenChange={() => setSelectedContrato(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl text-julia-blue">
                {selectedContrato?.nombre}
              </DialogTitle>
              <DialogDescription>{selectedContrato?.descripcion}</DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-julia-charcoal mb-2">Incluye:</h4>
                <ul className="space-y-2">
                  {selectedContrato?.caracteristicas.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check size={16} className="text-julia-gold mt-0.5 flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Clock size={16} className="text-julia-gold" />
                <span>Tiempo de entrega: {selectedContrato?.tiempo}</span>
              </div>
              
              <div className="flex items-baseline gap-3 pt-4 border-t">
                <span className="font-serif text-3xl text-julia-blue">
                  ${selectedContrato?.precio.toLocaleString()}
                </span>
                <span className="text-julia-gray line-through">
                  ${selectedContrato?.precioOriginal.toLocaleString()}
                </span>
              </div>
              
              <Button 
                onClick={() => {
                  if (selectedContrato) {
                    addToCart(selectedContrato.id);
                    setSelectedContrato(null);
                  }
                }}
                className="w-full julia-btn-primary"
              >
                {selectedContrato && cart.includes(selectedContrato.id) 
                  ? 'Ya está en tu carrito' 
                  : 'Agregar al carrito'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Cart Dialog */}
        <Dialog open={showCart} onOpenChange={setShowCart}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl text-julia-blue">
                Tu Carrito
              </DialogTitle>
            </DialogHeader>
            
            {cartItems.length === 0 ? (
              <p className="text-center py-8 text-julia-gray">Tu carrito está vacío</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-3 border-b">
                    <div>
                      <p className="font-medium text-julia-charcoal">{item.nombre}</p>
                      <p className="text-sm text-julia-gray">{item.tiempo}</p>
                    </div>
                    <p className="font-medium text-julia-blue">${item.precio.toLocaleString()}</p>
                  </div>
                ))}
                
                <div className="flex justify-between items-center pt-4">
                  <span className="font-serif text-xl">Total:</span>
                  <span className="font-serif text-2xl text-julia-gold">
                    ${cartTotal.toLocaleString()}
                  </span>
                </div>
                
                <div className="space-y-2 pt-4">
                  <Button className="w-full julia-btn-primary">
                    Proceder al pago
                  </Button>
                  <p className="text-xs text-center text-julia-gray">
                    Serás contactado para completar tu compra y recibir el contrato
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
