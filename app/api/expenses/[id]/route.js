import connectDB from '@/lib/dbConnect';
import expenseModel from '@/models/expenseModel';

export async function GET(req, { params }) {
  const { id } = params;  // id should be directly destructured from params
  await connectDB();

  try {
    const expense = await expenseModel.findById(id);
    if (!expense) {
      return new Response('Expense not found', { status: 404 });
    }
    return new Response(JSON.stringify(expense), { status: 200 });
  } catch (error) {
    return new Response('Server Error', { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;  // id should be directly destructured from params
  const { amount, category, description } = await req.json(); // Get data from request body
  await connectDB();

  try {
    const updatedExpense = await expenseModel.findByIdAndUpdate(
      id,
      { amount, category, description },
      { new: true }
    );

    if (!updatedExpense) {
      return new Response('Expense not found', { status: 404 });
    }

    return new Response(JSON.stringify(updatedExpense), { status: 200 });
  } catch (error) {
    return new Response('Server Error', { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;  // id should be directly destructured from params
  await connectDB();

  try {
    const deletedExpense = await expenseModel.findByIdAndDelete(id);
    if (!deletedExpense) {
      return new Response('Expense not found', { status: 404 });
    }
    return new Response('Expense deleted successfully', { status: 200 });
  } catch (error) {
    return new Response('Server Error', { status: 500 });
  }
}
