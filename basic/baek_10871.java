package basic;

import java.util.Scanner;

public class baek_10871 {
    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
        int N = s.nextInt();
        int X = s.nextInt();
        for(int i = 0; i < N; i++) {
            int num = s.nextInt();
            if(num < X) System.out.print(num + " ");
        }

    }
}
