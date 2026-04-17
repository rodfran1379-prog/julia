"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  ShoppingCart,
  Shield,
  Clock,
  Star,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import WhatsAppButton from "@/components/WhatsAppButton";

const contratos = [
  {
    id: 1,
    nombre: "Testamento Simple",
    descripcion:
      "Testamento básico para distribución de bienes entre herederos. Incluye cláusulas estándar de protección patrimonial.",
    precio: 3500,
    precioOriginal: 5000,
    imagen: "/images/contrato-testamento-simple.jpg",
    caracteristicas: [
      "Redacción por abogado especializado",
      "Revisión de documentación previa",
      "Instrucciones detalladas para firma",
      "Formato listo para notario",
      "1 revisión incluida",
    ],
    tiempo: "3-5 días hábiles",
    popular: false,
    categoria: "Testamentos",
  },
  {
    id: 2,
    nombre: "Testamento con Fideicomiso",
    descripcion:
      "Testamento con disposiciones de fideicomiso para menores de edad o protección patrimonial avanzada.",
    precio: 8500,
    precioOriginal: 12000,
    imagen: "/images/contrato-testamento-fideicomiso.jpg",
    caracteristicas: [
      "Estructura de fideicomiso testamentario",
      "Designación de fiduciario",
      "Disposiciones para menores",
      "Revisión legal completa",
      "2 revisiones incluidas",
    ],
    tiempo: "5-7 días hábiles",
    popular: true,
    categoria: "Testamentos",
  },
  {
    id: 3,
    nombre: "Contrato de Compraventa",
    descripcion:
      "Contrato para la venta de bienes inmuebles entre particulares con protección legal completa.",
    precio: 2800,
    precioOriginal: 4000,
    imagen: "/images/contrato-compraventa.jpg",
    caracteristicas: [
      "Cláusulas de garantía de propiedad",
      "Forma de pago detallada y segura",
      "Entrega de posesión documentada",
      "Resolución de conflictos incluida",
      "Revisión por especialista",
    ],
    tiempo: "2-3 días hábiles",
    popular: false,
    categoria: "Contratos Civiles",
  },
  {
    id: 4,
    nombre: "Contrato de Arrendamiento",
    descripcion:
      "Contrato de renta de inmueble con cláusulas de protección para arrendador y arrendatario.",
    precio: 1800,
    precioOriginal: 2500,
    imagen: "/images/contrato-arrendamiento.jpg",
    caracteristicas: [
      "Depósito en garantía detallado",
      "Obligaciones claras de ambas partes",
      "Mantenimiento y reparaciones",
      "Rescisión y renovación reguladas",
      "Formato actualizado 2025",
    ],
    tiempo: "1-2 días hábiles",
    popular: false,
    categoria: "Contratos Civiles",
  },
  {
    id: 5,
    nombre: "Poder General",
    descripcion:
      "Poder notarial amplio para representación legal en diversos trámites y actos.",
    precio: 2200,
    precioOriginal: 3000,
    imagen: "/images/contrato-poder-general.jpg",
    caracteristicas: [
      "Facultades amplias y claras",
      "Plazo de vigencia definido",
      "Revocación incluida",
      "Instrucciones de uso detalladas",
      "Válido en todo México",
    ],
    tiempo: "2-3 días hábiles",
    popular: false,
    categoria: "Poderes",
  },
  {
    id: 6,
    nombre: "Poder Especial para Sucesiones",
    descripcion:
      "Poder específico para representación en procesos sucesorios y trámites hereditarios.",
    precio: 3500,
    precioOriginal: 5000,
    imagen: "/images/contrato-poder-sucesiones.jpg",
    caracteristicas: [
      "Facultades específicas para sucesiones",
      "Representación ante juzgados",
      "Firma de documentos hereditarios",
      "Cobro de dividendos y rentas",
      "Instrucciones personalizadas",
    ],
    tiempo: "2-3 días hábiles",
    popular: false,
    categoria: "Poderes",
  },
  {
    id: 7,
    nombre: "Contrato de Sociedad",
    descripcion:
      "Constitución de sociedad civil o mercantil con estatutos personalizados.",
    precio: 12000,
    precioOriginal: 18000,
    imagen: "/images/contrato-sociedad.jpg",
    caracteristicas: [
      "Estatutos sociales completos",
      "Aportaciones de socios detalladas",
      "Administración y dirección claras",
      "Disolución y liquidación reguladas",
      "Asesoría fiscal básica incluida",
    ],
    tiempo: "7-10 días hábiles",
    popular: false,
    categoria: "Sociedades",
  },
  {
    id: 8,
    nombre: "Donación Entre Vivos",
    descripcion:
      "Contrato de donación de bienes entre personas vivas con optimización fiscal.",
    precio: 4500,
    precioOriginal: 6500,
    imagen: "/images/contrato-donacion.jpg",
    caracteristicas: [
      "Estructura fiscal optimizada",
      "Cláusulas de reversión opcionales",
      "Revisión notarial incluida",
      "Instrucciones para inscripción",
      "Asesoría patrimonial básica",
    ],
    tiempo: "3-5 días hábiles",
    popular: false,
    categoria: "Donaciones",
  },
];

