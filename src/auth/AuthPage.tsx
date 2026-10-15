import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AuthLayout } from './AuthLayout';
import { Login } from './Login';
import { Register } from './Register';

export interface AuthPageProps {
  initialMode?: 'login' | 'register';
  initialAlert?: string;
  onBackToHome: () => void;
  onAuthSuccess?: (user: { name?: string; email: string; avatar?: string }) => void;
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
            onSuccessLogin={(userData) => {
              if (onAuthSuccess) {
                onAuthSuccess(userData);
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
                onAuthSuccess(data);
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
