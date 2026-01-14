# MilesAI - Manual de Desenvolvimento com Vibecoding

## 🎯 VISÃO GERAL

Este manual guia o desenvolvimento de cada recurso do MilesAI usando **vibecoding** - uma abordagem de desenvolvimento ágil focada em prototipagem rápida com Claude Code e ferramentas de IA.

---

## 🚀 METODOLOGIA VIBECODING

### O que é Vibecoding?

Vibecoding é uma metodologia que combina:
- ✅ **Prompts** detalhados e contextuais
- ✅ **Prototipagem** ultra-rápida
- ✅ **Iteração** constante com feedback
- ✅ **Automação** de tarefas repetitivas
- ✅ **Integração** contínua de código

### Ferramentas Utilizadas

1. **Claude Code** - IA para geração de código
2. **Cursor IDE** - Editor com IA integrada
3. **Vercel** - Deploy automático
4. **Supabase** - Backend como serviço
5. **Tailwind CSS** - Estilização rápida

---

## 📱 RECURSO 1: SMART WALLET DASHBOARD

### Descrição
Dashboard pessoal consolidando todos os dados do usuário em uma única visualização.

### Stack Tecnológica
- **Frontend:** Next.js + TypeScript + Tailwind CSS
- **Backend:** Node.js + Express + PostgreSQL
- **Auth:** NextAuth.js
- **Charts:** Recharts
- **State:** Zustand

### Prompt Inicial para Claude

```
Crie um dashboard pessoal para um app de gestão de cartões de crédito e milhas com as seguintes características:

REQUISITOS:
- Next.js 14 com App Router
- TypeScript
- Tailwind CSS para estilização
- Componentes reutilizáveis
- Design moderno e limpo

CONTEÚDO DO DASHBOARD:
1. Header com saudação e avatar do usuário
2. Cards de resumo:
   - Total de pontos acumulados
   - Valor estimado dos pontos
   - Próxima fatura vencendo
   - Progresso de welcome bonus
3. Seção de cartões ativos com:
   - Imagem do cartão
   - Saldo de pontos
   - Próxima fatura
   - Progresso de bônus
4. Gráfico de gastos por categoria
5. Alertas e notificações recentes
6. Seção de "próximos passos" recomendados

ESTILO VISUAL:
- Cores: azul escuro primário, dourado de destaque
- Tipografia moderna (Inter)
- Cards com sombras suaves
- Gráficos coloridos mas elegantes
- Espaçamento generoso
- Mobile-responsive

Crie os componentes principais, páginas e estilos. Inclua dados mockados realistas para demonstração.
```

### Estrutura de Arquivos

```
smart-wallet/
├── app/
│   ├── dashboard/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── dashboard/
│   │   ├── DashboardHeader.tsx
│   │   ├── PointsSummary.tsx
│   │   ├── CreditCardsGrid.tsx
│   │   ├── SpendingChart.tsx
│   │   ├── AlertsSection.tsx
│   │   └── NextSteps.tsx
│   ├── ui/
│   │   ├── Card.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── Avatar.tsx
│   │   └── Button.tsx
│   └── shared/
│       ├── Layout.tsx
│       └── Navigation.tsx
├── lib/
│   ├── hooks/
│   │   ├── useUserData.ts
│   │   ├── useCreditCards.ts
│   │   └── usePointsData.ts
│   ├── utils/
│   │   ├── formatters.ts
│   │   ├── calculations.ts
│   │   └── constants.ts
│   └── types/
│       └── index.ts
└── data/
    └── mockData.ts
```

### Componente Principal: DashboardHeader

```typescript
// components/dashboard/DashboardHeader.tsx
'use client';

import { useUserData } from '@/lib/hooks/useUserData';
import { Avatar } from '@/components/ui/Avatar';
import { formatCurrency } from '@/lib/utils/formatters';

interface DashboardHeaderProps {
  className?: string;
}

export function DashboardHeader({ className = '' }: DashboardHeaderProps) {
  const { user, loading } = useUserData();
  
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-48"></div>
      </div>
    );
  }
  
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Bom dia' : 
                   currentHour < 18 ? 'Boa tarde' : 'Boa noite';
  
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          {greeting}, {user?.firstName}! 👋
        </h1>
        <p className="text-gray-600">
          Você tem {formatCurrency(user?.pointsValue || 0)} em pontos
        </p>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <BellIcon className="w-6 h-6 text-gray-600" />
        </button>
        <Avatar 
          src={user?.avatar} 
          name={user?.firstName} 
          size="md" 
        />
      </div>
    </div>
  );
}
```

### Hook para Dados: useUserData

```typescript
// lib/hooks/useUserData.ts
import { useState, useEffect } from 'react';
import { User } from '@/lib/types';

export function useUserData() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      // Mock API call - substituir com chamada real
      const response = await fetch('/api/user');
      const data = await response.json();
      setUser(data);
    } catch (err) {
      setError(err as Error);
      // Fallback para mock data em desenvolvimento
      setUser(getMockUserData());
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    try {
      const response = await fetch('/api/user', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const updated = await response.json();
      setUser(updated);
    } catch (err) {
      console.error('Failed to update user:', err);
    }
  };

  return { user, loading, error, updateUser };
}

function getMockUserData(): User {
  return {
    id: '1',
    firstName: 'João',
    lastName: 'Silva',
    email: 'joao@example.com',
    avatar: '/avatars/joao.jpg',
    pointsValue: 2847.50,
    totalPoints: 142375,
    nextBillDate: '2026-01-28',
    welcomeBonusProgress: 0.75,
  };
}
```

### Dados Mockados Realistas

```typescript
// data/mockData.ts
export const mockCreditCards = [
  {
    id: '1',
    name: 'Chase Sapphire Preferred',
    issuer: 'Chase',
    network: 'Visa',
    image: '/cards/sapphire-preferred.png',
    annualFee: 95,
    rewardsRate: '2x',
    bonusCategory: 'Travel & Dining',
    currentBalance: 0,
    nextBillDate: '2026-01-28',
    pointsBalance: 85432,
    welcomeBonus: {
      target: 4000,
      current: 3000,
      deadline: '2026-02-15',
    },
  },
  {
    id: '2',
    name: 'American Express Gold',
    issuer: 'Amex',
    network: 'Amex',
    image: '/cards/amex-gold.png',
    annualFee: 250,
    rewardsRate: '4x',
    bonusCategory: 'Dining & Groceries',
    currentBalance: 1245.80,
    nextBillDate: '2026-01-25',
    pointsBalance: 42156,
    welcomeBonus: {
      target: 6000,
      current: 5800,
      deadline: '2026-03-01',
    },
  },
  {
    id: '3',
    name: 'Hilton Honors Surpass',
    issuer: 'Amex',
    network: 'Amex',
    image: '/cards/hilton-surpass.png',
    annualFee: 95,
    rewardsRate: '12x',
    bonusCategory: 'Hilton Hotels',
    currentBalance: 0,
    nextBillDate: '2026-02-05',
    pointsBalance: 125890,
    welcomeBonus: null,
  },
];

export const mockSpendingData = [
  { category: 'Restaurants', amount: 1245, percentage: 35 },
  { category: 'Travel', amount: 980, percentage: 28 },
  { category: 'Groceries', amount: 756, percentage: 22 },
  { category: 'Gas', amount: 320, percentage: 9 },
  { category: 'Other', amount: 259, percentage: 6 },
];
```

