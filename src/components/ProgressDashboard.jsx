import React, { useMemo, useState } from 'react';
import { Activity, Flame, Weight } from 'lucide-react';

function ProgressBar({ value, goal, color = 'from-emerald-500 to-sky-500' }) {
  const pct = Math.min(100, Math.round(((value || 0) / Math.max(goal || 1, 1)) * 100));
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
      <div
        className={`h-2 bg-gradient-to-r ${color}`}
        style={{ width: `${pct}%`, transition: 'width 300ms ease' }}
      />
    </div>
  );
}

export default function ProgressDashboard() {
  const [goals, setGoals] = useState({
    weight: 70, // kg
    dailyCalories: 2200,
    weeklyWorkouts: 4,
  });

  const [current, setCurrent] = useState({
    weight: 75, // kg
    dailyCalories: 1450, // consumed so far today
    weeklyWorkouts: 1, // completed this week
  });

  const stats = useMemo(() => {
    const deficit = goals.dailyCalories - current.dailyCalories;
    return { deficit };
  }, [goals, current]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-4 py-3">
        <h2 className="text-lg font-semibold">Progress Dashboard</h2>
        <p className="text-xs text-slate-500">Set goals and monitor your journey</p>
      </div>

      <div className="space-y-6 p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200 p-4">
            <div className="mb-2 flex items-center gap-2 text-slate-700"><Weight className="text-emerald-500" size={18} /> Weight</div>
            <div className="mb-3 text-2xl font-semibold">{current.weight} kg <span className="text-sm font-normal text-slate-500">Goal: {goals.weight} kg</span></div>
            <ProgressBar value={Math.max(goals.weight, current.weight) - current.weight} goal={Math.max(goals.weight, current.weight) - goals.weight} />
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <input
                type="number"
                value={current.weight}
                onChange={(e) => setCurrent({ ...current, weight: Number(e.target.value) })}
                className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400"
                aria-label="Current weight"
              />
              <input
                type="number"
                value={goals.weight}
                onChange={(e) => setGoals({ ...goals, weight: Number(e.target.value) })}
                className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400"
                aria-label="Goal weight"
              />
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <div className="mb-2 flex items-center gap-2 text-slate-700"><Flame className="text-sky-500" size={18} /> Daily Calories</div>
            <div className="mb-3 text-2xl font-semibold">{current.dailyCalories} / {goals.dailyCalories} kcal</div>
            <ProgressBar value={current.dailyCalories} goal={goals.dailyCalories} color="from-sky-500 to-emerald-500" />
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <input
                type="number"
                value={current.dailyCalories}
                onChange={(e) => setCurrent({ ...current, dailyCalories: Number(e.target.value) })}
                className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400"
                aria-label="Current daily calories"
              />
              <input
                type="number"
                value={goals.dailyCalories}
                onChange={(e) => setGoals({ ...goals, dailyCalories: Number(e.target.value) })}
                className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400"
                aria-label="Daily calorie goal"
              />
            </div>
            <div className="mt-2 text-xs text-slate-500">Remaining today: {Math.max(0, stats.deficit)} kcal</div>
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <div className="mb-2 flex items-center gap-2 text-slate-700"><Activity className="text-emerald-500" size={18} /> Weekly Workouts</div>
            <div className="mb-3 text-2xl font-semibold">{current.weeklyWorkouts} / {goals.weeklyWorkouts}</div>
            <ProgressBar value={current.weeklyWorkouts} goal={goals.weeklyWorkouts} />
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <input
                type="number"
                value={current.weeklyWorkouts}
                onChange={(e) => setCurrent({ ...current, weeklyWorkouts: Number(e.target.value) })}
                className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400"
                aria-label="Completed workouts this week"
              />
              <input
                type="number"
                value={goals.weeklyWorkouts}
                onChange={(e) => setGoals({ ...goals, weeklyWorkouts: Number(e.target.value) })}
                className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400"
                aria-label="Weekly workout goal"
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-gradient-to-br from-emerald-50 to-sky-50 p-4 text-sm text-slate-700">
          Tip: Consistency beats intensity. Aim for steady progress and celebrate small wins.
        </div>
      </div>
    </div>
  );
}
