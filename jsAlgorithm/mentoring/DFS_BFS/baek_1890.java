package jsAlgorithm.mentoring.DFS_BFS;

import java.io.*;
import java.util.StringTokenizer;

public class baek_1890 {
    public static void main(String[] args) throws Exception {
        File file = new File("/Users/youngpro/Desktop/algorithm/Algorithm/test.txt");
        BufferedReader br = new BufferedReader(new FileReader(file));
//           BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int N = Integer.parseInt(br.readLine());
        int[][] board = new int[N][N];
        long[][] dp = new long[N][N];

        StringTokenizer st;
        for (int i = 0; i < N; i++) {
            st = new StringTokenizer(br.readLine());
            for (int j = 0; j < N; j++) {
                board[i][j] = Integer.parseInt(st.nextToken());
            }
        }

        dp[0][0] = 1;
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                if (dp[i][j] == 0 || (i == N - 1 && j == N - 1))
                    continue;

                int dist = board[i][j];
                int right = j + dist;
                int down = i + dist;

                if (right < N)
                    dp[i][right] += dp[i][j];
                if (down < N)
                    dp[down][j] += dp[i][j];
            }
        }

        System.out.println(dp[N-1][N-1]);
    }
}
