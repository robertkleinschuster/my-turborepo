"use client"

import { Hint, Status, Warning } from "hafas-client";
import { Icon, List, ListItem } from "konsta/react";
import React from "react";
import { ExclamationmarkTriangleFill, InfoCircleFill } from "framework7-icons/react"


export default function Remarks({ remarks, type }: { remarks: readonly (Hint | Status | Warning)[] | undefined, type: Hint['type'] | Warning['type'] }): React.JSX.Element {
    return <List inset outline>
        {remarks?.map(remark => {
            if (remark.type === 'warning' && type === 'warning') {
                return <ListItem key={remark.id}
                    media={<Icon className="text-amber-300" ios={<ExclamationmarkTriangleFill />} />}
                    title={remark.summary}
                    text={remark.text}
                />
            }
            if (remark.type === 'hint' && type === 'hint') {
                return <ListItem key={remark.code}
                    media={<Icon ios={<InfoCircleFill />} />}
                    text={remark.text}
                />
            }

            if (remark.type === type) {
                return <ListItem key={remark.text}
                    media={<Icon ios={<InfoCircleFill />} />}
                    text={remark.text}
                />
            }
            return null;
        })}
    </List>
}