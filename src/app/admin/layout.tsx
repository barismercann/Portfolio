// Admin Panel için özel layout
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 py-3">
          <h1 className="text-lg font-semibold">Admin Panel</h1>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <a href="/admin/dashboard" className="block px-4 py-2 rounded hover:bg-gray-100">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/admin/blogs" className="block px-4 py-2 rounded hover:bg-gray-100">
                  Blog Yönetimi
                </a>
              </li>
              <li>
                <a href="/admin/messages" className="block px-4 py-2 rounded hover:bg-gray-100">
                  Mesajlar
                </a>
              </li>
              <li>
                <a href="/admin/settings" className="block px-4 py-2 rounded hover:bg-gray-100">
                  Ayarlar
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}