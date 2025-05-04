declare module '@hello-pangea/dnd' {
    import * as React from 'react';

    export type DraggableId = string;
    export type DroppableId = string;

    export interface DraggableLocation {
        droppableId: DroppableId;
        index: number;
    }

    export interface DropResult {
        draggableId: DraggableId;
        type: string;
        source: DraggableLocation;
        destination: DraggableLocation | null;
        reason: 'DROP' | 'CANCEL';
    }

    export interface DroppableProvided {
        innerRef: (element: HTMLElement | null) => void;
        placeholder?: React.ReactElement;
        droppableProps: {
            'data-rbd-droppable-id': string;
            'data-rbd-droppable-context-id': string;
        };
    }

    export interface DraggableProvided {
        innerRef: (element: HTMLElement | null) => void;
        draggableProps: {
            'data-rbd-draggable-context-id': string;
            'data-rbd-draggable-id': string;
        };
        dragHandleProps: {
            'data-rbd-drag-handle-draggable-id': string;
            'data-rbd-drag-handle-context-id': string;
            role: string;
            'aria-describedby': string;
            tabIndex: number;
            draggable: boolean;
            onDragStart: (event: React.DragEvent<HTMLElement>) => void;
        } | null;
    }

    export interface DroppableProps {
        droppableId: DroppableId;
        children: (provided: DroppableProvided) => React.ReactElement;
    }

    export interface DraggableProps {
        draggableId: DraggableId;
        index: number;
        children: (provided: DraggableProvided) => React.ReactElement;
    }

    export interface DragDropContextProps {
        onDragEnd: (result: DropResult) => void;
        children: React.ReactNode;
    }

    export const DragDropContext: React.FC<DragDropContextProps>;
    export const Droppable: React.FC<DroppableProps>;
    export const Draggable: React.FC<DraggableProps>;
} 