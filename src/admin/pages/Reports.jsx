import { useState, useEffect } from 'react';
import { FiTrendingUp, FiRefreshCw, FiDownload } from 'react-icons/fi';

const API_KEY = 'team33-admin-secret-key-2024';

const Reports = () => {
  const [displayMode, setDisplayMode] = useState('Daily');
  const [formData, setFormData] = useState({
    periodStart: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
    periodEnd: new Date().toISOString().split('T')[0], // Today
    type: 'All'
  });

  const [reportData, setReportData] = useState([]);
  const [totals, setTotals] = useState({
    depositCount: 0,
    depositTotal: '0.00',
    withdrawCount: 0,
    withdrawTotal: '0.00',
    net: '0.00'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch report data from API
  const fetchReportData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch all deposits and withdrawals
      const [depositsRes, withdrawalsRes] = await Promise.all([
        fetch('/api/admin/deposits/all', { headers: { 'X-API-Key': API_KEY } })
          .then(r => r.ok ? r.json() : [])
          .catch(() => []),
        fetch('/api/admin/withdrawals/all', { headers: { 'X-API-Key': API_KEY } })
          .then(r => r.ok ? r.json() : [])
          .catch(() => [])
      ]);

      // If /all endpoints don't exist, try fetching by status
      let deposits = Array.isArray(depositsRes) ? depositsRes : [];
      let withdrawals = Array.isArray(withdrawalsRes) ? withdrawalsRes : [];

      if (deposits.length === 0) {
        const [pending, completed] = await Promise.all([
          fetch('/api/admin/deposits/pending', { headers: { 'X-API-Key': API_KEY } })
            .then(r => r.ok ? r.json() : []).catch(() => []),
          fetch('/api/admin/deposits/status/COMPLETED', { headers: { 'X-API-Key': API_KEY } })
            .then(r => r.ok ? r.json() : []).catch(() => [])
        ]);
        deposits = [...(Array.isArray(pending) ? pending : []), ...(Array.isArray(completed) ? completed : [])];
      }

      if (withdrawals.length === 0) {
        const [pending, completed] = await Promise.all([
          fetch('/api/admin/withdrawals/pending', { headers: { 'X-API-Key': API_KEY } })
            .then(r => r.ok ? r.json() : []).catch(() => []),
          fetch('/api/admin/withdrawals/status/COMPLETED', { headers: { 'X-API-Key': API_KEY } })
            .then(r => r.ok ? r.json() : []).catch(() => [])
        ]);
        withdrawals = [...(Array.isArray(pending) ? pending : []), ...(Array.isArray(completed) ? completed : [])];
      }

      // Filter by date range
      const startDate = new Date(formData.periodStart);
      const endDate = new Date(formData.periodEnd);
      endDate.setHours(23, 59, 59, 999);

      deposits = deposits.filter(d => {
        const date = new Date(d.createdAt);
        return date >= startDate && date <= endDate;
      });

      withdrawals = withdrawals.filter(w => {
        const date = new Date(w.createdAt);
        return date >= startDate && date <= endDate;
      });

      // Filter by type if needed
      if (formData.type === 'Deposit') {
        withdrawals = [];
      } else if (formData.type === 'Withdraw') {
        deposits = [];
      }

      // Group by date based on display mode
      const groupedData = {};

      const getGroupKey = (dateStr) => {
        const date = new Date(dateStr);
        if (displayMode === 'Daily') {
          return date.toISOString().split('T')[0];
        } else if (displayMode === 'Monthly') {
          return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        } else {
          return `${date.getFullYear()}`;
        }
      };

      // Process deposits
      deposits.forEach(d => {
        const key = getGroupKey(d.createdAt);
        if (!groupedData[key]) {
          groupedData[key] = { depositCount: 0, depositTotal: 0, withdrawCount: 0, withdrawTotal: 0 };
        }
        // Only count completed deposits
        if (d.status === 'COMPLETED' || d.status === 'APPROVED') {
          groupedData[key].depositCount++;
          groupedData[key].depositTotal += parseFloat(d.amount) || 0;
        }
      });

      // Process withdrawals
      withdrawals.forEach(w => {
        const key = getGroupKey(w.createdAt);
        if (!groupedData[key]) {
          groupedData[key] = { depositCount: 0, depositTotal: 0, withdrawCount: 0, withdrawTotal: 0 };
        }
        // Only count completed withdrawals
        if (w.status === 'COMPLETED' || w.status === 'APPROVED') {
          groupedData[key].withdrawCount++;
          groupedData[key].withdrawTotal += parseFloat(w.amount) || 0;
        }
      });

      // Convert to array and sort by date (newest first)
      const reportArray = Object.entries(groupedData)
        .map(([date, data]) => ({
          date,
          depositCount: data.depositCount,
          depositTotal: data.depositTotal.toFixed(2),
          withdrawCount: data.withdrawCount,
          withdrawTotal: data.withdrawTotal.toFixed(2),
          net: (data.depositTotal - data.withdrawTotal).toFixed(2)
        }))
        .sort((a, b) => b.date.localeCompare(a.date));

      setReportData(reportArray);

      // Calculate totals
      const totalDeposits = reportArray.reduce((sum, row) => sum + parseFloat(row.depositTotal), 0);
      const totalWithdrawals = reportArray.reduce((sum, row) => sum + parseFloat(row.withdrawTotal), 0);

      setTotals({
        depositCount: reportArray.reduce((sum, row) => sum + row.depositCount, 0),
        depositTotal: totalDeposits.toFixed(2),
        withdrawCount: reportArray.reduce((sum, row) => sum + row.withdrawCount, 0),
        withdrawTotal: totalWithdrawals.toFixed(2),
        net: (totalDeposits - totalWithdrawals).toFixed(2)
      });

    } catch (err) {
      console.error('Error fetching report data:', err);
      setError('Failed to load report data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, []);

  // Handle recalculate
  const handleRecalculate = () => {
    fetchReportData();
  };

  // Export to CSV
  const handleExport = () => {
    if (reportData.length === 0) {
      alert('No data to export');
      return;
    }

    const headers = ['Date', 'Deposit Count', 'Deposit Total', 'Withdraw Count', 'Withdraw Total', 'Net'];
    const csvRows = [
      headers.join(','),
      ...reportData.map(row => [
        row.date,
        row.depositCount,
        row.depositTotal,
        row.withdrawCount,
        row.withdrawTotal,
        row.net
      ].join(',')),
      ['TOTAL', totals.depositCount, totals.depositTotal, totals.withdrawCount, totals.withdrawTotal, totals.net].join(',')
    ];

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transaction-report-${formData.periodStart}-to-${formData.periodEnd}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="content-inner">
      <div className="page-header">
        <h2 className="page-title">
          <FiTrendingUp style={{ marginRight: '10px' }} />
          Transaction Report
        </h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary btn-sm" onClick={handleExport}>
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
          <button className="btn btn-secondary" onClick={handleRecalculate} disabled={loading}>
            <FiRefreshCw className={loading ? 'spin' : ''} /> {loading ? 'Loading...' : 'Recalculate'}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="card" style={{ padding: '20px', background: '#fee', color: '#c00', marginBottom: '20px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Summary Stats */}
      <div className="quick-stats" style={{ marginBottom: '20px' }}>
        <div className="quick-stat">
          <span className="quick-stat-label">Total Deposits</span>
          <span className="quick-stat-value text-success">${totals.depositTotal}</span>
        </div>
        <div className="quick-stat">
          <span className="quick-stat-label">Total Withdrawals</span>
          <span className="quick-stat-value text-danger">${totals.withdrawTotal}</span>
        </div>
        <div className="quick-stat">
          <span className="quick-stat-label">Net Profit</span>
          <span className={`quick-stat-value ${parseFloat(totals.net) >= 0 ? 'text-success' : 'text-danger'}`}>
            ${totals.net}
          </span>
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
              {loading ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                    Loading report data...
                  </td>
                </tr>
              ) : reportData.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                    No transaction data found for this period
                  </td>
                </tr>
              ) : (
                <>
                  {reportData.map((row, index) => (
                    <tr key={index}>
                      <td><strong>{row.date}</strong></td>
                      <td>{row.depositCount}</td>
                      <td className="text-success">${row.depositTotal}</td>
                      <td>{row.withdrawCount}</td>
                      <td className="text-danger">${row.withdrawTotal}</td>
                      <td>
                        <strong className={parseFloat(row.net) >= 0 ? 'text-success' : 'text-danger'}>
                          ${row.net}
                        </strong>
                      </td>
                    </tr>
                  ))}
                  <tr style={{ background: '#f9fafb', fontWeight: '600' }}>
                    <td><strong>TOTAL</strong></td>
                    <td>{totals.depositCount}</td>
                    <td className="text-success">${totals.depositTotal}</td>
                    <td>{totals.withdrawCount}</td>
                    <td className="text-danger">${totals.withdrawTotal}</td>
                    <td>
                      <strong className={parseFloat(totals.net) >= 0 ? 'text-success' : 'text-danger'}>
                        ${totals.net}
                      </strong>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Reports;
