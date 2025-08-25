import { redirect } from 'next/navigation';

export default function AdminPage() {
  // Admin ana sayfası dashboard'a yönlendirsin
  redirect('/admin/dashboard');
}