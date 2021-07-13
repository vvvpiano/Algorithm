function solution(n, start, end, roads, traps) {
    let edges = makeEdges(roads);
    let nodes = makeNodes(n, edges, traps);
    let possible = [];

    const recursive = (node, history) => {
        console.log("I'm in ", node.number);
        if (node.number === end) {
            console.log("end")
            possible.push(history);
            return;
        }
        if (node.trap) {
            console.log("trap activate!!");
            node.trapActivate();
        }
        let can_go_edges = node.getCanGoEdges();
        console.log("can go:", can_go_edges);
        for (let i = 0; i < can_go_edges.length; i++) {
            let dest = nodes[can_go_edges[i].end - 1];
            let second_last = history[history.length - 2];
            console.log("history:", history);
            if (second_last && second_last.to == dest.number && second_last.from == node.number) {
                console.log("circular movement detected");
                continue;
            }
            console.log("start:", node.number);
            console.log("destination:", dest.number);
            
            recursive(dest, history.concat([{
                "edge_id": can_go_edges[i].id,
                "from": node.number,
                "time": can_go_edges[i].time,
                "to": dest.number
            }]));
        }
    }
    recursive(nodes[start - 1], []);
    console.log(possible);
    let answer = possible.map(e => {
        let sum = 0;
        for (let i = 0; i < e.length; i++) {
            sum += e[i].time;   
        }
        return sum;
    })
    console.log(answer)
    return Math.min(...answer);
}

const makeEdges = (roads) => {
    let edges = [];
    for (let i = 0; i < roads.length; i++) {
        let edge = new Edge(i, ...roads[i]);
        edges.push(edge);
    }
    return edges;
}

const makeNodes = (n, edges, traps) => {
    let nodes = [];
    for (let i = 0; i < n; i++) {
        let trap = false;
        if (traps.includes(i + 1))
            trap = true;
        let node = new Node(i + 1, trap);
        nodes.push(node);
    }
    for (let i = 0; i < edges.length; i++) {
        nodes[edges[i].start - 1].setEdge(edges[i]);
        nodes[edges[i].end - 1].setEdge(edges[i]);
    }
    return nodes;
}

class Edge {
    constructor(id, start, end, time) {
        this.id = id;
        this.start = start;
        this.end = end;
        this.time = time;
    }

    reverse() {
        let temp = this.start;
        this.start = this.end;
        this.end = temp;
    }
}

class Node {
    constructor(number, trap) {
        this.number = number;
        this.edges = [];
        this.trap = trap;
        this.cost = 0;
    }

    addCost(time) {
        this.cost += time;
    }

    setEdge(edge) {
        this.edges.push(edge);
    }

    getCanGoEdges() {
        let can_go_edges = [];
        for (let i = 0; i < this.edges.length; i++) {
            if (this.edges[i].start == this.number)
                can_go_edges.push(this.edges[i]);
        }
        return can_go_edges;
    }

    trapActivate() {
        if (this.trap === true) {
            for (let i = 0; i < this.edges.length; i++) {
                this.edges[i].reverse();    
            }
        }
    }
}

let roads = [[1, 2, 1], [3, 2, 1], [2, 4, 1]];
traps = [2, 3]
console.log(solution(4, 1, 4, roads, traps));