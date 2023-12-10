import type {Metadata} from "next";
import {generateStartupImages} from "./splashscreen/[id]/sizes";

const metadata: Metadata = {
    title: "OeVA",
    description: "OeVA",
    robots: {
        index: false,
        follow: false
    },
    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent",
        title: 'OeVA',
        startupImage: generateStartupImages()
    },
};

export default metadata