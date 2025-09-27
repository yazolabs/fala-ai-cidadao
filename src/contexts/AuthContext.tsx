import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '@/types';
import { toast } from '@/hooks/use-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo - replace with API calls
const MOCK_USERS: (User & { password: string })[] = [
  {
    id: '1',
    name: 'Admin Master',
    email: 'admin@fala.ai',
    password: 'Admin@123',
    role: 'Admin',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Operador 1',
    email: 'op1@fala.ai',
    password: 'Op@12345',
    role: 'Agent',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Maria Cidadã',
    email: 'maria@fala.ai',
    password: 'User@1234',
    role: 'Citizen',
    created_at: new Date().toISOString(),
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token
    const storedUser = localStorage.getItem('fala_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('fala_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (!foundUser) {
      toast({
        title: 'Erro no login',
        description: 'Email ou senha incorretos',
        variant: 'destructive',
      });
      throw new Error('Invalid credentials');
    }

    const { password: _, ...userData } = foundUser;
    setUser(userData);
    localStorage.setItem('fala_user', JSON.stringify(userData));
    
    toast({
      title: 'Login realizado com sucesso!',
      description: `Bem-vindo(a), ${userData.name}`,
    });
    
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fala_user');
    toast({
      title: 'Logout realizado',
      description: 'Até mais!',
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}