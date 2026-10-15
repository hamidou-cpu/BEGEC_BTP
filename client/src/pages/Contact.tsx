import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema, type InsertContactMessage } from "@shared/routes";
import { useContact } from "@/hooks/use-contact";
import { useSetting } from "@/hooks/use-settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function Contact() {
  const mutation = useContact();

  const phone = useSetting("phone", "(+224) 622 21 34 67");
  const email = useSetting("email", "contact@begecgroup.com");
  const address = useSetting("address", "CARREFOUR IPS, KIPE, COMMUNE DE RATOMA");
  const hours = useSetting("hours", "Lun - Ven: 8h00 - 18h00\nSamedi: Sur rendez-vous");

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" },
  });

  function onSubmit(data: InsertContactMessage) {
    mutation.mutate(data, { onSuccess: () => form.reset() });
  }

  const hoursLines = hours.split("\n");

  const contactItems = [
    { icon: <MapPin className="w-5 h-5" />, title: "Adresse", lines: address.split(",").map(s => s.trim()).filter(Boolean) },
    { icon: <Phone className="w-5 h-5" />, title: "Téléphone", lines: [phone] },
    { icon: <Mail className="w-5 h-5" />, title: "Email", lines: [email] },
    { icon: <Clock className="w-5 h-5" />, title: "Horaires", lines: hoursLines },
  ];

  return (
    <div className="min-h-screen">

      {/* ── Hero Banner ─────────────────────────────────────────────────────── */}
      <section
        className="relative pt-36 pb-24 overflow-hidden bg-muted/30 border-b border-border"
      >
        {/* Dot grid overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(15,23,42,0.5) 1px, transparent 0)', backgroundSize: '36px 36px' }} />
        {/* Glow blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #F27100 0%, transparent 65%)', transform: 'translate(20%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-8" style={{ background: 'radial-gradient(circle, #F27100 0%, transparent 65%)', transform: 'translate(-30%, 30%)' }} />

        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.span
            className="inline-block px-4 py-1 rounded-full text-sm font-bold tracking-widest uppercase mb-5"
            style={{ background: 'rgba(242,113,0,0.2)', color: '#F27100', border: '1px solid rgba(242,113,0,0.4)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Contactez-nous
          </motion.span>
          <motion.h1
            className="text-4xl md:text-6xl font-heading font-extrabold text-foreground mb-5 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            Discutons de{" "}
            <span style={{ color: '#F27100' }}>Votre Projet</span>
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground max-w-xl mx-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Notre équipe d'experts est à votre écoute pour répondre à toutes vos questions.
          </motion.p>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 md:h-16 block">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" className="fill-background" />
          </svg>
        </div>
      </section>

      {/* ── Contact Info + Form ─────────────────────────────────────────────── */}
      <section className="pb-24 pt-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* ── Info Side ─────────────────────────────────────────────── */}
            <div>
              <div className="grid gap-5 mb-10">
                {contactItems.map((item, i) => (
                  <ScrollReveal key={i} direction="left" delay={0.05 + i * 0.1}>
                    <div
                      className="flex gap-4 p-5 rounded-2xl border border-primary/10 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300"
                      data-testid={`contact-info-${i}`}
                    >
                      <div
                        className="flex items-center justify-center w-11 h-11 rounded-xl shrink-0 text-white"
                        style={{ background: 'linear-gradient(135deg, #1F3C88, #2d57c7)' }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-base mb-1 text-foreground">{item.title}</h3>
                        {item.lines.map((line, j) => (
                          <p key={j} className="text-muted-foreground text-sm leading-relaxed">{line}</p>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* Map placeholder */}
              <ScrollReveal direction="up" delay={0.45}>
                <div className="h-56 rounded-2xl overflow-hidden relative bg-muted/40 border border-border">
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ background: '#F27100' }}
                    >
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-primary">Conakry, Guinée</p>
                    <p className="text-xs text-muted-foreground">Carrefour IPS, Kipé — Commune de Ratoma</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* ── Form Side ─────────────────────────────────────────────── */}
            <ScrollReveal direction="right" delay={0.1}>
              <div
                className="rounded-3xl overflow-hidden shadow-2xl bg-card border border-border"
              >
                {/* Form header */}
                <div className="px-8 pt-8 pb-6 border-b border-border">
                  <h2 className="text-2xl font-bold text-foreground">Envoyez-nous un message</h2>
                  <p className="text-muted-foreground text-sm mt-1">Réponse sous 24h ouvrées</p>
                </div>

                <div className="px-8 py-8">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                      <div className="grid md:grid-cols-2 gap-5">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground text-sm font-medium">Nom complet</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Jean Dupont"
                                  {...field}
                                   className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground focus:border-[#F27100] focus:ring-[#F27100]/20"
                                  data-testid="input-name"
                                />
                              </FormControl>
                               <FormMessage className="text-destructive text-xs" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground text-sm font-medium">Email</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="jean@exemple.fr"
                                  {...field}
                                   className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground focus:border-[#F27100] focus:ring-[#F27100]/20"
                                  data-testid="input-email"
                                />
                              </FormControl>
                               <FormMessage className="text-destructive text-xs" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground text-sm font-medium">Téléphone</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="06 12 34 56 78"
                                  {...field}
                                  value={field.value || ""}
                                   className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground focus:border-[#F27100] focus:ring-[#F27100]/20"
                                  data-testid="input-phone"
                                />
                              </FormControl>
                               <FormMessage className="text-destructive text-xs" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground text-sm font-medium">Sujet</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Renseignement..."
                                  {...field}
                                   className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground focus:border-[#F27100] focus:ring-[#F27100]/20"
                                  data-testid="input-subject"
                                />
                              </FormControl>
                               <FormMessage className="text-destructive text-xs" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground text-sm font-medium">Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Détaillez votre demande ici..."
                                 className="min-h-[140px] bg-muted/50 border-border text-foreground placeholder:text-muted-foreground focus:border-[#F27100] focus:ring-[#F27100]/20 resize-none"
                                {...field}
                                data-testid="textarea-message"
                              />
                            </FormControl>
                             <FormMessage className="text-destructive text-xs" />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full font-bold h-12 text-base gap-2 text-primary-foreground"
                        style={{ background: 'linear-gradient(135deg, #F27100, #F27100)' }}
                        disabled={mutation.isPending}
                        data-testid="button-submit"
                      >
                        {mutation.isPending ? (
                          "Envoi en cours..."
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Envoyer le message
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

    </div>
  );
}
