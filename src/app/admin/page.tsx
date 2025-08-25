import { redirect } from 'next/navigation';

export default function AdminPage() {
  // Redirect to login page
  redirect('/auth/login');
}