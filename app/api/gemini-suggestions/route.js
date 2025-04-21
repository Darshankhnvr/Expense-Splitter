// app/api/gemini-suggestions/route.js
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req) {
  try {
    const { expenses } = await req.json();

    if (!expenses) {
      throw new Error('No expenses data provided');
    }

    // Initialize the Gemini API with the correct model
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 1,
        topP: 1,
        maxOutputTokens: 1024,
      },
    });

    // Create the prompt for concise, point-wise analysis
    const prompt = `Analyze these expenses and provide 3-5 key financial suggestions. Format each suggestion as:
    * **Title:** Brief explanation (keep it concise and actionable)
    
    Example format:
    * **Reduce Dining Out:** $500 on restaurants is high. Cook more meals at home to save money.
    
    Expenses to analyze: ${JSON.stringify(expenses)}`;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    // Format the response with consistent styling
    const formattedSuggestions = text
      .split('\n')
      .filter(line => line.trim().startsWith('*'))
      .map(line => line.trim())
      .join('\n\n');

    return new Response(JSON.stringify({ suggestions: formattedSuggestions }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Gemini API error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });

    // Return more detailed error information
    return new Response(JSON.stringify({
      error: 'AI analysis failed.',
      details: error.message,
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
