package basic;

import java.io.*;
import java.util.StringTokenizer;

public class baek_10952 {
    public static void main(String[] args) throws IOException {
        File file = new File("C:/Users/user/IdeaProjects/Start/src/test.txt");
        BufferedReader br = new BufferedReader(new FileReader(file));
//        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        int a = Integer.parseInt(st.nextToken());
        int b = Integer.parseInt(st.nextToken());
        while(!(a==0 && b==0)) {
            bw.write((a+b) + "\n");
            st = new StringTokenizer(br.readLine());
            a = Integer.parseInt(st.nextToken());
            b = Integer.parseInt(st.nextToken());
        }
        bw.flush();
        bw.close();
    }
}
