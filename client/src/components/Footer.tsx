import { Link } from "wouter";
import { HardHat, Phone, Mail, MapPin, Facebook, Linkedin, Instagram } from "lucide-react";
import { useSetting } from "@/hooks/use-settings";

export function Footer() {
  const phone = useSetting("phone", "(+224) 622 21 34 67");
  const email = useSetting("email", "contact@begecgroup.com");
  const address = useSetting("address", "CARREFOUR IPS, KIPE, COMMUNE DE RATOMA");
  const hours = useSetting("hours", "Lun - Ven: 8h00 - 18h00\nSamedi: Sur rendez-vous");
  const hoursLines = hours.split("\n");

  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-white p-2 rounded text-primary">
                <HardHat className="w-6 h-6" />
              </div>
              <span className="text-2xl font-heading font-extrabold tracking-tighter text-white">
                BEGEC <span className="text-secondary">TP</span>
              </span>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Votre partenaire de confiance pour tous travaux publics, terrassement et aménagements extérieurs. Qualité et sécurité garanties.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-bold mb-4 text-white">Navigation</h3>
            <ul className="space-y-2">
              {[
                { label: "Accueil", href: "/" },
                { label: "À Propos", href: "/a-propos" },
                { label: "Nos Expertises", href: "/expertises" },
                { label: "Nos Réalisations", href: "/realisations" },
                { label: "Demander un Devis", href: "/devis" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-primary-foreground/80 hover:text-secondary cursor-pointer transition-colors">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-heading font-bold mb-4 text-white">Nous Contacter</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-1" />
                <span className="text-primary-foreground/80">{address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-primary-foreground/80 hover:text-white transition-colors">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <a href={`mailto:${email}`} className="text-primary-foreground/80 hover:text-white transition-colors">
                  {email}
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Hours */}
          <div>
            <h3 className="text-lg font-heading font-bold mb-4 text-white">Suivez-nous</h3>
            <div className="flex gap-4 mb-8">
              <a href="#" className="bg-primary-foreground/10 p-2 rounded-full hover:bg-secondary hover:text-primary transition-all" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-primary-foreground/10 p-2 rounded-full hover:bg-secondary hover:text-primary transition-all" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="bg-primary-foreground/10 p-2 rounded-full hover:bg-secondary hover:text-primary transition-all" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <h3 className="text-lg font-heading font-bold mb-2 text-white">Horaires</h3>
            <div className="text-primary-foreground/80 text-sm space-y-1">
              {hoursLines.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} BEGEC TP. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="#"><span className="hover:text-white cursor-pointer">Mentions Légales</span></Link>
            <Link href="#"><span className="hover:text-white cursor-pointer">Politique de Confidentialité</span></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
