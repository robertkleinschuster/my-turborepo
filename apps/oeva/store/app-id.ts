import {create} from "zustand";
import {persist} from "zustand/middleware";
import { v4 as uuidv4 } from 'uuid';

interface AppId {
    appId: string,
}

export const useAppId = (): string => create(persist<AppId>(
    () => ({
        appId: uuidv4(),
    }),
    {
        name: 'app-id',
    }
))(state => state.appId)

