import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjects } from "@/hooks/use-projects";
import type { Project } from "@shared/schema";
import {
  MapPin,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
  Search,
  LayoutGrid,
  FileText,
  ArrowRight,
  ShieldCheck,
  HardHat,
  CheckCircle2,
  Ruler,
  Truck,
  Sparkles,
  Layers,
  Compass,
  SlidersHorizontal,
  Info,
  Maximize2,
} from "lucide-react";

// ── Données techniques et enrichissements BTP par typologie ───────────────────
interface TechnicalDetail {
  challenges: string[];
  equipment: string[];
  norm: string;
  keyMetric: { label: string; value: string };
}

function getTechnicalDetails(project: Project): TechnicalDetail {
  const cat = (project.category || "").toLowerCase();

  if (cat.includes("terrassement")) {
    return {
      challenges: [
        "Nivellement altimétrique et contrôle topographique de haute précision",
        "Décapage de sol meuble et réutilisation optimisée des déblais/remblais",
        "Compactage méthodique avec atteinte de 98% de l'Optimum Proctor Modifié (OPM)",
      ],
      equipment: [
        "Bulldozers Caterpillar D8R / Komatsu D155AX",
        "Pelles hydrauliques de production 25T à 40T",
        "Niveleuses de précision Caterpillar 140M",
        "Compacteurs vibrants lourds 18T à pied dameur",
      ],
      norm: "Norme NF P 94-093 / Fascicule 68 CCTG",
      keyMetric: { label: "Tolérance d'arase", value: "±15 mm" },
    };
  }

  if (cat.includes("vrd") || cat.includes("réseau")) {
    return {
      challenges: [
        "Sécurisation des tranchées profondes en zone habitée par blindages certifiés",
        "Pose conjointe des réseaux secs (énergie, télécom) et humides (eau, assainissement)",
        "Contrôle d'étanchéité sous pression et épreuves d'écoulement gravitaire",
      ],
      equipment: [
        "Pelles à rayon court avec équipements de levage homologués",
        "Caissons de blindage coulissant aluminium et acier",
        "Postes de soudure PEHD par polyfusion bout-à-bout",
        "Tombereaux de chantier articulés 25T",
      ],
      norm: "CCTG Fascicules 70 et 71",
      keyMetric: { label: "Contrôle d'étanchéité", value: "100% testé" },
    };
  }

  if (cat.includes("assainissement")) {
    return {
      challenges: [
        "Dimensionnement hydraulique renforcé pour absorber les fortes précipitations tropicales",
        "Pose de buses grand diamètre et dalots préfabriqués en béton haute densité",
        "Création d'exutoires sécurisés prévenant l'érosion des sols environnants",
      ],
      equipment: [
        "Pelles excavatrices équipées de grappins et pinces de manutention",
        "Camions malaxeurs et pompes à béton",
        "Pilonneuses vibrantes et rouleaux compacteurs de tranchée",
        "Appareils de mesure et de contrôle d'alignement de canalisation",
      ],
      norm: "CCTG Fascicule 70 (Ouvrages d'Assainissement)",
      keyMetric: { label: "Calibrage pluviométrique", value: "Pointe décennale" },
    };
  }

  if (cat.includes("voirie") || cat.includes("route")) {
    return {
      challenges: [
        "Stabilisation et traitement de la couche de forme aux liants hydrauliques",
        "Application d'enrobés bitumineux haute compacité pour trafic lourd",
        "Pose soignée de bordures et caniveaux d'évacuation latérale des eaux pluviales",
      ],
      equipment: [
        "Finisseurs d'enrobés asservis à poutre palpeuse",
        "Répandeuses d'émulsion de bitume synchronisées",
        "Compacteurs tandem vibrants et compacteurs à pneus",
        "Bétonnières mobiles et niveleuses",
      ],
      norm: "Normes NF P 98 / Fascicules 23 à 28 CCTG",
      keyMetric: { label: "Compacité d'enrobé", value: "> 97%" },
    };
  }

  // Aménagement ou Génie Civil par défaut
  return {
    challenges: [
      "Aménagement durable avec intégration paysagère et gestion des ruissellements",
      "Fondations spéciales et coulage de dalles armées pour charges lourdes",
      "Coordination multi-corps d'état pour une livraison clés en main",
    ],
    equipment: [
      "Pelles polyvalentes 15T sur pneus et chenilles",
      "Centrales à béton mobiles et camions toupies",
      "Matériel topographique de haute précision (Station totale & GPS)",
      "Compacteurs légers et rouleaux mixtes",
    ],
    norm: "Eurocodes 2 & DTU Voiries Privées",
    keyMetric: { label: "Contrôle qualité", value: "Audit systématique" },
  };
}

