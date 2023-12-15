import type {Dispatch, JSX, ReactNode} from 'react';
import {createContext, useContext, useReducer} from 'react';

export type ListSelection<T> = T[] | null;
type ListSelectionAction<T> = T | null | true | false;

export function createListSelection<T>(reducer: (prevState: ListSelection<T>, action: T) => ListSelection<T>) {
    const ListSelectionContext = createContext<ListSelection<T>>(null);
    const ListSelectionDispatchContext = createContext<Dispatch<T>>(() => null);

    function ListSelectionProvider({children}: { children: ReactNode }): JSX.Element {
        const [edit, dispatch] = useReducer(
            (prevState: ListSelection<T>, action: ListSelectionAction<T>) => {
                if (action === false || action === null) {
                    return null
                }

                if (action === true) {
                    return []
                }

                return reducer(prevState, action);
            },
            null
        )

        return (
            <ListSelectionContext.Provider value={edit}>
                <ListSelectionDispatchContext.Provider value={dispatch}>
                    {children}
                </ListSelectionDispatchContext.Provider>
            </ListSelectionContext.Provider>
        );
    }

    const useListSelection = (): ListSelection<T> => {
        return useContext(ListSelectionContext);
    }

    const useListSelectionDispatch = (): Dispatch<ListSelectionAction<T>> => {
        return useContext(ListSelectionDispatchContext);
    }

    return {
        ListSelectionProvider,
        useListSelection,
        useListSelectionDispatch
    }
}

export interface IdAware {
    id: string
}

export function IdAwareReducer(prevState: ListSelection<IdAware>, action: IdAware): ListSelection<IdAware> {
    if (prevState === null) {
        return [action]
    }

    const selectedIds = prevState.map(item => item.id)

    if (selectedIds.includes(action.id)) {
        return prevState.filter(item => item.id !== action.id)
    } else {
        return [...prevState, action]

    }
}

export function IdReducer(prevState: ListSelection<string>, action: string): ListSelection<string> {
    if (prevState === null) {
        return [action]
    }


    if (prevState.includes(action)) {
        return prevState.filter(item => item !== action)
    } else {
        return [...prevState, action]

    }
}

const {ListSelectionProvider, useListSelection, useListSelectionDispatch} = createListSelection<string>(IdReducer)

export {
    ListSelectionProvider,
    useListSelection,
    useListSelectionDispatch,
}