'use client';

import { Trash2, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  date: Date;
  icon?: string;
}

interface TransactionItemProps {
  transaction: Transaction;
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (id: string) => void;
  categoryColor?: string;
}

const categoryIcons: Record<string, string> = {
  salary: '💰',
  freelance: '💻',
  investment: '📈',
  food: '🍔',
  transport: '🚗',
  entertainment: '🎬',
  utilities: '⚡',
  health: '🏥',
  shopping: '🛍️',
  other: '📌',
};

export function TransactionItem({
  transaction,
  onEdit,
  onDelete,
  categoryColor = 'bg-blue-100 text-blue-700',
}: TransactionItemProps) {
  const icon = categoryIcons[transaction.category.toLowerCase()] || '📌';
  const isIncome = transaction.type === 'income';

  return (
    <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 flex-1">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg`}>
          {icon}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-foreground">{transaction.title}</h4>
          <p className="text-sm text-muted-foreground">{transaction.category}</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className={`font-bold text-lg ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
            {isIncome ? '+' : '-'}${transaction.amount.toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground">
            {transaction.date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(transaction)}
              className="p-2 h-auto"
            >
              <Edit2 className="w-4 h-4 text-muted-foreground hover:text-foreground" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(transaction.id)}
              className="p-2 h-auto"
            >
              <Trash2 className="w-4 h-4 text-muted-foreground hover:text-red-600" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
