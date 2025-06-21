import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, Settings, FileText, Star, BookOpen, MessageSquare, Eye, Cog, LogOut, User, Briefcase, FileBarChart, Menu } from 'lucide-react';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: route('admin.dashboard'),
        icon: LayoutGrid,
    },
    {
        title: 'Profile',
        href: route('admin.profile'),
        icon: User,
    },
];

const contentNavItems: NavItem[] = [
    {
        title: 'Services Management',
        href: route('admin.services'),
        icon: Settings,
    },
    {
        title: 'Portfolio Management',
        href: route('admin.projects'),
        icon: Briefcase,
    },
    {
        title: 'Skills',
        href: route('admin.skills'),
        icon: Star,
    },
    {
        title: 'Resume',
        href: route('admin.resume'),
        icon: FileBarChart,
    },
    {
        title: 'Testimonials',
        href: route('admin.testimonials'),
        icon: MessageSquare,
    },
];

const communicationItems: NavItem[] = [
    {
        title: 'Messages',
        href: route('admin.messages'),
        icon: MessageSquare,
    },
];

const settingsItems: NavItem[] = [
    {
        title: 'Navbar & Logo',
        href: route('admin.navbar'),
        icon: Menu,
    },
    {
        title: 'Appearance',
        href: route('admin.appearance'),
        icon: Eye,
    },
    {
        title: 'Settings',
        href: route('admin.settings'),
        icon: Cog,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Logout',
        href: route('logout'),
        icon: LogOut,
        method: 'post',
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset" className="h-full">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={route('admin.dashboard')} prefetch className="flex items-center">
                                <div className="w-8 h-8 bg-[#20B2AA] rounded-full flex items-center justify-center text-white font-bold mr-2">
                                    P
                                </div>
                                <span className="text-lg font-semibold">Dynamic Portfolio</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
                
                <div className="px-3 pt-4">
                    <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-gray-500 dark:text-gray-400">
                        CONTENT MANAGEMENT
                    </h2>
                    <NavMain items={contentNavItems} />
                </div>
                
                <div className="px-3 pt-4">
                    <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-gray-500 dark:text-gray-400">
                        COMMUNICATION
                    </h2>
                    <NavMain items={communicationItems} />
                </div>
                
                <div className="px-3 pt-4">
                    <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-gray-500 dark:text-gray-400">
                        SETTINGS
                    </h2>
                    <NavMain items={settingsItems} />
                </div>
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
