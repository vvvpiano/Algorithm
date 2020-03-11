package basic;

import java.util.Scanner;
public class baek_2884 {
    public static void main (String args[]) {
        Scanner s = new Scanner(System.in);
        int h, m;
        h = s.nextInt();
        m = s.nextInt();
        if(m >= 45) { m -= 45; }
        else {
            if(h == 0) {
                h = 23;
            } else {
                --h;
            }
            m = m + 60 - 45;
        }
        System.out.printf("%d %d",h,m);
    }
}