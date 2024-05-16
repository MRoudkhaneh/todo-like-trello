import {FC, PropsWithChildren} from "react";
import Style from './style.module.scss';
import {
    IconChevronRight,
    IconChevronsDown,
    IconChevronsUp,
    IconSquarePlus,
    IconTrash
} from "@tabler/icons-react";

//TODO: add functionality for handle logic
type TCard = {
    expandable: boolean
    expanded?: boolean
    title: string,
    id: string,
    parentId: string | null,
    onChange: (e: string) => void
    handleToggleExpanded: (id: string) => void
    addNestedTask: (parentId: string) => void
    handleOrderChange: (id: string, parentId: string | null, position: 'up' | 'down') => void;
    deleteTask: (id: string) => void
}
export const Card: FC<PropsWithChildren<TCard>> = ({
                                                       expandable,
                                                       expanded,
                                                       children,
                                                       title,
                                                       id,
                                                       parentId,
                                                       handleToggleExpanded,
                                                       onChange,
                                                       addNestedTask,
                                                       handleOrderChange,
                                                       deleteTask
                                                   }) => {
    return (
        <div className={Style.card_wrapper}>
            <div className={Style.card_wrapper_own}>
                <div className={Style.card_detail}>
                    {expandable ? <IconChevronRight
                        onClick={() => {
                            handleToggleExpanded(id)
                        }}
                        className={[Style.card_chevron, expanded ? Style.card_chevron_expanded : ''].join(' ')}/> : null}
                    <input
                        placeholder='Title'
                        type='text'
                        value={title}
                        onChange={(e) => onChange(e.target.value)}
                        maxLength={128}
                        className={Style.card_detail_tile}
                    />
                </div>
                <div className={Style.card_option}>
                    <div className={Style.card_option_wrapper}
                         onClick={() => {
                             handleOrderChange(id, parentId, 'up')
                         }}>
                        <IconChevronsUp size={18}/>
                    </div>
                    <div className={Style.card_option_wrapper} onClick={() => {
                        handleOrderChange(id, parentId, 'down')
                    }}>
                        <IconChevronsDown size={18}/>
                    </div>
                    <div className={Style.card_option_wrapper}
                         onClick={() => {
                             deleteTask(id)
                         }}>
                        <IconTrash size={18}/>
                    </div>
                    <div className={Style.card_option_wrapper} onClick={() => {
                        addNestedTask(id)
                    }}>
                        <IconSquarePlus size={18}/>
                    </div>
                </div>
            </div>
            {expanded ? (children) : null}
        </div>
    )
}