function solution(n, passenger, train) {
    let stations = [];
    for (let i = 0; i < n; i++) {
        let station = new Station(i+1, passenger[i]);
        stations.push(station);
    }
    train.sort();
    for (let i = 0; i < train.length; i++) {
        let edge = train[i].sort();
        let [parent, child] = edge;
        let parent_station = stations[parent - 1];
        let child_station = stations[child - 1];
        parent_station.setChild(child_station);
        child_station.setParent(parent_station);
    }
    let path_to_terminal = getTerminal(stations);
    let terminals = Object.keys(path_to_terminal).map(Number);
    let answer = terminals.reduce((acc, cur) => {
        if (acc[1] <= path_to_terminal[cur].passengers) {
            acc[0] = cur;
            acc[1] = path_to_terminal[cur].passengers;
        }
        return acc;
    }, [0, 0])
    return answer;
}

const getTerminal = (stations) => {
    let start_station = stations[0];
    let path = {};

    const recursion = (current, route, passengers) => {
        passengers += current.passenger;
        if (current.children.length === 0) {
            path[current.station_number] = {
                route : route,
                terminal : current.station_number,
                passengers: passengers
            }
            return;
        }
        for (let i = 0; i < current.children.length; i++) {
            recursion(current.children[i], route.concat([current.children[i].station_number]), passengers);
        }
    }

    recursion(start_station, [start_station.station_number], 0);
    return path;
}


class Station {
    constructor(station_number, passenger) {
        this.station_number = station_number;
        this.passenger = passenger;
        this.parent;
        this.children = [];
    }

    setParent(parent_station) {
        this.parent = parent_station;
    }

    setChild(child_station) {
        this.children.push(child_station);
    }

    toString() {
        return this.station_number;
    }
}

const n = 5;
const passenger = [1,1,2,3,4];
const train = [[1,2],[1,3],[1,4],[1,5]];
let answer = solution(n, passenger, train);
console.log(answer)