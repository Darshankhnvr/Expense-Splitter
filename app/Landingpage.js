"use client";

import ExpenseForm from "@/components/ExpenseForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center px-4 py-16">
      <section className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
          Expense Splitting. AI Budgeting. Done Right.
        </h1>
        <p className="mt-6 text-zinc-300 text-lg">
          Say goodbye to money stress. Track, split, and optimize your budget using smart AI recommendations.
        </p>
        <Link href={"/planner"}>
        <Button className="mt-8 px-6 py-3 rounded-full text-lg font-semibold">
          Launch Planner
        </Button>
        </Link>
      </section>

      <section className="mt-16 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {[
          {
            title: "Smart AI Insights",
            desc: "Let AI find where you overspend and suggest savings.",
          },
          {
            title: "Effortless Splitting",
            desc: "Split with friends or family, no drama, no math.",
          },
          {
            title: "Secure + Local",
            desc: "Your data stays on your device. Fully private.",
          },
        ].map((item, i) => (
          <Card
            key={i}
            className="bg-white/5 border-white/10 border rounded-2xl shadow-md hover:shadow-cyan-500/20 transition duration-300"
          >
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2 text-cyan-400">
                {item.title}
              </h3>
              <p className="text-sm text-zinc-300">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
   
    
  );
}
