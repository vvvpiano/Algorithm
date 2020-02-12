package basic;

import java.io.*;
import java.util.StringTokenizer;

public class baek_10250 {
    public static void main(String[] args) throws IOException {
//        File file = new File("C:/Users/user/IdeaProjects/Start/src/test.txt");
//        BufferedReader br = new BufferedReader(new FileReader(file));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;
        int T = Integer.parseInt(br.readLine());
        for(int t = 0; t < T; t++) {
            int h,w,n,x,y; String room;
            st = new StringTokenizer(br.readLine());
            h = Integer.parseInt(st.nextToken());
            w = Integer.parseInt(st.nextToken());
            n = Integer.parseInt(st.nextToken());
            if(n%h == 0) {
                y = h;
                x = n/h;
            } else {
                y = n%h;
                x = (int)(n/h)+1;
            }
            if (x<10) room = y+"0"+x;
            else room = ""+y+x;

            System.out.println(room);
        }
    }
}
