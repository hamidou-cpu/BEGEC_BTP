import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Shovel,
  Truck,
  Hammer,
  HardHat,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  Layers,
  Compass,
  PhoneCall,
  Clock,
  Sparkles,
  Building2,
  Droplets,
  ExternalLink,
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import StickyContentWrapper, { type StickyContentItem } from "@/components/ui/sticky-content-wrapper";
import { OrbitImages } from "@/components/ui/orbit-images";
import { useProjects } from "@/hooks/use-projects";
import { usePartners } from "@/hooks/use-partners";

interface PartnerItem {
  id?: number;
  name: string;
  logoUrl: string;
  category?: string;
  description?: string;
  origin?: string;
  website?: string;
}

// ── Compteur incrémental animé ────────────────────────────────────────────────
function AnimatedStat({ number, label, index }: { number: string; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);

  const numValue = parseInt(number.replace(/\D/g, "")) || 0;
  const suffix = number.replace(/\d/g, "");

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const startTime = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * numValue));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, numValue]);

  return (
    <motion.div
      ref={ref}
      className="p-4"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
    >
      <div className="text-4xl md:text-5xl font-heading font-extrabold text-secondary mb-2 tracking-tight">
        {count}{suffix}
      </div>
      <div className="text-muted-foreground font-medium text-sm md:text-base">{label}</div>
    </motion.div>
  );
}

// ── Pôles d'Expertise Métiers pour Défilement Immersif ───────────────────────
const stickyExpertisesItems: StickyContentItem[] = [
  {
    heading: "Construction et Rénovation de Bâtiments",
    tag: "Gros Œuvre & Modernisation",
    paragraph: "Prise en charge intégrale de la construction neuve et de la réhabilitation d'édifices résidentiels, administratifs et industriels. Solidité des structures en béton armé et finitions de haute qualité.",
    list: [
      "Gros œuvre, dalles & superstructures béton",
      "Rénovation lourde & réhabilitation technique",
      "Élévation de voiles & maçonnerie générale",
      "Second œuvre & aménagements fonctionnels",
    ],
    link: { href: "/expertises", text: "Découvrir nos procédés bâtiment" },
    image: "/construction et rennovation de batiment.jpg",
  },
  {
    heading: "Construction de Ponts et Chaussées",
    tag: "Infrastructures Routières",
    paragraph: "Réalisation et réfection de routes bitumées, voiries urbaines, ponts-cadres et dalots de franchissement. Grâce à notre centrale d'enrobés, nous garantissons des cadences élevées et une durabilité éprouvée.",
    list: [
      "Routes nationales & voiries urbaines bitumées",
      "Édification de ponts-cadres & dalots béton",
      "Application continue d'enrobés à chaud (BBSG)",
      "Caniveaux d'accotement, bordures & soutènements",
    ],
    link: { href: "/expertises", text: "Découvrir les ponts et chaussées" },
    image: "/construction_route_pont_et_chaussé.jpg",
  },
  {
    heading: "Terrassement",
    tag: "Plateformes & Grandes Masses",
    paragraph: "Décapage de terrains, extraction rocheuse, nivellement altimétrique de précision et remblaiement pour implanter des plateformes industrielles, minières et logistiques.",
    list: [
      "Tolérance de nivellement altimétrique ±15 mm",
      "Terrassement de grande masse en déblai / remblai",
      "Préparation de plateformes industrielles sécurisées",
      "Contrôle topographique rigoureux par station totale",
    ],
    link: { href: "/expertises", text: "Découvrir le terrassement" },
    image: "/terrassement.jpg",
  },
  {
    heading: "Construction Réseaux d'Assainissement et d'Eau Potable",
    tag: "Hydraulique & Salubrité",
    paragraph: "Pose de canalisations d'adduction d'eau potable (AEP), collecteurs pluviaux et eaux usées pour viabiliser les parcelles et prémunir les agglomérations contre les inondations.",
    list: [
      "Réseaux d'adduction d'eau potable (AEP) fonte & PEHD",
      "Collecteurs gravitaires d'eaux pluviales & usées",
      "Caniveaux bétonnés, dalles & regards de visite",
      "Épreuves de pression & contrôle hydraulique 100%",
    ],
    link: { href: "/expertises", text: "Découvrir l'assainissement et l'eau" },
    image: "/assainissement.jpg",
  },
];


