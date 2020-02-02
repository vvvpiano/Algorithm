package basic;

import java.io.*;
import java.util.Scanner;
import java.util.StringTokenizer;

public class baek_11022 {
    public static void main (String args[]) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        int T = Integer.parseInt(br.readLine());
        for (int i = 0; i < T; i++) {
            st = new StringTokenizer(br.readLine());
            int a = Integer.parseInt(st.nextToken());
            int b = Integer.parseInt(st.nextToken());
            bw.write(String.format("Case #%d: %d + %d = %d\n",i+1,a,b,a+b));
        }
        bw.flush();
        bw.close();
    }
}
