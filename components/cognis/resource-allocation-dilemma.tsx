"use client";

import React, { useState, useRef, useCallback } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface Category {
  id: string;
  name: string; // 对应 constants 中 JUNGIAN_ALLOCATION_CATEGORIES 的 name 属性
  icon?: string;
}

interface ResourceAllocationDilemmaProps {
  taskId: string;
  title: string;
  description: string;
  totalBudget?: number; // 默认 100
  categories: Category[];
  onComplete: (taskId: string, allocations: Record<string, number>) => void;
}

export function ResourceAllocationDilemma({
  taskId,
  title,
  description,
  totalBudget = 100,
  categories,
  onComplete,
}: ResourceAllocationDilemmaProps) {
  const [allocations, setAllocations] = useState<Record<string, number>>(() =>
    Object.fromEntries(categories.map((c) => [c.id, 25])), // 默认平分 25
  );

  const totalAllocated = Object.values(allocations).reduce(
    (sum, val) => sum + val,
    0,
  );
  const isOverBudget = totalAllocated > totalBudget;
  const isExactBudget = totalAllocated === totalBudget;
  const overflowAmount = totalAllocated - totalBudget;

  const handleAdjust = useCallback(
    (categoryId: string, delta: number) => {
      setAllocations((prev) => {
        const currentValue = prev[categoryId] || 0;
        const newValue = Math.max(0, currentValue + delta);
        return { ...prev, [categoryId]: newValue };
      });
    },
    [],
  );

  const handleSubmit = useCallback(() => {
    if (!isExactBudget) return;
    onComplete(taskId, allocations);
  }, [taskId, allocations, isExactBudget, onComplete]);

  const chartData = categories.map((category) => ({
    name: category.name,
    value: allocations[category.id] ?? 0,
  }));

  const COLORS = ["#E84040", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899"];

  return (
    <div className="border border-white/5 bg-bg-surface/30 p-8 rounded-md font-mono select-none">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg text-white font-semibold mb-2">{title}</h2>
        <p className="text-[12px] text-text-secondary leading-relaxed">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Left 2 columns: Allocation Rows */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {categories.map((category) => {
            const value = allocations[category.id] ?? 0;
            const percentage =
              totalBudget > 0 ? (value / totalBudget) * 100 : 0;

            return (
              <div key={category.id} className="flex flex-col gap-2">
                {/* Labels */}
                <div className="flex justify-between items-baseline text-[12px]">
                  <span className="font-semibold text-text-primary">
                    {category.name}
                  </span>
                  <span className="text-text-tertiary">
                    已分配: {percentage.toFixed(0)}%
                  </span>
                </div>

                {/* Stepper */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleAdjust(category.id, -5)}
                    disabled={value <= 0}
                    className="w-8 h-8 flex items-center justify-center border border-white/10 hover:border-white/30 text-text-secondary font-mono text-[14px] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    −
                  </button>

                  <div className="w-24 h-8 flex items-center justify-center border border-white/10 bg-black/20">
                    <span className="text-[13px] text-text-primary font-bold">
                      ¥{value}万
                    </span>
                  </div>

                  <button
                    onClick={() => handleAdjust(category.id, 5)}
                    className="w-8 h-8 flex items-center justify-center border border-white/10 hover:border-white/30 text-text-secondary font-mono text-[14px] transition-all"
                  >
                    +
                  </button>

                  {/* Fill bar */}
                  <div className="flex-1 h-[2px] bg-white/5 overflow-hidden ml-4">
                    <div
                      className="h-full bg-accent-red transition-all duration-200 ease-out"
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 1 column: Real-time Donut Chart */}
        <div className="flex flex-col items-center justify-center border border-white/5 bg-black/10 p-4 rounded-sm min-h-[200px]">
          <div className="text-[10px] text-text-ghost uppercase tracking-widest mb-2">
            预算分配比例
          </div>
          <div className="relative w-full h-40 flex items-center justify-center">
            <div className="absolute flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[9px] text-text-ghost uppercase">已分配</span>
              <span className="text-[14px] text-white font-bold">¥{totalAllocated}万</span>
            </div>
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={38}
                  outerRadius={55}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.value > 0 ? COLORS[index % COLORS.length] : "rgba(255,255,255,0.03)"} 
                      stroke="rgba(0,0,0,0.5)" 
                      strokeWidth={1} 
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }: any) => {
                    if (active && payload && payload.length && payload[0].value > 0) {
                      return (
                        <div className="bg-bg-surface/95 border border-white/10 p-2 font-mono text-[10px] shadow-lg backdrop-blur-md rounded-sm">
                          <p className="text-text-primary font-bold">{payload[0].name}</p>
                          <p className="text-accent-red mt-0.5">¥{payload[0].value}万 ({((payload[0].value / totalBudget) * 100).toFixed(0)}%)</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-2 text-[9px] font-mono text-text-secondary">
            {categories.map((category, index) => (
              <div key={category.id} className="flex items-center gap-1">
                <div 
                  className="w-1.5 h-1.5 rounded-full" 
                  style={{ backgroundColor: (allocations[category.id] ?? 0) > 0 ? COLORS[index % COLORS.length] : "rgba(255,255,255,0.1)" }} 
                />
                <span>{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Running Total & Status */}
      <div className="flex flex-col sm:flex-row justify-between items-center border-t border-white/5 pt-6 gap-4">
        <div>
          <p className="text-[13px]">
            <span className="text-text-secondary">总预算: ¥{totalBudget}万</span>
            <span className="mx-2 text-white/20">|</span>
            <span className="text-text-secondary">当前已分配: </span>
            <span
              className={`font-bold ${isExactBudget ? "text-green-400" : "text-accent-red"}`}
            >
              ¥{totalAllocated}万
            </span>
            {isOverBudget && (
              <span className="text-accent-red font-bold ml-1">
                (超出 ¥{overflowAmount}万)
              </span>
            )}
          </p>
          {!isExactBudget && (
            <p className="text-[10px] text-accent-red/80 mt-1">
              {isOverBudget
                ? `* 超出分配上限，请调减额度。`
                : `* 尚有 ¥{totalBudget - totalAllocated}万 预算待分配，请使其刚好为 100万。`}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!isExactBudget}
          className={`px-8 py-3 font-mono text-[13px] border transition-all duration-150 uppercase tracking-wider ${
            isExactBudget
              ? "border-text-primary text-text-primary hover:bg-text-primary hover:text-bg-void cursor-pointer"
              : "border-white/10 text-text-ghost cursor-not-allowed opacity-50"
          }`}
        >
          提交分配方案
        </button>
      </div>
    </div>
  );
}
