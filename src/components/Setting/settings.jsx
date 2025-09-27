"use client"
import React from "react"
const SettingsPage =() => {

  const defaultState = React.useMemo(
    () => ({
      // Data Sources
      enableSatellite: true,
      dataFormat: "netcdf",
      roi: "Indian Ocean",
      customEndpoints: "",
      // Visualization Engine
      // Sagar AI
      enableSagarAI: true,
      aiModel: "TechTrekkers/SagarAi-v1.0",
      aiTemperature: 0.2,
      aiSystemPrompt: "You are Sagar AI, a helpful oceanographic assistant. Provide precise, actionable insights.",
      // Dashboard
      theme: "system",
      refreshInterval: 60,
      experimentalWidgets: false,
      // ECharts visualization defaults 
    }),
    [],
  )

  const [settings, setSettings] = React.useState(defaultState)
  const [saving, setSaving] = React.useState(false)
  const [savedAt, setSavedAt] = React.useState(null)

  function handleChange(name, value) {
    setSettings((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    console.log("[v0] Saving settings payload:", settings)
    
    setTimeout(() => {
      setSaving(false)
      setSavedAt(new Date())
      console.log("[v0] Settings saved at:", new Date().toISOString())
    }, 700)
  }

  function handleReset() {
    setSettings(defaultState)
    setSavedAt(null)
    console.log("[v0] Settings reset to defaults")
  }

  return (
    <div className="w-full bg-background text-foreground text-dark-gray">
      <header className="border-b border-border border-b-gray-300">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <h1 className="text-pretty text-2xl font-semibold tracking-tight">Platform Settings</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Configure data ingestion, Sagar AI, and dashboard preferences.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <form onSubmit={handleSubmit} className="grid gap-8">
          {/* Data Sources */}
          <section className="rounded-lg border border-border border-gray-300 bg-card p-6 text-card-foreground">
            <div className="mb-4">
              <h2 className="text-lg font-medium">Data Sources</h2>
              <p className="text-sm text-muted-foreground">
                Control how data is collected and parsed for the platform.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="grid gap-2">
                <label htmlFor="enableSatellite" className="font-medium">
                  Satellite Feeds
                </label>
                <div className="flex items-center gap-3">
                  <input
                    id="enableSatellite"
                    type="checkbox"
                    className="h-4 w-4 rounded border-border border-gray-300 bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    checked={settings.enableSatellite}
                    onChange={(e) => handleChange("enableSatellite", e.target.checked)}
                    aria-describedby="enableSatellite-desc"
                  />
                  <span className="text-sm">Enable satellite data ingestion</span>
                </div>
                <p id="enableSatellite-desc" className="text-xs text-muted-foreground">
                  Toggle ingestion from supported satellite sources.
                </p>
              </div>

              <div className="grid gap-2">
                <label htmlFor="dataFormat" className="font-medium">
                  Preferred Data Format
                </label>
                <select
                  id="dataFormat"
                  className="h-10 rounded-md border border-border border-gray-300 bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  value={settings.dataFormat}
                  onChange={(e) => handleChange("dataFormat", e.target.value)}
                >
                  <option value="netcdf">NetCDF</option>
                  <option value="geotiff">GeoTIFF</option>
                  <option value="csv">CSV</option>
                </select>
                <p className="text-xs text-muted-foreground">
                  Choose the default storage/parse format for new datasets.
                </p>
              </div>

              <div className="grid gap-2 md:col-span-2">
                <label htmlFor="roi" className="font-medium">
                  Region of Interest
                </label>
                <input
                  id="roi"
                  type="text"
                  className="h-10 rounded-md border border-border border-gray-300 bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., Global, North Atlantic, Bay of Bengal"
                  value={settings.roi}
                  onChange={(e) => handleChange("roi", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Use a named region or bounds notation like {'"lat:[-30,30], lon:[50,120]"'}.
                </p>
              </div>

              <div className="grid gap-2 md:col-span-2">
                <label htmlFor="customEndpoints" className="font-medium">
                  Custom Data Endpoints
                </label>
                <textarea
                  id="customEndpoints"
                  rows={4}
                  className="rounded-md border border-border border-gray-300 bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="One endpoint per line (https://...)\nSupports authenticated sources via server-side config."
                  value={settings.customEndpoints}
                  onChange={(e) => handleChange("customEndpoints", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Add external catalog or API endpoints. Credentials must be configured server-side.
                </p>
              </div>
            </div>
          </section>
          {/* Sagar AI */}
          <section className="rounded-lg border border-border border-gray-300 bg-card p-6 text-card-foreground">
            <div className="mb-4">
              <h2 className="text-lg font-medium">Sagar AI Interface</h2>
              <p className="text-sm text-muted-foreground">Configure the conversational assistant.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="grid gap-2">
                <label htmlFor="enableSagarAI" className="font-medium">
                  Enable Sagar AI
                </label>
                <div className="flex items-center gap-3">
                  <input
                    id="enableSagarAI"
                    type="checkbox"
                    className="h-4 w-4 rounded border-border border-gray-300 bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    checked={settings.enableSagarAI}
                    onChange={(e) => handleChange("enableSagarAI", e.target.checked)}
                  />
                  <span className="text-sm">Allow AI-driven insights and Q&A</span>
                </div>
              </div>

              <div className="grid gap-2">
                <label htmlFor="aiModel" className="font-medium">
                  AI Model
                </label>
                <select
                  id="aiModel"
                  className="h-10 rounded-md border border-border border-gray-300 bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  value={settings.aiModel}
                  onChange={(e) => handleChange("aiModel", e.target.value)}
                >
                  <option value="TechTrekkers/SagarAi">TechTrekkers: SagarAI</option>
                </select>
                <p className="text-xs text-muted-foreground">Choose default provider/model for text generation.</p>
              </div>

              <div className="grid gap-2">
                <label htmlFor="aiTemperature" className="font-medium">
                  Temperature: {settings.aiTemperature.toFixed(2)}
                </label>
                <input
                  id="aiTemperature"
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  className="w-full accent-primary"
                  value={settings.aiTemperature}
                  onChange={(e) => handleChange("aiTemperature", Number(e.target.value))}
                />
                <p className="text-xs text-muted-foreground">Lower = more precise, higher = more creative.</p>
              </div>

              <div className="grid gap-2 md:col-span-2">
                <label htmlFor="aiSystemPrompt" className="font-medium">
                  System Prompt
                </label>
                <textarea
                  id="aiSystemPrompt"
                  rows={3}
                  className="rounded-md border border-border border-gray-300 bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  value={settings.aiSystemPrompt}
                  onChange={(e) => handleChange("aiSystemPrompt", e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Dashboard */}
          <section className="rounded-lg border border-border border-gray-300 bg-card p-6 text-card-foreground">
            <div className="mb-4">
              <h2 className="text-lg font-medium">Dashboard</h2>
              <p className="text-sm text-muted-foreground">Personalize the workspace experience.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="grid gap-2">
                <label htmlFor="theme" className="font-medium">
                  Theme
                </label>
                <select
                  id="theme"
                  className="h-10 rounded-md border border-border border-gray-300 bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  value={settings.theme}
                  onChange={(e) => handleChange("theme", e.target.value)}
                >
                  <option value="system">System</option>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>

              <div className="grid gap-2">
                <label htmlFor="refreshInterval" className="font-medium">
                  Auto-Refresh (sec)
                </label>
                <input
                  id="refreshInterval"
                  type="number"
                  min={10}
                  max={3600}
                  step={5}
                  className="h-10 rounded-md border border-border border-gray-300 bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  value={settings.refreshInterval}
                  onChange={(e) => handleChange("refreshInterval", Number(e.target.value))}
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="experimentalWidgets" className="font-medium">
                  Experimental Widgets
                </label>
                <div className="flex items-center gap-3">
                  <input
                    id="experimentalWidgets"
                    type="checkbox"
                    className="h-4 w-4 rounded border-border border-gray-300 bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    checked={settings.experimentalWidgets}
                    onChange={(e) => handleChange("experimentalWidgets", e.target.checked)}
                  />
                  <span className="text-sm">Show experimental dashboard tiles</span>
                </div>
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="h-10 rounded-md border border-border border-gray-300 bg-background px-4 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={saving}
              className="h-10 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
            {savedAt && (
              <span className="text-xs text-muted-foreground">Last saved at {savedAt.toLocaleTimeString()}</span>
            )}
          </div>
        </form>
      </main>
    </div>
  )
}
export default SettingsPage;