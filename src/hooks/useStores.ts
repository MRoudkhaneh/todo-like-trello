import {useContext} from "react";
import {MobXProviderContext} from "mobx-react";
import {RootStore} from "../store/type.task";

function useStores(): RootStore {
    return useContext(MobXProviderContext) as RootStore;
}

export default useStores;