### Comandos para Deploy Rápido

```bash
# 1. Criar projeto Next.js
npx create-next-app@latest milesai-smart-wallet --typescript --tailwind --app

# 2. Instalar dependências
cd milesai-smart-wallet
npm install @heroicons/react recharts zustand @next-auth/prisma-adapter

# 3. Configurar Supabase
npx supabase init
npx supabase start

# 4. Gerar tipos do Prisma
npx prisma generate
npx prisma db push

# 5. Deploy na Vercel
vercel --prod
```

---

## 🧮 RECURSO 2: POINTS VALUATION CALCULATOR

### Descrição
Calculadora interativa que mostra o valor real dos pontos em diferentes programas e cenários de redenção.

### Stack Tecnológica
- **Frontend:** React + TypeScript
- **Calculations:** JavaScript puro
- **Charts:** Chart.js
- **Forms:** React Hook Form
- **Validação:** Zod

### Prompt para Claude

```
Crie uma calculadora de valor de pontos e milhas com as seguintes características:

FUNCIONALIDADES:
1. Input de quantidade de pontos
2. Seleção do programa de pontos
3. Cálculo automático de valor em diferentes cenários:
   - Cash back
   - Travel portal
   - Transfer partners
4. Comparação entre programas
5. Histórico de cálculos
6. Exportar resultados

PROGRAMAS SUPORTADOS:
- Chase Ultimate Rewards
- Amex Membership Rewards
- Citi ThankYou Points
- Capital One Miles
- Marriott Bonvoy
- Hilton Honors
- American Airlines AAdvantage
- United MileagePlus

CENÁRIOS DE REDENÇÃO:
Mostrar valor para cada programa em:
- Cash back statement credit
- Travel portal booking
- Transfer to airline partners
- Transfer to hotel partners
- Average redemption value

INTERFACE:
- Design clean e moderno
- Cards para cada resultado
- Gráficos de comparação
- Cores que indicam valor (verde=alto, vermelho=baixo)
- Mobile responsive

TECNOLOGIA:
- React com TypeScript
- Tailwind CSS
- Chart.js para visualizações
- React Hook Form para inputs
- Local storage para histórico

Crie componentes reutilizáveis e organize bem o código.
```

### Estrutura do Componente

```typescript
// components/calculator/PointsCalculator.tsx
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const calculatorSchema = z.object({
  points: z.number().min(1).max(10000000),
  program: z.string(),
  redemptionType: z.enum(['cash', 'travel', 'transfer']),
});

type CalculatorFormData = z.infer<typeof calculatorSchema>;

interface ProgramValue {
  program: string;
  cashValue: number;
  travelValue: number;
  averageValue: number;
  transferPartners: TransferPartner[];
}

interface TransferPartner {
  name: string;
  ratio: number;
  estimatedValue: number;
}

export function PointsCalculator() {
  const [results, setResults] = useState<ProgramValue[]>([]);
  const [selectedProgram, setSelectedProgram] = useState('chase');
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  
  const { register, handleSubmit, formState: { errors } } = useForm<CalculatorFormData>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: { points: 10000 }
  });

  const onSubmit = (data: CalculatorFormData) => {
    const programData = getProgramData(data.program);
    const calculations = calculatePointValues(data.points, programData);
    
    setResults(calculations);
    
    // Salvar no histórico
    const historyItem: CalculationHistory = {
      id: Date.now().toString(),
      timestamp: new Date(),
      points: data.points,
      program: data.program,
      results: calculations,
    };
    
    setHistory(prev => [historyItem, ...prev.slice(0, 9)]);
    localStorage.setItem('calculatorHistory', JSON.stringify([historyItem, ...history]));
  };

  useEffect(() => {
    // Carregar histórico do localStorage
    const saved = localStorage.getItem('calculatorHistory');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulário */}
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantidade de Pontos
              </label>
              <input
                type="number"
                {...register('points', { valueAsNumber: true })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="10,000"
              />
              {errors.points && (
                <p className="mt-1 text-sm text-red-600">{errors.points.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Programa de Pontos
              </label>
              <select
                {...register('program')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="chase">Chase Ultimate Rewards</option>
                <option value="amex">Amex Membership Rewards</option>
                <option value="citi">Citi ThankYou Points</option>
                <option value="capital-one">Capital One Miles</option>
                <option value="marriott">Marriott Bonvoy</option>
                <option value="hilton">Hilton Honors</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Calcular Valor
            </button>
          </form>

          {/* Histórico */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Histórico</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                  onClick={() => restoreCalculation(item)}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      {item.points.toLocaleString()} pts
                    </span>
                    <span className="text-xs text-gray-500">
                      {item.program.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {item.timestamp.toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div className="lg:col-span-2">
          {results.length > 0 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Valor dos Seus Pontos</h2>
                
                {/* Cards de valor */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {results.map((result, index) => (
                    <ValueCard key={index} data={result} />
                  ))}
                </div>

                {/* Gráfico de comparação */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4">Comparação de Programas</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={results}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="program" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}`, 'Valor']} />
                      <Bar dataKey="averageValue" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

### Função de Cálculo

```typescript
// lib/utils/pointCalculations.ts
interface PointProgram {
  name: string;
  cashValue: number; // cents per point
  travelValue: number;
  transferPartners: TransferPartner[];
}

interface TransferPartner {
  name: string;
  ratio: number;
  estimatedValue: number;
}

export function calculatePointValues(points: number, program: PointProgram) {
  const results = [];
  
  // Valor em cash back
  const cashValue = (points * program.cashValue) / 100;
  
  // Valor no travel portal
  const travelValue = (points * program.travelValue) / 100;
  
  // Valor médio considerando transfer partners
  const avgTransferValue = program.transferPartners.reduce((acc, partner) => {
    return acc + partner.estimatedValue;
  }, 0) / program.transferPartners.length;
  
  const averageValue = (points * avgTransferValue) / 100;
  
  results.push({
    program: program.name,
    cashValue,
    travelValue,
    averageValue,
    transferPartners: program.transferPartners.map(partner => ({
      ...partner,
      transferredPoints: Math.floor(points * partner.ratio),
      estimatedValue: (Math.floor(points * partner.ratio) * partner.estimatedValue) / 100
    }))
  });
  
  return results;
}

export const PROGRAM_DATA: Record<string, PointProgram> = {
  chase: {
    name: 'Chase Ultimate Rewards',
    cashValue: 1.0,
    travelValue: 1.25,
    transferPartners: [
      { name: 'United MileagePlus', ratio: 1, estimatedValue: 1.6 },
      { name: 'Southwest Rapid Rewards', ratio: 1, estimatedValue: 1.4 },
      { name: 'World of Hyatt', ratio: 1, estimatedValue: 2.1 },
      { name: 'Marriott Bonvoy', ratio: 1, estimatedValue: 0.8 },
    ]
  },
  amex: {
    name: 'Amex Membership Rewards',
    cashValue: 0.6,
    travelValue: 1.0,
    transferPartners: [
      { name: 'Air Canada Aeroplan', ratio: 1, estimatedValue: 1.9 },
      { name: 'ANA Mileage Club', ratio: 1, estimatedValue: 2.8 },
      { name: 'Delta SkyMiles', ratio: 1, estimatedValue: 1.3 },
      { name: 'Hilton Honors', ratio: 1, estimatedValue: 0.5 },
    ]
  },
  // ... outros programas
};
```

