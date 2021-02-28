//package basic;
import java.io.*;

public class baek_10989 {
    public static void main(String[] args) throws IOException {
        File file = new File("/Users/youngpro/Desktop/algorithm/Algorithm/test.txt");
        BufferedReader br = new BufferedReader(new FileReader(file));
//        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        int N = Integer.parseInt(br.readLine());
        int[] count = new int[10001];
        for (int i = 0; i < N; i++) {
            count[Integer.parseInt(br.readLine())]++;
        }
        for (int i = 0; i < count.length; i++) {
            while (count[i]-- > 0) {
                bw.write(i + "\n");
            }
        }
        br.close();
        bw.flush();
        bw.close();
    }
}
