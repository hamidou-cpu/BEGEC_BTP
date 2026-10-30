import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { useProjects } from "@/hooks/use-projects";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  ArrowRight,
  Tractor,
  Pickaxe,
  Droplets,
  Ruler,
  ShieldCheck,
  Cpu,
  Layers,
  CheckCircle2,
  Gauge,
  Factory,
  Truck,
  Sparkles,
  Building2,
  HardHat,
  ChevronRight,
  Compass,
} from "lucide-react";

// ── Données Techniques des 4 Pôles d'Excellence ─────────────────────────────
const technicalServices = [
  {
    id: "batiment",
    label: "Bâtiment",
    shortTitle: "Bâtiments",
    icon: Building2,
    title: "Construction et Rénovation de Bâtiments",
    categoryKey: "Bâtiment",
    tagline: "Gros œuvre, modernisation et réhabilitation durable",
    desc: "Prise en charge complète de chantiers de construction neuve et de rénovation pour édifices résidentiels, tertiaires et industriels. Nous garantissons une solidité structurelle optimale et des finitions soignées.",
    metrics: [
      { label: "Typologies", value: "Résidentiel & Tertiaire" },
      { label: "Prestations", value: "Gros Œuvre & Rénovation" },
      { label: "Contrôle technique", value: "Normes CCTP / BAEL" },
    ],
    machinery: [
      "Grues et systèmes de levage grande hauteur",
      "Centrales à béton et camions malaxeurs",
      "Coffrages modulaires et échafaudages sécurisés",
      "Équipements de finition et maçonnerie mécanisée",
    ],
    details: [
      "Fondations spéciales, dalles et superstructures en béton armé",
      "Rénovation lourde et mise aux normes de bâtiments existants",
      "Maçonnerie générale, élévation de voiles et planchers",
      "Second œuvre, finitions et aménagements fonctionnels",
    ],
    image: "/construction et rennovation de batiment.jpg",
    complianceBadge: "Normes Eurocodes & BAEL 91",
  },
  {
    id: "ponts-chaussees",
    label: "Ponts & Chaussées",
    shortTitle: "Ponts & Chaussées",
    icon: Layers,
    title: "Construction de Ponts et Chaussées",
    categoryKey: "Ponts et Chaussées",
    tagline: "Infrastructures routières et ouvrages d'art durables",
    desc: "Conception, coulage et pose de revêtements pour routes bitumées, voiries urbaines, ponts-cadres et dalots de franchissement. Notre maîtrise des enrobés garantit une excellente résistance au trafic lourd.",
    metrics: [
      { label: "Ouvrages d'art", value: "Ponts & Dalots béton" },
      { label: "Revêtement", value: "Enrobés bitumineux à chaud" },
      { label: "Portance", value: "Conforme CCTG / Fasc. 62" },
    ],
    machinery: [
      "Finisseurs d'enrobés électroniques haute cadence",
      "Compacteurs tandem double bille acier et pneus lourds",
      "Pelles d'extraction et camions bennes 8x4 de forte charge",
      "Centrales industrielles d'enrobage et concassage (Kouriya)",
    ],
    details: [
      "Construction et réfection de routes nationales et voiries urbaines",
      "Édification de ponts-cadres et dalots de franchissement",
      "Application d'enrobés à chaud (BBSG, grave-bitume)",
      "Murs de soutènement, caniveaux d'accotement et bordures",
    ],
    image: "/construction_route_pont_et_chaussé.jpg",
    complianceBadge: "CCTG Fascicule 62 & Eurocode 2",
  },
  {
    id: "terrassement",
    label: "Terrassement",
    shortTitle: "Terrassement",
    icon: Tractor,
    title: "Terrassement & Nivellement de Grande Masse",
    categoryKey: "Terrassement",
    tagline: "Précision altimétrique et haut rendement de cubature",
    desc: "Travaux d'excavation à grande échelle, décapage de terrains, extraction rocheuse et nivellement de précision pour implanter des plateformes industrielles, minières ou résidentielles.",
    metrics: [
      { label: "Tolérance altimétrique", value: "±15 mm" },
      { label: "Capacité cubature", value: "Cadence industrielle continue" },
      { label: "Topographie", value: "Contrôle station totale & GNSS" },
    ],
    machinery: [
      "Bulldozers lourds (Caterpillar D8 / Komatsu D155)",
      "Pelles hydrauliques de production 20T à 45T",
      "Niveleuses de précision et scrapers lourds",
      "Compacteurs monocylindres vibrants à pied dameur",
    ],
    details: [
      "Décapage et stockage des terres végétales",
      "Terrassement en déblai / remblai équilibré",
      "Aménagement de plateformes logistiques et industrielles",
      "Fouilles en tranchées profondes et compactage contrôlé",
    ],
    image: "/terrassement.jpg",
    complianceBadge: "Norme NF P 94-093 / Proctor 98%",
  },
  {
    id: "assainissement-eau",
    label: "Assainissement & Eau",
    shortTitle: "Assainissement & Eau",
    icon: Droplets,
    title: "Construction Réseaux d'Assainissement et d'Eau Potable",
    categoryKey: "Assainissement",
    tagline: "Adduction d'eau potable et maîtrise des eaux pluviales",
    desc: "Pose et raccordement de canalisations d'adduction d'eau potable (AEP), collecteurs d'eaux pluviales et usées, et ouvrages de drainage pour assainir les espaces urbains et desservir les populations en eau saine.",
    metrics: [
      { label: "Diamètres posés", value: "Ø 100 à Ø 1600 mm" },
      { label: "Épreuves pression", value: "Contrôle hydraulique 100%" },
      { label: "Réseaux traités", value: "AEP, Pluvial & Eaux usées" },
    ],
    machinery: [
      "Pelles de tranchée et blindages modulaires de sécurité",
      "Postes de soudure PEHD par électrofusion",
      "Pompes d'assèchement et rabattement de nappe",
      "Niveaux laser d'alignement de canalisation",
    ],
    details: [
      "Canalisations d'adduction d'eau potable (AEP) fonte et PEHD",
      "Collecteurs gravitaires d'eaux usées et pluviales",
      "Caniveaux bétonnés à grille, dalles et regards de visite",
      "Ouvrages de décharge, bassins d'orage et stations de relevage",
    ],
    image: "/assainissement.jpg",
    complianceBadge: "CCTG Fascicules 70 et 71",
  },
];

