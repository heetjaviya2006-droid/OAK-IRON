import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE from '../../config';

const StatCard = ({ icon, label, value, color, sub }) => (
  <div style={{
    background: '#fff',
    borderRadius: '14px',
    padding: '24px',
    border: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
  }}>
    <div style={{
      width: '54px', height: '54px',
      borderRadius: '12px',
      background: color + '18',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '1.6rem', flexShrink: 0,
    }}>{icon}</div>
    <div>
      <div style={{ color: '#6b7280', fontSize: '0.82rem', fontWeight: 500, marginBottom: '4px' }}>{label}</div>
      <div style={{ fontWeight: 700, fontSize: '1.6rem', color: '#111827', lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ color: '#9ca3af', fontSize: '0.76rem', marginTop: '4px' }}>{sub}</div>}
    </div>
  </div>
);

const DashboardOverview = () => {
  const navigate = useNavigate();
  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };
        const { data } = await axios.get(`${API_BASE}/api/orders/stats`, config);
        setStats(data);
      } catch (err) {
        // Fallback: fetch products, orders, users separately
        try {
          const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };
          const [prodRes, ordRes] = await Promise.all([
            axios.get(`${API_BASE}/api/products`),
            axios.get(`${API_BASE}/api/orders`, config),
          ]);
          const orders = ordRes.data;
          setStats({
            totalOrders: orders.length,
            totalProducts: prodRes.data.length,
            totalUsers: 0,
            totalRevenue: orders.reduce((s, o) => s + (o.totalPrice || 0), 0),
            recentOrders: orders.slice(0, 5),
          });
        } catch {
          setError('Could not load dashboard stats.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', gap: '16px' }}>
      <div style={{
        width: '48px', height: '48px',
        border: '4px solid #e5e7eb',
        borderTop: '4px solid #1a1a2e',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <p style={{ color: '#9ca3af' }}>Loading dashboard…</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (error) return (
    <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '20px', color: '#dc2626' }}>{error}</div>
  );

  const revenue = stats?.totalRevenue || 0;

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontWeight: 700, fontSize: '1.5rem', color: '#111827', margin: 0 }}>Dashboard Overview</h2>
        <p style={{ color: '#9ca3af', fontSize: '0.88rem', marginTop: '4px' }}>
          Welcome back, {userInfo?.name}! Here's what's happening today.
        </p>
      </div>

      {/* Stat Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '32px',
      }}>
        <StatCard
          icon="💸"
          label="Total Revenue"
          value={`₹${revenue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`}
          color="#10b981"
          sub="All time"
        />
        <StatCard
          icon="🛒"
          label="Total Orders"
          value={stats?.totalOrders ?? '—'}
          color="#3b82f6"
          sub="All orders placed"
        />
        <StatCard
          icon="📦"
          label="Total Products"
          value={stats?.totalProducts ?? '—'}
          color="#f59e0b"
          sub="In catalogue"
        />
        <StatCard
          icon="👥"
          label="Total Users"
          value={stats?.totalUsers > 0 ? stats.totalUsers : '—'}
          color="#8b5cf6"
          sub="Registered accounts"
        />
      </div>

      {/* Recent Orders */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h4 style={{ fontWeight: 700, color: '#111827', margin: 0 }}>Recent Orders</h4>
          <button
            onClick={() => navigate('/admin/orders')}
            style={{
              background: '#1a1a2e', color: '#fff', border: 'none',
              padding: '7px 16px', borderRadius: '8px', cursor: 'pointer',
              fontSize: '0.82rem', fontWeight: 500,
            }}
          >View All →</button>
        </div>

        {stats?.recentOrders?.length > 0 ? (
          <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                  {['Order ID', 'Customer', 'Date', 'Total', 'Status'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#6b7280', fontSize: '0.78rem', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order, i) => (
                  <tr
                    key={order._id}
                    style={{ borderBottom: i < stats.recentOrders.length - 1 ? '1px solid #f3f4f6' : 'none', cursor: 'pointer' }}
                    onClick={() => navigate('/admin/orders')}
                    onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '14px 16px', color: '#6b7280', fontFamily: 'monospace', fontSize: '0.82rem' }}>
                      #{order._id.slice(-8).toUpperCase()}
                    </td>
                    <td style={{ padding: '14px 16px', fontWeight: 500, color: '#111827' }}>
                      {order.user?.name || 'Guest'}
                    </td>
                    <td style={{ padding: '14px 16px', color: '#6b7280' }}>
                      {new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#111827' }}>
                      ₹{order.totalPrice?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        background: order.isDelivered ? '#d1fae5' : '#fef3c7',
                        color: order.isDelivered ? '#065f46' : '#92400e',
                      }}>
                        {order.isDelivered ? '✓ Delivered' : '⏳ Processing'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{
            background: '#f9fafb', borderRadius: '12px',
            padding: '48px', textAlign: 'center', color: '#9ca3af',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🛒</div>
            <p style={{ fontWeight: 500, margin: 0 }}>No orders yet</p>
            <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>Orders will appear here once customers start buying.</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div>
        <h4 style={{ fontWeight: 700, color: '#111827', marginBottom: '16px' }}>Quick Actions</h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {[
            { label: '+ Add Product', path: '/admin/products/create', bg: '#1a1a2e', color: '#fff' },
            { label: '📦 Products', path: '/admin/products', bg: '#f3f4f6', color: '#374151' },
            { label: '🛒 Orders', path: '/admin/orders', bg: '#f3f4f6', color: '#374151' },
            { label: '👥 Users', path: '/admin/users', bg: '#f3f4f6', color: '#374151' },
          ].map(({ label, path, bg, color }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              style={{
                padding: '10px 20px',
                borderRadius: '10px',
                background: bg, color,
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.88rem',
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
