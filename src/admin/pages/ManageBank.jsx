import { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiToggleLeft, FiToggleRight } from 'react-icons/fi';

const ManageBank = () => {
  const [banks, setBanks] = useState([
    { id: 1, bankName: 'Bangkok Bank', accountName: 'J66 Company Ltd', accountNumber: '123-4-56789-0', type: 'Deposit', status: true, balance: '฿1,250,000' },
    { id: 2, bankName: 'Kasikorn Bank', accountName: 'J66 Company Ltd', accountNumber: '098-7-65432-1', type: 'Deposit', status: true, balance: '฿890,000' },
    { id: 3, bankName: 'SCB', accountName: 'J66 Company Ltd', accountNumber: '456-7-89012-3', type: 'Withdrawal', status: true, balance: '฿2,100,000' },
    { id: 4, bankName: 'Krungthai Bank', accountName: 'J66 Company Ltd', accountNumber: '789-0-12345-6', type: 'Withdrawal', status: false, balance: '฿0' },
    { id: 5, bankName: 'TrueMoney Wallet', accountName: 'J66 Official', accountNumber: '09x-xxx-1234', type: 'Both', status: true, balance: '฿450,000' },
  ]);

  const toggleStatus = (id) => {
    setBanks(banks.map(bank =>
      bank.id === id ? { ...bank, status: !bank.status } : bank
    ));
  };

  return (
    <div className="manage-bank-page">
      <div className="page-header">
        <h1 className="page-title">Manage Bank Accounts</h1>
        <button className="btn btn-primary">
          <FiPlus /> Add Bank Account
        </button>
      </div>

      {/* Bank Stats */}
      <div className="stats-grid" style={{ marginBottom: '20px' }}>
        <div className="stat-card">
          <div className="stat-icon green">฿</div>
          <div className="stat-info">
            <h4>Total Deposit Balance</h4>
            <p>฿2,140,000</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">฿</div>
          <div className="stat-info">
            <h4>Total Withdrawal Balance</h4>
            <p>฿2,100,000</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue">#</div>
          <div className="stat-info">
            <h4>Active Accounts</h4>
            <p>4</p>
          </div>
        </div>
      </div>

      {/* Bank Accounts Table */}
      <div className="card">
        <div className="table-wrapper">
          <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Bank Name</th>
              <th>Account Name</th>
              <th>Account Number</th>
              <th>Type</th>
              <th>Balance</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {banks.map((bank) => (
              <tr key={bank.id}>
                <td>{bank.id}</td>
                <td style={{ fontWeight: 600 }}>{bank.bankName}</td>
                <td>{bank.accountName}</td>
                <td style={{ fontFamily: 'monospace' }}>{bank.accountNumber}</td>
                <td>
                  <span className={`badge ${
                    bank.type === 'Deposit' ? 'badge-success' :
                    bank.type === 'Withdrawal' ? 'badge-warning' : 'badge-info'
                  }`}>
                    {bank.type}
                  </span>
                </td>
                <td style={{ fontWeight: 600 }}>{bank.balance}</td>
                <td>
                  <button
                    onClick={() => toggleStatus(bank.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: bank.status ? '#16a34a' : '#dc2626',
                      fontSize: '24px'
                    }}
                  >
                    {bank.status ? <FiToggleRight /> : <FiToggleLeft />}
                  </button>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '5px' }}>
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
      </div>

      {/* Instructions */}
      <div className="card" style={{ marginTop: '20px' }}>
        <div className="card-header">
          <h3 className="card-title">Bank Account Guidelines</h3>
        </div>
        <div className="card-body">
          <ul style={{ color: '#4b5563', fontSize: '14px', lineHeight: '1.8', paddingLeft: '20px', margin: 0 }}>
          <li>Deposit accounts are used to receive customer deposits</li>
          <li>Withdrawal accounts are used to process customer withdrawals</li>
          <li>Always maintain sufficient balance in withdrawal accounts</li>
          <li>Inactive accounts will not be shown to customers</li>
          <li>TrueMoney and PromptPay can be used for both deposit and withdrawal</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManageBank;
