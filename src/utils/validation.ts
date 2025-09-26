import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const registerSchema = yup.object({
  fullName: yup
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .required('Full name is required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain uppercase, lowercase, number and special character'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your password'),
  university: yup.string().required('Please select your university'),
  agreeToTerms: yup
    .boolean()
    .oneOf([true], 'You must agree to the Terms of Service and Privacy Policy'),
});

export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
});

export const getPasswordStrength = (password: string): {
  score: number;
  label: string;
  color: string;
} => {
  let score = 0;
  
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[@$!%*?&]/.test(password)) score++;
  
  if (score <= 2) {
    return { score, label: 'Weak', color: 'bg-red-500' };
  } else if (score <= 3) {
    return { score, label: 'Medium', color: 'bg-yellow-500' };
  } else {
    return { score, label: 'Strong', color: 'bg-emerald-500' };
  }
};

export const universities = [
  'Select your university',
  'University of Delhi',
  'Jawaharlal Nehru University',
  'Indian Institute of Technology (IIT) Delhi',
  'Indian Institute of Technology (IIT) Bombay',
  'Indian Institute of Technology (IIT) Madras',
  'Indian Institute of Science (IISc) Bangalore',
  'University of Mumbai',
  'University of Calcutta',
  'Banaras Hindu University',
  'Aligarh Muslim University',
  'Jamia Millia Islamia',
  'Anna University',
  'University of Hyderabad',
  'Pune University',
  'Other',
];