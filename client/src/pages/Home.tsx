import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, Shovel, Truck, Hammer } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useProjects } from "@/hooks/use-projects";
import { useTestimonials } from "@/hooks/use-testimonials";
import { usePartners } from "@/hooks/use-partners";

// ── Animated counter component ──────────────────────────────────────────────
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
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div className="text-4xl md:text-5xl font-heading font-extrabold text-secondary mb-2">
        {count}{suffix}
      </div>
      <div className="text-muted-foreground font-medium">{label}</div>
    </motion.div>
  );
}

// ── Hero words ────────────────────────────────────────────────────────────────
const heroWords = ["Bâtir", "l'Avenir", "sur", "des"];
const heroHighlight = ["Fondations", "Solides"];

export default function Home() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 700], ["0%", "22%"]);
  const [paused, setPaused] = useState(false);

  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: testimonials, isLoading: testimonialsLoading } = useTestimonials();
  const { data: partners } = usePartners();

  return (
    <div className="min-h-screen">
      {/* ── Hero Section ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-28 md:py-32">
        {/* Parallax background */}
        <motion.div
          className="absolute inset-0 z-0 scale-110"
          style={{ y: bgY }}
        >
          <img
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
            alt="Chantier de construction"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />
        </motion.div>

        <div className="container relative z-10 px-4 max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary mb-6 px-4 py-1 text-sm font-bold uppercase tracking-wider">
              Expertise & Fiabilité
            </Badge>
          </motion.div>

          {/* Word-by-word title */}
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold leading-tight mb-6 text-white">
            {heroWords.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 + i * 0.1, ease: "easeOut" }}
                className="inline-block mr-3"
              >
                {word}
              </motion.span>
            ))}
            <span className="text-secondary">
              {heroHighlight.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 + (heroWords.length + i) * 0.1, ease: "easeOut" }}
                  className="inline-block mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            Spécialistes du terrassement, VRD et aménagements extérieurs.
            Nous apportons une expertise technique de pointe à chaque chantier, du résidentiel aux grands projets publics.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05 }}
          >
            <Link href="/devis" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-lg px-8 h-14 shadow-lg shadow-secondary/30">
                Demander un devis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/realisations" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 backdrop-blur-sm text-white border-2 border-white hover:bg-white hover:text-primary font-bold text-lg px-8 h-14">
                Nos Réalisations
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      {/* ── Expertise Summary ─────────────────────────────────────────────── */}
      <section className="py-24 bg-background relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-primary font-bold tracking-widest uppercase mb-3">Notre Savoir-Faire</h2>
            <h3 className="text-4xl font-heading font-bold mb-6">Des Solutions Complètes pour Vos Chantiers</h3>
            <p className="text-muted-foreground text-lg">
              Nous maîtrisons l'ensemble de la chaîne de valeur des travaux publics pour garantir la réussite de vos projets.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Shovel className="w-10 h-10 text-secondary" />, title: "Terrassement", desc: "Nivellement, fouilles et préparation de terrain pour tout type de construction." },
              { icon: <Truck className="w-10 h-10 text-secondary" />, title: "VRD & Assainissement", desc: "Réseaux divers, voirie, canalisations et gestion des eaux pluviales." },
              { icon: <Hammer className="w-10 h-10 text-secondary" />, title: "Aménagements", desc: "Création d'allées, parkings, enrobés et finitions extérieures soignées." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.25, ease: "easeOut" } }}
              >
                <Card className="h-full border-2 border-transparent hover:border-secondary hover:shadow-2xl transition-all duration-300 group cursor-default">
                  <CardContent className="p-8">
                    <div className="bg-primary/5 p-4 rounded-xl w-fit mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
                      {item.icon}
                    </div>
                    <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">{item.title}</h4>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/expertises">
              <Button variant="link" className="text-primary font-bold text-lg">
                Découvrir toutes nos expertises <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* ── Recent Projects ───────────────────────────────────────────────── */}
      <section className="py-24 bg-muted/30 clip-diagonal">
        <div className="container mx-auto px-4 pb-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-primary font-bold tracking-widest uppercase mb-3">Réalisations</h2>
              <h3 className="text-4xl font-heading font-bold">Derniers Chantiers Livrés</h3>
            </motion.div>
            <Link href="/realisations">
              <Button variant="outline" className="hidden md:flex">Voir tout le portfolio</Button>
            </Link>
          </div>

          {projectsLoading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-80 bg-gray-200 animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {projects?.slice(0, 3).map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="group relative overflow-hidden rounded-2xl shadow-lg aspect-[4/3] cursor-pointer"
                >
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <Badge className="bg-secondary text-secondary-foreground mb-2">{project.category}</Badge>
                    <h4 className="text-xl font-bold mb-1">{project.title}</h4>
                    <p className="text-sm text-gray-300 line-clamp-2">{project.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-8 text-center md:hidden">
            <Link href="/realisations">
              <Button variant="outline">Voir tout le portfolio</Button>
            </Link>
          </div>
        </div>
      </section>
      {/* ── Stats / Animated Counters ─────────────────────────────────────── */}
      <section className="py-20 bg-muted/40 text-foreground border-y border-border relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "15+", label: "Années d'Expérience" },
              { number: "500+", label: "Projets Réalisés" },
              { number: "50+", label: "Experts Qualifiés" },
              { number: "98%", label: "Clients Satisfaits" },
            ].map((stat, i) => (
              <AnimatedStat key={i} number={stat.number} label={stat.label} index={i} />
            ))}
          </div>
        </div>
      </section>
      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-primary font-bold tracking-widest uppercase mb-3">Témoignages</h2>
            <h3 className="text-4xl font-heading font-bold">Ils Nous Font Confiance</h3>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                {testimonialsLoading ? (
                  <CarouselItem className="flex justify-center py-12">Chargement...</CarouselItem>
                ) : (
                  testimonials?.map((testimonial) => (
                    <CarouselItem key={testimonial.id}>
                      <div className="p-6">
                        <Card className="bg-muted/30 border-none shadow-sm">
                          <CardContent className="flex flex-col items-center text-center p-10">
                            <div className="flex gap-1 mb-6">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <svg key={i} className="w-5 h-5 text-secondary fill-current" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <p className="text-xl md:text-2xl font-medium italic text-foreground/80 mb-8">
                              "{testimonial.content}"
                            </p>
                            <div>
                              <div className="font-bold text-lg">{testimonial.clientName}</div>
                              <div className="text-muted-foreground">{testimonial.role}, {testimonial.company}</div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))
                )}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        </div>
      </section>
      {/* ── Partners Carousel — pause on hover ───────────────────────────── */}
      {partners && partners.length > 0 && (
        <section className="py-16 overflow-hidden bg-muted/30">
          <motion.div
            className="container mx-auto px-4 mb-8 text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-primary font-bold tracking-widest uppercase mb-3 text-sm">Nos Partenaires</h2>
            <h3 className="text-2xl font-heading font-bold">Ils nous font confiance</h3>
          </motion.div>

          <div
            className="overflow-x-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              className="py-6 flex items-center animate-partners-scroll"
              style={{ animationPlayState: paused ? "paused" : "running" }}
            >
              {/* Render twice — animation moves by -50% for seamless loop */}
              {[...partners, ...partners].map((partner, i) => (
                <div
                  key={`${partner.id}-${i}`}
                  className="mx-6 flex-shrink-0 flex items-center justify-center bg-white rounded-xl shadow-md border border-gray-100 px-6 py-4"
                  style={{ width: "180px", height: "100px" }}
                >
                  <img
                    src={partner.logoUrl}
                    alt={partner.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const el = e.currentTarget;
                      el.style.display = "none";
                      const parent = el.parentElement;
                      if (parent) {
                        parent.innerHTML = `<span style="font-size:12px;font-weight:600;color:#333;text-align:center">${partner.name}</span>`;
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* ── CTA Section ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-muted/40 border-y border-border relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(15,23,42,0.5) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #F5A623 0%, transparent 70%)', transform: 'translate(-30%, -30%)' }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #F5A623 0%, transparent 70%)', transform: 'translate(30%, 30%)' }} />
        <motion.div
          className="container relative z-10 mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Un projet en tête ?
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto mb-10">
            Contactez notre équipe d'experts pour une étude personnalisée et gratuite de votre chantier.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-white hover:text-primary font-bold text-lg px-10 h-16 shadow-lg shadow-black/20">
              Parlons de votre projet
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
