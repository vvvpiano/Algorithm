package jsAlgorithm.mentoring.test0909;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.PriorityQueue;

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

class Solution {
    public int solution (int n, int s, int a, int b, int[][] fares) {
        ArrayList<Node>[] neighbors = new ArrayList[n + 1];
        for (int i = 1; i <= n; i++) {
            neighbors[i] = new ArrayList<>();
        }
        for (int i = 0; i < fares.length; i++) {
            neighbors[fares[i][0]].add(new Node(fares[i][1], fares[i][2]));
            neighbors[fares[i][1]].add(new Node(fares[i][0], fares[i][2]));
        }
        int[] results = dijkstra(s, n, neighbors);
        int[] weightsA = dijkstra(a, n, neighbors);
        int[] weightsB = dijkstra(b, n, neighbors);
        for (int i = 1; i <= n; i++) { // i을 경유해서 a, b에 가는 비용 계산
            results[i] = results[i] + weightsA[i] + weightsB[i];
        }
        Arrays.sort(results);
        return results[0];
    }

    public static int[] dijkstra(int startNodeNo, int size, ArrayList<Node>[] neighbors) {
        final int INF = Integer.MAX_VALUE;
        int[] weights = new int[size + 1];
        boolean[] isVisited = new boolean[size + 1];
        Arrays.fill(weights, INF);

        PriorityQueue<Node> pq = new PriorityQueue<>();
        weights[startNodeNo] = 0;
        pq.add(new Node(startNodeNo, 0));
        while (!pq.isEmpty()) {
            Node node = pq.poll();
            if (isVisited[node.no]) continue;;
            isVisited[node.no] = true;
            for (Node neighborNode: neighbors[node.no]) {
                if (weights[neighborNode.no] > weights[node.no] + neighborNode.weight) {
                    weights[neighborNode.no] = weights[node.no] + neighborNode.weight;
                    pq.add(new Node(neighborNode.no, weights[neighborNode.no]));
                }
            }
        }
        return weights;
    }
}

public class Taxi {
    public static void main(String[] args) {
        int[][] fares = {{4, 1, 10}, {3, 5, 24}, {5, 6, 2}, {3, 1, 41}, {5, 1, 24}, {4, 6, 50}, {2, 4, 66}, {2, 3, 22}, {1, 6, 25}};
        new Solution().solution(6,4,6,2, fares);
    }
}