### Componente ValueCard

```typescript
// components/calculator/ValueCard.tsx
interface ValueCardProps {
  data: {
    program: string;
    cashValue: number;
    travelValue: number;
    averageValue: number;
  };
}

export function ValueCard({ data }: ValueCardProps) {
  const getValueColor = (value: number) => {
    if (value >= 1500) return 'text-green-600';
    if (value >= 1000) return 'text-blue-600';
    if (value >= 500) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getBestValue = () => {
    const values = [data.cashValue, data.travelValue, data.averageValue];
    return Math.max(...values);
  };

  const isBestValue = (value: number) => {
    return value === getBestValue();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200">
      <h3 className="text-lg font-semibold mb-4">{data.program}</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Cash Back</span>
          <span className={`font-semibold ${getValueColor(data.cashValue)}`}>
            ${data.cashValue.toFixed(2)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Travel Portal</span>
          <span className={`font-semibold ${getValueColor(data.travelValue)}`}>
            ${data.travelValue.toFixed(2)}
          </span>
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t">
          <span className="text-sm font-medium">Average Value</span>
          <span className={`font-bold text-lg ${getValueColor(data.averageValue)}`}>
            ${data.averageValue.toFixed(2)}
          </span>
        </div>
        
        {isBestValue(data.averageValue) && (
          <div className="mt-3 p-2 bg-green-50 rounded text-center">
            <span className="text-green-700 text-sm font-medium">
              🏆 Melhor Valor!
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
```

### Comandos de Deploy

```bash
# Criar app React
npx create-react-app milesai-calculator --template typescript

# Instalar dependências
cd milesai-calculator
npm install recharts react-hook-form zod @hookform/resolvers

# Deploy na Vercel
vercel --prod
```

---

## 🔍 RECURSO 3: AWARD FLIGHT SEARCH ENGINE

### Descrição
Buscador de voos com pontos integrado que compara disponibilidade e custos entre diferentes programas.

### Stack Tecnológica
- **Frontend:** Next.js + React Query
- **Backend:** Node.js + Puppeteer (scraping)
- **Cache:** Redis
- **Queue:** Bull
- **APIs:** Roame.travel, AwardWallet

### Prompt para Claude

```
Crie um sistema de busca de voos com pontos (award flights) com as seguintes características:

PÁGINA DE BUSCA:
1. Formulário de busca com:
   - Origem (autocomplete de aeroportos)
   - Destino (autocomplete)
   - Datas (ida e volta)
   - Classe (Economy, Business, First)
   - Número de passageiros
   - Programas de pontos disponíveis

2. Resultados mostrando:
   - Voo por voo
   - Companhia aérea e número
   - Horários de partida/chegada
   - Custo em pontos + taxas
   - Valor CPM (cents per mile)
   - Disponibilidade de assentos
   - Recomendação de valor

3. Filtros laterais:
   - Por companhia aérea
   - Por aliança (Star Alliance, Oneworld, SkyTeam)
   - Por custo em pontos
   - Por horário
   - Por conexões

4. Comparação de programas:
   - Mostrar custo em diferentes programas
   - Sugerir transferências de pontos
   - Alertar sobre bônus ativos

TECNOLOGIA:
- Next.js 14 com App Router
- TypeScript
- React Query para data fetching
- Tailwind CSS
- Server components para performance
- Suspense boundaries
- Loading states elegantes

DADOS:
- Mock dados realistas para demonstração
- Estrutura preparada para integração real
- Cache strategy para performance

Crie toda a estrutura incluindo componentes, tipos, hooks e páginas.
```

### Estrutura de Componentes

```typescript
// app/flights/search/page.tsx
import { Suspense } from 'react';
import { FlightSearchForm } from '@/components/flights/FlightSearchForm';
import { FlightResults } from '@/components/flights/FlightResults';
import { FlightFilters } from '@/components/flights/FlightFilters';

export default function FlightSearchPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Busca de Voos com Pontos
          </h1>
          <p className="text-gray-600">
            Encontre os melhores voos utilizando suas milhas
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Formulário e Filtros */}
          <div className="lg:col-span-1">
            <FlightSearchForm />
            <FlightFilters className="mt-6" />
          </div>

          {/* Resultados */}
          <div className="lg:col-span-3">
            <Suspense fallback={<FlightResultsSkeleton />}>
              <FlightResults />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Componente de Busca

```typescript
// components/flights/FlightSearchForm.tsx
'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AirportInput } from './AirportInput';
import { DatePicker } from './DatePicker';
import { PassengerSelector } from './PassengerSelector';

const searchSchema = z.object({
  origin: z.string().min(3, 'Selecione um aeroporto de origem'),
  destination: z.string().min(3, 'Selecione um aeroporto de destino'),
  departureDate: z.date({
    required_error: 'Selecione a data de partida',
  }),
  returnDate: z.date().optional(),
  passengers: z.number().min(1).max(9),
  class: z.enum(['economy', 'premium-economy', 'business', 'first']),
  tripType: z.enum(['one-way', 'round-trip']),
});

type SearchFormData = z.infer<typeof searchSchema>;

