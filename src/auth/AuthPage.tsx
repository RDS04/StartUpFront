import React, { useState } from 'react';
import { AuthLayout } from './AuthLayout';
import { Login } from './Login';
import { Register } from './Register';

export interface AuthPageProps {
  initialMode?: 'login' | 'register';
  onBackToHome: () => void;
  onAuthSuccess?: (user: { name?: string; email: string }) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  initialMode = 'login',
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
      {mode === 'login' ? (
        <Login
          onSwitchToRegister={() => setMode('register')}
          onSuccessLogin={(email) => {
            if (onAuthSuccess) {
              onAuthSuccess({ email });
            } else {
              onBackToHome();
            }
          }}
        />
      ) : (
        <Register
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
    </AuthLayout>
  );
};
