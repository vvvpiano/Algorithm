package basic;

import java.util.Scanner;

public class baek_2839 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(bag(n));
    }
    static int bag(int n){
        int bag = 0;
        while(n>0){
            if(n<=5){
                if(n==3||n==5) return ++bag;
                else return -1;
            } else if(n==6) return (bag+2);
            else if(n==7) return -1;
            else if(n==9) return (bag+3);
            else if(n==12) return (bag+4);
            else {
                n -= 5;
                bag++;
            }
        }
        return -1;
    }
}
