import { useState } from 'react';
import { FiSave, FiPercent, FiDollarSign } from 'react-icons/fi';

const Commission = () => {
  const [settings, setSettings] = useState({
    level1: 5,
    level2: 3,
    level3: 1,
    minPayout: 500,
    payoutDay: 'Monday'
  });

  const commissionHistory = [
    { id: 1, agent: 'agent001', level: 'Level 1', amount: '฿2,500', fromUser: 'player015', date: '2024-01-15', status: 'Paid' },
    { id: 2, agent: 'agent002', level: 'Level 1', amount: '฿1,800', fromUser: 'player022', date: '2024-01-15', status: 'Paid' },
    { id: 3, agent: 'agent001', level: 'Level 2', amount: '฿500', fromUser: 'player018', date: '2024-01-14', status: 'Paid' },
    { id: 4, agent: 'agent003', level: 'Level 1', amount: '฿3,200', fromUser: 'player031', date: '2024-01-14', status: 'Pending' },
    { id: 5, agent: 'agent005', level: 'Level 1', amount: '฿5,000', fromUser: 'player045', date: '2024-01-13', status: 'Paid' },
  ];

  return (
    <div className="commission-page">
      <div className="page-header">
        <h1 className="page-title">Commission Settings</h1>
      </div>

      {/* Commission Rate Settings */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="card-header">
          <h3 className="card-title">Commission Rates</h3>
        </div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label">
                <FiPercent style={{ marginRight: '5px' }} />
                Level 1 Commission (%)
            </label>
            <input
              type="number"
              className="form-input"
              value={settings.level1}
              onChange={(e) => setSettings({ ...settings, level1: e.target.value })}
              step="0.5"
            />
            <small style={{ color: '#6b7280', fontSize: '12px' }}>Direct referral commission</small>
          </div>
          <div className="form-group">
            <label className="form-label">
              <FiPercent style={{ marginRight: '5px' }} />
              Level 2 Commission (%)
            </label>
            <input
              type="number"
              className="form-input"
              value={settings.level2}
              onChange={(e) => setSettings({ ...settings, level2: e.target.value })}
              step="0.5"
            />
            <small style={{ color: '#6b7280', fontSize: '12px' }}>2nd level referral</small>
          </div>
          <div className="form-group">
            <label className="form-label">
              <FiPercent style={{ marginRight: '5px' }} />
              Level 3 Commission (%)
            </label>
            <input
              type="number"
              className="form-input"
              value={settings.level3}
              onChange={(e) => setSettings({ ...settings, level3: e.target.value })}
              step="0.5"
            />
            <small style={{ color: '#6b7280', fontSize: '12px' }}>3rd level referral</small>
          </div>
          <div className="form-group">
            <label className="form-label">
              <FiDollarSign style={{ marginRight: '5px' }} />
              Minimum Payout (฿)
            </label>
            <input
              type="number"
              className="form-input"
              value={settings.minPayout}
              onChange={(e) => setSettings({ ...settings, minPayout: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Payout Day</label>
            <select
              className="form-select"
              value={settings.payoutDay}
              onChange={(e) => setSettings({ ...settings, payoutDay: e.target.value })}
            >
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
              <option>Sunday</option>
              </select>
            </div>
          </div>
          <div style={{ marginTop: '20px' }}>
            <button className="btn btn-primary">
              <FiSave /> Save Settings
            </button>
          </div>
        </div>
      </div>

      {/* Commission History */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Commission History</h3>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Agent</th>
              <th>Level</th>
              <th>From User</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {commissionHistory.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td style={{ fontWeight: 600 }}>{item.agent}</td>
                <td>
                  <span className={`badge ${
                    item.level === 'Level 1' ? 'badge-success' :
                    item.level === 'Level 2' ? 'badge-info' : 'badge-warning'
                  }`}>
                    {item.level}
                  </span>
                </td>
                <td>{item.fromUser}</td>
                <td style={{ fontWeight: 600, color: '#16a34a' }}>{item.amount}</td>
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

export default Commission;
