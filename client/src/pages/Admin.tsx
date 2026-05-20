import { useState } from "react";
import { useQuery, useMutation, useQueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Trash2, Plus, Pencil, LogOut, Mail, FileText, FolderOpen,
  Users, Handshake, Star, Eye, EyeOff, HardHat,
} from "lucide-react";
import type { ContactMessage, QuoteRequest, Project, Testimonial, TeamMember, Partner } from "@shared/schema";

const TOKEN_KEY = "begec_admin_token";

function getToken() {
  return localStorage.getItem(TOKEN_KEY) || "";
}

function authHeaders() {
  return { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` };
}

async function apiReq(method: string, path: string, body?: unknown) {
  const res = await fetch(path, {
    method,
    headers: authHeaders(),
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Erreur inconnue" }));
    throw new Error(err.message || "Erreur serveur");
  }
  return res.json();
}

// ─── LOGIN ───────────────────────────────────────────────────────────────────

function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await apiReq("POST", "/api/admin/login", { username, password });
      localStorage.setItem(TOKEN_KEY, data.token);
      onLogin();
    } catch {
      setError("Identifiants incorrects");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="bg-primary p-4 rounded-2xl">
              <HardHat className="w-10 h-10 text-secondary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">BEGEC TP — Administration</CardTitle>
          <p className="text-muted-foreground text-sm">Panneau de gestion du site web</p>
        </CardHeader>
        <CardContent className="pt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username">Nom d'utilisateur</Label>
              <Input
                id="username"
                data-testid="input-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  data-testid="input-password"
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowPass((v) => !v)}
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            {error && <p className="text-destructive text-sm font-medium">{error}</p>}
            <Button
              type="submit"
              data-testid="button-login"
              className="w-full bg-primary text-white font-bold h-11"
              disabled={loading}
            >
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── GENERIC CONFIRM DELETE ──────────────────────────────────────────────────

function DeleteButton({ onDelete, label = "Supprimer" }: { onDelete: () => void; label?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm" data-testid="button-delete">
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Confirmer la suppression</DialogTitle>
        </DialogHeader>
        <p className="text-muted-foreground">Cette action est irréversible. Continuer ?</p>
        <div className="flex gap-3 mt-4">
          <Button variant="outline" className="flex-1" onClick={() => setOpen(false)}>Annuler</Button>
          <Button variant="destructive" className="flex-1" onClick={() => { onDelete(); setOpen(false); }}>
            {label}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── CONTACTS TAB ────────────────────────────────────────────────────────────

function ContactsTab() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const { data: contacts = [], isLoading } = useQuery<ContactMessage[]>({
    queryKey: ["/api/admin/contacts"],
    queryFn: () => apiReq("GET", "/api/admin/contacts"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiReq("DELETE", `/api/admin/contacts/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/admin/contacts"] }); toast({ title: "Message supprimé" }); },
  });

  if (isLoading) return <div className="p-8 text-center text-muted-foreground">Chargement...</div>;

  return (
    <div className="space-y-4">
      {contacts.length === 0 && (
        <Card><CardContent className="p-8 text-center text-muted-foreground">Aucun message de contact</CardContent></Card>
      )}
      {contacts.map((c) => (
        <Card key={c.id} data-testid={`card-contact-${c.id}`}>
          <CardContent className="p-5">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-bold">{c.name}</span>
                  <Badge variant="outline">{c.email}</Badge>
                  {c.phone && <Badge variant="secondary">{c.phone}</Badge>}
                </div>
                <p className="font-medium text-sm text-primary mb-1">{c.subject}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">{c.message}</p>
                {c.createdAt && (
                  <p className="text-xs text-muted-foreground/60 mt-2">
                    {new Date(c.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </p>
                )}
              </div>
              <DeleteButton onDelete={() => deleteMutation.mutate(c.id)} label="Supprimer le message" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ─── QUOTES TAB ──────────────────────────────────────────────────────────────

function QuotesTab() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const { data: quotes = [], isLoading } = useQuery<QuoteRequest[]>({
    queryKey: ["/api/admin/quotes"],
    queryFn: () => apiReq("GET", "/api/admin/quotes"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiReq("DELETE", `/api/admin/quotes/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/admin/quotes"] }); toast({ title: "Demande supprimée" }); },
  });

  if (isLoading) return <div className="p-8 text-center text-muted-foreground">Chargement...</div>;

  return (
    <div className="space-y-4">
      {quotes.length === 0 && (
        <Card><CardContent className="p-8 text-center text-muted-foreground">Aucune demande de devis</CardContent></Card>
      )}
      {quotes.map((q) => (
        <Card key={q.id} data-testid={`card-quote-${q.id}`}>
          <CardContent className="p-5">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-bold">{q.name}</span>
                  <Badge variant="outline">{q.email}</Badge>
                  <Badge className="bg-secondary text-secondary-foreground">{q.projectType}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  📍 {q.location || "N/A"} · 📞 {q.phone}
                  {q.estimatedStartDate && ` · 🗓 ${q.estimatedStartDate}`}
                </p>
                <p className="text-sm text-muted-foreground line-clamp-2">{q.description}</p>
                {q.createdAt && (
                  <p className="text-xs text-muted-foreground/60 mt-2">
                    {new Date(q.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </p>
                )}
              </div>
              <DeleteButton onDelete={() => deleteMutation.mutate(q.id)} label="Supprimer la demande" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ─── PROJECTS TAB ────────────────────────────────────────────────────────────

const PROJECT_CATEGORIES = ["Route & Infrastructure", "Terrassement", "VRD", "Assainissement", "Génie Civil", "Aménagement Extérieur"];

function ProjectForm({ initial, onSave, onClose }: {
  initial?: Partial<Project>;
  onSave: (data: Partial<Project>) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    title: initial?.title || "",
    category: initial?.category || "",
    description: initial?.description || "",
    imageUrl: initial?.imageUrl || "",
    location: initial?.location || "",
    completionDate: initial?.completionDate || "",
  });

  function set(key: string, val: string) { setForm((f) => ({ ...f, [key]: val })); }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Label>Titre</Label>
          <Input value={form.title} onChange={(e) => set("title", e.target.value)} className="mt-1" data-testid="input-project-title" />
        </div>
        <div>
          <Label>Catégorie</Label>
          <Select value={form.category} onValueChange={(v) => set("category", v)}>
            <SelectTrigger className="mt-1" data-testid="select-project-category">
              <SelectValue placeholder="Choisir..." />
            </SelectTrigger>
            <SelectContent>
              {PROJECT_CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Localisation</Label>
          <Input value={form.location} onChange={(e) => set("location", e.target.value)} className="mt-1" data-testid="input-project-location" />
        </div>
        <div className="col-span-2">
          <Label>URL de l'image</Label>
          <Input value={form.imageUrl} onChange={(e) => set("imageUrl", e.target.value)} className="mt-1" data-testid="input-project-image" />
        </div>
        <div>
          <Label>Année de livraison</Label>
          <Input value={form.completionDate} onChange={(e) => set("completionDate", e.target.value)} placeholder="2024" className="mt-1" />
        </div>
        <div className="col-span-2">
          <Label>Description</Label>
          <Textarea value={form.description} onChange={(e) => set("description", e.target.value)} className="mt-1 resize-none" rows={3} data-testid="textarea-project-description" />
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <Button variant="outline" className="flex-1" onClick={onClose}>Annuler</Button>
        <Button className="flex-1 bg-primary text-white" onClick={() => onSave(form)} data-testid="button-save-project">Enregistrer</Button>
      </div>
    </div>
  );
}

function ProjectsTab() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const { data: projs = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
    queryFn: () => fetch("/api/projects").then((r) => r.json()),
  });

  const createMutation = useMutation({
    mutationFn: (data: Partial<Project>) => apiReq("POST", "/api/admin/projects", data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/projects"] }); toast({ title: "Projet créé" }); setShowAdd(false); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Project> }) => apiReq("PATCH", `/api/admin/projects/${id}`, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/projects"] }); toast({ title: "Projet mis à jour" }); setEditProject(null); },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiReq("DELETE", `/api/admin/projects/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/projects"] }); toast({ title: "Projet supprimé" }); },
  });

  if (isLoading) return <div className="p-8 text-center text-muted-foreground">Chargement...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={showAdd} onOpenChange={setShowAdd}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-white" data-testid="button-add-project">
              <Plus className="w-4 h-4 mr-2" /> Ajouter un projet
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Nouveau projet</DialogTitle></DialogHeader>
            <ProjectForm onSave={(d) => createMutation.mutate(d)} onClose={() => setShowAdd(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {projs.map((p) => (
        <Card key={p.id} data-testid={`card-project-${p.id}`}>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <img src={p.imageUrl} alt={p.title} className="w-20 h-16 object-cover rounded-lg shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-bold">{p.title}</p>
                    <div className="flex gap-2 mt-1 flex-wrap">
                      <Badge className="bg-secondary text-secondary-foreground text-xs">{p.category}</Badge>
                      {p.location && <Badge variant="outline" className="text-xs">{p.location}</Badge>}
                      {p.completionDate && <Badge variant="outline" className="text-xs">{p.completionDate}</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{p.description}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Dialog open={editProject?.id === p.id} onOpenChange={(o) => !o && setEditProject(null)}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setEditProject(p)} data-testid={`button-edit-project-${p.id}`}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg">
                        <DialogHeader><DialogTitle>Modifier le projet</DialogTitle></DialogHeader>
                        {editProject && (
                          <ProjectForm
                            initial={editProject}
                            onSave={(d) => updateMutation.mutate({ id: editProject.id, data: d })}
                            onClose={() => setEditProject(null)}
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                    <DeleteButton onDelete={() => deleteMutation.mutate(p.id)} />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ─── TEAM TAB ────────────────────────────────────────────────────────────────

function TeamForm({ initial, onSave, onClose }: {
  initial?: Partial<TeamMember>;
  onSave: (data: Partial<TeamMember>) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    name: initial?.name || "",
    role: initial?.role || "",
    bio: initial?.bio || "",
    imageUrl: initial?.imageUrl || "",
  });
  function set(key: string, val: string) { setForm((f) => ({ ...f, [key]: val })); }

  return (
    <div className="space-y-4">
      <div>
        <Label>Nom complet</Label>
        <Input value={form.name} onChange={(e) => set("name", e.target.value)} className="mt-1" data-testid="input-team-name" />
      </div>
      <div>
        <Label>Poste</Label>
        <Input value={form.role} onChange={(e) => set("role", e.target.value)} className="mt-1" data-testid="input-team-role" />
      </div>
      <div>
        <Label>URL de la photo</Label>
        <Input value={form.imageUrl} onChange={(e) => set("imageUrl", e.target.value)} className="mt-1" data-testid="input-team-image" />
      </div>
      <div>
        <Label>Biographie</Label>
        <Textarea value={form.bio} onChange={(e) => set("bio", e.target.value)} className="mt-1 resize-none" rows={3} />
      </div>
      <div className="flex gap-3 pt-2">
        <Button variant="outline" className="flex-1" onClick={onClose}>Annuler</Button>
        <Button className="flex-1 bg-primary text-white" onClick={() => onSave(form)} data-testid="button-save-team">Enregistrer</Button>
      </div>
    </div>
  );
}

function TeamTab() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const [editMember, setEditMember] = useState<TeamMember | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const { data: team = [], isLoading } = useQuery<TeamMember[]>({
    queryKey: ["/api/team"],
    queryFn: () => fetch("/api/team").then((r) => r.json()),
  });

  const createMutation = useMutation({
    mutationFn: (data: Partial<TeamMember>) => apiReq("POST", "/api/admin/team", data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/team"] }); toast({ title: "Membre ajouté" }); setShowAdd(false); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<TeamMember> }) => apiReq("PATCH", `/api/admin/team/${id}`, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/team"] }); toast({ title: "Membre mis à jour" }); setEditMember(null); },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiReq("DELETE", `/api/admin/team/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/team"] }); toast({ title: "Membre supprimé" }); },
  });

  if (isLoading) return <div className="p-8 text-center text-muted-foreground">Chargement...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={showAdd} onOpenChange={setShowAdd}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-white" data-testid="button-add-team">
              <Plus className="w-4 h-4 mr-2" /> Ajouter un membre
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader><DialogTitle>Nouveau membre de l'équipe</DialogTitle></DialogHeader>
            <TeamForm onSave={(d) => createMutation.mutate(d)} onClose={() => setShowAdd(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {team.map((m) => (
          <Card key={m.id} data-testid={`card-team-${m.id}`}>
            <CardContent className="p-4 flex gap-3">
              <img src={m.imageUrl} alt={m.name} className="w-14 h-14 object-cover rounded-full shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-bold truncate">{m.name}</p>
                <p className="text-xs text-primary font-medium">{m.role}</p>
                {m.bio && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{m.bio}</p>}
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <Dialog open={editMember?.id === m.id} onOpenChange={(o) => !o && setEditMember(null)}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => setEditMember(m)}>
                      <Pencil className="w-3 h-3" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader><DialogTitle>Modifier le membre</DialogTitle></DialogHeader>
                    {editMember && (
                      <TeamForm
                        initial={editMember}
                        onSave={(d) => updateMutation.mutate({ id: editMember.id, data: d })}
                        onClose={() => setEditMember(null)}
                      />
                    )}
                  </DialogContent>
                </Dialog>
                <DeleteButton onDelete={() => deleteMutation.mutate(m.id)} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── PARTNERS TAB ────────────────────────────────────────────────────────────

function PartnerForm({ initial, onSave, onClose }: {
  initial?: Partial<Partner>;
  onSave: (data: Partial<Partner>) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(initial?.name || "");
  const [logoUrl, setLogoUrl] = useState(initial?.logoUrl || "");

  return (
    <div className="space-y-4">
      <div>
        <Label>Nom du partenaire</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1" data-testid="input-partner-name" />
      </div>
      <div>
        <Label>URL du logo</Label>
        <Input value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} className="mt-1" placeholder="https://..." data-testid="input-partner-logo" />
      </div>
      {logoUrl && (
        <div className="p-4 bg-muted rounded-lg flex justify-center">
          <img src={logoUrl} alt={name} className="h-10 object-contain" />
        </div>
      )}
      <div className="flex gap-3 pt-2">
        <Button variant="outline" className="flex-1" onClick={onClose}>Annuler</Button>
        <Button className="flex-1 bg-primary text-white" onClick={() => onSave({ name, logoUrl })} data-testid="button-save-partner">Enregistrer</Button>
      </div>
    </div>
  );
}

function PartnersTab() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const [editPartner, setEditPartner] = useState<Partner | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const { data: partnerList = [], isLoading } = useQuery<Partner[]>({
    queryKey: ["/api/partners"],
    queryFn: () => fetch("/api/partners").then((r) => r.json()),
  });

  const createMutation = useMutation({
    mutationFn: (data: Partial<Partner>) => apiReq("POST", "/api/admin/partners", data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/partners"] }); toast({ title: "Partenaire ajouté" }); setShowAdd(false); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Partner> }) => apiReq("PATCH", `/api/admin/partners/${id}`, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/partners"] }); toast({ title: "Partenaire mis à jour" }); setEditPartner(null); },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiReq("DELETE", `/api/admin/partners/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/partners"] }); toast({ title: "Partenaire supprimé" }); },
  });

  if (isLoading) return <div className="p-8 text-center text-muted-foreground">Chargement...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={showAdd} onOpenChange={setShowAdd}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-white" data-testid="button-add-partner">
              <Plus className="w-4 h-4 mr-2" /> Ajouter un partenaire
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader><DialogTitle>Nouveau partenaire</DialogTitle></DialogHeader>
            <PartnerForm onSave={(d) => createMutation.mutate(d)} onClose={() => setShowAdd(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {partnerList.map((p) => (
          <Card key={p.id} data-testid={`card-partner-${p.id}`}>
            <CardContent className="p-4 flex flex-col items-center gap-3">
              <img src={p.logoUrl} alt={p.name} className="h-10 object-contain" />
              <p className="font-medium text-sm">{p.name}</p>
              <div className="flex gap-2">
                <Dialog open={editPartner?.id === p.id} onOpenChange={(o) => !o && setEditPartner(null)}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => setEditPartner(p)}>
                      <Pencil className="w-3 h-3" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader><DialogTitle>Modifier le partenaire</DialogTitle></DialogHeader>
                    {editPartner && (
                      <PartnerForm
                        initial={editPartner}
                        onSave={(d) => updateMutation.mutate({ id: editPartner.id, data: d })}
                        onClose={() => setEditPartner(null)}
                      />
                    )}
                  </DialogContent>
                </Dialog>
                <DeleteButton onDelete={() => deleteMutation.mutate(p.id)} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── TESTIMONIALS TAB ────────────────────────────────────────────────────────

function TestimonialForm({ initial, onSave, onClose }: {
  initial?: Partial<Testimonial>;
  onSave: (data: Partial<Testimonial>) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    clientName: initial?.clientName || "",
    role: initial?.role || "",
    company: initial?.company || "",
    content: initial?.content || "",
    rating: initial?.rating ?? 5,
  });
  function set(key: string, val: string | number) { setForm((f) => ({ ...f, [key]: val })); }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Nom du client</Label>
          <Input value={form.clientName} onChange={(e) => set("clientName", e.target.value)} className="mt-1" data-testid="input-testimonial-name" />
        </div>
        <div>
          <Label>Note (/5)</Label>
          <Select value={String(form.rating)} onValueChange={(v) => set("rating", Number(v))}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map((n) => (
                <SelectItem key={n} value={String(n)}>{n} étoile{n > 1 ? "s" : ""}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Poste</Label>
          <Input value={form.role} onChange={(e) => set("role", e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label>Entreprise</Label>
          <Input value={form.company} onChange={(e) => set("company", e.target.value)} className="mt-1" />
        </div>
        <div className="col-span-2">
          <Label>Témoignage</Label>
          <Textarea value={form.content} onChange={(e) => set("content", e.target.value)} className="mt-1 resize-none" rows={3} />
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <Button variant="outline" className="flex-1" onClick={onClose}>Annuler</Button>
        <Button className="flex-1 bg-primary text-white" onClick={() => onSave(form)}>Enregistrer</Button>
      </div>
    </div>
  );
}

function TestimonialsTab() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const [editT, setEditT] = useState<Testimonial | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const { data: tlist = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
    queryFn: () => fetch("/api/testimonials").then((r) => r.json()),
  });

  const createMutation = useMutation({
    mutationFn: (data: Partial<Testimonial>) => apiReq("POST", "/api/admin/testimonials", data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/testimonials"] }); toast({ title: "Témoignage ajouté" }); setShowAdd(false); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Testimonial> }) => apiReq("PATCH", `/api/admin/testimonials/${id}`, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/testimonials"] }); toast({ title: "Témoignage mis à jour" }); setEditT(null); },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiReq("DELETE", `/api/admin/testimonials/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/testimonials"] }); toast({ title: "Témoignage supprimé" }); },
  });

  if (isLoading) return <div className="p-8 text-center text-muted-foreground">Chargement...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={showAdd} onOpenChange={setShowAdd}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-white" data-testid="button-add-testimonial">
              <Plus className="w-4 h-4 mr-2" /> Ajouter un témoignage
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Nouveau témoignage</DialogTitle></DialogHeader>
            <TestimonialForm onSave={(d) => createMutation.mutate(d)} onClose={() => setShowAdd(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {tlist.map((t) => (
        <Card key={t.id} data-testid={`card-testimonial-${t.id}`}>
          <CardContent className="p-5">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold">{t.clientName}</span>
                  <div className="flex gap-0.5">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-secondary fill-secondary" />
                    ))}
                  </div>
                </div>
                {(t.role || t.company) && (
                  <p className="text-xs text-primary font-medium mb-2">{t.role}{t.company ? `, ${t.company}` : ""}</p>
                )}
                <p className="text-sm text-muted-foreground italic">"{t.content}"</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Dialog open={editT?.id === t.id} onOpenChange={(o) => !o && setEditT(null)}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => setEditT(t)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader><DialogTitle>Modifier le témoignage</DialogTitle></DialogHeader>
                    {editT && (
                      <TestimonialForm
                        initial={editT}
                        onSave={(d) => updateMutation.mutate({ id: editT.id, data: d })}
                        onClose={() => setEditT(null)}
                      />
                    )}
                  </DialogContent>
                </Dialog>
                <DeleteButton onDelete={() => deleteMutation.mutate(t.id)} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ─── MAIN ADMIN PANEL ────────────────────────────────────────────────────────

function AdminPanel({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HardHat className="w-6 h-6 text-secondary" />
            <span className="font-bold text-lg">BEGEC TP — Administration</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-white">
                <Eye className="w-4 h-4 mr-2" /> Voir le site
              </Button>
            </a>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground/80 hover:text-white"
              onClick={onLogout}
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4 mr-2" /> Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="contacts">
          <TabsList className="grid w-full grid-cols-5 mb-8 h-auto">
            <TabsTrigger value="contacts" className="flex flex-col sm:flex-row items-center gap-1 py-2 text-xs sm:text-sm" data-testid="tab-contacts">
              <Mail className="w-4 h-4 shrink-0" /><span>Messages</span>
            </TabsTrigger>
            <TabsTrigger value="quotes" className="flex flex-col sm:flex-row items-center gap-1 py-2 text-xs sm:text-sm" data-testid="tab-quotes">
              <FileText className="w-4 h-4 shrink-0" /><span>Devis</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex flex-col sm:flex-row items-center gap-1 py-2 text-xs sm:text-sm" data-testid="tab-projects">
              <FolderOpen className="w-4 h-4 shrink-0" /><span>Projets</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="flex flex-col sm:flex-row items-center gap-1 py-2 text-xs sm:text-sm" data-testid="tab-team">
              <Users className="w-4 h-4 shrink-0" /><span>Équipe</span>
            </TabsTrigger>
            <TabsTrigger value="partners" className="flex flex-col sm:flex-row items-center gap-1 py-2 text-xs sm:text-sm" data-testid="tab-partners">
              <Handshake className="w-4 h-4 shrink-0" /><span>Partenaires</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contacts"><ContactsTab /></TabsContent>
          <TabsContent value="quotes"><QuotesTab /></TabsContent>
          <TabsContent value="projects"><ProjectsTab /></TabsContent>
          <TabsContent value="team"><TeamTab /></TabsContent>
          <TabsContent value="partners"><PartnersTab /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// ─── ROOT ────────────────────────────────────────────────────────────────────

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    return !!token && token === "begec-admin-secret-token-2024";
  });

  function handleLogin() { setIsAuthenticated(true); }

  function handleLogout() {
    localStorage.removeItem(TOKEN_KEY);
    setIsAuthenticated(false);
  }

  if (!isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <LoginPage onLogin={handleLogin} />
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AdminPanel onLogout={handleLogout} />
    </QueryClientProvider>
  );
}


