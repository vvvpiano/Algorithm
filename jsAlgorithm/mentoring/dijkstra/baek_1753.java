package jsAlgorithm.mentoring.dijkstra;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.PriorityQueue;
import java.util.StringTokenizer;

class Node implements Comparable<Node> {
    public int no;
    public int weight;
    public Node(int no, int weight) {
        this.no = no;
        this.weight = weight;
    }

    @Override
    public int compareTo(Node o) {
        return weight - o.weight;
    }
}

public class baek_1753 {
    public static final int INF = 100_000_000;
    public static int[] weights;
    public static boolean[] isVisited;
    public static ArrayList<Node>[] neighbors;
    public static void main(String[] args) throws Exception {
        File file = new File("/Users/youngpro/Desktop/algorithm/Algorithm/test.txt");
        BufferedReader br = new BufferedReader(new FileReader(file));
//                BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int V = Integer.parseInt(st.nextToken());
        int E = Integer.parseInt(st.nextToken());
        int startSearchIndex = Integer.parseInt(br.readLine());
        weights = new int[V + 1];
        isVisited = new boolean[V + 1];
        neighbors = new ArrayList[V + 1];
        for (int i = 1; i < V + 1; i++) {
            neighbors[i] = new ArrayList<>();
        }
        Arrays.fill(weights, INF); // 값이 갱신되어가면서 최소값이 되도록 max value로 채워놓는다.

        for (int i = 0; i < E; i++) {
            st = new StringTokenizer(br.readLine());
            int startNode = Integer.parseInt(st.nextToken());
            int endNode = Integer.parseInt(st.nextToken());
            int weight = Integer.parseInt(st.nextToken());
            neighbors[startNode].add(new Node(endNode, weight));
        }

        dijkstra(startSearchIndex);

        for (int i = 1; i <= V; i++) {
            if (weights[i] == INF)
                System.out.println("INF");
            else
                System.out.println(weights[i]);
        }
    }

    public static void dijkstra(int startSearchIndex) {
        PriorityQueue<Node> pq = new PriorityQueue<>();
        weights[startSearchIndex] = 0;
        pq.add(new Node(startSearchIndex, 0));

        while (!pq.isEmpty()) {
            Node node = pq.poll();
            if (isVisited[node.no]) // 경유노드로 쓰였던 노드는 다시 값이 갱신되지 않으니 패스.
                continue;

            isVisited[node.no] = true;
            for (Node neighborNode: neighbors[node.no]) {
                if (weights[neighborNode.no] > weights[node.no] + neighborNode.weight) {
                    weights[neighborNode.no] = weights[node.no] + neighborNode.weight;
                    pq.add(new Node(neighborNode.no, weights[neighborNode.no]));
                }
            }
        }
    }
}
