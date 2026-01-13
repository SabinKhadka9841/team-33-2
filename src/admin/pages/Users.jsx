import { useState } from 'react';
import { FiSearch, FiPlus, FiMessageSquare, FiCreditCard } from 'react-icons/fi';

const Users = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    agent: '',
    bank: '',
    status: 'ACTIVE'
  });

  const users = [
    { date: '2025-10-10 03:20', name: '35A831578', mobile: 'DemoUser', bankAccount: '-', bank: '-', referrer: 'J66_PRO_2', depositCount: 0, depositTotal: '0.00', withdrawCount: 0, withdrawTotal: '0.00', winLoss: '0.00', bonus: 0 },
    { date: '2025-07-28 05:52', name: 'HAHAHA', badge: 'HUNTER', mobile: 'ABC1234', bankAccount: '-', bank: '-', referrer: 'J66_PRO_2', depositCount: 0, depositTotal: '0.00', withdrawCount: 0, withdrawTotal: '0.00', winLoss: '0.00', bonus: 0 },
    { date: '2025-04-27 03:30', name: 'TIAN PU JIOA', mobile: '2AU252454', bankAccount: '048456516132', bank: 'MBB', referrer: 'TIAN PU JIOA', depositCount: 1, depositTotal: '200.00', withdrawCount: 0, withdrawTotal: '0.00', winLoss: '200.00', bonus: 1 },
    { date: '2025-04-08 07:02', name: 'TIAN PU JIOA', mobile: 'tian pu jioa', bankAccount: '0484565161', bank: 'MBB', referrer: 'J66_PRO_2', depositCount: 2, depositTotal: '80.00', withdrawCount: 0, withdrawTotal: '0.00', winLoss: '80.00', bonus: 0 },
    { date: '2025-03-06 13:55', name: 'SSASDASD', mobile: '60123456789', bankAccount: '88888888', bank: 'MBB', referrer: 'IT-SUPPORT', depositCount: 0, depositTotal: '0.00', withdrawCount: 0, withdrawTotal: '0.00', winLoss: '0.00', bonus: 0 },
    { date: '2025-01-21 17:09', name: 'DEMO', badge: 'HUNTER', mobile: '6012345675', bankAccount: '88888884', bank: 'CIMB', referrer: '-', depositCount: 3, depositTotal: '100.00', withdrawCount: 1, withdrawTotal: '-50.00', winLoss: '50.00', bonus: 1 },
    { date: '2024-07-08 05:18', name: 'KHAIRIE ELLIEA', mobile: '60192863267', bankAccount: '162200215879', bank: 'MBB', referrer: '-', depositCount: 3, depositTotal: '6,010.00', withdrawCount: 0, withdrawTotal: '0.00', winLoss: '6,010.00', bonus: 0 },
    { date: '2024-06-30 13:18', name: 'MUHAMAD SUHAIDI', mobile: '601119905336', bankAccount: '181933697380', bank: 'TNG', referrer: '-', depositCount: 3, depositTotal: '30.00', withdrawCount: 0, withdrawTotal: '0.00', winLoss: '30.00', bonus: 0 },
  ];

  return (
    <div className="content-inner">
      {/* Search Form */}
      <div className="filter-section">
        <div className="form-row">
          <span className="form-label">Name</span>
          <input
            type="text"
            className="form-input"
            placeholder="Search by name..."
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div className="form-row">
          <span className="form-label">Mobile No</span>
          <input
            type="text"
            className="form-input"
            placeholder="Search by mobile..."
            value={formData.mobile}
            onChange={(e) => setFormData({...formData, mobile: e.target.value})}
          />
        </div>
        <div className="form-row">
          <span className="form-label">Agent</span>
          <input
            type="text"
            className="form-input"
            placeholder="Search by agent..."
            value={formData.agent}
            onChange={(e) => setFormData({...formData, agent: e.target.value})}
          />
        </div>
        <div className="form-row">
          <span className="form-label">Bank</span>
          <select
            className="form-select"
            value={formData.bank}
            onChange={(e) => setFormData({...formData, bank: e.target.value})}
          >
            <option value="">All Banks</option>
            <option value="MBB">Maybank (MBB)</option>
            <option value="CIMB">CIMB</option>
            <option value="TNG">Touch n Go</option>
            <option value="RHB">RHB</option>
          </select>
        </div>
        <div className="form-row">
          <span className="form-label">Status</span>
          <select
            className="form-select"
            value={formData.status}
            onChange={(e) => setFormData({...formData, status: e.target.value})}
          >
            <option>ACTIVE</option>
            <option>INACTIVE</option>
            <option>SUSPENDED</option>
          </select>
        </div>

        <div className="action-bar" style={{ marginTop: '15px', marginBottom: 0 }}>
          <button className="btn btn-primary">
            <FiPlus /> Create User
          </button>
          <button className="btn-search-full" style={{ flex: 1, marginLeft: '10px' }}>
            <FiSearch style={{ marginRight: '6px' }} /> SEARCH
          </button>
        </div>
      </div>

      {/* Record Info */}
      <div className="action-bar">
        <div className="record-info">
          Showing {users.length} users
        </div>
        <a href="#" className="link-blue">ADVANCED +</a>
      </div>

      {/* Users Table */}
      <div className="card">
        <div className="table-wrapper">
          <table className="data-table users-table">
            <thead>
              <tr>
                <th>Register Date</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Bank Account</th>
                <th>Bank</th>
                <th>Referrer</th>
                <th>Action</th>
                <th>Deposit</th>
                <th>Withdraw</th>
                <th>Win/Loss</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td className="text-muted">{user.date}</td>
                  <td>
                    <strong>{user.name}</strong>
                    {user.badge && <span className="badge badge-warning" style={{ marginLeft: '6px' }}>{user.badge}</span>}
                  </td>
                  <td>{user.mobile}</td>
                  <td>{user.bankAccount}</td>
                  <td>
                    {user.bank !== '-' ? (
                      <span className="badge badge-info">{user.bank}</span>
                    ) : '-'}
                  </td>
                  <td className="text-muted">{user.referrer}</td>
                  <td>
                    <button className="btn btn-secondary btn-sm" style={{ marginRight: '4px' }}>
                      <FiMessageSquare />
                    </button>
                    <button className="btn btn-secondary btn-sm">
                      <FiCreditCard />
                    </button>
                  </td>
                  <td>
                    <span className="text-success">{user.depositCount}</span>
                    <span className="text-muted"> / </span>
                    <span className="text-success">{user.depositTotal}</span>
                  </td>
                  <td>
                    <span className="text-danger">{user.withdrawCount}</span>
                    <span className="text-muted"> / </span>
                    <span className="text-danger">{user.withdrawTotal}</span>
                  </td>
                  <td>
                    <strong className={parseFloat(user.winLoss.replace(',', '')) >= 0 ? 'text-success' : 'text-danger'}>
                      {user.winLoss}
                    </strong>
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

export default Users;
