import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Eye, Compass, CheckCircle } from "lucide-react";

const strategies = [
  "Foster competitive excellence through structured tournaments",
  "Build strong industry partnerships and sponsorships",
  "Create pathways for gaming careers and esports",
  "Develop inclusive programs for all skill levels",
  "Leverage technology for community engagement",
];

export function AboutSection() {
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
            About Us
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Our Foundation
          </h2>
          <div className="w-24 h-1 bg-gaming-gradient mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="gaming-card p-8"
          >
            <div className="w-14 h-14 rounded-xl bg-gaming-gradient flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              To cultivate a thriving gaming ecosystem at SLIIT that empowers students 
              to excel in competitive gaming, develop valuable skills, and build 
              meaningful connections through our shared passion for gaming.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="gaming-card p-8"
          >
            <div className="w-14 h-14 rounded-xl bg-gaming-gradient flex items-center justify-center mb-6">
              <Eye className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              To become the leading university gaming community in South Asia, 
              recognized for producing exceptional esports talent, innovative 
              gaming initiatives, and a culture of excellence that inspires 
              the next generation of gamers.
            </p>
          </motion.div>

          {/* Strategy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="gaming-card p-8"
          >
            <div className="w-14 h-14 rounded-xl bg-gaming-gradient flex items-center justify-center mb-6">
              <Compass className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Strategy</h3>
            <ul className="space-y-3">
              {strategies.map((strategy, index) => (
                <li key={index} className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">{strategy}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
