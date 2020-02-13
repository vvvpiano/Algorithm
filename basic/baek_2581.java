package basic;

import java.util.Scanner;

public class baek_2581 {
    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
        int m = s.nextInt(), n = s.nextInt(), sum = 0, min=-1;
        for (int i = m; i <= n ; i++)
            if(isPrime(i)) {
                if(sum==0) min = i;
                sum += i;
            }
        if(sum == 0) System.out.println(-1);
        else {
            System.out.println(sum);
            System.out.println(min);
        }
    }
    static boolean isPrime(int n) {
        if(n==2) return true;
        else if(n==1||n%2==0) return false;
        else {
            for (int i = 3; i <= Math.sqrt(n) ; i+=2){
                if(n==i) return true;
                if(n%i==0)
                    return false;
            }
            return true;
        }
    }
}
