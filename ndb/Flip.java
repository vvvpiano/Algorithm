package ndb;

import java.io.*;

public class Flip {
    public static void main(String[] args) throws IOException {
        File file = new File("/Users/youngpro/Desktop/algorithm/Algorithm/test.txt");
        BufferedReader br = new BufferedReader(new FileReader(file));
//        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String str = br.readLine();
        int zeroGroupCount = 0;
        int oneGroupCount = 0;
        int i = 0;
        while (i < str.length()) {
            if (str.charAt(i) == '0') {
                zeroGroupCount++;
                while (i < str.length() && str.charAt(i) == '0')
                    i++;
            } else {
                oneGroupCount++;
                while (i < str.length() && str.charAt(i) == '1')
                    i++;
            }
        }
        System.out.println(Math.min(zeroGroupCount, oneGroupCount));
    }
}
