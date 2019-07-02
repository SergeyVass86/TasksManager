export interface Task {
    id: number;
    parentId?: number;
    title: string;
    description: string;
    status: number;
    subtasks?: Task[];
}
