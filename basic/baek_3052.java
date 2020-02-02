package basic;

import java.util.Scanner;

public class baek_3052 {
    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
        int divider = 42, count = 0;
        int[] input = new int[10];
        int[] remainder = new int[divider];

        for(int i = 0; i < 10; i++) {
            input[i] = s.nextInt();
        }

        for(int i = 0; i < 10; i++){
            remainder[input[i]%divider]++;
        }

        for(int i = 0; i < divider; i++){
            if(remainder[i] != 0){
                count++;
            }
        }
        System.out.println(count);
    }
}