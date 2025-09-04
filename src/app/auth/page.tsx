"use client";

import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { Check } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPrivacyBanner, setShowPrivacyBanner] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 flex flex-col lg:flex-row">
      {/* Left Panel - Features */}
      <div className="hidden lg:flex lg:w-1/2 p-8 lg:p-12 items-center justify-center">
        <div className="max-w-lg text-white">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 lg:mb-8">
            beincom
          </h1>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center mt-0.5">
                <Check size={16} className="text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg lg:text-xl font-semibold mb-2">
                  Social Community Platform
                </h3>
                <p className="text-purple-100 text-sm lg:text-base">
                  Beincom is the platform for building and engaging with
                  communities.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center mt-0.5">
                <Check size={16} className="text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg lg:text-xl font-semibold mb-2">
                  Always Reach
                </h3>
                <p className="text-purple-100 text-sm lg:text-base">
                  Contents created by communities are always distributed to all
                  members' newsfeeds.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center mt-0.5">
                <Check size={16} className="text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg lg:text-xl font-semibold mb-2">
                  Quality Content
                </h3>
                <p className="text-purple-100 text-sm lg:text-base">
                  Read & Write with quality and earn rewards for each post.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center mt-0.5">
                <Check size={16} className="text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg lg:text-xl font-semibold mb-2">
                  Security
                </h3>
                <p className="text-purple-100 text-sm lg:text-base">
                  Rigorous account verification and security mechanisms using
                  Web3 technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          {isLogin ? (
            <LoginForm
              onSwitchToSignUp={() => setIsLogin(false)}
              onForgotPassword={() => {
                // Handle forgot password
                console.log("Forgot password clicked");
              }}
            />
          ) : (
            <SignUpForm onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </div>
      </div>

      {/* Privacy Banner */}
      {showPrivacyBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-3 sm:p-4 z-50">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex-1">
              <h3 className="font-semibold mb-1 text-sm sm:text-base">
                We Respect Your Privacy
              </h3>
              <p className="text-xs sm:text-sm text-gray-300">
                We use cookies and similar technologies to help personalize
                content, tailor and measure ads, and provide a better
                experience. By clicking "Accept All", you consent to our use of
                cookies.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                onClick={() => setShowPrivacyBanner(false)}
              >
                Customize
              </button>
              <button
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                onClick={() => setShowPrivacyBanner(false)}
              >
                Deny All
              </button>
              <button
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                onClick={() => setShowPrivacyBanner(false)}
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
