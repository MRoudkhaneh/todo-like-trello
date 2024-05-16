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
}
export const Card: FC<PropsWithChildren<TCard>> = ({
                                                       expandable,
                                                       expanded,
                                                       children
                                                   }) => {
    return (
        <div className={Style.card_wrapper}>
            <div className={Style.card_wrapper_own}>
                <div className={Style.card_detail}>
                    {expandable ? <IconChevronRight
                        className={[Style.card_chevron, expanded ? Style.card_chevron_expanded : ''].join(' ')}/> : null}
                    <input
                        placeholder='Title'
                        type='text'
                        maxLength={128}
                        className={Style.card_detail_tile}
                    />
                </div>
                <div className={Style.card_option}>
                    <div className={Style.card_option_wrapper}>
                        <IconChevronsUp size={18}/>
                    </div>
                    <div className={Style.card_option_wrapper}>
                        <IconChevronsDown size={18}/>
                    </div>
                    <div className={Style.card_option_wrapper}>
                        <IconTrash size={18}/>
                    </div>
                    <div className={Style.card_option_wrapper}>
                        <IconSquarePlus size={18}/>
                    </div>
                </div>
            </div>
            {expanded ? (children) : null}
        </div>
    )
}