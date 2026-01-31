import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Linkedin, Instagram, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  instagram?: string;
}

const team2024: TeamMember[] = [
  {
    name: "Sahan Perera",
    role: "President",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
  },
  {
    name: "Kavindi Silva",
    role: "Vice President",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces",
  },
  {
    name: "Ravindu Fernando",
    role: "Secretary",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces",
  },
  {
    name: "Nethmi Jayawardena",
    role: "Treasurer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces",
  },
  {
    name: "Isuru Bandara",
    role: "Tournament Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces",
  },
  {
    name: "Dilini Rathnayake",
    role: "Marketing Lead",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces",
  },
  {
    name: "Kasun Wickrama",
    role: "Tech Lead",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=faces",
  },
  {
    name: "Sachini Mendis",
    role: "Events Coordinator",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces",
  },
];

const team2023: TeamMember[] = [
  {
    name: "Dinuka Rajapakse",
    role: "President",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=faces",
  },
  {
    name: "Hashini Gunawardena",
    role: "Vice President",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=faces",
  },
  {
    name: "Tharindu Peris",
    role: "Secretary",
    image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop&crop=faces",
  },
  {
    name: "Amaya Fernando",
    role: "Treasurer",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=faces",
  },
  {
    name: "Pasan Amarasekara",
    role: "Tournament Director",
    image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=200&h=200&fit=crop&crop=faces",
  },
  {
    name: "Nirasha Dias",
    role: "Marketing Lead",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=faces",
  },
];

function TeamCard({ member, index, isInView }: { member: TeamMember; index: number; isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="gaming-card p-6 text-center group"
    >
      <div className="relative w-24 h-24 mx-auto mb-4">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full rounded-full object-cover border-2 border-primary/20 group-hover:border-primary transition-colors"
        />
        <div className="absolute inset-0 rounded-full bg-gaming-gradient opacity-0 group-hover:opacity-20 transition-opacity" />
      </div>
      <h3 className="font-semibold text-lg">{member.name}</h3>
      <p className="text-sm text-primary mb-3">{member.role}</p>
      <div className="flex justify-center gap-2">
        <button className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
          <Linkedin className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
          <Instagram className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

export function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showPreviousTeam, setShowPreviousTeam] = useState(false);

  return (
    <section id="team" className="py-24 md:py-32 bg-muted/30">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Our Team
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Meet the Leaders
          </h2>
          <p className="text-muted-foreground text-lg">
            The passionate individuals driving our community forward.
          </p>
          <div className="w-24 h-1 bg-gaming-gradient mx-auto rounded-full mt-6" />
        </motion.div>

        {/* Current Team 2024/2025 */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl font-bold text-center mb-10"
          >
            Executive Committee 2024/2025
          </motion.h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team2024.map((member, index) => (
              <TeamCard key={member.name} member={member} index={index} isInView={isInView} />
            ))}
          </div>
        </div>

        {/* Previous Team Toggle */}
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowPreviousTeam(!showPreviousTeam)}
            className="border-primary/30 hover:bg-primary/10"
          >
            {showPreviousTeam ? "Hide" : "View"} Previous Committee
            <ChevronDown
              className={`ml-2 w-4 h-4 transition-transform ${showPreviousTeam ? "rotate-180" : ""}`}
            />
          </Button>
        </div>

        {/* Previous Team 2023/2024 */}
        <motion.div
          initial={false}
          animate={{
            height: showPreviousTeam ? "auto" : 0,
            opacity: showPreviousTeam ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden"
        >
          <div className="pt-16">
            <h3 className="text-2xl font-bold text-center mb-10">
              Executive Committee 2023/2024
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {team2023.map((member, index) => (
                <TeamCard
                  key={member.name}
                  member={member}
                  index={index}
                  isInView={showPreviousTeam}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
