import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useQuery } from "@tanstack/react-query";
import { motion, useScroll } from "framer-motion";
import logoImg from "@assets/begec_logo_v2.png";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  const { data: logoSetting } = useQuery<{ key: string; value: string | null }>({
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

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

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
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-border shadow-lg py-2"
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
                className="h-14 w-auto object-contain"
                alt="BEGEC TP Logo"
              />
            </motion.div>
            <span className="text-xl font-heading font-extrabold tracking-tight text-primary hidden sm:block">
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
                  "cursor-pointer text-sm font-semibold transition-colors hover:text-primary uppercase tracking-wide relative",
                  location === link.href ? "text-primary" : "text-muted-foreground"
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

          <Button variant="ghost" size="icon" onClick={toggleTheme} className="ml-2">
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </Button>

          <Link href="/devis">
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold">
              Demander un Devis
            </Button>
          </Link>
        </div>

        {/* Mobile Nav */}
        <div className="lg:hidden flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
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
