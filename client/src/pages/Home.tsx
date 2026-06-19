import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Shovel, Truck, HardHat, Hammer } from "lucide-react";
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

export default function Home() {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: testimonials, isLoading: testimonialsLoading } = useTestimonials();
  const { data: partners } = usePartners();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          {/* Construction/excavation site hero */}
          <img
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
            alt="Excavator on construction site"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="container relative z-10 px-4 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-white"
          >
            <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary mb-6 px-4 py-1 text-sm font-bold uppercase tracking-wider">
              Expertise & Fiabilité
            </Badge>
            <h1 className="text-5xl md:text-7xl font-heading font-extrabold leading-tight mb-6">
              Bâtir l'Avenir sur des <span className="text-secondary">Fondations Solides</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed">
              Spécialistes du terrassement, VRD et aménagements extérieurs. 
              Nous apportons une expertise technique de pointe à chaque chantier, du résidentiel aux grands projets publics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/devis">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-lg px-8 h-14">
                  Demander un devis
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/realisations">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 font-bold text-lg px-8 h-14">
                  Nos Réalisations
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Expertise Summary */}
      <section className="py-24 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-primary font-bold tracking-widest uppercase mb-3">Notre Savoir-Faire</h2>
            <h3 className="text-4xl font-heading font-bold mb-6">Des Solutions Complètes pour Vos Chantiers</h3>
            <p className="text-muted-foreground text-lg">
              Nous maîtrisons l'ensemble de la chaîne de valeur des travaux publics pour garantir la réussite de vos projets.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shovel className="w-10 h-10 text-secondary" />,
                title: "Terrassement",
                desc: "Nivellement, fouilles et préparation de terrain pour tout type de construction."
              },
              {
                icon: <Truck className="w-10 h-10 text-secondary" />,
                title: "VRD & Assainissement",
                desc: "Réseaux divers, voirie, canalisations et gestion des eaux pluviales."
              },
              {
                icon: <Hammer className="w-10 h-10 text-secondary" />,
                title: "Aménagements",
                desc: "Création d'allées, parkings, enrobés et finitions extérieures soignées."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl hover:border-secondary transition-all duration-300 group cursor-default">
                  <CardContent className="p-8">
                    <div className="bg-primary/5 p-4 rounded-xl w-fit mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                      {item.icon}
                    </div>
                    <h4 className="text-xl font-bold mb-3">{item.title}</h4>
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

      {/* Recent Projects Preview */}
      <section className="py-24 bg-muted/50 clip-diagonal">
        <div className="container mx-auto px-4 pb-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-primary font-bold tracking-widest uppercase mb-3">Réalisations</h2>
              <h3 className="text-4xl font-heading font-bold">Derniers Chantiers Livrés</h3>
            </div>
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
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-2xl shadow-lg aspect-[4/3]"
                >
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform">
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

      {/* Stats / Trust */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "15+", label: "Années d'Expérience" },
              { number: "500+", label: "Projets Réalisés" },
              { number: "50", label: "Experts Qualifiés" },
              { number: "98%", label: "Clients Satisfaits" }
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                className="p-4"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl md:text-5xl font-heading font-extrabold text-secondary mb-2">{stat.number}</div>
                <div className="text-primary-foreground/80 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-primary font-bold tracking-widest uppercase mb-3">Témoignages</h2>
            <h3 className="text-4xl font-heading font-bold">Ils Nous Font Confiance</h3>
          </div>

          <div className="max-w-4xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                {testimonialsLoading ? (
                  <CarouselItem className="flex justify-center py-12">Chargement...</CarouselItem>
                ) : (
                  testimonials?.map((testimonial) => (
                    <CarouselItem key={testimonial.id} className="md:basis-1/1 lg:basis-1/1">
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

      {/* Partners Carousel Section */}
      {partners && partners.length > 0 && (
        <section className="py-16 bg-muted/30 overflow-hidden">
          <div className="container mx-auto px-4 mb-8 text-center">
            <h2 className="text-primary font-bold tracking-widest uppercase mb-3 text-sm">Nos Partenaires</h2>
            <h3 className="text-2xl font-heading font-bold">Ils nous font confiance</h3>
          </div>
          
          <div className="relative flex overflow-x-hidden group">
            <div className="py-8 animate-marquee whitespace-nowrap flex items-center">
              {partners.concat(partners).map((partner, i) => (
                <div key={`${partner.id}-${i}`} className="mx-14 flex items-center justify-center">
                  <img 
                    src={partner.logoUrl} 
                    alt={partner.name} 
                    className="h-24 md:h-32 w-auto object-contain"
                  />
                </div>
              ))}
            </div>

            <div className="absolute top-0 py-8 animate-marquee2 whitespace-nowrap flex items-center">
              {partners.concat(partners).map((partner, i) => (
                <div key={`${partner.id}-clone-${i}`} className="mx-14 flex items-center justify-center">
                  <img 
                    src={partner.logoUrl} 
                    alt={partner.name} 
                    className="h-24 md:h-32 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-primary relative overflow-hidden">
        {/* Abstract pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
            Un projet en tête ?
          </h2>
          <p className="text-primary-foreground/80 text-xl max-w-2xl mx-auto mb-10">
            Contactez notre équipe d'experts pour une étude personnalisée et gratuite de votre chantier.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-white hover:text-primary font-bold text-lg px-10 h-16 shadow-lg shadow-black/20">
              Parlons de votre projet
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
