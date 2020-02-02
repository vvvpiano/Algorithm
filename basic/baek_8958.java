package basic;

import java.io.*;

public class baek_8958 {
    public static void main(String[] args) throws IOException {
        File file = new File("C:\\Users\\user\\IdeaProjects\\Start\\src\\test.txt");
        BufferedReader br = new BufferedReader(new FileReader(file));
//        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        int T = Integer.parseInt(br.readLine()), point = 0, total = 0;
        String[] OX = new String[T];
        for(int i = 0; i < T; i++) {
            OX[i] = br.readLine();
        }

        for(int i = 0; i < T; i++) {
            for(int j = 0; j < OX[i].length(); j++) {
                if(OX[i].charAt(j)=='O'){
                    point++;
                    total += point;
                } else if(OX[i].charAt(j)=='X') {
                    point = 0;
                }
            }
            bw.write(total+"\n");
            point = 0;
            total = 0;
        }
        bw.flush();
        bw.close();

    }
}
