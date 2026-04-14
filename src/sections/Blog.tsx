import { useEffect, useRef, useState } from 'react';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';

const articulos = [
  {
    id: 1,
    categoria: 'Sucesiones',
    titulo: '¿Qué es una sucesión intestamentaria?',
    resumen: 'Cuando una persona fallece sin dejar testamento, sus bienes se transmiten mediante un proceso judicial llamado sucesión intestamentaria.',
    fecha: '15 Mar 2025',
    tiempo: '5 min',
    imagen: 'sucesion-intestamentaria',
  },
  {
    id: 2,
    categoria: 'Testamentos',
    titulo: 'Tipos de testamento en México',
    resumen: 'Conoce los diferentes tipos de testamento que existen en la legislación mexicana y cuál es el más adecuado para tu situación.',
    fecha: '10 Mar 2025',
    tiempo: '7 min',
    imagen: 'tipos-testamento',
  },
  {
    id: 3,
    categoria: 'Impuestos',
    titulo: 'ISAI: Impuesto sobre Adquisición de Inmuebles',
    resumen: 'Todo lo que necesitas saber sobre el ISAI, cuánto debes pagar y cómo calcularlo correctamente en tu proceso sucesorio.',
    fecha: '5 Mar 2025',
    tiempo: '6 min',
    imagen: 'isai-impuestos',
  },
  {
    id: 4,
    categoria: 'Herederos',
    titulo: '¿Quiénes son los herederos forzosos?',
    resumen: 'La legítima forzosa y los derechos que tienen ciertos familiares sobre la herencia, independientemente del testamento.',
    fecha: '28 Feb 2025',
    tiempo: '8 min',
    imagen: 'herederos-forzosos',
  },
  {
    id: 5,
    categoria: 'Proceso',
    titulo: 'Etapas de un juicio sucesorio en Nuevo León',
    resumen: 'Guía completa del proceso sucesorio: desde la apertura hasta la adjudicación final de los bienes.',
    fecha: '20 Feb 2025',
    tiempo: '10 min',
    imagen: 'etapas-juicio',
  },
  {
    id: 6,
    categoria: 'Financiamiento',
    titulo: 'Financiamiento de juicios sucesorios: ¿Cómo funciona?',
    resumen: 'Descubre cómo puedes iniciar tu juicio sucesorio sin costo inicial mediante nuestro modelo de financiamiento.',
    fecha: '15 Feb 2025',
    tiempo: '6 min',
    imagen: 'financiamiento',
  },
];

const categorias = ['Todas', 'Sucesiones', 'Testamentos', 'Impuestos', 'Herederos', 'Proceso', 'Financiamiento'];

export default function Blog() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');

  const articulosFiltrados = categoriaActiva === 'Todas' 
    ? articulos 
    : articulos.filter(a => a.categoria === categoriaActiva);

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
      id="blog"
      ref={sectionRef}
      className="julia-section relative bg-julia-cream"
    >
      <div className="julia-container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="reveal mb-6">
            <span className="julia-label">Centro de Conocimiento</span>
          </div>
          <h2 className="reveal animate-delay-100 julia-heading-lg text-julia-blue mb-6">
            Blog de Herencias y Sucesiones
          </h2>
          <p className="reveal animate-delay-200 julia-body">
            Artículos educativos sobre todo lo que necesitas saber sobre herencias, 
            testamentos y procesos sucesorios en México.
          </p>
        </div>

        {/* Categories Filter */}
        <div className="reveal animate-delay-300 flex flex-wrap justify-center gap-2 mb-12">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className={`px-4 py-2 text-sm font-medium transition-all ${
                categoriaActiva === cat
                  ? 'bg-julia-blue text-white'
                  : 'bg-white text-julia-charcoal hover:bg-julia-blue/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articulosFiltrados.map((articulo, index) => (
            <article
              key={articulo.id}
              className="reveal bg-white group hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: `${400 + index * 100}ms` }}
            >
              {/* Image Placeholder */}
              <div className="aspect-video bg-julia-blue/5 flex items-center justify-center group-hover:bg-julia-gold/10 transition-colors">
                <span className="font-serif text-4xl text-julia-blue/20 group-hover:text-julia-gold/30 transition-colors">
                  {articulo.titulo.charAt(0)}
                </span>
              </div>
              
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-4 mb-4 text-xs text-julia-gray">
                  <span className="flex items-center gap-1">
                    <Tag size={12} className="text-julia-gold" />
                    {articulo.categoria}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} className="text-julia-gold" />
                    {articulo.fecha}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} className="text-julia-gold" />
                    {articulo.tiempo}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className="font-serif text-xl text-julia-blue mb-3 group-hover:text-julia-gold transition-colors">
                  {articulo.titulo}
                </h3>
                
                {/* Excerpt */}
                <p className="julia-body-sm mb-4">{articulo.resumen}</p>
                
                {/* Read More */}
                <button className="flex items-center gap-2 text-sm font-medium text-julia-blue group-hover:text-julia-gold transition-colors">
                  Leer más
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* View All */}
        <div className="reveal animate-delay-700 mt-12 text-center">
          <button className="julia-btn-outline">
            Ver todos los artículos
          </button>
        </div>
      </div>
    </section>
  );
}
