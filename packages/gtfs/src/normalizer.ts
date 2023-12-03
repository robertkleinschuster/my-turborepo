import dbscan from '@cdxoo/dbscan';
import {getCenter, getDistance} from 'geolib';
import natural from 'natural';
import type {Stop} from "./utils";
import {generateName} from "./utils";

const {JaroWinklerDistance} = natural;

export function groupStops(stops: Stop[]): Stop[] {
    const {clusters} = dbscan({
        dataset: stops,
        epsilon: 250,
        minimumPoints: 2,
        distanceFunction: (a, b) => {
            if (a.stop_id.includes(':') && b.stop_id.includes(':')) {
                const [prefixA, areaA, stationA] = a.stop_id.split(':')
                const [prefixB, areaB, stationB] = b.stop_id.split(':')
                if (prefixA.startsWith('mvat')
                    && prefixB.startsWith('mvat')
                    && areaA === areaB
                    && stationA === stationB
                ) {
                    return 0;
                }
            }

            const nameSimilarity = JaroWinklerDistance(a.stop_name, b.stop_name, {});

            if (nameSimilarity > 0.5) {
                return 999;
            }

            return getDistance({lat: a.stop_lat, lon: a.stop_lon}, {lat: b.stop_lat, lon: b.stop_lon})
        }
    });

    const parents: Stop[] = [];
    let index = 1;
    for (const cluster of clusters) {
        const clusterId = `mvat-meta-${index}`;
        const stopsInCluster = cluster.map(i => {
            const stop = stops[i];
            stop.parent_station = clusterId;
            stop.location_type = 0;
            return stop;
        });
        const center = getCenter(stopsInCluster.map(stop => {
            return {lat: stop.stop_lat, lon: stop.stop_lon}
        })) as { latitude: number, longitude: number }
        const name = generateName(stopsInCluster.map(stop => stop.stop_name), 0.8)
        parents.push({
            stop_id: clusterId,
            stop_name: name,
            location_type: 1,
            stop_lon: center.longitude,
            stop_lat: center.latitude,
            stops: stopsInCluster
        })
        index++;
    }
    return parents;
}