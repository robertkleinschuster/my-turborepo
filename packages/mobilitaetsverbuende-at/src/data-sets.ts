import {Token} from "./auth";
import {z} from "zod";

export const DATASETS_ENDPOINT = 'https://data.mobilitaetsverbuende.at/api/public/v1/data-sets'
const DATASET_TAGS_ENDPOINT = 'https://data.mobilitaetsverbuende.at/api/public/v1/data-set-tags'

export async function listDataSets(token: Token, tags?: DataSetTag[]): Promise<DataSet[]> {
    const url = new URL(DATASETS_ENDPOINT)
    if (tags) {
        const tagIds = tags.map(tag => tag.id)
        url.searchParams.set('tagIds', tagIds.join(','))
        url.searchParams.set('tagFilterModeInclusive', 'true')
    }
    const response = await fetch(url.toString(), {
        headers: {
            'authorization': 'Bearer ' + token.access_token
        }
    })
    return z.array(DataSet).parse(await response.json())
}

export async function listDataSetTags(token: Token): Promise<DataSetTag[]> {
    const response = await fetch(DATASET_TAGS_ENDPOINT, {
        headers: {
            'authorization': 'Bearer ' + token.access_token
        }
    })
    return z.array(DataSetTag).parse(await response.json())
}

const DataSetVersion = z.object({
    id: z.string(),
    created: z.coerce.date(),
    file: z.object({
        originalName: z.string(),
        size: z.string()
    })
})

const Version = z.object({
    id: z.string(),
    active: z.boolean(),
    year: z.string(),
    dataSetVersion: DataSetVersion
})

const DataSetTag = z.object({
    id: z.string(),
    valueDe: z.string(),
    valueEn: z.string(),
    numberOfDataSets: z.number()
})

const DataSetLicense = z.object({
    id: z.string(),
    name: z.string()
})

const DataSet = z.object({
    id: z.string(),
    name: z.string(),
    active: z.boolean(),
    descriptionDe: z.string(),
    descriptionEn: z.string(),
    documentationUrlDe: z.string(),
    documentationUrlEn: z.string(),
    termsOfUseUrlDe: z.string(),
    termsOfUseUrlEn: z.string(),
    license: DataSetLicense,
    activeVersions: z.array(Version),
    latestVersions: z.array(Version),
    tags: z.array(DataSetTag)
})

export type DataSet = z.infer<typeof DataSet>
export type DataSetVersion = z.infer<typeof DataSetVersion>
export type DataSetTag = z.infer<typeof DataSetTag>
export type DataSetLicense = z.infer<typeof DataSetLicense>