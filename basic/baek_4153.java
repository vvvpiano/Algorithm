package basic;

import java.io.*;
import java.sql.SQLOutput;
import java.util.StringTokenizer;

public class baek_4153 {
    public static void main(String[] args) throws IOException {
        File file = new File("C:/Users/user/IdeaProjects/Start/src/test.txt");
        BufferedReader br = new BufferedReader(new FileReader(file));
//        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        int[] p = new int[3]; int diag = 0, diff =0;
        while(true){
            st = new StringTokenizer(br.readLine());
            for (int i = 0; i < 3; i++)
                p[i] = Integer.parseInt(st.nextToken());
            if(p[0]==0&&p[1]==0&&p[2]==0) break;
            diag = Math.max(p[0],Math.max(p[1],p[2]));
            for(int i = 0; i < 3; i++){
                if(p[i]==diag)
                    diff += diag*diag;
                else
                    diff -= p[i]*p[i];
            }
            if(diff==0) bw.write("right\n");
            else bw.write("wrong\n");
            diag = diff = 0;
        }
        bw.flush();
        bw.close();
    }
}
