
import CartDrawer from "@/components/CartDrawer";
import Craft from "@/components/Craft";
import CustomCursor from "@/components/CustomCursor";
import FloatingActions from "@/components/FloatingActions";
import FlyToCart from "@/components/FlyToCart";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Loader from "@/components/Loader";
import MenuSection from "@/components/MenuSection";
import Navbar from "@/components/Navbar";
import Offer from "@/components/Offer";
import Reveal from "@/components/Reveal";
import ScrollProgress from "@/components/ScrollProgress";
import Stats from "@/components/Stats";
import Story from "@/components/Story";
import Ticker from "@/components/Ticker";
import Toast from "@/components/Toast";
import Visit from "@/components/Visit";

export default function Home() {
  return (
    <main id="top" className="overflow-x-clip">
      <Loader />
      <CustomCursor />
      <ScrollProgress />

      {/* Top announcement bar */}
      <div className="flex min-h-[30px] items-center justify-between gap-4 bg-ink px-[4%] py-2 text-[9px] font-bold tracking-[1.45px] text-[#fffaf4] max-[600px]:justify-center">
        <span className="flex items-center gap-[9px]">
          <span className="size-[7px] animate-pulse-dot rounded-full bg-[#f27c42] shadow-[0_0_0_4px_rgba(242,124,66,0.15)] motion-reduce:animate-none" />
          FRESH FROM THE OVEN{" "}
          <span className="text-[#f28344]">✳</span> MADE
          WITH LOVE
        </span>

        <span className="text-[#d5c9bb] max-[600px]:hidden">
          MULTAN, PAKISTAN
        </span>
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Hero section */}
      <Hero />

      {/* Scrolling text */}
      <Ticker />

      {/* Animated content sections */}
      <Reveal>
        <Stats />
      </Reveal>

      <Reveal>
        <MenuSection />
      </Reveal>

      <Reveal>
        <Story />
      </Reveal>

      <Reveal>
        <Craft />
      </Reveal>

      <Reveal>
        <Offer />
      </Reveal>

      <Reveal>
        <Visit />
      </Reveal>

      {/* Footer */}
      <Footer />

      {/* Global UI components */}
      <Toast />
      <FlyToCart />
      <CartDrawer />
      <FloatingActions />
    </main>
  );
}
