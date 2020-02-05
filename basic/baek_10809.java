package basic;

import java.io.BufferedWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.Scanner;

public class baek_10809 {
    public static void main(String[] args) throws IOException {
        Scanner sc = new Scanner(System.in);
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        String s = sc.next();
        int[] alpha = new int[26];
        for(int i = 0; i < 26; i++)
            alpha[i] = -1;

        for(int i = 0; i < s.length(); i++){
            int index = s.charAt(i)-97;
            if(alpha[index] == -1)
                alpha[index] = i;
        }

        for(int i = 0; i < 26; i++)
            bw.write(alpha[i]+" ");

        bw.flush();
        bw.close();
    }
}
