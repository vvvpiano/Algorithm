package basic;

import java.util.ArrayList;
import java.util.Scanner;

public class baek_1065 {
    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
        int n = s.nextInt();
        int count = 0;
        for(int i = 1; i <= n; i++) {
            if(isHan(i)) count++;
        }
        System.out.println(count);
    }
    static boolean isHan(int n){
        if (n<100) return true;

        ArrayList<Integer> digit = new ArrayList<>();
        while(n>0){
            digit.add(n%10);
            n = (int)n/10;
        }
        int diff = digit.get(0) - digit.get(1);
        for(int i = 1; i < digit.size()-1; i++){
            if (diff != digit.get(i)-digit.get(i+1))
                return false;
        }
        return true;
    }
}
