import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertQuoteSchema, type InsertQuoteRequest } from "@shared/routes";
import { useQuote } from "@/hooks/use-quotes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, ChevronRight, ChevronLeft } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";

const steps = ["Coordonnées", "Projet", "Détails"];

export default function Quote() {
  const [currentStep, setCurrentStep] = useState(0);
  const mutation = useQuote();

  const form = useForm<InsertQuoteRequest>({
    resolver: zodResolver(insertQuoteSchema),
    defaultValues: {
      name: "", email: "", phone: "",
      projectType: "", description: "",
      location: "", estimatedStartDate: "",
    },
    mode: "onChange",
  });

  const nextStep = async () => {
    let fieldsToValidate: (keyof InsertQuoteRequest)[] = [];
    if (currentStep === 0) fieldsToValidate = ["name", "email", "phone"];
    if (currentStep === 1) fieldsToValidate = ["projectType", "description"];
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => setCurrentStep(prev => prev - 1);

  function onSubmit(data: InsertQuoteRequest) {
    mutation.mutate(data, { onSuccess: () => setCurrentStep(3) });
  }

  const progress = ((currentStep + 1) / 3) * 100;

  if (currentStep === 3) {
    return (
      <div className="pt-32 min-h-screen pb-24 container mx-auto px-4 max-w-2xl text-center">
        <ScrollReveal direction="scale">
          <div className="bg-green-100 dark:bg-green-900/30 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
            <Check className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-heading font-bold mb-4">Demande Envoyée !</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Merci de nous avoir confié votre projet. Notre équipe technique va étudier votre demande et vous recontactera sous 48h avec une proposition chiffrée.
          </p>
          <Button onClick={() => window.location.href = "/"} variant="outline">
            Retour à l'accueil
          </Button>
        </ScrollReveal>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen pb-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-3xl">

        <ScrollReveal direction="up">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-heading font-bold mb-4 text-primary">Demande de Devis Gratuit</h1>
            <p className="text-muted-foreground">Remplissez ce formulaire pour recevoir une estimation précise.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.1}>
          <div className="mb-8">
            <div className="flex justify-between text-sm font-medium mb-2 text-muted-foreground">
              {steps.map((step, i) => (
                <span key={step} className={i <= currentStep ? "text-primary font-bold" : ""}>
                  {i + 1}. {step}
                </span>
              ))}
            </div>
            <Progress value={Math.min(progress, 100)} className="h-2" />
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <Card className="border-none shadow-xl">
            <CardHeader>
              <CardTitle>{steps[currentStep]}</CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                  <AnimatePresence mode="wait">
                    {currentStep === 0 && (
                      <motion.div
                        key="step0"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-6"
                      >
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nom complet / Entreprise</FormLabel>
                              <FormControl>
                                <Input placeholder="Votre nom" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email professionnel</FormLabel>
                                <FormControl>
                                  <Input placeholder="email@domaine.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Téléphone</FormLabel>
                                <FormControl>
                                  <Input placeholder="06 12 34 56 78" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-6"
                      >
                        <FormField
                          control={form.control}
                          name="projectType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Type de projet</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez une catégorie" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Terrassement">Terrassement</SelectItem>
                                  <SelectItem value="VRD">VRD & Assainissement</SelectItem>
                                  <SelectItem value="Aménagement">Aménagement Extérieur</SelectItem>
                                  <SelectItem value="Génie Civil">Génie Civil</SelectItem>
                                  <SelectItem value="Autre">Autre</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description détaillée</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Décrivez votre projet, les contraintes, les surfaces approximatives..."
                                  className="min-h-[150px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>
                    )}

                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-6"
                      >
                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Lieu du chantier</FormLabel>
                              <FormControl>
                                <Input placeholder="Ville, Code Postal" {...field} value={field.value || ""} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="estimatedStartDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Date de début souhaitée</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Quand souhaitez-vous démarrer ?" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Dès que possible">Dès que possible</SelectItem>
                                  <SelectItem value="Dans 1 mois">Dans 1 mois</SelectItem>
                                  <SelectItem value="Dans 3 mois">Dans 3 mois</SelectItem>
                                  <SelectItem value="Plus de 6 mois">Plus de 6 mois</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex justify-between pt-6 border-t mt-6">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={prevStep}
                      disabled={currentStep === 0}
                      className={currentStep === 0 ? "invisible" : ""}
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Précédent
                    </Button>

                    {currentStep < 2 ? (
                      <Button type="button" onClick={nextStep} className="bg-primary hover:bg-primary/90">
                        Suivant
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button type="submit" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold" disabled={mutation.isPending}>
                        {mutation.isPending ? "Envoi..." : "Envoyer la demande"}
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </ScrollReveal>

      </div>
    </div>
  );
}
