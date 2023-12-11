"use client"

import { Block, Preloader } from "konsta/react"
import React from "react";

export default function Loading(): React.JSX.Element {

  return <Block className="text-center">
    <Preloader />
  </Block>
}