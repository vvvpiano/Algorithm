package ndb;

import java.io.*;
import java.util.Arrays;
import java.util.StringTokenizer;

public class CardGame {
    public static void main(String[] args) throws Exception {
        File file = new File("/Users/youngpro/Desktop/algorithm/Algorithm/test.txt");
        BufferedReader br = new BufferedReader(new FileReader(file));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int N = Integer.parseInt(st.nextToken());
        int M = Integer.parseInt(st.nextToken());
        int[][] map = new int[N][M];
        int[] minMap = new int[N];
        for (int i = 0; i < N; i++) {
            st = new StringTokenizer(br.readLine());
            for (int j = 0; j < M; j++) {
                map[i][j] = Integer.parseInt(st.nextToken());
            }
            Arrays.sort(map[i]);
            minMap[i] = map[i][0];
        }
        Arrays.sort(minMap);
        System.out.println(minMap[N-1]);
    }
}
