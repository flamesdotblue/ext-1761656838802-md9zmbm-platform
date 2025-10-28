import React, { useMemo, useState } from 'react';
import { Activity, Plus, Trash2, Flame } from 'lucide-react';

export default function ExerciseTracker() {
  const [workouts, setWorkouts] = useState([]);
  const [form, setForm] = useState({ name: '', duration: '', calories: '' });

  const totals = useMemo(() => {
    return workouts.reduce(
      (acc, w) => {
        acc.duration += Number(w.duration) || 0;
        acc.calories += Number(w.calories) || 0;
        return acc;
      },
      { duration: 0, calories: 0 }
    );
  }, [workouts]);

  const addWorkout = (e) => {
    e.preventDefault();
    if (!form.name) return;
    setWorkouts((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: form.name.trim(),
        duration: Number(form.duration) || 0,
        calories: Number(form.calories) || 0,
        date: new Date().toISOString(),
      },
    ]);
    setForm({ name: '', duration: '', calories: '' });
  };

  const removeWorkout = (id) => setWorkouts((prev) => prev.filter((w) => w.id !== id));

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-sky-500 to-emerald-500 text-white">
            <Activity size={18} />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Exercise Tracker</h2>
            <p className="text-xs text-slate-500">Log workouts and calories burned</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="text-slate-600">{totals.duration} min</div>
          <div className="flex items-center gap-1 text-slate-600"><Flame className="text-sky-500" size={16} /> {totals.calories} kcal</div>
        </div>
      </div>

      <form onSubmit={addWorkout} className="grid grid-cols-2 gap-3 px-4 py-4 md:grid-cols-5">
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Workout name"
          className="col-span-2 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400 md:col-span-2"
          aria-label="Workout name"
        />
        <input
          type="number"
          min="0"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
          placeholder="Duration (min)"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400"
          aria-label="Duration in minutes"
        />
        <input
          type="number"
          min="0"
          value={form.calories}
          onChange={(e) => setForm({ ...form, calories: e.target.value })}
          placeholder="Calories burned"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400"
          aria-label="Calories burned"
        />
        <button
          type="submit"
          className="col-span-2 inline-flex items-center justify-center gap-2 rounded-md bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 md:col-span-1"
        >
          <Plus size={16} /> Add
        </button>
      </form>

      <div className="px-2 pb-4">
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-3 py-2 text-left font-medium text-slate-600">Workout</th>
                <th className="px-3 py-2 text-left font-medium text-slate-600">Date</th>
                <th className="px-3 py-2 text-right font-medium text-slate-600">Duration</th>
                <th className="px-3 py-2 text-right font-medium text-slate-600">Calories</th>
                <th className="px-3 py-2" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {workouts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-3 py-6 text-center text-slate-500">
                    No workouts yet. Log your first activity above.
                  </td>
                </tr>
              ) : (
                workouts.map((w) => (
                  <tr key={w.id}>
                    <td className="px-3 py-2 font-medium text-slate-800">{w.name}</td>
                    <td className="px-3 py-2 text-slate-600">{new Date(w.date).toLocaleDateString()}</td>
                    <td className="px-3 py-2 text-right">{w.duration} min</td>
                    <td className="px-3 py-2 text-right">{w.calories} kcal</td>
                    <td className="px-3 py-2 text-right">
                      <button
                        onClick={() => removeWorkout(w.id)}
                        className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-700 hover:bg-slate-200"
                        aria-label={`Remove ${w.name}`}
                      >
                        <Trash2 size={14} /> Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
