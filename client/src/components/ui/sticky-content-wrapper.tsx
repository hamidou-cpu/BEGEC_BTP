"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface StickyContentLink {
  href?: string;
  text?: string;
  label?: string;
  className?: string;
  target?: string;
  rel?: string;
}

export interface StickyContentItem {
  heading: string;
  tag?: string;
  paragraph: string;
  list?: string[];
  link?: StickyContentLink;
  image: string;
}

export interface StickyContentWrapperProps {
  items?: StickyContentItem[];
  className?: string;
}

const defaultDemoItems: StickyContentItem[] = [
  {
    heading: "Construction et Rénovation de Bâtiments",
    tag: "Bâtiment & Gros Œuvre",
    paragraph: "Prise en charge intégrale de la construction neuve et de la réhabilitation d'édifices résidentiels et industriels.",
    list: ["Gros œuvre & béton armé", "Rénovation & réhabilitation"],
    image: "/construction et rennovation de batiment.jpg",
  },
  {
    heading: "Construction de Ponts et Chaussées",
    tag: "Infrastructures Routières",
    paragraph: "Réalisation et réfection de routes bitumées, voiries urbaines et ponts-cadres.",
    list: ["Routes bitumées", "Ponts & dalots"],
    image: "/construction_route_pont_et_chaussé.jpg",
  },
  {
    heading: "Terrassement",
    tag: "Grandes Masses",
    paragraph: "Décapage de terrains, extraction rocheuse et nivellement altimétrique de précision.",
    list: ["Nivellement altimétrique", "Plateformes industrielles"],
    image: "/terrassement.jpg",
  },
  {
    heading: "Construction Réseaux d'Assainissement et d'Eau Potable",
    tag: "Hydraulique",
    paragraph: "Canalisations d'adduction d'eau potable et collecteurs pluviaux.",
    list: ["Adduction d'eau potable", "Collecteurs pluviaux"],
    image: "/assainissement.jpg",
  },
];

