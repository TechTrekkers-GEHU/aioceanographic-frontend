import { useState } from "react";

export default function OceanSettingsToolbar({
  layerType,
  onLayerTypeChange,
  mapStyle,
  onMapStyleChange,
  onSearch,
  onExport,
  onToggleFullscreen,
}) {
  const [query, setQuery] = useState("");

  return (
    <div className="w-full h-10 bg-card/70 backdrop-blur-sm border-b border-border border-b-gray-300 flex items-center justify-between px-3 gap-3" role="toolbar" aria-label="Ocean settings">
      <div className="flex items-center gap-2">
        <label className="text-xs text-muted-foreground" htmlFor="layer-select">Layer</label>
        <select id="layer-select" className="h-7 rounded-md border border-border border-gray-300  bg-background text-foreground text-sm px-2" value={layerType} onChange={(e) => onLayerTypeChange(e.target.value)}>
          <option value="hotspots">Hotspots</option>
          <option value="species">Species</option>
          <option value="edna">eDNA</option>
          <option value="mpa">MPAs</option>
          <option value="habitat">Habitats</option>

        </select>
      </div>

      <div className="flex-1 max-w-xl flex items-center">
        <input
          aria-label="Search species"
          className="w-full h-8 rounded-md border border-border border-gray-300  bg-background text-foreground text-sm px-3"
          placeholder="Search species"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch?.(query)}
        />
      </div>

      <div className="flex items-center gap-2">
        <label className="text-xs text-muted-foreground" htmlFor="style-select">Style</label>
        <select id="style-select" className="h-7 rounded-md border border-border border-gray-300  bg-background text-foreground text-sm px-2" value={mapStyle} onChange={(e) => onMapStyleChange(e.target.value)}>
          <option value="standard">Standard</option>
          <option value="satellite">Satellite</option>
          <option value="bathymetric">Bathymetric</option>
        </select>

        <button type="button" className="h-8 px-3 rounded-md bg-primary text-primary-foreground text-sm" onClick={onExport}>Export</button>
        <button type="button" className="h-8 px-3 rounded-md border border-border border-gray-300  bg-background text-foreground text-sm" onClick={onToggleFullscreen} aria-label="Toggle fullscreen">Fullscreen</button>
      </div>
    </div>
  );
}
