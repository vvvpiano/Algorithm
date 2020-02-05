package basic;

import java.util.Scanner;

public class baek_11720 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int T = sc.nextInt();
        String s = sc.next();
        int sum = 0;
        for(int i = 0; i < s.length(); i++){
            sum += Character.getNumericValue(s.charAt(i));
        }
        System.out.println(sum);
    }
}
