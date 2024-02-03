import {describe, expect, it} from "@jest/globals";
import type {HistoryItem} from "../store/history";
import testData from './test-data'
import {historyToText} from "./history-text-fomatter";

describe('history-text-formatter', () => {
    it('should convert array of history items to a text representation', () => {
        const text = historyToText(testData as unknown as HistoryItem[])
        expect(text).toEqual('Fahrt von Graz Brauquartier/tim nach Graz Smart City/Peter-Tunner-Gasse/tim\n' +
            '\n' +
            '• Graz Brauquartier/tim\n' +
            '  Ab. 11:01 03.02.2024 E5 Puntigam\n' +
            '• E5 Puntigam\n' +
            '  Ab. 11:01 03.02.2024 E5 Puntigam\n' +
            '  ⧖  An. 11:05 03.02.2024 Graz Puntigam Bahnhof\n' +
            '• Graz Puntigam Bahnhof\n' +
            '  An. 11:05 03.02.2024 Graz Puntigam Bahnhof\n' +
            '  ➔  Ab. 11:09 03.02.2024 62 WKO-WIFI/tim\n' +
            '• 62 WKO-WIFI/tim\n' +
            '  Ab. 11:09 03.02.2024 62 WKO-WIFI/tim\n' +
            '  ⧖  An. 11:47 03.02.2024 Graz Hauptbahnhof (Eggenberger Straße)\n' +
            '• Graz Hauptbahnhof (Eggenberger Straße)\n' +
            '  An. 11:47 03.02.2024 Graz Hauptbahnhof (Eggenberger Straße)\n' +
            '  ➔  Ab. 11:47 03.02.2024 Graz Daungasse/Hauptbahnhof\n' +
            '• Graz Daungasse/Hauptbahnhof\n' +
            '  An. 11:47 03.02.2024 Graz Daungasse/Hauptbahnhof\n' +
            '  ➔  Ab. 11:57 03.02.2024 6 Smart City\n' +
            '• 6 Smart City\n' +
            '  Ab. 11:57 03.02.2024 6 Smart City\n' +
            '  ⧖  An. 12:02 03.02.2024 Graz Smart City/Peter-Tunner-Gasse/tim\n' +
            '• Graz Smart City/Peter-Tunner-Gasse/tim\n' +
            '  An. 12:02 03.02.2024 Graz Smart City/Peter-Tunner-Gasse/tim')
    })
})