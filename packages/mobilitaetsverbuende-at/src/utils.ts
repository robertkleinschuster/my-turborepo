import {DataSet, DATASETS_ENDPOINT} from "./data-sets";

export function buildDownloadUrl(dataSet: DataSet): string {
    return DATASETS_ENDPOINT + '/' + dataSet.id + '/2023/file'
}