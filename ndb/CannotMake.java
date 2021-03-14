package ndb;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class CannotMake {
    static int N;
    static int[] coins;
    static List<Integer> combinations;
    public static void main(String[] args) throws IOException {
        File file = new File("/Users/youngpro/Desktop/algorithm/Algorithm/test.txt");
        BufferedReader bf = new BufferedReader(new FileReader(file));

        N = Integer.parseInt(bf.readLine());
        String[] s = bf.readLine().split(" ");
        coins = new int[N];
        for (int i = 0; i < N; i++) {
            coins[i] = Integer.parseInt(s[i]);
        }
        Arrays.sort(coins);
        combinations = new ArrayList<Integer>();
        fillComb();
        int minCannotMake = 0;
        while (true) {
            if (!combinations.contains(++minCannotMake))
                break;
        }
        System.out.println(minCannotMake);
    }

    public static void fillComb() {
        for (int i = 0; i < N; i++) {
            int[] array = new int[i + 1];
            fillCombDepth(i, 0, array, 0);
        }
    }

    public static void fillCombDepth(int depth, int currentDepth, int[] array, int start) {
        if (currentDepth > depth) {
            combinations.add(arraySum(array));
            return;
        }
        for (int i = start; i < coins.length; i++) {
            array[currentDepth] = coins[i];
            fillCombDepth(depth, currentDepth + 1, array, i + 1);
        }
    }

    public static int arraySum(int[] array) {
        int sum = 0;
        for (int i = 0; i < array.length; i++) {
            sum += array[i];
        }
        return sum;
    }
}
