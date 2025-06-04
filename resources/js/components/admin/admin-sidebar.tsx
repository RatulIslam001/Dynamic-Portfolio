import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, User, Settings, FileText, Star, BookOpen, MessageSquare, Eye, Cog, LogOut, Briefcase, FolderKanban } from 'lucide-react';
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
                'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-[#20B2AA]/5',
                isActive && 'bg-[#20B2AA]/10 text-[#20B2AA] hover:bg-[#20B2AA]/15'
            )}
        >
            <Icon className="h-5 w-5" />
            <span className="text-sm font-medium">{children}</span>
        </Link>
    );
};

export function AdminSidebar() {
    const { url } = usePage();

    const isActive = (path: string) => {
        // Convert route to URL for comparison
        const routeUrl = new URL(path, window.location.origin).pathname;
        return url.startsWith(routeUrl);
    };

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
                    isActive={isActive(route('admin.dashboard'))}
                >
                    Dashboard
                </NavItem>
                <NavItem 
                    href={route('admin.profile')} 
                    icon={User}
                    isActive={isActive(route('admin.profile'))}
                >
                    Profile
                </NavItem>

                {/* Content Management Section */}
                <div className="pt-4">
                    <div className="px-3 mb-2">
                        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Content Management</h2>
                    </div>
                <NavItem 
                    href={route('admin.services')} 
                        icon={Briefcase}
                    isActive={isActive(route('admin.services'))}
                >
                        Services Management
                </NavItem>
                <NavItem 
                    href={route('admin.projects')} 
                        icon={FolderKanban}
                    isActive={isActive(route('admin.projects'))}
                >
                        Portfolio Management
                </NavItem>
                <NavItem 
                    href={route('admin.skills')} 
                    icon={Star}
                    isActive={isActive(route('admin.skills'))}
                >
                    Skills
                </NavItem>
                <NavItem 
                    href={route('admin.resume')} 
                    icon={BookOpen}
                    isActive={isActive(route('admin.resume'))}
                >
                    Resume
                </NavItem>
                <NavItem 
                    href={route('admin.testimonials')} 
                    icon={MessageSquare}
                    isActive={isActive(route('admin.testimonials'))}
                >
                    Testimonials
                </NavItem>
                </div>

                {/* Communication Section */}
                <div className="pt-4">
                    <div className="px-3 mb-2">
                        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Communication</h2>
                    </div>
                <NavItem 
                    href={route('admin.messages')} 
                    icon={MessageSquare}
                    isActive={isActive(route('admin.messages'))}
                >
                    Messages
                </NavItem>
                </div>

                {/* Settings Section */}
                <div className="pt-4">
                    <div className="px-3 mb-2">
                        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Settings</h2>
                    </div>
                <NavItem 
                    href={route('admin.appearance')} 
                    icon={Eye}
                    isActive={isActive(route('admin.appearance'))}
                >
                    Appearance
                </NavItem>
                <NavItem 
                    href={route('admin.settings')} 
                    icon={Cog}
                    isActive={isActive(route('admin.settings'))}
                >
                    Settings
                </NavItem>
                </div>
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