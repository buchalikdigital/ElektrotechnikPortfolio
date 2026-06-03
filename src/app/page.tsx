"use client";

import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import About from "@/components/About";
import Process from "@/components/Process";
import Portfolio from "@/components/Portfolio";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import CookieBanner from "@/components/CookieBanner";

const Hero = dynamic(() => import("@/components/Hero"), { ssr: false });

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Stats />
        <Services />
        <Process />
        <Portfolio />
        <Team />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
      <CookieBanner />
    </>
  );
}
