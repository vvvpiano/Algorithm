package basic;

import java.util.Scanner;

public class baek_1193 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int x = sc.nextInt(), n = 0, dig, up, down;
        while(true){
            if(n*(n+1)/2 <= (x-1) && (x-1) < (n+1)*(n+2)/2) break;
            else n++;
        }
        if(n%2==0) dig = x-1 - n*(n+1)/2;
        else dig = (n) - (x-1 - n*(n+1)/2);
        up = n+1 - (dig);
        down = dig+1;
        System.out.println(up+"/"+down);
    }
}
