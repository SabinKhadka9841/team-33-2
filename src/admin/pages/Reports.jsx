import { useState } from 'react';
import { FiTrendingUp, FiRefreshCw, FiDownload } from 'react-icons/fi';

const Reports = () => {
  const [displayMode, setDisplayMode] = useState('Daily');
  const [formData, setFormData] = useState({
    periodStart: '2026-01-01',
    periodEnd: '2026-01-31',
    type: 'All'
  });

  const reportData = [
    { date: '2026-01-07', depositCount: 15, depositTotal: '45,000.00', withdrawCount: 8, withdrawTotal: '25,000.00', net: '20,000.00' },
    { date: '2026-01-06', depositCount: 22, depositTotal: '68,500.00', withdrawCount: 12, withdrawTotal: '32,000.00', net: '36,500.00' },
    { date: '2026-01-05', depositCount: 18, depositTotal: '52,000.00', withdrawCount: 10, withdrawTotal: '28,000.00', net: '24,000.00' },
    { date: '2026-01-04', depositCount: 25, depositTotal: '78,000.00', withdrawCount: 15, withdrawTotal: '45,000.00', net: '33,000.00' },
    { date: '2026-01-03', depositCount: 20, depositTotal: '60,000.00', withdrawCount: 11, withdrawTotal: '35,000.00', net: '25,000.00' },
  ];

  const totals = {
    depositCount: reportData.reduce((sum, row) => sum + row.depositCount, 0),
    depositTotal: '303,500.00',
    withdrawCount: reportData.reduce((sum, row) => sum + row.withdrawCount, 0),
    withdrawTotal: '165,000.00',
    net: '138,500.00'
  };

  return (
    <div className="content-inner">
      <div className="page-header">
        <h2 className="page-title">
          <FiTrendingUp style={{ marginRight: '10px' }} />
          Transaction Report
        </h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary btn-sm">
            <FiDownload /> Export
          </button>
        </div>
      </div>

      {/* Filter Form */}
      <div className="filter-section">
        <div className="form-row">
          <span className="form-label">Period</span>
          <div className="form-input-group">
            <input
              type="date"
              className="form-input"
              value={formData.periodStart}
              onChange={(e) => setFormData({...formData, periodStart: e.target.value})}
            />
            <input
              type="date"
              className="form-input"
              value={formData.periodEnd}
              onChange={(e) => setFormData({...formData, periodEnd: e.target.value})}
            />
          </div>
        </div>

        <div className="form-row">
          <span className="form-label">Display</span>
          <div className="btn-group">
            {['Daily', 'Monthly', 'Yearly'].map((mode) => (
              <button
                key={mode}
                className={`btn-toggle ${displayMode === mode ? 'active' : ''}`}
                onClick={() => setDisplayMode(mode)}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div className="form-row">
          <span className="form-label">Type</span>
          <select
            className="form-select"
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
          >
            <option>All</option>
            <option>Deposit</option>
            <option>Withdraw</option>
          </select>
        </div>

        <div className="action-bar" style={{ marginTop: '15px', marginBottom: 0 }}>
          <button className="btn btn-secondary">
            <FiRefreshCw /> Recalculate
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="quick-stats" style={{ marginBottom: '20px' }}>
        <div className="quick-stat">
          <span className="quick-stat-label">Total Deposits</span>
          <span className="quick-stat-value text-success">{totals.depositTotal}</span>
        </div>
        <div className="quick-stat">
          <span className="quick-stat-label">Total Withdrawals</span>
          <span className="quick-stat-value text-danger">{totals.withdrawTotal}</span>
        </div>
        <div className="quick-stat">
          <span className="quick-stat-label">Net Profit</span>
          <span className="quick-stat-value text-success">{totals.net}</span>
        </div>
      </div>

      {/* Report Table */}
      <div className="card">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Deposit Count</th>
                <th>Deposit Total</th>
                <th>Withdraw Count</th>
                <th>Withdraw Total</th>
                <th>Net</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((row, index) => (
                <tr key={index}>
                  <td><strong>{row.date}</strong></td>
                  <td>{row.depositCount}</td>
                  <td className="text-success">{row.depositTotal}</td>
                  <td>{row.withdrawCount}</td>
                  <td className="text-danger">{row.withdrawTotal}</td>
                  <td><strong className="text-success">{row.net}</strong></td>
                </tr>
              ))}
              <tr style={{ background: '#f9fafb', fontWeight: '600' }}>
                <td><strong>TOTAL</strong></td>
                <td>{totals.depositCount}</td>
                <td className="text-success">{totals.depositTotal}</td>
                <td>{totals.withdrawCount}</td>
                <td className="text-danger">{totals.withdrawTotal}</td>
                <td><strong className="text-success">{totals.net}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
