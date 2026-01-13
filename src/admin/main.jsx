import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './AdminLayout'
import Login from './pages/Login'
import Users from './pages/Users'
import Transactions from './pages/Transactions'
import BankTx from './pages/BankTx'
import ChatList from './pages/ChatList'
import ChatView from './pages/ChatView'
import Reports from './pages/Reports'
import Rebate from './pages/Rebate'
import Referrer from './pages/Referrer'
import Commission from './pages/Commission'
import SMS from './pages/SMS'
import ManageBank from './pages/ManageBank'
import ManageStaff from './pages/ManageStaff'
import Promotion from './pages/Promotion'
import GameKiosk from './pages/GameKiosk'
import GameSetting from './pages/GameSetting'
import Setting from './pages/Setting'
import Display from './pages/Display'
import Theme from './pages/Theme'
import Dashboard from './pages/Dashboard'
import Members from './pages/Members'
import './Admin.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Navigate to="/users" replace />} />
          <Route path="users" element={<Users />} />
          <Route path="members" element={<Members />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="bank-tx" element={<BankTx />} />
          <Route path="chatlist" element={<ChatList />} />
          <Route path="chat/:sessionId" element={<ChatView />} />
          <Route path="reports" element={<Reports />} />
          <Route path="rebate" element={<Rebate />} />
          <Route path="referrer" element={<Referrer />} />
          <Route path="commission" element={<Commission />} />
          <Route path="sms" element={<SMS />} />
          <Route path="manage-bank" element={<ManageBank />} />
          <Route path="manage-staff" element={<ManageStaff />} />
          <Route path="promotion" element={<Promotion />} />
          <Route path="game-kiosk" element={<GameKiosk />} />
          <Route path="game-setting" element={<GameSetting />} />
          <Route path="setting" element={<Setting />} />
          <Route path="display" element={<Display />} />
          <Route path="theme" element={<Theme />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>,
)
