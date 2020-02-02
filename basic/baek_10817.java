package basic;

import java.util.Scanner;
import java.util.Arrays;
public class baek_10817 {
    public static void main (String args[]) {
        Scanner s = new Scanner(System.in);
        int[] n = new int[3];
        for(int i = 0; i < n.length; i++) {
            n[i] = s.nextInt();
        }
        Arrays.sort(n);
        System.out.println(n[1]);
    }
}
