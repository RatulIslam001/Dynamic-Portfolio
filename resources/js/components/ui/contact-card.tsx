import { LucideIcon } from 'lucide-react';

interface ContactCardProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    value: string;
}

export function ContactCard({ icon, title, subtitle, value }: ContactCardProps) {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-[#E6F7F6] dark:bg-opacity-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    {icon}
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-1 dark:text-white">{title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">{subtitle}</p>
                    <p className="text-[#20B2AA] font-medium hover:text-[#1a9994] transition-colors cursor-pointer">{value}</p>
                </div>
            </div>
        </div>
    );
} 