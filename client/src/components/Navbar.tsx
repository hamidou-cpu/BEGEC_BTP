import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useQuery } from "@tanstack/react-query";
import { motion, useScroll } from "framer-motion";
import logoImg from "@assets/begec_logo_v2.png";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const isHeroHeader = location === "/" && !isScrolled;

  const { data: logoSetting, isLoading: isLogoLoading } = useQuery<{ key: string; value: string | null }>({
    queryKey: ["/api/settings/logo"],
    staleTime: 30000,
  });
  const logoSrc = logoSetting?.value || logoImg;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  // The public site uses its natural light appearance on every device.
  // Remove a previously selected dark-mode class as well.
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/a-propos", label: "À Propos" },
    { href: "/expertises", label: "Expertises" },
    { href: "/realisations", label: "Réalisations" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-400 border-b",
        isHeroHeader
          ? "bg-transparent border-transparent py-4"
          : isScrolled
          ? "bg-background/70 backdrop-blur-lg border-border shadow-lg py-2"
          : "bg-background border-transparent py-4"
      )}
    >
      {/* Scroll progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-secondary origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer group">
            <motion.div
              className="bg-white dark:bg-white rounded-lg px-2 py-1 shadow-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={logoSrc}
                className={cn(
                  "h-14 w-auto object-contain transition-opacity duration-300",
                  isLogoLoading ? "opacity-0" : "opacity-100"
                )}
                alt="BEGEC TP Logo"
              />
            </motion.div>
            <span className={cn(
              "text-xl font-heading font-extrabold tracking-tight hidden sm:block",
              isHeroHeader ? "text-white" : "text-primary"
            )}>
              BEGEC <span className="text-secondary">TP</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={cn(
                  "cursor-pointer text-sm font-semibold transition-colors uppercase tracking-wide relative",
                  isHeroHeader
                    ? "text-white/85 hover:text-white"
                    : "hover:text-primary",
                  location === link.href
                    ? isHeroHeader ? "text-white" : "text-primary"
                    : isHeroHeader ? "text-white/85" : "text-muted-foreground"
                )}
              >
                {link.label}
                {location === link.href && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </span>
            </Link>
          ))}

          <Link href="/devis">
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold">
              Demander un Devis
            </Button>
          </Link>
        </div>

        {/* Mobile Nav */}
        <div className="lg:hidden flex items-center gap-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className={isHeroHeader ? "border-white/70 text-white hover:bg-white/15 hover:text-white" : ""}
              >
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <div className={cn(
                      "text-lg font-semibold cursor-pointer py-2 hover:text-primary transition-colors border-b border-border/50",
                      location === link.href ? "text-primary" : "text-foreground"
                    )}>
                      {link.label}
                    </div>
                  </Link>
                ))}
                <Link href="/devis">
                  <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold mt-4">
                    Demander un Devis
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
