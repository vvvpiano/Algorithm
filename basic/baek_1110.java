package basic;

import java.util.Scanner;

public class baek_1110 {
    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
        int n = s.nextInt(), cycle = 0, before = n, result, after = -1;

        while(n!=after) {
                result = ((int)(Math.floor(before/10)) + before%10);
                after = (before%10)*10 + result%10;
            cycle++;
            before = after;
        }
        System.out.println(cycle);
    }
}
