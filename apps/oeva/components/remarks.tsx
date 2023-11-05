"use client"

import { Hint, Status, Warning } from "hafas-client";
import { Icon, List, ListItem } from "konsta/react";
import React from "react";
import { ExclamationmarkTriangleFill, InfoCircleFill } from "framework7-icons/react"


export default function Remarks({ remarks, type }: { remarks: readonly (Hint | Status | Warning)[] | undefined, type: Hint['type'] | Warning['type'] }): React.JSX.Element {
    if (!remarks?.filter(remark => remark.type === type).length) {
        return <></>
    }
    return <List inset outline>
        {remarks.map((remark, i) => {
            if (remark.type === 'warning' && type === 'warning') {
                return <ListItem key={i}
                    media={<Icon className="text-amber-300" ios={<ExclamationmarkTriangleFill />} />}
                    title={remark.summary}
                    text={remark.text}
                />
            }
            if (remark.type === 'status' && type === 'status') {
                return <ListItem key={i}
                    media={<Icon className="text-amber-300" ios={<ExclamationmarkTriangleFill />} />}
                    title={remark.summary}
                    text={remark.text}
                />
            }
            if (remark.type === 'hint' && type === 'hint') {
                return <ListItem key={i}
                    media={<Icon ios={<InfoCircleFill />} />}
                    title={remark.summary}
                    text={remark.text}
                />
            }

            if (remark.type === type) {
                return <ListItem key={i}
                    media={<Icon ios={<InfoCircleFill />} />}
                    title={remark.summary}
                    text={remark.text}
                />
            }
            return null;
        })}
    </List>
}