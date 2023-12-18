"use client"

import type {JSX} from "react";
import React from "react";
import {List, ListItem, Navbar, NavbarBackLink} from "konsta/react";
import {type JourneyLeg} from "../../../../lib/prisma";
import {createLeg, deleteLeg, loadJourney} from "../../../../lib/actions";
import type {ListSelection} from "../../../../context/list-selection";
import {useNavigation} from "../../../../hooks/use-navigation";
import {useJourneyPlanner} from "../../../../store/journey-planner";
import useStore from "../../../../hooks/use-store";
import Time from "../../../../components/time";
import Scroll from "../../../../components/scroll";
import {
    JourneyLegListItem,
    JourneyLegSelectionToggle,
    JourneyLegSelectionToolbar
} from "./selection-context";
import {useJourney, useJourneyDispatch} from "./context";

function DeleteSummary(selection: ListSelection<JourneyLeg>): JSX.Element {
    if (!selection) {
        return <></>
    }
    if (selection.length === 1) {
        return <>Abschnitt &bdquo;{selection[0]?.name}&ldquo; löschen?</>
    }
    return <>{selection.length} Abschnitte löschen?</>
}

export default function Journey(): JSX.Element {
    const nav = useNavigation()
    const journey = useJourney()
    const dispatch = useJourneyDispatch()
    const planJourney = useJourneyPlanner(state => state.plan)
    const pausePlanning = useJourneyPlanner(state => state.pause)
    const resumePlanning = useJourneyPlanner(state => state.resume)
    const recording = useJourneyPlanner(state => state.recording)
    const finishJourney = useJourneyPlanner(state => state.finish)
    const planning = useStore(useJourneyPlanner, state => state.journey)

    return <>
        <Navbar
            left={<NavbarBackLink onClick={() => {
                nav.back()
            }} text="Zurück"/>}
            right={<JourneyLegSelectionToggle/>}
            title={journey.name}
        />
        <Scroll>
            <List inset strong>
                {!planning ?
                    <ListItem
                        link
                        onClick={() => {
                            planJourney(journey)
                            if (!journey.legs.length) {
                                nav.stations()
                            }
                        }}
                        title={journey.legs.length ? "Planung fortsetzen" : "Planung starten"}
                    /> : null
                }
                {journey.id === planning?.id ?
                    <><ListItem
                        label
                        onClick={() => {
                            const planned = finishJourney()
                            if (planned.legs) {
                                void Promise.all(planned.legs.map(async leg => {
                                    return createLeg(leg)
                                })).then(() => {
                                    void loadJourney(planned.id).then(newJourney => {
                                        dispatch({action: 'replace', journey: newJourney})
                                        nav.refresh()
                                    })
                                })
                            }
                        }}
                        title="Planung beenden"
                    />
                        <ListItem
                            label
                            onClick={() => {
                                if (recording) {
                                    pausePlanning()
                                } else {
                                    resumePlanning()
                                }
                            }}
                            title={recording ? "Planung pausieren": "Planung fortsetzen"}
                        />
                    </> : null
                }
            </List>

            <List inset strong>
                {journey.legs.map(leg => <JourneyLegListItem
                    header={<Time time={leg.timeStart}/>}
                    item={leg}
                    key={leg.id}
                    link
                    onClick={() => {
                        if (leg.extType === 'STATION' && leg.extId) {
                            if (planning?.id === journey.id) {
                                nav.stationNoHistory(leg.extId, leg.timeStart?.toISOString() ?? null)
                            } else {
                                nav.station(leg.extId, leg.timeStart?.toISOString() ?? null, leg.name)
                            }
                        }
                        if (leg.extType === 'TRIP' && leg.extId) {
                            if (planning?.id === journey.id) {
                                nav.tripNoHistory(leg.extId)
                            } else {
                                nav.trip(leg.extId, leg.timeStart?.toISOString() ?? null, leg.name)
                            }
                        }
                    }}
                    title={leg.name}
                />)}
                {planning?.legs?.map((leg, i) => <ListItem
                    header={<Time time={typeof leg.timeStart === 'string' ? new Date(leg.timeStart) : leg.timeStart}/>}
                    key={i}
                    link
                    onClick={() => {
                        const when = typeof leg.timeStart === 'string' ? leg.timeStart : leg.timeStart?.toISOString() ?? null
                        if (leg.extType === 'STATION' && leg.extId) {
                            if (planning.id === journey.id) {
                                nav.stationNoHistory(leg.extId, when)
                            } else {
                                nav.station(leg.extId, when, leg.name)
                            }
                        }
                        if (leg.extType === 'TRIP' && leg.extId) {
                            if (planning.id === journey.id) {
                                nav.tripNoHistory(leg.extId)
                            } else {
                                nav.trip(leg.extId, when ?? null, leg.name)
                            }
                        }
                    }}
                    subtitle="in Planung"
                    title={leg.name}
                />)}
            </List>
        </Scroll>
        <JourneyLegSelectionToolbar
            buildSummary={DeleteSummary}
            onDelete={(selection) => {
                if (selection) {
                    const legIds = selection.map(item => item.id)
                    dispatch({action: 'delete_legs', legIds})
                    void deleteLeg(legIds)
                }
            }}/>
    </>
}