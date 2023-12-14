import type {Metadata} from "next";
import {generateStartupImages} from "./splashscreen/[id]/sizes";
import {APP_DEFAULT_TITLE, APP_DESCRIPTION, APP_TITLE_TEMPLATE} from "./manifest";

const metadata: Metadata = {
    title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION,
    robots: {
        index: false,
        follow: false
    },
    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent",
        title: APP_DEFAULT_TITLE,
        startupImage: generateStartupImages()
    },
};

export default metadata