"use client";

import { Button } from '@/components/ui';
import { LogOut, Menu, Settings, User, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  console.log('🔍 ADMIN LAYOUT: Current pathname:', pathname);


  const isLoginPage = pathname === '/admin/login';
  
  console.log('🔍 ADMIN LAYOUT: isLoginPage:', isLoginPage);


  const checkAuth = useCallback(async () => {
    if (isLoginPage) {
      console.log('⏭️  ADMIN LAYOUT: Skipping auth check for login page');
      setIsLoading(false);
      return;
    }

    try {
      console.log('🔍 ADMIN LAYOUT: Starting auth check...');
      const response = await fetch('/api/auth/me');
      console.log('🔍 ADMIN LAYOUT: Auth response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('🔍 ADMIN LAYOUT: Auth response data:', data);
        
        if (data.success) {
          setUser(data.user);
          console.log('✅ ADMIN LAYOUT: User authenticated:', data.user.email);
        } else {
          console.log('❌ ADMIN LAYOUT: Auth failed, redirecting to login');
          router.push('/admin/login');
        }
      } else {
        console.log('❌ ADMIN LAYOUT: Auth request failed, redirecting to login');
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('❌ ADMIN LAYOUT: Auth check error:', error);
      router.push('/admin/login');
    } finally {
      setIsLoading(false);
    }
  }, [isLoginPage, router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
      router.push('/');
    }
  };

  const navItems = [
    {
      href: '/admin/dashboard',
      label: 'Dashboard',
      icon: '📊'
    },
    {
      href: '/admin/messages',
      label: 'Proje Talepleri',
      icon: '📬'
    },
    {
      href: '/admin/blogs',
      label: 'Blog Yönetimi',
      icon: '📝'
    },
    {
      href: '/admin/settings',
      label: 'Ayarlar',
      icon: '⚙️'
    }
  ];

  if (isLoginPage) {
    console.log('✅ ADMIN LAYOUT: Login page detected, rendering children only');
    return <>{children}</>;
  }

  console.log('✅ ADMIN LAYOUT: Protected admin page, checking auth...');

  if (isLoading) {
    console.log('🔍 ADMIN LAYOUT: Showing loading state');
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Yetkilendirme kontrol ediliyor...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log('❌ ADMIN LAYOUT: No user, should redirect to login');
    return null;
  }

  console.log('✅ ADMIN LAYOUT: Rendering full admin layout for user:', user.email);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Debug Info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-0 left-0 z-[9999] bg-green-500 text-white p-2 text-xs font-mono">
          <div>ADMIN LAYOUT ACTIVE</div>
          <div>Path: {pathname}</div>
          <div>User: {user.name}</div>
        </div>
      )}

      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-lg transition-all duration-300 flex flex-col`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {isSidebarOpen && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Admin Panel</h2>
                <p className="text-sm text-gray-500">{user.name}</p>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2"
            >
              {isSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors group"
                >
                  <span className="text-lg mr-3">{item.icon}</span>
                  {isSidebarOpen && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-200">
          {isSidebarOpen ? (
            <div className="space-y-2">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  asChild
                >
                  <Link href="/admin/settings">
                    <Settings className="w-4 h-4 mr-2" />
                    Ayarlar
                  </Link>
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Çıkış
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full p-2"
                asChild
              >
                <Link href="/admin/settings">
                  <Settings className="w-5 h-5" />
                </Link>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="w-full p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-500">Portfolio yönetim paneli</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
              
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}