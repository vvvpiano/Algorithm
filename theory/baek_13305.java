package theory;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class baek_13305 {
    public static void main(String[] args) throws Exception {
        File file = new File("/Users/youngpro/Desktop/algorithm/Algorithm/test.txt");
        BufferedReader br = new BufferedReader(new FileReader(file));
//        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;

        // 인풋 처리
        int N = Integer.parseInt(br.readLine());
        long[] distance = new long[N - 1];
        long[] oilCost = new long[N];
        st = new StringTokenizer(br.readLine());
        for (int i = 0; i < N - 1; i++) {
            distance[i] = Long.parseLong(st.nextToken());
        }
        st = new StringTokenizer(br.readLine());
        for (int i = 0; i < N - 1; i++) { // 마지막 도시의 기름가격은 고려하지 않음
            oilCost[i] = Long.parseLong(st.nextToken());
        }

//      알고리즘 시작
        long minCostSum = 0;
        long minCost = oilCost[0];
        for (int i = 0; i < N - 1; i++) {
            if (oilCost[i] < minCost)
                minCost = oilCost[i];

            minCostSum += minCost * distance[i];
        }

        System.out.println(minCostSum);
    }
}
