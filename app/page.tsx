"use client"
import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import Servicios from '@/sections/Servicios';
import Blog from '@/sections/Blog';
import Calculadoras from '@/sections/Calculadoras';
import Contratos from '@/sections/Contratos';
import Inversionistas from '@/sections/Inversionistas';
import FAQ from '@/sections/FAQ';
import Contacto from '@/sections/Contacto';
import Footer from '@/sections/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-julia-cream">
      <Navigation />
      <main>
        <Hero />
        <Servicios />
        <Blog />
        <Calculadoras />
        <Contratos />
        <Inversionistas />
        <FAQ />
        <Contacto />
      </main>
      <Footer />
    </div>
  );
}
