import React from 'react';
import { PenTool, Award, MessageSquare, Hash, BookOpen, HardDrive } from 'lucide-react';

const serviceCards = [
    {
        title: 'تسليم المحتوى',
        icon: <PenTool size={48} className="mb-4" />,
        url: 'https://forms.gle/upxsRJjbBiJSdGjHA',
    },
    {
        title: 'تسليم الشهادات',
        icon: <Award size={48} className="mb-4" />,
        url: 'https://forms.gle/esh6sG3XDi2jFjMdA',
    },
    {
        title: 'الشكاوى والاقتراحات',
        icon: <MessageSquare size={48} className="mb-4" />,
        url: 'https://forms.gle/Mv1UKJEejq4svLdk6',
    }
];

const managementCards = [
    {
        title: 'ديسكورد النادي',
        icon: <Hash size={40} className="mb-3" />,
        url: 'https://discord.gg/KjTdUC2PZj',
        color: 'bg-[#5865F2]/10 border-[#5865F2]/20 text-[#5865F2]'
    },
    {
        title: 'نوشن إدارة الإعلام',
        icon: <BookOpen size={40} className="mb-3" />,
        url: 'https://www.notion.so/invite/8e4ad040d1c5dda16607269e4429a505b25cd56a',
        color: 'bg-black/5 border-black/10 text-black'
    },
    {
        title: 'درايف اللجنة',
        icon: <HardDrive size={40} className="mb-3" />,
        url: 'https://drive.google.com/drive/folders/1we8QmcUQbgy_0pvvHK7ZQut2uQtsH8PM?usp=sharing',
        color: 'bg-green-50 border-green-100 text-green-700'
    }
];

export const LandingSlide: React.FC = () => {
    return (
        <div className="flex flex-col items-center min-h-full px-4 pt-12 pb-32 overflow-y-auto scrollbar-hide">
            {/* Section 1: Electronic Services */}
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-5xl font-extrabold text-primary relative inline-block">
                    الخدمات الإلكترونية
                    <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-1.5 bg-secondary rounded-full" />
                </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-6 max-w-6xl w-full mb-16">
                {serviceCards.map((card, idx) => (
                    <a
                        key={idx}
                        href={card.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white rounded-3xl p-8 w-72 md:w-80 text-center text-primary shadow-lg border-b-[6px] border-transparent hover:border-secondary hover:-translate-y-2 transition-all duration-300 flex flex-col items-center group cursor-pointer"
                    >
                        <div className="text-primary group-hover:text-secondary transition-colors duration-300">
                            {card.icon}
                        </div>
                        <h3 className="text-xl md:text-2xl font-extrabold">{card.title}</h3>
                    </a>
                ))}
            </div>

            {/* Section 2: Management & Coordination */}
            <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-extrabold text-primary/60 relative inline-block">
                    إدارة وتنسيق العمل
                    <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gray-200 rounded-full" />
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
                {managementCards.map((card, idx) => (
                    <a
                        key={idx}
                        href={card.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group p-6 rounded-2xl border-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm flex flex-col items-center text-center ${card.color}`}
                    >
                        <div className="group-hover:scale-110 transition-transform">
                            {card.icon}
                        </div>
                        <h3 className="text-lg font-extrabold">{card.title}</h3>
                        <p className="text-xs mt-2 opacity-60 font-bold">اضغط للانتقال للمنصة</p>
                    </a>
                ))}
            </div>
        </div>
    );
};
