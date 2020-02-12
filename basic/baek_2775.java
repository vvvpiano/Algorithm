package basic;

import java.io.*;

public class baek_2775 {
    static int[][] people = new int[15][15];
    static void setPeople(){
        for(int i = 1; i < 15; i++) people[0][i] = i;
        for(int i = 1; i < 15; i++) {
            for(int j = 1; j < 15; j++) {
                for(int k = 1; k <= j; k++)
                    people[i][j] += people[i-1][k];
            }
        }

        for(int i = 0; i < people.length; i++) {
            for(int j = 0; j < people[i].length; j++)
                System.out.print(people[i][j]+" ");
            System.out.println();
        }
    }
    public static void main(String[] args) throws IOException {
        setPeople();
        File file = new File("C:/Users/user/IdeaProjects/Start/src/test.txt");
        BufferedReader br = new BufferedReader(new FileReader(file));
//        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        int T = Integer.parseInt(br.readLine());
        for(int t = 0; t < T; t++){
            int k = Integer.parseInt(br.readLine());
            int n = Integer.parseInt(br.readLine());
            bw.write(people[k][n]+"\n");
        }
        bw.flush();
        bw.close();
    }
}