export function FlightSearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSearching, setIsSearching] = useState(false);

  const { register, handleSubmit, control, formState: { errors }, watch, setValue } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      passengers: 1,
      class: 'economy',
      tripType: 'round-trip',
      // Preencher com valores da URL se existirem
      origin: searchParams.get('origin') || '',
      destination: searchParams.get('destination') || '',
    }
  });

  const tripType = watch('tripType');

  const onSubmit = async (data: SearchFormData) => {
    setIsSearching(true);
    
    // Construir URL com parâmetros
    const params = new URLSearchParams({
      origin: data.origin,
      destination: data.destination,
      departureDate: data.departureDate.toISOString().split('T')[0],
      passengers: data.passengers.toString(),
      class: data.class,
      tripType: data.tripType,
      ...(data.returnDate && {
        returnDate: data.returnDate.toISOString().split('T')[0]
      })
    });

    // Navegar para página de resultados
    router.push(`/flights/results?${params.toString()}`);
    
    setIsSearching(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Buscar Voo</h2>
      
      {/* Tipo de viagem */}
      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => setValue('tripType', 'round-trip')}
          className={`flex-1 py-2 px-4 rounded-lg border ${
            tripType === 'round-trip'
              ? 'bg-blue-50 border-blue-500 text-blue-700'
              : 'border-gray-300 text-gray-700'
          }`}
        >
          Ida e Volta
        </button>
        <button
          type="button"
          onClick={() => setValue('tripType', 'one-way')}
          className={`flex-1 py-2 px-4 rounded-lg border ${
            tripType === 'one-way'
              ? 'bg-blue-50 border-blue-500 text-blue-700'
              : 'border-gray-300 text-gray-700'
          }`}
        >
          Só Ida
        </button>
      </div>

      {/* Aeroportos */}
      <div className="space-y-4">
        <AirportInput
          label="Origem"
          name="origin"
          control={control}
          error={errors.origin?.message}
        />
        
        <AirportInput
          label="Destino"
          name="destination"
          control={control}
          error={errors.destination?.message}
        />
      </div>

      {/* Datas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <DatePicker
          label="Data de Ida"
          name="departureDate"
          control={control}
          error={errors.departureDate?.message}
          minDate={new Date()}
        />
        
        {tripType === 'round-trip' && (
          <DatePicker
            label="Data de Volta"
            name="returnDate"
            control={control}
            error={errors.returnDate?.message}
            minDate={watch('departureDate')}
          />
        )}
      </div>

      {/* Passageiros e Classe */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <PassengerSelector
          control={control}
          error={errors.passengers?.message}
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Classe
          </label>
          <select
            {...register('class')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="economy">Economy</option>
            <option value="premium-economy">Premium Economy</option>
            <option value="business">Business</option>
            <option value="first">First</option>
          </select>
        </div>
      </div>

      {/* Botão de busca */}
      <button
        type="submit"
        disabled={isSearching}
        className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSearching ? 'Buscando...' : 'Buscar Voos'}
      </button>
    </form>
  );
}
```

### Hook para Busca de Voos

```typescript
// lib/hooks/useFlightSearch.ts
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { FlightSearchParams, FlightResult } from '@/lib/types';

export function useFlightSearch() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<FlightResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    airlines: [] as string[],
    alliances: [] as string[],
    maxPoints: 1000000,
    minDepartureTime: '00:00',
    maxDepartureTime: '23:59',
  });

  const searchFlights = async (params: FlightSearchParams) => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock API call - substituir com chamada real
      const response = await fetch('/api/flights/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      
      if (!response.ok) {
        throw new Error('Failed to search flights');
      }
      
      const data = await response.json();
      setResults(data.flights);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      // Fallback para mock data
      setResults(getMockFlightResults(params));
    } finally {
      setLoading(false);
    }
  };

  // Filtrar resultados
  const filteredResults = results.filter(flight => {
    if (filters.airlines.length > 0 && !filters.airlines.includes(flight.airline)) {
      return false;
    }
    if (filters.alliances.length > 0 && !filters.alliances.includes(flight.alliance)) {
      return false;
    }
    if (flight.pointsCost > filters.maxPoints) {
      return false;
    }
    return true;
  });

  // Ordenar por valor (CPM)
  const sortedResults = [...filteredResults].sort((a, b) => b.cpm - a.cpm);

  return {
    results: sortedResults,
    loading,
    error,
    filters,
    setFilters,
    searchFlights,
  };
}

function getMockFlightResults(params: FlightSearchParams): FlightResult[] {
  return [
    {
      id: '1',
      airline: 'United Airlines',
      flightNumber: 'UA 934',
      alliance: 'Star Alliance',
      departure: {
        airport: params.origin,
        time: '22:30',
        date: params.departureDate,
      },
      arrival: {
        airport: params.destination,
        time: '11:45',
        date: addDays(params.departureDate, 1),
      },
      duration: '7h 15m',
      aircraft: 'Boeing 787',
      class: params.class,
      pointsCost: 70000,
      taxes: 150,
      cpm: 2.1,
      availability: 4,
      recommended: true,
      transferPrograms: [
        { program: 'Chase UR', points: 70000, ratio: 1 },
        { program: 'Amex MR', points: 70000, ratio: 1 },
      ]
    },
    // ... mais voos mockados
  ];
}
```

### API Route para Busca

```typescript
// app/api/flights/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';
import { scrapeFlightAvailability } from '@/lib/scrapers/flights';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { origin, destination, departureDate, returnDate, passengers, class: travelClass } = body;

    // Gerar cache key
    const cacheKey = `flights:${origin}:${destination}:${departureDate}:${passengers}:${travelClass}`;
    
    // Verificar cache primeiro
    const cached = await redis.get(cacheKey);
    if (cached) {
      return NextResponse.json({ flights: cached, cached: true });
    }

    // Buscar dados reais (scraping ou APIs)
    const flights = await scrapeFlightAvailability({
      origin,
      destination,
      departureDate,
      returnDate,
      passengers,
      class: travelClass,
    });

    // Cachear por 15 minutos
    await redis.setex(cacheKey, 900, JSON.stringify(flights));

    return NextResponse.json({ flights, cached: false });
  } catch (error) {
    console.error('Flight search error:', error);
    return NextResponse.json(
      { error: 'Failed to search flights' },
      { status: 500 }
    );
  }
}
```

---

## 📚 RECURSO 4: COURSE PLATFORM

### Descrição
Plataforma de cursos educacionais sobre milhas e viagens com progress tracking, quizzes e certificados.

### Stack Tecnológica
- **Frontend:** Next.js + MDX
- **Video:** Mux
- **Progress:** PostgreSQL
- **Gamification:** Redis
- **Certificates:** PDF generation

### Prompt para Claude

```
Crie uma plataforma de e-learning para cursos sobre milhas e viagens com as seguintes características:

ESTRUTURA DO CURSO:
- Curso "Miles & Points 101" (gratuito)
- 5 módulos com 3-5 aulas cada
- Vídeos, textos, quizzes
- Progress tracking
- Certificado de conclusão
- Gamificação com pontos

PÁGINAS Necessárias:
1. /courses - Lista de cursos disponíveis
2. /courses/[slug] - Página do curso com módulos
3. /courses/[slug]/[lesson] - Aula individual
4. /courses/certificates/[id] - Certificado

COMPONENTES:
- CourseCard: card de curso na listagem
- ModuleList: lista de módulos do curso
- LessonViewer: visualizador de aula
- ProgressBar: barra de progresso
- QuizComponent: quiz interativo
- CertificateGenerator: gerador de PDF

FUNCIONALIDADES:
- Autoplay de próxima aula
- Marcar aula como completa
- Salvar progresso
- Calcular % de conclusão
- Emitir certificado
- Gamificação (pontos, badges)

TECNOLOGIA:
- Next.js 14 com App Router
- TypeScript
- Tailwind CSS
- MDX para conteúdo
- Prisma + PostgreSQL
- NextAuth para autenticação

Crie toda a estrutura incluindo:
- Schemas de banco de dados
- APIs para progresso
- Components reutilizáveis
- Mock data para demonstração
```

### Schema do Banco

```typescript
// prisma/schema.prisma
model Course {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String
  thumbnail   String?
  isPublished Boolean  @default(false)
  isFree      Boolean  @default(true)
  duration    Int      // em minutos
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  modules     Module[]
  enrollments Enrollment[]
  
  @@map("courses")
}

model Module {
  id          String @id @default(cuid())
  title       String
  description String
  order       Int
  courseId    String
  
  course      Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)
  lessons     Lesson[]
  
  @@map("modules")
}

