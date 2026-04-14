import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Blog', href: '#blog' },
  { label: 'Calculadoras', href: '#calculadoras' },
  { label: 'Contratos', href: '#contratos' },
  { label: 'Inversionistas', href: '#inversionistas' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = navLinks.map(link => link.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-julia-cream/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="julia-container">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <a
              href="#inicio"
              onClick={(e) => handleNavClick(e, '#inicio')}
              className="flex items-center gap-2"
            >
              <span className="font-serif text-2xl lg:text-3xl font-semibold text-julia-blue tracking-tight">
                JULIA
              </span>
              <span className="hidden sm:inline font-sans text-xs text-julia-gold tracking-wider uppercase">
                Herencias & Sucesiones
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`julia-nav-link ${
                    activeSection === link.href.replace('#', '')
                      ? 'julia-nav-link-active'
                      : ''
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <a
                href="#contacto"
                onClick={(e) => handleNavClick(e, '#contacto')}
                className="julia-btn-primary text-sm py-3 px-6"
              >
                Consulta Gratis
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-julia-blue hover:text-julia-gold transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-julia-charcoal/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 w-full max-w-sm h-full bg-julia-cream shadow-2xl transition-transform duration-500 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col pt-24 px-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`py-4 border-b border-julia-blue/10 font-serif text-xl text-julia-charcoal hover:text-julia-gold transition-colors ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-julia-gold'
                    : ''
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={(e) => handleNavClick(e, '#contacto')}
              className="mt-6 julia-btn-primary text-center"
            >
              Consulta Gratis
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
