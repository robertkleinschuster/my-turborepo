import {describe, expect, it} from "@jest/globals";
import {buildDownloadUrl} from "./utils";
import {DataSet, DATASETS_ENDPOINT} from "./data-sets";

describe("utils", () => {
    it("should build the file download url for a data set", () => {
        const dataSet: DataSet = {
            "id": "1",
            "name": "Bus Stops",
            "active": true,
            "descriptionDe": "Dies ist eine Beispielbeschreibung für den Datensatz.",
            "descriptionEn": "This is an example description for the data set.",
            "documentationUrlDe": "https://arge-oevv.wiki/data-set/1/documentation/DE",
            "documentationUrlEn": "https://arge-oevv.wiki/data-set/1/documentation/EN",
            "termsOfUseUrlDe": "https://arge-oevv.wiki/data-set/1/terms-of-use/DE",
            "termsOfUseUrlEn": "https://arge-oevv.wiki/data-set/1/terms-of-use/EN",
            "license": {
                "id": "1",
                "name": "CC BY SA"
            },
            activeVersions: [
                {
                    active: true,
                    id: "1",
                    year: "2023",
                    dataSetVersion: {
                        "id": "1",
                        "created": new Date("2021-04-10T10:30:00.000Z"),
                        "file": {
                            "originalName": "version_1.zip",
                            "size": "14303977"
                        }
                    }
                },
            ],
            latestVersions: [
                {
                    active: true,
                    id: "1",
                    year: "2023",
                    dataSetVersion: {
                        "id": "1",
                        "created": new Date("2021-04-10T10:30:00.000Z"),
                        "file": {
                            "originalName": "version_1.zip",
                            "size": "14303977"
                        }
                    }
                },
            ],
            "tags": [
                {
                    "id": "15",
                    "valueDe": "Neu",
                    "valueEn": "New",
                    "numberOfDataSets": 12
                }
            ]
        };

        expect(buildDownloadUrl(dataSet)).toBe(DATASETS_ENDPOINT + '/1/2023/file')
    })
})