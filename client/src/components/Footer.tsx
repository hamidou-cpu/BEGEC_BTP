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
    <footer className="bg-background border-t border-border text-foreground pt-16 pb-10">
      <div className="container mx-auto px-4">
        {/* Engineering Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-border text-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 font-bold">
              TOPO
            </div>
            <div>
              <div className="font-heading font-bold text-foreground">Topographie Certifiée</div>
              <div className="text-xs text-muted-foreground">Précision et conformité</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary shrink-0 font-bold">
              48h
            </div>
            <div>
              <div className="font-heading font-bold text-foreground">Devis sous 48h</div>
              <div className="text-xs text-muted-foreground">Étude technique réactive</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 font-bold">
              QSE
            </div>
            <div>
              <div className="font-heading font-bold text-foreground">Sécurité & Qualité</div>
              <div className="text-xs text-muted-foreground">Zéro compromis chantier</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary shrink-0 font-bold">
              PARC
            </div>
            <div>
              <div className="font-heading font-bold text-foreground">200+ Engins Lourds</div>
              <div className="text-xs text-muted-foreground">Disponibilité garantie</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-lg text-primary">
                <HardHat className="w-6 h-6 text-primary" />
              </div>
              <span className="text-2xl font-heading font-extrabold tracking-tight text-foreground">
                BEGEC <span className="text-secondary">- TRAVEAUX</span>
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Entreprise générale de BTP : construction et rénovation de bâtiments, ponts et chaussées, terrassement, réseaux d'assainissement et d'eau potable.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-heading font-bold uppercase tracking-wider mb-4 text-foreground">Navigation</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Accueil", href: "/" },
                { label: "À Propos de BEGEC", href: "/a-propos" },
                { label: "Nos Expertises Travaux", href: "/expertises" },
                { label: "Portefeuille Réalisations", href: "/realisations" },
                { label: "Demander une Étude & Devis", href: "/devis" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-muted-foreground hover:text-secondary cursor-pointer transition-colors">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-heading font-bold uppercase tracking-wider mb-4 text-foreground">Nous Contacter</h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-secondary shrink-0 mt-1" />
                <span className="text-muted-foreground">{address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-secondary shrink-0" />
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-muted-foreground hover:text-foreground font-semibold transition-colors">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-secondary shrink-0" />
                <a href={`mailto:${email}`} className="text-muted-foreground hover:text-foreground transition-colors">
                  {email}
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Hours */}
          <div>
            <h3 className="text-sm font-heading font-bold uppercase tracking-wider mb-4 text-foreground">Permanence Chantier</h3>
            <div className="text-muted-foreground text-sm space-y-1 mb-6">
              {hoursLines.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>

            <h3 className="text-sm font-heading font-bold uppercase tracking-wider mb-3 text-foreground">Suivez Nos Travaux</h3>
            <div className="flex gap-3">
              <a href="#" className="bg-muted p-2.5 rounded-lg hover:bg-secondary hover:text-white transition-all text-muted-foreground" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="bg-muted p-2.5 rounded-lg hover:bg-secondary hover:text-white transition-all text-muted-foreground" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="bg-muted p-2.5 rounded-lg hover:bg-secondary hover:text-white transition-all text-muted-foreground" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} BEGEC-TRAVEAUX. Tous droits réservés. Conforme aux standards d'ingénierie et de sécurité civile.</p>
          <div className="flex gap-6">
            <Link href="/contact"><span className="hover:text-foreground cursor-pointer">Support Technique</span></Link>
            <Link href="/contact"><span className="hover:text-foreground cursor-pointer">Mentions Légales</span></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
