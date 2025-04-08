import { LucideIcon } from 'lucide-react';

interface ContactCardProps {
    icon: LucideIcon;
    title: string;
    subtitle: string;
    info: string;
}

export function ContactCard({ icon: Icon, title, subtitle, info }: ContactCardProps) {
    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#E6F7F6] rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#20B2AA]" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-1">{title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{subtitle}</p>
                    <p className="text-[#20B2AA]">{info}</p>
                </div>
            </div>
        </div>
    );
} 