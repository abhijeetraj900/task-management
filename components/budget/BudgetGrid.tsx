'use client';

import { BudgetCard } from './BudgetCard';

export interface Budget {
  category: string;
  spent: number;
  limit: number;
  icon?: string;
}

interface BudgetGridProps {
  budgets: Budget[];
}

export function BudgetGrid({ budgets }: BudgetGridProps) {
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const totalLimit = budgets.reduce((sum, b) => sum + b.limit, 0);
  const percentage = (totalSpent / totalLimit) * 100;

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-4">Overall Budget</h3>
        <div className="space-y-4">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold">${totalSpent.toFixed(2)}</span>
            <span className="text-sm text-muted-foreground">/ ${totalLimit.toFixed(2)}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div
              className={`h-full transition-all ${
                percentage >= 100 ? 'bg-red-600' : percentage >= 75 ? 'bg-yellow-500' : 'bg-primary'
              }`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            {percentage.toFixed(0)}% of budget used • ${(totalLimit - totalSpent).toFixed(2)} remaining
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {budgets.map((budget) => (
          <BudgetCard
            key={budget.category}
            category={budget.category}
            spent={budget.spent}
            limit={budget.limit}
            icon={budget.icon}
          />
        ))}
      </div>
    </div>
  );
}
