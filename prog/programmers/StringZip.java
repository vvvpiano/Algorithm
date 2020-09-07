import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class StringZip {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String s = scanner.nextLine();

        int min = 1000;
        if (s.length() == 1)
            min = 1;
        for (int i = 1; i <= s.length() / 2; i++) {
            int result = zip(splitStrings(s, i)).length();
            if (result < min)
                min = result;
        }
        System.out.println(min);
    }

    public static List<String> splitStrings(String s, int interval) {
        List<String> output = new ArrayList<>();
        int start = 0;
        int end = interval;
        for (int i = 0; i < s.length() / interval; i++) {
            output.add(s.substring(start, end));
            start += interval;
            end += interval;
        }
        if (start < s.length())
            output.add(s.substring(start));
        return output;
    }

    public static String zip(List<String> strings) {
        String zippedString = "";
        String prev = strings.get(0);
        int count = 1;
        for (int i = 1; i < strings.size() ; i++) {
            if (strings.get(i).equals(prev)) {
                count++;

            } else {
                zippedString += makeUnit(prev, count);
                prev = strings.get(i);
                count = 1;
            }
            if (i == strings.size() - 1)
                zippedString += makeUnit(prev, count);
        }
        return zippedString;
    }

    public static String makeUnit(String s, int count) {
        if (count == 1)
            return s;
        return "" + count + s;
    }
}