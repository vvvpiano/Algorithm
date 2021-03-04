package ndb;

import java.io.*;
import java.util.Arrays;
import java.util.StringTokenizer;

public class RuleOfBigNumber {
    public static void main(String[] args) throws Exception {
        File file = new File("/Users/youngpro/Desktop/algorithm/Algorithm/test.txt");
        BufferedReader br = new BufferedReader(new FileReader(file));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int N = Integer.parseInt(st.nextToken());
        int M = Integer.parseInt(st.nextToken());
        int K = Integer.parseInt(st.nextToken());
        int[] array = new int[N];
        st = new StringTokenizer(br.readLine());
        for (int i = 0; i < N ; i++) {
            array[i] = Integer.parseInt(st.nextToken());
        }
        Arrays.sort(array);
        int result = 0;
        while (M > 0) {
            if ((K + 1) <= M) {
                result += array[N - 1] * K;
                result += array[N - 2];
                M -= (K + 1);
                continue;
            }
            result += array[N - 1] * M;
            M -= M;
        }
        System.out.println(result);
    }

}
