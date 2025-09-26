import React from 'react';
import { motion } from 'framer-motion';
import { getPasswordStrength } from '../../utils/validation';

interface PasswordStrengthMeterProps {
  password: string;
}

export default function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  if (!password) return null;

  const { score, label, color } = getPasswordStrength(password);
  const percentage = (score / 5) * 100;

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-slate-600">Password strength</span>
        <span className={`text-xs font-medium ${
          label === 'Weak' ? 'text-red-600' :
          label === 'Medium' ? 'text-yellow-600' :
          'text-emerald-600'
        }`}>
          {label}
        </span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3 }}
          className={`h-2 rounded-full ${color}`}
        />
      </div>
      <div className="mt-2 text-xs text-slate-500">
        <ul className="space-y-1">
          <li className={password.length >= 8 ? 'text-emerald-600' : 'text-slate-400'}>
            ✓ At least 8 characters
          </li>
          <li className={/[A-Z]/.test(password) ? 'text-emerald-600' : 'text-slate-400'}>
            ✓ One uppercase letter
          </li>
          <li className={/\d/.test(password) ? 'text-emerald-600' : 'text-slate-400'}>
            ✓ One number
          </li>
          <li className={/[@$!%*?&]/.test(password) ? 'text-emerald-600' : 'text-slate-400'}>
            ✓ One special character
          </li>
        </ul>
      </div>
    </div>
  );
}