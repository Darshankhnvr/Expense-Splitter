import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Trash2, Pencil } from 'lucide-react'; // Import Pencil icon for editing

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null); // State for the modal

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

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/expenses/${id}`, {
        method: 'DELETE',
      });

      setExpenses(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  const handleEditClick = (expense) => {
    setEditingExpense(expense); // Open the modal and pass the expense data
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/expenses/${editingExpense._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingExpense),
      });

      if (!res.ok) throw new Error('Update failed');

      const updated = await res.json();

      setExpenses(prev =>
        prev.map((exp) =>
          exp._id === updated._id ? updated : exp
        )
      );

      setEditingExpense(null); // Close the modal after updating
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="bg-zinc-900">
      <div className="space-y-4 max-w-md mx-auto">
        <h3 className="text-3xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-600">
          Your Expenses
        </h3>
        {expenses.map((expense) => (
          <Card key={expense._id} className="rounded-2xl shadow-sm bg-zinc-800 text-white hover:shadow-cyan-500">
            <CardContent className="p-4">
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold text-lg text-cyan-400">₹{expense.amount}</p>
                  <p className="text-sm text-gray-300">{expense.category}</p>
                </div>
                <div className="text-right space-y-1">
                  {expense.description && (
                    <p className="text-xs text-gray-300 max-w-[150px]">{expense.description}</p>
                  )}
                  <Trash2
                    className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700"
                    onClick={() => handleDelete(expense._id)}
                  />
                  <Pencil
                    className="w-5 h-5 text-blue-400 cursor-pointer hover:text-blue-600"
                    onClick={() => handleEditClick(expense)} // Open modal on click
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal to edit the selected expense */}
      <Dialog open={!!editingExpense} onOpenChange={() => setEditingExpense(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Expense</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="space-y-4">
            <input
              type="number"
              value={editingExpense?.amount || ''}
              onChange={(e) =>
                setEditingExpense({ ...editingExpense, amount: e.target.value })
              }
              className="w-full rounded-md p-2 bg-zinc-800 text-white"
              placeholder="Amount"
              required
            />
            <input
              type="text"
              value={editingExpense?.category || ''}
              onChange={(e) =>
                setEditingExpense({ ...editingExpense, category: e.target.value })
              }
              className="w-full rounded-md p-2 bg-zinc-800 text-white"
              placeholder="Category"
              required
            />
            <textarea
              value={editingExpense?.description || ''}
              onChange={(e) =>
                setEditingExpense({ ...editingExpense, description: e.target.value })
              }
              className="w-full rounded-md p-2 bg-zinc-800 text-white"
              placeholder="Description"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Update
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
