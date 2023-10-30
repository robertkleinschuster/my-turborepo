"use client"

import { Block, Preloader } from "konsta/react"

export default function Loading() {

  return <Block className="text-center">
    <Preloader />
  </Block>
}