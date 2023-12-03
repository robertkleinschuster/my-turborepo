import natural from 'natural';

const { JaroWinklerDistance } = natural;

export interface Stop {
    stop_id: string;
    stop_name: string;
    stop_lat: number;
    stop_lon: number;
    parent_station?: string;
    location_type?: number;
    stops?: Stop[]
}

export function generateName(stopNames: string[], similarityThreshold: number): string {
    const groupedNames = new Map<string, string[]>();

    stopNames.forEach((name) => {
        let addedToGroup = false;

        // Try to add to an existing group
        groupedNames.forEach((groupNames, group) => {
            const similarity = JaroWinklerDistance(name, group, {});
            if (similarity >= similarityThreshold) {
                groupNames.push(name);
                addedToGroup = true;
            }
        });

        // If not added to any existing group, create a new group
        if (!addedToGroup) {
            groupedNames.set(name, [name]);
        }
    });

    let mostCommonName = '';
    let maxCount = 0;

    groupedNames.forEach((group, name) => {
        const count = group.length;
        if (count > maxCount) {
            mostCommonName = name;
            maxCount = count;
        }
    });

    return mostCommonName;
}


