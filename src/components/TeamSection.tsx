import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Linkedin, Instagram, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  ign: string;
}

const currentCommittee: TeamMember[] = [
  {
    name: "Sahan Perera",
    role: "President",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
    ign: "SahanProGamer"
  },
  {
    name: "Kavindi Silva",
    role: "Vice President",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces",
    ign: "KavindiGamer"
  },
  {
    name: "Ravindu Fernando",
    role: "Secretary",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces",
    ign: "RavinduFPS"
  },
  {
    name: "Nethmi Jayawardena",
    role: "Treasurer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces",
    ign: "NethmiPlays"
  },
  {
    name: "Isuru Bandara",
    role: "Editor",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces",
    ign: "IsuruTheChamp"
  },
  {
    name: "Dilini Rathnayake",
    role: "Main Organizer",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces",
    ign: "DiliniStreams"
  },
  {
    name: "Kasun Wickrama",
    role: "Main Coordinator",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=faces",
    ign: "KasunTechie"
  },
];

const previousCommittee: TeamMember[] = [
  {
    name: "Sahan Perera",
    role: "President",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
    ign: "SahanProGamer"
  },
  {
    name: "Kavindi Silva",
    role: "Vice President",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces",
    ign: "KavindiGamer"
  },
  {
    name: "Ravindu Fernando",
    role: "Secretary",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces",
    ign: "RavinduFPS"
  },
  {
    name: "Nethmi Jayawardena",
    role: "Treasurer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces",
    ign: "NethmiPlays"
  },
  {
    name: "Isuru Bandara",
    role: "Editor",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces",
    ign: "IsuruTheChamp"
  },
  {
    name: "Dilini Rathnayake",
    role: "Main Organizer",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces",
    ign: "DiliniStreams"
  },
  {
    name: "Kasun Wickrama",
    role: "Main Coordinator",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=faces",
    ign: "KasunTechie"
  },
];

function TeamCard({ member, index, isInView }: { member: TeamMember; index: number; isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="gaming-card p-8 text-center group"
    >
      <div className="relative w-32 h-32 mx-auto mb-5">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full rounded-full object-cover border-2 border-primary/20 group-hover:border-primary transition-colors"
        />
        <div className="absolute inset-0 rounded-full bg-gaming-gradient opacity-0 group-hover:opacity-20 transition-opacity" />
      </div>
      <h3 className="font-semibold text-xl mb-1">{member.name}</h3>
      <p className="text-sm text-primary mb-2 font-medium">{member.role}</p>
      <p className="text-xs text-muted-foreground italic">IGN: {member.ign}</p>
    </motion.div>
  );
}

export function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showPreviousTeam, setShowPreviousTeam] = useState(false);

  return (
    <section id="team" className="py-15 md:py-20 bg-muted/30">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Our Team
          </h2>
          <p className="text-primary text-lg">
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
            Executive Committee 2025/2026
          </motion.h3>
          <div className="flex flex-wrap justify-center gap-6">
            {currentCommittee.map((member, index) => (
              <div key={member.name} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]">
                <TeamCard member={member} index={index} isInView={isInView} />
              </div>
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

        {/* Previous Team 2024/2025 */}
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
              Executive Committee 2024/2025
            </h3>
            <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
              {previousCommittee.map((member, index) => (
                <div key={member.name} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                  <TeamCard
                    member={member}
                    index={index}
                    isInView={showPreviousTeam}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
