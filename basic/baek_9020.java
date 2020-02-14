package basic;

import java.io.*;

public class baek_9020 {
    public static void main(String[] args) throws IOException {
        File file = new File("C:/Users/user/IdeaProjects/Start/src/test.txt");
        BufferedReader br = new BufferedReader(new FileReader(file));
//        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        int T = Integer.parseInt(br.readLine());
        int n, p1, p2;
        for(int t = 0; t < T; t++){
            n = Integer.parseInt(br.readLine());
            p1 = n/2; p2 = n - p1;
            while(!(isPrime(p1)&&isPrime(p2))){
                p1--; p2++;
            }
            bw.write(p1+" "+p2+"\n");
        }
        bw.flush();
        bw.close();
    }
    static boolean isPrime(int n) {
        if(n==2) return true;
        else if(n==1||n%2==0) return false;
        else {
            for (int i = 3; i <= Math.sqrt(n) ; i+=2){
                if(n==i) return true;
                if(n%i==0)
                    return false;
            }
            return true;
        }
    }
}
