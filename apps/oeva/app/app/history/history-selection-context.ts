import {createListSelection, IdAwareReducer} from "../../../context/list-selection";
import {createSelectableListItem} from "../../../context/selectable-list-item";
import {createListSelectionToggle} from "../../../context/list-selection-toggle";
import {createListSelectionToolbar} from "../../../context/list-selection-toolbar";
import type {HistoryItem} from "../../../store/history";

const historySelectionContext = createListSelection<HistoryItem>(IdAwareReducer)
const HistoryListItem = createSelectableListItem(historySelectionContext)
const HistorySelectionToggle = createListSelectionToggle(historySelectionContext)
const HistorySelectionToolbar = createListSelectionToolbar(historySelectionContext)
const HistorySelectionProvider = historySelectionContext.ListSelectionProvider

export {historySelectionContext, HistoryListItem, HistorySelectionToggle, HistorySelectionProvider, HistorySelectionToolbar}
