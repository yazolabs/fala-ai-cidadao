import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Map, 
  Plus, 
  Bell, 
  User 
} from 'lucide-react';

const tabs = [
  { icon: Home, label: 'Início', path: '/' },
  { icon: Map, label: 'Mapa', path: '/map' },
  { icon: Plus, label: 'Novo', path: '/new', isAction: true },
  { icon: Bell, label: 'Notificações', path: '/notifications' },
  { icon: User, label: 'Perfil', path: '/profile' },
];

export function BottomTabs() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border flex items-center justify-around px-2 safe-area-pb z-50">
      {tabs.map(({ icon: Icon, label, path, isAction }) => {
        const isActive = location.pathname === path;
        
        return (
          <NavLink
            key={path}
            to={path}
            className={cn(
              "flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 min-w-0 flex-1",
              isActive && !isAction && "text-brand-primary",
              !isActive && !isAction && "text-muted-foreground hover:text-foreground",
              isAction && "bg-brand-primary text-white shadow-lg hover:bg-brand-primary-hover mx-2"
            )}
          >
            <Icon className={cn(
              "h-5 w-5 mb-1",
              isAction && "h-6 w-6"
            )} />
            <span className={cn(
              "text-xs font-medium",
              isAction && "sr-only"
            )}>
              {label}
            </span>
          </NavLink>
        );
      })}
    </nav>
  );
}