import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// Register page simply redirects to Login with signup tab
// The Login page already handles both sign-in and sign-up flows
export default function Register() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/login', { replace: true });
  }, [navigate]);
  return null;
}
