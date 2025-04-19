'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

export default function ExpenseForm() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await fetch('/api/expenses', {
      method: 'POST',
      body: JSON.stringify({ amount, category, description }),
      headers: { 'Content-Type': 'application/json' },
    });

    setAmount('');
    setCategory('');
    setDescription('');
    setLoading(false);
  };

  return (
    <div className='bg-zinc-900'>
        <div className='mt-20px'>
        <h2 className='text-center mb-2 font-bold text-3xl  text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-600'>Enter Your Expenses</h2>
        </div>
        
    <Card className="rounded-2xl shadow-md max-w-md mx-auto bg-white/5 text-cyan-400 hover:shadow-cyan-500 mb-25px">
      <CardContent className="p-6 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Amount</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Category</Label>
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Adding...' : 'Add Expense'}
          </Button>
        </form>
      </CardContent>
    </Card>
    </div>
  );
}
