'use client';

import { Button } from '@/components/ui/button';
import { Plus, Calendar } from 'lucide-react';

interface DashboardHeaderProps {
  onAddTransaction: () => void;
  month?: string;
}

export function DashboardHeader({
  onAddTransaction,
  month = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' }),
}: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Financial Tracker</h1>
        <p className="text-muted-foreground mt-1">Manage your money with ease</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border border-border">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">{month}</span>
        </div>
        <Button
          onClick={onAddTransaction}
          className="gap-2 bg-accent hover:bg-accent/90"
        >
          <Plus className="w-4 h-4" />
          Add Transaction
        </Button>
      </div>
    </div>
  );
}
