
import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import Problemas from '@/sections/Problemas';
import Diagnostico from '@/sections/Diagnostico';
import Servicios from '@/sections/Servicios';
import Contratos from '@/sections/Contratos';
import Simulador from '@/sections/Simulador';
import Blog from '@/sections/Blog';
import Contacto from '@/sections/Contacto';
import Footer from '@/sections/Footer';



export default function Home() {
  return (
    <div className="min-h-screen bg-julia-cream">
      <Navigation />
      <main>
        <Hero />
        <Problemas />
        <Diagnostico />
        <Servicios />
        <Contratos />
        <Simulador />
        <Blog />
        <Contacto />
      </main>
      <Footer />
    </div>
  );
}