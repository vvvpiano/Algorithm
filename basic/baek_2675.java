package basic;

import java.io.*;
import java.util.StringTokenizer;

public class baek_2675 {
    public static void main(String[] args) throws IOException {
        File file = new File("C:/Users/user/IdeaProjects/Start/src/test.txt");
        BufferedReader br = new BufferedReader(new FileReader(file));
//        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        int T = Integer.parseInt(br.readLine());

        for(int t = 0; t < T; t++) {
            st = new StringTokenizer(br.readLine());
            int r = Integer.parseInt(st.nextToken());
            String s = st.nextToken();
            StringBuilder sb = new StringBuilder("");
            for(int i = 0; i < s.length() ; i++){
                for(int j = 0; j < r; j++)
                    sb.append(s.charAt(i));
            }
            bw.write(sb+"\n");
            sb.setLength(0);
        }

        bw.flush();
        bw.close();
    }
}
