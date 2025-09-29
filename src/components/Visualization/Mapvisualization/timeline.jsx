export default function LegendTimeline({ value, onChange, legend }) {
  return (
    <div className="w-full border-t border-t-gray-300 bg-card">
      <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 w-full md:w-[60%]">
          <span className="text-xs text-muted-foreground shrink-0">Time</span>
          <input type="range" min={0} max={100} step={1} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full" />
          <span className="text-xs text-muted-foreground shrink-0">{value}</span>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {legend?.map((l, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className={`inline-block h-2.5 w-2.5 rounded ${l.className}`} />
              <span className="text-xs text-muted-foreground">{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
