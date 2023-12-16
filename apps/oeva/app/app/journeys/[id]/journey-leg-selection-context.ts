import {createListSelection, IdAwareReducer} from "../../../../context/list-selection";
import type {JourneyLeg} from "../../../../lib/prisma";
import {createSelectableListItem} from "../../../../context/selectable-list-item";
import {createListSelectionToggle} from "../../../../context/list-selection-toggle";
import {createListSelectionToolbar} from "../../../../context/list-selection-toolbar";

const journeyLegSelectionContext = createListSelection<JourneyLeg>(IdAwareReducer)
const JourneyLegListItem = createSelectableListItem(journeyLegSelectionContext)
const JourneyLegSelectionToggle = createListSelectionToggle(journeyLegSelectionContext)
const JourneyLegSelectionToolbar = createListSelectionToolbar(journeyLegSelectionContext)
const JourneyLegSelectionProvider = journeyLegSelectionContext.ListSelectionProvider
export {JourneyLegListItem, JourneyLegSelectionToggle, JourneyLegSelectionProvider, JourneyLegSelectionToolbar}
