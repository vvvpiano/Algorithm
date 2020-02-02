package basic;

import java.io.*;
//import java.util.Arrays;
import java.util.StringTokenizer;

public class baek_10818 {

    public static void main(String[] args) throws IOException {
        File file = new File("C:\\Users\\user\\IdeaProjects\\Start\\src\\test.txt");
        BufferedReader br = new BufferedReader(new FileReader(file));
//        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        int T = Integer.parseInt(br.readLine());
        int[] arr = new int[T];
        int max = Integer.MIN_VALUE, min = Integer.MAX_VALUE;

        st = new StringTokenizer(br.readLine());
        for (int i = 0; i < T; i++) {
            arr[i] = Integer.parseInt(st.nextToken());
        }
        for (int i = 0; i < T; i++) {
            if (arr[i] > max) max = arr[i];
            if (arr[i] < min) min = arr[i];
        }
//        Arrays.sort(arr);
//        bw.write(arr[0]+" "+arr[T-1]);
        bw.write(min+" "+max);
        bw.flush();
        bw.close();
    }
}
