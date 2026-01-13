import { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiToggleLeft, FiToggleRight, FiGift } from 'react-icons/fi';

const Promotion = () => {
  const [promotions, setPromotions] = useState([
    { id: 1, title: 'Welcome Bonus 100%', type: 'First Deposit', bonus: '100%', maxBonus: '฿5,000', turnover: '5x', status: true, claims: 1250, expires: '2024-12-31' },
    { id: 2, title: 'Daily Reload 20%', type: 'Reload', bonus: '20%', maxBonus: '฿2,000', turnover: '3x', status: true, claims: 3450, expires: '2024-06-30' },
    { id: 3, title: 'Weekend Cashback', type: 'Cashback', bonus: '10%', maxBonus: '฿10,000', turnover: '1x', status: true, claims: 890, expires: '2024-12-31' },
    { id: 4, title: 'VIP Exclusive', type: 'VIP Only', bonus: '50%', maxBonus: '฿20,000', turnover: '2x', status: true, claims: 125, expires: '2024-12-31' },
    { id: 5, title: 'Refer & Earn', type: 'Referral', bonus: '฿500', maxBonus: 'Unlimited', turnover: '1x', status: false, claims: 2100, expires: '2024-03-31' },
  ]);

  const toggleStatus = (id) => {
    setPromotions(promotions.map(promo =>
      promo.id === id ? { ...promo, status: !promo.status } : promo
    ));
  };

  return (
    <div className="setting-page">
      <div className="page-header">
        <h1 className="page-title">Promotion Management</h1>
        <button className="btn btn-primary">
          <FiPlus /> Create Promotion
        </button>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ marginBottom: '20px' }}>
        <div className="stat-card">
          <div className="stat-icon gold"><FiGift /></div>
          <div className="stat-info">
            <h4>Active Promotions</h4>
            <p>4</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">#</div>
          <div className="stat-info">
            <h4>Total Claims Today</h4>
            <p>245</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue">฿</div>
          <div className="stat-info">
            <h4>Bonus Given Today</h4>
            <p>฿125,000</p>
          </div>
        </div>
      </div>

      {/* Promotions Table */}
      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Type</th>
              <th>Bonus</th>
              <th>Max Bonus</th>
              <th>Turnover</th>
              <th>Claims</th>
              <th>Expires</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {promotions.map((promo) => (
              <tr key={promo.id}>
                <td>{promo.id}</td>
                <td style={{ fontWeight: 600 }}>{promo.title}</td>
                <td>
                  <span className={`badge ${
                    promo.type === 'First Deposit' ? 'badge-success' :
                    promo.type === 'Reload' ? 'badge-info' :
                    promo.type === 'Cashback' ? 'badge-warning' :
                    promo.type === 'VIP Only' ? 'badge-info' : 'badge-success'
                  }`}>
                    {promo.type}
                  </span>
                </td>
                <td style={{ fontWeight: 600, color: '#16a34a' }}>{promo.bonus}</td>
                <td>{promo.maxBonus}</td>
                <td>{promo.turnover}</td>
                <td>{promo.claims.toLocaleString()}</td>
                <td style={{ color: '#6b7280' }}>{promo.expires}</td>
                <td>
                  <button
                    onClick={() => toggleStatus(promo.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: promo.status ? '#16a34a' : '#dc2626',
                      fontSize: '24px'
                    }}
                  >
                    {promo.status ? <FiToggleRight /> : <FiToggleLeft />}
                  </button>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <button className="btn btn-secondary" style={{ padding: '6px 10px' }}>
                      <FiEye />
                    </button>
                    <button className="btn btn-secondary" style={{ padding: '6px 10px' }}>
                      <FiEdit2 />
                    </button>
                    <button className="btn btn-danger" style={{ padding: '6px 10px' }}>
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Promotion Types */}
      <div className="card" style={{ marginTop: '20px' }}>
        <div className="card-header">
          <h3 className="card-title">Promotion Types Guide</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          {[
            { type: 'First Deposit', desc: 'One-time bonus for new members' },
            { type: 'Reload', desc: 'Bonus on subsequent deposits' },
            { type: 'Cashback', desc: 'Percentage return on losses' },
            { type: 'VIP Only', desc: 'Exclusive for VIP members' },
            { type: 'Referral', desc: 'Reward for referring new members' },
            { type: 'Free Spin', desc: 'Free spins on slot games' },
          ].map((item, index) => (
            <div key={index} style={{ padding: '15px', background: '#f9fafb', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#1f2937', marginBottom: '5px' }}>{item.type}</h4>
              <p style={{ fontSize: '12px', color: '#6b7280' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Promotion;
