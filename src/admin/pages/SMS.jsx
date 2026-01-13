import { useState } from 'react';
import { FiSend, FiUsers, FiMessageCircle, FiClock } from 'react-icons/fi';

const SMS = () => {
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('all');

  const smsHistory = [
    { id: 1, recipient: 'All Members', message: 'New promotion! Get 100% bonus on your first deposit...', sent: 12458, delivered: 12320, date: '2024-01-15 10:00' },
    { id: 2, recipient: 'VIP Members', message: 'Exclusive VIP offer! Free spins waiting for you...', sent: 458, delivered: 455, date: '2024-01-14 14:30' },
    { id: 3, recipient: 'Inactive Users', message: 'We miss you! Come back and get 50% bonus...', sent: 3250, delivered: 3100, date: '2024-01-13 09:00' },
    { id: 4, recipient: 'All Members', message: 'Maintenance notice: System will be down...', sent: 12458, delivered: 12400, date: '2024-01-12 18:00' },
    { id: 5, recipient: 'New Members', message: 'Welcome bonus activated! Claim now...', sent: 145, delivered: 143, date: '2024-01-11 11:00' },
  ];

  const templates = [
    { id: 1, name: 'Welcome Message', content: 'Welcome to J66! Your account has been created successfully.' },
    { id: 2, name: 'Deposit Confirmation', content: 'Your deposit of {amount} has been received. Thank you!' },
    { id: 3, name: 'Withdrawal Confirmation', content: 'Your withdrawal of {amount} has been processed.' },
    { id: 4, name: 'Promotion Alert', content: 'New promotion available! {promo_details}' },
  ];

  return (
    <div className="sms-page">
      <div className="page-header">
        <h1 className="page-title">SMS Management</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        {/* Send SMS */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <FiMessageCircle style={{ marginRight: '8px' }} />
              Send SMS
            </h3>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label className="form-label">Recipients</label>
            <select
              className="form-select"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            >
              <option value="all">All Members</option>
              <option value="vip">VIP Members Only</option>
              <option value="active">Active Members</option>
              <option value="inactive">Inactive Members</option>
              <option value="new">New Members (Last 7 days)</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Template (Optional)</label>
            <select className="form-select">
              <option value="">-- Select Template --</option>
              {templates.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea
              className="form-input"
              rows="5"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ resize: 'vertical' }}
            />
            <small style={{ color: '#6b7280', fontSize: '12px' }}>
              {message.length}/160 characters
            </small>
          </div>
            <button className="btn btn-primary" style={{ width: '100%', marginTop: '15px' }}>
              <FiSend /> Send SMS
            </button>
          </div>
        </div>

        {/* SMS Stats */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">SMS Statistics</h3>
          </div>
          <div className="card-body">
            <div style={{ display: 'grid', gap: '15px' }}>
            <div className="stat-card">
              <div className="stat-icon blue"><FiSend /></div>
              <div className="stat-info">
                <h4>Total Sent Today</h4>
                <p>1,245</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon green"><FiMessageCircle /></div>
              <div className="stat-info">
                <h4>Delivered</h4>
                <p>1,230</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon orange"><FiClock /></div>
              <div className="stat-info">
                <h4>Pending</h4>
                <p>15</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon gold"><FiUsers /></div>
              <div className="stat-info">
                <h4>Credits Remaining</h4>
                <p>48,755</p>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* SMS History */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">SMS History</h3>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Recipients</th>
              <th>Message</th>
              <th>Sent</th>
              <th>Delivered</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {smsHistory.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <span className="badge badge-info">{item.recipient}</span>
                </td>
                <td style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.message}
                </td>
                <td>{item.sent.toLocaleString()}</td>
                <td style={{ color: '#16a34a' }}>{item.delivered.toLocaleString()}</td>
                <td style={{ color: '#6b7280' }}>{item.date}</td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SMS;
