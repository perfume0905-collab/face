import React from 'react';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

export default function ToastNotification({ toasts, onRemoveToast }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className="toast">
          {t.type === 'success' && <CheckCircle size={18} color="var(--accent-emerald)" />}
          {t.type === 'error' && <AlertCircle size={18} color="var(--accent-rose)" />}
          {t.type === 'info' && <Info size={18} color="var(--accent-cyan)" />}
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
