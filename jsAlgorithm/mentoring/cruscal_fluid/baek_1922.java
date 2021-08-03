package jsAlgorithm.mentoring.cruscal_fluid;

import java.io.*;
import java.util.Comparator;
import java.util.PriorityQueue;
import java.util.StringTokenizer;

public class baek_1922 {
    public static int[] roots;

    public static void main(String[] args) throws Exception {
        File file = new File("/Users/youngpro/Desktop/algorithm/Algorithm/test.txt");
        BufferedReader br = new BufferedReader(new FileReader(file));
        StringTokenizer st;
        int N = Integer.parseInt(br.readLine());
        int M = Integer.parseInt(br.readLine());
        PriorityQueue<Integer[]> pq = new PriorityQueue<>(new Comparator<Integer[]>() {
            @Override
            public int compare(Integer[] o1, Integer[] o2) {
                return o1[2] - o2[2];
            }
        });
        roots = new int[N + 1];
        for (int i = 1; i < N + 1; i++) {
            roots[i] = i;
        }
        for (int i = 0; i < M; i++) {
            st = new StringTokenizer(br.readLine());
            int n1 = Integer.parseInt(st.nextToken());
            int n2 = Integer.parseInt(st.nextToken());
            int cost = Integer.parseInt(st.nextToken());
            Integer[] info = {n1, n2, cost};
            pq.offer(info);
        }
        int sum = 0;
        while (pq.size() > 0) {
            Integer[] info = pq.poll();
            if (find_root(info[0]) == find_root(info[1]))
                continue;
            else {
                union(info[0], info[1]);
                sum += info[2];
            }
        }
        System.out.println(sum);
    }

    public static int find_root(int no1) {
        if (roots[no1] == no1)
            return no1;
        return find_root(roots[no1]);
    }

    public static void union(int no1, int no2) {
        int root1 = find_root(no1);
        int root2 = find_root(no2);
        if (root1 < root2)
            roots[root2] = root1;
        else
            roots[root1] = root2;
    }
}
