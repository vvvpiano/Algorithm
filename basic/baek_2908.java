package basic;

import java.util.Scanner;

public class baek_2908 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] input = new String[2];
        for(int i = 0; i < 2; i++){
            input[i] = sc.next();
            char[] c = input[i].toCharArray();
            char swap = c[0];
            c[0] = c[2];
            c[2] = swap;
            input[i] = new String(c);
        }
        System.out.println(Math.max(Integer.parseInt(input[0]),Integer.parseInt(input[1])));
    }
}
