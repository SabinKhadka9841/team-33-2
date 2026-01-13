import { useState } from 'react';
import { FiSave, FiImage, FiType, FiLayout, FiToggleRight, FiToggleLeft } from 'react-icons/fi';

const Display = () => {
  const [banners, setBanners] = useState([
    { id: 1, title: 'Welcome Bonus', position: 'Homepage Slider', status: true, order: 1 },
    { id: 2, title: 'Daily Reload', position: 'Homepage Slider', status: true, order: 2 },
    { id: 3, title: 'VIP Program', position: 'Homepage Slider', status: true, order: 3 },
    { id: 4, title: 'Sports Promo', position: 'Sports Page', status: true, order: 1 },
    { id: 5, title: 'Live Casino', position: 'Live Casino Page', status: false, order: 1 },
  ]);

  const [popups, setPopups] = useState([
    { id: 1, title: 'New Year Promotion', trigger: 'On Login', status: true },
    { id: 2, title: 'Maintenance Notice', trigger: 'Always', status: false },
    { id: 3, title: 'Welcome Popup', trigger: 'First Visit', status: true },
  ]);

  const toggleBanner = (id) => {
    setBanners(banners.map(b => b.id === id ? { ...b, status: !b.status } : b));
  };

  const togglePopup = (id) => {
    setPopups(popups.map(p => p.id === id ? { ...p, status: !p.status } : p));
  };

  return (
    <div className="display-page">
      <div className="page-header">
        <h1 className="page-title">Display Settings</h1>
        <button className="btn btn-primary">
          <FiSave /> Save Changes
        </button>
      </div>

      {/* Banner Management */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="card-header">
          <h3 className="card-title">
            <FiImage style={{ marginRight: '10px' }} />
            Banner Management
          </h3>
          <button className="btn btn-secondary" style={{ padding: '8px 16px' }}>
            + Add Banner
          </button>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Title</th>
                <th>Position</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {banners.map((banner) => (
              <tr key={banner.id}>
                <td>
                  <input
                    type="number"
                    value={banner.order}
                    style={{ width: '50px', padding: '5px', border: '1px solid #e5e7eb', borderRadius: '4px' }}
                  />
                </td>
                <td style={{ fontWeight: 600 }}>{banner.title}</td>
                <td>
                  <span className="badge badge-info">{banner.position}</span>
                </td>
                <td>
                  <button
                    onClick={() => toggleBanner(banner.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: banner.status ? '#16a34a' : '#dc2626',
                      fontSize: '24px'
                    }}
                  >
                    {banner.status ? <FiToggleRight /> : <FiToggleLeft />}
                  </button>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>Edit</button>
                    <button className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '12px' }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popup Management */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="card-header">
          <h3 className="card-title">
            <FiLayout style={{ marginRight: '10px' }} />
            Popup Management
          </h3>
          <button className="btn btn-secondary" style={{ padding: '8px 16px' }}>
            + Add Popup
          </button>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Trigger</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {popups.map((popup) => (
              <tr key={popup.id}>
                <td style={{ fontWeight: 600 }}>{popup.title}</td>
                <td>
                  <span className="badge badge-warning">{popup.trigger}</span>
                </td>
                <td>
                  <button
                    onClick={() => togglePopup(popup.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: popup.status ? '#16a34a' : '#dc2626',
                      fontSize: '24px'
                    }}
                  >
                    {popup.status ? <FiToggleRight /> : <FiToggleLeft />}
                  </button>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>Edit</button>
                    <button className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '12px' }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Announcement Settings */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <FiType style={{ marginRight: '10px' }} />
            Marquee Announcement
          </h3>
        </div>
        <div className="card-body">
          <div className="form-group">
          <label className="form-label">Announcement Text</label>
          <textarea
            className="form-input"
            rows="3"
            placeholder="Enter scrolling announcement text..."
            defaultValue="Welcome to J66! New members get 100% bonus on first deposit. Play responsibly."
            style={{ resize: 'vertical' }}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '15px' }}>
          <div className="form-group">
            <label className="form-label">Scroll Speed</label>
            <select className="form-select">
              <option value="slow">Slow</option>
              <option value="normal">Normal</option>
              <option value="fast">Fast</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Text Color</label>
            <input type="color" defaultValue="#d4af37" style={{ width: '100%', height: '40px', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
          </div>
          <div className="form-group">
            <label className="form-label">Display</label>
            <select className="form-select">
              <option value="on">Enabled</option>
              <option value="off">Disabled</option>
            </select>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display;
