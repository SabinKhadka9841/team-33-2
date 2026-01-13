import { useState } from 'react';
import { FiSave, FiGlobe, FiDollarSign, FiClock, FiShield, FiMail } from 'react-icons/fi';

const Setting = () => {
  const [settings, setSettings] = useState({
    siteName: 'J66',
    siteUrl: 'https://j66.com',
    currency: 'THB',
    timezone: 'Asia/Bangkok',
    minDeposit: 100,
    maxDeposit: 500000,
    minWithdraw: 300,
    maxWithdraw: 100000,
    withdrawFee: 0,
    dailyWithdrawLimit: 500000,
    supportEmail: 'support@j66.com',
    supportPhone: '+66 2-xxx-xxxx',
    lineId: '@j66official',
    maintenanceMode: false
  });

  return (
    <div className="setting-page">
      <div className="page-header">
        <h1 className="page-title">System Settings</h1>
        <button className="btn btn-primary">
          <FiSave /> Save Changes
        </button>
      </div>

      {/* General Settings */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="card-header">
          <h3 className="card-title">
            <FiGlobe style={{ marginRight: '10px' }} />
            General Settings
          </h3>
        </div>
        <div className="card-body">
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Site Name</label>
              <input
                type="text"
                className="form-input"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Site URL</label>
              <input
                type="text"
                className="form-input"
                value={settings.siteUrl}
                onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Currency</label>
              <select
                className="form-select"
                value={settings.currency}
                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
              >
                <option value="THB">Thai Baht (฿)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="EUR">Euro (€)</option>
                <option value="MYR">Malaysian Ringgit (RM)</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">
                <FiClock style={{ marginRight: '5px' }} />
                Timezone
              </label>
              <select
                className="form-select"
                value={settings.timezone}
                onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
              >
                <option value="Asia/Bangkok">Asia/Bangkok (UTC+7)</option>
                <option value="Asia/Singapore">Asia/Singapore (UTC+8)</option>
                <option value="Asia/Hong_Kong">Asia/Hong Kong (UTC+8)</option>
                <option value="Asia/Kuala_Lumpur">Asia/Kuala Lumpur (UTC+8)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Settings */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="card-header">
          <h3 className="card-title">
            <FiDollarSign style={{ marginRight: '10px' }} />
            Financial Settings
          </h3>
        </div>
        <div className="card-body">
          <div className="grid-3">
            <div className="form-group">
              <label className="form-label">Minimum Deposit (฿)</label>
              <input
                type="number"
                className="form-input"
                value={settings.minDeposit}
                onChange={(e) => setSettings({ ...settings, minDeposit: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Maximum Deposit (฿)</label>
              <input
                type="number"
                className="form-input"
                value={settings.maxDeposit}
                onChange={(e) => setSettings({ ...settings, maxDeposit: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Minimum Withdrawal (฿)</label>
              <input
                type="number"
                className="form-input"
                value={settings.minWithdraw}
                onChange={(e) => setSettings({ ...settings, minWithdraw: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Maximum Withdrawal (฿)</label>
              <input
                type="number"
                className="form-input"
                value={settings.maxWithdraw}
                onChange={(e) => setSettings({ ...settings, maxWithdraw: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Withdrawal Fee (฿)</label>
              <input
                type="number"
                className="form-input"
                value={settings.withdrawFee}
                onChange={(e) => setSettings({ ...settings, withdrawFee: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Daily Withdrawal Limit (฿)</label>
              <input
                type="number"
                className="form-input"
                value={settings.dailyWithdrawLimit}
                onChange={(e) => setSettings({ ...settings, dailyWithdrawLimit: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Settings */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="card-header">
          <h3 className="card-title">
            <FiMail style={{ marginRight: '10px' }} />
            Contact Information
          </h3>
        </div>
        <div className="card-body">
          <div className="grid-3">
            <div className="form-group">
              <label className="form-label">Support Email</label>
              <input
                type="email"
                className="form-input"
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Support Phone</label>
              <input
                type="text"
                className="form-input"
                value={settings.supportPhone}
                onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Line ID</label>
              <input
                type="text"
                className="form-input"
                value={settings.lineId}
                onChange={(e) => setSettings({ ...settings, lineId: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <FiShield style={{ marginRight: '10px' }} />
            Security Settings
          </h3>
        </div>
        <div className="card-body">
          <div className="grid-3">
            <div className="form-group">
              <label className="form-label">Maintenance Mode</label>
              <select
                className="form-select"
                value={settings.maintenanceMode ? 'on' : 'off'}
                onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.value === 'on' })}
              >
                <option value="off">Off - Site Active</option>
                <option value="on">On - Maintenance Mode</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Two-Factor Auth (Staff)</label>
              <select className="form-select">
                <option value="required">Required for All</option>
                <option value="optional">Optional</option>
                <option value="admin">Admin Only</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Session Timeout</label>
              <select className="form-select">
                <option value="30">30 Minutes</option>
                <option value="60">1 Hour</option>
                <option value="120">2 Hours</option>
                <option value="480">8 Hours</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
