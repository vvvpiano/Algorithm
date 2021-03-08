package ndb;

import java.io.*;
import java.util.Arrays;
import java.util.StringTokenizer;

public class AdventureGuild {
    public static void main(String[] args) throws IOException {
        File file = new File("/Users/youngpro/Desktop/algorithm/Algorithm/test.txt");
        BufferedReader br = new BufferedReader(new FileReader(file));
        int N = Integer.parseInt(br.readLine());
        StringTokenizer st = new StringTokenizer(br.readLine());
        int[] fear = new int[N];
        for (int i = 0; i < N; i++) {
            fear[i] = Integer.parseInt(st.nextToken());
        }
        Arrays.sort(fear);
        int maxGuilds = 0;
        int NofPeopleInGuild = 0;
        for (int i = 0; i < N; i++) {
            NofPeopleInGuild++;
            if (fear[i] <= NofPeopleInGuild)
            {
                maxGuilds++;
                NofPeopleInGuild = 0;
            }
        }
        System.out.println(maxGuilds);
    }
}