export default function Home() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], ["0%", "20%"]);
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  // Simulateur rapide de devis
  const [quickService, setQuickService] = useState("Terrassement");
  const [quickVolume, setQuickVolume] = useState("< 500 m²");

  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: partners } = usePartners();
  const [selectedPartner, setSelectedPartner] = useState<PartnerItem | null>(null);

  const defaultPartners: PartnerItem[] = [
    {
      id: 1,
      name: "Caterpillar",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Caterpillar_logo.svg",
      category: "Constructeur d'Engins Lourds",
      description: "Leader mondial des équipements de terrassement, pelles hydrauliques et niveleuses de haute précision mobilisés sur nos chantiers.",
      origin: "États-Unis",
      website: "https://www.caterpillar.com",
    },
    {
      id: 2,
      name: "Komatsu",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/42/Komatsu_logo.svg",
      category: "Machinerie Minière & BTP",
      description: "Constructeur japonais d'engins de terrassement lourd et de concassage, garantissant puissance et fiabilité mécanique continue.",
      origin: "Japon",
      website: "https://www.komatsu.jp",
    },
    {
      id: 3,
      name: "Holcim",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/be/Holcim-Logo.svg",
      category: "Matériaux & Cimenteries",
      description: "Leader international des solutions de construction, fournissant des ciments certifiés haute résistance pour nos ponts, ouvrages d'art et dallages.",
      origin: "Suisse",
      website: "https://www.holcim.com",
    },
    {
      id: 4,
      name: "JCB",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4b/JCB_logo.svg",
      category: "Équipements de Voirie & VRD",
      description: "Spécialiste mondial des tractopelles, télescopiques et compacteurs urbains indispensables pour nos réseaux d'assainissement et adduction d'eau.",
      origin: "Royaume-Uni",
      website: "https://www.jcb.com",
    },
    {
      id: 5,
      name: "World Bank",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/8/87/The_World_Bank_logo.svg",
      category: "Bailleur de Fonds Institutionnel",
      description: "Institution financière internationale appuyant les grands programmes de développement d'infrastructures routières et d'assainissement.",
      origin: "International",
      website: "https://www.worldbank.org",
    },
    {
      id: 6,
      name: "TotalEnergies",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/07/TotalEnergies_logo.svg",
      category: "Bitumes & Énergie de Chantier",
      description: "Fournisseur de bitumes routiers haute performance et carburants de chantier pour notre centrale d'enrobés et notre logistique motorisée.",
      origin: "France",
      website: "https://www.totalenergies.com",
    },
  ];

  const partnerItems = partners && partners.length > 0 ? partners : defaultPartners;
  const orbitPartnerImages = partnerItems.map((p) => ({
    src: p.logoUrl,
    alt: p.name,
  }));

  // Filtrage des réalisations
  const filteredProjects = projects?.filter((p) => {
    if (selectedCategory === "Tous") return true;
    const cat = (p.category || "").toLowerCase();
    const sel = selectedCategory.toLowerCase();
    if (sel === "bâtiment") return cat.includes("bâtiment") || cat.includes("batiment") || cat.includes("construction");
    if (sel === "ponts & chaussées") return cat.includes("pont") || cat.includes("chauss") || cat.includes("voirie");
    if (sel === "assainissement") return cat.includes("assainissement") || cat.includes("eau");
    return cat.includes(sel);
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── 1. Hero Section Monumentale & Asymétrique ─────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-24 md:py-32">
        {/* Fond avec Parallaxe et Gradient Technique */}
        <motion.div className="absolute inset-0 z-0 scale-105" style={{ y: bgY }}>
          <img
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
            alt="Chantier de travaux publics BEGEC"
            className="w-full h-full object-cover"
          />
          {/* Double dégradé sombre pour lisibilité maximale */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/75 to-slate-900/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/40" />
        </motion.div>

        {/* Trame technique d'ingénierie */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.7) 1px, transparent 0)",
            backgroundSize: "36px 36px",
          }}
        />

        <div className="container relative z-10 px-4 mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Colonne Gauche : Titre et Action Principale */}
            <motion.div
              className="lg:col-span-7 text-left"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Badge d'autorité industrielle */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/20 border border-secondary/40 text-secondary font-bold text-xs md:text-sm tracking-wider uppercase mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                Entreprise Générale de Travaux Publics
              </div>

              {/* Titre Principal percutant */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-extrabold text-white tracking-tight leading-[1.1] mb-6">
                Bâtir l'Avenir sur des{" "}
                <span className="text-secondary inline-block">Fondations Solides</span>
              </h1>

              {/* Sous-titre orienté métier */}
              <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed font-sans">
                Spécialistes de la construction de bâtiments, des ponts et chaussées, du terrassement et des réseaux d'assainissement et d'eau potable. Nous déployons un parc d'engins performants et un contrôle topographique rigoureux.
              </p>

              {/* Actions & Call to action */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link href="/devis" className="w-full sm:w-auto">
                  <MovingBorderButton
                    variant="secondary"
                    size="lg"
                    borderRadius="0.375rem"
                    containerClassName="w-full sm:w-auto h-14"
                    className="font-bold text-base md:text-lg px-8"
                  >
                    Demander une étude & devis
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </MovingBorderButton>
                </Link>

                <Link href="/realisations" className="w-full sm:w-auto">
                  <MovingBorderButton
                    variant="glass"
                    size="lg"
                    borderRadius="0.375rem"
                    containerClassName="w-full sm:w-auto h-14"
                    className="font-bold text-base md:text-lg px-7"
                  >
                    Voir nos chantiers livrés
                  </MovingBorderButton>
                </Link>
              </div>

              {/* Micro-indicateurs de réassurance */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/15 text-white/90 text-xs md:text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                  <span>Devis garanti sous 48h</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
                  <span>Conformité QSE & Sécurité</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <Compass className="w-4 h-4 text-secondary shrink-0" />
                  <span>Topographie de haute précision</span>
                </div>
              </div>
            </motion.div>

            {/* Colonne Droite : Fiche Opérationnelle Chantier (Preuve d'expertise) */}
            <motion.div
              className="lg:col-span-5 hidden lg:block"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.2 }}
            >
              <div className="bg-slate-900/85 backdrop-blur-xl border border-white/15 rounded-xl p-6 shadow-2xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/15 rounded-full blur-2xl pointer-events-none" />

                {/* En-tête de la fiche */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-300">
                      Disponibilité Flotte & Équipes
                    </span>
                  </div>
                  <Badge className="bg-secondary text-white font-bold text-xs uppercase tracking-wider">BTP QUALIFIÉ</Badge>
                </div>

                {/* Chiffres opérationnels */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 rounded-xl p-3.5 border border-white/10">
                    <div className="text-2xl font-heading font-extrabold text-secondary">100+</div>
                    <div className="text-xs text-gray-300">Engins lourds en service</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3.5 border border-white/10">
                    <div className="text-2xl font-heading font-extrabold text-secondary">&lt; 48h</div>
                    <div className="text-xs text-gray-300">Délai d'étude sur site</div>
                  </div>
                </div>

                {/* Liste des équipements prioritaires */}
                <div className="space-y-3 mb-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Ressources mobilisables immédiatement
                  </div>
                  {[
                    "Pelles hydrauliques chenillées 20T à 35T de forte puissance",
                    "Bulldozers et niveleuses de haute précision",
                    "Flotte de camions bennes 8x4 et porte-chars",
                    "Compacteurs vibrants haute capacité avec contrôle de portance",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-200">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Appel direct pour urgence chantier */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="text-xs text-gray-300">
                    <span>Un chantier urgent à sécuriser ?</span>
                  </div>
                  <Link href="/contact">
                    <span className="text-xs font-bold text-secondary hover:text-white flex items-center gap-1 cursor-pointer transition-colors">
                      Contacter l'astreinte <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. Bandeau de Performance & Statistiques Animées ──────────────── */}
      <section className="py-14 bg-background border-b border-border relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-border">
            {[
              { number: "20+", label: "Années d'Expérience de Chantier" },
              { number: "400+", label: "Projets et Ouvrages Livrés" },
              { number: "100+", label: "Engins Lourds Disponibles" },
              { number: "99%", label: "Respect des Délais Contractuels" },
            ].map((stat, i) => (
              <AnimatedStat key={i} number={stat.number} label={stat.label} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Pôles d'Expertise & Savoir-Faire Opérationnel (Défilement Immersif) ── */}
      <section className="py-20 bg-background relative border-b border-border">
        <div className="container mx-auto px-4 mb-4">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <h2 className="text-primary font-bold tracking-widest uppercase mb-3 text-sm md:text-base">
              Nos Pôles de Compétences
            </h2>
            <h3 className="text-3xl md:text-5xl font-heading font-extrabold text-foreground mb-4">
              Une Maîtrise Technique Totale de l'Infrastructure
            </h3>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              De la première fouille de reconnaissance géotechnique jusqu'à la couche de roulement finale, explorez nos 4 grands domaines d'excellence opérationnelle.
            </p>
          </motion.div>
        </div>

        {/* Composant Sticky Content Wrapper synchronisé avec GSAP ScrollTrigger */}
        <StickyContentWrapper items={stickyExpertisesItems} />

        <div className="text-center mt-12">
          <Link href="/expertises">
            <Button className="bg-secondary text-white hover:bg-secondary/90 font-bold text-base md:text-lg px-8 h-14 shadow-lg shadow-secondary/30 group">
              Consulter l'ensemble de nos procédés techniques et parcs d'engins
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ── 5. Réalisations & Chantiers Livrés (avec Filtre Catégorie) ──────── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-primary font-bold tracking-widest uppercase mb-3 text-sm">
                Références Chantiers
              </h2>
              <h3 className="text-3xl md:text-4xl font-heading font-extrabold text-foreground">
                Nos Derniers Projets Livrés
              </h3>
            </motion.div>

            {/* Filtres par catégorie */}
            <div className="flex flex-wrap gap-2">
              {["Tous", "Bâtiment", "Ponts & Chaussées", "Terrassement", "Assainissement"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-md text-xs md:text-sm font-bold uppercase tracking-wider transition-all ${selectedCategory === cat
                    ? "bg-secondary text-white shadow-md shadow-secondary/20"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grille de projets */}
          {projectsLoading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-80 bg-muted animate-pulse rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects?.slice(0, 6).map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-xl shadow-lg aspect-[4/3] bg-slate-900 cursor-pointer border border-border"
                >
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Dégradé sombre */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent" />

                  {/* Badge Catégorie haut droite */}
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-secondary text-white font-bold text-xs uppercase shadow-md">
                      {project.category}
                    </Badge>
                  </div>

                  {/* Contenu bas */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    {project.location && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-300 mb-1.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-secondary" />
                        <span>{project.location}</span>
                        {project.completionDate && (
                          <>
                            <span className="mx-1">•</span>
                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                            <span>{project.completionDate}</span>
                          </>
                        )}
                      </div>
                    )}
                    <h4 className="text-xl font-heading font-bold mb-1.5 text-white group-hover:text-secondary transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-300 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/realisations">
              <Button size="lg" variant="outline" className="font-bold border-2 border-border hover:border-secondary">
                Voir l'ensemble du portfolio ({projects?.length || 0} projets)
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. Planificateur Rapide de Chantier (Touchpoint Interactif) ────── */}
      <section className="py-16 bg-muted/50 border-y border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-background rounded-xl p-8 md:p-10 border border-border shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondary mb-2">
                  <Sparkles className="w-4 h-4" />
                  Estimation Express
                </div>
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                  Vous planifiez un chantier ?
                </h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Sélectionnez vos besoins pour orienter immédiatement votre demande technique.
                </p>
              </div>
              <Link href={`/devis?service=${encodeURIComponent(quickService)}&volume=${encodeURIComponent(quickVolume)}`}>
                <MovingBorderButton
                  variant="secondary"
                  size="default"
                  borderRadius="0.375rem"
                  containerClassName="h-12 shadow-md shadow-secondary/20"
                  className="font-bold px-6 text-sm md:text-base"
                >
                  Lancer mon devis technique
                  <ArrowRight className="ml-2 w-4 h-4" />
                </MovingBorderButton>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-border">
              {/* Type de travaux */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-foreground block mb-2">
                  Type d'intervention prioritaire
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["Construction Bâtiments", "Ponts & Chaussées", "Terrassement", "Assainissement & Eau"].map((srv) => (
                    <button
                      key={srv}
                      type="button"
                      onClick={() => setQuickService(srv)}
                      className={`text-xs p-3 rounded-md border font-semibold text-left transition-all ${quickService === srv
                        ? "border-secondary bg-secondary/10 text-secondary font-bold"
                        : "border-border text-foreground hover:bg-muted"
                        }`}
                    >
                      {srv}
                    </button>
                  ))}
                </div>
              </div>

              {/* Surface ou Volume */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-foreground block mb-2">
                  Surface estimative du terrain
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["< 500 m²", "500 à 2 000 m²", "2 000 à 10 000 m²", "> 10 000 m²"].map((vol) => (
                    <button
                      key={vol}
                      type="button"
                      onClick={() => setQuickVolume(vol)}
                      className={`text-xs p-3 rounded-md border font-semibold text-left transition-all ${quickVolume === vol
                        ? "border-secondary bg-secondary/10 text-secondary font-bold"
                        : "border-border text-foreground hover:bg-muted"
                        }`}
                    >
                      {vol}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── 8. Partenaires Institutionnels & Industriels (Orbit 3D React Bits) ───── */}
      <section className="py-24 overflow-hidden bg-muted/30 border-t border-border relative">
        {/* Fond technique avec motif radial */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, rgba(31,60,136,0.4) 1px, transparent 0)",
            backgroundSize: "36px 36px",
          }}
        />

        <div className="container mx-auto px-4 mb-10 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <h2 className="text-primary font-bold tracking-widest uppercase mb-3 text-sm md:text-base">
              Réseau Technique & Institutionnel
            </h2>
            <h3 className="text-3xl md:text-5xl font-heading font-extrabold text-foreground mb-4">
              Partenaires & Institutions Clés
            </h3>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Une chaîne de valeur solide associant constructeurs mondiaux d'engins lourds, cimenteries de référence et bailleurs de fonds internationaux pour la réussite pérenne de chaque chantier.
            </p>
          </motion.div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <OrbitImages
            images={orbitPartnerImages}
            shape="ellipse"
            radiusX={530}
            radiusY={175}
            rotation={-7}
            duration={32}
            itemSize={125}
            itemRadius={16}
            depth={0.65}
            shadow={0.35}
            showPath={true}
            pathColor="rgba(242, 113, 0, 0.25)"
            pathWidth={2}
            pathDash={6}
            draggable={true}
            clickToFront={true}
            onItemClick={(index) => {
              const p = partnerItems[index];
              if (p) setSelectedPartner(p);
            }}
            hoverScale={1.12}
            hoverSpeed={0.2}
            itemBg="#ffffff"
            itemBorder="1px solid hsl(var(--border))"
            itemPadding="18px"
            objectFit="contain"
            className="w-full max-w-5xl mx-auto"
            centerContent={
              <div className="bg-background/90 backdrop-blur-xl border-2 border-border shadow-2xl rounded-xl p-6 md:p-8 max-w-[320px] sm:max-w-[360px] text-center select-none relative overflow-hidden pointer-events-auto">
                <div className="absolute top-0 right-0 w-28 h-28 bg-secondary/10 rounded-full blur-xl pointer-events-none" />
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-bold uppercase tracking-wider mb-3">
                  <Building2 className="w-3.5 h-3.5" />
                  Réseau Agréé BTP
                </div>
                <div className="text-xl md:text-2xl font-heading font-extrabold text-foreground mb-2">
                  Partenaires Agréés
                </div>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4">
                  Constructeurs de premier plan, cimenteries certifiées et organismes de financement internationaux.
                </p>
                <div className="flex items-center justify-center gap-2 text-xs font-semibold text-secondary pt-3 border-t border-border">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{partnerItems.length} partenaires majeurs</span>
                </div>
              </div>
            }
          />

          <div className="text-center mt-6">
            <span className="inline-flex items-center gap-2 text-xs font-mono font-medium text-muted-foreground bg-background/85 px-4 py-1.5 rounded-full border border-border shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              Touchez ou cliquez sur un logo pour l'afficher en grand au centre
            </span>
          </div>
        </div>
      </section>

      {/* ── Modal d'affichage grand format du partenaire (Mobile & Desktop) ─ */}
      <Dialog open={!!selectedPartner} onOpenChange={(open) => !open && setSelectedPartner(null)}>
        <DialogContent className="w-[95vw] max-w-2xl sm:max-w-3xl lg:max-w-4xl max-h-[92vh] overflow-y-auto p-0 bg-background border-2 border-border shadow-2xl rounded-xl z-50">
          {selectedPartner && (
            <div>
              {/* Zone d'affichage du logo en TRÈS grand format */}
              <div className="relative bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200/80 dark:from-slate-900 dark:to-slate-950 p-6 sm:p-12 md:p-16 flex items-center justify-center border-b border-border min-h-[260px] sm:min-h-[360px] md:min-h-[420px]">
                {/* Trame technique discrète en arrière-plan */}
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage: "radial-gradient(circle at 2px 2px, rgba(31,60,136,0.6) 1px, transparent 0)",
                    backgroundSize: "24px 24px",
                  }}
                />

                {/* Badge statut */}
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10">
                  <Badge className="bg-secondary text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-3 py-1 shadow-md">
                    Partenaire Agréé BTP
                  </Badge>
                </div>

                {/* Logo grand format dans un cadre blanc spacieux */}
                <div className="relative z-10 bg-white rounded-xl shadow-2xl p-6 sm:p-12 md:p-16 border-2 border-border/80 flex items-center justify-center w-full max-w-xl sm:max-w-2xl min-h-[190px] sm:min-h-[280px] md:min-h-[340px] transition-transform duration-300 hover:scale-[1.02]">
                  <img
                    src={selectedPartner.logoUrl}
                    alt={selectedPartner.name}
                    className="h-24 sm:h-40 md:h-52 w-auto max-w-[92%] object-contain drop-shadow-sm"
                  />
                </div>
              </div>

              {/* Fiche technique & descriptif */}
              <div className="p-6 sm:p-10 space-y-6">
                <DialogHeader className="space-y-3 text-left">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-primary">
                      {selectedPartner.category || "Infrastructures & Équipements"}
                    </span>
                    {selectedPartner.origin && (
                      <span className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5 font-medium">
                        <MapPin className="w-4 h-4 text-secondary shrink-0" />
                        {selectedPartner.origin}
                      </span>
                    )}
                  </div>
                  <DialogTitle className="text-2xl sm:text-4xl font-heading font-extrabold text-foreground">
                    {selectedPartner.name}
                  </DialogTitle>
                  <DialogDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed pt-1">
                    {selectedPartner.description ||
                      "Partenaire stratégique de premier plan collaborant avec BEGEC BTP pour assurer la performance opérationnelle et la conformité aux normes internationales."}
                  </DialogDescription>
                </DialogHeader>

                {/* Micro-indicateurs d'assurance qualité */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-border text-xs sm:text-sm text-foreground/85">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-secondary shrink-0" />
                    <span>Conformité CCTP & Sécurité Opérationnelle</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-secondary shrink-0" />
                    <span>Matériel & Réseaux Industriels Certifiés</span>
                  </div>
                </div>

                {/* Actions au bas du dialogue */}
                <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4 border-t border-border">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setSelectedPartner(null)}
                    className="w-full sm:w-auto font-bold h-12 px-7 text-sm sm:text-base border-2 border-border hover:border-secondary active:scale-[0.98] transition-transform"
                  >
                    Fermer
                  </Button>
                  {selectedPartner.website && (
                    <a
                      href={selectedPartner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto"
                    >
                      <Button
                        type="button"
                        className="w-full sm:w-auto bg-secondary text-white hover:bg-secondary/90 font-bold h-12 px-7 text-sm sm:text-base shadow-md shadow-secondary/20 active:scale-[0.98] transition-transform"
                      >
                        Site officiel
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ── 9. CTA Final : Engagement Technique & Contact Rapide ──────────── */}
      <section className="py-24 bg-background border-t border-border relative overflow-hidden">
        {/* Grille technique en fond */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, rgba(15,23,42,0.6) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Halos lumineux subtils */}
        <div
          className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #F27100 0%, transparent 70%)", transform: "translate(-30%, -30%)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #1F3C88 0%, transparent 70%)", transform: "translate(30%, 30%)" }}
        />

        <motion.div
          className="container relative z-10 mx-auto px-4 text-center max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/15 text-secondary font-bold text-xs uppercase tracking-wider mb-6">
            <Clock className="w-4 h-4" />
            Étude technique & devis sous 48h
          </div>

          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-foreground mb-6 tracking-tight">
            Un Chantier à Démarrer ?
          </h2>

          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-10">
            Faites appel à notre bureau d'études pour un chiffrage précis de vos projets de bâtiment, ponts et chaussées, terrassement ou réseaux d'assainissement et eau potable.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/devis">
              <MovingBorderButton
                variant="secondary"
                size="lg"
                borderRadius="0.375rem"
                containerClassName="w-full sm:w-auto h-15 shadow-xl shadow-secondary/30"
                className="font-bold text-lg px-9"
              >
                Demander un devis détaillé
                <ArrowRight className="ml-2 w-5 h-5" />
              </MovingBorderButton>
            </Link>

            <Link href="/contact">
              <MovingBorderButton
                variant="dark"
                size="lg"
                borderRadius="0.375rem"
                containerClassName="w-full sm:w-auto h-15"
                className="font-bold text-lg px-8 border-2 border-border/80 hover:border-secondary/60"
              >
                Prendre rendez-vous avec un ingénieur
              </MovingBorderButton>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
