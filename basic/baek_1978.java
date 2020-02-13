package basic;

import java.io.*;

public class baek_1978 {
    public static void main(String[] args) throws IOException {
        File file = new File("C:/Users/user/IdeaProjects/Start/src/test.txt");
        BufferedReader br = new BufferedReader(new FileReader(file));
//        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int T = Integer.parseInt(br.readLine());
        String[] input = br.readLine().split(" ");
        int count = 0;
        for (int i = 0; i < T ; i++) {
            int n = Integer.parseInt(input[i]);
            if(n == 2){
                count++;
                continue;
            } else if (n==1 || n%2==0) continue;

            int d = 3;
            while((int)Math.sqrt(n) >= d){
                if (n!=d && n%d==0) {
                    count--;
                    break;
                }
                d += 2;
            }
            count++;
        }

        System.out.println(count);
    }
}
