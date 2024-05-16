import {FC} from "react";
import {TTask} from "../../../../store/type.task";
import {Card} from "../../../../components";
import {trace} from "mobx";

export const RecursiveTask: FC<{
    task: TTask,
    onChangeTaskTitle: (id: string, value: string) => void
    addNestedTask: (parentId: string) => void
    deleteTask: (id: string) => void
    handleToggleExpanded: (id: string) => void
    handleOrderChange: (id: string, parentId: string | null, position: 'up' | 'down') => void;
}> = ({task, onChangeTaskTitle, addNestedTask, deleteTask, handleOrderChange, handleToggleExpanded}) => {
    if (task.parentTaskId === null) {
        console.log(task.order, task.id)
    }

    return (
        <Card key={task.id}
              title={task.id}
              parentId={task.parentTaskId}
              onChange={(value) => {
                  onChangeTaskTitle(task.id, value)
              }}
              handleToggleExpanded={handleToggleExpanded}
              handleOrderChange={handleOrderChange}
              deleteTask={deleteTask}
              id={task.id}
              addNestedTask={addNestedTask}
              expandable={task.expandable}
              expanded={task.expanded}>
            {
                task.subTask?.map(subTask => (
                    <RecursiveTask key={subTask.id}
                                   task={subTask}
                                   addNestedTask={addNestedTask}
                                   handleOrderChange={handleOrderChange}
                                   deleteTask={deleteTask}
                                   handleToggleExpanded={handleToggleExpanded}
                                   onChangeTaskTitle={onChangeTaskTitle}
                    />
                ))
            }
        </Card>
    );
};