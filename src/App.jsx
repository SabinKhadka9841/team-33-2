import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import ToastContainer from './components/Toast/Toast'
import Layout from './components/Layout'
import './App.css'

// Lazy load page components for better performance
const Home = lazy(() => import('./pages/Home'))
const Sports = lazy(() => import('./pages/Sports'))
const LiveCasino = lazy(() => import('./pages/LiveCasino'))
const Slot = lazy(() => import('./pages/Slot'))
const Promotions = lazy(() => import('./pages/Promotions'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const Wallet = lazy(() => import('./pages/Wallet'))
const History = lazy(() => import('./pages/History'))
const LiveChat = lazy(() => import('./pages/LiveChat'))
const Settings = lazy(() => import('./pages/Settings'))
const Terms = lazy(() => import('./pages/Terms'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))

// Loading spinner component
const PageLoader = () => (
  <div className="page-loader">
    <div className="loader-spinner"></div>
  </div>
)

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <ToastContainer />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Auth Routes - No Layout */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/terms" element={<Terms />} />

              {/* Main Routes - With Layout */}
              <Route path="/*" element={
                <Layout>
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/sports" element={<Sports />} />
                      <Route path="/live-casino" element={<LiveCasino />} />
                      <Route path="/slot" element={<Slot />} />
                      <Route path="/card-game" element={<Slot />} />
                      <Route path="/fishing" element={<Slot />} />
                      <Route path="/esport" element={<Sports />} />
                      <Route path="/instant-win" element={<Slot />} />
                      <Route path="/promotions" element={<Promotions />} />
                      <Route path="/livechat" element={<LiveChat />} />

                      {/* User Routes - No login required for dev */}
                      <Route path="/wallet" element={<Wallet />} />
                      <Route path="/history" element={<History />} />
                      <Route path="/settings" element={<Settings />} />
                    </Routes>
                  </Suspense>
                </Layout>
              } />
            </Routes>
          </Suspense>
        </Router>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App
