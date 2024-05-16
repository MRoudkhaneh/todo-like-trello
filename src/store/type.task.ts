export type TTask = {
    id: number;
    title: string;
    order: number;
    parentTaskId: null | number;
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