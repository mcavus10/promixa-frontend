'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/contexts/AuthContext';
import { updateUserName, updateUserPassword, PasswordUpdateRequest } from '@/lib/api/user';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export function ProfileUpdateForm() {
  const { user, refreshUserData } = useAuth();
  
  // Name update state
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(user?.name || '');
  const [nameLoading, setNameLoading] = useState(false);
  const [nameSuccess, setNameSuccess] = useState(false);
  const [nameError, setNameError] = useState('');
  
  // Password update state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  
  // Check if user has local auth (email/password) - using actual authProvider value
  const isLocalAuth = user?.authProvider === 'LOCAL';
  
  const handleNameUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setNameError('');
    setNameSuccess(false);
    
    // Validate
    if (!newName || newName.trim().length < 2) {
      setNameError('Name must be at least 2 characters long');
      return;
    }
    
    setNameLoading(true);
    try {
      // Send the update request to the backend
      await updateUserName(newName);
      
      // Instead of manually updating the auth data, refresh it from the server
      await refreshUserData();
      
      setNameSuccess(true);
      setIsEditingName(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setNameSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to update name:', error);
      setNameError(error instanceof Error ? error.message : 'Failed to update name');
    } finally {
      setNameLoading(false);
    }
  };
  
  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);
    
    // Validation
    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    if (!currentPassword) {
      setPasswordError('Current password is required');
      return;
    }
    
    setPasswordLoading(true);
    try {
      const passwordData: PasswordUpdateRequest = {
        currentPassword,
        newPassword
      };
      
      await updateUserPassword(passwordData);
      
      setPasswordSuccess(true);
      
      // Clear form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      // Clear success message after 3 seconds
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to update password:', error);
      setPasswordError(error instanceof Error ? error.message : 'Failed to update password');
    } finally {
      setPasswordLoading(false);
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Name Update Card */}
      <Card className="p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Update Profile</h2>
        
        {nameSuccess && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            Name updated successfully!
          </div>
        )}
        
        {nameError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            {nameError}
          </div>
        )}
        
        <form onSubmit={handleNameUpdate}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              {isEditingName ? (
                <input
                  id="name"
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={nameLoading}
                />
              ) : (
                <div className="flex items-center">
                  <span className="font-medium">{user?.name}</span>
                  <button 
                    type="button" 
                    onClick={() => setIsEditingName(true)}
                    className="ml-3 text-sm text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
            
            {isEditingName && (
              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 text-white" 
                  disabled={nameLoading}
                >
                  {nameLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Save
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsEditingName(false);
                    setNewName(user?.name || '');
                    setNameError('');
                  }}
                  disabled={nameLoading}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </form>
      </Card>
      
      {/* Password Update Card - only show for local auth users */}
      {isLocalAuth && (
        <Card className="p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Change Password</h2>
          
          {passwordSuccess && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Password updated successfully!
            </div>
          )}
          
          {passwordError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              {passwordError}
            </div>
          )}
          
          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={passwordLoading}
              />
            </div>
            
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={passwordLoading}
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={passwordLoading}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
              disabled={passwordLoading}
            >
              {passwordLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Update Password
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
}
