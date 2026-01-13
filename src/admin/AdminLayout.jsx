import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import {
  FiMessageSquare,
  FiRepeat,
  FiGrid,
  FiUser,
  FiTrendingUp,
  FiMenu,
  FiX,
  FiGift,
  FiUsers,
  FiDollarSign,
  FiMail,
  FiCreditCard,
  FiUserCheck,
  FiSpeaker,
  FiMonitor,
  FiSettings,
  FiLayout,
  FiDroplet,
  FiEdit,
  FiFile,
  FiTool,
  FiLock,
  FiUserX,
  FiShoppingCart,
  FiMessageCircle,
  FiGlobe,
  FiCode,
  FiPackage,
  FiFileText,
  FiKey
} from 'react-icons/fi';

const AdminLayout = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [language, setLanguage] = useState('English');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Lock body scroll when sidebar is open (mobile)
  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
    return () => document.body.classList.remove('sidebar-open');
  }, [sidebarOpen]);

  const formatDateTime = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const day = days[date.getDay()];
    return `--- ${date.getDate().toString().padStart(2, '0')} January ${date.getFullYear()} (${day}) ${date.toLocaleTimeString('en-GB')} --- To get latest Maintenance Announcement click →`;
  };

  // First section of sidebar menu (from first screenshot)
  const sidebarMenuTop = [
    { icon: <FiEdit />, label: 'LAYOUT', path: '/layout' },
    { icon: <FiFile />, label: 'MANAGE PAGE', path: '/manage-page' },
    { icon: <FiMonitor />, label: 'ADMIN TOOL', path: '/admin-tool' },
    { icon: <FiTool />, label: 'TOOLS', path: '/tools' },
    { icon: <FiLock />, label: 'SECURITY', path: '/security' },
    { icon: <FiUserX />, label: 'BLACKLIST', path: '/blacklist' },
    { icon: <FiShoppingCart />, label: 'PAYMENT', path: '/payment' },
    { icon: <FiMessageCircle />, label: 'MESSAGING', path: '/messaging' },
    { icon: <FiGlobe />, label: 'DOMAIN', path: '/domain' },
    { icon: <FiCode />, label: 'MANAGE API', path: '/manage-api' },
    { icon: <FiPackage />, label: 'MARKET PLACE', path: '/marketplace' },
    { icon: <FiFileText />, label: 'CHANGELOG', path: '/changelog' },
    { icon: <FiKey />, label: 'PASSWORD', path: '/password' },
  ];

  // Second section of sidebar menu (from second screenshot)
  const sidebarMenuBottom = [
    { icon: <FiGift />, label: 'REBATE', path: '/rebate' },
    { icon: <FiUsers />, label: 'REFERRER', path: '/referrer' },
    { icon: <FiDollarSign />, label: 'COMMISSION', path: '/commission' },
    { icon: <FiMail />, label: 'SMS', path: '/sms' },
    { icon: <FiCreditCard />, label: 'MANAGE BANK', path: '/manage-bank' },
    { icon: <FiUserCheck />, label: 'MANAGE STAFF', path: '/manage-staff' },
    { icon: <FiSpeaker />, label: 'PROMOTION', path: '/promotion' },
    { icon: <FiMonitor />, label: 'GAME KIOSK', path: '/game-kiosk' },
    { icon: <FiSettings />, label: 'GAME SETTING', path: '/game-setting' },
    { icon: <FiSettings />, label: 'SETTING', path: '/setting' },
    { icon: <FiLayout />, label: 'DISPLAY', path: '/display' },
    { icon: <FiDroplet />, label: 'THEME', path: '/theme' },
  ];

  const leftMenuItems = [
    { label: 'Transaction', path: '/transactions', hasArrow: true },
    { label: 'Customer', path: '/customers' },
    { label: 'Top Customer', path: '/top-customers' },
    { label: 'Promotion', path: '/promotion-report' },
    { label: 'Bank', path: '/bank-report' },
    { label: 'Commission', path: '/commission-report' },
    { label: 'Payment Gateway', path: '/payment-gateway' },
    { label: 'Rebate / Angpao', path: '/rebate-report' },
    { label: 'Manual / Other', path: '/manual' },
    { label: 'Lucky Number', path: '/lucky-number' },
    { label: 'Lucky Draw 4D', path: '/lucky-draw' },
    { label: 'Staff', path: '/staff-report' },
    { label: 'Activity Log', path: '/activity-log' },
    { label: 'Game WinLose', path: '/game-winlose' },
    { label: 'Feedback', path: '/feedback' },
    { label: 'Leaderboard', path: '/leaderboard' },
    { label: 'Top Referrer', path: '/top-referrer' },
  ];

  const showLeftSidebar = location.pathname.includes('report') || location.pathname === '/cashflow';

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="admin-layout">
      {/* Announcement Bar */}
      <div className="announcement-bar">
        {formatDateTime(currentTime)} <a href="#">Here</a>
      </div>

      {/* Top Header with Icons */}
      <header className="top-header">
        <div className="header-icons">
          <NavLink to="/chatlist" className={({ isActive }) => `header-icon-btn ${isActive ? 'active' : ''}`}>
            <FiMessageSquare size={28} />
          </NavLink>
          <NavLink to="/transactions" className={({ isActive }) => `header-icon-btn ${isActive ? 'active' : ''}`}>
            <FiRepeat size={28} />
          </NavLink>
          <NavLink to="/bank-tx" className={({ isActive }) => `header-icon-btn ${isActive ? 'active' : ''}`}>
            <FiGrid size={28} />
          </NavLink>
          <NavLink to="/users" className={({ isActive }) => `header-icon-btn ${isActive ? 'active' : ''}`}>
            <FiUser size={28} />
          </NavLink>
          <NavLink to="/reports" className={({ isActive }) => `header-icon-btn ${isActive ? 'active' : ''}`}>
            <FiTrendingUp size={28} />
          </NavLink>
          <button className="header-icon-btn" onClick={toggleSidebar}>
            <FiMenu size={28} />
          </button>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      {/* Hamburger Sidebar */}
      <aside className={`hamburger-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button className="sidebar-close-btn" onClick={closeSidebar}>
            <FiX size={24} />
          </button>
        </div>

        <div className="sidebar-top-section">
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="sidebar-select">
            <option>English</option>
            <option>Thai</option>
            <option>Chinese</option>
          </select>
          <div className="sidebar-time">
            System: +08:00 Device: +11:00
          </div>
        </div>

        <div className="sidebar-menu-section">
          <ul className="sidebar-menu">
            {sidebarMenuBottom.map((item, index) => (
              <NavLink
                key={`bottom-${index}`}
                to={item.path}
                className={({ isActive }) => `sidebar-menu-item ${isActive ? 'active' : ''}`}
                onClick={closeSidebar}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </ul>
        </div>

        <div className="sidebar-divider"></div>

        <div className="sidebar-menu-section">
          <ul className="sidebar-menu">
            {sidebarMenuTop.map((item, index) => (
              <NavLink
                key={`top-${index}`}
                to={item.path}
                className={({ isActive }) => `sidebar-menu-item ${isActive ? 'active' : ''}`}
                onClick={closeSidebar}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="main-wrapper">
        {/* Left Sidebar - Only on Reports pages */}
        {showLeftSidebar && (
          <aside className="left-sidebar">
            <div className="left-sidebar-header">
              <FiTrendingUp /> Reports
            </div>
            <ul className="left-sidebar-menu">
              {leftMenuItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.path}
                  className={({ isActive }) =>
                    `left-sidebar-item ${isActive ? 'active' : ''} ${item.hasArrow ? 'has-arrow' : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </ul>
          </aside>
        )}

        {/* Content Area */}
        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