model Lesson {
  id          String     @id @default(cuid())
  title       String
  slug        String
  content     String     // MDX content
  videoUrl    String?
  duration    Int        // em minutos
  order       Int
  moduleId    String
  
  module      Module     @relation(fields: [moduleId], references: [id], onDelete: Cascade)
  progress    Progress[]
  quizzes     Quiz[]
  
  @@map("lessons")
}

model Enrollment {
  id         String   @id @default(cuid())
  userId     String
  courseId   String
  enrolledAt DateTime @default(now())
  completedAt DateTime?
  
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  course     Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)
  progress   Progress[]
  
  @@unique([userId, courseId])
  @@map("enrollments")
}

model Progress {
  id         String    @id @default(cuid())
  userId     String
  lessonId   String
  completed  Boolean   @default(false)
  completedAt DateTime?
  
  user       User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  lesson     Lesson    @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  
  @@unique([userId, lessonId])
  @@map("progress")
}

model Quiz {
  id       String    @id @default(cuid())
  question String
  options  String[]  // JSON array
  correct  Int       // index of correct answer
  lessonId String
  
  lesson   Lesson    @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  attempts QuizAttempt[]
  
  @@map("quizzes")
}

model QuizAttempt {
  id        String   @id @default(cuid())
  userId    String
  quizId    String
  selected  Int
  isCorrect Boolean
  attemptedAt DateTime @default(now())
  
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  quiz      Quiz     @relation(fields: [quizId], references: [id], onDelete: Cascade)
  
  @@map("quiz_attempts")
}
```

### Componente de Aula

```typescript
// components/courses/LessonViewer.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLessonProgress } from '@/lib/hooks/useLessonProgress';
import { VideoPlayer } from './VideoPlayer';
import { QuizComponent } from './QuizComponent';
import { ProgressBar } from './ProgressBar';

interface LessonViewerProps {
  course: Course;
  module: Module;
  lesson: Lesson;
  enrollment: Enrollment;
  nextLesson?: Lesson;
}

export function LessonViewer({ 
  course, 
  module, 
  lesson, 
  enrollment, 
  nextLesson 
}: LessonViewerProps) {
  const router = useRouter();
  const { progress, markAsComplete, isCompleted } = useLessonProgress(
    enrollment.userId,
    lesson.id
  );
  
  const [activeTab, setActiveTab] = useState<'content' | 'quiz'>('content');
  const [videoProgress, setVideoProgress] = useState(0);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // Auto-marcar como completo após 90% do vídeo
  useEffect(() => {
    if (videoProgress >= 90 && !isCompleted) {
      handleCompleteLesson();
    }
  }, [videoProgress, isCompleted]);

  const handleCompleteLesson = async () => {
    await markAsComplete();
    
    // Mostrar modal de conclusão
    setShowCompletionModal(true);
    
    // Award points
    await awardCompletionPoints(enrollment.userId, course.id);
    
    // Auto-proceed após 3 segundos se houver próxima aula
    if (nextLesson) {
      setTimeout(() => {
        router.push(`/courses/${course.slug}/${nextLesson.slug}`);
      }, 3000);
    }
  };

  const handleQuizComplete = async (score: number) => {
    if (score >= 70) {
      await handleCompleteLesson();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
            <p className="text-gray-600">
              {course.title} • {module.title}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <ProgressBar 
              progress={enrollment.progressPercentage} 
              className="w-32"
            />
            <span className="text-sm text-gray-500">
              {Math.round(enrollment.progressPercentage)}% completo
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('content')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'content'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Conteúdo
            </button>
            {lesson.quizzes.length > 0 && (
              <button
                onClick={() => setActiveTab('quiz')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'quiz'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Quiz ({lesson.quizzes.length})
              </button>
            )}
          </nav>
        </div>
      </div>

      {/* Conteúdo */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          {/* Vídeo */}
          {lesson.videoUrl && (
            <div className="bg-black rounded-lg overflow-hidden">
              <VideoPlayer
                url={lesson.videoUrl}
                onProgress={setVideoProgress}
                className="w-full h-96"
              />
            </div>
          )}

          {/* Conteúdo escrito */}
          <div className="prose prose-lg max-w-none">
            <MDXContent content={lesson.content} />
          </div>

          {/* Botão de completar */}
          {!isCompleted && (
            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-blue-900">
                    Marcar aula como completa
                  </h3>
                  <p className="text-blue-700 mt-1">
                    {lesson.quizzes.length > 0
                      ? 'Complete o quiz para marcar esta aula como concluída'
                      : 'Clique no botão abaixo para continuar'}
                  </p>
                </div>
                
                <button
                  onClick={handleCompleteLesson}
                  disabled={lesson.quizzes.length > 0}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Completar Aula
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quiz */}
      {activeTab === 'quiz' && lesson.quizzes.length > 0 && (
        <QuizComponent
          quizzes={lesson.quizzes}
          onComplete={handleQuizComplete}
          lessonId={lesson.id}
          userId={enrollment.userId}
        />
      )}

      {/* Modal de conclusão */}
      {showCompletionModal && (
        <CompletionModal
          lesson={lesson}
          nextLesson={nextLesson}
          onClose={() => setShowCompletionModal(false)}
        />
      )}
    </div>
  );
}
```

### Hook de Progresso

```typescript
// lib/hooks/useLessonProgress.ts
import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface UseLessonProgressReturn {
  progress: number;
  isCompleted: boolean;
  markAsComplete: () => Promise<void>;
  isLoading: boolean;
}

export function useLessonProgress(
  userId: string, 
  lessonId: string
): UseLessonProgressReturn {
  const queryClient = useQueryClient();
  
  // Buscar progresso atual
  const { data: progress, isLoading } = useQuery({
    queryKey: ['lesson-progress', userId, lessonId],
    queryFn: async () => {
      const response = await fetch(`/api/progress?userId=${userId}&lessonId=${lessonId}`);
      if (!response.ok) throw new Error('Failed to fetch progress');
      return response.json();
    },
  });

  // Mutation para marcar como completo
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, lessonId }),
      });
      if (!response.ok) throw new Error('Failed to update progress');
      return response.json();
    },
    onSuccess: () => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['lesson-progress', userId, lessonId] });
      queryClient.invalidateQueries({ queryKey: ['course-progress', userId] });
      queryClient.invalidateQueries({ queryKey: ['enrollments', userId] });
    },
  });

  const markAsComplete = async () => {
    await mutation.mutateAsync();
  };

  return {
    progress: progress?.percentage || 0,
    isCompleted: progress?.completed || false,
    markAsComplete,
    isLoading: isLoading || mutation.isPending,
  };
}
```

### Sistema de Gamificação

```typescript
// lib/gamification/achievements.ts
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  category: 'learning' | 'points' | 'community' | 'redemption';
  condition: (user: User) => boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-lesson',
    name: 'Primeiros Passos',
    description: 'Complete sua primeira aula',
    icon: '🎯',
    points: 100,
    category: 'learning',
    condition: (user) => user.completedLessons >= 1,
  },
  {
    id: 'course-complete',
    name: 'Graduado',
    description: 'Complete um curso inteiro',
    icon: '🎓',
    points: 500,
    category: 'learning',
    condition: (user) => user.completedCourses >= 1,
  },
  {
    id: 'quiz-master',
    name: 'Mestre dos Quizzes',
    description: 'Acerte 10 quizzes seguidos',
    icon: '🧠',
    points: 250,
    category: 'learning',
    condition: (user) => user.quizStreak >= 10,
  },
  {
    id: 'point-collector',
    name: 'Coletor de Pontos',
    description: 'Acumule 100,000 pontos',
    icon: '💰',
    points: 1000,
    category: 'points',
    condition: (user) => user.totalPoints >= 100000,
  },
  {
    id: 'first-redemption',
    name: 'Primeira Redenção',
    description: 'Realize sua primeira redenção',
    icon: '✈️',
    points: 750,
    category: 'redemption',
    condition: (user) => user.redemptions >= 1,
  },
];

