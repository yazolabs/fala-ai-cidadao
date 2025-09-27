import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  MapPin, 
  Search, 
  Filter, 
  List, 
  Plus,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle
} from 'lucide-react';

export default function MapView() {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for tickets
  const tickets = [
    {
      id: '1',
      title: 'Lâmpada queimada na Rua das Flores',
      status: 'pending' as const,
      district: 'Centro',
      address: 'Rua das Flores, 123',
      created_at: '2024-01-15T10:30:00Z',
      category: 'Iluminação',
      lat: -23.5505,
      lng: -46.6333,
    },
    {
      id: '2',
      title: 'Buraco na pista da Av. Principal',
      status: 'in_progress' as const,
      district: 'Vila Nova',
      address: 'Av. Principal, 456',
      created_at: '2024-01-14T14:20:00Z',
      category: 'Infraestrutura',
      lat: -23.5515,
      lng: -46.6343,
    },
    {
      id: '3',
      title: 'Lixo acumulado na praça',
      status: 'resolved' as const,
      district: 'Jardins',
      address: 'Praça da Liberdade',
      created_at: '2024-01-13T09:15:00Z',
      category: 'Limpeza Urbana',
      lat: -23.5525,
      lng: -46.6323,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'in_progress': return <AlertTriangle className="h-4 w-4" />;
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      case 'canceled': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-status-pending';
      case 'in_progress': return 'bg-status-progress';
      case 'resolved': return 'bg-status-resolved';
      case 'canceled': return 'bg-status-canceled';
      default: return 'bg-gray-400';
    }
  };

  const filteredTickets = tickets.filter(ticket =>
    ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 bg-card border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-brand-blue">Mapa da Cidade</h1>
            <p className="text-muted-foreground">Problemas urbanos em tempo real</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'map' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('map')}
              className={viewMode === 'map' ? 'bg-brand-primary hover:bg-brand-primary-hover' : ''}
            >
              <MapPin className="h-4 w-4 mr-2" />
              Mapa
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-brand-primary hover:bg-brand-primary-hover' : ''}
            >
              <List className="h-4 w-4 mr-2" />
              Lista
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por título, bairro ou categoria..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 relative">
        {viewMode === 'map' ? (
          /* Map View */
          <div className="h-full bg-muted/20 relative">
            {/* Mock Map Container */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 via-brand-primary/5 to-brand-green/10 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-brand-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-brand-blue mb-2">Mapa Interativo</h3>
                <p className="text-muted-foreground mb-4">
                  Visualize problemas urbanos em tempo real
                </p>
                <div className="text-sm text-muted-foreground">
                  {filteredTickets.length} problemas encontrados
                </div>
              </div>
            </div>

            {/* Map Pins Simulation */}
            {filteredTickets.map((ticket, index) => (
              <div
                key={ticket.id}
                className={`absolute w-6 h-6 rounded-full border-2 border-white shadow-lg cursor-pointer ${getStatusColor(ticket.status)}`}
                style={{
                  top: `${30 + index * 15}%`,
                  left: `${40 + index * 10}%`,
                }}
                title={ticket.title}
              />
            ))}

            {/* FAB for New Ticket */}
            <Button
              size="lg"
              className="fixed bottom-24 right-4 md:bottom-8 md:right-8 h-14 w-14 rounded-full bg-brand-primary hover:bg-brand-primary-hover shadow-lg z-40"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </div>
        ) : (
          /* List View */
          <div className="p-4 space-y-3 pb-24">
            {filteredTickets.map((ticket) => (
              <Card key={ticket.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-brand-blue line-clamp-2 flex-1 mr-2">
                      {ticket.title}
                    </h3>
                    <Badge 
                      variant="secondary" 
                      className={`${getStatusColor(ticket.status)} text-white shrink-0`}
                    >
                      {getStatusIcon(ticket.status)}
                      <span className="ml-1">{getStatusLabel(ticket.status)}</span>
                    </Badge>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground space-x-4 mb-2">
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{ticket.district}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{new Date(ticket.created_at).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {ticket.address}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {ticket.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredTickets.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium text-brand-blue mb-2">Nenhum resultado encontrado</h3>
                  <p className="text-muted-foreground">
                    Tente ajustar os filtros ou termos de busca
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>

      {/* Legend for Map */}
      {viewMode === 'map' && (
        <div className="absolute bottom-4 left-4 bg-card rounded-lg shadow-lg p-3 border border-border">
          <h4 className="font-medium text-sm mb-2">Legenda</h4>
          <div className="space-y-1">
            <div className="flex items-center text-xs">
              <div className="w-3 h-3 rounded-full bg-status-pending mr-2"></div>
              <span>Pendente</span>
            </div>
            <div className="flex items-center text-xs">
              <div className="w-3 h-3 rounded-full bg-status-progress mr-2"></div>
              <span>Em andamento</span>
            </div>
            <div className="flex items-center text-xs">
              <div className="w-3 h-3 rounded-full bg-status-resolved mr-2"></div>
              <span>Resolvido</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}