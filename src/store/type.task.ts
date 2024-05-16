export type TTask = {
    id: string;
    title: string;
    order: number;
    parentTaskId: null | string;
    expanded: boolean
    expandable: boolean
    subTask?: TTask[]
}



interface TaskStore {
    tasks: TTask[];
}

export interface  RootStore  {
    TasksStore: TaskStore;
}