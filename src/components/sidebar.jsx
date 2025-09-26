import React from 'react';
import { LuLayoutDashboard } from 'react-icons/lu';
import { AiOutlineSetting } from 'react-icons/ai';
import { FaRegChartBar } from 'react-icons/fa6';
import { PiChartDonut } from 'react-icons/pi';
import { BsDatabaseGear } from 'react-icons/bs';
import { GiWaveCrest } from 'react-icons/gi';
import { RiMenuUnfold4Line } from 'react-icons/ri';
import { RiMenuUnfold3Line } from 'react-icons/ri';

const Sidebar = ({ activeModule, setActiveModule }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const menuItems = [
    { id: 'dashboard', icon: LuLayoutDashboard, label: 'Dashboard', description: 'Overview and metrics' },
    { id: 'SagarAi', icon: GiWaveCrest, label: 'SagarAi', description: 'AI-driven insights' },
    { id: 'analysis', icon: FaRegChartBar, label: 'Analysis', description: 'Data processing and insights' },
    { id: 'visualization', icon: PiChartDonut, label: 'Visualization', description: 'Interactive charts and maps' },
    { id: 'data', icon: BsDatabaseGear, label: 'Data Sources', description: 'Sensor data and pipelines' },
    { id: 'settings', icon: AiOutlineSetting, label: 'Settings', description: 'Platform configuration' },
  ];

  return (
    <aside className={`bg-white shadow-custom-light h-screen sticky top-0 overflow-y-auto transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      
      {/* Collapse/Expand Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center bg-light-gray hover:bg-seagrass text-dark-gray hover:text-white transition-colors z-50"
      >
        {isCollapsed?<RiMenuUnfold4Line className="w-5 h-5" />:<RiMenuUnfold3Line className="w-5 h-5 rotate-180" />}
      </button>

      {/* Menu Items */}
      <nav className={`p-4 mt-12 ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
        <ul className="space-y-1 w-full">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveModule(item.id)}
                  className={`flex items-center gap-3 w-full px-2 py-2 rounded-lg transition-colors ${
                    activeModule === item.id
                      ? 'bg-seagrass text-white'
                      : 'text-dark-gray hover:bg-light-gray hover:text-marine-blue'
                  }`}
                >
                  <div className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                    activeModule === item.id ? 'bg-seagrass text-white' : 'bg-light-gray text-dark-gray group-hover:bg-seagrass group-hover:text-white'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Only show text if expanded */}
                  {!isCollapsed && (
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-gray-400 truncate">{item.description}</div>
                    </div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
