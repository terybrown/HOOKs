'use client';

import { useState } from 'react';
import LoginForm from './login-form';
import SignUpForm from './signup-form';
import { Button } from '@/components/ui/button';

export default function AuthContainer() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[600px] rounded-2xl overflow-hidden bg-background border border-border" style={{
      boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1), 0 20px 60px -10px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
    }}>
      <style>{`
        @keyframes slideRight {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(100%);
          }
        }

        @keyframes slideLeft {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .slide-overlay {
          animation: slideLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .slide-overlay-return {
          animation: slideRight 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .fade-overlay {
          animation: fadeIn 0.3s ease-in-out;
        }

        .edge-shadow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.15);
          border-radius: inherit;
        }
      `}</style>

      <div className="flex h-full">
        {/* Left Half - Sign Up */}
        <div className="w-1/2 p-8 flex items-center justify-center overflow-hidden">
          <SignUpForm />
        </div>

        {/* Right Half - Login */}
        <div className="w-1/2 p-8 flex items-center justify-center overflow-hidden border-l border-border">
          <LoginForm />
        </div>

        {/* Sliding Overlay */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-foreground from-0% via-foreground via-50% to-foreground/80 flex flex-col items-center justify-center p-8 rounded-2xl ${
            isSignUp ? 'slide-overlay' : 'slide-overlay-return'
          }`}
        >
          {/* Overlay Content */}
          <div className="text-center text-background z-20 fade-overlay">
            {isSignUp ? (
              <>
                <h3 className="text-3xl font-bold mb-4">Welcome Back!</h3>
                <p className="text-sm text-background/80 mb-6">
                  Log in to access your command center
                </p>
                <Button
                  onClick={() => setIsSignUp(false)}
                  className="border-background/50 hover:bg-background/10 text-background border"
                  variant="outline"
                >
                  Sign In
                </Button>
              </>
            ) : (
              <>
                <h3 className="text-3xl font-bold mb-4">New Here?</h3>
                <p className="text-sm text-background/80 mb-6">
                  Join our community to start automating your workflow
                </p>
                <Button
                  onClick={() => setIsSignUp(true)}
                  className="border-background/50 hover:bg-background/10 text-background border"
                  variant="outline"
                >
                  Create Account
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
