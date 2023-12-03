import type {ImportConfig} from "gtfs";
import {importGtfs} from "gtfs";
import {authorize, listDataSets, listDataSetTags, buildDownloadUrl} from "mobilitaetsverbuende-at";

export async function importMobilitaetsverbuendeAt(sqlitePath: string, username: string, password: string) {
    const token = await authorize(username, password)

    const tags = await listDataSetTags(token);
    const gtfsTags = tags.filter(tag => tag.valueEn === 'GTFS')
    const dataSets = await listDataSets(token, gtfsTags)

    const config: ImportConfig = {
        agencies: dataSets.filter(dataSet => {
            return dataSet.active && [
                "Fahrplandaten Eisenbahn (GTFS) - aktuell",
                "Fahrplandaten Verkehrsverbund Steiermark (GTFS)"
            ].includes(dataSet.name)
        }).map(dataSet => {
            return {
                prefix: `mvat-${dataSet.id}-`,
                url: buildDownloadUrl(dataSet),
                headers: {
                    'Authorization': `Bearer ${token.access_token}`
                }
            }
        }),
        sqlitePath
    }

    await importGtfs(config)
}


export async function importMav(sqlitePath: string, username: string, password: string) {
    const config = {
        agencies: [
            {
                prefix: `mav-`,
                url: 'http://www.mavcsoport.hu/gtfs/gtfsMavMenetrend.zip',
                headers: {
                    'Authorization': `Basic ${username} ${password}`
                }
            }
        ],
        sqlitePath
    }

    await importGtfs(config)
}