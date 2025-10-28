import React, { useMemo, useState } from 'react';
import { Plus, Trash2, Utensils, Flame } from 'lucide-react';

export default function FoodLogger() {
  const [foods, setFoods] = useState([]);
  const [form, setForm] = useState({ name: '', calories: '', protein: '', carbs: '', fats: '' });

  const totals = useMemo(() => {
    return foods.reduce(
      (acc, f) => {
        acc.calories += Number(f.calories) || 0;
        acc.protein += Number(f.protein) || 0;
        acc.carbs += Number(f.carbs) || 0;
        acc.fats += Number(f.fats) || 0;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );
  }, [foods]);

  const addFood = (e) => {
    e.preventDefault();
    if (!form.name) return;
    setFoods((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: form.name.trim(),
        calories: Number(form.calories) || 0,
        protein: Number(form.protein) || 0,
        carbs: Number(form.carbs) || 0,
        fats: Number(form.fats) || 0,
      },
    ]);
    setForm({ name: '', calories: '', protein: '', carbs: '', fats: '' });
  };

  const removeFood = (id) => setFoods((prev) => prev.filter((f) => f.id !== id));

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-emerald-500 to-sky-500 text-white">
            <Utensils size={18} />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Daily Food Log</h2>
            <p className="text-xs text-slate-500">Track meals and macros</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-slate-600"><Flame className="text-emerald-500" size={16} /> {totals.calories} kcal</div>
          <div className="hidden items-center gap-1 text-slate-600 sm:flex">P: <span className="font-medium text-slate-800">{totals.protein}g</span></div>
          <div className="hidden items-center gap-1 text-slate-600 sm:flex">C: <span className="font-medium text-slate-800">{totals.carbs}g</span></div>
          <div className="hidden items-center gap-1 text-slate-600 sm:flex">F: <span className="font-medium text-slate-800">{totals.fats}g</span></div>
        </div>
      </div>

      <form onSubmit={addFood} className="grid grid-cols-2 gap-3 px-4 py-4 md:grid-cols-6">
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Food name"
          className="col-span-2 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400 md:col-span-2"
          aria-label="Food name"
        />
        <input
          type="number"
          min="0"
          value={form.calories}
          onChange={(e) => setForm({ ...form, calories: e.target.value })}
          placeholder="Calories"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400"
          aria-label="Calories"
        />
        <input
          type="number"
          min="0"
          value={form.protein}
          onChange={(e) => setForm({ ...form, protein: e.target.value })}
          placeholder="Protein (g)"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400"
          aria-label="Protein grams"
        />
        <input
          type="number"
          min="0"
          value={form.carbs}
          onChange={(e) => setForm({ ...form, carbs: e.target.value })}
          placeholder="Carbs (g)"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400"
          aria-label="Carbs grams"
        />
        <input
          type="number"
          min="0"
          value={form.fats}
          onChange={(e) => setForm({ ...form, fats: e.target.value })}
          placeholder="Fats (g)"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400"
          aria-label="Fats grams"
        />
        <button
          type="submit"
          className="col-span-2 inline-flex items-center justify-center gap-2 rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 md:col-span-1"
        >
          <Plus size={16} /> Add
        </button>
      </form>

      <div className="px-2 pb-4">
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-3 py-2 text-left font-medium text-slate-600">Item</th>
                <th className="px-3 py-2 text-right font-medium text-slate-600">Calories</th>
                <th className="px-3 py-2 text-right font-medium text-slate-600">Protein</th>
                <th className="px-3 py-2 text-right font-medium text-slate-600">Carbs</th>
                <th className="px-3 py-2 text-right font-medium text-slate-600">Fats</th>
                <th className="px-3 py-2" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {foods.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-3 py-6 text-center text-slate-500">
                    No foods logged yet. Add your first meal above.
                  </td>
                </tr>
              ) : (
                foods.map((f) => (
                  <tr key={f.id}>
                    <td className="px-3 py-2 font-medium text-slate-800">{f.name}</td>
                    <td className="px-3 py-2 text-right">{f.calories}</td>
                    <td className="px-3 py-2 text-right">{f.protein} g</td>
                    <td className="px-3 py-2 text-right">{f.carbs} g</td>
                    <td className="px-3 py-2 text-right">{f.fats} g</td>
                    <td className="px-3 py-2 text-right">
                      <button
                        onClick={() => removeFood(f.id)}
                        className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-700 hover:bg-slate-200"
                        aria-label={`Remove ${f.name}`}
                      >
                        <Trash2 size={14} /> Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            {foods.length > 0 && (
              <tfoot className="bg-slate-50">
                <tr>
                  <td className="px-3 py-2 font-semibold">Total</td>
                  <td className="px-3 py-2 text-right font-semibold">{totals.calories}</td>
                  <td className="px-3 py-2 text-right font-semibold">{totals.protein} g</td>
                  <td className="px-3 py-2 text-right font-semibold">{totals.carbs} g</td>
                  <td className="px-3 py-2 text-right font-semibold">{totals.fats} g</td>
                  <td />
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
