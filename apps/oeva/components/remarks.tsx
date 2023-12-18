"use client"

import type {Hint, Status, Warning} from "hafas-client";
import {Block, Icon} from "konsta/react";
import type {JSX, ReactNode} from "react";
import React from "react";
import {ExclamationmarkTriangleFill, InfoCircleFill} from "framework7-icons/react"
import sanitize from "sanitize-html";

function Remark({title, text, icon}: { title?: string, text?: string, icon?: ReactNode }): JSX.Element {
    const sanitizeOptions: sanitize.IOptions = {
        allowedTags: ['b', 'i', 'em', 'strong', 'a'],
        allowedAttributes: {
            'a': ['href']
        }
    }
    const sanitizedText = text ? sanitize(text, sanitizeOptions) : null
    const sanitizedTitle = title ? sanitize(title, sanitizeOptions) : null

    if (sanitizedTitle && sanitizedText) {
        return <>
            <p className="font-bold flex gap-1 items-center">{icon}<span
                dangerouslySetInnerHTML={{__html: sanitizedTitle}}/></p>
            <p className="py-1">
                <span dangerouslySetInnerHTML={{__html: sanitizedText}}/>
            </p></>
    } else if (icon) {
        return <p className="font-bold py-0.5 flex gap-1 items-center">
            {icon}
            <span dangerouslySetInnerHTML={{__html: sanitizedTitle ?? sanitizedText ?? ''}}/>
        </p>
    } else {
        return <p className="py-0.5">
            <span dangerouslySetInnerHTML={{__html: sanitizedTitle ?? sanitizedText ?? ''}}/>
        </p>
    }
}


export default function Remarks({remarks, type}: {
    remarks: readonly (Hint | Status | Warning)[] | undefined,
    type: Hint['type'] | Warning['type']
}): JSX.Element {
    if (!remarks?.filter(remark => remark.type === type).length) {
        return <></>
    }

    const filtered = remarks.filter(remark => remark.type === type)

    switch (type) {
        case 'warning':
        case 'status':
            return <Block>
                {filtered.map(remark => {
                    return <Remark icon={<Icon className="text-amber-300" ios={<ExclamationmarkTriangleFill/>}/>}
                                   key={remark.type + remark.text}
                                   text={remark.text}
                                   title={remark.summary}

                    />
                })}
            </Block>
        default:
            return <Block>
                <p className="font-bold flex gap-1 items-center"><Icon ios={<InfoCircleFill/>}/> Hinweise</p>
                {filtered.map(remark => {
                    return <Remark key={remark.type + remark.text}
                                   text={remark.text}
                                   title={remark.summary}

                    />
                })}
            </Block>
    }
}