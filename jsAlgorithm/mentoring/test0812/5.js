const { rm } = require("fs");

class Node {
    constructor(i) {
        this.no = i;
        this.before = null;
        this.after = null;
        this.parent = null;
        this.child = [];
    }
}

const solution = (n, path, order) => {
    let Nodes = [];
    let roots = [];
    let is_visited = new Array(n).fill(0);
    let can_go = new Array(n).fill(true);
    const find_root = (n) => {
        if (roots[n] === n)
            return n;
        return (find_root(roots[n]));
    }
    for (let i = 0; i < n; i++) {
        Nodes.push(new Node(i));
        roots[i] = i;
    }
    for (let i = 0; i < path.length; i++) {
        let [n1, n2] = path[i];
        root1 = find_root(n1);
        root2 = find_root(n2);
        if (root1 < root2) {
            roots[n2] = root1;
            Nodes[n2].parent = n1;
            Nodes[n1].child.push(n2);
        } else {
            roots[n1] = root2;
            Nodes[n1].parent = n2;
            Nodes[n2].child.push(n1);
        }
    }

    for (let i = 0; i < order.length; i++) {
        let [before, after] = order[i];
        Nodes[before].after = after;
        Nodes[after].before = before;
        can_go[after] = false;
    }

    console.log(Nodes);

    const go = () => {
        const Q = [];
        Q.push(0);
        is_visited[0] = 1;
        while (Q.length > 0) {
            let cur = Q.shift();
            // is_visited[cur] = 1;
            if (Nodes[cur].after != null) {
                let after = Nodes[cur].after;
                can_go[after] = true;
            }
            for (let i = 0; i < Nodes[cur].child.length; i++) {
                let next = Nodes[cur].child[i];
                if (can_go[next] && is_visited[next] === 0) {
                    Q.push(next);
                    is_visited[next] = 1;
                }
            }
        }
        console.log(is_visited);
        console.log(Nodes)
    }
    while (true) {
        if (is_visited.filter(e => e === 0).length !== 0)
            return true;
        if ()
    }
}

let test = [
    [9, [[0,1],[0,3],[0,7],[8,1],[3,6],[1,2],[4,7],[7,5]], [[8,5],[6,7],[4,1]]]
]

for (let i = 0; i < test.length; i++) {
    console.log(solution(...test[i]));
}