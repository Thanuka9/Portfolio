'use client';

import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { BarChart3, Info } from 'lucide-react';

export interface ArticleChartSeries {
  key: string;
  label: string;
  color?: string;
}

export interface ArticleChartSpec {
  type: 'bar' | 'line';
  title: string;
  caption?: string;
  /** Where the numbers come from. Rendered verbatim so readers can judge the evidence. */
  source?: string;
  /** Marks a diagram that illustrates a shape rather than reporting measurements. */
  illustrative?: boolean;
  xKey: string;
  data: Array<Record<string, string | number>>;
  series: ArticleChartSeries[];
  yDomain?: [number, number];
  unit?: string;
  height?: number;
}

const PALETTE = [
  'hsl(var(--primary))',
  'hsl(160 84% 45%)',
  'hsl(38 92% 55%)',
  'hsl(199 89% 55%)',
  'hsl(280 70% 62%)',
];

const AXIS_STYLE = {
  fontSize: 11,
  fontWeight: 700,
  fill: 'hsl(var(--muted-foreground))',
} as const;

function ChartTooltip({ active, payload, label, unit }: any) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-primary/20 bg-background/95 backdrop-blur-xl px-4 py-3 shadow-2xl">
      <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground mb-2">
        {label}
      </p>
      <div className="space-y-1">
        {payload.map((entry: any) => (
          <div key={entry.dataKey} className="flex items-center gap-2.5 text-xs">
            <span
              className="w-2.5 h-2.5 rounded-sm shrink-0"
              style={{ background: entry.color }}
            />
            <span className="font-semibold text-muted-foreground">{entry.name}</span>
            <span className="font-black text-foreground ml-auto tabular-nums">
              {entry.value}
              {unit ?? ''}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ArticleChart({ spec }: { spec: ArticleChartSpec }) {
  const {
    type,
    title,
    caption,
    source,
    illustrative,
    xKey,
    data,
    series,
    yDomain,
    unit,
    height = 300,
  } = spec;

  const resolved = series.map((s, i) => ({
    ...s,
    color: s.color ?? PALETTE[i % PALETTE.length],
  }));

  return (
    <figure className="my-8 rounded-[2rem] glass-panel border-primary/10 p-6 lg:p-8 space-y-6 overflow-hidden">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center text-primary shrink-0">
            <BarChart3 size={17} />
          </div>
          <h3 className="text-sm lg:text-base font-black tracking-tight text-foreground leading-snug">
            {title}
          </h3>
        </div>
        {illustrative && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-black uppercase tracking-wider shrink-0">
            <Info size={10} />
            Illustrative
          </span>
        )}
      </div>

      <div style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height="100%">
          {type === 'bar' ? (
            <BarChart data={data} margin={{ top: 8, right: 8, bottom: 4, left: -12 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                vertical={false}
              />
              <XAxis
                dataKey={xKey}
                tick={AXIS_STYLE}
                stroke="hsl(var(--border))"
                interval={0}
                tickMargin={10}
              />
              <YAxis
                tick={AXIS_STYLE}
                stroke="hsl(var(--border))"
                domain={yDomain ?? ['auto', 'auto']}
                tickMargin={4}
              />
              <Tooltip
                content={<ChartTooltip unit={unit} />}
                cursor={{ fill: 'hsl(var(--primary) / 0.06)' }}
              />
              {resolved.length > 1 && (
                <Legend
                  verticalAlign="top"
                  height={36}
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: 'hsl(var(--muted-foreground))',
                  }}
                />
              )}
              {resolved.map((s) => (
                <Bar
                  key={s.key}
                  dataKey={s.key}
                  name={s.label}
                  fill={s.color}
                  radius={[6, 6, 0, 0]}
                  maxBarSize={54}
                />
              ))}
            </BarChart>
          ) : (
            <LineChart data={data} margin={{ top: 8, right: 8, bottom: 4, left: -12 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                vertical={false}
              />
              <XAxis
                dataKey={xKey}
                tick={AXIS_STYLE}
                stroke="hsl(var(--border))"
                tickMargin={10}
              />
              <YAxis
                tick={AXIS_STYLE}
                stroke="hsl(var(--border))"
                domain={yDomain ?? ['auto', 'auto']}
                tickMargin={4}
              />
              <Tooltip
                content={<ChartTooltip unit={unit} />}
                cursor={{ stroke: 'hsl(var(--primary) / 0.3)' }}
              />
              {resolved.length > 1 && (
                <Legend
                  verticalAlign="top"
                  height={36}
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: 'hsl(var(--muted-foreground))',
                  }}
                />
              )}
              {resolved.map((s) => (
                <Line
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  name={s.label}
                  stroke={s.color}
                  strokeWidth={2.5}
                  dot={{ r: 3, strokeWidth: 0, fill: s.color }}
                  activeDot={{ r: 5, strokeWidth: 0 }}
                />
              ))}
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {(caption || source) && (
        <figcaption className="space-y-2 pt-2 border-t border-primary/5">
          {caption && (
            <p className="text-xs text-muted-foreground font-medium leading-relaxed">
              {caption}
            </p>
          )}
          {source && (
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">
              Source — {source}
            </p>
          )}
        </figcaption>
      )}
    </figure>
  );
}
