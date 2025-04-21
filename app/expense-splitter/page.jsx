'use client';

import { useState, useEffect } from 'react';
import LoadingState from '@/components/LoadingState';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ExpenseSplitter() {
  const [loading, setLoading] = useState(true);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await fetch('/api/expenses');
        if (!res.ok) throw new Error('Failed to fetch expenses');
        const data = await res.json();
        setExpenses(data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-zinc-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent mb-4">
            Expense Splitter
          </h1>
          <p className="text-xl text-gray-400">Split your expenses with friends and family</p>
        </div>

        <Card className="shadow-lg border-0 bg-zinc-800">
          <CardHeader className="border-b border-zinc-700">
            <CardTitle className="text-2xl text-white">Your Expenses</CardTitle>
          </CardHeader>
          <CardContent className="pt-8">
            {/* Your expense splitting content here */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 