export async function checkAndAwardAchievements(userId: string) {
  const user = await getUserWithStats(userId);
  const newAchievements: Achievement[] = [];

  for (const achievement of ACHIEVEMENTS) {
    const alreadyHas = await userHasAchievement(userId, achievement.id);
    if (!alreadyHas && achievement.condition(user)) {
      await awardAchievement(userId, achievement);
      newAchievements.push(achievement);
    }
  }

  return newAchievements;
}

async function awardAchievement(userId: string, achievement: Achievement) {
  await prisma.userAchievement.create({
    data: {
      userId,
      achievementId: achievement.id,
      awardedAt: new Date(),
    },
  });

  await prisma.user.update({
    where: { id: userId },
    data: { points: { increment: achievement.points } },
  });

  // Enviar notificação
  await sendNotification(userId, {
    type: 'achievement',
    title: `Conquista Desbloqueada: ${achievement.name}`,
    message: `Você ganhou ${achievement.points} pontos!`,
    data: { achievementId: achievement.id },
  });
}
```

---

## 🎯 RECURSO 5: DEAL ALERTS SYSTEM

### Descrição
Sistema de alertas inteligente que monitora ofertas de cartões, voos e hotéis em tempo real.

### Stack Tecnológica
- **Scheduler:** Bull Queue + Redis
- **Scraping:** Puppeteer + Cheerio
- **Notifications:** FCM + Email
- **Frontend:** React + WebSockets

### Prompt para Claude

```
Crie um sistema completo de alertas de deals para o MilesAI com as seguintes características:

TIPOS DE ALERTAS:
1. Credit Card Deals
   - Novos bônus de boas-vindas
   - Aumentos temporários
   - Ofertas targetizadas
   - Última chance alertas

2. Award Flight Deals
   - Mistake fares
   - Promoções de milhas
   - Flash sales
   - Error fares

3. Hotel Deals
   - Promoções de pontos
   - Free night certificates
   - Status challenges
   - Property sales

COMPONENTES:
- AlertManager: gerencia criação e configuração
- AlertList: lista de alertas ativos
- DealCard: card de deal individual
- NotificationCenter: centro de notificações
- SettingsPanel: configurações de preferências

FUNCIONALIDADES:
- Criar alertas personalizados
- Filtros por categoria, valor, destino
- Frequência de notificações
- Canais (push, email, SMS)
- Snooze e dismiss
- Histórico de alertas
- Analytics de performance

BACKEND:
- Scheduler para verificar deals
- Web scrapers para sites
- Queue system para processamento
- WebSocket para real-time
- Email templates
- Push notification service

Crie toda a estrutura incluindo:
- Banco de dados schema
- APIs REST
- Componentes React
- Workers para scraping
- Templates de email
```

### Sistema de Agendamento

```typescript
// workers/scrapers/dealScraper.ts
import { Queue } from 'bull';
import { redis } from '@/lib/redis';
import { scrapeCreditCardDeals } from './creditCardScrapers';
import { scrapeFlightDeals } from './flightScrapers';
import { scrapeHotelDeals } from './hotelScrapers';

interface DealScraperConfig {
  sources: string[];
  frequency: 'hourly' | 'daily' | 'weekly';
  categories: DealCategory[];
}

export class DealScraperWorker {
  private queue: Queue;
  
  constructor() {
    this.queue = new Queue('deal-scraping', {
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || '6379'),
      },
    });
    
    this.setupProcessors();
    this.scheduleJobs();
  }
  
  private setupProcessors() {
    // Processador de credit cards
    this.queue.process('scrape-credit-cards', async (job) => {
      const { sources } = job.data;
      const deals = await this.scrapeCreditCards(sources);
      await this.processAndNotify(deals, 'credit-card');
    });
    
    // Processador de voos
    this.queue.process('scrape-flight-deals', async (job) => {
      const { sources } = job.data;
      const deals = await this.scrapeFlightDeals(sources);
      await this.processAndNotify(deals, 'flight');
    });
    
    // Processador de hotéis
    this.queue.process('scrape-hotel-deals', async (job) => {
      const { sources } = job.data;
      const deals = await this.scrapeHotelDeals(sources);
      await this.processAndNotify(deals, 'hotel');
    });
  }
  
  private async scrapeCreditCards(sources: string[]): Promise<CreditCardDeal[]> {
    const allDeals: CreditCardDeal[] = [];
    
    for (const source of sources) {
      try {
        const deals = await scrapeCreditCardDeals(source);
        allDeals.push(...deals);
      } catch (error) {
        console.error(`Failed to scrape ${source}:`, error);
      }
    }
    
    return allDeals;
  }
  
  private async processAndNotify(deals: Deal[], category: DealCategory) {
    // Filtrar deals novos ou atualizados
    const newDeals = await this.filterNewDeals(deals);
    
    // Encontrar usuários interessados
    for (const deal of newDeals) {
      const subscribers = await this.findSubscribers(deal, category);
      
      // Enviar notificações
      for (const user of subscribers) {
        await this.sendDealNotification(user, deal);
      }
    }
    
    // Salvar no banco
    await this.saveDeals(newDeals, category);
  }
  
  private async findSubscribers(deal: Deal, category: DealCategory): Promise<User[]> {
    // Query complexa para encontrar usuários interessados
    const users = await prisma.user.findMany({
      where: {
        alertPreferences: {
          some: {
            category,
            isActive: true,
            // Filtros específicos do deal
            OR: [
              { allDeals: true },
              { 
                airlines: { hasSome: deal.airlines || [] },
                minValue: { lte: deal.value },
                destinations: { hasSome: deal.destinations || [] },
              },
            ],
          },
        },
      },
    });
    
    return users;
  }
  
  private scheduleJobs() {
    // Credit cards: verificar a cada 2 horas
    this.queue.add(
      'scrape-credit-cards',
      { sources: ['tpg', 'doctor-of-credit', 'daily-drop'] },
      { repeat: { cron: '0 */2 * * *' } }
    );
    
    // Flight deals: verificar a cada hora
    this.queue.add(
      'scrape-flight-deals',
      { sources: ['thrifty-traveler', 'roame', 'awayz'] },
      { repeat: { cron: '0 * * * *' } }
    );
    
    // Hotel deals: verificar 3x ao dia
    this.queue.add(
      'scrape-hotel-deals',
      { sources: ['points-guy', 'loyalty-lobby'] },
      { repeat: { cron: '0 8,14,20 * * *' } }
    );
  }
}

