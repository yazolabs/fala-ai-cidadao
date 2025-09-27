import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Bell, 
  Shield, 
  Download, 
  Trash2, 
  Moon, 
  Sun,
  LogOut,
  Settings
} from 'lucide-react';

export default function Profile() {
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weeklyDigest: false,
  });

  if (!user) return null;

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'Admin': return 'destructive';
      case 'Agent': return 'default';
      case 'Citizen': return 'secondary';
      default: return 'secondary';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'Admin': return 'Administrador';
      case 'Agent': return 'Operador';
      case 'Citizen': return 'Cidadão';
      default: return role;
    }
  };

  return (
    <div className="p-4 pb-24 space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.photo_url} alt={user.name} />
              <AvatarFallback className="bg-brand-primary text-white text-xl">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-brand-blue">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
              <Badge variant={getRoleBadgeVariant(user.role)} className="mt-2">
                {getRoleLabel(user.role)}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-brand-blue flex items-center">
            <User className="mr-2 h-5 w-5" />
            Informações Pessoais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome completo</Label>
              <Input
                id="name"
                value={user.name}
                readOnly
                className="bg-muted"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={user.email}
                readOnly
                className="bg-muted"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                placeholder="(11) 99999-9999"
                value={user.phone || ''}
              />
            </div>
            <div>
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                placeholder="Seu endereço"
                value={user.address || ''}
              />
            </div>
          </div>

          <Button className="bg-brand-primary hover:bg-brand-primary-hover">
            Salvar Alterações
          </Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-brand-blue flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            Preferências de Notificação
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="font-medium">Notificações por email</p>
              <p className="text-sm text-muted-foreground">
                Receber atualizações dos chamados por email
              </p>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(checked) => 
                setNotifications({ ...notifications, email: checked })
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="font-medium">Notificações push</p>
              <p className="text-sm text-muted-foreground">
                Receber notificações no navegador/app
              </p>
            </div>
            <Switch
              checked={notifications.push}
              onCheckedChange={(checked) => 
                setNotifications({ ...notifications, push: checked })
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="font-medium">Resumo semanal</p>
              <p className="text-sm text-muted-foreground">
                Receber resumo das atividades da semana
              </p>
            </div>
            <Switch
              checked={notifications.weeklyDigest}
              onCheckedChange={(checked) => 
                setNotifications({ ...notifications, weeklyDigest: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* App Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-brand-blue flex items-center">
            <Settings className="mr-2 h-5 w-5" />
            Configurações do App
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="font-medium">Modo escuro</p>
              <p className="text-sm text-muted-foreground">
                Alternar entre tema claro e escuro
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
              <Moon className="h-4 w-4" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Data */}
      <Card>
        <CardHeader>
          <CardTitle className="text-brand-blue flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            Privacidade e Dados
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Download className="mr-2 h-4 w-4" />
              Exportar meus dados
            </Button>
            
            <Button variant="outline" className="w-full justify-start text-destructive border-destructive hover:bg-destructive hover:text-white">
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir minha conta
            </Button>
          </div>

          <div className="text-xs text-muted-foreground p-3 bg-muted/50 rounded-lg">
            <p>
              Seus dados são protegidos de acordo com a LGPD. 
              Você pode exportar ou excluir suas informações a qualquer momento.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Logout */}
      <Card>
        <CardContent className="p-6">
          <Button 
            onClick={logout}
            variant="outline" 
            className="w-full border-destructive text-destructive hover:bg-destructive hover:text-white"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair da conta
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}