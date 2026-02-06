import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/hooks/use-projects";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Calendar } from "lucide-react";

export default function Portfolio() {
  const { data: projects, isLoading } = useProjects();
  const [filter, setFilter] = useState("Tous");

  const categories = ["Tous", "Terrassement", "VRD", "Assainissement", "Aménagement"];

  const filteredProjects = projects?.filter(p => 
    filter === "Tous" || p.category.includes(filter)
  );

  return (
    <div className="pt-24 min-h-screen pb-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-secondary text-secondary-foreground mb-4">Portfolio</Badge>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-primary">
            Nos Réalisations
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez la qualité de notre travail à travers nos chantiers récents.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
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
        </div>

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
              {filteredProjects?.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-[4/3] mb-4 bg-muted">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
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
    </div>
  );
}
