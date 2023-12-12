"use client"

import type {Hint, Status, Warning} from "hafas-client";
import {Block, Icon} from "konsta/react";
import type {ReactNode} from "react";
import React from "react";
import {ExclamationmarkTriangleFill, InfoCircleFill} from "framework7-icons/react"

function Remark({title, text, icon}: { title?: string, text?: string, icon: ReactNode }) {
    if (title && text) {
        return <>
            <Block inset margin="my-4" outline padding="py-2">
                <p className="font-bold">{icon} {title}</p>
                {text}
            </Block>
        </>
    } else {
        return <Block inset margin="my-4" outline padding="py-2">{icon} {title ?? text}</Block>
    }
}


export default function Remarks({remarks, type}: {
    remarks: readonly (Hint | Status | Warning)[] | undefined,
    type: Hint['type'] | Warning['type']
}): React.JSX.Element {
    if (!remarks?.filter(remark => remark.type === type).length) {
        return <></>
    }
    return <>
        {remarks.map(remark => {
            if (remark.type === 'warning' && type === 'warning') {
                return <Remark icon={<Icon className="text-amber-300" ios={<ExclamationmarkTriangleFill/>}/>}
                               key={remark.type + remark.id}
                               text={remark.text}
                               title={remark.summary}

                />
            }
            if (remark.type === 'status' && type === 'status') {
                return <Remark icon={<Icon className="text-amber-300" ios={<ExclamationmarkTriangleFill/>}/>}
                               key={remark.type + remark.text}
                               text={remark.text}
                               title={remark.summary}

                />
            }
            if (remark.type === 'hint' && type === 'hint') {
                return <Remark icon={<Icon ios={<InfoCircleFill/>}/>}
                               key={remark.type + remark.text}
                               text={remark.text}
                               title={remark.summary}

                />
            }

            if (remark.type === type) {
                return <Remark icon={<Icon ios={<InfoCircleFill/>}/>}
                               key={remark.type + remark.text}
                               text={remark.text}
                               title={remark.summary}

                />
            }
            return null;
        })}
    </>
}