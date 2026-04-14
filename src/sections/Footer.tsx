import { Scale } from 'lucide-react';

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Blog', href: '#blog' },
  { label: 'Calculadoras', href: '#calculadoras' },
  { label: 'Contratos', href: '#contratos' },
  { label: 'Inversionistas', href: '#inversionistas' },
  { label: 'Contacto', href: '#contacto' },
];

const legalLinks = [
  'Aviso de privacidad',
  'Términos y condiciones',
  'Política de cookies',
];

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-julia-charcoal text-white">
      {/* Main Footer */}
      <div className="julia-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <span className="font-serif text-3xl font-semibold tracking-tight">
                JULIA
              </span>
            </div>
            <p className="font-sans text-sm text-white/60 mb-4">
              Herencias & Sucesiones
            </p>
            <p className="font-sans text-sm text-white/60 max-w-md mb-6">
              Plataforma de originación y gestión de sucesiones respaldadas por bienes 
              inmuebles. Especialistas en recuperar patrimonios sin costo inicial en 
              Nuevo León, México.
            </p>
            <p className="font-serif text-lg text-julia-gold mb-4">
              Análisis jurídico. Solución con estrategia.
            </p>
            <div className="space-y-2 text-sm text-white/60">
              <p>Lic. Eben Francisco Rodríguez Vela</p>
              <p>Pegasos 234, Arcadia, Juárez, NL</p>
              <p>Tel: 720 318 7601</p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-sans text-sm uppercase tracking-wider text-white/40 mb-6">
              Navegación
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="font-sans text-sm text-white/70 hover:text-julia-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-sans text-sm uppercase tracking-wider text-white/40 mb-6">
              Legal
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-sans text-sm text-white/70 hover:text-julia-gold transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 text-white/40">
                <Scale size={14} />
                <span className="font-sans text-xs">
                  No genera relación abogado-cliente hasta contrato firmado
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="julia-container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-sans text-xs text-white/40">
              © {new Date().getFullYear()} JULIA Herencias & Sucesiones. Todos los derechos reservados.
            </p>
            <p className="font-sans text-xs text-white/40">
              Juárez, Nuevo León, México
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
