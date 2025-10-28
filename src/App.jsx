import React from 'react';
import Hero from './components/Hero';
import FoodLogger from './components/FoodLogger';
import ExerciseTracker from './components/ExerciseTracker';
import ProgressDashboard from './components/ProgressDashboard';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-emerald-500 to-sky-500" />
            <span className="font-semibold tracking-tight">VitalTrack</span>
          </div>
          <nav className="hidden gap-6 text-sm md:flex">
            <a href="#food" className="text-slate-700 hover:text-emerald-600">Food</a>
            <a href="#exercise" className="text-slate-700 hover:text-sky-600">Exercise</a>
            <a href="#progress" className="text-slate-700 hover:text-emerald-600">Progress</a>
          </nav>
        </div>
      </header>

      <Hero />

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 lg:grid-cols-3">
        <section id="food" className="lg:col-span-2">
          <FoodLogger />
        </section>
        <aside className="lg:col-span-1" id="progress">
          <ProgressDashboard />
        </aside>
        <section id="exercise" className="lg:col-span-3">
          <ExerciseTracker />
        </section>
      </main>

      <footer className="border-t border-slate-200 py-8">
        <div className="mx-auto max-w-7xl px-4 text-sm text-slate-500">
          © {new Date().getFullYear()} VitalTrack. Stay consistent. Be well.
        </div>
      </footer>
    </div>
  );
}
