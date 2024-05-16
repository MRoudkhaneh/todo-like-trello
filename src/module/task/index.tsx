import {observer} from "mobx-react";
import useStores from "../../hooks/useStores";
import {RecursiveTask} from "./components";

export const TaskModule = observer(() => {
    const {TasksStore} = useStores();

    return (
        <div>
            {TasksStore?.tasks?.map(item => {
                return <RecursiveTask task={item} key={item.id}/>
            })}
        </div>
    );
});
