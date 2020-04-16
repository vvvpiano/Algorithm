package theory;

import java.util.ArrayList;
import java.util.Scanner;

public class baek_2231 {
    static ArrayList<Integer> answer = new ArrayList<>();
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Integer N = sc.nextInt();
        int numOfDigit = N.toString().length();
        int[] divider = new int[numOfDigit];
        initDivider(divider);

        findConstructor(N, divider);

        if(answer.size()==0)
            System.out.println(0);
        else
            System.out.println(answer.get(answer.size()-1));
    }

    static void initDivider(int[] divider) {
        divider[0] = 2;
        for (int i = 1; i < divider.length ; i++) {
            divider[i] = (int)Math.pow(10,i)+1;
        }
    }

    static void findConstructor(int N, int[] divider) {
        int[] constructor = new int[divider.length];
        int n = N;
        divide(N, divider.length-1, divider, constructor);
        return;
    }

    static void divide(int n, int index, int[] divider, int[] constructor) {
        if(index == 0) {
            if(n%2==0 && 0<=n/2 && n/2<10){
                constructor[index] = n/divider[index];
                answer.add(sum(constructor));
            }
            return;
        }

        int d = (int)n / divider[index];
        int left = n - d*divider[index];
        int leftMax = leftMax(index, divider);
        if (left<leftMax && 0<=d && d<10) {
            constructor[index] = d;
            divide(left, index-1, divider, constructor);
        }
        if(0<=(d-1) && (d-1)<10){
            constructor[index] = d-1;
            left = n - (d-1)*divider[index];
            divide(left, index-1, divider, constructor);
        }
    }

    static int leftMax(int digit, int[] divider) {
        int sum = 0;
        for (int i = 0; i < digit ; i++) {
            sum += 9 * divider[i];
        }
        return sum;
    }

    static int sum(int[] constructor) {
        int sum = 0;
        for (int i = 0; i < constructor.length; i++) {
            sum += constructor[i]*Math.pow(10,i);
        };
        return sum;
    }
}
