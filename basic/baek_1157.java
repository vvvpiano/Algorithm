package basic;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;

public class baek_1157 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] alpha = new int[26];
        int max = -1;
        char result = '?';
        String s = sc.next();
        s = s.toUpperCase();
        for(int i = 0; i < s.length(); i++){
            alpha[s.charAt(i)-65]++;
        }
        for(int i = 0; i < alpha.length; i++){
            if (max < alpha[i]){
                max = alpha[i];
                result = (char)(i+65);
            } else if(max == alpha[i])
                result = '?';
        }

        System.out.print(result);
    }
}
