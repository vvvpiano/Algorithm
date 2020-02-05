package basic;

import java.io.*;
import java.util.StringTokenizer;

public class baek_1712 {
    public static void main(String[] args) throws IOException {
        File file = new File("C:/Users/user/IdeaProjects/Start/src/test.txt");
        BufferedReader br = new BufferedReader(new FileReader(file));
//        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int a = Integer.parseInt(st.nextToken());
        int b = Integer.parseInt(st.nextToken());
        int c = Integer.parseInt(st.nextToken());

        int point = 1;
        if(c-b<=0) point = -1;
        else {
            point = (int)(a/(c-b))+1;
        }
        System.out.println(point);
    }
}
