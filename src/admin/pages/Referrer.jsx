import { FiSearch, FiUsers, FiDollarSign, FiUserPlus } from 'react-icons/fi';

const Referrer = () => {
  const referrers = [
    { id: 1, username: 'agent001', referrals: 45, totalDeposit: '฿250,000', commission: '฿12,500', status: 'Active', level: 'Gold' },
    { id: 2, username: 'agent002', referrals: 32, totalDeposit: '฿180,000', commission: '฿9,000', status: 'Active', level: 'Silver' },
    { id: 3, username: 'agent003', referrals: 28, totalDeposit: '฿150,000', commission: '฿7,500', status: 'Active', level: 'Silver' },
    { id: 4, username: 'agent004', referrals: 15, totalDeposit: '฿80,000', commission: '฿4,000', status: 'Inactive', level: 'Bronze' },
    { id: 5, username: 'agent005', referrals: 67, totalDeposit: '฿500,000', commission: '฿25,000', status: 'Active', level: 'Diamond' },
    { id: 6, username: 'agent006', referrals: 22, totalDeposit: '฿120,000', commission: '฿6,000', status: 'Active', level: 'Bronze' },
  ];

  const stats = [
    { icon: <FiUsers />, label: 'Total Referrers', value: '156', color: 'blue' },
    { icon: <FiUserPlus />, label: 'Total Referrals', value: '2,458', color: 'green' },
    { icon: <FiDollarSign />, label: 'Total Commission Paid', value: '฿450,000', color: 'gold' },
  ];

  return (
    <div className="referrer-page">
      <div className="page-header">
        <h1 className="page-title">Referrer Management</h1>
        <button className="btn btn-primary">
          <FiUserPlus /> Add Referrer
        </button>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ marginBottom: '20px' }}>
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className={`stat-icon ${stat.color}`}>{stat.icon}</div>
            <div className="stat-info">
              <h4>{stat.label}</h4>
              <p>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="filters-row">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input type="text" placeholder="Search referrer..." />
          </div>
          <div className="filter-group">
            <label>Status:</label>
            <select>
              <option>All</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Level:</label>
            <select>
              <option>All</option>
              <option>Diamond</option>
              <option>Gold</option>
              <option>Silver</option>
              <option>Bronze</option>
            </select>
          </div>
          <button className="btn btn-secondary">Search</button>
        </div>
      </div>

      {/* Referrers Table */}
      <div className="card">
        <div className="table-wrapper">
          <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Level</th>
              <th>Referrals</th>
              <th>Total Deposit</th>
              <th>Commission Earned</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {referrers.map((ref) => (
              <tr key={ref.id}>
                <td>{ref.id}</td>
                <td style={{ fontWeight: 600 }}>{ref.username}</td>
                <td>
                  <span className={`badge ${
                    ref.level === 'Diamond' ? 'badge-info' :
                    ref.level === 'Gold' ? 'badge-warning' :
                    ref.level === 'Silver' ? 'badge-secondary' : 'badge-success'
                  }`} style={ref.level === 'Silver' ? { background: '#e5e7eb', color: '#374151' } : {}}>
                    {ref.level}
                  </span>
                </td>
                <td>{ref.referrals}</td>
                <td>{ref.totalDeposit}</td>
                <td style={{ fontWeight: 600, color: '#16a34a' }}>{ref.commission}</td>
                <td>
                  <span className={`badge ${ref.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                    {ref.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>
                    View Details
                  </button>
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

export default Referrer;
