import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Users,
  Download,
  Calendar,
  Filter
} from 'lucide-react';

// Mock data for charts
const ticketsByCategory = [
  { name: 'Iluminação', value: 45, color: '#F59E0B' },
  { name: 'Infraestrutura', value: 32, color: '#EF4444' },
  { name: 'Limpeza', value: 28, color: '#10B981' },
  { name: 'Transporte', value: 18, color: '#3B82F6' },
  { name: 'Saúde', value: 12, color: '#8B5CF6' },
];

const ticketsByMonth = [
  { month: 'Jan', total: 120, resolved: 95, pending: 25 },
  { month: 'Fev', total: 135, resolved: 110, pending: 25 },
  { month: 'Mar', total: 148, resolved: 125, pending: 23 },
  { month: 'Abr', total: 162, resolved: 140, pending: 22 },
  { month: 'Mai', total: 175, resolved: 155, pending: 20 },
  { month: 'Jun', total: 185, resolved: 170, pending: 15 },
];

const resolutionTimes = [
  { category: 'Iluminação', avgHours: 48, target: 72, performance: 67 },
  { category: 'Limpeza', avgHours: 36, target: 48, performance: 75 },
  { category: 'Infraestrutura', avgHours: 96, target: 120, performance: 80 },
  { category: 'Transporte', avgHours: 72, target: 96, performance: 75 },
  { category: 'Saúde', avgHours: 24, target: 24, performance: 100 },
];

const districtStats = [
  { district: 'Centro', tickets: 85, resolved: 78, rate: 92 },
  { district: 'Zona Norte', tickets: 92, resolved: 80, rate: 87 },
  { district: 'Zona Sul', tickets: 67, resolved: 61, rate: 91 },
  { district: 'Zona Leste', tickets: 74, resolved: 65, rate: 88 },
  { district: 'Zona Oeste', tickets: 56, resolved: 48, rate: 86 },
];

export function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState('last30');
  const [selectedDistrict, setSelectedDistrict] = useState('all');

  const handleExportData = (type: string) => {
    // In a real app, this would generate and download CSV/PDF
    console.log(`Exporting ${type} data...`);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-brand-blue">Relatórios e Analytics</h1>
          <p className="text-muted-foreground">
            Acompanhe métricas e desempenho da plataforma
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7">Últimos 7 dias</SelectItem>
              <SelectItem value="last30">Últimos 30 dias</SelectItem>
              <SelectItem value="last90">Últimos 90 dias</SelectItem>
              <SelectItem value="last365">Último ano</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={() => handleExportData('full')}>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Chamados</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-brand-green" />
              +12% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Resolução</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.3%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-brand-green" />
              +3.2% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio de Resolução</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2 dias</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingDown className="h-3 w-3 mr-1 text-brand-green" />
              -0.5 dias em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SLA Cumprido</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92.1%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-brand-green" />
              +1.8% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tickets by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Chamados por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ticketsByCategory}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {ticketsByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Tendência Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ticketsByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#FF7A00" 
                  strokeWidth={2}
                  name="Total"
                />
                <Line 
                  type="monotone" 
                  dataKey="resolved" 
                  stroke="#2F9E44" 
                  strokeWidth={2}
                  name="Resolvidos"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Resolution Times by Category */}
      <Card>
        <CardHeader>
          <CardTitle>Tempo de Resolução por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {resolutionTimes.map((item) => (
              <div key={item.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item.category}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      {item.avgHours}h / {item.target}h
                    </span>
                    <Badge 
                      variant={item.performance >= 80 ? 'default' : 'destructive'}
                      className={item.performance >= 80 ? 'bg-brand-green' : ''}
                    >
                      {item.performance}%
                    </Badge>
                  </div>
                </div>
                <Progress value={item.performance} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* District Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Desempenho por Região</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={districtStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="district" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tickets" fill="#FF7A00" name="Total de Chamados" />
              <Bar dataKey="resolved" fill="#2F9E44" name="Resolvidos" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}