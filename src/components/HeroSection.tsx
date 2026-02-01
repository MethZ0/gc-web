import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

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
    size: { base: 60, md: 80, lg: 100 },
    position: { top: "15%", left: "8%" },
    animation: { x: [0, 15, 0], y: [0, -20, 0] },
    duration: 8,
  },
  {
    id: "cross",
    path: "M35,0 L65,0 L65,35 L100,35 L100,65 L65,65 L65,100 L35,100 L35,65 L0,65 L0,35 L35,35 Z",
    viewBox: "0 0 100 100",
    size: { base: 50, md: 70, lg: 90 },
    position: { top: "25%", right: "10%" },
    animation: { x: [0, -20, 0], y: [0, 15, 0] },
    duration: 10,
  },
  {
    id: "triangle",
    path: "M50,5 L95,90 L5,90 Z",
    viewBox: "0 0 100 100",
    size: { base: 55, md: 75, lg: 95 },
    position: { bottom: "30%", left: "5%" },
    animation: { x: [0, 10, 0], y: [0, 12, 0] },
    duration: 9,
  },
  {
    id: "square",
    path: "M10,10 L90,10 L90,90 L10,90 Z",
    viewBox: "0 0 100 100",
    size: { base: 45, md: 65, lg: 85 },
    position: { bottom: "25%", right: "8%" },
    animation: { x: [0, -12, 0], y: [0, -18, 0] },
    duration: 11,
  },
  {
    id: "trigger-left",
    path: "M10,50 Q10,10 50,10 Q90,10 90,50 L80,90 Q50,95 20,90 Z",
    viewBox: "0 0 100 100",
    size: { base: 40, md: 55, lg: 70 },
    position: { top: "45%", left: "12%" },
    animation: { x: [0, 8, 0], y: [0, -10, 0] },
    duration: 12,
  },
  {
    id: "trigger-right",
    path: "M10,50 Q10,10 50,10 Q90,10 90,50 L80,90 Q50,95 20,90 Z",
    viewBox: "0 0 100 100",
    size: { base: 40, md: 55, lg: 70 },
    position: { top: "40%", right: "12%" },
    animation: { x: [0, -8, 0], y: [0, 12, 0] },
    duration: 13,
  },
];

interface FloatingSymbolProps {
  symbol: typeof controllerSymbols[0];
  currentImage: string;
  imageKey: number;
}

function FloatingSymbol({ symbol, currentImage, imageKey }: FloatingSymbolProps) {
  const clipId = `clip-${symbol.id}`;
  
  return (
    <motion.div
      className="absolute z-20 pointer-events-none"
      style={{
        ...symbol.position,
        width: `clamp(${symbol.size.base}px, 8vw, ${symbol.size.lg}px)`,
        height: `clamp(${symbol.size.base}px, 8vw, ${symbol.size.lg}px)`,
      }}
      animate={symbol.animation}
      transition={{
        duration: symbol.duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Glow effect */}
      <div 
        className="absolute inset-0 rounded-full opacity-40 blur-xl"
        style={{
          background: "hsl(var(--primary) / 0.3)",
        }}
      />
      
      {/* Glassmorphism container */}
      <div className="relative w-full h-full">
        {/* Glass border/outline */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox={symbol.viewBox}
          style={{ filter: "drop-shadow(0 0 8px hsl(var(--primary) / 0.4))" }}
        >
          <defs>
            <clipPath id={clipId}>
              <path d={symbol.path} />
            </clipPath>
          </defs>
          
          {/* Outer glow stroke */}
          <path
            d={symbol.path}
            fill="none"
            stroke="hsl(var(--primary) / 0.5)"
            strokeWidth="3"
            className="dark:stroke-primary/40"
          />
        </svg>
        
        {/* Masked image container */}
        <div 
          className="absolute inset-0 overflow-hidden backdrop-blur-sm"
          style={{ 
            clipPath: `path('${symbol.path}')`,
          }}
        >
          {/* Glass background */}
          <div className="absolute inset-0 bg-background/20 dark:bg-background/30" />
          
          {/* Carousel image with fade transition */}
          <AnimatePresence mode="wait">
            <motion.img
              key={imageKey}
              src={currentImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover scale-150"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </AnimatePresence>
          
          {/* Glass overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/10" />
        </div>
        
        {/* Inner highlight */}
        <svg
          className="absolute inset-0 w-full h-full opacity-60"
          viewBox={symbol.viewBox}
        >
          <path
            d={symbol.path}
            fill="none"
            stroke="hsl(var(--background) / 0.3)"
            strokeWidth="1"
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

  const currentImage = heroImages[selectedIndex].src;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        <div ref={emblaRef} className="h-full overflow-hidden">
          <div className="flex h-full">
            {heroImages.map((image, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0 h-full relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover opacity-50 dark:opacity-30"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Floating Controller Symbol Elements */}
      {controllerSymbols.map((symbol) => (
        <FloatingSymbol
          key={symbol.id}
          symbol={symbol}
          currentImage={currentImage}
          imageKey={selectedIndex}
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
      <div className="section-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gaming-blue-light border border-primary/20 mb-8"
          >
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">500+ Active Members</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            Level Up Your
            <span className="block text-accent">Gaming Journey</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Join Sri Lanka's premier university gaming community. Compete, connect, 
            and create legendary moments with fellow gamers at SLIIT.
          </motion.p>

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
              size="lg"
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            >
              Explore Community
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
