import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SlideContainer } from './components/SlideContainer';
import { Login } from './components/Login';
import type { UserRole } from './components/Login';

import { LandingSlide } from './slides/LandingSlide';
import { PoliciesSlide } from './slides/PoliciesSlide';
import { OrgChartSlide } from './slides/OrgChartSlide';
import { CalendarSlide } from './slides/CalendarSlide';
import { NewsSlide } from './slides/NewsSlide';
import { TasksSlide } from './slides/TasksSlide';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [user, setUser] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<UserRole>('member');
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // التحقق من وجود جلسة سابقة
    const savedUser = localStorage.getItem('afaq_user');
    const savedRole = localStorage.getItem('afaq_role') as UserRole;
    if (savedUser) {
      setUser(savedUser);
      setUserRole(savedRole || 'member');
    }
    setIsInitializing(false);
  }, []);

  const handleLogin = (userName: string, role: UserRole) => {
    setUser(userName);
    setUserRole(role);
    localStorage.setItem('afaq_user', userName);
    localStorage.setItem('afaq_role', role);
  };

  const handleLogout = () => {
    if (window.confirm('هل تريد تسجيل الخروج؟')) {
      setUser(null);
      setUserRole('member');
      localStorage.removeItem('afaq_user');
      localStorage.removeItem('afaq_role');
      setCurrentSlide(0);
    }
  };

  if (isInitializing) return null;

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex flex-col h-screen w-full bg-bgLight text-primary font-tajawal overflow-hidden">
      <Header currentSlide={currentSlide} onNavigate={setCurrentSlide} />

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="fixed bottom-4 right-4 bg-primary/20 hover:bg-red-500 hover:text-white text-primary px-4 py-2 rounded-full text-xs font-bold transition-all z-[100] backdrop-blur-sm border border-primary/10"
      >
        خروج: {user} ({userRole === 'manager' ? 'مشرف' : 'عضو'})
      </button>

      <SlideContainer currentSlide={currentSlide} onNavigate={setCurrentSlide}>
        <LandingSlide />
        <PoliciesSlide />
        <OrgChartSlide />
        <CalendarSlide />
        <NewsSlide role={userRole} />
        <TasksSlide role={userRole} />
      </SlideContainer>
    </div>
  );
}

export default App;
