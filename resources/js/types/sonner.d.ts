declare module 'sonner' {
    export interface ToastProps {
        message: string;
        duration?: number;
        position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
    }

    export interface Toast {
        success: (message: string, options?: Omit<ToastProps, 'message'>) => void;
        error: (message: string, options?: Omit<ToastProps, 'message'>) => void;
        info: (message: string, options?: Omit<ToastProps, 'message'>) => void;
        warning: (message: string, options?: Omit<ToastProps, 'message'>) => void;
    }

    export const toast: Toast;
} 