import React, { useState } from 'react';
import { Lock, User, AlertCircle } from 'lucide-react';

export type UserRole = 'manager' | 'member';

interface LoginProps {
    onLogin: (userName: string, role: UserRole) => void;
}

const AUTHORIZED_USERS = [
    { name: 'حسين عبدالله المانع', username: 'LE-001', password: 'HUSLE001#1399', role: 'manager' as UserRole },
    { name: 'دنا فيصل الغامدي', username: 'LE-002', password: 'DUNLE002#31E', role: 'manager' as UserRole },
    { name: 'نضال جميل سندي', username: 'LE-003', password: 'NEDLE003#81S', role: 'manager' as UserRole },
    { name: 'تركي عصام الغامدي', username: 'LE-004', password: 'TURLE004#9QR', role: 'manager' as UserRole },
    { name: 'ميار محمد الزهراني', username: 'LE-005', password: 'MUALE005#824', role: 'manager' as UserRole },
    { name: 'عمر قاسم الهوساوي', username: 'me-001', password: 'meome-001#1', role: 'member' as UserRole },
];

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        setTimeout(() => {
            const user = AUTHORIZED_USERS.find(
                (u) => u.username === username && u.password === password
            );

            if (user) {
                onLogin(user.name, user.role);
            } else {
                setError('اسم المستخدم أو كلمة المرور غير صحيحة');
                setLoading(false);
            }
        }, 800);
    };

    return (
        <div className="min-h-screen w-full bg-bgLight flex items-center justify-center p-4 font-tajawal">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 border-t-8 border-primary relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />

                <div className="text-center mb-8 relative">
                    <img
                        src="https://i.ibb.co/3y9CFHGr/image.png"
                        alt="شعار نادي آفاق"
                        className="w-20 h-20 bg-white rounded-full p-1 mx-auto shadow-md mb-4 object-contain"
                    />
                    <h1 className="text-2xl font-extrabold text-primary">تسجيل الدخول</h1>
                    <p className="text-gray-500 text-sm mt-2">نظام إدارة اللجنة الإعلامية - نادي آفاق</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 relative">
                    <div>
                        <label className="block text-primary font-bold mb-2 mr-1">اسم المستخدم</label>
                        <div className="relative">
                            <User className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-3 pr-11 pl-4 focus:outline-none focus:border-secondary transition-all text-right font-bold"
                                placeholder="أدخل اسم المستخدم"
                                dir="rtl"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-primary font-bold mb-2 mr-1">كلمة المرور</label>
                        <div className="relative">
                            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-3 pr-11 pl-4 focus:outline-none focus:border-secondary transition-all text-right font-bold"
                                placeholder="••••••••"
                                dir="ltr"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 border-r-4 border-red-500 p-4 rounded-lg flex items-center gap-3">
                            <AlertCircle className="text-red-500 shrink-0" size={20} />
                            <p className="text-red-700 text-sm font-bold">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-70 disabled:hover:translate-y-0"
                    >
                        {loading ? 'جاري التحقق...' : 'دخول النظام'}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <p className="text-gray-400 text-xs text-center w-full">جميع الحقوق محفوظة © نادي آفاق | 2026</p>
                </div>
            </div>
        </div>
    );
};
