import type {Dispatch, JSX} from 'react';
import {createContext, useContext, useReducer} from 'react';
import type {HistoryItem} from "../../../store/history";

type EditHistoryContext = HistoryItem[]|null;
type EditHistoryAction = HistoryItem|null|true|false;

const EditHistoryContext = createContext<EditHistoryContext>(null);
const EditHistoryDispatchContext = createContext<Dispatch<HistoryItem>>(() => null);

export function EditHistoryProvider({children}): JSX.Element {
    const [edit, dispatch] = useReducer(
        (prevState: EditHistoryContext, action: EditHistoryAction) => {
            if (action === false || action === null) {
                return null
            }

            if (action === true) {
                return []
            }

            if (prevState === null) {
                return [action]
            }

            const selectedIds = prevState.map(item => item.id)

            if (selectedIds.includes(action.id)) {
                return prevState.filter(item => item.id !== action.id)
            } else {
                return [...prevState, action]

            }
        },
        null
    )

    return (
        <EditHistoryContext.Provider value={edit}>
            <EditHistoryDispatchContext.Provider value={dispatch}>
                {children}
            </EditHistoryDispatchContext.Provider>
        </EditHistoryContext.Provider>
    );
}

export function useEditHistory(): EditHistoryContext {
    return useContext(EditHistoryContext);
}

export function useEditHistoryDispatch(): Dispatch<EditHistoryAction> {
    return useContext(EditHistoryDispatchContext);
}
