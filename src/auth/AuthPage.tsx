import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AuthLayout } from './AuthLayout';
import { Login } from './Login';
import { Register } from './Register';

export interface AuthPageProps {
  initialMode?: 'login' | 'register';
  initialAlert?: string;
  onBackToHome: () => void;
  onAuthSuccess?: (user: { name?: string; email: string; avatar?: string }, authType?: 'login' | 'register') => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  initialMode = 'login',
  initialAlert,
  onBackToHome,
  onAuthSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  return (
    <AuthLayout
      activeMode={mode}
      onSwitchMode={(newMode) => setMode(newMode)}
      onBackToHome={onBackToHome}
    >
      <AnimatePresence mode="wait">
        {mode === 'login' ? (
          <Login
            key="login-form"
            initialAlert={initialAlert}
            onSwitchToRegister={() => setMode('register')}
            onSuccessLogin={(userData, authType = 'login') => {
              if (onAuthSuccess) {
                onAuthSuccess(userData, authType);
              } else {
                onBackToHome();
              }
            }}
          />
        ) : (
          <Register
            key="register-form"
            onSwitchToLogin={() => setMode('login')}
            onSuccessRegister={(data) => {
              if (onAuthSuccess) {
                onAuthSuccess(data, 'register');
              } else {
                onBackToHome();
              }
            }}
          />
        )}
      </AnimatePresence>
    </AuthLayout>
  );
};
