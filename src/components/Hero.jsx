import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative h-[72vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/2fSS9b44gtYBt4RI/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4">
        <div className="max-w-2xl text-white">
          <div className="mb-4 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400" />
            Personalized health & fitness tracker
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Achieve your weight, fitness, and nutrition goals
          </h1>
          <p className="mt-4 text-slate-200">
            Log meals with macro breakdowns, track workouts in detail, set goals, and visualize your progress—all in one place.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#food"
              className="rounded-md bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              Start Logging Food
            </a>
            <a
              href="#exercise"
              className="rounded-md bg-sky-500/90 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              Track a Workout
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
