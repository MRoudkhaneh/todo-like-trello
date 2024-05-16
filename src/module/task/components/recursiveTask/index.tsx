import {FC} from "react";
import {TTask} from "../../../../store/type.task";
import {Card} from "../../../../components";

export const RecursiveTask: FC<{ task: TTask }> = ({task}) => {
    return (
        <Card key={task.id}
              title={task.title}
              expandable={task.expandable}
              expanded={task.expanded}>
            {
                task.subTask?.map(subTask => (
                    <RecursiveTask key={subTask.id} task={subTask}
                    />
                ))
            }
        </Card>
    );
};