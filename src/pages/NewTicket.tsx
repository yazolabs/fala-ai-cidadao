import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { 
  ArrowLeft,
  ArrowRight,
  Construction,
  Heart,
  Book,
  Shield,
  Bus,
  Lightbulb,
  Trash2,
  Leaf,
  Users,
  MapPin,
  Camera,
  CheckCircle
} from 'lucide-react';

const categories = [
  { id: '1', name: 'Infraestrutura', slug: 'infraestrutura', color: '#1D3E53', icon: Construction },
  { id: '2', name: 'Saúde', slug: 'saude', color: '#2F9E44', icon: Heart },
  { id: '3', name: 'Educação', slug: 'educacao', color: '#F28C00', icon: Book },
  { id: '4', name: 'Segurança', slug: 'seguranca', color: '#E74C3C', icon: Shield },
  { id: '5', name: 'Transporte', slug: 'transporte', color: '#3498DB', icon: Bus },
  { id: '6', name: 'Iluminação', slug: 'iluminacao', color: '#F1C40F', icon: Lightbulb },
  { id: '7', name: 'Limpeza Urbana', slug: 'limpeza-urbana', color: '#2ECC71', icon: Trash2 },
  { id: '8', name: 'Meio Ambiente', slug: 'meio-ambiente', color: '#27AE60', icon: Leaf },
  { id: '9', name: 'Assistência Social', slug: 'assistencia-social', color: '#8E44AD', icon: Users },
];

export default function NewTicket() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    category_id: '',
    title: '',
    description: '',
    address: '',
    district: '',
    city: 'São Paulo',
    state: 'SP',
    lat: -23.5505,
    lng: -46.6333,
    attachments: [] as File[],
  });

  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: 'Chamado criado com sucesso!',
      description: 'Você receberá atualizações sobre o andamento.',
    });
    
    setIsSubmitting(false);
    navigate('/tickets');
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.category_id !== '';
      case 2: return formData.title.trim() !== '' && formData.description.trim() !== '';
      case 3: return formData.address.trim() !== '' && formData.district.trim() !== '';
      case 4: return true; // Optional media
      case 5: return true;
      default: return false;
    }
  };

  const selectedCategory = categories.find(c => c.id === formData.category_id);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-brand-blue">Novo Chamado</h1>
              <p className="text-sm text-muted-foreground">
                Etapa {currentStep} de {totalSteps}
              </p>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4 w-full bg-muted rounded-full h-2">
          <div 
            className="bg-brand-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-24">
        <Card>
          <CardHeader>
            <CardTitle className="text-brand-blue">
              {currentStep === 1 && 'Selecione a categoria'}
              {currentStep === 2 && 'Descreva o problema'}
              {currentStep === 3 && 'Onde está o problema?'}
              {currentStep === 4 && 'Adicionar fotos (opcional)'}
              {currentStep === 5 && 'Revisão e confirmação'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Step 1: Category Selection */}
            {currentStep === 1 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  const isSelected = formData.category_id === category.id;
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => setFormData({ ...formData, category_id: category.id })}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isSelected 
                          ? 'border-brand-primary bg-brand-primary/10' 
                          : 'border-border hover:border-brand-primary/50'
                      }`}
                    >
                      <IconComponent 
                        className="h-8 w-8 mx-auto mb-2"
                        style={{ color: category.color }}
                      />
                      <p className="text-sm font-medium text-center">{category.name}</p>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Step 2: Description */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Título do problema</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Lâmpada queimada na rua..."
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Descrição detalhada</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva o problema com detalhes..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={5}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {formData.description.length}/500 caracteres
                  </p>
                </div>
                {selectedCategory && (
                  <Badge style={{ backgroundColor: selectedCategory.color }} className="text-white">
                    {selectedCategory.name}
                  </Badge>
                )}
              </div>
            )}

            {/* Step 3: Location */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    placeholder="Rua, número..."
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="district">Bairro</Label>
                  <Input
                    id="district"
                    placeholder="Nome do bairro"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">Estado</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    />
                  </div>
                </div>
                
                {/* Mock Map */}
                <div className="h-48 bg-muted/20 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-brand-primary mx-auto mb-2" />
                    <p className="text-sm font-medium">Localização no mapa</p>
                    <p className="text-xs text-muted-foreground">Toque para ajustar a posição</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Media Upload */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Camera className="h-12 w-12 text-brand-primary mx-auto mb-4" />
                  <h3 className="font-medium mb-2">Adicionar fotos</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Até 3 fotos para ajudar a identificar o problema
                  </p>
                  <Button variant="outline">
                    <Camera className="mr-2 h-4 w-4" />
                    Selecionar Fotos
                  </Button>
                </div>
                
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    As fotos ajudam os técnicos a entender melhor o problema
                  </p>
                </div>
              </div>
            )}

            {/* Step 5: Review */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Categoria</p>
                    <p className="font-medium">{selectedCategory?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Título</p>
                    <p className="font-medium">{formData.title}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Descrição</p>
                    <p className="text-sm">{formData.description}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Localização</p>
                    <p className="text-sm">{formData.address}, {formData.district}</p>
                  </div>
                </div>
                
                <div className="bg-brand-primary/10 border border-brand-primary/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-brand-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium text-brand-blue">Pronto para enviar!</h4>
                      <p className="text-sm text-muted-foreground">
                        Após o envio, você receberá um número de protocolo e atualizações por email.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 safe-area-pb">
        <div className="flex justify-between space-x-3">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex-1"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          
          {currentStep < totalSteps ? (
            <Button 
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex-1 bg-brand-primary hover:bg-brand-primary-hover"
            >
              Próximo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 bg-brand-green hover:bg-brand-green/90"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Chamado'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}