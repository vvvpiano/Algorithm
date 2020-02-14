package basic;

import java.io.BufferedWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.Scanner;

public class baek_4948 {
    static int[] prime = new int[1000001];
    static void Eratos() {
        prime[0] = prime[1] = 1; // 소수가 아님
        for(int i = 2; i < (int)Math.sqrt(1000001); i++) {
            for(int j = 2; i*j < 1000001; j++)
                prime[i*j] = 1;
        }
    }
    public static void main(String[] args) throws IOException {
        Eratos();
        Scanner s = new Scanner(System.in);
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        int n = s.nextInt(), count=0;
        while(n!=0){
            for(int i = n+1 ; i <= 2*n; i++)
                if(prime[i]!=1) count++;
            bw.write(count+"\n");
            n = s.nextInt(); count = 0;
        }
        bw.flush();
        bw.close();
    }
}
