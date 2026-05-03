'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ExpenseData {
  name: string;
  value: number;
  color: string;
}

interface ExpenseChartProps {
  data: ExpenseData[];
}

const COLORS = ['#7c3aed', '#f59e0b', '#06b6d4', '#10b981', '#ef4444', '#8b5cf6'];

export function ExpenseChart({ data }: ExpenseChartProps) {
  const CustomTooltip = (props: any) => {
    const { active, payload } = props;
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-2 shadow-lg">
          <p className="text-sm font-semibold text-foreground">{payload[0].name}</p>
          <p className="text-sm text-primary">${payload[0].value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses by Category</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">No expense data available</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value, value: num }) => {
                  const total = data.reduce((sum, item) => sum + item.value, 0);
                  const percent = ((num / total) * 100).toFixed(0);
                  return `${name} ${percent}%`;
                }}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
