package basic;

import java.io.*;
import java.util.StringTokenizer;

public class baek_3009 {
    public static void main(String[] args) throws IOException {
        File file = new File("C:/Users/user/IdeaProjects/Start/src/test.txt");
        BufferedReader br = new BufferedReader(new FileReader(file));
//        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;
        int[] forth = new int[2];
        int[][] point = new int[3][2];
        for (int i = 0; i < point.length; i++) {
            st = new StringTokenizer(br.readLine());
            point[i][0] = Integer.parseInt(st.nextToken());
            point[i][1] = Integer.parseInt(st.nextToken());
        }
        for (int i = 0; i < 2; i++) {
            if (point[0][i] == point[1][i]) forth[i] = point[2][i];
            else if (point[0][i] == point[2][i]) forth[i] = point [1][i];
            else forth[i] = point[0][i];
        }
        System.out.println(forth[0]+" "+forth[1]);
    }
}
