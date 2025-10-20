import { createContext, useContext, useEffect, useState } from 'react';
import { insforge } from '../lib/insforge';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data, error } = await insforge.auth.getCurrentUser();
      if (data && !error) {
        setUser(data.user);
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email, password) => {
    const { data, error } = await insforge.auth.signUp({
      email,
      password
    });
    
    if (error) throw error;
    
    setUser(data.user);
    return data;
  };

  const signIn = async (email, password) => {
    const { data, error } = await insforge.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    
    setUser(data.user);
    return data;
  };

  const signInWithGoogle = async () => {
    const { data, error } = await insforge.auth.signInWithOAuth({
      provider: 'google',
      redirectTo: window.location.origin,
      skipBrowserRedirect: true
    });
    
    if (error) throw error;
    
    // Redirect to Google OAuth
    if (data?.url) {
      window.location.href = data.url;
    }
  };

  const signOut = async () => {
    await insforge.auth.signOut();
    setUser(null);
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

