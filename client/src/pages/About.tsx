import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Target, Shield } from "lucide-react";

export default function About() {
  return (
    <div className="pt-24 min-h-screen pb-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mb-16">
          <Badge className="bg-secondary text-secondary-foreground mb-4">À Propos</Badge>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-primary">
            Notre Histoire & Nos Valeurs
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Depuis plus de 15 ans, BEGEC TP s'engage à fournir des services de travaux publics d'excellence, 
            en alliant innovation technique et respect des délais.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative">
            <div className="absolute -inset-4 bg-secondary/20 rounded-2xl transform rotate-3"></div>
            {/* Construction team meeting */}
            <img 
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop" 
              alt="Construction team meeting" 
              className="relative rounded-2xl shadow-2xl w-full object-cover aspect-video"
            />
          </div>
          
          <div className="space-y-8">
            <h2 className="text-3xl font-heading font-bold">Une Expertise Reconnue</h2>
            <p className="text-muted-foreground">
              Né de la passion pour le bâtiment et les travaux publics, BEGEC TP a grandi pour devenir 
              un acteur incontournable dans la région. Notre force réside dans notre capacité à gérer 
              des projets complexes tout en maintenant une proximité forte avec nos clients.
            </p>
            <p className="text-muted-foreground">
              Que ce soit pour du terrassement, de l'assainissement ou des aménagements extérieurs, 
              nous mettons un point d'honneur à utiliser des équipements de pointe et des méthodes durables.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                "Équipements Modernes",
                "Équipe Certifiée",
                "Respect de l'Environnement",
                "Délais Garantis"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-secondary" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Shield className="w-12 h-12 text-secondary" />,
              title: "Fiabilité",
              desc: "Nous tenons nos promesses. La transparence et l'intégrité guident chacune de nos interactions."
            },
            {
              icon: <Target className="w-12 h-12 text-secondary" />,
              title: "Précision",
              desc: "Chaque centimètre compte. Nous travaillons avec rigueur pour des résultats durables et conformes."
            },
            {
              icon: <Users className="w-12 h-12 text-secondary" />,
              title: "Partenariat",
              desc: "Plus qu'un prestataire, nous sommes votre partenaire. Votre satisfaction est notre seule mesure de succès."
            }
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
      </div>
    </div>
  );
}
