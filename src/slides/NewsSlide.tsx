import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Trash2, ShieldAlert } from 'lucide-react';
import type { UserRole } from '../components/Login';

interface NewsItem {
    id: string;
    title: string;
    description: string;
    image_url: string;
    date: string;
}

interface NewsSlideProps {
    role: UserRole;
}

export const NewsSlide: React.FC<NewsSlideProps> = ({ role }) => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMSG, setErrorMSG] = useState('');

    const isManager = role === 'manager';

    // Form states
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({ title: '', description: '', image_url: '' });

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const { data, error } = await supabase
                .from('news')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setNews(data || []);
        } catch (err) {
            console.error('Error fetching news:', err);
            setErrorMSG('قاعدة البيانات غير متصلة.');
            setNews([
                {
                    id: '1',
                    title: 'تغطية اليوم الوطني 94',
                    description: 'شاركت اللجنة الإعلامية بنادي آفاق في توثيق احتفالات اليوم الوطني للمملكة وتغطية فعاليات الطلاب بأبهى حلة.',
                    image_url: 'https://images.unsplash.com/photo-1551041777-ed277b8dd348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    date: '2023-09-23'
                },
                {
                    id: '2',
                    title: 'إطلاق الهوية البصرية الجديدة',
                    description: 'بحضور مدير إدارة الأنشطة، تم الإعلان رسمياً عن الهوية المرئية الجديدة لنادي آفاق وتوزيع الدليل الإرشادي.',
                    image_url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    date: '2023-11-15'
                }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const addOrUpdateNews = async (e: React.FormEvent) => {
        e.preventDefault();
        const newEntry = {
            ...formData,
            id: Date.now().toString(),
            date: new Date().toISOString().split('T')[0]
        };

        setNews([newEntry, ...news]);
        setIsFormOpen(false);
        setFormData({ title: '', description: '', image_url: '' });

        try {
            await supabase.from('news').insert([formData]);
        } catch (err) { console.error(err); }
    };

    const deleteNews = async (id: string) => {
        if (!confirm('هل أنت متأكد من حذف هذا الخبر؟')) return;
        setNews(news.filter(n => n.id !== id));
        try {
            await supabase.from('news').delete().eq('id', id);
        } catch (err) { console.error(err); }
    };

    return (
        <div className="flex flex-col items-center min-h-full px-4 pt-12 pb-32 font-tajawal">
            <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center mb-12 gap-6 text-center">
                <div className="flex-1 text-center">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-primary relative inline-block">
                        أخبار اللجنة والفعاليات
                        <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-1.5 bg-secondary rounded-full" />
                    </h2>
                </div>

                {isManager ? (
                    <button
                        onClick={() => setIsFormOpen(!isFormOpen)}
                        className="bg-secondary text-primary font-bold px-8 py-3 rounded-xl flex items-center gap-2 hover:-translate-y-1 transition-all shadow-lg active:scale-95"
                    >
                        <Plus size={20} /> إضافة خبر جديد
                    </button>
                ) : (
                    <div className="bg-primary/5 px-4 py-2 rounded-lg flex items-center gap-2 border border-primary/10">
                        <ShieldAlert size={18} className="text-primary/40" />
                        <span className="text-primary/60 text-xs font-bold whitespace-nowrap">وضع القراءة فقط</span>
                    </div>
                )}
            </div>

            {isManager && isFormOpen && (
                <form onSubmit={addOrUpdateNews} className="w-full max-w-2xl bg-white p-8 rounded-3xl shadow-2xl mb-12 flex flex-col gap-5 border-t-8 border-secondary relative overflow-hidden animate-slideUp">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16 pointer-events-none" />
                    <h3 className="font-extrabold text-2xl text-primary mb-2">إضافة تغطية إعلامية جديدة</h3>

                    <div className="space-y-4 relative">
                        <input required placeholder="عنوان الخبر" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-xl focus:outline-none focus:border-secondary transition-all font-bold" />
                        <textarea required placeholder="وصف وتفاصيل التغطية..." value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-xl focus:outline-none focus:border-secondary transition-all min-h-[120px]" />
                        <input placeholder="رابط الصورة (URL)" value={formData.image_url} onChange={e => setFormData({ ...formData, image_url: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-xl focus:outline-none focus:border-secondary transition-all ltr text-left" dir="ltr" />
                    </div>

                    <div className="flex justify-end gap-3 mt-4">
                        <button type="button" onClick={() => setIsFormOpen(false)} className="px-8 py-3 text-gray-400 font-bold hover:bg-gray-100 rounded-xl transition-colors">إلغاء</button>
                        <button type="submit" className="px-10 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-md active:scale-95">نشر الخبر الآن</button>
                    </div>
                </form>
            )}

            {errorMSG && <p className="text-red-500 mb-6 font-bold">{errorMSG}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
                {isLoading ? (
                    <p className="text-center col-span-full py-20 text-gray-400 font-bold">جاري تحميل الأخبار...</p>
                ) : news.map((item) => (
                    <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group flex flex-col relative border border-gray-100">
                        {isManager && (
                            <button onClick={() => deleteNews(item.id)} className="absolute top-4 left-4 bg-red-500 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10 hover:bg-red-600 shadow-xl hover:scale-110 active:scale-90">
                                <Trash2 size={18} />
                            </button>
                        )}

                        <div className="h-56 overflow-hidden bg-gray-100">
                            {item.image_url ? (
                                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-primary/20 bg-primary/5">لا توجد صورة</div>
                            )}
                        </div>
                        <div className="p-8 flex flex-col flex-1">
                            <span className="text-xs font-bold text-secondary mb-3 bg-secondary/10 px-3 py-1 rounded-full w-fit">{item.date}</span>
                            <h3 className="text-2xl font-extrabold text-primary mb-4 line-clamp-2 leading-snug">{item.title}</h3>
                            <p className="text-gray-500 leading-relaxed text-sm line-clamp-3 mb-6">{item.description}</p>
                            <div className="mt-auto pt-4 border-t border-gray-50">
                                <span className="text-primary text-xs font-bold opacity-40">بواسطة اللجنة الإعلامية</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
