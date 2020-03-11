package basic;

import java.util.Scanner;

public class baek_3053 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int r = sc.nextInt();
        double uclid,taxi;
        uclid = Math.PI *r*r;
        taxi = r*r*2;
        System.out.println(uclid);
        System.out.println(taxi);
    }
}
