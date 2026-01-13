import { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiShield, FiUser } from 'react-icons/fi';

const ManageStaff = () => {
  const staff = [
    { id: 1, username: 'admin', name: 'Super Admin', role: 'Super Admin', email: 'admin@j66.com', lastLogin: '2024-01-15 14:30', status: 'Active' },
    { id: 2, username: 'manager01', name: 'John Manager', role: 'Manager', email: 'john@j66.com', lastLogin: '2024-01-15 12:00', status: 'Active' },
    { id: 3, username: 'support01', name: 'Sarah Support', role: 'Support', email: 'sarah@j66.com', lastLogin: '2024-01-15 10:30', status: 'Active' },
    { id: 4, username: 'finance01', name: 'Mike Finance', role: 'Finance', email: 'mike@j66.com', lastLogin: '2024-01-14 18:00', status: 'Active' },
    { id: 5, username: 'support02', name: 'Lisa Support', role: 'Support', email: 'lisa@j66.com', lastLogin: '2024-01-13 09:00', status: 'Inactive' },
  ];

  const roles = [
    { name: 'Super Admin', permissions: 'Full Access', color: 'purple' },
    { name: 'Manager', permissions: 'Members, Reports, Settings', color: 'blue' },
    { name: 'Finance', permissions: 'Deposits, Withdrawals, Reports', color: 'green' },
    { name: 'Support', permissions: 'Members (View), Chat Support', color: 'orange' },
  ];

  return (
    <div className="manage-staff-page">
      <div className="page-header">
        <h1 className="page-title">Manage Staff</h1>
        <button className="btn btn-primary">
          <FiPlus /> Add Staff
        </button>
      </div>

      {/* Roles Overview */}
      <div className="stats-grid" style={{ marginBottom: '20px' }}>
        {roles.map((role, index) => (
          <div key={index} className="stat-card">
            <div className={`stat-icon ${role.color}`}>
              <FiShield />
            </div>
            <div className="stat-info">
              <h4>{role.name}</h4>
              <p style={{ fontSize: '12px', color: '#6b7280' }}>{role.permissions}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Staff Table */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Staff Members</h3>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Last Login</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((member) => (
              <tr key={member.id}>
                <td>{member.id}</td>
                <td style={{ fontWeight: 600 }}>{member.username}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: '#d4af37',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#1a1a2e',
                      fontWeight: 600,
                      fontSize: '14px'
                    }}>
                      {member.name.charAt(0)}
                    </div>
                    {member.name}
                  </div>
                </td>
                <td>
                  <span className={`badge ${
                    member.role === 'Super Admin' ? 'badge-info' :
                    member.role === 'Manager' ? 'badge-warning' :
                    member.role === 'Finance' ? 'badge-success' : 'badge-secondary'
                  }`} style={member.role === 'Support' ? { background: '#fed7aa', color: '#c2410c' } : {}}>
                    {member.role}
                  </span>
                </td>
                <td>{member.email}</td>
                <td style={{ color: '#6b7280' }}>{member.lastLogin}</td>
                <td>
                  <span className={`badge ${member.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                    {member.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <button className="btn btn-secondary" style={{ padding: '6px 10px' }}>
                      <FiEdit2 />
                    </button>
                    <button className="btn btn-danger" style={{ padding: '6px 10px' }} disabled={member.role === 'Super Admin'}>
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

      {/* Activity Log */}
      <div className="card" style={{ marginTop: '20px' }}>
        <div className="card-header">
          <h3 className="card-title">Recent Activity</h3>
        </div>
        <div className="card-body">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { user: 'admin', action: 'Approved withdrawal #W12345', time: '5 min ago' },
            { user: 'support01', action: 'Replied to chat ticket #T789', time: '15 min ago' },
            { user: 'finance01', action: 'Updated bank account settings', time: '1 hour ago' },
            { user: 'manager01', action: 'Created new promotion', time: '2 hours ago' },
          ].map((log, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '10px', background: '#f9fafb', borderRadius: '8px' }}>
              <FiUser style={{ color: '#6b7280' }} />
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: 600, color: '#1f2937' }}>{log.user}</span>
                <span style={{ color: '#6b7280' }}> - {log.action}</span>
              </div>
              <span style={{ color: '#9ca3af', fontSize: '12px' }}>{log.time}</span>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageStaff;
