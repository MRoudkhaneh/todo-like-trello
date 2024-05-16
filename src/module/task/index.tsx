import {observer} from "mobx-react";
import useStores from "../../hooks/useStores";
import {RecursiveTask} from "./components";
import tasks from "../../store/tasks";

export const TaskModule = observer(() => {
    const {TasksStore} = useStores();
    const handleTitleChange = (id: string, value: string) => {
        tasks.changeTaskTitle({taskId: id, newTitle: value});
    };
    const handleOrderChange = (id: string, parentId: string | null, position: 'up' | 'down') => {
        tasks.changeOrder({id, position});
    };
    const handleAddNewNestedTask = (parentId: string) => {
        tasks.addNestedTask({parentTaskId: parentId});
    };
    const handleDeleteTask = (id: string) => {
        tasks.deleteTask({id});
    };
    const handleToggleExpanded = (id: string) => {
        tasks.toggleExpanded({id});
    };


    return (
        <div>
            {TasksStore?.tasks?.map(item => {
                return <RecursiveTask task={item}
                                      key={item.id}
                                      handleToggleExpanded={handleToggleExpanded}
                                      handleOrderChange={handleOrderChange}
                                      deleteTask={handleDeleteTask}
                                      addNestedTask={handleAddNewNestedTask}
                                      onChangeTaskTitle={handleTitleChange}/>
            })}
        </div>
    );
});
