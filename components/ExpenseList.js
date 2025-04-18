import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await fetch('/api/expenses');
        if (!res.ok) {
          throw new Error('Failed to fetch expenses');
        }
        const data = await res.json();
        setExpenses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4 mt-6 max-w-md mx-auto">
        <Skeleton className="h-20 rounded-2xl" />
        <Skeleton className="h-20 rounded-2xl" />
        <Skeleton className="h-20 rounded-2xl" />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 mt-6">{error}</p>;
  }

  if (!expenses.length) {
    return <p className="text-center text-gray-500 mt-6">No expenses yet.</p>;
  }

  return (
    <div className='bg-zinc-900  '>
    <div className="space-y-4 max-w-md mx-auto ">
        <h3 className=" text-3xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-600">
      Your Expenses
    </h3>
      {expenses.map((expense) => (
        <Card key={expense._id} className="rounded-2xl shadow-sm bg-zinc-800 text-white hover:shadow-cyan-500">
          <CardContent className="p-4">
            <div className="flex justify-between ">
              <div>
                <p className="font-semibold text-lg text-cyan-400">₹{expense.amount}</p>
                <p className="text-sm text-gray-300">{expense.category}</p>
              </div>
              {expense.description && (
                <p className="text-right text-xs text-gray-300 max-w-[50%]">
                  {expense.description}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
    </div>
  );
}
