import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner"; // ← Don't forget to import this if you're using it

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await fetch("/api/expenses");
        if (!res.ok) throw new Error("Failed to fetch expenses");
        const data = await res.json();
        setExpenses(data);
      } catch (err) {
        setError("Failed to fetch expenses!");
        toast.error("Failed to fetch expenses!");
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/expenses/${id}`, { method: "DELETE" });
      setExpenses((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      toast.error("Failed to delete expense!");
    }
  };

  const handleEditClick = (expense) => {
    setEditingExpense(expense);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/expenses/${editingExpense._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingExpense),
      });

      if (!res.ok) throw new Error("Update failed");

      const updated = await res.json();

      setExpenses((prev) =>
        prev.map((exp) => (exp._id === updated._id ? updated : exp))
      );

      setEditingExpense(null);
    } catch (err) {
      toast.error("Failed to edit expense!");
    }
  };

  return (
    <div className="bg-zinc-900 min-h-screen p-4">
      <div className="space-y-4 max-w-md mx-auto">
        <h3 className="text-3xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-600">
          Your Expenses
        </h3>

        {/* ✅ Show error if needed */}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* ✅ Show loading skeletons */}
        {loading ? (
          <>
            <Skeleton className="h-20 rounded-2xl" />
            <Skeleton className="h-20 rounded-2xl" />
            <Skeleton className="h-20 rounded-2xl" />
          </>
        ) : expenses.length === 0 ? (
          <p className="text-center text-gray-500">No expenses yet.</p>
        ) : (
          expenses.map((expense) => (
            <Card
              key={expense._id}
              className="rounded-2xl shadow-sm bg-zinc-800 text-white hover:shadow-cyan-500"
            >
              <CardContent className="p-4">
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold text-lg text-cyan-400">
                      ₹{expense.amount}
                    </p>
                    <p className="text-sm text-gray-300">{expense.category}</p>
                  </div>
                  <div className="text-right space-y-1">
                    {expense.description && (
                      <p className="text-xs text-gray-300 max-w-[150px]">
                        {expense.description}
                      </p>
                    )}
                    <div className="flex items-end justify-end gap-2">
                      <Pencil
                        className="w-5 h-5 text-blue-400 cursor-pointer hover:text-blue-600"
                        onClick={() => handleEditClick(expense)}
                      />
                      <Trash2
                        className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700"
                        onClick={() => handleDelete(expense._id)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* 🛠️ Edit Modal */}
      <Dialog
        open={!!editingExpense}
        onOpenChange={() => setEditingExpense(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Expense</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="space-y-4">
            <input
              type="number"
              value={editingExpense?.amount || ""}
              onChange={(e) =>
                setEditingExpense({ ...editingExpense, amount: e.target.value })
              }
              className="w-full rounded-md p-2 bg-zinc-800 text-white"
              placeholder="Amount"
              required
            />
            <input
              type="text"
              value={editingExpense?.category || ""}
              onChange={(e) =>
                setEditingExpense({
                  ...editingExpense,
                  category: e.target.value,
                })
              }
              className="w-full rounded-md p-2 bg-zinc-800 text-white"
              placeholder="Category"
              required
            />
            <textarea
              value={editingExpense?.description || ""}
              onChange={(e) =>
                setEditingExpense({
                  ...editingExpense,
                  description: e.target.value,
                })
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
