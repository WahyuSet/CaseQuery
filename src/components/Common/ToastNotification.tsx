import React, { useEffect } from 'react'
import { CheckCircle2, X } from 'lucide-react'
import './ToastNotification.css'

interface ToastNotificationProps {
  message: string
  subMessage?: string
  onClose: () => void
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  message,
  subMessage,
  onClose
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="toast-container">
      <CheckCircle2 size={22} color="var(--success)" style={{ flexShrink: 0 }} />
      <div className="toast-body">
        <div className="toast-tag">
          Petunjuk Kasus Terungkap
        </div>
        <div className="toast-message">
          {message}
        </div>
        {subMessage && (
          <div className="toast-submessage">
            {subMessage}
          </div>
        )}
      </div>
      <button
        onClick={onClose}
        className="toast-close-btn"
        title="Tutup pemberitahuan"
      >
        <X size={15} />
      </button>
    </div>
  )
}
