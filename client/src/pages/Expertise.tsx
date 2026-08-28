import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Drill,
  Pickaxe,
  Tractor,
  HardHat,
  Droplets,
  Ruler,
} from "lucide-react";
import terrassementImage from "@assets/terrassement_1782409837264.jpg";
import voirieImage from "@assets/voirie_1782409834071.jpg";
import assainissementImage from "@assets/assainissement_1782409839634.jpg";
import amenagementsImage from "@assets/Aménagements_1782409831052.jpg";

const services = [
  {
    id: "terrassement",
    label: "Terrassement",
    icon: <Tractor className="w-5 h-5" />,
    title: "Terrassement & Nivellement",
    desc: "La première étape cruciale de tout projet de construction. Nous préparons votre terrain avec précision.",
    details: [
      "Nivellement de terrain",
      "Fouilles en tranchées",
      "Décapage de terre végétale",
      "Création de plateformes",
      "Évacuation de gravats",
    ],
    image: terrassementImage,
  },
  {
    id: "vrd",
    label: "VRD",
    icon: <Pickaxe className="w-5 h-5" />,
    title: "Voirie & Réseaux Divers",
    desc: "Raccordement complet aux réseaux et aménagement des accès pour viabiliser vos terrains.",
    details: [
      "Raccordement eau, électricité, gaz, télécom",
      "Pose de bordures et caniveaux",
      "Création de voiries d'accès",
      "Enfouissement de réseaux",
      "Mise aux normes",
    ],
    image: voirieImage,
  },
  {
    id: "assainissement",
    label: "Assainissement",
    icon: <Droplets className="w-5 h-5" />,
    title: "Assainissement Individuel & Collectif",
    desc: "Solutions durables pour la gestion des eaux usées et pluviales, respectueuses de l'environnement.",
    details: [
      "Installation de micro-stations",
      "Fosses toutes eaux",
      "Raccordement au tout-à-l'égout",
      "Drainage des sols",
      "Gestion des eaux pluviales",
    ],
    image: assainissementImage,
  },
  {
    id: "amenagement",
    label: "Aménagements",
    icon: <Ruler className="w-5 h-5" />,
    title: "Aménagements Extérieurs",
    desc: "Finitions esthétiques et fonctionnelles pour valoriser vos espaces extérieurs.",
    details: [
      "Enrobés à chaud",
      "Pavage et dallage",
      "Création d'allées de jardin",
      "Murs de soutènement",
      "Clôtures et portails",
    ],
    image: amenagementsImage,
  },
];

export default function Expertise() {
  return (
    <div className="pt-24 min-h-screen pb-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Badge className="bg-secondary text-secondary-foreground mb-4">
            Nos Services
          </Badge>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-primary">
            Domaines d'Intervention
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Une expertise technique complète pour accompagner vos projets du sol
            au plafond.
          </p>
        </motion.div>

        <Tabs defaultValue="terrassement" className="max-w-5xl mx-auto">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 h-auto p-1 bg-muted/50 rounded-xl mb-12">
            {services.map((service) => (
              <TabsTrigger
                key={service.id}
                value={service.id}
                className="py-4 gap-2 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg transition-all"
              >
                {service.icon}
                <span className="font-semibold">{service.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {services.map((service) => (
            <TabsContent key={service.id} value={service.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="overflow-hidden border-none shadow-xl">
                  <div className="grid md:grid-cols-2">
                    <div className="relative h-64 md:h-auto">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-8 md:p-12 bg-white dark:bg-card">
                      <div className="mb-6 p-3 bg-primary/5 w-fit rounded-lg text-primary">
                        {service.icon}
                      </div>
                      <h2 className="text-3xl font-heading font-bold mb-4">
                        {service.title}
                      </h2>
                      <p className="text-muted-foreground text-lg mb-8">
                        {service.desc}
                      </p>

                      <div className="space-y-4 mb-10">
                        {service.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-secondary" />
                            <span className="font-medium text-black">
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>

                      <Link href="/devis">
                        <Button className="w-full md:w-auto bg-primary text-white hover:bg-primary/90 font-bold">
                          Demander un devis pour ce service
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
