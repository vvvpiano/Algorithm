package basic;

import java.io.*;
import java.util.StringTokenizer;

public class baek_10951 {
    public static void main(String[] args) throws IOException {
        File file = new File("C:/Users/user/IdeaProjects/Start/src/test.txt");
        BufferedReader br = new BufferedReader(new FileReader(file));
//        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st; int a,b;
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        while(br.ready()) {
            st = new StringTokenizer(br.readLine());
            a = Integer.parseInt(st.nextToken());
            b = Integer.parseInt(st.nextToken());
            if((a!=0)&&(b!=0)){
                bw.write((a+b) + "\n");
            }
        }
        bw.flush();
        bw.close();
    }
}
