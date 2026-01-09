import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { useTranslation } from '../context/TranslationContext'
import { ButtonSpinner } from '../components/LoadingSpinner/LoadingSpinner'
import logo from '../images/New logo.png'
import './Signup.css'

export default function Signup() {
  const navigate = useNavigate()
  const { signup, isAuthenticated } = useAuth()
  const { showToast } = useToast()
  const { t } = useTranslation()

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    password: '',
    referralCode: ''
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.fullName || formData.fullName.length < 2) {
      showToast('Please enter your full name', 'error')
      return
    }

    if (!formData.phone || formData.phone.length < 8) {
      showToast('Please enter a valid phone number', 'error')
      return
    }

    if (formData.password.length < 6) {
      showToast('Password must be at least 6 characters', 'error')
      return
    }

    setLoading(true)

    const result = await signup({
      username: formData.fullName.replace(/\s+/g, '_').toLowerCase(),
      fullName: formData.fullName,
      phone: formData.phone,
      password: formData.password,
      referralCode: formData.referralCode || undefined
    })

    if (result.success) {
      showToast('Account created successfully!', 'success')
      navigate('/', { replace: true })
    } else {
      showToast(result.message || 'Registration failed', 'error')
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
            <h1>{t('register')}</h1>
            <p>{t('createAccount')}</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form-new">
            <div className="form-row">
              <label className="form-label">{t('fullName')}</label>
              <div className="form-input-wrap">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder={t('enterFullName')}
                  required
                  autoComplete="name"
                />
              </div>
              <span className="form-hint">{t('mustMatchBankName')}</span>
            </div>

            <div className="form-row">
              <label className="form-label">{t('mobileNo')}</label>
              <div className="form-input-wrap">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t('enterPhone')}
                  required
                  autoComplete="tel"
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
                  autoComplete="new-password"
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

            <div className="form-row">
              <label className="form-label">{t('referrerCode')}</label>
              <div className="form-input-wrap">
                <input
                  type="text"
                  name="referralCode"
                  value={formData.referralCode}
                  onChange={handleChange}
                  placeholder={t('optional')}
                  autoComplete="off"
                />
              </div>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? <ButtonSpinner /> : t('registerButton')}
            </button>
          </form>

          <div className="auth-alt-section">
            <p>{t('alreadyHaveAccount')}</p>
            <Link to="/login" className="auth-alt-btn">{t('loginButton')}</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