// ── Compteur Animé Industriel ──────────────────────────────────────────────────
function AnimatedMetric({
  value,
  label,
  suffix = "",
  sublabel,
}: {
  value: number;
  label: string;
  suffix?: string;
  sublabel?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1600;
    const start = performance.now();
    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center p-3 sm:p-4">
      <div className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-secondary tracking-tight">
        {displayValue}
        {suffix}
      </div>
      <div className="text-sm font-bold text-foreground mt-1">{label}</div>
      {sublabel && (
        <div className="text-xs text-muted-foreground mt-0.5 hidden sm:block">
          {sublabel}
        </div>
      )}
    </div>
  );
}

// ── Carte Projet : Mode Vitrine Visuelle (Aspect 4/3 Cinematic) ───────────────
interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}

function ProjectCardVisual({ project, index, onOpen }: ProjectCardProps) {
  const technical = getTechnicalDetails(project);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.08 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      onClick={() => onOpen(project)}
      className="group relative rounded-2xl overflow-hidden shadow-lg border border-border/60 bg-muted cursor-pointer flex flex-col transition-all duration-300 hover:border-secondary hover:shadow-2xl"
    >
      {/* Zone Image Aspect 4/3 */}
      <div className="relative aspect-[4/3] overflow-hidden w-full bg-slate-900">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Gradient sombre inférieur pour assurer une lisibilité irréprochable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:via-black/50 transition-colors duration-300" />

        {/* Badges supérieurs */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
          <Badge className="bg-secondary text-white font-bold px-3 py-1 text-xs shadow-md shadow-secondary/30">
            {project.category}
          </Badge>
          <div className="bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-md border border-white/20 flex items-center gap-1 font-medium">
            <Sparkles className="w-3 h-3 text-secondary" />
            {technical.keyMetric.value}
          </div>
        </div>

        {/* Bouton d'inspection au centre au survol */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
          <span className="bg-primary/90 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full backdrop-blur-md shadow-xl flex items-center gap-2 border border-white/20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Maximize2 className="w-4 h-4 text-secondary" />
            Consulter le dossier technique
          </span>
        </div>

        {/* Informations superposées en bas de l'image */}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-10">
          <div className="flex items-center gap-3 text-xs text-white/80 mb-2 font-medium">
            {project.location && (
              <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded">
                <MapPin className="w-3.5 h-3.5 text-secondary" />
                {project.location}
              </span>
            )}
            {project.completionDate && (
              <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded">
                <Calendar className="w-3.5 h-3.5 text-secondary" />
                {project.completionDate}
              </span>
            )}
          </div>
          <h3 className="text-xl font-heading font-bold text-white leading-snug group-hover:text-secondary transition-colors duration-300 line-clamp-1">
            {project.title}
          </h3>
          <p className="text-xs text-white/80 line-clamp-2 mt-1.5 leading-relaxed font-sans">
            {project.description}
          </p>
        </div>
      </div>

      {/* Barre de métriques techniques au pied de carte */}
      <div className="p-4 bg-background border-t border-border flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-medium text-foreground flex items-center gap-1.5 truncate">
          <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
          <span className="truncate">{technical.norm}</span>
        </span>
        <span className="text-primary font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform flex-shrink-0 ml-2">
          Détails
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </motion.div>
  );
}

// ── Carte Projet : Mode Dossier Technique (Ingénierie & Métriques) ─────────────
function ProjectCardTechnical({ project, index, onOpen }: ProjectCardProps) {
  const technical = getTechnicalDetails(project);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={() => onOpen(project)}
      className="group rounded-2xl overflow-hidden border border-border bg-background shadow-md hover:border-secondary hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Header technique avec image compacte et informations clés */}
        <div className="relative h-48 overflow-hidden bg-slate-900">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
          <div className="absolute top-3 left-3">
            <Badge className="bg-secondary text-white font-bold text-xs">
              {project.category}
            </Badge>
          </div>
          <div className="absolute top-3 right-3">
            <Badge className="bg-primary/90 text-white backdrop-blur-md text-xs border border-white/20">
              {technical.keyMetric.label}: {technical.keyMetric.value}
            </Badge>
          </div>
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <div className="flex items-center gap-3 text-xs text-white/80 mb-1">
              {project.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-secondary" />
                  {project.location}
                </span>
              )}
              {project.completionDate && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-secondary" />
                  {project.completionDate}
                </span>
              )}
            </div>
            <h3 className="font-heading font-bold text-lg text-white group-hover:text-secondary transition-colors truncate">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Spécifications & Enjeux */}
        <div className="p-5 space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          <div className="space-y-2 pt-2 border-t border-border">
            <div className="text-xs font-bold text-primary tracking-wider uppercase">
              Points Techniques Majeurs
            </div>
            <ul className="space-y-1.5 text-xs text-foreground">
              {technical.challenges.slice(0, 2).map((c, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-muted/70 p-3 rounded-lg border border-border/60 text-xs">
            <div className="text-muted-foreground font-medium mb-1">Engins & Moyens :</div>
            <div className="font-semibold text-foreground line-clamp-1">
              {technical.equipment.slice(0, 2).join(" • ")}
            </div>
          </div>
        </div>
      </div>

      {/* Footer avec CTA */}
      <div className="p-5 pt-0">
        <Button
          variant="outline"
          className="w-full justify-between font-bold text-primary group-hover:bg-primary group-hover:text-white border-primary/20 transition-all duration-300"
        >
          <span>Examiner la fiche complète</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.div>
  );
}

// ── Modal / Fiche Technique Détaillée ──────────────────────────────────────────
interface DossierModalProps {
  project: Project | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  total: number;
  currentIndex: number;
}

function DossierModal({
  project,
  onClose,
  onPrev,
  onNext,
  total,
  currentIndex,
}: DossierModalProps) {
  // Clavier : Flèches et Échap
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [project, onClose, onPrev, onNext]);

  if (!project) return null;
  const technical = getTechnicalDetails(project);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop sombre avec flou industriel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        {/* Conteneur principal du dossier */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl bg-background rounded-2xl shadow-2xl border border-border overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col"
        >
          {/* Barre supérieure du dossier technique */}
          <div className="px-6 py-4 bg-muted/90 border-b border-border flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Badge className="bg-primary text-white font-bold text-xs">
                BEGEC BTP • Dossier Chantier
              </Badge>
              <span className="text-xs text-muted-foreground font-mono">
                RÉF-BTP#{String(project.id).padStart(4, "0")}
              </span>
              <span className="text-xs bg-secondary/15 text-secondary font-bold px-2 py-0.5 rounded-full hidden sm:inline-block">
                {currentIndex + 1} sur {total}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={onPrev}
                className="h-9 w-9 rounded-full border-border hover:bg-background"
                title="Projet précédent (Flèche gauche)"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={onNext}
                className="h-9 w-9 rounded-full border-border hover:bg-background"
                title="Projet suivant (Flèche droite)"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
              <div className="w-px h-6 bg-border mx-1" />
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-9 w-9 rounded-full hover:bg-destructive/10 hover:text-destructive"
                title="Fermer (Échap)"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Corps avec scroll interne */}
          <div className="overflow-y-auto p-6 md:p-8 space-y-8">
            {/* Visualisation Chantier Grand Format */}
            <div className="relative rounded-xl overflow-hidden aspect-[16/9] md:aspect-[21/9] bg-slate-900 border border-border shadow-inner">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
              <div className="absolute top-4 left-4">
                <Badge className="bg-secondary text-white font-bold px-3 py-1 text-sm shadow-md">
                  {project.category}
                </Badge>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 text-white">
                <div className="flex items-center gap-4 text-sm font-medium">
                  {project.location && (
                    <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                      <MapPin className="w-4 h-4 text-secondary" />
                      {project.location}
                    </span>
                  )}
                  {project.completionDate && (
                    <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                      <Calendar className="w-4 h-4 text-secondary" />
                      Livraison : {project.completionDate}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Titre et Synthèse */}
            <div>
              <div className="text-primary font-bold tracking-widest uppercase mb-1 text-xs">
                Fiche d'Opération Terminée
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground">
                {project.title}
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg mt-3 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Grille des Spécifications Techniques Industrielles */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Enjeux Techniques Résolus */}
              <div className="bg-muted/40 p-6 rounded-xl border border-border space-y-4">
                <div className="flex items-center gap-2 text-primary font-heading font-bold text-base">
                  <ShieldCheck className="w-5 h-5 text-secondary" />
                  Enjeux & Prestations Techniques
                </div>
                <ul className="space-y-3 text-sm text-foreground">
                  {technical.challenges.map((c, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0 mt-1" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Matériel Mobilisé & Normes */}
              <div className="bg-muted/40 p-6 rounded-xl border border-border space-y-4">
                <div className="flex items-center gap-2 text-primary font-heading font-bold text-base">
                  <Truck className="w-5 h-5 text-secondary" />
                  Parc d'Engins & Conformité
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">
                      Équipements et machinerie mobilisés :
                    </div>
                    <ul className="space-y-1.5 text-sm text-foreground">
                      {technical.equipment.map((eq, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                          <span>{eq}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                    <span className="text-muted-foreground font-medium">Référentiel :</span>
                    <span className="font-bold text-foreground bg-background px-2.5 py-1 rounded border border-border">
                      {technical.norm}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bannière d'action intégrée */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-primary to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div>
                <h4 className="font-heading font-bold text-xl text-white">
                  Vous avez un projet d'envergure similaire ?
                </h4>
                <p className="text-white/80 text-sm mt-1">
                  Confiez vos travaux à notre bureau d'études et nos équipes de chantier.
                </p>
              </div>
              <Link href={`/devis?service=${encodeURIComponent(project.category)}`}>
                <MovingBorderButton
                  variant="secondary"
                  size="default"
                  borderRadius="0.75rem"
                  containerClassName="w-full sm:w-auto h-12 shadow-lg shadow-secondary/30 flex-shrink-0"
                  className="font-bold text-base px-6"
                >
                  Demander une étude technique
                  <ArrowRight className="w-4 h-4 ml-2" />
                </MovingBorderButton>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// ── Composant Principal Portfolio ─────────────────────────────────────────────
export default function Portfolio() {
  const { data: projects, isLoading } = useProjects();
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"visual" | "technical">("visual");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Catégories représentatives des métiers BEGEC BTP
  const categories = [
    { label: "Tous", filterKey: "Tous" },
    { label: "Terrassement", filterKey: "Terrassement" },
    { label: "VRD & Réseaux", filterKey: "VRD" },
    { label: "Assainissement", filterKey: "Assainissement" },
    { label: "Voirie & Routes", filterKey: "Voirie" },
    { label: "Aménagement", filterKey: "Aménagement" },
  ];

  // Filtrage combiné : Catégorie + Recherche textuelle
  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    return projects.filter((project) => {
      // Filtre catégorie
      const cat = (project.category || "").toLowerCase();
      let matchesCat = true;
      if (selectedCategory === "Tous") {
        matchesCat = true;
      } else if (selectedCategory === "VRD") {
        matchesCat = cat.includes("vrd");
      } else if (selectedCategory === "Voirie") {
        matchesCat = cat.includes("voirie") || cat.includes("route");
      } else if (selectedCategory === "Aménagement") {
        matchesCat = cat.includes("aménagement");
      } else {
        matchesCat = cat.includes(selectedCategory.toLowerCase());
      }

      // Filtre texte
      if (!matchesCat) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      return (
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        (project.location && project.location.toLowerCase().includes(q)) ||
        (project.category && project.category.toLowerCase().includes(q))
      );
    });
  }, [projects, selectedCategory, searchQuery]);

  // Comptage par catégorie pour les pastilles
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { Tous: projects?.length || 0 };
    if (!projects) return counts;
    projects.forEach((p) => {
      const c = (p.category || "").toLowerCase();
      if (c.includes("terrassement")) counts["Terrassement"] = (counts["Terrassement"] || 0) + 1;
      if (c.includes("vrd")) counts["VRD"] = (counts["VRD"] || 0) + 1;
      if (c.includes("assainissement")) counts["Assainissement"] = (counts["Assainissement"] || 0) + 1;
      if (c.includes("voirie") || c.includes("route")) counts["Voirie"] = (counts["Voirie"] || 0) + 1;
      if (c.includes("aménagement")) counts["Aménagement"] = (counts["Aménagement"] || 0) + 1;
    });
    return counts;
  }, [projects]);

  // Navigation dans le modal
  const handleNavigateModal = useCallback(
    (direction: "prev" | "next") => {
      if (!selectedProject || filteredProjects.length === 0) return;
      const currentIndex = filteredProjects.findIndex((p) => p.id === selectedProject.id);
      if (currentIndex === -1) return;

      const nextIndex =
        direction === "next"
          ? (currentIndex + 1) % filteredProjects.length
          : (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;

      setSelectedProject(filteredProjects[nextIndex]);
    },
    [selectedProject, filteredProjects]
  );

  const currentModalIndex = useMemo(() => {
    if (!selectedProject) return 0;
    return filteredProjects.findIndex((p) => p.id === selectedProject.id);
  }, [selectedProject, filteredProjects]);

  return (
    <div className="min-h-screen bg-background">
      {/* ── SECTION HERO INDUSTRIELLE ────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 bg-gradient-to-b from-muted/80 via-background to-background border-b border-border overflow-hidden">
        {/* Grille technique de fond BTP */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(15, 23, 42, 0.15) 1.5px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Halo orange chantier discret */}
        <div className="absolute -top-32 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Surtitre obligatoire selon le Design System */}
            <h2 className="text-primary font-bold tracking-widest uppercase mb-3 text-sm md:text-base flex items-center justify-center gap-2">
              <HardHat className="w-5 h-5 text-secondary" />
              Catalogue des Ouvrages & Réalisations
            </h2>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold text-foreground mb-6 leading-tight">
              L'Excellence Opérationnelle{" "}
              <span className="text-primary block sm:inline">sur le Terrain</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground font-sans max-w-2xl mx-auto leading-relaxed">
              Explorez nos chantiers d'envergure en Guinée : terrassement de masse,
              viabilisation VRD, assainissement et aménagements d'infrastructures
              durables.
            </p>
          </motion.div>

          {/* Bandeau des Chiffres Clés de Performance */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-14 max-w-4xl mx-auto bg-background rounded-2xl border border-border shadow-xl p-3 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-border"
          >
            <AnimatedMetric
              value={50}
              suffix="+"
              label="Chantiers Livrés"
              sublabel="Terrassement & VRD"
            />
            <AnimatedMetric
              value={100}
              suffix="%"
              label="Respect des Délais"
              sublabel="Gestion de planning rigoureuse"
            />
            <AnimatedMetric
              value={4}
              label="Régions Couvertes"
              sublabel="Conakry, Kindia, Labé, N'Zérékoré"
            />
            <AnimatedMetric
              value={0}
              label="Accident Majeur"
              sublabel="Culture Sécurité & QHSE"
            />
          </motion.div>
        </div>
      </section>

      {/* ── BARRE DE CONTRÔLE, RECHERCHE & FILTRES ────────────────────────────── */}
      <section className="sticky top-20 z-30 bg-background/95 backdrop-blur-md border-b border-border py-4 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Filtres par Métier */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.filterKey;
                const count = categoryCounts[cat.filterKey] ?? 0;

                return (
                  <button
                    key={cat.filterKey}
                    onClick={() => setSelectedCategory(cat.filterKey)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap flex-shrink-0 ${
                      isActive
                        ? "bg-primary text-white shadow-md shadow-primary/20"
                        : "bg-muted/80 text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-full font-mono ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-background text-muted-foreground border border-border"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Outils : Recherche + Switcher de Vue */}
            <div className="flex items-center gap-3 w-full lg:w-auto">
              {/* Barre de Recherche */}
              <div className="relative flex-1 sm:w-72">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Rechercher un chantier, ville..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 text-sm rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    title="Effacer la recherche"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Sélecteur de mode d'affichage */}
              <div className="flex items-center bg-muted p-1 rounded-xl border border-border">
                <button
                  onClick={() => setViewMode("visual")}
                  className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                    viewMode === "visual"
                      ? "bg-background text-primary shadow-sm font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  title="Affichage Photos Plein Écran"
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span className="hidden sm:inline">Visuel</span>
                </button>
                <button
                  onClick={() => setViewMode("technical")}
                  className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                    viewMode === "technical"
                      ? "bg-background text-primary shadow-sm font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  title="Affichage Dossier Technique"
                >
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Technique</span>
                </button>
              </div>
            </div>
          </div>

          {/* Résumé du filtrage actif si recherche en cours */}
          {(searchQuery || selectedCategory !== "Tous") && (
            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
              <span>
                Résultats : <strong>{filteredProjects.length}</strong> chantier(s)
                trouvé(s)
                {selectedCategory !== "Tous" && (
                  <>
                    {" "}
                    dans <strong>{selectedCategory}</strong>
                  </>
                )}
                {searchQuery && (
                  <>
                    {" "}
                    pour « <strong>{searchQuery}</strong> »
                  </>
                )}
              </span>

              <button
                onClick={() => {
                  setSelectedCategory("Tous");
                  setSearchQuery("");
                }}
                className="text-secondary font-semibold hover:underline flex items-center gap-1"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── GRILLE DES CHANTIERS & RÉALISATIONS ──────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {isLoading ? (
            /* Skeleton Loading BTP */
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-border overflow-hidden bg-background p-4 space-y-4"
                >
                  <Skeleton className="w-full aspect-[4/3] rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-3/4 rounded" />
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-1/2 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            /* État vide stylisé */
            <div className="text-center py-20 px-4 max-w-lg mx-auto bg-muted/40 rounded-2xl border border-dashed border-border">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                <Info className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                Aucun chantier ne correspond à vos critères
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Essayez d'élargir vos termes de recherche ou de sélectionner une autre
                catégorie de travaux.
              </p>
              <Button
                onClick={() => {
                  setSelectedCategory("Tous");
                  setSearchQuery("");
                }}
                className="bg-primary text-white hover:bg-primary/90 font-bold"
              >
                Afficher tous les chantiers
              </Button>
            </div>
          ) : (
            /* Grille selon le mode choisi */
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) =>
                  viewMode === "visual" ? (
                    <ProjectCardVisual
                      key={project.id}
                      project={project}
                      index={index}
                      onOpen={setSelectedProject}
                    />
                  ) : (
                    <ProjectCardTechnical
                      key={project.id}
                      project={project}
                      index={index}
                      onOpen={setSelectedProject}
                    />
                  )
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* ── BANNIÈRE INDUSTRIELLE DE FIN DE PAGE (CTA STRICT) ────────────────── */}
      <section className="relative bg-slate-900 text-white py-20 md:py-24 overflow-hidden border-t-4 border-secondary">
        {/* Motifs techniques de fond */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.25) 1px, transparent 0)",
            backgroundSize: "36px 36px",
          }}
        />

        {/* Halo lumineux orange secondaire */}
        <div className="absolute top-1/2 -right-32 -translate-y-1/2 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-secondary font-bold text-xs md:text-sm mb-6 border border-white/10">
            <ShieldCheck className="w-4 h-4" />
            Engagement Qualité, Sécurité & Délais
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white mb-6 leading-tight">
            Vous planifiez des travaux de terrassement ou de voirie en Guinée ?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
            Bénéficiez de l'expertise technique de <strong>BEGEC BTP</strong> pour vos
            lotissements, routes, plateformes industrielles ou réseaux d'assainissement.
            Nos ingénieurs vous répondent sous 48 heures.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* CTA Principal conforme à la directive AGENTS.md */}
            <Link href="/devis">
              <MovingBorderButton
                variant="secondary"
                size="lg"
                borderRadius="1rem"
                containerClassName="w-full sm:w-auto h-14"
                className="font-bold text-lg px-8"
              >
                Demander une étude & devis
                <ArrowRight className="ml-2 w-5 h-5" />
              </MovingBorderButton>
            </Link>

            {/* Bouton Secondaire Glassmorphism */}
            <Link href="/expertise">
              <MovingBorderButton
                variant="glass"
                size="lg"
                borderRadius="1rem"
                containerClassName="w-full sm:w-auto h-14"
                className="font-bold text-lg px-8"
              >
                Découvrir nos pôles d'expertise
              </MovingBorderButton>
            </Link>
          </div>
        </div>
      </section>

      {/* ── MODAL FICHE TECHNIQUE GRAND FORMAT ───────────────────────────────── */}
      <DossierModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onPrev={() => handleNavigateModal("prev")}
        onNext={() => handleNavigateModal("next")}
        total={filteredProjects.length}
        currentIndex={currentModalIndex}
      />
    </div>
  );
}
