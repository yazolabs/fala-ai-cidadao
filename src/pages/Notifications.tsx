import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Bell, 
  CheckCheck, 
  FileText, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Megaphone,
  Settings
} from 'lucide-react';

interface NotificationItem {
  id: string;
  type: 'status_change' | 'comment' | 'campaign' | 'system';
  title: string;
  message: string;
  read: boolean;
  created_at: string;
  ref_type?: string;
  ref_id?: string;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      type: 'status_change',
      title: 'Chamado atualizado',
      message: 'Seu chamado "Lâmpada queimada" foi atualizado para "Em andamento"',
      read: false,
      created_at: '2024-01-15T10:30:00Z',
      ref_type: 'ticket',
      ref_id: '123'
    },
    {
      id: '2',
      type: 'comment',
      title: 'Novo comentário',
      message: 'A Secretaria de Obras adicionou um comentário ao seu chamado',
      read: false,
      created_at: '2024-01-15T09:15:00Z',
      ref_type: 'ticket',
      ref_id: '123'
    },
    {
      id: '3',
      type: 'status_change',
      title: 'Chamado resolvido',
      message: 'Seu chamado "Buraco na rua" foi marcado como resolvido',
      read: true,
      created_at: '2024-01-14T16:45:00Z',
      ref_type: 'ticket',
      ref_id: '122'
    },
    {
      id: '4',
      type: 'campaign',
      title: 'Nova campanha disponível',
      message: 'Participe do "Mutirão Limpa Bairro Centro" até 20/10',
      read: true,
      created_at: '2024-01-14T14:20:00Z',
      ref_type: 'campaign',
      ref_id: '1'
    },
    {
      id: '5',
      type: 'system',
      title: 'Bem-vindo ao FALA Aí, Cidadão!',
      message: 'Sua conta foi criada com sucesso. Agora você pode registrar e acompanhar chamados.',
      read: true,
      created_at: '2024-01-10T12:00:00Z'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'status_change':
        return <CheckCircle className="h-5 w-5 text-status-progress" />;
      case 'comment':
        return <FileText className="h-5 w-5 text-brand-primary" />;
      case 'campaign':
        return <Megaphone className="h-5 w-5 text-brand-green" />;
      case 'system':
        return <Settings className="h-5 w-5 text-muted-foreground" />;
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60);
      return `há ${diffInMinutes} min`;
    } else if (diffInHours < 24) {
      return `há ${Math.floor(diffInHours)} h`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `há ${diffInDays} dia${diffInDays > 1 ? 's' : ''}`;
    }
  };

  return (
    <div className="p-4 pb-24 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-blue">Notificações</h1>
          <p className="text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} não lidas` : 'Tudo em dia!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={markAllAsRead}
          >
            <CheckCheck className="mr-2 h-4 w-4" />
            Marcar todas como lidas
          </Button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notification, index) => (
          <Card 
            key={notification.id} 
            className={`cursor-pointer transition-all hover:shadow-md ${
              !notification.read ? 'border-brand-primary/50 bg-brand-primary/5' : ''
            }`}
            onClick={() => !notification.read && markAsRead(notification.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h3 className={`font-medium ${
                      !notification.read ? 'text-brand-blue' : 'text-foreground'
                    }`}>
                      {notification.title}
                    </h3>
                    <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                      <span className="text-xs text-muted-foreground">
                        {formatTime(notification.created_at)}
                      </span>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-brand-primary rounded-full" />
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {notification.message}
                  </p>
                  
                  {notification.ref_type && (
                    <Badge variant="outline" className="mt-2 text-xs">
                      {notification.ref_type === 'ticket' && (
                        <>
                          <FileText className="mr-1 h-3 w-3" />
                          Chamado
                        </>
                      )}
                      {notification.ref_type === 'campaign' && (
                        <>
                          <Megaphone className="mr-1 h-3 w-3" />
                          Campanha
                        </>
                      )}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {notifications.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium text-brand-blue mb-2">Nenhuma notificação</h3>
            <p className="text-muted-foreground">
              Você receberá notificações sobre atualizações nos seus chamados
            </p>
          </CardContent>
        </Card>
      )}

      {/* Footer Info */}
      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <div className="text-center">
            <h4 className="font-medium text-sm mb-2">Configurar notificações</h4>
            <p className="text-xs text-muted-foreground mb-3">
              Personalize como e quando você quer receber notificações
            </p>
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Ir para configurações
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}