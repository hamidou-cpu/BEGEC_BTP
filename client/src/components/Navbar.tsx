import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MovingBorderButton } from "@/components/ui/moving-border";
import {
  Menu,
  PhoneCall,
  MapPin,
  Clock,
  ArrowRight,
  HardHat,
  Building2,
  FolderKanban,
  Send,
  Home,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useQuery } from "@tanstack/react-query";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import logoImg from "@assets/begec_logo_v2.png";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const isHeroTop = location === "/" && !isScrolled;

  // Récupération dynamique des paramètres système
  const { data: logoSetting } = useQuery<{ key: string; value: string | null }>({
    queryKey: ["/api/settings/logo"],
    staleTime: 30000,
  });
  const logoSrc = logoSetting?.value || logoImg;

  const phoneNumbers = [
    "+224 628 21 30 96",
    "+224 622 22 11 81",
    "+224 628 67 67 07",
  ];

  const { data: addressSetting } = useQuery<{ key: string; value: string | null }>({
    queryKey: ["/api/settings/address"],
    staleTime: 30000,
  });
  const address = addressSetting?.value || "Carrefour IPS, Kipé, Conakry";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const navLinks = [
    { href: "/", label: "Accueil", icon: Home },
    { href: "/a-propos", label: "À Propos", icon: Building2 },
    { href: "/expertises", label: "Expertises", icon: HardHat },
    { href: "/realisations", label: "Réalisations", icon: FolderKanban },
    { href: "/contact", label: "Contact", icon: Send },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* ── 1. Top Utility Strip (Desktop lg+) ───────────────────────── */}
      <div
        className={cn(
          "hidden lg:block transition-all duration-300 text-xs font-medium border-b select-none",
          isScrolled
            ? "h-0 opacity-0 overflow-hidden py-0 border-transparent pointer-events-none"
            : isHeroTop
              ? "bg-slate-950/60 backdrop-blur-md text-slate-200 border-white/10 py-2"
              : "bg-slate-900 text-slate-200 border-slate-800 py-2"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Côté Gauche : Localisation & Horaires */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-slate-300 font-semibold tracking-wider text-[11px] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
              <span>PROFESSIONALISME - PERFECTION - PERFORMANCE</span>
            </div>
            <div className="h-3.5 w-px bg-white/20" />
            <div className="flex items-center gap-2 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-secondary shrink-0" />
              <span>Lun - Ven : 8h00 - 18h00</span>
            </div>
          </div>

          {/* Côté Droit : Statut Opérationnel & Assistance Directe */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-semibold tracking-wide text-slate-300">
                Chantiers actifs en Guinée
              </span>
            </div>

            <div className="h-3.5 w-px bg-white/20" />

            <div className="flex items-center gap-2 font-bold text-white">
              <PhoneCall className="w-3.5 h-3.5 text-secondary shrink-0" />
              <div className="flex items-center gap-2">
                {phoneNumbers.map((phone, idx) => (
                  <span key={phone} className="flex items-center gap-2">
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="hover:text-secondary transition-colors"
                    >
                      {phone}
                    </a>
                    {idx < phoneNumbers.length - 1 && (
                      <span className="text-white/30">•</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. Main Navigation Bar ──────────────────────────────────── */}
      <nav
        className={cn(
          "transition-all duration-300 relative border-b",
          isScrolled
            ? "bg-white/95 backdrop-blur-md text-foreground border-border/80 shadow-md shadow-slate-950/5 py-3"
            : isHeroTop
              ? "bg-slate-950/35 backdrop-blur-sm border-white/10 text-white py-4"
              : "bg-white/95 backdrop-blur-md text-foreground border-border/80 py-4"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo & Identité Entreprise */}
          <Link href="/">
            <div className="flex items-center gap-3.5 cursor-pointer group select-none">
              <motion.div
                className="bg-white rounded-xl p-1.5 shadow-sm border border-slate-200/80 shrink-0 group-hover:shadow-md transition-shadow"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src={logoSrc}
                  className="h-10 sm:h-11 w-auto object-contain"
                  alt="BEGEC BTP"
                />
              </motion.div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "text-xl sm:text-2xl font-heading font-extrabold tracking-tight leading-none transition-colors",
                      isHeroTop && !isScrolled ? "text-white" : "text-foreground"
                    )}
                  >
                    BEGEC
                  </span>
                  <span className="text-xl sm:text-2xl font-heading font-extrabold tracking-tight leading-none text-secondary">
                    - TRAVEAUX
                  </span>
                </div>

              </div>
            </div>
          </Link>

          {/* Navigation Liens (Desktop) */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = location === link.href;
              return (
                <Link key={link.href} href={link.href}>
                  <div
                    className={cn(
                      "relative px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer select-none",
                      isActive
                        ? isHeroTop && !isScrolled
                          ? "text-white font-bold"
                          : "text-secondary font-bold"
                        : isHeroTop && !isScrolled
                          ? "text-slate-200 hover:text-white hover:bg-white/10"
                          : "text-foreground/85 hover:text-secondary hover:bg-muted/60"
                    )}
                  >
                    {link.label}

                    {/* Indicateur Actif Pilule / Ligne animée */}
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-indicator"
                        className={cn(
                          "absolute inset-0 rounded-lg -z-10",
                          isHeroTop && !isScrolled
                            ? "bg-white/15 border border-white/20 shadow-sm"
                            : "bg-secondary/10 border border-secondary/20"
                        )}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Cluster d'Actions Droit (Desktop) */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4">

            {/* CTA Devis Principal */}
            <Link href="/devis">
              <MovingBorderButton
                variant="secondary"
                size="sm"
                borderRadius="0.75rem"
                containerClassName="h-11 shadow-md shadow-secondary/25 hover:shadow-lg hover:shadow-secondary/35 transition-shadow"
                className="font-bold text-sm px-5 gap-2"
              >
                <span>Demander un Devis</span>
                <ArrowRight className="w-4 h-4" />
              </MovingBorderButton>
            </Link>
          </div>

          {/* Bouton Menu Mobile (Hamburger) */}
          <div className="lg:hidden flex items-center gap-2.5">
            <Link href="/devis" className="hidden sm:inline-flex">
              <Button
                size="sm"
                className="bg-secondary text-white hover:bg-secondary/90 font-bold text-xs h-9 px-3.5 rounded-lg shadow-md shadow-secondary/20"
              >
                Devis rapide
              </Button>
            </Link>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "w-10 h-10 rounded-xl transition-all",
                    isHeroTop && !isScrolled
                      ? "bg-white/10 text-white border-white/20 hover:bg-white/20"
                      : "border-border text-foreground hover:bg-muted"
                  )}
                  aria-label="Ouvrir le menu de navigation"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[320px] sm:w-[380px] p-0 flex flex-col bg-background text-foreground border-l border-border"
              >
                {/* Header du drawer */}
                <div className="p-6 border-b border-border/80 bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="bg-white rounded-lg p-1.5 shadow-sm border border-slate-200">
                      <img
                        src={logoSrc}
                        alt="BEGEC BTP"
                        className="h-8 w-auto object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-heading font-extrabold text-lg leading-tight">
                        BEGEC <span className="text-secondary"></span>
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                        Travaux Publics & BTP
                      </div>
                    </div>
                  </div>
                </div>

                {/* Liens de navigation avec icônes métiers */}
                <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-3 mb-2">
                    Navigation
                  </div>

                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = location === link.href;
                    return (
                      <SheetClose asChild key={link.href}>
                        <Link href={link.href}>
                          <div
                            className={cn(
                              "flex items-center justify-between px-3.5 py-3 rounded-xl transition-colors cursor-pointer group",
                              isActive
                                ? "bg-secondary text-white font-bold shadow-md shadow-secondary/20"
                                : "hover:bg-muted text-foreground"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={cn(
                                  "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                                  isActive
                                    ? "bg-white/20 text-white"
                                    : "bg-muted text-muted-foreground group-hover:text-primary group-hover:bg-primary/10"
                                )}
                              >
                                <Icon className="w-4 h-4" />
                              </div>
                              <span className="text-sm font-semibold">{link.label}</span>
                            </div>

                            <ArrowRight
                              className={cn(
                                "w-4 h-4 transition-transform group-hover:translate-x-0.5",
                                isActive ? "text-white" : "text-muted-foreground"
                              )}
                            />
                          </div>
                        </Link>
                      </SheetClose>
                    );
                  })}

                  {/* Fiche Contact & Coordonnées dans le drawer */}
                  <div className="pt-6 mt-4 border-t border-border">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-3 mb-3">
                      Assistance Directe
                    </div>

                    <div className="space-y-2">
                      {phoneNumbers.map((phone, idx) => (
                        <a
                          key={phone}
                          href={`tel:${phone.replace(/\s/g, "")}`}
                          className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/40 hover:bg-muted border border-border/60 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary shrink-0">
                            <PhoneCall className="w-3.5 h-3.5" />
                          </div>
                          <div className="text-left">
                            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                              Ligne directe #{idx + 1}
                            </div>
                            <div className="font-heading font-bold text-sm text-foreground">
                              {phone}
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>

                    <div className="flex items-start gap-2.5 px-3 pt-3 text-xs text-muted-foreground">
                      <MapPin className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                      <span>{address}</span>
                    </div>
                  </div>
                </div>

                {/* Footer du Drawer avec CTA Principal */}
                <div className="p-4 border-t border-border bg-muted/20">
                  <SheetClose asChild>
                    <Link href="/devis" className="block w-full">
                      <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold h-12 rounded-xl shadow-lg shadow-secondary/25 gap-2">
                        <FileText className="w-4 h-4" />
                        <span>Demander une Étude & Devis</span>
                      </Button>
                    </Link>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* ── 3. Scroll Progress Bar (Gradient industriel subtil) ────── */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-primary via-secondary to-secondary origin-left"
          style={{ scaleX: scrollYProgress }}
        />
      </nav>
    </header>
  );
}
