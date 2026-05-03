'use client';

import { useState, useMemo } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { BalanceCard } from '@/components/dashboard/BalanceCard';
import { TransactionList } from '@/components/transactions/TransactionList';
import { TransactionForm } from '@/components/transactions/TransactionForm';
import { Transaction } from '@/components/transactions/TransactionItem';
import { BudgetGrid, Budget } from '@/components/budget/BudgetGrid';
import { ExpenseChart } from '@/components/charts/ExpenseChart';
import { IncomeExpenseChart } from '@/components/charts/IncomeExpenseChart';
import { SpendingTrendChart } from '@/components/charts/SpendingTrendChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data
const mockTransactions: Transaction[] = [
  {
    id: '1',
    title: 'Monthly Salary',
    category: 'Salary',
    amount: 5000,
    type: 'income',
    date: new Date(2024, 4, 1),
  },
  {
    id: '2',
    title: 'Grocery Shopping',
    category: 'Food',
    amount: 125.50,
    type: 'expense',
    date: new Date(2024, 4, 15),
  },
  {
    id: '3',
    title: 'Gas Refill',
    category: 'Transport',
    amount: 65.00,
    type: 'expense',
    date: new Date(2024, 4, 12),
  },
  {
    id: '4',
    title: 'Movie Tickets',
    category: 'Entertainment',
    amount: 30.00,
    type: 'expense',
    date: new Date(2024, 4, 10),
  },
  {
    id: '5',
    title: 'Freelance Project',
    category: 'Freelance',
    amount: 1200,
    type: 'income',
    date: new Date(2024, 4, 8),
  },
  {
    id: '6',
    title: 'Electric Bill',
    category: 'Utilities',
    amount: 120.00,
    type: 'expense',
    date: new Date(2024, 4, 5),
  },
];

const mockBudgets: Budget[] = [
  { category: 'Food', spent: 320, limit: 500 },
  { category: 'Transport', spent: 150, limit: 300 },
  { category: 'Entertainment', spent: 80, limit: 200 },
  { category: 'Utilities', spent: 280, limit: 400 },
  { category: 'Shopping', spent: 450, limit: 600 },
  { category: 'Health', spent: 75, limit: 300 },
];

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>();

  // Calculate totals
  const totals = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    return {
      balance: income - expenses,
      income,
      expenses,
    };
  }, [transactions]);

  // Prepare chart data
  const expenseByCategoryData = useMemo(() => {
    const categoryMap = new Map<string, number>();
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        const current = categoryMap.get(t.category) || 0;
        categoryMap.set(t.category, current + t.amount);
      });

    const colors = ['#7c3aed', '#f59e0b', '#06b6d4', '#10b981', '#ef4444', '#8b5cf6'];
    let colorIndex = 0;

    return Array.from(categoryMap.entries()).map(([name, value]) => ({
      name,
      value,
      color: colors[colorIndex++ % colors.length],
    }));
  }, [transactions]);

  const monthlyData = [
    { month: 'Jan', income: 5000, expense: 3200 },
    { month: 'Feb', income: 5200, expense: 3500 },
    { month: 'Mar', income: 5000, expense: 2800 },
    { month: 'Apr', income: 6200, expense: 3800 },
    { month: 'May', income: 5000, expense: 3100 },
  ];

  const spendingTrendData = [
    { date: 'May 1', amount: 120 },
    { date: 'May 2', amount: 200 },
    { date: 'May 3', amount: 150 },
    { date: 'May 4', amount: 300 },
    { date: 'May 5', amount: 250 },
    { date: 'May 6', amount: 400 },
    { date: 'May 7', amount: 180 },
  ];

  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    if (editingTransaction) {
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === editingTransaction.id
            ? { ...newTransaction, id: t.id }
            : t
        )
      );
      setEditingTransaction(undefined);
    } else {
      const transaction: Transaction = {
        ...newTransaction,
        id: Date.now().toString(),
      };
      setTransactions((prev) => [transaction, ...prev]);
    }
    setShowForm(false);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const handleOpenForm = () => {
    setEditingTransaction(undefined);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <DashboardHeader onAddTransaction={handleOpenForm} />

        {/* Balance Overview */}
        <div className="mb-8">
          <BalanceCard
            balance={totals.balance}
            income={totals.income}
            expenses={totals.expenses}
          />
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full md:w-fit grid-cols-3 gap-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <IncomeExpenseChart data={monthlyData} />
              <ExpenseChart data={expenseByCategoryData} />
            </div>
            <SpendingTrendChart data={spendingTrendData} />
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions">
            <TransactionList
              transactions={transactions}
              onEdit={handleEditTransaction}
              onDelete={handleDeleteTransaction}
            />
          </TabsContent>

          {/* Budget Tab */}
          <TabsContent value="budget">
            <BudgetGrid budgets={mockBudgets} />
          </TabsContent>
        </Tabs>

        {/* Transaction Form Modal */}
        {showForm && (
          <TransactionForm
            initialData={editingTransaction}
            onSubmit={handleAddTransaction}
            onCancel={() => {
              setShowForm(false);
              setEditingTransaction(undefined);
            }}
          />
        )}
      </main>
    </div>
  );
}