const categorias = [
  "Todos",
  "Testamentos",
  "Contratos Civiles",
  "Poderes",
  "Sociedades",
  "Donaciones",
];

export default function Contratos() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedContrato, setSelectedContrato] = useState<
    (typeof contratos)[0] | null
  >(null);
  const [cart, setCart] = useState<number[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "form" | "success">(
    "cart",
  );
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
  });

  const contratosFiltrados =
    categoriaActiva === "Todos"
      ? contratos
      : contratos.filter((c) => c.categoria === categoriaActiva);

  const addToCart = (id: number) => {
    if (!cart.includes(id)) {
      setCart([...cart, id]);
    }
    setShowCart(true);
    setCheckoutStep("cart");
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((itemId) => itemId !== id));
  };

  const cartItems = contratos.filter((c) => cart.includes(c.id));
  const cartTotal = cartItems.reduce((sum, item) => sum + item.precio, 0);
  const cartAhorro = cartItems.reduce(
    (sum, item) => sum + (item.precioOriginal - item.precio),
    0,
  );

  const handleCheckout = () => {
    setCheckoutStep("form");
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep("success");
    setTimeout(() => {
      setShowCart(false);
      setCheckoutStep("cart");
      setCart([]);
      setFormData({ nombre: "", email: "", telefono: "" });
    }, 3000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => {
      el.classList.add("opacity-0");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contratos"
      ref={sectionRef}
      className="julia-section relative bg-white"
    >
      <div className="julia-container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="reveal mb-6">
            <span className="julia-label">Tienda Legal</span>
          </div>
          <h2 className="reveal animate-delay-100 julia-heading-lg text-julia-blue mb-6">
            Contratos en Línea
          </h2>
          <p className="reveal animate-delay-200 julia-body">
            Contratos civiles y mercantiles redactados por abogados
            especialistas. Recibe tu documento listo para firmar en pocos días,
            con garantía de calidad.
          </p>
        </div>

        {/* Cart Button (Floating) */}
        {cart.length > 0 && (
          <div className="reveal animate-delay-300 fixed bottom-6 right-6 z-40">
            <button
              onClick={() => {
                setShowCart(true);
                setCheckoutStep("cart");
              }}
              className="bg-julia-blue text-white px-6 py-4 rounded-full shadow-xl flex items-center gap-3 hover:bg-julia-charcoal transition-colors"
            >
              <ShoppingCart size={20} />
              <span className="font-medium">{cart.length}</span>
              <span className="bg-julia-gold px-3 py-1 rounded-full text-sm font-bold">
                ${cartTotal.toLocaleString()}
              </span>
            </button>
          </div>
        )}

        {/* Categories Filter */}
        <div className="reveal animate-delay-300 flex flex-wrap justify-center gap-2 mb-10">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className={`px-5 py-2 text-sm font-medium transition-all ${
                categoriaActiva === cat
                  ? "bg-julia-blue text-white"
                  : "bg-julia-cream text-julia-charcoal hover:bg-julia-blue/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Contracts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contratosFiltrados.map((contrato, index) => (
            <div
              key={contrato.id}
              className="reveal bg-julia-cream group hover:shadow-xl transition-all duration-300 relative flex flex-col"
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              {contrato.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-julia-gold text-white text-xs px-4 py-1 font-medium z-10">
                  MÁS POPULAR
                </div>
              )}

              {/* Product Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={contrato.imagen}
                  alt={contrato.nombre}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col">
                {/* Category */}
                <span className="text-xs text-julia-gold font-medium mb-2">
                  {contrato.categoria}
                </span>

                {/* Title */}
                <h3 className="font-serif text-lg text-julia-blue mb-2 group-hover:text-julia-gold transition-colors">
                  {contrato.nombre}
                </h3>

                {/* Description */}
                <p className="text-sm text-julia-gray mb-4 flex-1">
                  {contrato.descripcion}
                </p>

                {/* Features Preview */}
                <ul className="space-y-1 mb-4">
                  {contrato.caracteristicas.slice(0, 3).map((feat, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-julia-gray"
                    >
                      <Check
                        size={12}
                        className="text-julia-gold mt-0.5 flex-shrink-0"
                      />
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* Time */}
                <div className="flex items-center gap-2 text-xs text-julia-gray mb-4">
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
                  <WhatsAppButton
                    message={`Hola, me interesa cotizar el contrato de ${contrato.nombre}`}
                    variant={cart.includes(contrato.id) ? "gold" : "primary"}
                    className="flex-1 py-2 text-sm font-medium"
                  >                    
                    Cotizar
                  </WhatsAppButton>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="reveal animate-delay-700 mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 bg-julia-cream p-6">
            <Shield size={32} className="text-julia-gold" />
            <div>
              <h4 className="font-serif text-lg text-julia-blue">
                Garantía de Calidad
              </h4>
              <p className="text-sm text-julia-gray">
                Revisado por abogados especialistas
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-julia-cream p-6">
            <Clock size={32} className="text-julia-gold" />
            <div>
              <h4 className="font-serif text-lg text-julia-blue">
                Entrega Rápida
              </h4>
              <p className="text-sm text-julia-gray">
                Recibe tu contrato en días hábiles
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-julia-cream p-6">
            <Star size={32} className="text-julia-gold" />
            <div>
              <h4 className="font-serif text-lg text-julia-blue">
                Soporte Incluido
              </h4>
              <p className="text-sm text-julia-gray">
                Dudas resueltas por nuestro equipo
              </p>
            </div>
          </div>
        </div>

        {/* Detail Dialog */}
        <Dialog
          open={!!selectedContrato}
          onOpenChange={() => setSelectedContrato(null)}
        >
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl text-julia-blue">
                {selectedContrato?.nombre}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <p className="text-julia-gray">{selectedContrato?.descripcion}</p>

              <div>
                <h4 className="font-medium text-julia-charcoal mb-2">
                  Incluye:
                </h4>
                <ul className="space-y-2">
                  {selectedContrato?.caracteristicas.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check
                        size={16}
                        className="text-julia-gold mt-0.5 flex-shrink-0"
                      />
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
                <span className="text-julia-gold text-sm font-medium">
                  Ahorras $
                  {selectedContrato &&
                    (
                      selectedContrato.precioOriginal - selectedContrato.precio
                    ).toLocaleString()}
                </span>
              </div>

              <WhatsAppButton
                message={`Hola, me interesa cotizar el contrato de ${selectedContrato?.nombre}`}
                variant="primary"
                className="w-full"
              >
                <MessageCircle size={16} />
                Cotizar por WhatsApp
              </WhatsAppButton>
            </div>
          </DialogContent>
        </Dialog>

        {/* Cart/Checkout Dialog */}
        <Dialog open={showCart} onOpenChange={setShowCart}>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl text-julia-blue flex items-center gap-2">
                <ShoppingCart size={24} />
                Tu Carrito
              </DialogTitle>
            </DialogHeader>

            {checkoutStep === "cart" && (
              <>
                {cartItems.length === 0 ? (
                  <p className="text-center py-8 text-julia-gray">
                    Tu carrito está vacío
                  </p>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-start py-3 border-b"
                      >
                        <div>
                          <p className="font-medium text-julia-charcoal">
                            {item.nombre}
                          </p>
                          <p className="text-sm text-julia-gray">
                            {item.tiempo}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-julia-blue">
                            ${item.precio.toLocaleString()}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-julia-gray hover:text-red-500 transition-colors"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="bg-julia-cream p-4 rounded-lg">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-julia-gray">Subtotal:</span>
                        <span>${cartTotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2 text-julia-gold">
                        <span>Ahorro:</span>
                        <span>-${cartAhorro.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-julia-blue/10">
                        <span className="font-medium">Total:</span>
                        <span className="font-serif text-2xl text-julia-gold">
                          ${cartTotal.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {(() => {
                      const listaContratos = cartItems
                        .map((i) => i.nombre)
                        .join(", ");
                      const mensajeWhatsApp =
                        cartItems.length === 1
                          ? `Hola, me interesa cotizar el contrato de ${listaContratos}`
                          : `Hola, me interesa cotizar los siguientes contratos: ${listaContratos}`;

                      return (
                        <WhatsAppButton
                          message={mensajeWhatsApp}
                          variant="primary"
                          className="w-full"
                        >
                          <MessageCircle size={18} />
                          Cotizar por WhatsApp
                        </WhatsAppButton>
                      );
                    })()}

                    <p className="text-xs text-center text-julia-gray">
                      Te contactaremos para confirmar los detalles
                    </p>
                  </div>
                )}
              </>
            )}

            {checkoutStep === "form" && (
              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <p className="text-sm text-julia-gray mb-4">
                  Completa tus datos para procesar tu pedido:
                </p>
                <div>
                  <label className="block text-sm font-medium text-julia-charcoal mb-2">
                    Nombre completo
                  </label>
                  <Input
                    value={formData.nombre}
                    onChange={(e) =>
                      setFormData({ ...formData, nombre: e.target.value })
                    }
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
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
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
                    onChange={(e) =>
                      setFormData({ ...formData, telefono: e.target.value })
                    }
                    placeholder="720 318 7601"
                    className="border-julia-blue/20"
                    required
                  />
                </div>

                <div className="bg-julia-cream p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total a pagar:</span>
                    <span className="font-serif text-xl text-julia-gold">
                      ${cartTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep("cart")}
                    className="flex-1 py-3 border border-julia-blue text-julia-blue font-medium hover:bg-julia-blue hover:text-white transition-colors"
                  >
                    Volver
                  </button>
                  <Button type="submit" className="flex-1 julia-btn-primary">
                    Confirmar pedido
                  </Button>
                </div>
                <p className="text-xs text-center text-julia-gray">
                  Un abogado de JULIA te contactará para confirmar los detalles
                  y coordinar el pago
                </p>
              </form>
            )}

            {checkoutStep === "success" && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-julia-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={32} className="text-julia-gold" />
                </div>
                <h4 className="font-serif text-xl text-julia-blue mb-2">
                  ¡Pedido recibido!
                </h4>
                <p className="julia-body-sm mb-4">
                  Un abogado de JULIA se pondrá en contacto contigo en menos de
                  24 horas para confirmar los detalles.
                </p>
                <p className="text-sm text-julia-gray">
                  Total:{" "}
                  <span className="font-bold text-julia-gold">
                    ${cartTotal.toLocaleString()}
                  </span>
                </p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
