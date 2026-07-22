'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Typography } from './typography'
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts'

interface RTCalibrationWizardProps {
  onComplete: (baseRtMs: number) => void
}

export function RTCalibrationWizard({ onComplete }: RTCalibrationWizardProps) {
  const [phase, setPhase] = useState<'intro' | 'calibrating' | 'done'>('intro')
  const [clickCount, setClickCount] = useState(0)
  const [targetVisible, setTargetVisible] = useState(false)
  const [targetPosition, setTargetPosition] = useState({ top: '50%', left: '50%' })
  
  const targetAppearedAt = useRef<number>(0)
  const results = useRef<number[]>([])
  const timer = useRef<NodeJS.Timeout | null>(null)

  const startCalibration = () => {
    setPhase('calibrating')
    triggerNextTarget()
  }

  const triggerNextTarget = useCallback(() => {
    setTargetVisible(false)
    // Random delay between 1.2s and 2.5s
    const delay = 1200 + Math.random() * 1300
    
    timer.current = setTimeout(() => {
      // Pick random position away from borders
      const randomTop = 20 + Math.floor(Math.random() * 60) // 20% to 80%
      const randomLeft = 20 + Math.floor(Math.random() * 60) // 20% to 80%
      
      setTargetPosition({
        top: `${randomTop}%`,
        left: `${randomLeft}%`,
      })
      setTargetVisible(true)
      targetAppearedAt.current = performance.now()
    }, delay)
  }, [])

  const handleTargetClick = () => {
    if (!targetVisible) return
    const clickTime = performance.now()
    const rt = clickTime - targetAppearedAt.current
    results.current.push(rt)
    setTargetVisible(false)

    const nextCount = clickCount + 1
    setClickCount(nextCount)

    if (nextCount >= 3) {
      setPhase('done')
      const sum = results.current.reduce((a, b) => a + b, 0)
      const avg = Math.round(sum / results.current.length)
      setTimeout(() => {
        onComplete(avg)
      }, 1500)
    } else {
      triggerNextTarget()
    }
  };

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 min-h-[500px] font-mono select-none">
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-md w-full border border-white/10 bg-bg-surface/30 p-8 rounded-sm text-center relative overflow-hidden"
          >
            <div className="text-[10px] text-accent-red tracking-[0.25em] uppercase mb-6">
              PROTOCOL // LATENCY_CALIBRATION
            </div>
            
            <Typography variant="h2" className="text-white mb-6">
              系统硬件时延校准
            </Typography>
            
            <Typography variant="body" className="text-text-secondary mb-8 leading-relaxed text-[12px]">
              {"受浏览器渲染效率与您当前触控/鼠标硬件差异影响，我们需要进行三频光闪测试以测定您当前的物理延迟基准线 $(RT_{base})$，从而扣除测量噪点。"}
            </Typography>

            <button
              onClick={startCalibration}
              className="w-full py-4 border border-text-primary text-text-primary hover:bg-text-primary hover:text-bg-void transition-colors uppercase tracking-widest text-[12px] font-bold cursor-pointer"
            >
              启动标定脉冲
            </button>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(232,64,64,0.03)_0%,transparent_70%)]" />
          </motion.div>
        )}

        {phase === 'calibrating' && (
          <motion.div
            key="calibrating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-50 overflow-hidden"
          >
            {/* Centered Guide */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 font-mono text-[10px] text-text-ghost uppercase tracking-widest text-center whitespace-nowrap">
              [ 看到红色光靶闪烁时以最快速度点击 ]
              <br />
              进度: {clickCount} / 3 次
            </div>

            {/* Tap Target */}
            <AnimatePresence>
              {targetVisible && (
                <motion.button
                  key={`target-${clickCount}`}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={{ duration: 0.08 }}
                  onClick={handleTargetClick}
                  className="absolute w-16 h-16 -ml-8 -mt-8 rounded-full bg-accent-red/20 border-2 border-accent-red shadow-[0_0_20px_rgba(232,64,64,0.6)] flex items-center justify-center cursor-pointer active:scale-95"
                  style={{
                    top: targetPosition.top,
                    left: targetPosition.left,
                  }}
                >
                  <div className="w-4 h-4 rounded-full bg-accent-red animate-pulse" />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {phase === 'done' && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full border border-green-500/20 bg-green-500/5 p-8 rounded-sm text-center relative overflow-hidden"
          >
            <div className="text-[10px] text-green-400 tracking-[0.25em] uppercase mb-6">
              CALIBRATION_SUCCESSFUL
            </div>
            <Typography variant="h2" className="text-white mb-4">
              基准标定完毕
            </Typography>
            <div className="text-4xl text-green-400 font-bold mb-4">
              {results.current.length > 0 ? Math.round(results.current.reduce((a,b)=>a+b,0)/results.current.length) : 250}
              <span className="text-sm font-normal text-text-secondary ml-1">ms</span>
            </div>

            {(() => {
              const chartData = results.current.map((rt, idx) => ({
                trial: `第 ${idx + 1} 次`,
                rt: Math.round(rt),
              }));
              const avgRt = results.current.length > 0 
                ? Math.round(results.current.reduce((a, b) => a + b, 0) / results.current.length)
                : 250;

              return (
                <div className="h-28 w-full my-6 bg-black/20 border border-white/5 p-2 rounded-sm">
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <BarChart data={chartData} margin={{ top: 15, right: 5, bottom: 5, left: 5 }}>
                      <XAxis 
                        dataKey="trial" 
                        tick={{ fill: '#888880', fontSize: 9, fontFamily: 'monospace' }} 
                        axisLine={false} 
                        tickLine={false} 
                      />
                      <YAxis hide domain={[0, (dataMax: number) => Math.max(dataMax + 50, 400)]} />
                      <Bar dataKey="rt" fill="#22c55e" radius={[2, 2, 0, 0]} maxBarSize={24}>
                        {chartData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.rt > avgRt ? '#ef4444' : '#22c55e'} 
                            fillOpacity={0.5} 
                          />
                        ))}
                      </Bar>
                      <ReferenceLine 
                        y={avgRt} 
                        stroke="#22c55e" 
                        strokeDasharray="3 3" 
                        strokeOpacity={0.7}
                        label={{ 
                          value: `平均: ${avgRt}ms`, 
                          fill: '#22c55e', 
                          fontSize: 9, 
                          position: 'top',
                          fontFamily: 'monospace'
                        }} 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              );
            })()}

            <Typography variant="body" className="text-text-secondary text-[12px] leading-relaxed">
              您的物理底座延迟已记录。该物理差额将自动从盖洛普与荣格的反应时量规中扣除，解构引擎已准备就绪。
            </Typography>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
