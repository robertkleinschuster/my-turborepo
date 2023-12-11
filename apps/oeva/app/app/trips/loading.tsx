"use client"

import { Block, Preloader } from "konsta/react"
import type {JSX} from "react";

export default function Loading(): JSX.Element {

  return <Block className="text-center">
    <Preloader />
  </Block>
}