import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatePresence, motion } from "framer-motion";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Expertise from "@/pages/Expertise";
import Portfolio from "@/pages/Portfolio";
import Contact from "@/pages/Contact";
import Quote from "@/pages/Quote";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/not-found";

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } },
};

function AppContent() {
  const [location] = useLocation();
  const isAdmin = location.startsWith("/admin");

  if (isAdmin) {
    return (
      <>
        <Switch>
          <Route path="/admin" component={Admin} />
        </Switch>
        <Toaster />
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/a-propos" component={About} />
              <Route path="/expertises" component={Expertise} />
              <Route path="/realisations" component={Portfolio} />
              <Route path="/contact" component={Contact} />
              <Route path="/devis" component={Quote} />
              <Route component={NotFound} />
            </Switch>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContent />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
