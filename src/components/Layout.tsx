import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen w-full max-w-screen-md mx-auto bg-white">
      {children}
    </div>
  );
}