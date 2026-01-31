import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const events = [
  {
    title: "SLIIT Esports Championship 2024",
    date: "March 15-17, 2024",
    location: "SLIIT Main Campus",
    attendees: "200+",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
    category: "Tournament",
  },
  {
    title: "Valorant Campus League",
    date: "January 20, 2024",
    location: "Online",
    attendees: "150+",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop",
    category: "League",
  },
  {
    title: "Gaming Workshop Series",
    date: "February 5, 2024",
    location: "SLIIT Auditorium",
    attendees: "100+",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
    category: "Workshop",
  },
  {
    title: "Mobile Gaming Fest",
    date: "December 10, 2023",
    location: "SLIIT Main Campus",
    attendees: "300+",
    image: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=400&h=300&fit=crop",
    category: "Festival",
  },
  {
    title: "FIFA Tournament 2023",
    date: "November 25, 2023",
    location: "Gaming Lab",
    attendees: "80+",
    image: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=400&h=300&fit=crop",
    category: "Tournament",
  },
  {
    title: "LAN Party Night",
    date: "October 15, 2023",
    location: "SLIIT Main Campus",
    attendees: "120+",
    image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=400&h=300&fit=crop",
    category: "Social",
  },
];

export function EventsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="events" className="py-24 md:py-32 bg-muted/30">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Events
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Event Highlights
          </h2>
          <p className="text-muted-foreground text-lg">
            From intense tournaments to casual meetups, we host events that bring gamers together.
          </p>
          <div className="w-24 h-1 bg-gaming-gradient mx-auto rounded-full mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="gaming-card overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                  {event.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    {event.attendees} Attendees
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" className="border-primary/30 hover:bg-primary/10">
            View All Events
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
