import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Target, Shield } from "lucide-react";
import { useTeam } from "@/hooks/use-team";
import { Skeleton } from "@/components/ui/skeleton";

export default function About() {
  const { data: team, isLoading } = useTeam();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="pt-24 min-h-screen pb-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="max-w-4xl mb-16"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Badge className="bg-secondary text-secondary-foreground mb-4">
            À Propos
          </Badge>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-secondary">
            Notre Histoire & Nos Valeurs
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            BEGEC-TRAVAUX-GIE est une entreprise guinéenne indépendante opérant
            dans le secteur du BTP (Bâtiment et Travaux Publics). Notre
            entreprise est formée par deux entreprises guinéennes, à savoir EGEC
            et BELCO SARL sous le statut de Groupement d’Intérêt économique.
          </p>
        </motion.div>

        {/* Content Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="absolute -inset-4 bg-secondary/20 rounded-2xl transform rotate-3"></div>
            {/* Construction team meeting */}
            <motion.img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop"
              alt="Construction team meeting"
              className="relative rounded-2xl shadow-2xl w-full h-[360px] sm:h-[420px] lg:h-[520px] object-cover"
              animate={shouldReduceMotion ? undefined : { y: [0, -12, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-heading font-bold">
              Une Expertise Reconnue
            </h2>
            <p className="text-muted-foreground">
              Le siège principal de notre Entreprise se trouve à Conakry avec
              plus d’une centaine d’engins des travaux publics et une flotte de
              camions très performants, en plus d’une base à Kouriya (Kaaka)
              abritant nos installations de production composées d’une station
              de concassage, deux centrales de production de béton bitumineux,
              nécessaires à la réalisation de tous les travaux de construction
              en BTP.
            </p>
            <p className="text-muted-foreground">
              Nous avons réalisé un nombre considérable de projets tels que des
              travaux d'assainissement, d'adduction d'eau potable, de
              construction de bâtiments, d'ouvrages d'art, de routes en terre et
              de routes bitumées à Conakry et dans différentes régions du pays,
              tels que Coyah, Forécariah, Boffa, Télémélé, Kindia, Mamou,
              Guéckédou, etc.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                "Équipements Modernes",
                "Équipe Certifiée",
                "Respect de l'Environnement",
                "Délais Garantis",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <CheckCircle className="w-5 h-5 text-secondary" />
                  <span className="font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Timeline — Notre Parcours */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <Badge className="bg-secondary text-secondary-foreground mb-4">
              Notre Parcours
            </Badge>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary">
              Les Étapes Clés
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Animated vertical line */}
            <motion.div
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2 origin-top"
              style={{
                background:
                  "linear-gradient(180deg, #1F3C88, #2d57c7, #1F3C88)",
              }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />

            {[
              {
                year: "2015",
                title: "Création de BEGEC TP",
                desc: "Naissance de l'entreprise avec une vision claire : l'excellence dans les travaux publics en Guinée.",
              },
              {
                year: "2018",
                title: "Premier Grand Chantier",
                desc: "Réalisation de notre premier projet d'infrastructure d'envergure, posant les bases de notre réputation.",
              },
              {
                year: "2021",
                title: "Expansion Régionale",
                desc: "Renforcement de notre flotte d'équipements et extension de nos activités à de nouvelles régions.",
              },
              {
                year: "2025",
                title: "Nouveaux Marchés",
                desc: "Diversification vers les grands projets publics et partenariats avec des acteurs internationaux.",
              },
            ].map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.year}
                  className={`relative flex items-center mb-12 last:mb-0 pl-12 md:pl-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {/* Dot */}
                  <motion.div
                    className="absolute left-4 md:left-1/2 w-5 h-5 rounded-full border-4 border-background md:-translate-x-1/2 z-10"
                    style={{ background: "#F27100" }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: 0.4,
                      type: "spring",
                      stiffness: 300,
                    }}
                  />

                  {/* Content card */}
                  <div
                    className={`md:w-1/2 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}
                  >
                    <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                      <CardContent className="p-6">
                        <div className="text-3xl font-heading font-extrabold text-secondary mb-2">
                          {step.year}
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-primary">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {step.desc}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Values Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Shield className="w-12 h-12 text-secondary" />,
              title: "Fiabilité",
              desc: "Nous tenons nos promesses. La transparence et l'intégrité guident chacune de nos interactions.",
            },
            {
              icon: <Target className="w-12 h-12 text-secondary" />,
              title: "Précision",
              desc: "Chaque centimètre compte. Nous travaillons avec rigueur pour des résultats durables et conformes.",
            },
            {
              icon: <Users className="w-12 h-12 text-secondary" />,
              title: "Partenariat",
              desc: "Plus qu'un prestataire, nous sommes votre partenaire. Votre satisfaction est notre seule mesure de succès.",
            },
          ].map((val, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-muted/30 border-none hover:bg-white hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-primary/5 p-4 rounded-full w-fit mx-auto mb-6">
                    {val.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{val.title}</h3>
                  <p className="text-muted-foreground">{val.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Team Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <Badge className="bg-secondary text-secondary-foreground mb-4">
              Notre Équipe
            </Badge>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary">
              Les Experts du Terrain
            </h2>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-64 w-full rounded-xl" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team?.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300 border-none bg-muted/30 group">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-6 text-center relative">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-1 bg-secondary rounded-full" />
                      <h3 className="text-xl font-bold mb-1 text-primary">
                        {member.name}
                      </h3>
                      <p className="text-sm font-bold text-secondary uppercase tracking-wider mb-4">
                        {member.role}
                      </p>
                      <p className="text-muted-foreground text-sm line-clamp-3">
                        {member.bio}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
