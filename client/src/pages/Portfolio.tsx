import { useRef, useState, forwardRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/hooks/use-projects";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Calendar, X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@shared/schema";

const directionVariants = [
  { hidden: { opacity: 0, x: -70, y: 0 }, visible: { opacity: 1, x: 0, y: 0 } },
  { hidden: { opacity: 0, x: 0,  y: 60 }, visible: { opacity: 1, x: 0, y: 0 } },
  { hidden: { opacity: 0, x: 70, y: 0 },  visible: { opacity: 1, x: 0, y: 0 } },
];

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}

const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ project, index, onOpen }, forwardedRef) => {
    const inViewRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(inViewRef, { once: true, margin: "-80px" });
    const variant = directionVariants[index % 3];

    const mergedRef = useCallback(
      (node: HTMLDivElement | null) => {
        (inViewRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [forwardedRef]
    );

    return (
      <motion.div
        ref={mergedRef}
        layout
        variants={variant}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="group"
      >
        <div
          className="relative overflow-hidden rounded-2xl shadow-lg aspect-[4/3] mb-4 bg-muted cursor-pointer"
          onClick={() => onOpen(project)}
        >
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <span className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 px-4 py-2 rounded-full">
              Voir en grand
            </span>
          </div>
          <div className="absolute top-4 right-4">
            <Badge className="bg-white/90 text-primary hover:bg-white backdrop-blur-sm shadow-sm">
              {project.category}
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-1">
            {project.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {project.location}
              </div>
            )}
            {project.completionDate && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {project.completionDate}
              </div>
            )}
          </div>
          <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {project.description}
          </p>
        </div>
      </motion.div>
    );
  }
);

ProjectCard.displayName = "ProjectCard";

export default function Portfolio() {
  const { data: projects, isLoading } = useProjects();
  const [filter, setFilter] = useState("Tous");
  const [lightbox, setLightbox] = useState<Project | null>(null);

  const categories = ["Tous", "Terrassement", "VRD", "Assainissement", "Aménagement"];

  const filteredProjects = projects?.filter(p =>
    filter === "Tous" || p.category.includes(filter)
  );

  const closeLightbox = () => setLightbox(null);

  const navigateLightbox = (dir: "prev" | "next") => {
    if (!lightbox || !filteredProjects) return;
    const idx = filteredProjects.findIndex(p => p.id === lightbox.id);
    const next =
      dir === "next"
        ? filteredProjects[(idx + 1) % filteredProjects.length]
        : filteredProjects[(idx - 1 + filteredProjects.length) % filteredProjects.length];
    setLightbox(next);
  };

  return (
    <div className="pt-24 min-h-screen pb-24 bg-background">
      <div className="container mx-auto px-4">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Badge className="bg-secondary text-secondary-foreground mb-4">Portfolio</Badge>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-primary">
            Nos Réalisations
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez la qualité de notre travail à travers nos chantiers récents.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={filter === cat ? "default" : "outline"}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-6 ${
                filter === cat
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-transparent hover:bg-muted"
              }`}
            >
              {cat}
            </Button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            [1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="space-y-4">
                <Skeleton className="h-64 w-full rounded-2xl" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredProjects?.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onOpen={setLightbox}
                />
              ))}
            </AnimatePresence>
          )}
        </div>

        {filteredProjects?.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            Aucun projet trouvé dans cette catégorie.
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors z-10"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </button>

            <button
              className="absolute left-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); navigateLightbox("prev"); }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              className="absolute right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); navigateLightbox("next"); }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.div
              key={lightbox.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="max-w-5xl w-full mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={lightbox.imageUrl}
                  alt={lightbox.title}
                  className="w-full max-h-[70vh] object-contain bg-black"
                />
              </div>
              <div className="mt-4 text-center text-white">
                <div className="flex items-center justify-center gap-4 text-sm text-white/60 mb-2">
                  <Badge className="bg-primary/80 text-white">{lightbox.category}</Badge>
                  {lightbox.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {lightbox.location}
                    </span>
                  )}
                  {lightbox.completionDate && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {lightbox.completionDate}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-bold">{lightbox.title}</h2>
                <p className="text-white/70 mt-2 max-w-2xl mx-auto text-sm">{lightbox.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
