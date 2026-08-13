import React from 'react';
import { Table2 } from 'lucide-react';

export interface ArticleTableSpec {
  title?: string;
  headers: string[];
  rows: string[][];
  caption?: string;
  /** Right-aligns every column except the first, for numeric tables. */
  numeric?: boolean;
}

export interface ArticleStat {
  label: string;
  value: string;
  detail?: string;
}

export function ArticleTable({ spec }: { spec: ArticleTableSpec }) {
  const { title, headers, rows, caption, numeric } = spec;

  return (
    <figure className="my-8 rounded-[2rem] glass-panel border-primary/10 p-6 lg:p-8 space-y-5">
      {title && (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center text-primary shrink-0">
            <Table2 size={17} />
          </div>
          <h3 className="text-sm lg:text-base font-black tracking-tight text-foreground leading-snug">
            {title}
          </h3>
        </div>
      )}

      <div className="overflow-x-auto -mx-2 px-2">
        <table className="w-full border-collapse text-sm min-w-[480px]">
          <thead>
            <tr className="border-b border-primary/15">
              {headers.map((h, i) => (
                <th
                  key={h}
                  className={`py-3 px-3 text-[10px] font-black uppercase tracking-widest text-primary whitespace-nowrap ${
                    numeric && i > 0 ? 'text-right' : 'text-left'
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr
                key={ri}
                className="border-b border-border/30 last:border-0 hover:bg-primary/[0.03] transition-colors"
              >
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className={`py-3 px-3 align-top leading-relaxed ${
                      ci === 0
                        ? 'font-bold text-foreground'
                        : 'text-muted-foreground font-medium'
                    } ${numeric && ci > 0 ? 'text-right tabular-nums whitespace-nowrap' : ''}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {caption && (
        <figcaption className="text-xs text-muted-foreground font-medium leading-relaxed pt-1 border-t border-primary/5">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function ArticleStats({ stats }: { stats: ArticleStat[] }) {
  return (
    <div className="my-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl glass-panel border-primary/10 p-5 space-y-1.5 hover:border-primary/20 transition-colors"
        >
          <div className="text-xl lg:text-2xl font-black font-headline text-primary tabular-nums leading-none">
            {stat.value}
          </div>
          <div className="text-[10px] font-black uppercase tracking-widest text-foreground/80 leading-tight">
            {stat.label}
          </div>
          {stat.detail && (
            <div className="text-[11px] text-muted-foreground font-medium leading-snug pt-0.5">
              {stat.detail}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
