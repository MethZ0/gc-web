import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  event: string;
  date: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop",
    title: "Championship Finals",
    event: "SLIIT Esports Championship 2024",
    date: "March 2024",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop",
    title: "Gaming Setup Arena",
    event: "LAN Party Night",
    date: "October 2023",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=600&fit=crop",
    title: "Team Competition",
    event: "Valorant Campus League",
    date: "January 2024",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1552820728-8b83bb6b2b0f?w=800&h=600&fit=crop",
    title: "Award Ceremony",
    event: "Annual Gaming Awards",
    date: "December 2023",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=800&h=600&fit=crop",
    title: "Mobile Gaming Zone",
    event: "Mobile Gaming Fest",
    date: "December 2023",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&h=600&fit=crop",
    title: "Community Meetup",
    event: "Gamer's Night Out",
    date: "November 2023",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    title: "Workshop Session",
    event: "Pro Gaming Workshop",
    date: "February 2024",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&h=600&fit=crop",
    title: "Streaming Setup",
    event: "Content Creator Meetup",
    date: "September 2023",
  },
];

export function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (ref.current) {
      // Heading fade-in
      gsap.fromTo(
        ref.current.querySelector(".gallery-heading"),
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
      // Staggered grid
      gsap.fromTo(
        ref.current.querySelectorAll(".gallery-card"),
        { opacity: 0, scale: 0.92, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, [isInView]);

  const openLightbox = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

  const goToNext = () => {
    const newIndex = currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
  };

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="section-container" ref={ref}>
        <div className="max-w-3xl mx-auto text-center mb-16 gallery-heading">
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Moments We've Captured
          </h2>
          <p className="text-primary text-lg">
            Relive the excitement from our past events and tournaments.
          </p>
          <div className="w-24 h-1 bg-gaming-gradient mx-auto rounded-full mt-6" />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className={`relative overflow-hidden rounded-xl cursor-pointer group gallery-card ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
              onClick={() => openLightbox(image, index)}
            >
              <div className={`relative ${index === 0 ? "aspect-square" : "aspect-[4/3]"}`}>
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Zoom Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <ZoomIn className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-primary-foreground font-semibold text-sm md:text-base">
                    {image.title}
                  </h3>
                  <p className="text-primary-foreground/80 text-xs md:text-sm">
                    {image.event}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-primary/30 backdrop-blur-md flex items-center justify-center"
              onClick={closeLightbox}
              onKeyDown={handleKeyDown}
              tabIndex={0}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-background/20 hover:bg-background/40 flex items-center justify-center transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6 text-primary-foreground" />
              </button>

              {/* Previous Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-4 z-10 w-12 h-12 rounded-full bg-background/20 hover:bg-background/40 flex items-center justify-center transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-primary-foreground" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-4 z-10 w-12 h-12 rounded-full bg-background/20 hover:bg-background/40 flex items-center justify-center transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-primary-foreground" />
              </button>

              {/* Image Container */}
              <motion.div
                key={selectedImage.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-5xl max-h-[85vh] mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
                />
                
                {/* Image Info */}
                <div className="absolute -bottom-15 left-0 right-0 text-center">
                  <h3 className="text-accent font-semibold text-lg">
                    {selectedImage.title}
                  </h3>
                  <p className="text-accent/80 text-sm">
                    {selectedImage.event} • {selectedImage.date}
                  </p>
                  <p className="text-accent/70 text-xs mt-2">
                    {currentIndex + 1} / {galleryImages.length}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
