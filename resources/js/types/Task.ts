export type Task = {
    id: number;
    title: string;
    description: string;
    status: 'not_started' | 'in_progress' | 'completed';
    deadline?: string;
};
