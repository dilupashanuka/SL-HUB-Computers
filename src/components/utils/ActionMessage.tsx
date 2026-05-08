'use client';

import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { useEffect } from 'react';

interface ActionMessageProps {
  type: 'success' | 'error' | 'info';
  message: string;
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

export function ActionMessage({ 
  type, 
  message, 
  onClose, 
  autoClose = true, 
  autoCloseDelay = 5000 
}: ActionMessageProps) {
  useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay, onClose]);

  const config = {
    success: {
      icon: <CheckCircle2 className="w-5 h-5" />,
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
      textColor: 'text-green-800 dark:text-green-200',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    error: {
      icon: <XCircle className="w-5 h-5" />,
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-800',
      textColor: 'text-red-800 dark:text-red-200',
      iconColor: 'text-red-600 dark:text-red-400'
    },
    info: {
      icon: <AlertTriangle className="w-5 h-5" />,
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      textColor: 'text-blue-800 dark:text-blue-200',
      iconColor: 'text-blue-600 dark:text-blue-400'
    }
  };

  const currentConfig = config[type];

  return (
    <div className={`
      ${currentConfig.bgColor} 
      ${currentConfig.borderColor} 
      border rounded-lg p-4 mb-6
      animate-in fade-in slide-in-from-top-2 duration-300
    `}>
      <div className="flex items-start gap-3">
        <div className={`${currentConfig.iconColor} flex-shrink-0 mt-0.5`}>
          {currentConfig.icon}
        </div>
        <div className={`flex-1 ${currentConfig.textColor}`}>
          <p className="text-sm font-medium">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={`
              ${currentConfig.textColor} 
              hover:opacity-75 
              transition-opacity 
              flex-shrink-0
              p-1 
              rounded-md 
              hover:bg-black/5 dark:hover:bg-white/10
            `}
            aria-label="Close message"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

interface FormErrorProps {
  errors: Record<string, string[]>;
}

export function FormErrors({ errors }: FormErrorProps) {
  if (Object.keys(errors).length === 0) return null;

  return (
    <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4 mb-6">
      <h3 className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">
        පහත දෝෂ නිවැරදි කරන්න:
      </h3>
      <ul className="list-disc list-inside space-y-1">
        {Object.entries(errors).map(([field, messages]) => (
          <li key={field} className="text-sm text-red-700 dark:text-red-300">
            <span className="font-medium capitalize">{field}:</span>{' '}
            {messages.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
}

export function LoadingButton({ 
  children, 
  isLoading = false, 
  loadingText = 'සකසමින්...', 
  className = '', 
  disabled,
  ...props 
}: LoadingButtonProps) {
  return (
    <button
      {...props}
      disabled={isLoading || disabled}
      className={`
        inline-flex items-center justify-center gap-2 px-4 py-2 
        rounded-lg font-medium transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {isLoading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {isLoading ? loadingText : children}
    </button>
  );
}
