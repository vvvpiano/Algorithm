package basic;

import java.io.*;

public class baek_1011 {
    public static void main(String[] args) throws IOException{
        File file = new File("C:/Users/user/IdeaProjects/Start/src/test.txt");
        BufferedReader br = new BufferedReader(new FileReader(file));
//        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        int T = Integer.parseInt(br.readLine());
        for(int t = 0; t < T; t++){
            int x = Integer.parseInt(br.readLine());
            int y = Integer.parseInt(br.readLine());
        }
        bw.flush();
        bw.close();
    }
}
