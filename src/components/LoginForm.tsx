import React, { useState } from 'react';
import { matrixService } from '../services/matrixService';
import { MATRIX_CONFIG } from '../config/matrix.config';
import bihuaLogo from '../assets/bihua.png';

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [homeserver] = useState(MATRIX_CONFIG.defaultHomeServer);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await matrixService.login(homeserver, username, password);
      onLoginSuccess();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Login failed. Please check your credentials.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-white">
      <div className="w-full max-w-[280px] sm:max-w-[320px]">
        <div className="flex flex-col items-center justify-center mb-8">
          <img
            src={bihuaLogo}
            alt="笔画 Logo"
            className="w-12 h-12 sm:w-16 sm:h-16 mb-2"
          />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">笔画</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              服务器
            </label>
            <input
              type="url"
              value={homeserver}
              disabled={true}
              className="w-full px-3 py-2 bg-gray-50 text-gray-600 border-b border-gray-100 text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              用户名
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="输入用户名"
              className="w-full px-3 py-2 bg-white border-b border-gray-100 focus:outline-none text-sm sm:text-base"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              密码
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="输入密码"
              className="w-full px-3 py-2 bg-white border-b border-gray-100 focus:outline-none text-sm sm:text-base"
              required
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="text-red-500 text-xs sm:text-sm text-center mt-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {isLoading ? '登录中...' : '登录'}
          </button>
        </form>
      </div>
    </div>
  );
}