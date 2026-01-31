import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Flag, Trophy, Users, Star, Rocket } from "lucide-react";

const milestones = [
  {
    year: "2019",
    title: "The Beginning",
    description: "SLIIT Gaming Community was founded with just 50 passionate gamers",
    icon: Flag,
  },
  {
    year: "2020",
    title: "First Major Tournament",
    description: "Hosted our first inter-university esports championship",
    icon: Trophy,
  },
  {
    year: "2021",
    title: "Community Expansion",
    description: "Grew to 200+ members and established multiple gaming divisions",
    icon: Users,
  },
  {
    year: "2022",
    title: "National Recognition",
    description: "Became the leading university gaming community in Sri Lanka",
    icon: Star,
  },
  {
    year: "2023",
    title: "New Heights",
    description: "500+ members, 50+ events, and partnerships with gaming brands",
    icon: Rocket,
  },
];

export function JourneySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Our Story
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Our Journey
          </h2>
          <div className="w-24 h-1 bg-gaming-gradient mx-auto rounded-full" />
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Center Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-gaming-blue to-gaming-purple md:-translate-x-1/2" />

          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative flex items-center gap-8 mb-12 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary md:-translate-x-1/2 z-10 ring-4 ring-background" />

              {/* Content Card */}
              <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="gaming-card p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gaming-gradient flex items-center justify-center">
                      <milestone.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="text-2xl font-bold text-gaming-gradient">
                      {milestone.year}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </motion.div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block md:w-5/12" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
