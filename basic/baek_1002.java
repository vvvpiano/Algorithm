package basic;

import java.io.*;
import java.util.StringTokenizer;

public class baek_1002 {
    public static void main(String[] args) throws IOException {
        File file = new File("C:/Users/user/IdeaProjects/Start/src/test.txt");
        BufferedReader br = new BufferedReader(new FileReader(file));
//        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        int T,x1,x2,y1,y2,r1,r2;
        T = Integer.parseInt(br.readLine());
        for (int t = 0; t < T ; t++) {
            st = new StringTokenizer(br.readLine());
            x1 = Integer.parseInt(st.nextToken());
            y1 = Integer.parseInt(st.nextToken());
            r1 = Integer.parseInt(st.nextToken());
            x2 = Integer.parseInt(st.nextToken());
            y2 = Integer.parseInt(st.nextToken());
            r2 = Integer.parseInt(st.nextToken());


            double pdt = Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));
            if(x1==x2 && y1==y2 && r1==r2)
                bw.write("-1\n");
            else if(pdt > r1+r2 || Math.abs(r1-r2) > pdt)
                bw.write("0\n");
            else if(pdt == r1+r2 || Math.abs(r1-r2) == pdt)
                bw.write("1\n");
            else
                bw.write("2\n");
       }
        bw.flush();
        bw.close();
    }
}
