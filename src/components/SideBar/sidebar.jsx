import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import { LuLayoutDashboard } from 'react-icons/lu';
import { AiOutlineSetting } from 'react-icons/ai';
import { FaRegChartBar } from 'react-icons/fa6';
import { PiChartDonut } from 'react-icons/pi';
import { BsDatabaseGear } from 'react-icons/bs';
import { GiWaveCrest } from 'react-icons/gi';
import { RiMenuUnfold4Line } from 'react-icons/ri';
import { RiMenuUnfold3Line } from 'react-icons/ri';

const Sidebar = ({ }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const { pathname: rawPath } = useLocation();
  const pathname = rawPath === '/' ? '/dashboard' : rawPath;

  const menuItems = [
    { id: 'dashboard', icon: LuLayoutDashboard, label: 'Dashboard', description: 'Overview and metrics',path:'/' },
    { id: 'SagarAi', icon: GiWaveCrest, label: 'SagarAi', description: 'AI-driven insights',path:'/sagarai' },
    { id: 'analysis', icon: FaRegChartBar, label: 'Analysis', description: 'Data processing and insights',path:'/analysis' },
    { id: 'visualization', icon: PiChartDonut, label: 'Visualization', description: 'Interactive charts and maps',path:'/visualization' },
    { id: 'data', icon: BsDatabaseGear, label: 'Data Sources', description: 'Sensor data and pipelines',path:'/data' },
    { id: 'settings', icon: AiOutlineSetting, label: 'Settings', description: 'Platform configuration',path:'/settings' },
  ];

  return (
    <aside className={`bg-white shadow-custom-light h-screen sticky top-0 overflow-y-auto transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      
      {/* Collapse/Expand Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute fix-4 top-4 left-6 w-8 h-8 rounded-lg flex items-center justify-center bg-light-gray hover:bg-seagrass text-dark-gray hover:text-white transition-colors z-50"
      >
        {isCollapsed?<RiMenuUnfold3Line className="w-5 h-5" />:<RiMenuUnfold4Line className="w-5 h-5" />}
      </button>

      {/* Menu Items */}
      <nav className={`p-4 mt-12 ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
        <ul className="space-y-1 w-full">
          {menuItems.map(item => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.path);
            return (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 w-full px-2 py-2 rounded-lg transition-colors ${
                    active
                      ? 'bg-seagrass text-white'
                      : 'text-dark-gray hover:bg-light-gray hover:text-marine-blue'
                  }`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 mt-2 flex items-center justify-center rounded-lg transition-colors ${
                    active ? 'bg-seagrass text-white' : 'bg-light-gray text-dark-gray group-hover:bg-seagrass group-hover:text-white'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Only show text if expanded */}
                  {!isCollapsed && (
                    <div className="flex-1 min-w-0 whitespace-nowrap overflow-hidden text-ellipsis">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-gray-400 truncate">{item.description}</div>
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