// Inicializar worker
const dealScraper = new DealScraperWorker();
```

### Componente de Alerta

```typescript
// components/alerts/DealCard.tsx
interface DealCardProps {
  deal: Deal;
  onDismiss?: (dealId: string) => void;
  onSave?: (dealId: string) => void;
  onShare?: (deal: Deal) => void;
}

export function DealCard({ deal, onDismiss, onSave, onShare }: DealCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const timeAgo = formatDistanceToNow(new Date(deal.createdAt), { addSuffix: true });
  const urgency = getUrgencyLevel(deal);

  const getCategoryIcon = (category: DealCategory) => {
    switch (category) {
      case 'credit-card': return '💳';
      case 'flight': return '✈️';
      case 'hotel': return '🏨';
      case 'transfer-bonus': return '🔄';
      default: return '🎯';
    }
  };

  const getUrgencyColor = (urgency: 'low' | 'medium' | 'high' | 'urgent') => {
    switch (urgency) {
      case 'urgent': return 'border-red-500 bg-red-50';
      case 'high': return 'border-orange-500 bg-orange-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      default: return 'border-gray-200';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border-2 ${getUrgencyColor(urgency)} transition-all`}>
      {/* Header */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{getCategoryIcon(deal.category)}</span>
            <div>
              <h3 className="font-semibold text-gray-900">{deal.title}</h3>
              <p className="text-sm text-gray-500">
                {deal.source} • {timeAgo}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {urgency === 'urgent' && (
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                URGENTE
              </span>
            )}
            
            <button
              onClick={() => onSave?.(deal.id)}
              className="p-1 text-gray-400 hover:text-yellow-500"
            >
              <BookmarkIcon className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => onDismiss?.(deal.id)}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Conteúdo */}
        <p className="mt-3 text-gray-700">{deal.description}</p>

        {/* Detalhes expandidos */}
        {isExpanded && (
          <div className="mt-4 space-y-3">
            {deal.details && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Detalhes</h4>
                <p className="text-sm text-gray-700">{deal.details}</p>
              </div>
            )}
            
            {deal.value && (
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-gray-600">Valor estimado:</span>
                <span className="font-semibold text-green-600">
                  {formatCurrency(deal.value)}
                </span>
              </div>
            )}
            
            {deal.expiresAt && (
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-gray-600">Expira em:</span>
                <span className="font-medium text-red-600">
                  {format(new Date(deal.expiresAt), 'dd/MM/yyyy HH:mm')}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            {isExpanded ? 'Ver menos' : 'Ver mais'}
          </button>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onShare?.(deal)}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-700 border border-gray-300 rounded-md"
            >
              Compartilhar
            </button>
            
            <a
              href={deal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Ver Oferta
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### API de Alertas

```typescript
// app/api/alerts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { 
      category, 
      preferences, 
      channels, 
      frequency 
    } = body;

    // Criar alerta
    const alert = await prisma.alert.create({
      data: {
        userId: session.user.id,
        category,
        preferences: JSON.stringify(preferences),
        channels: JSON.stringify(channels),
        frequency,
        isActive: true,
      },
    });

    // Enviar email de confirmação
    if (channels.includes('email')) {
      await sendAlertConfirmationEmail(session.user.email, alert);
    }

    return NextResponse.json({ alert });
  } catch (error) {
    console.error('Create alert error:', error);
    return NextResponse.json(
      { error: 'Failed to create alert' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const alerts = await prisma.alert.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ alerts });
  } catch (error) {
    console.error('Get alerts error:', error);
    return NextResponse.json(
      { error: 'Failed to get alerts' },
      { status: 500 }
    );
  }
}
```

---

## 📝 TEMPLATES DE EMAIL

### Template: Deal Alert

```html
<!-- emails/deal-alert.html -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🚨 Deal Alert - MilesAI</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 30px; background-color: #1a365d; border-radius: 8px 8px 0 0; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold;">
                                🚨 Deal Alert
                            </h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 30px;">
                            <h2 style="color: #2d3748; margin: 0 0 20px 0; font-size: 20px;">
                                {{deal.title}}
                            </h2>
                            
                            <p style="color: #4a5568; font-size: 16px; line-height: 1.5; margin: 0 0 20px 0;">
                                {{deal.description}}
                            </p>
                            
                            <!-- Deal Details -->
                            <div style="background-color: #f7fafc; padding: 20px; border-radius: 6px; margin: 20px 0;">
                                <h3 style="color: #2d3748; margin: 0 0 15px 0; font-size: 16px; font-weight: bold;">
                                    Detalhes da Oferta
                                </h3>
                                
                                <table width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td style="color: #4a5568; font-size: 14px; padding: 5px 0;">
                                            Categoria:
                                        </td>
                                        <td style="color: #2d3748; font-size: 14px; font-weight: bold; padding: 5px 0;">
                                            {{deal.category}}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="color: #4a5568; font-size: 14px; padding: 5px 0;">
                                            Valor Estimado:
                                        </td>
                                        <td style="color: #38a169; font-size: 14px; font-weight: bold; padding: 5px 0;">
                                            {{deal.value}}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="color: #4a5568; font-size: 14px; padding: 5px 0;">
                                            Expira em:
                                        </td>
                                        <td style="color: #e53e3e; font-size: 14px; font-weight: bold; padding: 5px 0;">
                                            {{deal.expiresAt}}
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            
                            <!-- CTA Button -->
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="{{deal.url}}" style="background-color: #3182ce; color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; display: inline-block;">
                                    Ver Oferta Agora
                                </a>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px 30px; border-top: 1px solid #e2e8f0; text-align: center;">
                            <p style="color: #718096; font-size: 14px; margin: 0;">
                                Você está recebendo este email porque configurou alertas no MilesAI.
                            </p>
                            <p style="color: #718096; font-size: 14px; margin: 10px 0 0 0;">
                                <a href="{{unsubscribeUrl}}" style="color: #3182ce; text-decoration: none;">
                                    Cancelar alertas
                                </a> • 
                                <a href="{{preferencesUrl}}" style="color: #3182ce; text-decoration: none;">
                                    Configurar preferências
                                </a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
```

---

## 🎨 DESIGN SYSTEM

### Cores e Estilos

```typescript
// lib/design/tokens.ts
export const colors = {
  primary: {
    50: '#ebf8ff',
    100: '#bee3f8',
    200: '#90cdf4',
    300: '#63b3ed',
    400: '#4299e1',
    500: '#3182ce',
    600: '#2b6cb0',
    700: '#2c5282',
    800: '#2a4365',
    900: '#1a365d',
  },
  secondary: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  success: {
    50: '#f0fff4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
} as const;

export const spacing = {
  px: '1px',
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
  40: '10rem',
  48: '12rem',
  56: '14rem',
  64: '16rem',
} as const;

export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
} as const;
```

---

## 🚀 DEPLOY E DEVOPS

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  # Frontend Next.js
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://milesai:milesai@postgres:5432/milesai
      - REDIS_URL=redis://redis:6379
      - NEXTAUTH_URL=http://localhost:3000
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
    depends_on:
      - postgres
      - redis
    volumes:
      - ./logs:/app/logs

  # Backend API
  backend:
    build:
      context: .
      dockerfile: Dockerfile.backend
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://milesai:milesai@postgres:5432/milesai
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - postgres
      - redis
    volumes:
      - ./logs:/app/logs

  # PostgreSQL Database
  postgres:
    image: postgres:15
    environment:
      - POSTGRES_USER=milesai
      - POSTGRES_PASSWORD=milesai
      - POSTGRES_DB=milesai
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"

  # Redis Cache & Queue
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes

  # Bull Queue Dashboard
  bull-board:
    image: deadly0/bull-board
    ports:
      - "3001:3000"
    environment:
      - REDIS_HOST=redis
      - REDIS_PORT=6379
    depends_on:
      - redis

  # Web Scraping Worker
  scraper:
    build:
      context: .
      dockerfile: Dockerfile.scraper
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://milesai:milesai@postgres:5432/milesai
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis
    volumes:
      - ./logs:/app/logs
    deploy:
      replicas: 3

  # Nginx Load Balancer
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/ssl
    depends_on:
      - frontend
      - backend

volumes:
  postgres_data:
  redis_data:
```

### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy MilesAI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Run linting
        run: npm run lint
      
      - name: Type check
        run: npm run type-check

  build-and-push:
    needs: test
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      
      - name: Log in to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
      
      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - name: Deploy to production
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.PRODUCTION_HOST }}
          username: ${{ secrets.PRODUCTION_USER }}
          key: ${{ secrets.PRODUCTION_SSH_KEY }}
          script: |
            cd /opt/milesai
            docker-compose pull
            docker-compose up -d
            docker system prune -f
      
      - name: Run database migrations
        run: |
          docker-compose exec -T backend npx prisma migrate deploy
      
      - name: Clear CloudFlare cache
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          command: purge everything

  notify:
    needs: deploy
    runs-on: ubuntu-latest
    if: always()
    
    steps:
      - name: Notify Slack
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          channel: '#deployments'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

---

## 📊 MONITORAMENTO

### Dashboard de Métricas

```typescript
// monitoring/metrics.ts
import { Registry, Counter, Histogram, Gauge } from 'prom-client';

export const register = new Registry();

// Métricas de negócio
export const userRegistrations = new Counter({
  name: 'milesai_user_registrations_total',
  help: 'Total number of user registrations',
  labelNames: ['source', 'plan'],
});

export const cardApplications = new Counter({
  name: 'milesai_card_applications_total',
  help: 'Total number of credit card applications',
  labelNames: ['issuer', 'card_type', 'status'],
});

export const pointsCalculated = new Counter({
  name: 'milesai_points_calculated_total',
  help: 'Total number of point calculations',
  labelNames: ['program', 'calculation_type'],
});

export const dealsNotified = new Counter({
  name: 'milesai_deals_notified_total',
  help: 'Total number of deal notifications sent',
  labelNames: ['category', 'channel'],
});

// Métricas de performance
export const apiLatency = new Histogram({
  name: 'milesai_api_latency_seconds',
  help: 'API request latency in seconds',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.1, 0.5, 1, 2, 5],
});

export const activeUsers = new Gauge({
  name: 'milesai_active_users',
  help: 'Number of active users in the last hour',
});

export const cacheHitRate = new Gauge({
  name: 'milesai_cache_hit_rate',
  help: 'Cache hit rate percentage',
});

// Registrar todas as métricas
register.registerMetric(userRegistrations);
register.registerMetric(cardApplications);
register.registerMetric(pointsCalculated);
register.registerMetric(dealsNotified);
register.registerMetric(apiLatency);
register.registerMetric(activeUsers);
register.registerMetric(cacheHitRate);
```

---

## 🎯 CHECKLIST DE IMPLEMENTAÇÃO

### Fase 1: MVP (Mês 1-3)
- [ ] Setup inicial do projeto
- [ ] Autenticação básica
- [ ] Dashboard pessoal
- [ ] Calculadora de pontos
- [ ] Curso básico (3 módulos)
- [ ] Web scraping inicial
- [ ] Deploy na Vercel

### Fase 2: Growth (Mês 4-6)
- [ ] Mobile app
- [ ] Alertas básicos
- [ ] Comunidade
- [ ] Programa de afiliados
- [ ] Analytics
- [ ] Monetização inicial

### Fase 3: Scale (Mês 7-12)
- [ ] IA avançada
- [ ] Pro features
- [ ] B2B
- [ ] API pública
- [ ] Expansão internacional

---

## 🚀 COMANDOS ÚTEIS

### Desenvolvimento Rápido

```bash
# Iniciar ambiente de desenvolvimento
npm run dev

# Testar scrapers
npm run test:scrapers

# Gerar tipos do Prisma
npx prisma generate

# Migrar banco de dados
npx prisma migrate dev

# Seed database
npm run db:seed

# Testes
npm test
npm run test:watch

# Linting
npm run lint
npm run lint:fix

# Build
npm run build

# Deploy staging
npm run deploy:staging

# Deploy production
npm run deploy:prod
```

### Debugging

```bash
# Debug com Node.js
node --inspect-brk dist/index.js

# Debug scrapers
DEBUG=scraper:* npm run scrape

# Ver logs do worker
npm run logs:worker

# Monitorar filas
npm run monitor:queues
```

---

## 📚 RECURSOS ADICIONAIS

### Links Úteis
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Query](https://tanstack.com/query/latest)
- [Bull Queue](https://github.com/OptimalBits/bull)
- [Puppeteer](https://pptr.dev/)
- [Vercel](https://vercel.com/docs)
- [Supabase](https://supabase.com/docs)

### Comunidades
- [BlackHatWorld](https://www.blackhatworld.com/) - Estratégias de marketing
- [r/churning](https://www.reddit.com/r/churning/) - Travel hacking
- [FlyerTalk](https://www.flyertalk.com/) - Fórum de viagens

---

## 🎉 CONCLUSÃO

Este manual fornece uma base sólida para desenvolver o MilesAI usando vibecoding. A abordagem de prototipagem rápida com Claude Code permite:

1. **Velocidade**: De ideia a MVP em semanas, não meses
2. **Qualidade**: Código gerado segue best practices
3. **Iteração**: Feedback rápido e melhorias contínuas
4. **Escala**: Arquitetura preparada para crescimento

### Próximos Passos

1. **Validar conceito**: Testar com usuários reais
2. **Iterar baseado em feedback**: Melhorar continuamente
3. **Escalar equipe**: Contratar desenvolvedores
4. **Expandir features**: Adicionar novos recursos
5. **Dominar mercado**: Tornar-se líder no nicho

### Contato

Para dúvidas ou sugestões sobre este manual, entre em contato através dos canais oficiais do MilesAI.

---

**Boa sorte na jornada de construir o superapp definitivo de milhas e viagens! 🚀**