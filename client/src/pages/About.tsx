import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { Skeleton } from "@/components/ui/skeleton";
import { useTeam } from "@/hooks/use-team";
import {
  CheckCircle2,
  Users,
  Target,
  ShieldCheck,
  Truck,
  HardHat,
  Layers,
  MapPin,
  ArrowRight,
  Sparkles,
  Building2,
  Wrench,
  Award,
  Factory,
} from "lucide-react";

// ── Compteur incrémental animé ────────────────────────────────────────────────
function AnimatedStat({
  number,
  label,
  sublabel,
  index,
}: {
  number: string;
  label: string;
  sublabel?: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
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
      className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-secondary/50 transition-colors duration-300"
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="text-3xl md:text-4xl font-heading font-extrabold text-secondary mb-1 tracking-tight">
        {count}
        {suffix}
      </div>
      <div className="text-white font-semibold text-sm md:text-base leading-snug">
        {label}
      </div>
      {sublabel && (
        <div className="text-slate-400 text-xs mt-1 leading-normal">
          {sublabel}
        </div>
      )}
    </motion.div>
  );
}

export default function About() {
  const { data: team, isLoading } = useTeam();

  const prefectures = [
    "Conakry",
    "Coyah",
    "Forécariah",
    "Kindia",
    "Mamou",
    "Boffa",
    "Télimélé",
    "Guéckédou",
  ];

  const milestones = [
    {
      year: "2006",
      title: "Constitution du GIE BEGEC",
      badge: "Fondation Stratégique",
      desc: "Union des compétences d'EGEC et de BELCO SARL sous le statut de Groupement d’Intérêt Économique pour mutualiser matériel lourd et savoir-faire d'ingénierie.",
      highlights: ["Création du GIE", "Flotte initiale d'engins", "Premiers chantiers VRD"],
    },
    {
      year: "2018",
      title: "Déploiement Industriel à Kouriya",
      badge: "Infrastructures Lourdes",
      desc: "Installation de la station de concassage et de la première centrale de production d'enrobé bitumineux à chaud à Kouriya (Kaaka), conférant une autonomie complète en agrégats.",
      highlights: ["Station de concassage", "Centrale d'enrobage #1", "Autonomie en matériaux"],
    },
    {
      year: "2021",
      title: "Envergure Nationale & Grands Travaux",
      badge: "Expansion Régionale",
      desc: "Attribution et réalisation de grands axes routiers, travaux d'assainissement d'envergure et ouvrages d'art à travers 8 préfectures de la Guinée.",
      highlights: ["Routes bitumées & en terre", "Adduction d'eau potable", "Ouvrages d'art majeurs"],
    },
    {
      year: "2025+",
      title: "Capacités Renforcées & Modernisation Industrielle",
      badge: "Excellence Opérationnelle",
      desc: "Mise en service de la seconde centrale d'enrobage, optimisation des cadences de nivellement et renforcement des partenariats avec les acteurs publics et miniers.",
      highlights: ["2e centrale de bitume", "Topographie de précision", "+100 engins actifs"],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── 1. Page Header Architectural (Pas de Hero section — conforme aux règles strictes) ── */}
      <section className="pt-28 md:pt-32 pb-16 md:pb-20 bg-muted/40 border-b border-border relative overflow-hidden">
        {/* Grille technique industrielle en fond */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, #0F172A 1.5px, transparent 0)",
            backgroundSize: "36px 36px",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Colonne gauche : Synthèse institutionnelle */}
            <motion.div
              className="lg:col-span-7 space-y-6"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-secondary/10 border border-secondary/20 text-secondary font-bold text-xs uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Groupement d’Intérêt Économique (GIE)</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-secondary tracking-tight leading-[1.12]">
                L'Excellence Technique au Cœur du BTP Guinéen
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Né de la fusion stratégique entre <strong className="text-foreground font-semibold">EGEC</strong> et{" "}
                <strong className="text-foreground font-semibold">BELCO SARL</strong>,{" "}
                <span className="text-primary font-bold">BEGEC-TRAVAUX-GIE</span> est une entreprise
                guinéenne indépendante de premier ordre, mobilisant des capacités industrielles
                uniques pour transformer durablement les infrastructures du pays.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <div className="inline-flex items-center gap-2 text-sm font-medium text-foreground bg-background px-3.5 py-2 rounded-lg border border-border shadow-sm">
                  <MapPin className="w-4 h-4 text-secondary" />
                  <span>Siège social : Conakry, Guinée</span>
                </div>
                <div className="inline-flex items-center gap-2 text-sm font-medium text-foreground bg-background px-3.5 py-2 rounded-lg border border-border shadow-sm">
                  <Factory className="w-4 h-4 text-primary" />
                  <span>Base industrielle : Kouriya (Kaaka)</span>
                </div>
              </div>
            </motion.div>

            {/* Colonne droite : Fiche technique & métriques clés (Panneau industriel sombre) */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-slate-950 text-white rounded-2xl p-6 md:p-8 relative overflow-hidden border border-slate-800 shadow-2xl">
                {/* Accent orange supérieur */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-secondary via-secondary to-primary" />

                <div className="flex items-center justify-between pb-6 border-b border-slate-800/80 mb-6">
                  <div>
                    <h2 className="text-secondary font-bold tracking-widest uppercase text-xs mb-1">
                      CAPACITÉS MATÉRIELLES
                    </h2>
                    <div className="text-lg font-heading font-bold text-white">
                      Actifs & Potentiel Industriel
                    </div>
                  </div>
                  <Badge className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                    Certifié GIE
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <AnimatedStat
                    number="100+"
                    label="Engins & Camions"
                    sublabel="Flotte lourde opérationnelle"
                    index={0}
                  />
                  <AnimatedStat
                    number="2"
                    label="Centrales d'Enrobé"
                    sublabel="Production continue de bitume"
                    index={1}
                  />
                  <AnimatedStat
                    number="1"
                    label="Station Concassage"
                    sublabel="Base Kouriya (Kaaka)"
                    index={2}
                  />
                  <AnimatedStat
                    number="8+"
                    label="Régions Actives"
                    sublabel="Déploiement national"
                    index={3}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. Alliance Industrielle & Capacités Techniques ─────────────────── */}
      <section className="py-20 md:py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Visuel d'ingénierie et photo de chantier */}
            <motion.div
              className="lg:col-span-6 relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop"
                  alt="Équipe technique et ingénieurs de BEGEC BTP"
                  className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

                {/* Badge d'ancrage local sur l'image */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="inline-flex items-center gap-2 bg-secondary text-white font-bold text-xs uppercase px-3 py-1 rounded-md mb-2 shadow-md">
                    <Factory className="w-3.5 h-3.5" />
                    Pôle de Production Intégré
                  </div>
                  <h3 className="font-heading font-bold text-xl md:text-2xl text-secondary mb-1">
                    Base Opérationnelle de Kouriya (Kaaka)
                  </h3>
                  <p className="text-slate-300 text-xs md:text-sm">
                    Station de concassage & centrales bitumineuses à haut rendement approvisionnant
                    l'ensemble des chantiers nationaux.
                  </p>
                </div>
              </div>

              {/* Carte flottante décorative */}
              <div className="hidden sm:flex absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-xl border border-border items-center gap-4 max-w-xs z-10">
                <div className="bg-primary/10 p-3 rounded-lg text-primary">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs uppercase font-bold text-muted-foreground tracking-wider">
                    Statut Juridique
                  </div>
                  <div className="text-sm font-bold text-foreground">
                    G.I.E. (EGEC & BELCO SARL)
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Texte et descriptif métier */}
            <motion.div
              className="lg:col-span-6 space-y-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <h2 className="text-primary font-bold tracking-widest uppercase mb-3 text-sm">
                  SYNERGIE & SAVOIR-FAIRE
                </h2>
                <h3 className="text-3xl md:text-4xl font-heading font-extrabold text-secondary tracking-tight">
                  Une Force de Frappe Opérationnelle pour Toute la Guinée
                </h3>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Le siège principal de notre Entreprise se situe à Conakry. Pour répondre aux normes
                les plus sévères des cahiers des charges publics et privés, nous opérons avec{" "}
                <strong className="text-foreground">plus d’une centaine d’engins des travaux publics</strong>{" "}
                et une flotte de camions à haute performance (pelles hydrauliques 20t-40t, bulldozers
                D8, compacteurs tandem et monocylindres, niveleuses asservies, finisseurs d'enrobé).
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Notre complexe de Kouriya (Kaaka) abrite nos installations industrielles majeures : une
                station de concassage produisant des granulats calibrés et deux centrales de
                fabrication de béton bitumineux, permettant une maîtrise totale de la qualité et des
                cadences de pose.
              </p>

              {/* 4 Engagements industriels concrets */}
              <div className="grid sm:grid-cols-2 gap-3.5 pt-2">
                {[
                  {
                    title: "Autonomie Matériaux",
                    desc: "Production directe en granulats et bitume",
                  },
                  {
                    title: "Flotte Récente & Équipée",
                    desc: "Engins récents et matériel de pointe",
                  },
                  {
                    title: "Respect Rigoureux des Délais",
                    desc: "Planification par jalons contractuels",
                  },
                  {
                    title: "Sécurité & Normes HSE",
                    desc: "Standards stricts pour les équipes terrain",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 border border-border/80"
                  >
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-foreground text-sm">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Puces des régions couvertes */}
              <div className="pt-4 border-t border-border">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-secondary" />
                  <span>Empreinte territoriale prouvée :</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {prefectures.map((prefecture) => (
                    <span
                      key={prefecture}
                      className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/5 text-primary border border-primary/10 hover:bg-primary hover:text-white transition-colors duration-200 cursor-default"
                    >
                      {prefecture}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. Chronologie : Notre Histoire & Jalons Stratégiques ───────────── */}
      <section className="py-20 md:py-24 bg-muted/30 border-y border-border relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-primary font-bold tracking-widest uppercase mb-3 text-sm">
              NOTRE PARCOURS
            </h2>
            <h3 className="text-3xl md:text-5xl font-heading font-extrabold text-secondary tracking-tight mb-4">
              Les Grandes Étapes de Notre Expansion
            </h3>
            <p className="text-muted-foreground text-base md:text-lg">
              Une montée en puissance continue, de l'association de nos entreprises fondatrices
              jusqu'aux projets structurants de désenclavement national.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Ligne directrice verticale */}
            <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-gradient-to-b from-primary via-secondary to-primary/40 rounded-full" />

            <div className="space-y-12 relative">
              {milestones.map((step, i) => {
                const isEven = i % 2 === 0;
                return (
                  <motion.div
                    key={step.year}
                    className={`relative flex flex-col md:flex-row items-center gap-8 ${isEven ? "md:flex-row-reverse" : ""
                      }`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    {/* Contenu de la carte */}
                    <div className="w-full md:w-1/2 pl-12 md:pl-0">
                      <div className="group bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl border-2 border-transparent hover:border-secondary transition-all duration-300 relative overflow-hidden">
                        <div className="flex items-center justify-between gap-4 mb-3">
                          <span className="text-3xl md:text-4xl font-heading font-extrabold text-secondary tracking-tight">
                            {step.year}
                          </span>
                          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-primary/10 text-primary">
                            {step.badge}
                          </span>
                        </div>

                        <h4 className="text-xl font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                          {step.title}
                        </h4>

                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                          {step.desc}
                        </p>

                        <div className="flex flex-wrap gap-2 pt-2 border-t border-border/70">
                          {step.highlights.map((item, idx) => (
                            <span
                              key={idx}
                              className="text-xs font-medium text-slate-700 bg-muted px-2.5 py-1 rounded-md"
                            >
                              • {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Point central d'ancrage */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-secondary shadow-md flex items-center justify-center z-10">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                    </div>

                    {/* Espace vide pour équilibrer la grille sur desktop */}
                    <div className="hidden md:block md:w-1/2" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Valeurs & Piliers Opérationnels ───────────────────────────────── */}
      <section className="py-20 md:py-24 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-primary font-bold tracking-widest uppercase mb-3 text-sm">
              VALEURS & RIGUEUR TECHNIQUE
            </h2>
            <h3 className="text-3xl md:text-5xl font-heading font-extrabold text-secondary tracking-tight mb-4">
              Nos Piliers Opérationnels
            </h3>
            <p className="text-muted-foreground text-base md:text-lg">
              Chaque mètre cube excavé et chaque kilomètre bitumé reposent sur des engagements
              stricts d'intégrité, de conformité géotechnique et de sécurité.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Rigueur Géotechnique & Qualité",
                subtitle: "Tolérance Zéro & Essais In Situ",
                desc: "Contrôles systématiques de portance, essais Proctor et vérification de la déflexion. Nos ouvrages répondent aux exigences les plus pointues des cahiers des clauses techniques particulières.",
                features: ["Laboratoire mobile", "Conformité CCTP", "Compactage contrôlé"],
              },
              {
                icon: Wrench,
                title: "Puissance Logistique & Autonomie",
                subtitle: "Maîtrise Complète des Flux",
                desc: "Notre station de concassage et nos deux centrales d'enrobé à Kouriya nous affranchissent des pénuries d'agrégats. Un atelier mécanique intégré intervient sur site 24/7.",
                features: ["Approvisionnement garanti", "Atelier mobile 24/7", "Parc d'engins dédié"],
              },
              {
                icon: HardHat,
                title: "Sécurité HSE & Responsabilité Locale",
                subtitle: "Politique Zéro Accident",
                desc: "Nous investissons dans la sécurité de nos ouvriers et machinistes, la protection des nappes phréatiques sur les chantiers d'assainissement et la formation active de la jeunesse locale.",
                features: ["Équipements certifiés", "Protection environnementale", "Emploi local prioritaire"],
              },
            ].map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  whileHover={{ y: -8, transition: { duration: 0.25 } }}
                >
                  <Card className="h-full border-2 border-transparent hover:border-secondary hover:shadow-2xl transition-all duration-300 group bg-card">
                    <CardContent className="p-8 flex flex-col h-full">
                      <div className="bg-primary/5 p-4 rounded-xl w-fit mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
                        <Icon className="w-8 h-8 text-secondary group-hover:text-white transition-colors" />
                      </div>

                      <div className="text-xs font-bold uppercase tracking-wider text-secondary mb-1">
                        {pillar.subtitle}
                      </div>

                      <h4 className="text-xl font-heading font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                        {pillar.title}
                      </h4>

                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                        {pillar.desc}
                      </p>

                      <div className="pt-4 border-t border-border space-y-2">
                        {pillar.features.map((feat, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-xs font-medium text-foreground"
                          >
                            <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. Les Experts du Terrain (STRICTEMENT MAINTENUE & RÉDESIGNÉE) ────── */}
      <section className="py-20 md:py-24 bg-muted/40 border-t border-border relative overflow-hidden">
        {/* Motif d'arrière-plan discret */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, #1F3C88 1.5px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-primary font-bold tracking-widest uppercase mb-3 text-sm">
              GOUVERNANCE & CADRES DE DIRECTION
            </h2>
            <h3 className="text-3xl md:text-5xl font-heading font-extrabold text-secondary tracking-tight mb-4">
              Les Experts du Terrain
            </h3>
            <p className="text-muted-foreground text-base md:text-lg">
              Une équipe d'ingénieurs chevronnés, de gestionnaires de projets et de spécialistes
              de la logistique lourde guidant chaque chantier avec rigueur et leadership.
            </p>
          </div>

          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="space-y-4 bg-white p-4 rounded-2xl border border-border">
                  <Skeleton className="h-72 w-full rounded-xl" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {team?.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.45 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                >
                  <Card className="h-full overflow-hidden border border-border hover:border-secondary hover:shadow-2xl transition-all duration-300 bg-white group flex flex-col rounded-2xl">
                    {/* Conteneur Photo avec masque industriel */}
                    <div className="relative aspect-[4/5] overflow-hidden bg-slate-900">
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 filter contrast-105"
                      />
                      {/* Dégradé sombre protecteur pour la lisibilité */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />

                      {/* Tag d'appartenance technique */}
                      <div className="absolute top-3 right-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-black/60 text-white backdrop-blur-md border border-white/20">
                          BEGEC-TRVEAUX
                        </span>
                      </div>

                      {/* Ligne accent orange au bas de la photo */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </div>

                    {/* Contenu textuel de la carte */}
                    <CardContent className="p-6 flex flex-col flex-grow text-left">
                      <div className="text-xs font-bold uppercase tracking-wider text-secondary mb-1">
                        {member.role}
                      </div>

                      <h4 className="text-lg md:text-xl font-heading font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                        {member.name}
                      </h4>

                      {member.bio && (
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mt-1">
                          {member.bio}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 6. Bannière d'Action & Consultation Technique ──────────────────── */}
      <section className="py-16 md:py-20 bg-slate-950 text-white relative overflow-hidden">
        {/* Halo lumineux d'ambiance */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #F27100 0%, transparent 70%)",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="bg-secondary text-white font-bold tracking-widest uppercase px-4 py-1.5 text-xs">
              PARTENARIAT & GRANDS PROJETS
            </Badge>

            <h3 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tight text-secondary">
              Vous Planifiez un Chantier d'Infrastructures en Guinée ?
            </h3>

            <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Terrassement de grande envergure, voiries bitumées, génie civil ou assainissement :
              notre direction technique étudie vos métrés et vous apporte une solution calibrée.
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
                  Demander une étude / Devis
                  <ArrowRight className="ml-2 w-5 h-5" />
                </MovingBorderButton>
              </Link>
              <Link href="/realisations">
                <MovingBorderButton
                  variant="glass"
                  size="lg"
                  borderRadius="1rem"
                  containerClassName="w-full sm:w-auto h-14"
                  className="font-bold text-base md:text-lg px-8"
                >
                  Consulter nos réalisations
                </MovingBorderButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
