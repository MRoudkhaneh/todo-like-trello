import {makeObservable, observable} from "mobx";
import {TTask} from "./type.task";

class TasksStore {
    label = "دیجی اکسپرس‌";
    tasks: TTask[] = [
        {
            id: 1,
            title: "Main Task",
            order: 1,
            parentTaskId: null,
            expandable: true,
            expanded: true,
            subTask: [
                {
                    id: 2,
                    title: "Main Task",
                    order: 1,
                    parentTaskId: 1,
                    expandable: true,
                    expanded: true,
                    subTask: [
                        {
                            id: 3,
                            title: "Main Task",
                            order: 1,
                            parentTaskId: 2,
                            expandable: false,
                            expanded: false,
                            subTask: [],
                        }
                    ],
                }
            ],
        }
    ];

    constructor() {
        makeObservable(this, {
            label: observable,
            tasks: observable,
        });
    }

    // TODO - add needed methods to manipulate 'tasks'
}

export default new TasksStore();
