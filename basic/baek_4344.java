package basic;

import java.io.*;
import java.util.StringTokenizer;

public class baek_4344 {
    public static void main(String[] args) throws IOException {
        File file = new File("C:\\Users\\user\\IdeaProjects\\Start\\src\\test.txt");
        BufferedReader br = new BufferedReader(new FileReader(file));
//        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        int T = Integer.parseInt(br.readLine()), sum = 0, superior = 0;

        for(int i = 0; i < T; i++){
            st = new StringTokenizer(br.readLine());
            int[] score = new int[Integer.parseInt(st.nextToken())];
            for(int j = 0; j < score.length ; j++){
                score[j] = Integer.parseInt(st.nextToken());
                sum += score[j];
            }

            int average = sum/score.length;
            for(int j = 0; j < score.length ; j++) {
                if (score[j] > average) superior++;
            }
            bw.write(String.format("%.3f%c\n",((double)superior)/score.length*100,'%'));
            superior = 0;
            sum = 0;
        }

        bw.flush();
        bw.close();

    }
}
