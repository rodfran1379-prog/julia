'use client';

import { useEffect, useRef, useState } from 'react';
import { Calendar, Clock, ArrowRight, Tag, X, ChevronLeft, MessageCircle } from 'lucide-react';
import WhatsAppButton from '@/components/WhatsAppButton';

interface Articulo {
  id: number;
  categoria: string;
  titulo: string;
  resumen: string;
  contenido: string;
  fecha: string;
  tiempo: string;
  imagen: string;
}

const articulos: Articulo[] = [
  {
    id: 1,
    categoria: 'Sucesiones',
    titulo: '¿Qué es una sucesión intestamentaria?',
    resumen: 'Cuando una persona fallece sin dejar testamento, sus bienes se transmiten mediante un proceso judicial llamado sucesión intestamentaria.',
    imagen: '/images/blog-sucesion-intestamentaria.jpg',
    contenido: `
      <h3>¿Qué significa "intestamentario"?</h3>
      <p>El término "intestamentario" se refiere a la situación en la que una persona fallece sin haber otorgado un testamento válido. En estos casos, la ley determina quiénes son los herederos y en qué proporción les corresponde la herencia.</p>
      
      <h3>¿Quiénes son los herederos en una sucesión intestamentaria?</h3>
      <p>Según el Código Civil de Nuevo León, el orden de los herederos es el siguiente:</p>
      <ul>
        <li><strong>Primera línea:</strong> Los descendientes (hijos, nietos)</li>
        <li><strong>Segunda línea:</strong> Los ascendientes (padres, abuelos)</li>
        <li><strong>Tercera línea:</strong> El cónyuge</li>
        <li><strong>Cuarta línea:</strong> Los colaterales (hermanos, sobrinos)</li>
      </ul>
      
      <h3>¿Cuánto dura un juicio sucesorio intestamentario?</h3>
      <p>La duración varía según la complejidad del caso. En promedio, un juicio sucesorio intestamentario en Nuevo León puede durar entre 18 y 36 meses. Factores como el número de herederos, la existencia de conflictos entre ellos, y la disponibilidad de documentación pueden acelerar o retrasar el proceso.</p>
      
      <h3>¿Cuánto cuesta?</h3>
      <p>Los costos incluyen:</p>
      <ul>
        <li>ISAI (Impuesto sobre Adquisición de Inmuebles): 2-3% del valor</li>
        <li>Honorarios notariales: 1-2% del valor</li>
        <li>Honorarios de abogado: variable</li>
        <li>Otros gastos: edictos, peritajes, etc.</li>
      </ul>
      
      <p>En JULIA ofrecemos financiamiento para que no pagues nada al inicio.</p>
    `,
    fecha: '15 Mar 2025',
    tiempo: '5 min',
  },
  {
    id: 2,
    categoria: 'Testamentos',
    titulo: 'Tipos de testamento en México',
    resumen: 'Conoce los diferentes tipos de testamento que existen en la legislación mexicana y cuál es el más adecuado para tu situación.',
    imagen: '/images/blog-tipos-testamento.jpg',
    contenido: `
      <h3>Testamento Público Abierto</h3>
      <p>Es el más común y se otorga ante notario público. El testador declara su voluntad en presencia del notario y dos testigos. Es el más seguro y difícil de impugnar.</p>
      
      <h3>Testamento Público Cerrado</h3>
      <p>El testador entrega al notario un documento sellado con su voluntad. El notario no conoce el contenido hasta el fallecimiento. Es útil para mantener privacidad.</p>
      
      <h3>Testamento Ológrafo</h3>
      <p>Es escrito enteramente de puño y letra del testador. Debe cumplir requisitos específicos para ser válido. Es el más económico pero también el más fácil de impugnar.</p>
      
      <h3>Testamento Especial</h3>
      <p>Se otorgan en situaciones especiales como:</p>
      <ul>
        <li>Testamento militar (en campaña)</li>
        <li>Testamento marítimo (en navegación)</li>
        <li>Testamento en caso de epidemia</li>
      </ul>
      
      <h3>¿Cuál es el mejor para ti?</h3>
      <p>El testamento público abierto es el más recomendable para la mayoría de las personas, ya que ofrece mayor seguridad jurídica y es más difícil de impugnar.</p>
    `,
    fecha: '10 Mar 2025',
    tiempo: '7 min',
  },
  {
    id: 3,
    categoria: 'Impuestos',
    titulo: 'ISAI: Impuesto sobre Adquisición de Inmuebles',
    resumen: 'Todo lo que necesitas saber sobre el ISAI, cuánto debes pagar y cómo calcularlo correctamente en tu proceso sucesorio.',
    imagen: '/images/blog-isai-impuesto.jpg',
    contenido: `
      <h3>¿Qué es el ISAI?</h3>
      <p>El ISAI (Impuesto sobre Adquisición de Inmuebles) es un impuesto estatal que se paga cuando se adquiere un bien inmueble, incluyendo por herencia.</p>
      
      <h3>¿Cuánto se paga en Nuevo León?</h3>
      <p>En Nuevo León, la tasa del ISAI varía según el municipio, pero generalmente oscila entre el 2% y el 3% del valor catastral del inmueble.</p>
      
      <h3>¿Quién paga el ISAI en una sucesión?</h3>
      <p>Los herederos son responsables de pagar el ISAI proporcionalmente a la parte que les corresponde de la herencia.</p>
      
      <h3>¿Cuándo se paga?</h3>
      <p>El ISAI debe pagarse después de la adjudicación de los bienes y antes de la inscripción en el Registro Público de la Propiedad.</p>
      
      <h3>¿Hay exenciones?</h3>
      <p>Algunos municipios ofrecen descuentos por pronto pago o para ciertos grupos vulnerables. Consulta con tu abogado sobre las opciones disponibles.</p>
    `,
    fecha: '5 Mar 2025',
    tiempo: '6 min',
  },
  {
    id: 4,
    categoria: 'Herederos',
    titulo: '¿Quiénes son los herederos forzosos?',
    resumen: 'La legítima forzosa y los derechos que tienen ciertos familiares sobre la herencia, independientemente del testamento.',
    imagen: '/images/blog-herederos-forzosos.jpg',
    contenido: `
      <h3>¿Qué son los herederos forzosos?</h3>
      <p>Los herederos forzosos son aquellos que la ley protege y a quienes no se les puede quitar su parte de la herencia mediante testamento. Son llamados "forzosos" porque el testador está obligado a reservarles una parte de su patrimonio.</p>
      
      <h3>¿Quiénes son herederos forzosos en México?</h3>
      <ul>
        <li><strong>Descendientes:</strong> Hijos, nietos, bisnietos</li>
        <li><strong>Ascendientes:</strong> Padres, abuelos (cuando no hay descendientes)</li>
        <li><strong>Cónyuge:</strong> El cónyuge sobreviviente</li>
      </ul>
      
      <h3>¿Qué es la legítima?</h3>
      <p>La legítima es la parte de la herencia que por ley corresponde a los herederos forzosos. En México, la legítima corresponde a dos tercios del patrimonio cuando existen herederos forzosos.</p>
      
      <h3>¿Puede un testamento dejar fuera a los herederos forzosos?</h3>
      <p>No. Cualquier disposición testamentaria que menoscabe la legítima de los herederos forzosos es nula. El testador solo puede disponir libremente de un tercio de su patrimonio (la porción libre).</p>
    `,
    fecha: '28 Feb 2025',
    tiempo: '8 min',
  },
  {
    id: 5,
    categoria: 'Proceso',
    titulo: 'Etapas de un juicio sucesorio en Nuevo León',
    resumen: 'Guía completa del proceso sucesorio: desde la apertura hasta la adjudicación final de los bienes.',
    imagen: '/images/blog-etapas-juicio.jpg',
    contenido: `
      <h3>1. Apertura de la sucesión</h3>
      <p>Se presenta la solicitud ante el juzgado de primera instancia en materia civil del domicilio del causante. Se debe acompañar:</p>
      <ul>
        <li>Acta de defunción</li>
        <li>Identificación de los solicitantes</li>
        <li>Documentos que acrediten la calidad de herederos</li>
      </ul>
      
      <h3>2. Declaración de herederos</h3>
      <p>El juez emite sentencia declarando quiénes son los herederos legales y en qué proporción les corresponde la herencia.</p>
      
      <h3>3. Inventario y avalúo</h3>
      <p>Se elabora un inventario de todos los bienes del causante y se realizan avalúos para determinar su valor.</p>
      
      <h3>4. Pago de deudas y legados</h3>
      <p>Se pagan las deudas del causante y se cumplen los legados establecidos en el testamento (si existe).</p>
      
      <h3>5. Adjudicación</h3>
      <p>El juez adjudica los bienes a cada heredero según su parte correspondiente.</p>
      
      <h3>6. Inscripción registral</h3>
      <p>Los bienes inmuebles se inscriben a nombre de los herederos en el Registro Público de la Propiedad.</p>
    `,
    fecha: '20 Feb 2025',
    tiempo: '10 min',
  },
  {
    id: 6,
    categoria: 'Financiamiento',
    titulo: 'Financiamiento de juicios sucesorios: ¿Cómo funciona?',
    resumen: 'Descubre cómo puedes iniciar tu juicio sucesorio sin costo inicial mediante nuestro modelo de financiamiento.',
    imagen: '/images/blog-financiamiento.jpg',
    contenido: `
      <h3>¿Qué es el financiamiento de juicios sucesorios?</h3>
      <p>Es un modelo innovador que permite iniciar un juicio sucesorio sin pagar nada al inicio. Un inversionista aporta el capital necesario para cubrir los gastos legales, y al final del proceso se recupera la inversión más una ganancia.</p>
      
      <h3>¿Cómo funciona?</h3>
      <ol>
        <li><strong>Evaluación:</strong> Analizamos tu caso y determinamos si es viable</li>
        <li><strong>Financiamiento:</strong> Un inversionista aporta el capital inicial (aproximadamente 10% del valor)</li>
        <li><strong>Litigio:</strong> JULIA gestiona todo el proceso legal</li>
        <li><strong>Recuperación:</strong> Al finalizar, se distribuyen los bienes</li>
        <li><strong>Pago:</strong> El inversionista recibe su capital más ganancia, tú recibes tu herencia</li>
      </ol>
      
      <h3>¿Cuánto cuesta al final?</h3>
      <p>El cliente paga un porcentaje del valor recuperado (generalmente 30%), que se distribuye entre:</p>
      <ul>
        <li>Inversionista: 23%</li>
        <li>JULIA (honorarios): 7%</li>
      </ul>
      
      <h3>¿Cuál es el beneficio para el cliente?</h3>
      <p>Puedes iniciar tu juicio sucesorio sin desembolsar dinero inicial, y solo pagas cuando recuperas tu patrimonio.</p>
    `,
    fecha: '15 Feb 2025',
    tiempo: '6 min',
  },
];

