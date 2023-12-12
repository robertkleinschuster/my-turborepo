"use client"

import { Navbar } from 'konsta/react';
import type {JSX} from "react";
import Loading from "./loading";

export default function Home(): JSX.Element {
  return (
    <><Navbar title="OeVA" />
      <Loading/></>
  );
}
