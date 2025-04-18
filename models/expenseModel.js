
import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
  amount: Number,
  category: String,
  description: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);
