export interface Task {
    name: string;
    category?: string;
    count?: number;
    completed: boolean;
    completedBy: string;
}