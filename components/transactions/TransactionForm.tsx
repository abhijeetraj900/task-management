'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Transaction } from './TransactionItem';
import { X } from 'lucide-react';

interface TransactionFormProps {
  onSubmit: (transaction: Omit<Transaction, 'id'>) => void;
  onCancel: () => void;
  initialData?: Transaction;
}

const categories = [
  { label: 'Salary', value: 'salary' },
  { label: 'Freelance', value: 'freelance' },
  { label: 'Investment', value: 'investment' },
  { label: 'Food', value: 'food' },
  { label: 'Transport', value: 'transport' },
  { label: 'Entertainment', value: 'entertainment' },
  { label: 'Utilities', value: 'utilities' },
  { label: 'Health', value: 'health' },
  { label: 'Shopping', value: 'shopping' },
  { label: 'Other', value: 'other' },
];

export function TransactionForm({
  onSubmit,
  onCancel,
  initialData,
}: TransactionFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    category: initialData?.category || 'other',
    amount: initialData?.amount?.toString() || '',
    type: (initialData?.type || 'expense') as 'income' | 'expense',
    date: initialData?.date || new Date(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: formData.title,
      category: formData.category,
      amount: parseFloat(formData.amount),
      type: formData.type,
      date: formData.date,
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      date: new Date(e.target.value),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>{initialData ? 'Edit Transaction' : 'Add Transaction'}</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="p-0 h-auto w-auto"
          >
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., Monthly Salary"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value as 'income' | 'expense' })
                  }
                  className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Date
              </label>
              <input
                type="date"
                value={formData.date.toISOString().split('T')[0]}
                onChange={handleDateChange}
                className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-accent hover:bg-accent/90">
                {initialData ? 'Update' : 'Add'} Transaction
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
