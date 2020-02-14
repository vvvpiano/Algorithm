package basic;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class baek_1085 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int x = Integer.parseInt(st.nextToken()), y = Integer.parseInt(st.nextToken()), w = Integer.parseInt(st.nextToken()), h = Integer.parseInt(st.nextToken());
        System.out.println(Math.min(x,Math.min(y,Math.min(w-x,h-y))));
    }
}
