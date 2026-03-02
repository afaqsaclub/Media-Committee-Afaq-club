import React from 'react';

export const CalendarSlide: React.FC = () => {
    return (
        <div className="flex flex-col items-center min-h-full px-4 pt-12 pb-24 w-full h-full">
            <div className="text-center mb-12 shrink-0">
                <h2 className="text-3xl md:text-5xl font-extrabold text-primary relative inline-block">
                    تقويم اللجنة الإعلامية
                    <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-1.5 bg-secondary rounded-full" />
                </h2>
            </div>

            <div className="w-full max-w-5xl flex-1 bg-white rounded-2xl shadow-lg border-2 border-transparent hover:border-secondary transition-colors duration-300 overflow-hidden min-h-[500px]">
                <iframe
                    src="https://calendar.google.com/calendar/embed?src=afaq.sa.club%40gmail.com&ctz=Asia%2FRiyadh&showTitle=0&showPrint=0&showTabs=1&showCalendars=0&hl=ar"
                    className="w-full h-full border-none"
                    title="تقويم نادي آفاق"
                />
            </div>
        </div>
    );
};