// ── Étapes de la Méthodologie d'Ingénierie ──────────────────────────────────
const engineeringWorkflow = [
  {
    step: "01",
    phaseTag: "Phase 01 • Géométrie & Sols",
    title: "Reconnaissance & Géotechnique",
    subtitle: "Sondages in situ & Topographie de Précision",
    desc: "Relevé topographique par station totale et drone photogrammétrique. Carottage, essais de pénétration et classification géologique des sols (GTR).",
    icon: Compass,
    deliverable: "Rapport géotechnique & Relevés topographiques",
    keyTools: "Station totale • Drone GNSS • Pénétromètre",
    metric: "Précision ±5 mm",
  },
  {
    step: "02",
    phaseTag: "Phase 02 • Bureau d'Études",
    title: "Modélisation & Étude d'Exécution",
    subtitle: "MNT & Optimisation Déblais/Remblais",
    desc: "Calculs volumétriques par logiciel CAO/DAO. Dimensionnement hydraulique, conception des profils en long/travers et calage topographique rigoureux.",
    icon: Cpu,
    deliverable: "Modèle Numérique (MNT) & Plans d'exécution",
    keyTools: "Logiciels CAO/DAO • MNT & Cubatures • Stations totales",
    metric: "Équilibre Déblais/Remblais",
  },
  {
    step: "03",
    phaseTag: "Phase 03 • Production Chantier",
    title: "Exécution Mécanisée Lourde",
    subtitle: "Déploiement de la Flotte BEGEC",
    desc: "Mobilisation immédiate d'engins lourds adaptés aux cadences requises. Supervision rigoureuse par nos ingénieurs résidents et chefs de chantiers chevronnés.",
    icon: Tractor,
    deliverable: "Suivi d'avancement & Journal de chantier journalier",
    keyTools: "Bulldozers D8 • Pelles 30T • Niveleuses Caterpillar",
    metric: "Cadence industrielle continue",
  },
  {
    step: "04",
    phaseTag: "Phase 04 • Validation QHSE",
    title: "Contrôles In Situ & Réception",
    subtitle: "Tolérance Zéro & Essais Normalisés",
    desc: "Contrôles continus de compacité au pénétromètre dynamique, essais à la plaque Westergaard, épreuves de pression des réseaux et PV de conformité CCTP.",
    icon: ShieldCheck,
    deliverable: "PV de réception & Dossier des Ouvrages Exécutés (DOE)",
    keyTools: "Plaque Westergaard • Épreuves d'étanchéité • DOE",
    metric: "Conformité CCTG / NF 100%",
  },
];

