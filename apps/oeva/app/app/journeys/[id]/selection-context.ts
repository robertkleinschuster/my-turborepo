"use client"

import {createListSelection, IdAwareReducer} from "../../../../context/list-selection";
import type {JourneyLeg} from "../../../../lib/prisma";
import {createSelectableListItem} from "../../../../context/selectable-list-item";
import {createListSelectionToggle} from "../../../../context/list-selection-toggle";
import {createListSelectionToolbar} from "../../../../context/list-selection-toolbar";

const selectionContext = createListSelection<JourneyLeg>(IdAwareReducer)
const JourneyLegListItem = createSelectableListItem(selectionContext)
const JourneyLegSelectionToggle = createListSelectionToggle(selectionContext)
const JourneyLegSelectionToolbar = createListSelectionToolbar(selectionContext)
const JourneyLegSelectionProvider = selectionContext.ListSelectionProvider
export {JourneyLegListItem, JourneyLegSelectionToggle, JourneyLegSelectionProvider, JourneyLegSelectionToolbar}
