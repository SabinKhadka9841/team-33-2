import { useState } from 'react';
import { FiSearch, FiFile, FiAlertTriangle, FiPlus } from 'react-icons/fi';

const BankTx = () => {
  const [selectedDate, setSelectedDate] = useState('2026-01-07');
  const [selectedBank, setSelectedBank] = useState('MBB');
  const [searchQuery, setSearchQuery] = useState('');

  const banks = [
    { id: 'MBB', name: 'MBB (NCD MINI MARKET)', balance: '500.00' },
    { id: 'HSB', name: 'HSB (Richard soon)', balance: '1,200.00' },
    { id: 'RHB', name: 'RHB (Richard soon)', balance: '850.00' },
    { id: 'CIMB', name: 'CIMB (Richard soon)', balance: '2,100.00' },
  ];

  const transactions = [
    { no: 1, description: 'Customer Deposit - john_doe', inAmount: '500.00', outAmount: '', time: '14:30:00', id: 'TXN001', match: 'Y', fee: '0.00', remarks: 'Auto matched', info: '' },
    { no: 2, description: 'Customer Withdrawal - jane_smith', inAmount: '', outAmount: '200.00', time: '14:25:00', id: 'TXN002', match: 'Y', fee: '0.00', remarks: '', info: '' },
    { no: 3, description: 'Customer Deposit - mike_wong', inAmount: '1,000.00', outAmount: '', time: '14:20:00', id: 'TXN003', match: 'Y', fee: '0.00', remarks: 'VIP', info: '' },
  ];

  const selectedBankData = banks.find(b => b.id === selectedBank);

  return (
    <div className="content-inner">
      {/* Top Controls */}
      <div className="filter-section">
        <div className="action-bar" style={{ marginBottom: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="date"
              className="form-input"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{ width: 'auto' }}
            />
            <button className="btn btn-secondary btn-sm">
              <FiFile />
            </button>
            <button className="btn btn-danger btn-sm">
              <FiAlertTriangle />
            </button>
            <select className="form-select" style={{ width: 'auto' }}>
              <option>All Types</option>
              <option>Deposit</option>
              <option>Withdrawal</option>
            </select>
            <select className="form-select" style={{ width: 'auto' }}>
              <option>All Status</option>
              <option>Matched</option>
              <option>Unmatched</option>
            </select>
          </div>
          <div style={{ flex: 1, marginLeft: '10px' }}>
            <input
              type="text"
              className="form-input"
              placeholder="Search Description / ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Bank Tabs */}
        <div className="bank-tabs">
          {banks.map((bank) => (
            <button
              key={bank.id}
              className={`bank-tab ${selectedBank === bank.id ? 'active' : ''}`}
              onClick={() => setSelectedBank(bank.id)}
            >
              {bank.name}
            </button>
          ))}
        </div>
      </div>

      {/* Balance Summary */}
      <div className="quick-stats" style={{ marginBottom: '20px' }}>
        <div className="quick-stat">
          <span className="quick-stat-label">START</span>
          <span className="quick-stat-value">500.00</span>
        </div>
        <div className="quick-stat">
          <span className="quick-stat-label">IN TODAY</span>
          <span className="quick-stat-value text-success">+1,500.00</span>
        </div>
        <div className="quick-stat">
          <span className="quick-stat-label">OUT TODAY</span>
          <span className="quick-stat-value text-danger">-200.00</span>
        </div>
        <div className="quick-stat">
          <span className="quick-stat-label">BALANCE</span>
          <span className="quick-stat-value">{selectedBankData?.balance || '0.00'}</span>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Bank Transactions - {selectedBankData?.name}</h3>
          <button className="btn btn-primary btn-sm">
            <FiPlus /> Add Entry
          </button>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Description</th>
                <th>In</th>
                <th>Out</th>
                <th>Time</th>
                <th>ID</th>
                <th>Match</th>
                <th>Fee</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, index) => (
                <tr key={index}>
                  <td>{tx.no}</td>
                  <td><strong>{tx.description}</strong></td>
                  <td className="text-success">{tx.inAmount || '-'}</td>
                  <td className="text-danger">{tx.outAmount || '-'}</td>
                  <td className="text-muted">{tx.time}</td>
                  <td><span className="badge badge-info">{tx.id}</span></td>
                  <td>
                    {tx.match === 'Y' ? (
                      <span className="badge badge-success">Matched</span>
                    ) : (
                      <span className="badge badge-warning">Pending</span>
                    )}
                  </td>
                  <td>{tx.fee}</td>
                  <td className="text-muted">{tx.remarks}</td>
                </tr>
              ))}
              <tr style={{ background: '#f9fafb', fontWeight: '600' }}>
                <td colSpan="2"><strong>TOTAL</strong></td>
                <td className="text-success">1,500.00</td>
                <td className="text-danger">200.00</td>
                <td></td>
                <td></td>
                <td></td>
                <td>0.00</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BankTx;
