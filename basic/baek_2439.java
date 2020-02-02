package basic;

import java.util.Scanner;

public class baek_2439 {
    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
        int n = s.nextInt();
        for(int i = 1; i <= n; i++){
            for(int k = 0; k < (n-i); k++)
                System.out.print(" ");
            for(int j = 0; j < i; j++)
                System.out.print('*');
            System.out.println();
        }
    }
}
