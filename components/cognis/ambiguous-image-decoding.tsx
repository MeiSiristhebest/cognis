'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'

interface Option {
  id: string
  text: string
  cognitiveBias: 'N' | 'S' // Intuitive vs Sensing
}

interface AmbiguousImageDecodingProps {
  imageId: string
  imageUrl: string
  options: Option[]
  observationDuration?: number // seconds
  onSelect: (
    imageId: string,
    optionId: string,
    cognitiveBias: 'N' | 'S',
    reactionTimeMs: number
  ) => void
}

function generateNetworkData(seed: number) {
  const random = (min: number, max: number) => {
    seed = (seed * 9301 + 49297) % 233280
    return min + (seed / 233280) * (max - min)
  }

  const nodes: Array<{
    x: number
    y: number
    r: number
    opacity: number
    isAnomaly?: boolean
    isRed?: boolean
    isIsolated?: boolean
  }> = []

  const lines: Array<{
    x1: number
    y1: number
    x2: number
    y2: number
    opacity: number
  }> = []

  const labels: Array<{
    x: number
    y: number
    text: string
  }> = []
  const nodeCount = Math.floor(random(45, 55))
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: random(10, 90),
      y: random(10, 90),
      r: random(2, 5),
      opacity: random(0.2, 0.5),
    })
  }
  const clusterCenterX = random(25, 40)
  const clusterCenterY = random(30, 50)
  for (let i = 0; i < 8; i++) {
    nodes.push({
      x: clusterCenterX + random(-8, 8),
      y: clusterCenterY + random(-8, 8),
      r: random(3, 5),
      opacity: random(0.4, 0.6),
      isAnomaly: true,
    })
  }
  nodes.push({
    x: random(60, 75),
    y: random(35, 55),
    r: 4,
    opacity: 1,
    isRed: true,
  })
  nodes.push({
    x: random(85, 92),
    y: random(75, 88),
    r: 4,
    opacity: 0.5,
    isIsolated: true,
  })
  const lineCount = Math.floor(random(90, 110))
  for (let i = 0; i < lineCount; i++) {
    const fromNode = nodes[Math.floor(random(0, nodes.length - 2))]
    const toNode = nodes[Math.floor(random(0, nodes.length - 2))]
    if (fromNode && toNode && fromNode !== toNode) {
      lines.push({
        x1: fromNode.x,
        y1: fromNode.y,
        x2: toNode.x,
        y2: toNode.y,
        opacity: random(0.08, 0.25),
      })
    }
  }
  labels.push(
    { x: random(15, 25), y: random(15, 25), text: `${Math.floor(random(12, 89))}` },
    { x: random(70, 85), y: random(20, 35), text: `${Math.floor(random(100, 999))}` },
    { x: random(45, 60), y: random(75, 85), text: `0.${Math.floor(random(10, 99))}` }
  )

  return { nodes, lines, labels }
}

function NetworkVisualization({ seed }: { seed: number }) {
  const data = useMemo(() => generateNetworkData(seed), [seed])

  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full"
      style={{ maxWidth: '100%', maxHeight: '100%' }}
    >
      {/* Lines first (behind nodes) */}
      {data.lines.map((line, i) => (
        <line
          key={`line-${i}`}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="0.3"
          style={{ opacity: line.opacity }}
        />
      ))}

      {/* Nodes */}
      {data.nodes.map((node, i) => (
        <circle
          key={`node-${i}`}
          cx={node.x}
          cy={node.y}
          r={node.r}
          fill={node.isRed ? '#E84040' : `rgba(200,200,195,${node.opacity})`}
        />
      ))}

      {/* Data labels */}
      {data.labels.map((label, i) => (
        <text
          key={`label-${i}`}
          x={label.x}
          y={label.y}
          fill="rgba(255,255,255,0.25)"
          fontSize="3"
          fontFamily="IBM Plex Mono, monospace"
        >
          {label.text}
        </text>
      ))}
    </svg>
  )
}

