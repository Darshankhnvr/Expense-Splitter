// app/planner/page.jsx
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export default function LaunchPlanner() {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(null);

const handleLaunchPlan = async () => {
  setLoading(true);
  try {
    // Fetch expenses
    const res = await fetch('/api/expenses');
    if (!res.ok) {
      throw new Error(`Failed to fetch expenses: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    if (!data || !Array.isArray(data)) {
      throw new Error('Invalid expenses data format');
    }

    // Log the fetched expenses to ensure they're being retrieved correctly
    console.log('Expenses Data:', data);

    // Send the expenses to Gemini for analysis
    const aiRes = await fetch('/api/gemini-suggestions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ expenses: data }),
    });

    // Check if the response is successful
    if (!aiRes.ok) {
      const errorData = await aiRes.json();
      console.error('AI API Error:', errorData);
      setSuggestions(`Error with AI API: ${errorData.details || aiRes.statusText}`);
      return;
    }

    const aiData = await aiRes.json();
    setSuggestions(aiData.suggestions);

  } catch (error) {
    console.error("Error in handleLaunchPlan:", error);
    setSuggestions(`Error: ${error.message}`);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-zinc-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent mb-4">AI-Powered Financial Planner</h1>
          <p className="text-xl text-gray-600">Get personalized insights to optimize your spending</p>
        </div>

        <Card className="shadow-lg border-0 bg-zinc-500">
          <CardHeader className="border-b">
            <CardTitle className="text-2xl">🚀 Smart Budget Analysis</CardTitle>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="text-center mb-8">
              <Button 
                onClick={handleLaunchPlan} 
                disabled={loading}
                className="bg-cyan-800 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg transition-all duration-200"
              >
                {loading ? "Analyzing..." : "Generate Smart Budget Plan"}
              </Button>
            </div>

            {suggestions && (
              <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Personalized Suggestions</h2>
                <div className="space-y-6">
                  {suggestions.split('\n\n').map((suggestion, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      {suggestion.split('**').map((part, i) => (
                        i % 2 === 0 ? (
                          <span key={i} className="text-gray-700">{part}</span>
                        ) : (
                          <span key={i} className="font-semibold text-blue-600">{part}</span>
                        )
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
