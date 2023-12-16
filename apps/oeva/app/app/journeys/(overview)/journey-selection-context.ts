import {createListSelection, IdAwareReducer} from "../../../../context/list-selection";
import type {Journey} from "../../../../lib/prisma";
import {createSelectableListItem} from "../../../../context/selectable-list-item";
import {createListSelectionToggle} from "../../../../context/list-selection-toggle";
import {createListSelectionToolbar} from "../../../../context/list-selection-toolbar";

const journeySelectionContext = createListSelection<Journey>(IdAwareReducer)
const JourneyListItem = createSelectableListItem(journeySelectionContext)
const JourneySelectionToggle = createListSelectionToggle(journeySelectionContext)
const JourneySelectionToolbar = createListSelectionToolbar(journeySelectionContext)
const JourneySelectionProvider = journeySelectionContext.ListSelectionProvider
export {JourneyListItem, JourneySelectionToggle, JourneySelectionProvider, JourneySelectionToolbar}