const categorias = ['Todas', 'Sucesiones', 'Testamentos', 'Impuestos', 'Herederos', 'Proceso', 'Financiamiento'];

export default function Blog() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');
  const [articuloSeleccionado, setArticuloSeleccionado] = useState<Articulo | null>(null);

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

  // Bloquear scroll cuando el modal está abierto
  useEffect(() => {
    if (articuloSeleccionado) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [articuloSeleccionado]);

  if (articuloSeleccionado) {
    return (
      <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
        <div className="julia-container py-8">
          {/* Header del artículo */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setArticuloSeleccionado(null)}
              className="flex items-center gap-2 text-julia-blue hover:text-julia-gold transition-colors"
            >
              <ChevronLeft size={20} />
              Volver al blog
            </button>
            <button
              onClick={() => setArticuloSeleccionado(null)}
              className="p-2 hover:bg-julia-cream rounded-full transition-colors"
            >
              <X size={24} className="text-julia-charcoal" />
            </button>
          </div>

          {/* Meta info */}
          <div className="flex items-center gap-4 mb-6 text-sm text-julia-gray">
            <span className="flex items-center gap-1">
              <Tag size={14} className="text-julia-gold" />
              {articuloSeleccionado.categoria}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={14} className="text-julia-gold" />
              {articuloSeleccionado.fecha}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} className="text-julia-gold" />
              {articuloSeleccionado.tiempo} de lectura
            </span>
          </div>

          {/* Título */}
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-julia-blue mb-8">
            {articuloSeleccionado.titulo}
          </h1>

          {/* Contenido */}
          <div 
            className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-julia-blue prose-p:text-julia-charcoal prose-li:text-julia-charcoal prose-strong:text-julia-blue"
            dangerouslySetInnerHTML={{ __html: articuloSeleccionado.contenido }}
          />

          {/* CTA */}
          <div className="mt-12 p-8 bg-julia-cream">
            <h3 className="font-serif text-2xl text-julia-blue mb-4">
              ¿Tienes dudas sobre este tema?
            </h3>
            <p className="julia-body mb-6">
              Resolvemos tus dudas directamente por WhatsApp sin compromiso.
            </p>
            <WhatsAppButton
              message={`Hola, leí el artículo "${articuloSeleccionado.titulo}" y me gustaría hacer algunas preguntas`}
              variant="primary"
            >
              <MessageCircle size={16} />
              Preguntar por WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </div>
    );
  }

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
              className="reveal bg-white group hover:shadow-xl transition-all duration-300 cursor-pointer"
              style={{ animationDelay: `${400 + index * 100}ms` }}
              onClick={() => setArticuloSeleccionado(articulo)}
            >
              {/* Article Image */}
              <div className="aspect-video overflow-hidden">
                <img 
                  src={articulo.imagen} 
                  alt={articulo.titulo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
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
                <span className="flex items-center gap-2 text-sm font-medium text-julia-blue group-hover:text-julia-gold transition-colors">
                  Leer artículo completo
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
