package ndb;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

public class MultiOrPlus {
    public static void main(String[] args) throws IOException {
        File file = new File("/Users/youngpro/Desktop/algorithm/Algorithm/test.txt");
        BufferedReader br = new BufferedReader(new FileReader(file));
        String str = br.readLine();
        int[] numbers = new int[str.length()];
        for (int i = 0; i < str.length(); i++) {
            numbers[i] = str.charAt(i) - '0';
        }
        int result = 0;
        for (int i = 0; i < numbers.length; i++) {
            result = Math.max(result + numbers[i], result * numbers[i]);
        }
        System.out.println(result);
    }
}
