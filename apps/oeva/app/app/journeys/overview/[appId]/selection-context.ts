"use client"

import {createListSelection, IdAwareReducer} from "../../../../../context/list-selection";
import type {Journey} from "../../../../../lib/prisma";
import {createSelectableListItem} from "../../../../../context/selectable-list-item";
import {createListSelectionToggle} from "../../../../../context/list-selection-toggle";
import {createListSelectionToolbar} from "../../../../../context/list-selection-toolbar";

const context = createListSelection<Journey>(IdAwareReducer)
const JourneySelectionProvider = context.ListSelectionProvider

const JourneyListItem = createSelectableListItem(context)
const JourneySelectionToggle = createListSelectionToggle(context)
const JourneySelectionToolbar = createListSelectionToolbar(context)
export {JourneyListItem, JourneySelectionToggle, JourneySelectionProvider, JourneySelectionToolbar}
