import {beforeEach, describe, expect, it} from "@jest/globals";
import {authorize} from "./auth";
import fetchMock, {enableFetchMocks} from "jest-fetch-mock";

enableFetchMocks()
describe("auth", () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });
    it("should fetch the access token for a given username and password", async () => {
        const response = JSON.stringify(
            {
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
        );

        fetchMock.mockResponseOnce(request => {
            if (request.headers.get('content-type') !== 'application/x-www-form-urlencoded') {
                return Promise.reject()
            }

            return Promise.resolve(response)
        })
        const token = await authorize("user", "pass");
        expect(token.access_token).toEqual('asdf')
    })
})
