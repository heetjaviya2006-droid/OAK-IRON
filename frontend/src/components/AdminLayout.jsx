import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: '' },
  { to: '/admin/products', label: 'Products', icon: '' },
  { to: '/admin/orders', label: 'Orders', icon: '' },
  { to: '/admin/users', label: 'Users', icon: '' },
  { to: '/admin/settings', label: 'Settings', icon: '' },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null;
    if (!userInfo || userInfo.role !== 'admin') navigate('/login');
  }, [navigate]);

  // Close sidebar when route changes (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
    window.location.reload();
  };

  const Sidebar = () => (
    <div style={{
      width: '240px',
      minHeight: '100vh',
      background: '#1a1a2e',
      display: 'flex',
      flexDirection: 'column',
      padding: '0',
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{
        padding: '24px 20px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '1.2rem', letterSpacing: '1px' }}>
          OAK &amp; IRON
        </Link>
        {/* Close btn (mobile only) */}
        <button
          onClick={() => setSidebarOpen(false)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '1.4rem',
            cursor: 'pointer',
            lineHeight: 1,
          }}
          className="admin-sidebar-close"
        >✕</button>
      </div>

      <div style={{ padding: '8px 12px', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '12px' }}>
        Main Menu
      </div>

      {/* Nav links */}
      <nav style={{ flex: 1, padding: '4px 12px' }}>
        {navItems.map(({ to, label, icon }) => {
          const isActive = location.pathname === to ||
            (to !== '/admin' && location.pathname.startsWith(to));
          return (
            <Link
              key={to}
              to={to}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '11px 14px',
                borderRadius: '10px',
                marginBottom: '4px',
                textDecoration: 'none',
                color: isActive ? '#ffffff' : 'rgba(255,255,255,0.65)',
                background: isActive ? 'rgba(255,255,255,0.12)' : 'transparent',
                fontWeight: isActive ? 600 : 400,
                fontSize: '0.92rem',
                transition: 'all 0.15s',
                borderLeft: isActive ? '3px solid #B5935E' : '3px solid transparent',
              }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#fff'; } }}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; } }}
            >
              <span style={{ fontSize: '1.1rem' }}>{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* User info + logout */}
      <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', marginBottom: '4px' }}>Logged in as</div>
        <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem', marginBottom: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {userInfo?.name || 'Admin'}
        </div>
        <button
          onClick={logoutHandler}
          style={{
            width: '100%',
            padding: '8px',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '8px',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 500,
          }}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 1040,
            display: 'none',
          }}
          className="admin-overlay"
        />
      )}

      <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Outfit', sans-serif" }}>
        {/* Desktop sidebar */}
        <div className="admin-sidebar-desktop">
          <Sidebar />
        </div>

        {/* Mobile drawer sidebar */}
        <div
          className="admin-sidebar-mobile"
          style={{
            position: 'fixed',
            top: 0, left: 0, bottom: 0,
            zIndex: 1050,
            transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.3s ease',
          }}
        >
          <Sidebar />
        </div>

        {/* Main content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {/* Top bar */}
          <div style={{
            background: '#fff',
            borderBottom: '1px solid #e5e7eb',
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            position: 'sticky',
            top: 0,
            zIndex: 100,
          }}>
            {/* Hamburger (mobile only) */}
            <button
              className="admin-hamburger"
              onClick={() => setSidebarOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'none',
                padding: '4px',
                borderRadius: '6px',
              }}
            >
              <div style={{ width: '22px', height: '2px', background: '#1a1a2e', marginBottom: '5px', borderRadius: '2px' }} />
              <div style={{ width: '22px', height: '2px', background: '#1a1a2e', marginBottom: '5px', borderRadius: '2px' }} />
              <div style={{ width: '22px', height: '2px', background: '#1a1a2e', borderRadius: '2px' }} />
            </button>

            <span style={{ fontWeight: 700, fontSize: '1rem', color: '#1a1a2e' }}>
              {navItems.find(n => location.pathname === n.to || (n.to !== '/admin' && location.pathname.startsWith(n.to)))?.label || 'Admin Panel'}
            </span>

            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link to="/" style={{ color: '#B5935E', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 500 }}>
                ← Back to Store
              </Link>
              <div style={{
                width: '34px', height: '34px',
                borderRadius: '50%',
                background: '#1a1a2e',
                color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '0.85rem',
              }}>
                {userInfo?.name?.[0]?.toUpperCase() || 'A'}
              </div>
            </div>
          </div>

          {/* Page content */}
          <div style={{ flex: 1, padding: '28px', background: '#f3f4f6', overflowY: 'auto' }}>
            <div style={{ background: '#fff', borderRadius: '14px', padding: '28px', minHeight: '100%', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .admin-sidebar-desktop { display: flex; }
        .admin-sidebar-mobile  { display: none; }
        .admin-hamburger       { display: none !important; }
        .admin-overlay         { display: none !important; }

        @media (max-width: 768px) {
          .admin-sidebar-desktop { display: none !important; }
          .admin-sidebar-mobile  { display: block; }
          .admin-hamburger       { display: block !important; }
          .admin-overlay         { display: block !important; }
        }
      `}</style>
    </>
  );
};

export default AdminLayout;
