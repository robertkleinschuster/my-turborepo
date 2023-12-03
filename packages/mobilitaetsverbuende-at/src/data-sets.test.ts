import {beforeEach, describe, expect, it} from "@jest/globals";
import {listDataSets} from "./data-sets";
import fetchMock, {enableFetchMocks} from "jest-fetch-mock";

enableFetchMocks()

describe('data-sets', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });
    it("should pass the access token in the headers", async () => {
        const token = {
            access_token: 'asdf',
            expires_in: 300,
            refresh_expires_in: 3600,
            refresh_token: 'adsf.123-asdf-123-123',
            token_type: 'Bearer',
            id_token: 'fda.asdf.123--123--123',
            'not-before-policy': 0,
            session_state: '123123123123',
            scope: 'openid profile email'
        }

        const rawResponse = [
            {
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
                "activeVersion": {
                    "id": "1",
                    "created": "2021-04-10T10:30:00.000Z",
                    "file": {
                        "originalName": "version_1.zip",
                        "size": "14303977"
                    }
                },
                "latestVersion": {
                    "id": "1",
                    "created": "2021-04-10T10:30:00.000Z",
                    "file": {
                        "originalName": "version_0.zip",
                        "size": "14303900"
                    }
                },
                "tags": [
                    {
                        "id": "15",
                        "valueDe": "Neu",
                        "valueEn": "New",
                        "numberOfDataSets": 12
                    }
                ]
            }
        ];

        fetchMock.mockResponseOnce(request => {
            if (request.headers.get('authorization') !== 'Bearer asdf') {
                return Promise.reject()
            }

            return Promise.resolve(JSON.stringify(rawResponse))
        })

        const response = await listDataSets(token)

        expect(response).toHaveLength(1)
        expect(response[0].id).toBe('1')
        expect(response[0].name).toBe('Bus Stops')
    })

    it("should add tagIds parameter", async () => {
        const token = {
            access_token: 'asdf',
            expires_in: 300,
            refresh_expires_in: 3600,
            refresh_token: 'adsf.123-asdf-123-123',
            token_type: 'Bearer',
            id_token: 'fda.asdf.123--123--123',
            'not-before-policy': 0,
            session_state: '123123123123',
            scope: 'openid profile email'
        }
        const tags = [
            {
                "id": "15",
                "valueDe": "Neu",
                "valueEn": "New",
                "numberOfDataSets": 12
            },
            {
                "id": "20",
                "valueDe": "Neu",
                "valueEn": "New",
                "numberOfDataSets": 12
            }
        ]
        const rawResponse = [
            {
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
                "activeVersion": {
                    "id": "1",
                    "created": "2021-04-10T10:30:00.000Z",
                    "file": {
                        "originalName": "version_1.zip",
                        "size": "14303977"
                    }
                },
                "latestVersion": {
                    "id": "1",
                    "created": "2021-04-10T10:30:00.000Z",
                    "file": {
                        "originalName": "version_0.zip",
                        "size": "14303900"
                    }
                },
                "tags": [
                    {
                        "id": "15",
                        "valueDe": "Neu",
                        "valueEn": "New",
                        "numberOfDataSets": 12
                    }
                ]
            }
        ];

        fetchMock.mockResponseOnce(request => {
            if (request.headers.get('authorization') !== 'Bearer asdf') {
                return Promise.reject()
            }
            if (!request.url.includes('tagIds=15%2C20')) {
                return Promise.reject('missing tag ids')
            }
            return Promise.resolve(JSON.stringify(rawResponse))
        })

        const response = await listDataSets(token, tags)

        expect(response).toHaveLength(1)
        expect(response[0].id).toBe('1')
        expect(response[0].name).toBe('Bus Stops')
    })
})