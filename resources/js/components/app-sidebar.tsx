import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, Settings, FileText, Star, BookOpen, MessageSquare, Eye, Cog, LogOut } from 'lucide-react';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: route('admin.dashboard'),
        icon: LayoutGrid,
    },
    {
        title: 'Services',
        href: route('admin.services'),
        icon: Settings,
    },
    {
        title: 'Projects',
        href: route('admin.projects'),
        icon: FileText,
    },
    {
        title: 'Skills',
        href: route('admin.skills'),
        icon: Star,
    },
    {
        title: 'Resume',
        href: route('admin.resume'),
        icon: BookOpen,
    },
    {
        title: 'Testimonials',
        href: route('admin.testimonials'),
        icon: MessageSquare,
    },
    {
        title: 'Messages',
        href: route('admin.messages'),
        icon: MessageSquare,
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
                                <span className="text-lg font-semibold">Portfolio Admin</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
