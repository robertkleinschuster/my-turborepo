"use client"

import { Navbar, App, Card, Icon } from 'konsta/react';
import {
  SquareArrowUp
} from 'framework7-icons/react';

export default function Home(): JSX.Element {
  return (
    <App theme="ios">
      <Navbar title="OeVA" />
      <Card
        footer=""
        footerDivider
        header="Willkommen bei OeVA"
        headerDivider
        outline
      >
         Um OeVA zu installieren, tippe auf <Icon
              ios={<SquareArrowUp/>}
            /> und dann auf &quot;Zum Home-Bildschirm hinzufügen&quot;.
      </Card>
    </App>
  );
}
