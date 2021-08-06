package jsAlgorithm.mentoring.cruscal_fluid;

import java.io.*;
import java.util.PriorityQueue;
import java.util.StringTokenizer;

class Info implements Comparable<Info> {
    public int h1;
    public int h2;
    public int distance;
    public Info(int x, int y, int z) {
        h1 = x;
        h2 = y;
        distance = z;
    }

    @Override
    public int compareTo(Info o) {
        return this.distance - o.distance;
    }
}

public class baek_6497 {
    public static PriorityQueue<Info> pq;
    public static int[] root;
    public static void main(String[] args) throws Exception {
        File file = new File("/Users/youngpro/Desktop/algorithm/Algorithm/test.txt");
        BufferedReader br = new BufferedReader(new FileReader(file));
//                BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;

        while (true) {
            st =  new StringTokenizer(br.readLine());
            int n_of_houses = Integer.parseInt(st.nextToken());
            int n_of_roads = Integer.parseInt(st.nextToken());

            if (n_of_houses == 0 & n_of_roads == 0)
                break;

            root = new int[n_of_houses];
            for (int i = 0; i < n_of_houses; i++) {
                root[i] = i;
            }
            pq = new PriorityQueue();
            int i = 0;
            while (i++ < n_of_roads) {
                st = new StringTokenizer(br.readLine());
                int x = Integer.parseInt(st.nextToken());
                int y = Integer.parseInt(st.nextToken());
                int z = Integer.parseInt(st.nextToken());
                pq.offer(new Info(x, y, z));
            }
            int answer = solve();
            System.out.println(answer);
        }
    }

    public static int find_root(int number) {
        if (root[number] == number)
            return number;
        return find_root(root[number]);
    }

    public static int solve() {
        int save_budget = 0;
        while (!pq.isEmpty()) {
            Info info = pq.poll();
            int root1 = find_root(info.h1);
            int root2 = find_root(info.h2);
            if (root1 == root2) {
                save_budget += info.distance;
                continue;
            }
            if (root1 < root2)
                root[root2] = root1;
            else
                root[root1] = root2;
        }
        return save_budget;
    }
}
