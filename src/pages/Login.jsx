import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/CustomerArea';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.error('Preencha e-mail e senha.');
      return;
    }
    setLoading(true);
    try {
      await login(email.trim(), password);
      toast.success('Login realizado com sucesso!');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.message || 'Erro ao fazer login. Verifique seus dados.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Entrar</h1>
          <p className="text-gray-600 mb-6">Acesse sua conta para ver pedidos e favoritos.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
                autoComplete="email"
              />
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                autoComplete="current-password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Ainda não tem conta?{' '}
            <Link to="/cadastro" className="text-emerald-600 font-medium hover:underline">
              Cadastre-se
            </Link>
          </p>
        </div>
        <p className="mt-4 text-center">
          <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm">Voltar ao início</Link>
        </p>
      </div>
    </div>
  );
}
