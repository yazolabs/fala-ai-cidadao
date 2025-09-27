import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Map, 
  Plus, 
  Bell, 
  User,
  Users,
  Settings,
  BarChart3,
  Megaphone,
  FolderOpen
} from 'lucide-react';

const citizenItems = [
  { icon: Home, label: 'Início', path: '/' },
  { icon: Map, label: 'Mapa', path: '/map' },
  { icon: Plus, label: 'Novo Chamado', path: '/new' },
  { icon: Bell, label: 'Notificações', path: '/notifications' },
  { icon: User, label: 'Perfil', path: '/profile' },
];

const backofficeItems = [
  { icon: FolderOpen, label: 'Fila de Chamados', path: '/admin/queue' },
  { icon: BarChart3, label: 'Relatórios', path: '/admin/reports' },
  { icon: Settings, label: 'Configurações', path: '/admin/settings' },
  { icon: Megaphone, label: 'Campanhas', path: '/admin/campaigns' },
  { icon: Users, label: 'Usuários', path: '/admin/users' },
];

export function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();
  
  if (!user) return null;

  const isBackoffice = user.role === 'Admin' || user.role === 'Agent';
  const items = isBackoffice ? backofficeItems : citizenItems;

  return (
    <aside className="w-64 bg-card border-r border-border flex-shrink-0">
      <nav className="p-4 space-y-2">
        <div className="flex items-center space-x-3">
          <img 
            src="/src/assets/logo-new.png" 
            alt="FALA Aí, Cidadão" 
            className="w-8 h-8 object-contain"
          />
          <div>
            <h2 className="font-bold text-brand-blue">FALA Aí</h2>
            <p className="text-xs text-muted-foreground">Cidadão</p>
          </div>
        </div>
        
        {items.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          
          return (
            <NavLink
              key={path}
              to={path}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
                isActive && "bg-brand-primary text-white shadow-md",
                !isActive && "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span className="font-medium">{label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}