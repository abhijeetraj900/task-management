'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, TrendingDown } from 'lucide-react';

interface BudgetCardProps {
  category: string;
  spent: number;
  limit: number;
  icon?: string;
}

const categoryIcons: Record<string, string> = {
  food: '🍔',
  transport: '🚗',
  entertainment: '🎬',
  utilities: '⚡',
  health: '🏥',
  shopping: '🛍️',
  other: '📌',
};

export function BudgetCard({ category, spent, limit, icon }: BudgetCardProps) {
  const percentage = Math.min((spent / limit) * 100, 100);
  const isWarning = percentage >= 75;
  const isExceeded = spent > limit;
  const categoryIcon = icon || categoryIcons[category.toLowerCase()] || '📌';

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{categoryIcon}</span>
            <div>
              <CardTitle className="text-sm">{category}</CardTitle>
              <p className="text-xs text-muted-foreground">Budget</p>
            </div>
          </div>
          {isExceeded && (
            <AlertCircle className="w-5 h-5 text-red-600" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-lg font-bold">${spent.toFixed(2)}</span>
            <span className="text-xs text-muted-foreground">/ ${limit.toFixed(2)}</span>
          </div>

          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className={`h-full transition-all ${
                isExceeded
                  ? 'bg-red-600'
                  : isWarning
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              {percentage.toFixed(0)}% used
            </span>
            {isExceeded && (
              <span className="text-red-600 font-semibold flex items-center gap-1">
                <TrendingDown className="w-3 h-3" />
                Over by ${(spent - limit).toFixed(2)}
              </span>
            )}
            {!isExceeded && (
              <span className={`${isWarning ? 'text-yellow-600' : 'text-green-600'} font-semibold`}>
                ${(limit - spent).toFixed(2)} left
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
