import { useState, useRef, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  LogOut,
  Upload,
  Trash2,
  Edit,
  Plus,
  Image,
  Users,
  Briefcase,
  Handshake,
  Shield,
  Eye,
  EyeOff,
} from "lucide-react";
import type { Project, TeamMember, Partner } from "@shared/schema";

const ADMIN_TOKEN_KEY = "begec_admin_token";

function getToken() {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

function adminFetch(url: string, options: RequestInit = {}) {
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-admin-token": getToken() || "",
      ...(options.headers || {}),
    },
  });
}

async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/admin/upload", {
    method: "POST",
    headers: { "x-admin-token": getToken() || "" },
    body: formData,
  });
  if (!res.ok) throw new Error("Upload failed");
  const data = await res.json();
  return data.url;
}

// ======================== LOGIN ========================
function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Identifiants incorrects");
        return;
      }
      const data = await res.json();
      localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
      toast({ title: "Connexion réussie", description: "Bienvenue dans l'espace admin BEGEC TP" });
      onLogin();
    } catch {
      setError("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1221] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#1F3C88] rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-[#F27100]" />
          </div>
          <h1 className="text-2xl font-bold text-white">Espace Admin</h1>
          <p className="text-slate-400 mt-1">BEGEC TP — Gestion du site</p>
        </div>

        <Card className="bg-[#0F1D35] border-[#1F3C88]/40">
          <CardContent className="pt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-300" htmlFor="username">Nom d'utilisateur</Label>
                <Input
                  id="username"
                  data-testid="input-username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="admin"
                  className="bg-[#1A2B45] border-[#1F3C88]/50 text-white placeholder:text-slate-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300" htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password"
                    data-testid="input-password"
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••"
                    className="bg-[#1A2B45] border-[#1F3C88]/50 text-white placeholder:text-slate-500 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <Button
                data-testid="button-login"
                type="submit"
                disabled={loading}
                className="w-full bg-[#F27100] hover:bg-[#F27100]/90 text-black font-semibold"
              >
                {loading ? "Connexion..." : "Se connecter"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ======================== IMAGE UPLOADER ========================
function ImageUploader({
  currentUrl,
  onUpload,
  label = "Changer l'image",
}: {
  currentUrl?: string;
  onUpload: (url: string) => void;
  label?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setUploading(true);
      try {
        const url = await uploadFile(file);
        onUpload(url);
        toast({ title: "Image uploadée", description: "L'image a été mise à jour avec succès." });
      } catch {
        toast({ title: "Erreur", description: "Impossible d'uploader l'image.", variant: "destructive" });
      } finally {
        setUploading(false);
        if (fileRef.current) fileRef.current.value = "";
      }
    },
    [onUpload, toast]
  );

  return (
    <div className="space-y-2">
      {currentUrl && (
        <div className="w-full bg-white rounded-lg border border-[#1F3C88]/30 flex items-center justify-center p-3" style={{ minHeight: "96px" }}>
          <img src={currentUrl} alt="preview" className="max-h-20 max-w-full object-contain" />
        </div>
      )}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className="w-full border-[#1F3C88]/50 text-slate-300 hover:bg-[#1F3C88]/20"
      >
        <Upload className="w-4 h-4 mr-2" />
        {uploading ? "Upload en cours..." : label}
      </Button>
      {currentUrl && !uploading && (
        <p className="text-emerald-400 text-xs text-center">✓ Logo prêt — cliquez sur Sauvegarder pour confirmer</p>
      )}
    </div>
  );
}

// ======================== LOGO TAB ========================
function LogoTab() {
  const { toast } = useToast();
  const { data } = useQuery<{ key: string; value: string | null }>({
    queryKey: ["/api/settings/logo"],
  });

  const [currentLogo, setCurrentLogo] = useState<string | null>(null);

  const logoUrl = currentLogo ?? data?.value ?? null;

  const saveLogo = async (url: string) => {
    setCurrentLogo(url);
    await adminFetch("/api/admin/settings/logo", {
      method: "PUT",
      body: JSON.stringify({ value: url }),
    });
    toast({ title: "Logo mis à jour", description: "Le logo sera affiché sur le site." });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-1">Logo de l'entreprise</h2>
        <p className="text-slate-400 text-sm">Changez le logo affiché dans la barre de navigation et partout sur le site.</p>
      </div>

      <Card className="bg-[#0F1D35] border-[#1F3C88]/40 max-w-md">
        <CardHeader>
          <CardTitle className="text-white text-base">Logo actuel</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {logoUrl ? (
            <div className="flex items-center justify-center bg-[#1A2B45] rounded-lg p-6 border border-[#1F3C88]/30">
              <img src={logoUrl} alt="Logo BEGEC TP" className="h-20 object-contain" />
            </div>
          ) : (
            <div className="flex items-center justify-center bg-[#1A2B45] rounded-lg p-6 border border-[#1F3C88]/30 h-32">
              <div className="text-center text-slate-500">
                <Image className="w-10 h-10 mx-auto mb-2 opacity-40" />
                <p className="text-sm">Aucun logo uploadé</p>
              </div>
            </div>
          )}
          <ImageUploader
            currentUrl={undefined}
            onUpload={saveLogo}
            label="Uploader un nouveau logo"
          />
        </CardContent>
      </Card>
    </div>
  );
}

// ======================== PROJECTS TAB ========================
type ProjectForm = {
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  location: string;
  completionDate: string;
};

function ProjectsTab() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const { data: projectsList = [], isLoading } = useQuery<Project[]>({ queryKey: ["/api/projects"] });

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<ProjectForm>({
    title: "", category: "", description: "", imageUrl: "", location: "", completionDate: ""
  });

  const openNew = () => {
    setEditing(null);
    setForm({ title: "", category: "", description: "", imageUrl: "", location: "", completionDate: "" });
    setOpen(true);
  };

  const openEdit = (p: Project) => {
    setEditing(p);
    setForm({
      title: p.title, category: p.category, description: p.description,
      imageUrl: p.imageUrl, location: p.location || "", completionDate: p.completionDate || ""
    });
    setOpen(true);
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (editing) {
        const res = await adminFetch(`/api/admin/projects/${editing.id}`, {
          method: "PUT", body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Erreur");
        return res.json();
      } else {
        const res = await adminFetch("/api/admin/projects", {
          method: "POST", body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Erreur");
        return res.json();
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/projects"] });
      setOpen(false);
      toast({ title: editing ? "Projet modifié" : "Projet ajouté", description: "Les changements ont été sauvegardés." });
    },
    onError: () => toast({ title: "Erreur", description: "Impossible de sauvegarder.", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await adminFetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "Projet supprimé" });
    },
    onError: () => toast({ title: "Erreur", description: "Impossible de supprimer.", variant: "destructive" }),
  });

  const categories = ["VRD", "Terrassement", "Assainissement", "Aménagement Extérieur", "Construction", "Infrastructure"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white mb-1">Réalisations & Projets</h2>
          <p className="text-slate-400 text-sm">{projectsList.length} projet(s) dans la galerie</p>
        </div>
        <Button onClick={openNew} className="bg-[#F27100] hover:bg-[#F27100]/90 text-black font-semibold">
          <Plus className="w-4 h-4 mr-2" /> Ajouter un projet
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-48 bg-[#0F1D35] rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projectsList.map((p) => (
            <Card key={p.id} className="bg-[#0F1D35] border-[#1F3C88]/40 overflow-hidden">
              <div className="relative h-40">
                <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Badge className="absolute top-2 left-2 bg-[#F27100] text-white text-xs font-semibold">
                  {p.category}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="text-white font-semibold text-sm mb-1 truncate">{p.title}</h3>
                <p className="text-slate-400 text-xs mb-3 line-clamp-2">{p.description}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => openEdit(p)}
                    className="flex-1 border-[#1F3C88]/50 text-slate-300 hover:bg-[#1F3C88]/20 text-xs">
                    <Edit className="w-3 h-3 mr-1" /> Modifier
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => deleteMutation.mutate(p.id)}
                    className="border-red-500/50 text-red-400 hover:bg-red-500/10 text-xs">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#0F1D35] border-[#1F3C88]/40 text-white max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Modifier le projet" : "Ajouter un projet"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="text-slate-300">Titre *</Label>
              <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                className="bg-[#1A2B45] border-[#1F3C88]/50 text-white" placeholder="Titre du projet" />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Catégorie *</Label>
              <select
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className="w-full rounded-md border border-[#1F3C88]/50 bg-[#1A2B45] text-white px-3 py-2 text-sm"
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Description *</Label>
              <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                className="bg-[#1A2B45] border-[#1F3C88]/50 text-white" rows={3} placeholder="Description du projet" />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Localisation</Label>
              <Input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                className="bg-[#1A2B45] border-[#1F3C88]/50 text-white" placeholder="Ex: Conakry, Guinée" />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Année de livraison</Label>
              <Input value={form.completionDate} onChange={e => setForm(f => ({ ...f, completionDate: e.target.value }))}
                className="bg-[#1A2B45] border-[#1F3C88]/50 text-white" placeholder="Ex: 2024" />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Photo du projet *</Label>
              <ImageUploader
                currentUrl={form.imageUrl || undefined}
                onUpload={url => setForm(f => ({ ...f, imageUrl: url }))}
                label="Uploader une photo"
              />
              {!form.imageUrl && (
                <>
                  <p className="text-slate-500 text-xs text-center">— ou coller une URL —</p>
                  <Input value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))}
                    className="bg-[#1A2B45] border-[#1F3C88]/50 text-white text-xs" placeholder="https://..." />
                </>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}
              className="border-[#1F3C88]/50 text-slate-300">Annuler</Button>
            <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending || !form.title || !form.category || !form.description || !form.imageUrl}
              className="bg-[#F27100] hover:bg-[#F27100]/90 text-black font-semibold">
              {saveMutation.isPending ? "Sauvegarde..." : "Sauvegarder"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ======================== TEAM TAB ========================
type MemberForm = { name: string; role: string; bio: string; imageUrl: string };

function TeamTab() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const { data: members = [], isLoading } = useQuery<TeamMember[]>({ queryKey: ["/api/team"] });

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [form, setForm] = useState<MemberForm>({ name: "", role: "", bio: "", imageUrl: "" });

  const openNew = () => {
    setEditing(null);
    setForm({ name: "", role: "", bio: "", imageUrl: "" });
    setOpen(true);
  };

  const openEdit = (m: TeamMember) => {
    setEditing(m);
    setForm({ name: m.name, role: m.role, bio: m.bio || "", imageUrl: m.imageUrl });
    setOpen(true);
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (editing) {
        const res = await adminFetch(`/api/admin/team/${editing.id}`, { method: "PUT", body: JSON.stringify(form) });
        if (!res.ok) throw new Error("Erreur");
        return res.json();
      } else {
        const res = await adminFetch("/api/admin/team", { method: "POST", body: JSON.stringify(form) });
        if (!res.ok) throw new Error("Erreur");
        return res.json();
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/team"] });
      setOpen(false);
      toast({ title: editing ? "Membre modifié" : "Membre ajouté" });
    },
    onError: () => toast({ title: "Erreur", description: "Impossible de sauvegarder.", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await adminFetch(`/api/admin/team/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/team"] });
      toast({ title: "Membre supprimé" });
    },
    onError: () => toast({ title: "Erreur", description: "Impossible de supprimer.", variant: "destructive" }),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white mb-1">Équipe BEGEC TP</h2>
          <p className="text-slate-400 text-sm">{members.length} membre(s) dans l'équipe</p>
        </div>
        <Button onClick={openNew} className="bg-[#F27100] hover:bg-[#F27100]/90 text-black font-semibold">
          <Plus className="w-4 h-4 mr-2" /> Ajouter un membre
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <div key={i} className="h-48 bg-[#0F1D35] rounded-lg animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {members.map((m) => (
            <Card key={m.id} className="bg-[#0F1D35] border-[#1F3C88]/40">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <img src={m.imageUrl} alt={m.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-[#1F3C88] mb-3" />
                <h3 className="text-white font-semibold text-sm">{m.name}</h3>
                <p className="text-[#F27100] text-xs mb-2">{m.role}</p>
                {m.bio && <p className="text-slate-400 text-xs mb-3 line-clamp-2">{m.bio}</p>}
                <div className="flex gap-2 w-full mt-auto pt-2">
                  <Button size="sm" variant="outline" onClick={() => openEdit(m)}
                    className="flex-1 border-[#1F3C88]/50 text-slate-300 hover:bg-[#1F3C88]/20 text-xs">
                    <Edit className="w-3 h-3 mr-1" /> Modifier
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => deleteMutation.mutate(m.id)}
                    className="border-red-500/50 text-red-400 hover:bg-red-500/10 text-xs">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#0F1D35] border-[#1F3C88]/40 text-white max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Modifier le membre" : "Ajouter un membre"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="text-slate-300">Nom complet *</Label>
              <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="bg-[#1A2B45] border-[#1F3C88]/50 text-white" placeholder="Nom et prénom" />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Poste *</Label>
              <Input value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                className="bg-[#1A2B45] border-[#1F3C88]/50 text-white" placeholder="Ex: Directeur Général" />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Biographie</Label>
              <Textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                className="bg-[#1A2B45] border-[#1F3C88]/50 text-white" rows={3} placeholder="Courte biographie..." />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Photo *</Label>
              <ImageUploader
                currentUrl={form.imageUrl || undefined}
                onUpload={url => setForm(f => ({ ...f, imageUrl: url }))}
                label="Uploader une photo"
              />
              {!form.imageUrl && (
                <>
                  <p className="text-slate-500 text-xs text-center">— ou coller une URL —</p>
                  <Input value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))}
                    className="bg-[#1A2B45] border-[#1F3C88]/50 text-white text-xs" placeholder="https://..." />
                </>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}
              className="border-[#1F3C88]/50 text-slate-300">Annuler</Button>
            <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending || !form.name || !form.role || !form.imageUrl}
              className="bg-[#F27100] hover:bg-[#F27100]/90 text-black font-semibold">
              {saveMutation.isPending ? "Sauvegarde..." : "Sauvegarder"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ======================== PARTNERS TAB ========================
type PartnerForm = { name: string; logoUrl: string };

function PartnersTab() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const { data: partnersList = [], isLoading } = useQuery<Partner[]>({ queryKey: ["/api/partners"] });

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Partner | null>(null);
  const [form, setForm] = useState<PartnerForm>({ name: "", logoUrl: "" });

  const openNew = () => {
    setEditing(null);
    setForm({ name: "", logoUrl: "" });
    setOpen(true);
  };

  const openEdit = (p: Partner) => {
    setEditing(p);
    setForm({ name: p.name, logoUrl: p.logoUrl });
    setOpen(true);
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (editing) {
        const res = await adminFetch(`/api/admin/partners/${editing.id}`, { method: "PUT", body: JSON.stringify(form) });
        if (!res.ok) throw new Error("Erreur");
        return res.json();
      } else {
        const res = await adminFetch("/api/admin/partners", { method: "POST", body: JSON.stringify(form) });
        if (!res.ok) throw new Error("Erreur");
        return res.json();
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/partners"] });
      setOpen(false);
      toast({ title: editing ? "Partenaire modifié" : "Partenaire ajouté" });
    },
    onError: () => toast({ title: "Erreur", description: "Impossible de sauvegarder.", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await adminFetch(`/api/admin/partners/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/partners"] });
      toast({ title: "Partenaire supprimé" });
    },
    onError: () => toast({ title: "Erreur", description: "Impossible de supprimer.", variant: "destructive" }),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white mb-1">Partenaires</h2>
          <p className="text-slate-400 text-sm">{partnersList.length} partenaire(s)</p>
        </div>
        <Button onClick={openNew} className="bg-[#F27100] hover:bg-[#F27100]/90 text-black font-semibold">
          <Plus className="w-4 h-4 mr-2" /> Ajouter un partenaire
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[...Array(6)].map((_, i) => <div key={i} className="h-28 bg-[#0F1D35] rounded-lg animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {partnersList.map((p) => (
            <Card key={p.id} className="bg-[#0F1D35] border-[#1F3C88]/40">
              <CardContent className="p-4 flex flex-col items-center gap-3">
                <div className="w-full h-16 flex items-center justify-center bg-white/5 rounded">
                  <img src={p.logoUrl} alt={p.name} className="max-h-12 max-w-full object-contain" />
                </div>
                <p className="text-slate-300 text-xs text-center font-medium truncate w-full">{p.name}</p>
                <div className="flex gap-2 w-full">
                  <Button size="sm" variant="outline" onClick={() => openEdit(p)}
                    className="flex-1 border-[#1F3C88]/50 text-slate-300 hover:bg-[#1F3C88]/20 text-xs">
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => deleteMutation.mutate(p.id)}
                    className="border-red-500/50 text-red-400 hover:bg-red-500/10 text-xs">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#0F1D35] border-[#1F3C88]/40 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>{editing ? "Modifier le partenaire" : "Ajouter un partenaire"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="text-slate-300">Nom du partenaire *</Label>
              <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="bg-[#1A2B45] border-[#1F3C88]/50 text-white" placeholder="Ex: Ministère des Travaux Publics" />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Logo *</Label>
              <ImageUploader
                currentUrl={form.logoUrl || undefined}
                onUpload={url => setForm(f => ({ ...f, logoUrl: url }))}
                label="Uploader un logo"
              />
              {!form.logoUrl && (
                <>
                  <p className="text-slate-500 text-xs text-center">— ou coller une URL —</p>
                  <Input value={form.logoUrl} onChange={e => setForm(f => ({ ...f, logoUrl: e.target.value }))}
                    className="bg-[#1A2B45] border-[#1F3C88]/50 text-white text-xs" placeholder="https://..." />
                </>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}
              className="border-[#1F3C88]/50 text-slate-300">Annuler</Button>
            <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending || !form.name || !form.logoUrl}
              className="bg-[#F27100] hover:bg-[#F27100]/90 text-black font-semibold">
              {saveMutation.isPending ? "Sauvegarde..." : "Sauvegarder"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ======================== DASHBOARD ========================
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const { data: projectsList = [] } = useQuery<Project[]>({ queryKey: ["/api/projects"] });
  const { data: members = [] } = useQuery<TeamMember[]>({ queryKey: ["/api/team"] });
  const { data: partnersList = [] } = useQuery<Partner[]>({ queryKey: ["/api/partners"] });

  return (
    <div className="min-h-screen bg-[#0B1221]">
      {/* Header */}
      <header className="bg-[#0F1D35] border-b border-[#1F3C88]/40 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#1F3C88] rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-[#F27100]" />
            </div>
            <div>
              <h1 className="text-white font-bold text-base leading-none">BEGEC TP</h1>
              <p className="text-slate-400 text-xs">Espace Administration</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="border-[#1F3C88]/50 text-slate-300 hover:bg-[#1F3C88]/20 text-xs">
                Voir le site
              </Button>
            </a>
            <Button onClick={onLogout} variant="outline" size="sm"
              className="border-red-500/40 text-red-400 hover:bg-red-500/10 text-xs">
              <LogOut className="w-3 h-3 mr-1" /> Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Briefcase, label: "Projets", count: projectsList.length, color: "text-blue-400" },
            { icon: Users, label: "Membres", count: members.length, color: "text-green-400" },
            { icon: Handshake, label: "Partenaires", count: partnersList.length, color: "text-secondary" },
            { icon: Image, label: "Médias", count: projectsList.length + members.length, color: "text-purple-400" },
          ].map(({ icon: Icon, label, count, color }) => (
            <Card key={label} className="bg-[#0F1D35] border-[#1F3C88]/40">
              <CardContent className="p-4 flex items-center gap-3">
                <Icon className={`w-8 h-8 ${color} opacity-80`} />
                <div>
                  <p className="text-2xl font-bold text-white">{count}</p>
                  <p className="text-slate-400 text-xs">{label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="logo">
          <TabsList className="bg-[#0F1D35] border border-[#1F3C88]/40 mb-6">
            <TabsTrigger value="logo" className="data-[state=active]:bg-[#1F3C88] data-[state=active]:text-white text-slate-400">
              <Image className="w-4 h-4 mr-2" /> Logo
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-[#1F3C88] data-[state=active]:text-white text-slate-400">
              <Briefcase className="w-4 h-4 mr-2" /> Projets
            </TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:bg-[#1F3C88] data-[state=active]:text-white text-slate-400">
              <Users className="w-4 h-4 mr-2" /> Équipe
            </TabsTrigger>
            <TabsTrigger value="partners" className="data-[state=active]:bg-[#1F3C88] data-[state=active]:text-white text-slate-400">
              <Handshake className="w-4 h-4 mr-2" /> Partenaires
            </TabsTrigger>
          </TabsList>

          <TabsContent value="logo"><LogoTab /></TabsContent>
          <TabsContent value="projects"><ProjectsTab /></TabsContent>
          <TabsContent value="team"><TeamTab /></TabsContent>
          <TabsContent value="partners"><PartnersTab /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// ======================== MAIN ADMIN PAGE ========================
export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem(ADMIN_TOKEN_KEY));

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) return <LoginPage onLogin={handleLogin} />;
  return <Dashboard onLogout={handleLogout} />;
}