// ── Atouts Technologiques ───────────────────────────────────────────────────
const techHighlights = [
  {
    icon: Gauge,
    title: "Topographie & Bureau d'Études",
    desc: "Stations totales de haute précision, implantations géométriques rigoureuses et calculs de cubatures pour une conformité parfaite aux plans.",
  },
  {
    icon: Factory,
    title: "Autonomie de Matériaux (Kouriya)",
    desc: "Station de concassage et centrales bitumineuses propriétaires garantissant une disponibilité permanente sans rupture d'approvisionnement.",
  },
  {
    icon: Truck,
    title: "Logistique Lourde Intégrée",
    desc: "Flotte propre de porte-engins et bennes 8x4 assurant une mobilité rapide sur tout le territoire national guinéen.",
  },
  {
    icon: HardHat,
    title: "Laboratoire Qualité Mobile",
    desc: "Équipements d'essais in situ pour valider immédiatement le compactage, la granulométrie et la résistance des bétons.",
  },
];

export default function Expertise() {
  const [activeTab, setActiveTab] = useState("batiment");
  const { data: projects } = useProjects();

  const currentService = technicalServices.find((s) => s.id === activeTab) || technicalServices[0];

  // Projets liés au domaine d'intervention actif
  const relatedProjects = projects?.filter((p) => {
    const cat = (p.category || "").toLowerCase();
    const key = (currentService.categoryKey || "").toLowerCase();
    if (key.includes("bâtiment") || key.includes("batiment")) return cat.includes("bâtiment") || cat.includes("batiment") || cat.includes("construction");
    if (key.includes("ponts")) return cat.includes("pont") || cat.includes("chauss") || cat.includes("voirie");
    if (key.includes("assainissement")) return cat.includes("assainissement") || cat.includes("eau");
    return cat.includes(key);
  });

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-24">
      {/* ── 1. Hero Header & KPIs Industriels ─────────────────────────────────── */}
      <section className="relative py-16 md:py-20 border-b border-border bg-gradient-to-b from-muted/40 via-background to-background overflow-hidden">
        {/* Motifs techniques d'arrière-plan */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, #1F3C88 1.5px, transparent 0)",
            backgroundSize: "36px 36px",
          }}
        />
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #F27100 0%, transparent 70%)" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal direction="up">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-primary font-bold tracking-widest uppercase mb-3 text-sm">
                INGÉNIERIE & CAPACITÉS OPÉRATIONNELLES
              </h2>

              <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-secondary tracking-tight leading-[1.12] mb-6">
                Domaines d'Excellence Technique
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-10">
                Spécialiste des grands travaux en République de Guinée, <strong className="text-foreground">BEGEC BTP</strong> intervient
                dans la construction et rénovation de bâtiments, les ponts et chaussées, le terrassement de masse
                et les réseaux d'assainissement et d'eau potable avec un parc d'engins performants et un contrôle de haute précision.
              </p>

              {/* Barre de 4 KPIs d'Autorité Industrielle */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 md:p-6 bg-white rounded-2xl border border-border shadow-md text-left">
                <div className="border-r border-border/80 last:border-none pr-4">
                  <div className="text-2xl md:text-3xl font-heading font-extrabold text-secondary">
                    100+
                  </div>
                  <div className="text-xs uppercase font-bold text-muted-foreground tracking-wider mt-1">
                    Engins lourds mobilisables
                  </div>
                </div>

                <div className="border-r border-border/80 last:border-none pr-4">
                  <div className="text-2xl md:text-3xl font-heading font-extrabold text-secondary">
                    ±15 mm
                  </div>
                  <div className="text-xs uppercase font-bold text-muted-foreground tracking-wider mt-1">
                    Tolérance altimétrique
                  </div>
                </div>

                <div className="border-r border-border/80 last:border-none pr-4">
                  <div className="text-2xl md:text-3xl font-heading font-extrabold text-secondary">
                    2 Centrales
                  </div>
                  <div className="text-xs uppercase font-bold text-muted-foreground tracking-wider mt-1">
                    Enrobé & Concassage Kouriya
                  </div>
                </div>

                <div>
                  <div className="text-2xl md:text-3xl font-heading font-extrabold text-secondary">
                    100%
                  </div>
                  <div className="text-xs uppercase font-bold text-muted-foreground tracking-wider mt-1">
                    Conformité CCTP & Labo
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 2. Navigation Interactive des Pôles Techniques ───────────────────── */}
      <section className="py-16 md:py-20 container mx-auto px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Sélecteur d'onglets ergonomique */}
          <div className="mb-12">
            <h2 className="text-primary font-bold tracking-widest uppercase mb-3 text-sm text-center md:text-left">
              SÉLECTIONNEZ UNE SPÉCIALITÉ TECHNIQUE
            </h2>
            <TabsList className="grid grid-cols-2 lg:grid-cols-4 h-auto p-1.5 bg-muted/70 rounded-xl gap-1.5 border border-border">
              {technicalServices.map((service) => {
                const Icon = service.icon;
                const isActive = activeTab === service.id;
                return (
                  <TabsTrigger
                    key={service.id}
                    value={service.id}
                    className={`py-3.5 px-3 rounded-lg flex items-center justify-center gap-2.5 transition-all text-xs sm:text-sm font-bold ${
                      isActive
                        ? "bg-white text-secondary shadow-md border border-border"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/50"
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-secondary" : "text-primary"}`} />
                    <span className="truncate">{service.shortTitle}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {/* Contenu Déployé du Pôle Actif */}
          {technicalServices.map((service) => {
            const Icon = service.icon;
            return (
              <TabsContent key={service.id} value={service.id}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-12"
                  >
                    {/* Carte Principale : Présentation Technique & Photo HD */}
                    <div className="grid lg:grid-cols-12 gap-8 items-stretch">
                      {/* Colonne Gauche : Données Techniques & Spécifications */}
                      <div className="lg:col-span-7 bg-white rounded-2xl border-2 border-border p-8 md:p-10 shadow-sm flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-3 mb-4">
                            <div className="p-3 bg-primary/10 text-primary rounded-xl w-fit">
                              <Icon className="w-6 h-6" />
                            </div>
                            <Badge className="bg-secondary text-white font-bold tracking-wider uppercase text-xs">
                              {service.categoryKey}
                            </Badge>
                            <span className="text-xs font-semibold text-muted-foreground px-2.5 py-1 bg-muted rounded-md border border-border">
                              {service.complianceBadge}
                            </span>
                          </div>

                          <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-secondary mb-3 leading-snug">
                            {service.title}
                          </h3>

                          <p className="text-primary font-semibold text-base mb-4">
                            {service.tagline}
                          </p>

                          <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8">
                            {service.desc}
                          </p>

                          {/* 3 Métriques Chiffrées du Domaine */}
                          <div className="grid sm:grid-cols-3 gap-4 p-4 rounded-xl bg-muted/40 border border-border mb-8">
                            {service.metrics.map((metric, i) => (
                              <div key={i} className="border-b sm:border-b-0 sm:border-r border-border last:border-none pb-2 sm:pb-0">
                                <div className="text-lg font-heading font-extrabold text-foreground">
                                  {metric.value}
                                </div>
                                <div className="text-xs text-muted-foreground font-medium mt-0.5">
                                  {metric.label}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Grille de Prestations de Détail */}
                          <div className="mb-8">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-secondary" />
                              Périmètre d'Intervention & Procédés CCTP
                            </h4>
                            <div className="grid sm:grid-cols-2 gap-3">
                              {service.details.map((detail, idx) => (
                                <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-foreground/85">
                                  <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                                  <span>{detail}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* CTA d'action direct avec pré-sélection dans le devis */}
                        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                          <Link href={`/devis?service=${encodeURIComponent(service.categoryKey)}`} className="w-full sm:w-auto">
                            <MovingBorderButton
                              variant="secondary"
                              size="default"
                              borderRadius="0.75rem"
                              containerClassName="w-full sm:w-auto h-13 shadow-lg shadow-secondary/30"
                              className="font-bold px-7 text-sm md:text-base"
                            >
                              Demander une étude : {service.shortTitle}
                              <ArrowRight className="ml-2 w-4 h-4" />
                            </MovingBorderButton>
                          </Link>
                          <Link href="/realisations" className="text-primary hover:text-secondary text-sm font-bold inline-flex items-center gap-1 transition-colors">
                            Voir nos chantiers {service.shortTitle}
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>

                      {/* Colonne Droite : Parc d'Engins & Photographie Terrain */}
                      <div className="lg:col-span-5 flex flex-col gap-6">
                        {/* Cadre Visuel Chantier avec HUD industriel */}
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border-2 border-border group">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

                          <div className="absolute bottom-5 left-5 right-5 text-white">
                            <div className="inline-flex items-center gap-2 bg-secondary text-white font-bold text-xs uppercase px-3 py-1 rounded-md mb-2 shadow">
                              <Sparkles className="w-3.5 h-3.5" />
                              Opérations sur Site
                            </div>
                            <div className="text-base md:text-lg font-heading font-bold">
                              Chantiers & Plateformes BEGEC BTP
                            </div>
                            <p className="text-slate-300 text-xs mt-1">
                              Mobilisation sur Conakry, Kindia, Boké, Labé et sur l'ensemble des préfectures.
                            </p>
                          </div>
                        </div>

                        {/* Parc d'Engins dédié au pôle */}
                        <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                            <Tractor className="w-4 h-4 text-secondary" />
                            Engins & Équipements Clés Déployés
                          </h4>
                          <ul className="space-y-2.5">
                            {service.machinery.map((machine, mIdx) => (
                              <li key={mIdx} className="flex items-center gap-2.5 text-xs md:text-sm font-medium text-foreground">
                                <span className="w-2 h-2 rounded-full bg-primary/20 border border-primary shrink-0" />
                                <span>{machine}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Projets de référence correspondants */}
                    {relatedProjects && relatedProjects.length > 0 && (
                      <div className="pt-6">
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <h2 className="text-primary font-bold tracking-widest uppercase mb-1 text-xs">
                              RÉFÉRENCES DIRECTES
                            </h2>
                            <h3 className="text-xl md:text-2xl font-heading font-extrabold text-secondary">
                              Dernières Réalisations en {service.shortTitle}
                            </h3>
                          </div>
                          <Link href="/realisations">
                            <Button variant="outline" size="sm" className="font-bold border-border">
                              Tout le portfolio
                              <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                            </Button>
                          </Link>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {relatedProjects.slice(0, 3).map((proj) => (
                            <Card key={proj.id} className="overflow-hidden border border-border hover:border-secondary transition-all group shadow-sm">
                              <div className="relative aspect-[16/10] overflow-hidden">
                                <img
                                  src={proj.imageUrl}
                                  alt={proj.title}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute bottom-3 left-3 right-3 text-white">
                                  <Badge className="bg-secondary text-white font-bold text-xs mb-1">
                                    {proj.category}
                                  </Badge>
                                  <h4 className="font-heading font-bold text-sm text-white group-hover:text-secondary transition-colors">
                                    {proj.title}
                                  </h4>
                                  <div className="text-xs text-slate-300 mt-0.5">
                                    {proj.location} • Livré en {proj.completionDate}
                                  </div>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </TabsContent>
            );
          })}
        </Tabs>
      </section>

      {/* ── 3. Méthodologie d'Exécution en 4 Étapes (Pipeline Linéaire Continu) ─ */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-muted/40 via-background to-muted/20 border-y border-border relative overflow-hidden">
        {/* Motifs de repère topographique et coordonnées de chantier en fond */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(31, 60, 136, 0.25) 1.5px, transparent 0)",
            backgroundSize: "36px 36px",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal direction="up">
            <div className="max-w-3xl mx-auto text-center mb-20">
              <h2 className="text-primary font-bold tracking-widest uppercase mb-3 text-sm flex items-center justify-center gap-2">
                <Compass className="w-4 h-4 text-secondary" />
                RÉGULATION & CONDUITE TECHNIQUE
              </h2>
              <h3 className="text-3xl md:text-5xl font-heading font-extrabold text-foreground tracking-tight mb-4">
                La Méthode Industrielle{" "}
                <span className="text-secondary">BEGEC BTP</span>
              </h3>
              <p className="text-muted-foreground text-base md:text-lg">
                De l'analyse géologique initiale jusqu'au contrôle d'étanchéité final, notre processus
                linéaire élimine les aléas de chantier et garantit le respect strict des tolérances.
              </p>
            </div>
          </ScrollReveal>

          {/* ── PIPELINE D'INGÉNIERIE CONTINUE (STRUCTURE SANS CARDS) ─────────────── */}
          <div className="relative">
            {/* Conduit technique continu horizontal sur écran large */}
            <div className="hidden lg:block absolute top-7 left-12 right-12 h-1 bg-border z-0">
              <div className="h-full bg-gradient-to-r from-primary via-secondary to-primary w-full opacity-60" />
            </div>

            {/* Pipeline vertical sur mobile */}
            <div className="lg:hidden absolute top-6 bottom-6 left-7 w-1 bg-gradient-to-b from-primary via-secondary to-primary/30 z-0" />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
              {engineeringWorkflow.map((item, index) => {
                const StepIcon = item.icon;
                return (
                  <ScrollReveal key={item.step} delay={index * 0.12} direction="up">
                    <div className="relative flex flex-col group">
                      {/* En-tête de station avec Nœud ancré sur la ligne */}
                      <div className="flex items-center lg:flex-col lg:items-start gap-4 mb-6">
                        {/* Nœud technique */}
                        <div className="relative flex-shrink-0 z-10">
                          <div className="w-14 h-14 rounded-2xl bg-background border-2 border-primary/30 group-hover:border-secondary shadow-md flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-white text-primary">
                            <StepIcon className="w-6 h-6 text-secondary group-hover:text-white transition-colors" />
                          </div>
                          {/* Point de calibration orange haute visibilité */}
                          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-secondary ring-2 ring-background" />
                        </div>

                        {/* Tag d'étape & phase */}
                        <div className="flex flex-col">
                          <span className="font-mono text-xs font-bold text-secondary tracking-widest uppercase">
                            {item.phaseTag}
                          </span>
                          <span className="text-xl sm:text-2xl font-heading font-extrabold text-foreground tracking-tight">
                            Étape {item.step}
                          </span>
                        </div>
                      </div>

                      {/* Contenu textuel sans boîte ni bordure de carte */}
                      <div className="pl-14 lg:pl-0 space-y-3">
                        <h4 className="font-heading font-bold text-lg md:text-xl text-foreground group-hover:text-primary transition-colors leading-snug">
                          {item.title}
                        </h4>

                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          {item.subtitle}
                        </div>

                        <p className="text-muted-foreground text-sm leading-relaxed font-sans">
                          {item.desc}
                        </p>

                        {/* Bloc d'ingénierie & livrable technique (fiche d'atelier) */}
                        <div className="pt-3 mt-4 border-t border-border space-y-2">
                          <div className="flex items-start gap-2 text-xs">
                            <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold text-foreground block">
                                Livrable certifié :
                              </span>
                              <span className="text-muted-foreground">
                                {item.deliverable}
                              </span>
                            </div>
                          </div>

                          <div className="bg-muted/70 px-3 py-1.5 rounded text-[11px] font-mono text-primary flex items-center justify-between border border-border/60">
                            <span className="truncate pr-2">{item.keyTools}</span>
                            <span className="font-bold text-secondary flex-shrink-0">
                              {item.metric}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          {/* Bandeau de synthèse QHSE au bas du processus */}
          <div className="mt-16 p-4 md:p-6 rounded-xl bg-background border border-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs md:text-sm">
            <div className="flex items-center gap-3 text-foreground font-medium">
              <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span>
                <strong>Contrôle continu et traçabilité :</strong> Chaque phase fait l'objet d'un procès-verbal contresigné par notre direction technique et le bureau de contrôle client.
              </span>
            </div>
            <div className="flex-shrink-0 font-mono text-xs font-bold text-primary bg-primary/5 px-3 py-1.5 rounded-md border border-primary/20">
              ISO & Fascicules CCTG
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Atouts Technologiques & Matériels ─────────────────────────────── */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-primary font-bold tracking-widest uppercase mb-3 text-sm">
                PARC MATÉRIEL & TECHNOLOGIE EMBARQUÉE
              </h2>
              <h3 className="text-3xl md:text-5xl font-heading font-extrabold text-secondary tracking-tight mb-4">
                Une Force de Frappe sans Équivalent
              </h3>
              <p className="text-muted-foreground text-base md:text-lg">
                Des équipements de dernière génération pour des cadences industrielles et une qualité constante.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techHighlights.map((tech, i) => {
              const TechIcon = tech.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.1} direction="up">
                  <div className="bg-muted/40 rounded-2xl p-6 border border-border hover:border-secondary hover:bg-white hover:shadow-lg transition-all duration-300 h-full group">
                    <div className="bg-primary/5 p-4 rounded-xl w-fit mb-5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <TechIcon className="w-6 h-6" />
                    </div>
                    <h4 className="font-heading font-bold text-base md:text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                      {tech.title}
                    </h4>
                    <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                      {tech.desc}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. Bannière CTA Finale : Chiffrage & Étude Technique ─────────────── */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
        {/* Grille technique sombre */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, #FFFFFF 1.5px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #F27100 0%, transparent 70%)",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="bg-secondary text-white font-bold tracking-widest uppercase px-4 py-1.5 text-xs">
              ÉTUDE TECHNIQUE SUR PLAN & MÉTRÉS
            </Badge>

            <h3 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tight text-secondary">
              Votre Chantier Nécessite une Intervention d'Envergure ?
            </h3>

            <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Construction de bâtiments, ponts et chaussées, terrassement de masse ou réseaux d'assainissement et adduction d'eau :
              notre direction technique étudie vos cahiers des charges et vous remet une offre sous 48h.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/devis">
                <MovingBorderButton
                  variant="secondary"
                  size="lg"
                  borderRadius="1rem"
                  containerClassName="w-full sm:w-auto h-14"
                  className="font-bold text-base md:text-lg px-8"
                >
                  Demander une étude chiffrée
                  <ArrowRight className="ml-2 w-5 h-5" />
                </MovingBorderButton>
              </Link>
              <Link href="/contact">
                <MovingBorderButton
                  variant="glass"
                  size="lg"
                  borderRadius="1rem"
                  containerClassName="w-full sm:w-auto h-14"
                  className="font-bold text-base md:text-lg px-8"
                >
                  Échanger avec nos ingénieurs
                </MovingBorderButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
