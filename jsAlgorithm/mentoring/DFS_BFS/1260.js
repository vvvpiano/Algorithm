const fs = require('fs');
let input = fs.readFileSync("../.././test.txt").toString().trim().split('\n');
const [N, M, V] = input.shift().split(' ').map(Number);
const edges = input.map(e => e.split(' ').map(Number));
const dfs_order = [];
const bfs_order = [];

const solution = (N, M, V, edges) => {
    const graph = make_graph(N, M, edges);
    const visited1 = new Array(N + 1).fill(0);
    const visited2 = new Array(N + 1).fill(0);
    dfs(V, graph, visited1);
    bfs(V, graph, visited2);
    console.log(dfs_order.join(' '));
    console.log(bfs_order.join(' '));
}

const dfs = (V, graph, visited) => {
    if (visited[V] === 1)
        return;
    visited[V] = 1;
    dfs_order.push(V);
    for (let i = 1; i < graph[V].length; i++) {
        if (graph[V][i] === 1 && visited[i] === 0)
            dfs(i, graph, visited);
    }
}

const bfs = (V, graph, visited) => {
    let queue = [];
    queue.push(V);
    visited[V] = 1;

    while (queue.length !== 0) {
        let vertex = queue.shift();
        bfs_order.push(vertex);
        for (let i = 0; i < graph[vertex].length; i++) {
            if (graph[vertex][i] === 1 && visited[i] === 0){
                queue.push(i);
                visited[i] = 1;
            }
        }
    }
}

const make_graph = (N, M, edges) => {
    const graph = [];
    for (let i = 0; i < N + 1; i++)
        graph.push(new Array(N + 1).fill(0))
    for (let i = 0; i < M; i++) {
        const [v1, v2] = edges[i];
        graph[v1][v2] = 1;
        graph[v2][v1] = 1;
    }
    return graph;
}

solution(N, M, V, edges);