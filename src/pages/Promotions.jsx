import { useTranslation } from '../context/TranslationContext'
import './Promotions.css'

export default function Promotions() {
  const { t } = useTranslation()

  return (
    <div className="promotions-page">
      {/* Hero Section */}
      <div className="promo-hero">
        <div className="promo-hero-bg"></div>

        <div className="promo-content">
          {/* Empty State - Coming Soon */}
          <div className="promo-empty">
            <span className="empty-icon">🎁</span>
            <h3>{t('comingSoon')}</h3>
            <p>{t('checkBackLater')}</p>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="marquee">
        <span className="marquee-icon">📢</span>
        <div className="marquee-text">
          <span>Telegram: @Team33 | {t('contactUs')}</span>
        </div>
      </div>
    </div>
  )
}
