package basic;

import java.util.Scanner;

public class baek_2577 {
    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
        int a = s.nextInt(), b = s.nextInt(), c = s.nextInt();
        int mul = a*b*c;
        int[] num = new int[10];
        while(mul>0){
            num[mul%10]++;
            mul /= 10;
        }
        for(int i = 0; i < 10; i++)
            System.out.println(num[i]);
    }
}
