import connectDB from '@/lib/dbConnect';
import Expense from '@/models/expenseModel';

export async function POST(req) {
  await connectDB();
  const body = await req.json();

  try {
    const newExpense = await Expense.create(body);
    return new Response(JSON.stringify(newExpense), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ message: "Failed to add expense" }), { status: 500 });
  }
}

export async function GET() {
  await connectDB();

  try {
    const expenses = await Expense.find().sort({ date: -1 });
    return new Response(JSON.stringify(expenses), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: "Failed to fetch expenses" }), { status: 500 });
  }
}
