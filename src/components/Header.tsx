import React from 'react';
import { cn } from '../utils/cn';

interface HeaderProps {
    currentSlide: number;
    onNavigate: (index: number) => void;
}

const navItems = [
    { label: 'النماذج', index: 0 },
    { label: 'السياسات', index: 1 },
    { label: 'الهيكل', index: 2 },
    { label: 'التقويم', index: 3 },
    { label: 'الأخبار', index: 4 },
    { label: 'المهام', index: 5 },
];

export const Header: React.FC<HeaderProps> = ({ currentSlide, onNavigate }) => {
    return (
        <header className="bg-primary h-20 md:h-24 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center shadow-md border-b-4 border-secondary z-50 shrink-0">
            <div className="flex items-center gap-3 text-white h-full py-2">
                <img
                    src="https://i.ibb.co/3y9CFHGr/image.png"
                    alt="شعار نادي آفاق"
                    className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full p-1 object-contain"
                />
                <div>
                    <h1 className="text-lg md:text-2xl font-extrabold leading-tight">نادي آفاق</h1>
                    <p className="text-xs md:text-sm opacity-90">اللجنة الإعلامية</p>
                </div>
            </div>

            <nav className="flex gap-2 md:gap-6 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide justify-center md:justify-end">
                {navItems.map((item) => (
                    <button
                        key={item.index}
                        onClick={() => onNavigate(item.index)}
                        className={cn(
                            "text-white text-sm md:text-lg font-bold transition-all px-2 py-1 md:py-2 relative whitespace-nowrap",
                            currentSlide === item.index ? "text-secondary" : "hover:text-secondary/80"
                        )}
                    >
                        {item.label}
                        {currentSlide === item.index && (
                            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-secondary rounded-t-sm" />
                        )}
                    </button>
                ))}
            </nav>
        </header>
    );
};
