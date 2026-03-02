import React from 'react';

const OrgBox = ({ children, isMain = false }: { children: React.ReactNode, isMain?: boolean }) => (
    <div className={`px-6 py-3 rounded-lg font-bold text-center border-2 whitespace-nowrap shadow-sm mb-4 transition-transform hover:scale-105 ${isMain
            ? 'bg-primary text-white border-secondary min-w-[200px]'
            : 'bg-white text-primary border-primary min-w-[150px]'
        }`}>
        {children}
    </div>
);

const CommitteeCol = ({ title, roles }: { title: string, roles: string[] }) => (
    <div className="bg-white p-4 rounded-xl border-t-4 border-primary shadow-md flex-1 min-w-[250px] max-w-[350px] flex flex-col items-center">
        <div className="bg-secondary text-primary px-4 py-2 rounded-md font-extrabold text-center w-full mb-4">
            {title}
        </div>
        {roles.map((role, idx) => (
            <div key={idx} className="bg-gray-50 border border-gray-200 w-full text-center py-2 rounded-md mb-2 text-sm font-medium">
                {role}
            </div>
        ))}
    </div>
);

export const OrgChartSlide: React.FC = () => {
    return (
        <div className="flex flex-col items-center min-h-full px-4 pt-12 pb-24">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-extrabold text-primary relative inline-block">
                    الهيكل التنظيمي
                    <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-1.5 bg-secondary rounded-full" />
                </h2>
            </div>

            <div className="flex flex-col items-center w-full max-w-5xl">
                <OrgBox isMain>رئيس النادي</OrgBox>

                {/* Connection Line */}
                <div className="w-0.5 h-8 bg-primary/30 -mt-4 mb-4" />

                <div className="flex flex-wrap justify-center gap-4 md:gap-8 w-full">
                    <OrgBox>نائب الرئيس</OrgBox>
                    <OrgBox>نائب التقنية</OrgBox>
                    <OrgBox>نائب الأعضاء</OrgBox>
                </div>

                {/* Connection Line */}
                <div className="w-0.5 h-12 bg-primary/30 -mt-4 mb-8 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 md:w-64 h-0.5 bg-primary/30" />
                </div>

                <div className="flex flex-wrap justify-center gap-6 w-full">
                    <CommitteeCol
                        title="اللجنة الإعلامية"
                        roles={['رئيس اللجنة', 'التصميم والمونتاج', 'إدارة المحتوى']}
                    />
                    <CommitteeCol
                        title="لجنة التشغيل"
                        roles={['رئيس اللجنة', 'قائد فريق اقرأ', 'قائد فريق الفنون', 'قائد فريق الرياضات']}
                    />
                </div>
            </div>
        </div>
    );
};
