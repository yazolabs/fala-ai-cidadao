import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  FileText, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Megaphone,
  TrendingUp,
  Users
} from 'lucide-react';

export default function Home() {
  const { user } = useAuth();

  if (!user) return null;

  const isBackoffice = user.role === 'Admin' || user.role === 'Agent';

  // Mock data - replace with API calls
  const myTickets = [
    {
      id: '1',
      title: 'Lâmpada queimada na Rua das Flores',
      status: 'in_progress' as const,
      created_at: '2024-01-15T10:30:00Z',
      district: 'Centro'
    },
    {
      id: '2', 
      title: 'Buraco na pista',
      status: 'resolved' as const,
      created_at: '2024-01-10T14:20:00Z',
      district: 'Vila Nova'
    },
  ];

  const campaigns = [
    {
      id: '1',
      title: 'Mutirão Limpa Bairro Centro',
      description: 'Ação conjunta de limpeza no centro da cidade',
      end_at: '2024-10-20',
      participants: 23
    }
  ];

  const stats = {
    totalTickets: 1542,
    pendingTickets: 89,
    resolvedToday: 23,
    avgResolutionTime: 2.3
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'in_progress': return 'Em andamento';
      case 'resolved': return 'Resolvido';
      case 'canceled': return 'Cancelado';
      default: return status;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'in_progress': return 'default';
      case 'resolved': return 'secondary';
      case 'canceled': return 'destructive';
      default: return 'secondary';
    }
  };

  if (isBackoffice) {
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-brand-blue mb-2">
            Dashboard {user.role === 'Admin' ? 'Administrativo' : 'do Operador'}
          </h1>
          <p className="text-muted-foreground">
            Visão geral do sistema de atendimento
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total de Chamados</p>
                  <p className="text-3xl font-bold text-brand-blue">{stats.totalTickets}</p>
                </div>
                <FileText className="h-8 w-8 text-brand-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pendentes</p>
                  <p className="text-3xl font-bold text-status-pending">{stats.pendingTickets}</p>
                </div>
                <Clock className="h-8 w-8 text-status-pending" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Resolvidos Hoje</p>
                  <p className="text-3xl font-bold text-status-resolved">{stats.resolvedToday}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-status-resolved" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tempo Médio (dias)</p>
                  <p className="text-3xl font-bold text-brand-green">{stats.avgResolutionTime}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-brand-green" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-brand-blue">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full justify-start bg-brand-primary hover:bg-brand-primary-hover">
                <Link to="/admin/queue">
                  <FileText className="mr-2 h-4 w-4" />
                  Gerenciar Fila de Chamados
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start">
                <Link to="/admin/reports">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Visualizar Relatórios
                </Link>
              </Button>
              {user.role === 'Admin' && (
                <Button variant="outline" asChild className="w-full justify-start">
                  <Link to="/admin/settings">
                    <Users className="mr-2 h-4 w-4" />
                    Configurações do Sistema
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-brand-blue">Atividade Recente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <CheckCircle className="h-4 w-4 text-status-resolved" />
                  <span>Chamado #1542 foi resolvido</span>
                  <span className="text-muted-foreground ml-auto">há 5 min</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <AlertTriangle className="h-4 w-4 text-status-pending" />
                  <span>Novo chamado #1543 criado</span>
                  <span className="text-muted-foreground ml-auto">há 12 min</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <FileText className="h-4 w-4 text-status-progress" />
                  <span>Chamado #1540 em andamento</span>
                  <span className="text-muted-foreground ml-auto">há 1h</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-brand-primary to-brand-yellow rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Olá, {user.name.split(' ')[0]}! 👋
        </h1>
        <p className="text-white/90 mb-4">
          Registre problemas urbanos e acompanhe as soluções da sua cidade
        </p>
        <Button asChild variant="secondary" className="bg-white text-brand-primary hover:bg-white/90">
          <Link to="/new">
            <Plus className="mr-2 h-4 w-4" />
            Registrar Problema
          </Link>
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <Link to="/tickets" className="block p-4">
            <CardContent className="p-0 text-center">
              <FileText className="h-8 w-8 text-brand-primary mx-auto mb-2" />
              <p className="font-medium text-brand-blue">Meus Chamados</p>
              <p className="text-sm text-muted-foreground">{myTickets.length} abertos</p>
            </CardContent>
          </Link>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <Link to="/map" className="block p-4">
            <CardContent className="p-0 text-center">
              <MapPin className="h-8 w-8 text-brand-green mx-auto mb-2" />
              <p className="font-medium text-brand-blue">Mapa da Cidade</p>
              <p className="text-sm text-muted-foreground">Ver problemas</p>
            </CardContent>
          </Link>
        </Card>
      </div>

      {/* Recent Tickets */}
      <Card>
        <CardHeader>
          <CardTitle className="text-brand-blue flex items-center justify-between">
            Meus Chamados Recentes
            <Button variant="ghost" size="sm" asChild>
              <Link to="/tickets">Ver todos</Link>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {myTickets.map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{ticket.title}</p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3" />
                    <span>{ticket.district}</span>
                    <span>•</span>
                    <span>{new Date(ticket.created_at).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
                <Badge variant={getStatusVariant(ticket.status)}>
                  {getStatusLabel(ticket.status)}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Campaigns */}
      {campaigns.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-brand-blue flex items-center">
              <Megaphone className="mr-2 h-5 w-5" />
              Campanhas Ativas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="border rounded-lg p-4">
                  <h3 className="font-medium text-brand-blue mb-2">{campaign.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{campaign.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      Até {new Date(campaign.end_at).toLocaleDateString('pt-BR')}
                    </span>
                    <span className="text-brand-green font-medium">
                      {campaign.participants} participantes
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}