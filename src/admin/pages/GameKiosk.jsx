import { useState } from 'react';
import { FiSearch, FiRefreshCw, FiPlay, FiPause, FiDollarSign } from 'react-icons/fi';

const GameKiosk = () => {
  const providers = [
    { id: 1, name: 'PG Soft', games: 120, status: 'Active', balance: '฿2.5M', lastSync: '2 min ago' },
    { id: 2, name: 'Pragmatic Play', games: 250, status: 'Active', balance: '฿1.8M', lastSync: '5 min ago' },
    { id: 3, name: 'Evolution', games: 45, status: 'Active', balance: '฿3.2M', lastSync: '1 min ago' },
    { id: 4, name: 'Joker Gaming', games: 180, status: 'Active', balance: '฿900K', lastSync: '3 min ago' },
    { id: 5, name: 'SA Gaming', games: 35, status: 'Maintenance', balance: '฿1.5M', lastSync: '1 hour ago' },
    { id: 6, name: 'Sexy Baccarat', games: 20, status: 'Active', balance: '฿2.1M', lastSync: '2 min ago' },
    { id: 7, name: 'JILI', games: 95, status: 'Active', balance: '฿750K', lastSync: '4 min ago' },
    { id: 8, name: 'CQ9', games: 150, status: 'Active', balance: '฿500K', lastSync: '6 min ago' },
  ];

  const recentPlays = [
    { user: 'player001', game: 'Sweet Bonanza', provider: 'Pragmatic Play', bet: '฿500', win: '฿2,500', time: '1 min ago' },
    { user: 'player025', game: 'Fortune Tiger', provider: 'PG Soft', bet: '฿1,000', win: '฿0', time: '2 min ago' },
    { user: 'player108', game: 'Baccarat', provider: 'Evolution', bet: '฿5,000', win: '฿10,000', time: '3 min ago' },
    { user: 'player042', game: 'Roma X', provider: 'Joker', bet: '฿200', win: '฿800', time: '4 min ago' },
    { user: 'player089', game: 'Gates of Olympus', provider: 'Pragmatic Play', bet: '฿2,000', win: '฿15,000', time: '5 min ago' },
  ];

  return (
    <div className="game-kiosk-page">
      <div className="page-header">
        <h1 className="page-title">Game Kiosk</h1>
        <button className="btn btn-primary">
          <FiRefreshCw /> Sync All Providers
        </button>
      </div>

      {/* Provider Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px', marginBottom: '20px' }}>
        {providers.map((provider) => (
          <div key={provider.id} className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1f2937', marginBottom: '5px' }}>{provider.name}</h3>
                <span className={`badge ${provider.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
                  {provider.status}
                </span>
              </div>
              <button style={{
                background: provider.status === 'Active' ? '#dcfce7' : '#fee2e2',
                border: 'none',
                borderRadius: '8px',
                padding: '8px',
                color: provider.status === 'Active' ? '#16a34a' : '#dc2626',
                cursor: 'pointer'
              }}>
                {provider.status === 'Active' ? <FiPlay /> : <FiPause />}
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>Games</p>
                <p style={{ fontSize: '18px', fontWeight: 600, color: '#1f2937' }}>{provider.games}</p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>Balance</p>
                <p style={{ fontSize: '18px', fontWeight: 600, color: '#16a34a' }}>{provider.balance}</p>
              </div>
            </div>
            <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #e5e7eb' }}>
              <p style={{ fontSize: '12px', color: '#9ca3af' }}>Last sync: {provider.lastSync}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Plays */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Recent Game Activity</h3>
          <div className="search-box" style={{ width: '250px' }}>
            <FiSearch className="search-icon" />
            <input type="text" placeholder="Search player..." />
          </div>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Player</th>
                <th>Game</th>
                <th>Provider</th>
                <th>Bet</th>
                <th>Win</th>
                <th>Result</th>
                <th>Time</th>
              </tr>
            </thead>
          <tbody>
            {recentPlays.map((play, index) => (
              <tr key={index}>
                <td style={{ fontWeight: 600 }}>{play.user}</td>
                <td>{play.game}</td>
                <td>{play.provider}</td>
                <td>{play.bet}</td>
                <td style={{ fontWeight: 600, color: play.win !== '฿0' ? '#16a34a' : '#dc2626' }}>{play.win}</td>
                <td>
                  <span className={`badge ${play.win !== '฿0' ? 'badge-success' : 'badge-danger'}`}>
                    {play.win !== '฿0' ? 'Win' : 'Loss'}
                  </span>
                </td>
                <td style={{ color: '#6b7280' }}>{play.time}</td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GameKiosk;
