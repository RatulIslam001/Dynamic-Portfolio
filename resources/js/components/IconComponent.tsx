import React from 'react';
import { 
    Code, 
    Search, 
    Smartphone, 
    BarChart3, 
    FileText, 
    Layout, 
    Globe, 
    Zap, 
    PenTool,
    Monitor,
    Database,
    Server,
    ShieldCheck,
    MessageSquare,
    Mail,
    ShoppingBag,
    GitBranch,
    Shield,
    BarChart2
} from 'lucide-react';

interface IconComponentProps {
    icon: string;
    className?: string;
    style?: React.CSSProperties;
}

export const IconComponent: React.FC<IconComponentProps> = ({ icon, className, style }) => {
    const iconMap: { [key: string]: React.ElementType } = {
        'code': Code,
        'search': Search,
        'smartphone': Smartphone,
        'bar-chart': BarChart3,
        'file-text': FileText,
        'layout': Layout,
        'globe': Globe,
        'zap': Zap,
        'pen-tool': PenTool,
        'monitor': Monitor,
        'database': Database,
        'server': Server,
        'shield-check': ShieldCheck,
        'message-square': MessageSquare,
        'mail': Mail,
        'shopping-bag': ShoppingBag,
        'git-branch': GitBranch,
        'shield': Shield,
        'bar-chart-2': BarChart2
    };

    const IconComponent = iconMap[icon] || Code; // Default to Code if icon not found
    
    return <IconComponent className={className} style={style} />;
}; 