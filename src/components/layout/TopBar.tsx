import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Bell, LogOut } from 'lucide-react';

export function TopBar() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <header className="h-16 bg-card border-b border-border px-4 flex items-center justify-between">
      {/* Logo and Title */}
      <div className="flex items-center space-x-3">
        <img 
          src="/src/assets/logo-new.png" 
          alt="FALA Aí, Cidadão" 
          className="w-10 h-10 object-contain"
        />
        <div>
          <h1 className="text-xl font-bold text-brand-blue">FALA Aí, Cidadão</h1>
          <p className="text-sm text-muted-foreground">
            {user.role === 'Citizen' ? 'Cidadão' : 
             user.role === 'Agent' ? 'Operador' : 'Administrador'}
          </p>
        </div>
      </div>

      {/* User Actions */}
      <div className="flex items-center space-x-2">
        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
            3
          </Badge>
        </Button>

        {/* User Menu */}
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.photo_url} alt={user.name} />
            <AvatarFallback className="bg-brand-primary text-white">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium hidden md:block">{user.name}</span>
        </div>

        {/* Logout */}
        <Button variant="ghost" size="sm" onClick={logout}>
          <LogOut className="h-4 w-4" />
          <span className="hidden md:inline ml-2">Sair</span>
        </Button>
      </div>
    </header>
  );
}