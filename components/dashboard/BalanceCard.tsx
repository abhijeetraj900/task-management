'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface BalanceCardProps {
  balance: number;
  income: number;
  expenses: number;
  percentageChange?: number;
}

export function BalanceCard({
  balance,
  income,
  expenses,
  percentageChange = 12.5,
}: BalanceCardProps) {
  const isPositive = percentageChange >= 0;

  return (
    <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
      <CardHeader className="pb-2">
        <h2 className="text-sm font-medium opacity-90">Total Balance</h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="text-4xl font-bold tracking-tight">
              ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <TrendingUp className="w-4 h-4" />
              <span className={`text-sm font-semibold ${isPositive ? 'text-green-300' : 'text-red-300'}`}>
                {isPositive ? '+' : ''}{percentageChange.toFixed(1)}%
              </span>
              <span className="text-xs opacity-75">vs last month</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary-foreground/20">
            <div>
              <p className="text-xs opacity-75 mb-1">Income</p>
              <p className="text-lg font-semibold">
                ${income.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div>
              <p className="text-xs opacity-75 mb-1">Expenses</p>
              <p className="text-lg font-semibold">
                ${expenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
