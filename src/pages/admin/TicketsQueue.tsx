import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  Filter, 
  Eye, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  User,
  MapPin
} from 'lucide-react';

// Mock data for demonstration
const mockTickets = [
  {
    id: 'T001',
    title: 'Lâmpada queimada na Rua das Flores',
    category: 'Iluminação',
    agency: 'ILUM',
    district: 'Centro',
    status: 'pending',
    priority: 'medium',
    created_at: '2024-01-15T10:30:00Z',
    sla_due_at: '2024-01-18T10:30:00Z',
    assigned_to: null,
    user_name: 'Maria Silva'
  },
  {
    id: 'T002',
    title: 'Buraco na via pública',
    category: 'Infraestrutura',
    agency: 'OBRAS',
    district: 'Zona Norte',
    status: 'in_progress',
    priority: 'high',
    created_at: '2024-01-14T15:45:00Z',
    sla_due_at: '2024-01-17T15:45:00Z',
    assigned_to: 'Operador 1',
    user_name: 'João Santos'
  },
  {
    id: 'T003',
    title: 'Coleta de lixo irregular',
    category: 'Limpeza',
    agency: 'LIMP',
    district: 'Zona Sul',
    status: 'resolved',
    priority: 'medium',
    created_at: '2024-01-13T08:20:00Z',
    sla_due_at: '2024-01-15T08:20:00Z',
    assigned_to: 'Operador 2',
    user_name: 'Ana Costa'
  }
];

const statusColors = {
  pending: 'bg-status-pending',
  in_progress: 'bg-status-progress',
  resolved: 'bg-status-resolved',
  canceled: 'bg-status-canceled'
};

const statusLabels = {
  pending: 'Pendente',
  in_progress: 'Em Andamento',
  resolved: 'Resolvido',
  canceled: 'Cancelado'
};

const priorityColors = {
  low: 'text-brand-green',
  medium: 'text-brand-yellow',
  high: 'text-destructive'
};

export function TicketsQueue() {
  const { user } = useAuth();
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    category: 'all',
    district: 'all'
  });
  const [internalComment, setInternalComment] = useState('');

  const filteredTickets = mockTickets.filter(ticket => {
    if (filters.search && !ticket.title.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.status !== 'all' && ticket.status !== filters.status) {
      return false;
    }
    if (filters.category !== 'all' && ticket.category !== filters.category) {
      return false;
    }
    if (filters.district !== 'all' && ticket.district !== filters.district) {
      return false;
    }
    return true;
  });

  const getSLAProgress = (ticket: any) => {
    const now = new Date();
    const created = new Date(ticket.created_at);
    const due = new Date(ticket.sla_due_at);
    const total = due.getTime() - created.getTime();
    const elapsed = now.getTime() - created.getTime();
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  };

  const handleStatusChange = (ticketId: string, newStatus: string) => {
    // In a real app, this would make an API call
    console.log(`Changing ticket ${ticketId} status to ${newStatus}`);
  };

  const handleAssignTicket = (ticketId: string, agent: string) => {
    // In a real app, this would make an API call
    console.log(`Assigning ticket ${ticketId} to ${agent}`);
  };

  const handleAddInternalComment = () => {
    if (!internalComment.trim() || !selectedTicket) return;
    
    // In a real app, this would make an API call
    console.log(`Adding internal comment to ticket ${selectedTicket.id}: ${internalComment}`);
    setInternalComment('');
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-brand-blue">Fila de Chamados</h1>
          <p className="text-muted-foreground">
            Gerencie e acompanhe todos os chamados da plataforma
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar chamados..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="pl-10"
              />
            </div>
            
            <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="in_progress">Em Andamento</SelectItem>
                <SelectItem value="resolved">Resolvido</SelectItem>
                <SelectItem value="canceled">Cancelado</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Categorias</SelectItem>
                <SelectItem value="Iluminação">Iluminação</SelectItem>
                <SelectItem value="Infraestrutura">Infraestrutura</SelectItem>
                <SelectItem value="Limpeza">Limpeza</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.district} onValueChange={(value) => setFilters(prev => ({ ...prev, district: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Bairro" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Bairros</SelectItem>
                <SelectItem value="Centro">Centro</SelectItem>
                <SelectItem value="Zona Norte">Zona Norte</SelectItem>
                <SelectItem value="Zona Sul">Zona Sul</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tickets Table */}
      <Card>
        <CardHeader>
          <CardTitle>Chamados ({filteredTickets.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Bairro</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>SLA</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-mono text-sm">{ticket.id}</TableCell>
                  <TableCell className="max-w-xs">
                    <div>
                      <p className="font-medium line-clamp-1">{ticket.title}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {ticket.user_name}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{ticket.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {ticket.district}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[ticket.status as keyof typeof statusColors]}>
                      {statusLabels[ticket.status as keyof typeof statusLabels]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Progress value={getSLAProgress(ticket)} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        {getSLAProgress(ticket) > 90 ? (
                          <span className="text-destructive flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            Vencendo
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            No prazo
                          </span>
                        )}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {ticket.assigned_to ? (
                      <Badge variant="secondary">{ticket.assigned_to}</Badge>
                    ) : (
                      <span className="text-muted-foreground text-sm">Não atribuído</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedTicket(ticket)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Gerenciar Chamado {selectedTicket?.id}</DialogTitle>
                          </DialogHeader>
                          
                          {selectedTicket && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Status</label>
                                  <Select 
                                    value={selectedTicket.status}
                                    onValueChange={(value) => handleStatusChange(selectedTicket.id, value)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pending">Pendente</SelectItem>
                                      <SelectItem value="in_progress">Em Andamento</SelectItem>
                                      <SelectItem value="resolved">Resolvido</SelectItem>
                                      <SelectItem value="canceled">Cancelado</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                
                                <div>
                                  <label className="text-sm font-medium">Atribuir a</label>
                                  <Select 
                                    value={selectedTicket.assigned_to || ''}
                                    onValueChange={(value) => handleAssignTicket(selectedTicket.id, value)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecionar operador" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Operador 1">Operador 1</SelectItem>
                                      <SelectItem value="Operador 2">Operador 2</SelectItem>
                                      <SelectItem value="">Não atribuído</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              
                              <div>
                                <label className="text-sm font-medium">Comentário Interno</label>
                                <Textarea
                                  placeholder="Adicione um comentário interno (não visível ao cidadão)..."
                                  value={internalComment}
                                  onChange={(e) => setInternalComment(e.target.value)}
                                  rows={3}
                                />
                                <Button 
                                  onClick={handleAddInternalComment}
                                  className="mt-2"
                                  disabled={!internalComment.trim()}
                                >
                                  <MessageSquare className="h-4 w-4 mr-2" />
                                  Adicionar Comentário
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}