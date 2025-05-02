import { Link } from '@inertiajs/react';
import { LayoutGrid, User, Settings, FileText, Star, BookOpen, MessageSquare, Eye, Cog, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
    href: string;
    icon: React.ElementType;
    children: React.ReactNode;
    isActive?: boolean;
    method?: 'get' | 'post';
}

const NavItem = ({ href, icon: Icon, children, isActive, method = 'get' }: NavItemProps) => {
    return (
        <Link
            href={href}
            method={method}
            className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900',
                isActive && 'bg-[#20B2AA]/10 text-[#20B2AA]'
            )}
        >
            <Icon className="h-5 w-5" />
            <span className="text-sm font-medium">{children}</span>
        </Link>
    );
};

export function AdminSidebar() {
    const currentPath = window.location.pathname;

    return (
        <div className="flex h-full flex-col">
            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-4">
                <Link href={route('admin.dashboard')} className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#20B2AA] text-white">
                        P
                    </div>
                    <span className="text-lg font-semibold text-gray-900">Portfolio Admin</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-3 py-4">
                <NavItem 
                    href={route('admin.dashboard')} 
                    icon={LayoutGrid}
                    isActive={currentPath === route('admin.dashboard')}
                >
                    Dashboard
                </NavItem>
                <NavItem 
                    href={route('admin.profile')} 
                    icon={User}
                    isActive={currentPath === route('admin.profile')}
                >
                    Profile
                </NavItem>
                <NavItem 
                    href={route('admin.services')} 
                    icon={Settings}
                    isActive={currentPath === route('admin.services')}
                >
                    Services
                </NavItem>
                <NavItem 
                    href={route('admin.projects')} 
                    icon={FileText}
                    isActive={currentPath === route('admin.projects')}
                >
                    Projects
                </NavItem>
                <NavItem 
                    href={route('admin.skills')} 
                    icon={Star}
                    isActive={currentPath === route('admin.skills')}
                >
                    Skills
                </NavItem>
                <NavItem 
                    href={route('admin.resume')} 
                    icon={BookOpen}
                    isActive={currentPath === route('admin.resume')}
                >
                    Resume
                </NavItem>
                <NavItem 
                    href={route('admin.testimonials')} 
                    icon={MessageSquare}
                    isActive={currentPath === route('admin.testimonials')}
                >
                    Testimonials
                </NavItem>
                <NavItem 
                    href={route('admin.messages')} 
                    icon={MessageSquare}
                    isActive={currentPath === route('admin.messages')}
                >
                    Messages
                </NavItem>
                <NavItem 
                    href={route('admin.appearance')} 
                    icon={Eye}
                    isActive={currentPath === route('admin.appearance')}
                >
                    Appearance
                </NavItem>
                <NavItem 
                    href={route('admin.settings')} 
                    icon={Cog}
                    isActive={currentPath === route('admin.settings')}
                >
                    Settings
                </NavItem>
            </nav>

            {/* Footer */}
            <div className="border-t border-gray-200 px-3 py-4">
                <NavItem 
                    href={route('logout')} 
                    icon={LogOut}
                    method="post"
                >
                    Logout
                </NavItem>
            </div>
        </div>
    );
} 