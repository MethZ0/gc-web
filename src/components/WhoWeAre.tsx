import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Gamepad2, Heart, Zap } from "lucide-react";

export function WhoWeAre() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 md:py-28">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          {/* <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            About Us
          </span> */}
          <h2 className="text-accent text-3xl md:text-5xl font-bold mt-4 mb-6">
            Who We Are?
          </h2>
          <div className="w-24 h-1 bg-gaming-gradient mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              The <strong className=" text-primary">SLIIT Gaming Community</strong> is the official gaming 
              society of Sri Lanka Institute of Information Technology. We're a passionate collective of 
              gamers, esports enthusiasts, and tech lovers united by our love for gaming culture.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Founded with a vision to create the most vibrant gaming ecosystem in Sri Lankan 
              universities, we provide a platform where students can compete, learn, and grow 
              together through the power of gaming.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you're a casual player or an aspiring esports professional, our community 
              welcomes you with open arms. Join us in celebrating gaming excellence!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 gap-6"
          >
            {[
              {
                icon: Gamepad2,
                title: "Competitive Gaming",
                description: "Regular tournaments and competitive leagues across multiple titles",
              },
              {
                icon: Heart,
                title: "Inclusive Community",
                description: "A welcoming space for gamers of all skill levels and backgrounds",
              },
              {
                icon: Zap,
                title: "Skill Development",
                description: "Workshops, coaching sessions, and resources to level up your game",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="gaming-card p-6 flex gap-4"
              >
                <div className="w-12 h-12 rounded-lg bg-gaming-gradient flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
