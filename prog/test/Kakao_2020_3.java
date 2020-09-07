package prog;

import java.util.*;

public class Kakao_2020_3 {
    public static void main(String[] args) {
        String[] gems = {"ZZZ", "YYY", "NNNN", "YYY", "BBB"};
        HashSet<String> gemsSet = new HashSet<>();
//        ArrayList<int[]> answers = new ArrayList<>();
        for (String g : gems)
            gemsSet.add(g);

        int[] min = {0, Integer.MAX_VALUE};
        for (int i = 0; i < gems.length - gemsSet.size() + 1; i++) {
            ArrayList<String> gemCheck = new ArrayList<>();
            int[] answer = {i + 1, 0};
            for (int j = i; j < gems.length; j++) {
                if (!gemCheck.contains(gems[j]))
                    gemCheck.add(gems[j]);
                if (gemCheck.size() == gemsSet.size()) {
                    answer[1] = j + 1;
                    break;
                }
            }
            if (answer[1] != 0) {
                int minDiff = min[1] - min[0];
                int newDiff = answer[1] - answer[0];
                if (minDiff > newDiff) {
                    min[0] = answer[0];
                    min[1] = answer[1];
                }
            }
        }


//        int[] min = answers.get(0);
//        for (int i = 0; i < answers.size(); i++) {
//            int[] arr = answers.get(i);
//            int minDiff = min[1] - min[0];
//            int newDiff = arr[1] - arr[0];
//            if(minDiff > newDiff)
//                min = arr;
//        }

        System.out.println(min[0] + ", " + min[1]);
    }
}
