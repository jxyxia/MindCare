import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import RegisterForm from '../components/auth/RegisterForm';

export default function Register() {
  const navigate = useNavigate();

  const handleRegisterSuccess = () => {
    navigate('/', { replace: true });
  };

  return (
    <AuthLayout
      title="Join MindCare Community"
      subtitle="Start your mental wellness journey today"
    >
      <RegisterForm onSuccess={handleRegisterSuccess} />
    </AuthLayout>
  );
}