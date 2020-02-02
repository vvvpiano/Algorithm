package basic;

import java.io.*;
import java.util.StringTokenizer;

public class baek_1546 {
    public static void main(String[] args) throws IOException {
        File file = new File("C:\\Users\\user\\IdeaProjects\\Start\\src\\test.txt");
        BufferedReader br = new BufferedReader(new FileReader(file));
//        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;

        int T = Integer.parseInt(br.readLine()), max = Integer.MIN_VALUE;
        double sum = 0;
        int[] score = new int[T];
        st = new StringTokenizer(br.readLine());
        for(int i = 0; i < T; i++) {
            score[i] = Integer.parseInt(st.nextToken());
            if(score[i]>max) max = score[i];
        }

        for(int i = 0; i < T; i++) {
            sum += score[i];
        }
        System.out.println(sum/T/max*100);
    }
}
