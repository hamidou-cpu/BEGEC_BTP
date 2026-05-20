import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Expertise from "@/pages/Expertise";
import Portfolio from "@/pages/Portfolio";
import Contact from "@/pages/Contact";
import Quote from "@/pages/Quote";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/not-found";

function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/a-propos" component={About} />
          <Route path="/expertises" component={Expertise} />
          <Route path="/realisations" component={Portfolio} />
          <Route path="/contact" component={Contact} />
          <Route path="/devis" component={Quote} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function Router() {
  const [location] = useLocation();
  if (location.startsWith("/admin")) {
    return <Admin />;
  }
  return <PublicLayout />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
