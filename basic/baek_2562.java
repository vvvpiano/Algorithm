package basic;

import java.util.Scanner;

public class baek_2562 {
    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
        int[] arr = new int[9];
        int max, index;
        for(int i = 0; i < 9; i++) {
            arr[i] = s.nextInt();
        }
        max = arr[0]; index = 0;
        for(int i = 1; i < 9; i++) {
            if(arr[i] > max){
                max = arr[i];
                index = i;
            }
        }
        System.out.println(max);
        System.out.println(index+1);
    }
}