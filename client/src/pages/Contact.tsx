import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema, type InsertContactMessage } from "@shared/routes";
import { useContact } from "@/hooks/use-contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Contact() {
  const mutation = useContact();
  
  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    }
  });

  function onSubmit(data: InsertContactMessage) {
    mutation.mutate(data, {
      onSuccess: () => form.reset()
    });
  }

  return (
    <div className="pt-24 min-h-screen pb-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Info Side */}
          <div>
            <Badge className="bg-secondary text-secondary-foreground mb-4">Contact</Badge>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-primary">
              Discutons de Votre Projet
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              Une question ? Besoin d'un renseignement ? Notre équipe est à votre écoute pour vous répondre dans les plus brefs délais.
            </p>

            <div className="grid gap-8">
              {[
                { icon: <MapPin className="w-6 h-6" />, title: "Adresse", lines: ["123 Rue de la Construction", "75000 Paris, France"] },
                { icon: <Phone className="w-6 h-6" />, title: "Téléphone", lines: ["+33 1 23 45 67 89", "Du lundi au vendredi"] },
                { icon: <Mail className="w-6 h-6" />, title: "Email", lines: ["contact@begectp.fr", "Réponse sous 24h"] },
                { icon: <Clock className="w-6 h-6" />, title: "Horaires", lines: ["Lun - Ven: 8h00 - 18h00", "Samedi: Sur rendez-vous"] },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="bg-primary/5 p-3 h-fit rounded-lg text-primary">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    {item.lines.map((line, j) => (
                      <p key={j} className="text-muted-foreground">{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Visual placeholder for Map */}
            <div className="mt-12 h-64 bg-muted rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50 font-bold bg-muted-foreground/10">
                <MapPin className="w-8 h-8 mr-2" />
                Carte Interactive
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:pt-12">
            <Card className="border-none shadow-2xl bg-white dark:bg-card">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom complet</FormLabel>
                            <FormControl>
                              <Input placeholder="Jean Dupont" {...field} className="bg-muted/50" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="jean@exemple.fr" {...field} className="bg-muted/50" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Téléphone</FormLabel>
                            <FormControl>
                              <Input placeholder="06 12 34 56 78" {...field} value={field.value || ""} className="bg-muted/50" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sujet</FormLabel>
                            <FormControl>
                              <Input placeholder="Renseignement..." {...field} className="bg-muted/50" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Détaillez votre demande ici..." 
                              className="min-h-[150px] bg-muted/50 resize-none" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-primary text-white hover:bg-primary/90 font-bold h-12 text-lg"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? "Envoi en cours..." : "Envoyer le message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
