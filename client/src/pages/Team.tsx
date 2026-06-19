import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTeam } from "@/hooks/use-team";
import type { TeamMember } from "@shared/schema";
import { X, Briefcase, User } from "lucide-react";

export default function Team() {
  const { data: team, isLoading } = useTeam();
  const [selected, setSelected] = useState<TeamMember | null>(null);

  return (
    <div className="pt-24 min-h-screen pb-24 bg-background">

      {/* Hero */}
      <section className="relative py-20 overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-secondary rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-secondary text-secondary-foreground mb-6 text-sm px-4 py-1">
              Notre Équipe
            </Badge>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-6 leading-tight">
              Les Hommes &amp; Femmes<br />
              <span className="text-secondary">derrière BEGEC TP</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Une équipe de professionnels expérimentés, unis par la passion du bâtiment et l'exigence de qualité sur chaque chantier.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-muted/40 border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto text-center">
            {[
              { value: team?.length ?? "—", label: "Membres de direction" },
              { value: "15+", label: "Années d'expérience" },
              { value: "100+", label: "Projets livrés" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-extrabold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading
            ? [1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <div key={n} className="space-y-4">
                  <Skeleton className="aspect-[3/4] w-full rounded-2xl" />
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))
            : team?.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: (index % 4) * 0.08, duration: 0.5 }}
                >
                  <Card
                    className="overflow-hidden cursor-pointer group border border-border/50 hover:border-primary/40 hover:shadow-xl transition-all duration-300 bg-card"
                    onClick={() => setSelected(member)}
                  >
                    {/* Photo */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                      {/* Hover CTA */}
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <span className="bg-secondary text-secondary-foreground text-xs font-bold px-4 py-2 rounded-full shadow">
                          Voir le profil
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <CardContent className="p-5">
                      <div className="w-8 h-1 bg-secondary rounded-full mb-3" />
                      <h3 className="font-bold text-base text-foreground leading-snug">{member.name}</h3>
                      <p className="text-xs font-semibold text-primary uppercase tracking-wider mt-1">{member.role}</p>
                      {member.bio && (
                        <p className="text-muted-foreground text-xs mt-3 line-clamp-2">{member.bio}</p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
        </div>
      </section>

      {/* Profile Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-card rounded-2xl shadow-2xl overflow-hidden max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header photo */}
              <div className="relative h-72 bg-muted">
                <img
                  src={selected.imageUrl}
                  alt={selected.name}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-5 left-6 right-6">
                  <h2 className="text-2xl font-extrabold text-white leading-tight">{selected.name}</h2>
                  <p className="text-secondary font-semibold text-sm uppercase tracking-widest mt-1">{selected.role}</p>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5">
                {selected.bio && (
                  <div className="flex gap-3">
                    <User className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Biographie</p>
                      <p className="text-foreground text-sm leading-relaxed">{selected.bio}</p>
                    </div>
                  </div>
                )}
                <div className="flex gap-3">
                  <Briefcase className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Poste</p>
                    <p className="text-foreground text-sm font-semibold">{selected.role}</p>
                  </div>
                </div>
                <div className="pt-2 border-t border-border">
                  <Badge className="bg-primary/10 text-primary border-primary/20">BEGEC TP</Badge>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
