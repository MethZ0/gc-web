import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Trophy,
  Users,
  Gamepad2,
  BookOpen,
  Ticket,
  Network,
  Gift,
  Mic2,
} from "lucide-react";

const benefits = [
  {
    icon: Trophy,
    title: "Exclusive Tournaments",
    description: "Participate in members-only gaming tournaments with amazing prizes",
  },
  {
    icon: Users,
    title: "Networking",
    description: "Connect with fellow gamers, industry professionals, and sponsors",
  },
  {
    icon: Gamepad2,
    title: "Gaming Resources",
    description: "Access to gaming labs, equipment, and practice facilities",
  },
  {
    icon: BookOpen,
    title: "Workshops & Training",
    description: "Learn from pro players and improve your skills through workshops",
  },
  {
    icon: Ticket,
    title: "Event Access",
    description: "Priority access to gaming events, launches, and meetups",
  },
  {
    icon: Network,
    title: "Career Opportunities",
    description: "Explore careers in esports, game development, and streaming",
  },
  {
    icon: Gift,
    title: "Member Perks",
    description: "Exclusive merchandise, discounts, and partner benefits",
  },
  {
    icon: Mic2,
    title: "Community Voice",
    description: "Shape the future of gaming at SLIIT with your ideas",
  },
];

export function BenefitsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="membership" className="py-20 md:py-28">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          {/* <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Membership
          </span> */}
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Benefits of Joining
          </h2>
          <p className="text-primary text-lg">
            Unlock exclusive perks and become part of Sri Lanka's most vibrant gaming community.
          </p>
          <div className="w-24 h-1 bg-gaming-gradient mx-auto rounded-full mt-6" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -8 }}
              className="gaming-card p-6 text-center group"
            >
              <div className="w-14 h-14 mx-auto rounded-xl bg-gaming-gradient flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                <benefit.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
