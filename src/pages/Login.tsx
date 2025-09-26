import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import LoginForm from '../components/auth/LoginForm';

export default function Login() {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/', { replace: true });
  };

  return (
    <AuthLayout
      title="Welcome Back to MindCare"
      subtitle="Demo Account: student@gmail.com / mindcare2024"
    >
      <LoginForm onSuccess={handleLoginSuccess} />
    </AuthLayout>
  );
}