import { useState } from 'react';
import { FiSearch, FiSave, FiRefreshCw } from 'react-icons/fi';

const Rebate = () => {
  const [settings, setSettings] = useState({
    slotRebate: 0.5,
    liveRebate: 0.3,
    sportsRebate: 0.4,
    minBet: 100,
    maxRebate: 10000
  });

  const rebateHistory = [
    { id: 1, user: 'player001', game: 'Slot Games', turnover: '฿50,000', rebate: '฿250', date: '2024-01-15', status: 'Paid' },
    { id: 2, user: 'player002', game: 'Live Casino', turnover: '฿100,000', rebate: '฿300', date: '2024-01-15', status: 'Paid' },
    { id: 3, user: 'player003', game: 'Sports', turnover: '฿30,000', rebate: '฿120', date: '2024-01-15', status: 'Pending' },
    { id: 4, user: 'player004', game: 'Slot Games', turnover: '฿200,000', rebate: '฿1,000', date: '2024-01-14', status: 'Paid' },
    { id: 5, user: 'player005', game: 'Live Casino', turnover: '฿80,000', rebate: '฿240', date: '2024-01-14', status: 'Paid' },
  ];

  return (
    <div className="rebate-page">
      <div className="page-header">
        <h1 className="page-title">Rebate Management</h1>
        <button className="btn btn-primary">
          <FiRefreshCw /> Calculate Rebates
        </button>
      </div>

      {/* Rebate Settings */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="card-header">
          <h3 className="card-title">Rebate Settings</h3>
        </div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label">Slot Games Rebate (%)</label>
            <input
              type="number"
              className="form-input"
              value={settings.slotRebate}
              onChange={(e) => setSettings({ ...settings, slotRebate: e.target.value })}
              step="0.1"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Live Casino Rebate (%)</label>
            <input
              type="number"
              className="form-input"
              value={settings.liveRebate}
              onChange={(e) => setSettings({ ...settings, liveRebate: e.target.value })}
              step="0.1"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Sports Rebate (%)</label>
            <input
              type="number"
              className="form-input"
              value={settings.sportsRebate}
              onChange={(e) => setSettings({ ...settings, sportsRebate: e.target.value })}
              step="0.1"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Minimum Bet (฿)</label>
            <input
              type="number"
              className="form-input"
              value={settings.minBet}
              onChange={(e) => setSettings({ ...settings, minBet: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Max Rebate per Day (฿)</label>
            <input
              type="number"
              className="form-input"
              value={settings.maxRebate}
              onChange={(e) => setSettings({ ...settings, maxRebate: e.target.value })}
            />
          </div>
          </div>
          <div style={{ marginTop: '20px' }}>
            <button className="btn btn-primary">
              <FiSave /> Save Settings
            </button>
          </div>
        </div>
      </div>

      {/* Rebate History */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Rebate History</h3>
          <div className="search-box" style={{ width: '250px' }}>
            <FiSearch className="search-icon" />
            <input type="text" placeholder="Search user..." />
          </div>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Game Type</th>
                <th>Turnover</th>
                <th>Rebate</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
          <tbody>
            {rebateHistory.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td style={{ fontWeight: 600 }}>{item.user}</td>
                <td>{item.game}</td>
                <td>{item.turnover}</td>
                <td style={{ fontWeight: 600, color: '#16a34a' }}>{item.rebate}</td>
                <td>{item.date}</td>
                <td>
                  <span className={`badge ${item.status === 'Paid' ? 'badge-success' : 'badge-warning'}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Rebate;
