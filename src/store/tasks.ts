import {action, makeObservable, observable, runInAction} from "mobx";
import {TTask} from "./type.task";

class TasksStore {
    tasks: TTask[] = [
        {
            id: '1',
            title: "Main Task 1",
            order: 1,
            parentTaskId: null,
            expandable: true,
            expanded: true,
            subTask: [
                {
                    id: '12',
                    title: "Nested 1-1",
                    order: 1,
                    parentTaskId: '',
                    expandable: true,
                    expanded: true,
                    subTask: [
                        {
                            id: '123',
                            title: "Nested 1-1-1",
                            order: 1,
                            parentTaskId: '12',
                            expandable: false,
                            expanded: false,
                            subTask: [],
                        },
                        {
                            id: '124',
                            title: "Nested 1-1-2",
                            order: 2,
                            parentTaskId: '12',
                            expandable: false,
                            expanded: false,
                            subTask: [],
                        }
                    ],
                }
            ],
        },
        {
            id: '2',
            title: "Main Task 2",
            order: 2,
            parentTaskId: null,
            expandable: false,
            expanded: false,
            subTask: [],
        },
        {
            id: '3',
            title: "Main Task 3",
            order: 3,
            parentTaskId: null,
            expandable: false,
            expanded: false,
            subTask: [],
        },
    ];

    constructor() {
        makeObservable(this, {
            tasks: observable,
            changeTaskTitle: action,
            addNestedTask: action,
            deleteTask: action,
            changeOrder: action,
            toggleExpanded: action
        });
    }

    changeTaskTitle = ({newTitle, taskId}: { taskId: string, newTitle: string }) => {
        const updateTitleRecursively = (tasks: TTask[]) => {
            return tasks.map(task => {
                if (task.id === taskId) {
                    task.title = newTitle;
                }
                if (task.subTask && task.subTask.length > 0) {
                    task.subTask = updateTitleRecursively(task.subTask);
                }
                return task;
            });
        };
        runInAction(() => {
            this.tasks = updateTitleRecursively(this.tasks);
        });
    };
    addNestedTask = ({parentTaskId}: { parentTaskId: string }) => {
        const addNestedRecursively = (tasks: TTask[]): TTask[] => {
            return tasks.map((task) => {
                if (task.id === parentTaskId) {
                    task.expandable = true;
                    task.expanded = true;
                    const maxOrder = task.subTask?.reduce((max, t) => Math.max(max, t.order), 0) || 0;
                    const newTask: TTask = {
                        id: crypto.randomUUID(),
                        title: "New task",
                        order: maxOrder + 1,
                        parentTaskId: task.id,
                        expandable: false,
                        expanded: false,
                        subTask: [],
                    };
                    task.subTask = [...(task.subTask || []), newTask];
                    return task
                }
                if (task.subTask?.length) {
                    task.subTask = addNestedRecursively(task.subTask);
                }
                return task;
            });
        };

        runInAction(() => {
            this.tasks = addNestedRecursively(this.tasks);
        });
    };
    deleteTask = ({id}: { id: string }) => {
        const deleteRecursively = (tasks: TTask[]): TTask[] => {
            return tasks.filter(task => task.id !== id)
                .map(task => {
                    if (task.subTask?.length) {
                        task.subTask = deleteRecursively(task.subTask);
                    }
                    return task;
                });
        };
        runInAction(() => {
            this.tasks = deleteRecursively(this.tasks);
        });
    }
    changeOrder = ({id, position}: { id: string, position: 'up' | 'down' }) => {
        const changeOrderRecursively = (tasks: TTask[], parentId: null | string = null) => {
            return tasks.map((task, index, tasks) => {
                if (task.id === id) {
                    if (position === 'up' && index > 0) {
                        [tasks[index].order, tasks[index - 1].order] = [tasks[index - 1].order, tasks[index].order];
                    }
                    if (position === 'down' && index < tasks.length - 1) {
                        [tasks[index].order, tasks[index + 1].order] = [tasks[index + 1].order, tasks[index].order];
                    }
                }
                if (task.subTask) {
                    task.subTask = changeOrderRecursively(task.subTask, task.id);
                }
                return task;
            }).sort((a, b) => a.order - b.order);
        };

        runInAction(() => {
            this.tasks = changeOrderRecursively(this.tasks);
        });
    };

    toggleExpanded = ({id}: { id: string }) => {
        const changeToggleExpandedRecursively = (tasks: TTask[]) => {
            return tasks.map(task => {
                if (task.id === id) {
                    task.expanded = !task.expanded;
                }
                if (task.subTask) {
                    task.subTask = changeToggleExpandedRecursively(task.subTask);
                }
                return task;
            });
        }
        runInAction(() => {
            this.tasks = changeToggleExpandedRecursively(this.tasks);
        });
    }
}

export default new TasksStore();
