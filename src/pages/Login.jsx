import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { useTranslation } from '../context/TranslationContext'
import { ButtonSpinner } from '../components/LoadingSpinner/LoadingSpinner'
import logo from '../images/New logo.png'
import './Login.css'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isAuthenticated } = useAuth()
  const { showToast } = useToast()
  const { t } = useTranslation()

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/'
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, location])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const result = await login(formData.username, formData.password)

    if (result.success) {
      showToast(`Welcome back, ${result.data.user.username}!`, 'success')
      const from = location.state?.from?.pathname || '/'
      navigate(from, { replace: true })
    } else {
      showToast(result.message || 'Login failed', 'error')
    }

    setLoading(false)
  }

  return (
    <div className="auth-page-new">
      <Link to="/" className="auth-back-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span>{t('back')}</span>
      </Link>

      <div className="auth-container">
        <div className="auth-form-card">
          <div className="auth-header">
            <img src={logo} alt="Team33" className="auth-logo" />
            <h1>{t('login')}</h1>
            <p>{t('welcomeBack')}</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form-new">
            <div className="form-row">
              <label className="form-label">{t('username')}</label>
              <div className="form-input-wrap">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder={t('enterUsername')}
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="form-row">
              <label className="form-label">{t('password')}</label>
              <div className="form-input-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={t('enterPassword')}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? <ButtonSpinner /> : t('loginButton')}
            </button>
          </form>

          <div className="auth-alt-section">
            <p>{t('dontHaveAccount')}</p>
            <Link to="/signup" className="auth-alt-btn">{t('registerButton')}</Link>
          </div>

          <Link to="/forgot-password" className="forgot-password-link">
            {t('forgotPassword')}
          </Link>
        </div>
      </div>
    </div>
  )
}
