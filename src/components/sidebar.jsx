import React from 'react';

const Sidebar = ({ activeModule, setActiveModule }) => {
  const menuItems = [
    { 
      id: 'dashboard', 
      icon: 'tachometer-alt', 
      label: 'Dashboard',
      description: 'Overview and metrics'
    },
    { 
      id: 'analysis', 
      icon: 'chart-bar', 
      label: 'Analysis Engine',
      description: 'Data processing and insights'
    },
    { 
      id: 'visualization', 
      icon: 'chart-line', 
      label: 'Visualization Engine',
      description: 'Interactive charts and maps'
    },
    { 
      id: 'data', 
      icon: 'database', 
      label: 'Data Sources',
      description: 'Sensor data and pipelines'
    },
    { 
      id: 'reports', 
      icon: 'file-alt', 
      label: 'Reports',
      description: 'Generated analysis reports'
    },
    { 
      id: 'settings', 
      icon: 'cog', 
      label: 'Settings',
      description: 'Platform configuration'
    },
  ];

  return (
    <aside className="w-64 bg-white shadow-custom-light h-screen sticky top-0 overflow-y-auto">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-medium-gray">
        <div className="flex items-center gap-3 mb-2">
          <i className="fas fa-water text-2xl text-seagrass"></i>
          <span className="text-xl font-bold text-gradient">MarineBio Analytics</span>
        </div>
        <p className="text-sm text-dark-gray">Marine Biodiversity Platform</p>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4">
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-marine-blue uppercase tracking-wider mb-3 flex items-center gap-2">
            <i className="fas fa-compass text-seagrass text-xs"></i>
            Main Navigation
          </h3>
          
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveModule(item.id)}
                  className={`w-full text-left sidebar-item group ${
                    activeModule === item.id ? 'active' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      activeModule === item.id 
                        ? 'bg-seagrass text-white' 
                        : 'bg-light-gray text-dark-gray group-hover:bg-seagrass group-hover:text-white'
                    }`}>
                      <i className={`fas fa-${item.icon} text-sm`}></i>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-text-dark group-hover:text-marine-blue">
                        {item.label}
                      </div>
                      <div className="text-xs text-dark-gray truncate">
                        {item.description}
                      </div>
                    </div>
                    
                    {activeModule === item.id && (
                      <i className="fas fa-chevron-right text-seagrass text-xs"></i>
                    )}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Actions Section */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-marine-blue uppercase tracking-wider mb-3 flex items-center gap-2">
            <i className="fas fa-bolt text-seagrass text-xs"></i>
            Quick Actions
          </h3>
          
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-dark-gray hover:bg-light-blue hover:text-marine-blue rounded-lg transition-colors">
              <i className="fas fa-plus-circle text-seagrass"></i>
              <span>New Analysis</span>
            </button>
            
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-dark-gray hover:bg-light-blue hover:text-marine-blue rounded-lg transition-colors">
              <i className="fas fa-download text-seagrass"></i>
              <span>Export Data</span>
            </button>
            
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-dark-gray hover:bg-light-blue hover:text-marine-blue rounded-lg transition-colors">
              <i className="fas fa-sync-alt text-seagrass"></i>
              <span>Refresh Data</span>
            </button>
          </div>
        </div>

        {/* Data Status Section */}
        <div className="bg-light-blue rounded-lg p-4">
          <h4 className="text-sm font-semibold text-marine-blue mb-2">Data Status</h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-dark-gray">Last Updated</span>
              <span className="text-xs font-medium text-seagrass">2 min ago</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-dark-gray">Active Sensors</span>
              <span className="text-xs font-medium text-seagrass">24/28</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-dark-gray">Data Pipeline</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-seagrass rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-seagrass">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="mt-6 pt-4 border-t border-medium-gray">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-marine-blue to-seagrass flex items-center justify-center text-white font-semibold">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-text-dark">Dr. Jane Doe</div>
              <div className="text-xs text-dark-gray">Marine Biologist</div>
            </div>
            <button className="p-1 text-dark-gray hover:text-marine-blue transition-colors">
              <i className="fas fa-cog"></i>
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;