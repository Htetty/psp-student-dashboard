'use client';

import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

type Props = { className?: string };

type LegendItem = {
  label: string;
  value?: string;
  sublabel?: string;
  progress: number;
  color: string;
};

function CircularBar({ value }: { value: number }) {
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center mb-6">
      <svg width="200" height="200" className="-rotate-90" role="img" aria-label={`Overall progress ${value}%`}>
        <circle cx="100" cy="100" r={radius} stroke="#373737" strokeWidth="15" fill="transparent" />
        <circle
          cx="100" cy="100" r={radius}
          stroke="#FF8358" strokeWidth="15" fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.4s ease' }}
        />
      </svg>
      <span className="mt-2 text-xl font-bold text-white">{value}%</span>
    </div>
  );
}

export default function Content3({ className = '' }: Props) {
  const metrics = [
    { label: 'Counselor Appointments Attended', value: '3', sublabel: 'of 4', progress: 100 },
    { label: 'PEOs Attended', value: '6', sublabel: 'events', progress: 100 },
  ];

  const palette = ['#FF8358', '#FBBF24', '#34D399', '#60A5FA'];
  const legendItems: LegendItem[] = metrics.map((m, i) => ({ ...m, color: palette[i % palette.length] }));

  const overallProgress = Math.round(
    metrics.reduce((sum, m) => sum + m.progress, 0) / metrics.length
  );

  const prevProgressRef = useRef(overallProgress);
  useEffect(() => {
    const prev = prevProgressRef.current;
    if (overallProgress === 100 && prev < 100) {
      const t = setTimeout(() => {
        confetti({ particleCount: 150, spread: 60, origin: { y: 0.6 } });
      }, 400);
      return () => clearTimeout(t);
    }
    prevProgressRef.current = overallProgress;
  }, [overallProgress]);

  return (
    <section className={`rounded-4xl overflow-hidden shadow-sm bg-[var(--content3-bg)] ${className}`}>
      <div className="p-5 sm:p-3 lg:p-6">
        <h3 className="text-white font-bold mb-3">Check Out your Progress!</h3>

        <CircularBar value={overallProgress} />

        <div className="rounded-3xl bg-[#222222] p-4 sm:p-5">
          <div className="space-y-3">
            {legendItems.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-full"
                    style={{ background: item.color }}
                    aria-hidden="true"
                  />
                  <span className="text-white/90 text-sm truncate">{item.label}</span>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {(item.value || item.sublabel) && (
                    <span className="text-white/70 text-sm">
                      {item.value}{item.sublabel ? ` ${item.sublabel}` : ''}
                    </span>
                  )}
                  <span className="text-white/80 text-sm tabular-nums">{Math.round(item.progress)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
