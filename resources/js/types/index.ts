export interface Experience {
    id: number;
    position: string;
    company: string;
    location: string;
    start_date: string;
    end_date: string | null;
    is_current: boolean;
    description: string;
    order: number;
} 