package theory;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.*;
import java.util.stream.Collectors;

public class baek_2696 {
    public static void main(String[] args) throws Exception {
        File file = new File("/Users/youngpro/Desktop/algorithm/Algorithm/test.txt");
        BufferedReader br = new BufferedReader(new FileReader(file));
//                BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;
        int T = Integer.parseInt(br.readLine());
        for (int i = 0; i < T; i++) {
            int M = Integer.parseInt(br.readLine());
            int[] array = new int[M];
            int index = 0;
            for (int j = 0; j < M / 10 + 1; j++) {
                st = new StringTokenizer(br.readLine());
                while (st.hasMoreTokens())
                    array[index++] = Integer.parseInt(st.nextToken());
            }
            print_odd_median(M, array);
        }
    }

    public static void print_odd_median(int M, int[] array) {
        PriorityQueue<Integer> small = new PriorityQueue<>(Collections.reverseOrder());
        PriorityQueue<Integer> big = new PriorityQueue<>();
        small.offer(Integer.MAX_VALUE);
        big.offer(Integer.MIN_VALUE);
        ArrayList<String> answer = new ArrayList<>();
        for (int i = 0; i < array.length; i++) {
            int n = array[i];
            if (i%2 == 0) {
                ArrayList<Integer> select = new ArrayList<>(Arrays.asList(small.poll(), n, big.poll()));
                Collections.sort(select);
                answer.add(select.get(1).toString());
                small.offer(select.get(0));
                small.offer(select.get(1));
                big.offer(select.get(2));
            } else {
                ArrayList<Integer> select = new ArrayList<>(Arrays.asList(small.poll(), n));
                Collections.sort(select);
                small.offer(select.get(0));
                big.offer(select.get(1));
            }
        }
        System.out.println(answer.size());
        int i = 0;
        while (i < answer.size() / 10) {
            List<String> sublist = answer.subList(i * 10, (i+1) * 10);
            System.out.println(sublist.stream().collect(Collectors.joining(" ")));
            i++;
        }
        List<String> sublist = answer.subList(i * 10, answer.size());
        System.out.println(sublist.stream().collect(Collectors.joining(" ")));
    }
}
