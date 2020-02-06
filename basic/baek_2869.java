package basic;

import java.io.*;
import java.util.StringTokenizer;

public class baek_2869 {
    public static void main(String[] args) throws IOException {
        File file = new File("C:/Users/user/IdeaProjects/Start/src/test.txt");
        BufferedReader br = new BufferedReader(new FileReader(file));
//        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int a = Integer.parseInt(st.nextToken());
        int b = Integer.parseInt(st.nextToken());
        int v = Integer.parseInt(st.nextToken());
        int days;
        v -= a;
        days = (int)v/(a-b);
        if(days*(a-b)==v) days += 1;
        else days += 2;
        System.out.println(days);
    }
}
