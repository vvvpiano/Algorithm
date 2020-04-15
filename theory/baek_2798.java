package theory;

import java.io.*;
import java.util.Arrays;
import java.util.StringTokenizer;

public class baek_2798 {
    public static void main(String[] args) throws IOException {
        File file = new File("C:/Users/user/IdeaProjects/Start/src/test.txt");
        BufferedReader br = new BufferedReader(new FileReader(file));
//        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;
        int n, m; int[] card;
        st = new StringTokenizer(br.readLine());
        n = Integer.parseInt(st.nextToken()); m = Integer.parseInt(st.nextToken());
        st = new StringTokenizer(br.readLine());
        card = new int[n];
        for (int i = 0; i < n ; i++)
            card[i] = Integer.parseInt(st.nextToken());

        Arrays.sort(card);
        int best = checkUp(n, m, card);

        System.out.println(best);
    }

    static int checkUp(int n, int m, int[] card){
        int sum, best=0;

        for (int i = n; i > 2 ; i--) {
            sum = card[i-1];
            for (int j = i-1; j > 1 ; j--) {
                sum += card[j-1];
                if(sum > m)
                    continue;
                for (int k = j-1; k > 0 ; k--) {
                    sum += card[k-1];
                    best = updateBest(m, sum, best);
                    if(m == best)
                        return best;
                    sum -= card[k-1];
                }
                sum -= card[j-1];
            }
        }
        return best;
    }
    static int updateBest(int m, int sum, int best) {
        int diff1 = m - best;
        int diff2 = m - sum;

        if(diff2 < 0)
            return best;

        if (diff1 > diff2)
            best = sum;

        return best;
    }
}
