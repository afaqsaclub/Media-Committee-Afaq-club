import React from 'react';

const policies = [
    { title: 'الالتزام والسلوك', desc: 'التعامل باحترام ويُمنع أي إساءة أو تنمر.' },
    { title: 'العضوية والانتماء', desc: 'العضوية تطوعية ومرتبطة بقيم النادي.' },
    { title: 'الخصوصية والأمان', desc: 'تُحترم خصوصية الأعضاء ويُمنع تداول معلوماتهم.' },
    { title: 'الأنشطة والفعاليات', desc: 'تخضع الفعاليات للموافقة ولا يُسمح بالعمل دون اعتماد.' },
];

export const PoliciesSlide: React.FC = () => {
    return (
        <div className="flex flex-col items-center min-h-full px-4 pt-12 pb-24">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-extrabold text-primary relative inline-block">
                    السياسات العامة
                    <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-1.5 bg-secondary rounded-full" />
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                {policies.map((policy, idx) => (
                    <div
                        key={idx}
                        className="bg-white p-6 rounded-xl border-r-[6px] border-primary shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                    >
                        <h4 className="text-xl font-bold text-primary mb-3">{policy.title}</h4>
                        <p className="text-primary/80 leading-relaxed font-medium">
                            {policy.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};
