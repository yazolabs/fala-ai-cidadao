import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Plus, Pencil, Trash2, Search, MoreHorizontal, Eye, Users, TrendingUp, Calendar, MapPin } from 'lucide-react';

// Mock data
const campaigns = [
  {
    id: '1',
    title: 'Campanha de Limpeza - Verão 2024',
    description: 'Mutirão de limpeza urbana nas praças e parques da cidade',
    category: 'Limpeza Urbana',
    region: 'Centro',
    start_at: '2024-02-01',
    end_at: '2024-02-28',
    image_url: null,
    active: true,
    enrollments: 127,
    impact: 85
  },
  {
    id: '2',
    title: 'Iluminação para Todos',
    description: 'Identificação e reparo de pontos de iluminação pública defeituosos',
    category: 'Iluminação Pública',
    region: 'Norte',
    start_at: '2024-01-15',
    end_at: '2024-03-15',
    image_url: null,
    active: true,
    enrollments: 89,
    impact: 92
  },
  {
    id: '3',
    title: 'Ruas Seguras',
    description: 'Campanha para melhoria da pavimentação em bairros residenciais',
    category: 'Pavimentação',
    region: 'Sul',
    start_at: '2024-01-01',
    end_at: '2024-01-31',
    image_url: null,
    active: false,
    enrollments: 156,
    impact: 78
  },
];

const enrollments = [
  { id: '1', campaign_id: '1', user_name: 'Maria Silva', user_email: 'maria@email.com', joined_at: '2024-01-20' },
  { id: '2', campaign_id: '1', user_name: 'João Santos', user_email: 'joao@email.com', joined_at: '2024-01-22' },
  { id: '3', campaign_id: '1', user_name: 'Ana Costa', user_email: 'ana@email.com', joined_at: '2024-01-25' },
];

export default function Campaigns() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || !statusFilter || 
                         (statusFilter === 'active' && campaign.active) ||
                         (statusFilter === 'inactive' && !campaign.active);
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (campaign: any) => {
    setSelectedCampaign(campaign);
    setIsDetailOpen(true);
  };

  const getStatusBadgeVariant = (active: boolean) => {
    return active ? 'default' : 'secondary';
  };

  const getImpactColor = (impact: number) => {
    if (impact >= 90) return 'text-green-600';
    if (impact >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-brand-blue">Campanhas</h1>
          <p className="text-muted-foreground">Gerencie campanhas de engajamento comunitário</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-brand-orange hover:bg-brand-orange/90">
              <Plus className="h-4 w-4 mr-2" />
              Nova Campanha
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Nova Campanha</DialogTitle>
              <DialogDescription>Crie uma nova campanha de engajamento</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Título</Label>
                <Input id="title" placeholder="Nome da campanha" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="description" className="text-right mt-2">Descrição</Label>
                <Textarea 
                  id="description" 
                  placeholder="Descreva os objetivos da campanha" 
                  className="col-span-3 min-h-[80px]" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">Categoria</Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione uma categoria (opcional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="limpeza">Limpeza Urbana</SelectItem>
                    <SelectItem value="iluminacao">Iluminação Pública</SelectItem>
                    <SelectItem value="pavimentacao">Pavimentação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="region" className="text-right">Região</Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione uma região (opcional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="centro">Centro</SelectItem>
                    <SelectItem value="norte">Norte</SelectItem>
                    <SelectItem value="sul">Sul</SelectItem>
                    <SelectItem value="leste">Leste</SelectItem>
                    <SelectItem value="oeste">Oeste</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="start_date" className="text-right">Data Início</Label>
                <Input id="start_date" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="end_date" className="text-right">Data Fim</Label>
                <Input id="end_date" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">Imagem</Label>
                <Input id="image" type="file" accept="image/*" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="active" className="text-right">Ativo</Label>
                <Switch id="active" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
              <Button className="bg-brand-orange hover:bg-brand-orange/90">Criar Campanha</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Campanhas</CardTitle>
          <CardDescription>Gerencie campanhas ativas e finalizadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar campanhas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="active">Ativas</SelectItem>
                <SelectItem value="inactive">Inativas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Região</TableHead>
                <TableHead>Período</TableHead>
                <TableHead>Inscritos</TableHead>
                <TableHead>Impacto</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{campaign.title}</div>
                      <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                        {campaign.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {campaign.category ? (
                      <Badge variant="outline">{campaign.category}</Badge>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {campaign.region}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3" />
                      {new Date(campaign.start_at).toLocaleDateString('pt-BR')} - {new Date(campaign.end_at).toLocaleDateString('pt-BR')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {campaign.enrollments}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`flex items-center gap-1 font-medium ${getImpactColor(campaign.impact)}`}>
                      <TrendingUp className="h-4 w-4" />
                      {campaign.impact}%
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(campaign.active)}>
                      {campaign.active ? 'Ativa' : 'Inativa'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(campaign)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Campaign Details Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedCampaign?.title}</DialogTitle>
            <DialogDescription>{selectedCampaign?.description}</DialogDescription>
          </DialogHeader>
          {selectedCampaign && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-2xl font-bold text-brand-orange">{selectedCampaign.enrollments}</div>
                    <p className="text-sm text-muted-foreground">Cidadãos Inscritos</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className={`text-2xl font-bold ${getImpactColor(selectedCampaign.impact)}`}>
                      {selectedCampaign.impact}%
                    </div>
                    <p className="text-sm text-muted-foreground">Índice de Impacto</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Cidadãos Inscritos</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Data de Inscrição</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {enrollments
                        .filter(e => e.campaign_id === selectedCampaign.id)
                        .map((enrollment) => (
                        <TableRow key={enrollment.id}>
                          <TableCell className="font-medium">{enrollment.user_name}</TableCell>
                          <TableCell>{enrollment.user_email}</TableCell>
                          <TableCell>{new Date(enrollment.joined_at).toLocaleDateString('pt-BR')}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}