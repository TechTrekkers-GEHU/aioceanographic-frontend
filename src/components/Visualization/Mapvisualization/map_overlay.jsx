import { useState } from "react";

export default function MapOverlay({ region, toggles, onChange }) {
  const [open, setOpen] = useState(false);
  const toggle = (key) => onChange({ toggles: { ...toggles, [key]: !toggles[key] } });

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="rounded-full bg-primary px-4 py-2 text-primary-foreground shadow-lg transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary"
        aria-expanded={open}
        aria-controls="map-overlay-menu"
      >
        Map Controls
      </button>

      {open && (
        <div id="map-overlay-menu" className="absolute bottom-12 right-0 w-[320px] max-w-[90vw] rounded-lg border border-gray-300 bg-card p-4 bg-white max-h-85" role="dialog" aria-label="Map controls">
          <div className="mb-4">
            <h3 className="text-sm font-medium">Region</h3>
            <select className="mt-2 w-full rounded-md border bg-background p-2 text-sm" value={region} onChange={(e) => onChange({ region: e.target.value })}>
              {[
                ["indian","Indian Ocean"],
                ["global","Global"],
                ["north-atlantic","North Atlantic"],
                ["south-atlantic","South Atlantic"],
              ].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-medium">Species layers</h3>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <label className="flex items-center gap-2 text-xs"><input type="checkbox" className="h-4 w-4" checked={toggles.fish} onChange={() => toggle("fish")} /> Fish</label>
              <label className="flex items-center gap-2 text-xs"><input type="checkbox" className="h-4 w-4" checked={toggles.coral} onChange={() => toggle("coral")} /> Coral</label>
              <label className="flex items-center gap-2 text-xs"><input type="checkbox" className="h-4 w-4" checked={toggles.mammals} onChange={() => toggle("mammals")} /> Marine mammals</label>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-medium">Conservation layers</h3>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <label className="flex items-center gap-2 text-xs">
                <input type="checkbox" className="h-4 w-4" checked={toggles.mpaEstablished} onChange={() => toggle("mpaEstablished")} /> MPAs established</label>
              <label className="flex items-center gap-2 text-xs">
                <input type="checkbox" className="h-4 w-4" checked={toggles.mpaProposed} onChange={() => toggle("mpaProposed")} /> MPAs proposed</label>
              <label className="flex items-center gap-2 text-xs">
                <input type="checkbox" className="h-4 w-4" checked={toggles.criticalHabitat} onChange={() => toggle("criticalHabitat")} /> Critical habitats</label>
            </div>
          </div>

          <div className="mb-2">
            <h3 className="text-sm font-medium">Environmental overlays</h3>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <label className="flex items-center gap-2 text-xs">
                <input type="checkbox" className="h-4 w-4" checked={toggles.temperature} onChange={() => toggle("temperature")} /> Richness heatmap</label>
              <label className="flex items-center gap-2 text-xs">
                <input type="checkbox" className="h-4 w-4" checked={toggles.currents} onChange={() => toggle("currents")} /> Currents</label>
              <label className="flex items-center gap-2 text-xs">
                <input type="checkbox" className="h-4 w-4" checked={toggles.depth} onChange={() => toggle("depth")} /> Depth contours</label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