export default function StickyContentWrapper({
  items = defaultDemoItems,
  className = "",
}: StickyContentWrapperProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // Détection de l'affichage desktop vs mobile
  useEffect(() => {
    const checkWidth = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  // Rafraîchissement sécurisé après le chargement des images et de la page
  useEffect(() => {
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleLoad);
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 350);
    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(timer);
    };
  }, []);

  useLayoutEffect(() => {
    if (!containerRef.current || !items.length || !isDesktop) {
      return;
    }

    const contents = contentRefs.current.filter(Boolean) as HTMLDivElement[];
    const images = imageRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!contents.length || !images.length) return;

    const ctx = gsap.context(() => {
      // 1. État initial de tous les slides
      contents.forEach((content, i) => {
        gsap.set(content, {
          autoAlpha: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 20,
        });
      });

      images.forEach((img, i) => {
        gsap.set(img, {
          autoAlpha: i === 0 ? 1 : 0,
          scale: i === 0 ? 1 : 1.06,
        });
      });

      // 2. Timeline GSAP ScrollTrigger avec Pin natif
      // 750px de scroll par diapositive pour un défilement immersif et confortable
      const scrollDistancePerSlide = 750;
      const totalScroll = items.length * scrollDistancePerSlide;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalScroll}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const step = Math.min(
              items.length - 1,
              Math.floor(self.progress * items.length)
            );
            setActiveIndex(step);
          },
        },
      });

      scrollTriggerRef.current = tl.scrollTrigger || null;

      // 3. Modélisation temporelle avec temps de lecture (dwell) et fondus croisés
      const dwellTime = 1.0; // Temps de lecture stable de chaque slide
      const transitionTime = 0.6; // Durée de fondu fluide entre 2 slides

      for (let i = 0; i < items.length - 1; i++) {
        const currentContent = contents[i];
        const nextContent = contents[i + 1];
        const currentImg = images[i];
        const nextImg = images[i + 1];

        const transStart = dwellTime + i * (transitionTime + dwellTime);

        // Disparition douce du slide sortant (texte + photo)
        tl.to(
          currentContent,
          {
            autoAlpha: 0,
            y: -18,
            duration: transitionTime,
            ease: "power2.inOut",
          },
          transStart
        ).to(
          currentImg,
          {
            autoAlpha: 0,
            scale: 0.96,
            duration: transitionTime,
            ease: "power2.inOut",
          },
          transStart
        );

        // Apparition élégante du slide entrant (texte + photo)
        tl.to(
          nextContent,
          {
            autoAlpha: 1,
            y: 0,
            duration: transitionTime,
            ease: "power2.out",
          },
          transStart + 0.1
        ).to(
          nextImg,
          {
            autoAlpha: 1,
            scale: 1,
            duration: transitionTime,
            ease: "power2.out",
          },
          transStart + 0.08
        );
      }

      // Pause finale pour que le 4ème slide reste pleinement lisible avant le décrochage
      const finalTransEnd = dwellTime + (items.length - 1) * (transitionTime + dwellTime);
      tl.to({}, { duration: dwellTime }, finalTransEnd);

      ScrollTrigger.refresh();
    }, containerRef);

    return () => {
      scrollTriggerRef.current = null;
      ctx.revert();
    };
  }, [items, isDesktop]);

  if (!items.length) return null;

  // Rendu Responsive Mobile / Tablette : Cartes empilées ultra-propres
  if (!isDesktop) {
    return (
      <div className="container mx-auto px-4 py-12 space-y-8">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-card border-2 border-border hover:border-secondary rounded-2xl overflow-hidden shadow-lg transition-all"
          >
            <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
              <img
                src={item.image}
                alt={item.heading}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
              <div className="absolute top-4 left-4">
                <Badge className="bg-secondary text-white font-bold text-xs uppercase tracking-wider">
                  0{idx + 1} • {item.tag}
                </Badge>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-heading font-extrabold text-xl text-foreground mb-3">
                {item.heading}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {item.paragraph}
              </p>
              {item.list && item.list.length > 0 && (
                <ul className="space-y-2 mb-6 border-t border-border pt-4">
                  {item.list.map((li, lIdx) => (
                    <li key={lIdx} className="flex items-center gap-2 text-xs text-foreground/85">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                      <span>{li}</span>
                    </li>
                  ))}
                </ul>
              )}
              {item.link && (
                <Link
                  href={item.link.href || "/expertises"}
                  className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-secondary transition-colors"
                >
                  <span>{item.link.text || "En savoir plus"}</span>
                  <ArrowRight className="w-4 h-4 text-secondary" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Rendu Desktop : Pinned Sticky Scroll Immersif avec GSAP
  return (
    <div
      ref={containerRef}
      className={`relative w-full h-screen bg-background overflow-hidden flex flex-col justify-center pt-20 ${className}`}
    >
      <div className="container mx-auto px-6 lg:px-12 h-full flex flex-col justify-center">
        {/* Barre d'état interactive et indicateurs de progression */}
        <div className="flex items-center justify-between pb-4 border-b border-border/80 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
            <span className="font-mono text-xs font-extrabold text-secondary tracking-widest uppercase">
              PÔLE 0{activeIndex + 1} / 0{items.length}
            </span>
          </div>

          {/* 4 Indicateurs interactifs */}
          <div className="flex items-center gap-2">
            {items.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => {
                  if (scrollTriggerRef.current) {
                    const st = scrollTriggerRef.current;
                    const targetProgress = (dotIdx + 0.35) / items.length;
                    const targetScroll = st.start + targetProgress * (st.end - st.start);
                    window.scrollTo({ top: targetScroll, behavior: "smooth" });
                  }
                }}
                title={`Accéder au pôle 0${dotIdx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  dotIdx === activeIndex
                    ? "w-9 bg-secondary shadow-md shadow-secondary/40"
                    : "w-2.5 bg-border hover:bg-secondary/50 cursor-pointer"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Cœur du composant : Split Screen (Textes à gauche, Photos HD à droite) */}
        <div className="grid lg:grid-cols-12 gap-12 items-center flex-1 max-h-[72vh]">
          {/* Colonne Gauche : Pile des textes animés */}
          <div className="lg:col-span-6 relative h-[480px] flex items-center">
            {items.map((item, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  contentRefs.current[idx] = el;
                }}
                className="absolute inset-0 flex flex-col justify-center"
                style={{ visibility: idx === 0 ? "visible" : "hidden", opacity: idx === 0 ? 1 : 0 }}
              >
                {/* Badge de catégorie */}
                <div className="mb-4">
                  <Badge className="bg-secondary/15 text-secondary border border-secondary/30 font-bold text-xs uppercase tracking-wider px-3 py-1">
                    {item.tag || "Expertise Travaux"}
                  </Badge>
                </div>

                {/* Titre percutant */}
                <h3 className="text-3xl lg:text-4xl font-heading font-extrabold text-foreground leading-[1.18] mb-4">
                  {item.heading}
                </h3>

                {/* Paragraphe descriptif */}
                <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-6 font-sans">
                  {item.paragraph}
                </p>

                {/* Spécifications & Procédés clés */}
                {item.list && item.list.length > 0 && (
                  <div className="grid sm:grid-cols-2 gap-2.5 mb-6 border-y border-border/70 py-4">
                    {item.list.map((listItem, lIdx) => (
                      <div
                        key={lIdx}
                        className="flex items-start gap-2 text-xs lg:text-sm font-medium text-foreground/85"
                      >
                        <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                        <span>{listItem}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Bouton d'action */}
                {item.link && (
                  <Link
                    href={item.link.href || "/expertises"}
                    className="group inline-flex items-center gap-2 text-base font-bold text-primary hover:text-secondary transition-colors w-fit"
                  >
                    <span className="border-b-2 border-secondary pb-0.5">
                      {item.link.text || "Découvrir ce procédé"}
                    </span>
                    <ArrowRight className="w-4 h-4 text-secondary transition-transform group-hover:translate-x-1.5" />
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Colonne Droite : Pile des visuels HD animés */}
          <div className="lg:col-span-6 relative h-[450px] lg:h-[500px] rounded-2xl overflow-hidden border-2 border-border shadow-2xl bg-slate-950">
            {items.map((item, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  imageRefs.current[idx] = el;
                }}
                className="absolute inset-0 w-full h-full overflow-hidden"
                style={{ visibility: idx === 0 ? "visible" : "hidden", opacity: idx === 0 ? 1 : 0 }}
              >
                <img
                  src={item.image}
                  alt={item.heading}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Dégradé de contraste */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/15 to-transparent" />
                {/* Légende en bas de visuel */}
                <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-white">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                    BEGEC BTP • Réalisation Chantier
                  </span>
                  <span className="text-xs font-bold bg-secondary text-white px-3 py-1 rounded-md uppercase tracking-wide">
                    Qualité CCTP
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pied de section avec repère de défilement */}
        <div className="pt-3 pb-2 flex items-center justify-between text-xs text-muted-foreground font-mono">
          <div className="flex items-center gap-2">
            <span>Défilez vers le bas pour parcourir les 4 expertises</span>
          </div>
          <Link
            href="/expertises"
            className="text-primary hover:text-secondary font-bold font-sans transition-colors"
          >
            Voir tous nos équipements →
          </Link>
        </div>
      </div>
    </div>
  );
}
