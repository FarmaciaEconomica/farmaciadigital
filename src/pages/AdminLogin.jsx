import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAdmin, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/AdminDashboard';

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500" />
      </div>
    );
  }
  if (user && isAdmin) {
    navigate(from, { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.error('Preencha e-mail e senha.');
      return;
    }
    setLoading(true);
    try {
      const result = await login(email.trim(), password);
      if (result?.role === 'admin') {
        toast.success('Acesso administrador concedido.');
        navigate(from, { replace: true });
      } else {
        toast.error('Acesso negado. Esta área é apenas para administradores.');
      }
    } catch (err) {
      toast.error(err?.message || 'Erro ao fazer login.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-700">
          <h1 className="text-2xl font-bold text-white mb-2">Painel Admin</h1>
          <p className="text-slate-400 mb-6">Entre com sua conta de administrador.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="admin-email" className="text-slate-300">E-mail</Label>
              <Input
                id="admin-email"
                type="email"
                placeholder="admin@farmacia.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                autoComplete="email"
              />
            </div>
            <div>
              <Label htmlFor="admin-password" className="text-slate-300">Senha</Label>
              <Input
                id="admin-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                autoComplete="current-password"
              />
            </div>
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
          <p className="mt-6 text-center">
            <a href="/" className="text-slate-400 hover:text-white text-sm">Voltar ao site</a>
          </p>
        </div>
      </div>
    </div>
  );
}
