import {ClientCode} from "../client/client-code";

export function ClientName({clientCode}: { clientCode: ClientCode | null | undefined }) {
    if (clientCode === ClientCode.OEBB) {
        return 'ÖBB Scotty'
    }
    if (clientCode === ClientCode.DB) {
        return 'DB Navigator'
    }
    return 'VAO'

}