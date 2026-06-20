export type UserRole = 'volunteer' | 'admin' | 'visitor' | 'user';

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  photo?: string | null;
  role: UserRole;
  skills?: string[];
  hours?: number;
  joinDate?: string;
  status?: string;
  activities?: number;
}

export interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  hours: number;
  joinDate: string;
  status: 'Active' | 'Inactive';
  activities: number;
}

export interface Activity {
  id: string;
  title: string;
  date: string;
  volunteers: number;
  status: 'Completed' | 'Upcoming';
  description: string;
}
