'use client';

import { useState } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { Check } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPrivacyBanner, setShowPrivacyBanner] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 flex">
      {/* Left Panel - Features */}
      <div className="hidden lg:flex lg:w-1/2 p-12 items-center justify-center">
        <div className="max-w-lg text-white">
          <h1 className="text-5xl font-bold mb-8">beincom</h1>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center mt-0.5">
                <Check size={16} className="text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Social Community Platform</h3>
                <p className="text-purple-100">Beincom is the platform for building and engaging with communities.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center mt-0.5">
                <Check size={16} className="text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Always Reach</h3>
                <p className="text-purple-100">Contents created by communities are always distributed to all members' newsfeeds.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center mt-0.5">
                <Check size={16} className="text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Quality Content</h3>
                <p className="text-purple-100">Read & Write with quality and earn rewards for each post.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center mt-0.5">
                <Check size={16} className="text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Security</h3>
                <p className="text-purple-100">Rigorous account verification and security mechanisms using Web3 technology.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {isLogin ? (
            <LoginForm
              onSwitchToSignUp={() => setIsLogin(false)}
              onForgotPassword={() => {
                // Handle forgot password
                console.log('Forgot password clicked');
              }}
            />
          ) : (
            <SignUpForm onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </div>
      </div>

      {/* Privacy Banner */}
      {showPrivacyBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold mb-1">We Respect Your Privacy</h3>
            <p className="text-sm text-gray-300">
              We use cookies and similar technologies to help personalize content, tailor and measure ads, and provide a better experience. 
              By clicking "Accept All", you consent to our use of cookies.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors" onClick={() => setShowPrivacyBanner(false)}>
              Customize
            </button>
            <button className="px-4 py-2 text-sm border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors" onClick={() => setShowPrivacyBanner(false)}>
              Deny All
            </button>
            <button className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors" onClick={() => setShowPrivacyBanner(false)}>
              Accept All
            </button>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}
