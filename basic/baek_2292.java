package basic;

import java.util.Scanner;

public class baek_2292 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int layer = 0;
        if(n==1) layer=1;
        while(n>1) {
            n -= layer * 6;
            layer++;
            System.out.println(layer);
        }
    }
}