export function AmbiguousImageDecoding({
  imageId,
  imageUrl,
  options,
  observationDuration = 4,
  onSelect,
}: AmbiguousImageDecodingProps) {
  const [phase, setPhase] = useState<'observation' | 'blackout' | 'question' | 'completed'>('observation')
  const [countdown, setCountdown] = useState(observationDuration)
  const [questionStartTime, setQuestionStartTime] = useState<number>(0)
  const [selectedOptId, setSelectedOptId] = useState<string | null>(null)
  
  // Use character code sum of imageId as seed to keep it consistent per image
  const seed = useMemo(() => {
    let sum = 0
    for (let i = 0; i < imageId.length; i++) {
      sum += imageId.charCodeAt(i)
    }
    return sum + 123
  }, [imageId])

  useEffect(() => {
    if (phase !== 'observation') return

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setPhase('blackout')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [phase])

  useEffect(() => {
    if (phase !== 'blackout') return

    const timer = setTimeout(() => {
      setPhase('question')
      setQuestionStartTime(Date.now())
    }, 300)

    return () => clearTimeout(timer)
  }, [phase])

  const handleSelectOption = useCallback(
    (option: Option) => {
      if (phase !== 'question') return
      const reactionTimeMs = Date.now() - questionStartTime
      setSelectedOptId(option.id)
      setPhase('completed')
      onSelect(imageId, option.id, option.cognitiveBias, reactionTimeMs)
    },
    [phase, questionStartTime, imageId, onSelect]
  )

  return (
    <div className="border border-white/5 bg-bg-surface/30 p-6 flex flex-col justify-between rounded-md relative overflow-hidden h-[450px] font-mono select-none">
      
      {/* Header Info */}
      <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2 text-[10px] text-text-ghost uppercase">
        <span>投影序列: {imageId.toUpperCase()}</span>
        <span>
          {phase === 'observation' && `正在解析特征 (${countdown}s)`}
          {phase === 'blackout' && '闪烁中...'}
          {phase === 'question' && '等待交互响应 // ACT_REQ'}
          {phase === 'completed' && '数据已入库 // DATA_DECODED'}
        </span>
      </div>

      {/* Main Sandbox Area */}
      <div className="flex-1 relative flex items-center justify-center bg-black/40 border border-white/5 rounded-sm overflow-hidden mb-4 p-2">
        {phase === 'observation' && (
          <div className="w-full h-full relative flex items-center justify-center">
            <NetworkVisualization seed={seed} />
            <div className="absolute inset-0 bg-bg-void/40 backdrop-blur-[1px] flex flex-col items-center justify-center">
              <span className="text-[11px] text-accent-red tracking-widest animate-pulse">
                DESTRUCTURING COGNITIVE TARGET...
              </span>
            </div>
          </div>
        )}

        {phase === 'blackout' && (
          <div className="w-full h-full bg-accent-red/20 transition-all duration-75" />
        )}

        {(phase === 'question' || phase === 'completed') && (
          <div className="w-full h-full flex flex-col justify-center gap-2 px-2">
            <div className="text-[11px] text-text-secondary mb-2 text-center">
              选择最符合你对该网络图形直觉解读的释义：
            </div>
            
            <div className="flex flex-col gap-2">
              {options.map((option) => {
                const isSelected = selectedOptId === option.id
                const isDisabled = phase === 'completed'
                return (
                  <button
                    key={option.id}
                    disabled={isDisabled}
                    onClick={() => handleSelectOption(option)}
                    className={`text-left text-[11px] py-2 px-3 border border-white/5 transition-all duration-200 ${
                      isSelected
                        ? 'bg-accent-red/20 border-accent-red/50 text-white'
                        : isDisabled
                          ? 'opacity-40 text-text-ghost cursor-not-allowed'
                          : 'bg-transparent hover:bg-white/5 hover:border-white/20 text-text-secondary hover:text-white'
                    }`}
                  >
                    {option.text}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="flex justify-between items-center text-[9px] text-text-ghost">
        <span>PROJ_SYSTEM: RADIAL_NET_V2</span>
        <span>
          STATUS: {phase === 'completed' ? 'SUCCESS // CALIBRATED' : 'STANDBY'}
        </span>
      </div>
    </div>
  )
}
