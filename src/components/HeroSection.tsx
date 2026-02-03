import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import gcLogo from "@/assets/gc-logo2.png";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(TextPlugin, ScrollTrigger);

const heroImages = [
  { src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=80", alt: "Esports gaming tournament" },
  { src: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&q=80", alt: "Gaming setup with RGB lights" },
  { src: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1920&q=80", alt: "Competitive gaming event" },
];

// Controller symbol shapes as SVG clip paths
const controllerSymbols = [
  {
    id: "circle",
    path: "M50,0 A50,50 0 1,1 50,100 A50,50 0 1,1 50,0",
    viewBox: "0 0 100 100",
    size: { base: 30, md: 80, lg: 100 },
    position: { top: "15%", left: "8%" },
    animation: { x: [0, 15, 0], y: [0, -20, 0] },
    duration: 8,
    delay: 0,
  },
  {
    id: "cross",
    path: "M35,0 L65,0 L65,35 L100,35 L100,65 L65,65 L65,100 L35,100 L35,65 L0,65 L0,35 L35,35 Z",
    viewBox: "0 0 100 100",
    size: { base: 25, md: 70, lg: 90 },
    position: { top: "25%", right: "10%" },
    animation: { x: [0, -20, 0], y: [0, 15, 0] },
    duration: 10,
    delay: 0.5,
  },
  {
    id: "triangle",
    path: "M50,5 L95,90 L5,90 Z",
    viewBox: "0 0 100 100",
    size: { base: 30, md: 75, lg: 95 },
    position: { bottom: "30%", left: "5%" },
    animation: { x: [0, 10, 0], y: [0, 12, 0] },
    duration: 9,
    delay: 1,
  },
  {
    id: "square",
    path: "M10,10 L90,10 L90,90 L10,90 Z",
    viewBox: "0 0 100 100",
    size: { base: 25, md: 65, lg: 85 },
    position: { bottom: "25%", right: "8%" },
    animation: { x: [0, -12, 0], y: [0, -18, 0] },
    duration: 11,
    delay: 1.5,
  },
];

interface FloatingSymbolProps {
  symbol: typeof controllerSymbols[0];
  currentImage: string;
  imageKey: number;
  mouseX: number;
  mouseY: number;
}

function FloatingSymbol({ symbol, currentImage, imageKey, mouseX, mouseY }: FloatingSymbolProps) {
  const clipId = `clip-${symbol.id}`;
  
  // Calculate parallax offset based on mouse position (subtle effect)
  const parallaxX = (mouseX - 0.5) * 8; // ±4px movement
  const parallaxY = (mouseY - 0.5) * 8;
  
  return (
    <motion.div
      className="absolute z-20 pointer-events-none hidden md:block"
      style={{
        ...symbol.position,
        width: `clamp(${symbol.size.base}px, 8vw, ${symbol.size.lg}px)`,
        height: `clamp(${symbol.size.base}px, 8vw, ${symbol.size.lg}px)`,
        x: parallaxX,
        y: parallaxY,
      }}
      animate={{
        x: symbol.animation.x.map(val => val + parallaxX),
        y: symbol.animation.y.map(val => val + parallaxY),
      }}
      transition={{
        duration: symbol.duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: symbol.delay,
        repeatType: "loop",
      }}
    >
      {/* Glassmorphism container with backdrop blur */}
      <div className="relative w-full h-full backdrop-blur-sm rounded-2xl overflow-hidden">
        {/* Outer stroke with rounded edges */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox={symbol.viewBox}
        >
          <defs>
            <clipPath id={clipId}>
              <path d={symbol.path} />
            </clipPath>
          </defs>
          
          {/* Outer primary stroke at 50% opacity */}
          <path
            d={symbol.path}
            fill="none"
            stroke="hsl(var(--primary) / 0.5)"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        
        {/* Masked image container with glass background */}
        <div 
          className="absolute inset-0 overflow-hidden rounded-2xl"
          style={{ 
            clipPath: `url(#${clipId})`,
          }}
        >
          {/* Glass background layer */}
          <div className="absolute inset-0 bg-background/5" />
          
          {/* Carousel image with crossfade and scale */}
          <AnimatePresence mode="wait">
            <motion.img
              key={imageKey}
              src={currentImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                transform: "scale(1.5)",
                objectPosition: "center",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.95 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </AnimatePresence>
          
          {/* Glass overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
        </div>
        
        {/* Inner highlight stroke */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={symbol.viewBox}
        >
          <path
            d={symbol.path}
            fill="none"
            stroke="hsl(var(--background) / 0.3)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // GSAP Text Animation
  useEffect(() => {
    if (headlineRef.current) {
      gsap.to(headlineRef.current, {
        duration: 1.5,
        delay: 0.3,
        text: {
          value: "Level Up Your Gaming Journey",
          speed: 0.4,
        },
        ease: "power1.inOut",
      });
    }

    if (subheadlineRef.current) {
      gsap.to(subheadlineRef.current, {
        duration: 2,
        delay: 1.2,
        text: {
          value: "Join Sri Lanka's premier university gaming community. Compete, connect, and create legendary moments with fellow gamers at SLIIT.",
          speed: 0.8,
        },
        ease: "power1.inOut",
      });
    }

    if (logoRef.current && sectionRef.current) {
      gsap.fromTo(
        logoRef.current,
        { scale: 1, opacity: 1 },
        {
          scale: 0.7,
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }

    // Parallax background effect
    if (bgRef.current && sectionRef.current) {
      gsap.to(bgRef.current, {
        y: -80,
        scale: 1.08,
        ease: "power1.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // Fade-in and slight upward motion for content
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  const currentImage = heroImages[selectedIndex].src;

  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  // Track mouse movement for spotlight and parallax
  function handleMouseMove(e: React.MouseEvent) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setMousePosition({ x, y });
    setCursor({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }
  function handleMouseLeave() {
    setMousePosition({ x: 0.5, y: 0.5 });
    setCursor(null);
  }

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0" ref={bgRef}>
        <div ref={emblaRef} className="h-full overflow-hidden">
          <div className="flex h-full">
            {heroImages.map((image, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0 h-full relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover opacity-80 dark:opacity-60"
                />
              </div>
            ))}
          </div>
        </div>
        {/* Overlay with cursor spotlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: cursor
              ? `radial-gradient(circle 200px at ${cursor.x}px ${cursor.y}px, transparent 0%, rgba(20,20,20,0.3) 80%)`
              : "rgba(20,20,20,0.3)",
            transition: "background 0.2s",
            zIndex: 1,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background" />
      </div>

      {/* Floating Controller Symbol Elements */}
      {controllerSymbols.map((symbol) => (
        <FloatingSymbol
          key={symbol.id}
          symbol={symbol}
          currentImage={currentImage}
          imageKey={selectedIndex}
          mouseX={mousePosition.x}
          mouseY={mousePosition.y}
        />
      ))}

      {/* Carousel Navigation */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-background/50 hover:bg-background/80 border border-border transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-foreground" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-background/50 hover:bg-background/80 border border-border transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-foreground" />
      </button>

      {/* Carousel Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === selectedIndex
                ? "bg-primary w-6"
                : "bg-foreground/30 hover:bg-foreground/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="section-container relative z-10 text-center" ref={contentRef}>
        <img
          ref={logoRef}
          src={gcLogo}
          alt="SLIIT Gaming Community Logo"
          className="mx-auto mb-8 w-32 md:w-40 lg:w-56"
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gaming-blue-light border border-primary/20 mb-8"
          >
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">500+ Active Members</span>
          </motion.div> */}

          {/* Headline with GSAP */}
          <h1
            ref={headlineRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          />

          {/* Subheadline with GSAP */}
          <p
            ref={subheadlineRef}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          />

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground gaming-glow group"
            >
              Join Now
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => window.location.href = "/community"}
              size="lg"
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            >
              Explore Community
            </Button>
          </motion.div>

          {/* Stats */}
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-border"
          >
            {[
              { value: "500+", label: "Members" },
              { value: "50+", label: "Events" },
              { value: "20+", label: "Tournaments" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-4xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div> */}
        </motion.div>
      </div>
    </section>
  );
}
