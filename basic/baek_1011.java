package basic;

import java.io.*;
import java.util.StringTokenizer;

public class baek_1011 {
    public static void main(String[] args) throws IOException{
        File file = new File("C:/Users/user/IdeaProjects/Start/src/test.txt");
        BufferedReader br = new BufferedReader(new FileReader(file));
//        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        int T = Integer.parseInt(br.readLine());

        for(int t = 0; t < T; t++){
            st = new StringTokenizer(br.readLine());
            int x = Integer.parseInt(st.nextToken());
            int y = Integer.parseInt(st.nextToken());
            int dist = y-x;
            if (dist==0 || dist==1 || dist==2) bw.write(dist+"\n");
            else {
                int n = (int)Math.sqrt(dist);
                if (n*n == dist) bw.write((2*n-1)+"\n");
                else if (n*n < dist && dist <= n*(n+1)) bw.write(2*n + "\n");
                else if ( n*(n+1) < dist && dist < (n+1)*(n+1) ) bw.write((2*n+1) + "\n");
            }
        }

        bw.flush();
        bw.close();

    }
}
