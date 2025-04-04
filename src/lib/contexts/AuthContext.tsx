"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { 
  AuthResponse, 
  getAuthToken, 
  getUserData, 
  isAuthenticated as checkAuth,
  removeAuthToken,
  removeUserData,
  storeUserData
} from '../api/auth';
import { fetchCurrentUser } from '../api/user';

interface AuthContextType {
  isAuthenticated: boolean;
  user: Partial<AuthResponse> | null;
  loading: boolean;
  setAuthData: (data: AuthResponse) => void;
  logout: () => void;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<Partial<AuthResponse> | null>(null);
  const [loading, setLoading] = useState(true);

  // User data refresh function - wrapped with useCallback for reference stability
  const refreshUserData = useCallback(async (): Promise<void> => {
    try {
      // First check if the token exists
      const token = getAuthToken();
      if (!token) {
        console.log('No authentication token found. Cannot refresh user data.');
        return;
      }

      console.log('Refreshing user data from backend...');
      const userData = await fetchCurrentUser();
      
      console.log('API Response:', JSON.stringify(userData, null, 2));
      
      if (userData) {
        console.log('User data refreshed successfully:', userData);
        // DEBUG: Print detailed user data fields
        console.log('isTrialActive:', userData.isTrialActive);
        console.log('isTrialExpired:', userData.isTrialExpired);
        console.log('trialStartDate:', userData.trialStartDate);
        
        // Make sure we have positive trial status results
        if (userData.isTrialActive === undefined || userData.isTrialActive === null) {
          console.warn('WARNING: isTrialActive is undefined or null!');
          // If the data from API is undefined, set this to true
          // This way no warning will appear
          userData.isTrialActive = true;
        }
        
        // Check if the incoming data has all fields
        if (!userData.name) {
          console.warn('WARNING: user name is missing in the response');
        }
        
        // Important: We update user state and localStorage after fetchCurrentUser is successful
        setUser(userData);
        storeUserData(userData); // Update localStorage as well
        setIsAuthenticated(true); // Also update isAuthenticated when data is successfully retrieved
        
        // Trial status log
        console.log('FINAL Trial status set to:', 
                   userData.isTrialActive ? 'Active' : 'Expired');
      }
    } catch (error: any) {
      console.error('Failed to refresh user data:', error);
      
      // In case of 401 error (authentication issues), log out
      if (error.message === 'Authentication expired' || 
          error.message?.includes('Unauthorized') || 
          error.status === 401) {
        console.warn('Authentication error. Logging out user.');
        logout();
      }
      throw error; // Rethrow the error so the calling function can catch it
    }
  }, []); // Empty dependency array - for reference stability

  // Logout function - for use elsewhere
  const logout = useCallback(() => {
    console.log('Logging out user');
    removeAuthToken();
    removeUserData();
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  // User data update function
  const setAuthData = useCallback((data: AuthResponse) => {
    console.log('Setting auth data:', data);
    setIsAuthenticated(true);
    setUser(data);
    storeUserData(data);
  }, []);

  // Check current session when the application starts
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true); // Loading begins
      
      try {
        const token = getAuthToken();
        
        if (token) {
          console.log('Existing auth token found, initializing authentication state');
          
          // State update will be the responsibility of the refreshUserData function
          try {
            console.log('Fetching fresh user data on initialization');
            await refreshUserData(); // Wait but don't use the returned data
            console.log('User data successfully refreshed during initialization');
            // setIsAuthenticated(true) call is now done inside refreshUserData
          } catch (refreshError) {
            console.error('Failed to refresh data during initialization:', refreshError);
            // If there was a problem getting user data, log out
            console.warn('Logging out due to refresh failure');
            logout();
          }
        } else {
          console.log('No auth token found, user is not authenticated');
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Error during auth initialization:', error);
        // Log out for security
        logout();
      } finally {
        setLoading(false); // Complete loading in all cases
      }
    };

    initializeAuth();
  }, []); // Empty dependency array - runs only once

  // Context provider value
  const value = {
    isAuthenticated,
    user,
    loading,
    setAuthData,
    logout,
    refreshUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
