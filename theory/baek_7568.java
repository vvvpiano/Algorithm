package theory;

import java.io.*;
import java.util.Arrays;
import java.util.StringTokenizer;

public class baek_7568 {
    public static void main(String[] args) throws IOException {
        File file = new File("C:/Users/user/IdeaProjects/Start/src/test.txt");
        BufferedReader br = new BufferedReader(new FileReader(file));
//        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken());
        int[][] data = new int[n][2];
        int[][] rank;
        int[] buildRank;
        for (int i = 0; i < data.length; i++) {
            st = new StringTokenizer(br.readLine());
            data[i][0] = Integer.parseInt(st.nextToken());
            data[i][1] = Integer.parseInt(st.nextToken());
        }

        rank = whrank(data);
        buildRank = compareBuild(rank);

        for (int i = 0; i < buildRank.length ; i++) {
            System.out.print(buildRank[i]+1+" ");
        }
    }

    static int[][] whrank (int[][] data) {
        int[][] rank = new int[data.length][data[0].length];
        int[] weight = new int[data.length];
        int[] height = new int[data.length];

        for (int i = 0; i < data.length ; i++) {
            weight[i] = data[i][0];
            height[i] = data[i][1];
        }
        Arrays.sort(weight);
        Arrays.sort(height);

        for (int i = 0; i < data.length ; i++) {
            rank[i][0] = 5 - findIndex(data[i][0], weight);
            rank[i][1] = 5 - findIndex(data[i][1], height);
        }
        return rank;
    }

    static int findIndex(int a, int[] array) {
        if(array == null) return -1;
        for (int i = 0; i < array.length; i++) {
            if(array[i] == a) return i;
        }
        return -1;
    }

    static int[] compareBuild(int[][] rank) {
        int[] buildRank = new int[rank.length];
        for (int i = 0; i < rank.length ; i++) {
            for (int j = 0; j < rank.length ; j++) {
                if(rank[i][0] > rank[j][0] && rank[i][1] > rank[j][1])
                    buildRank[i]++;
            }
        }
        return buildRank;
    }
}
