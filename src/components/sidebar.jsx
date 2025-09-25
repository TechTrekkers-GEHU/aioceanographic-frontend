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
      id: 'SagarAi',
      icon: 'robot',
      label: 'SagarAi',
      description: 'AI-driven insights'
    },
    { 
      id: 'analysis', 
      icon: 'chart-bar', 
      label: 'Analysis',
      description: 'Data processing and insights'
    },
    { 
      id: 'visualization', 
      icon: 'chart-line', 
      label: 'Visualization',
      description: 'Interactive charts and maps'
    },
    { 
      id: 'data', 
      icon: 'database', 
      label: 'Data Sources',
      description: 'Sensor data and pipelines'
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
    

      {/* Navigation Menu */}
      <nav className="p-4">
        <div className="mb-6">
          
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
      </nav>
    </aside>
  );
};

export default Sidebar;