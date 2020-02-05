package basic;

import java.io.*;
import java.util.ArrayList;

public class baek_1316 {
    public static void main(String[] args) throws IOException {
        File file = new File("C:/Users/user/IdeaProjects/Start/src/test.txt");
        BufferedReader br = new BufferedReader(new FileReader(file));
//        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int T = Integer.parseInt(br.readLine()), count = 0;
        boolean isCtn = true;
        ArrayList<Character> alpha = new ArrayList<>();
        for(int t = 0; t < T; t++) {
            String s = br.readLine();

            for(int i = 0; i < s.length(); i++){
                char c = s.charAt(i);
                if(alpha.contains(c)){
                    if(alpha.get(alpha.size()-1)!=c){
                        isCtn = false;
                        break;
                    }
                }
                else {
                    alpha.add(c);
                }
            }
            if(isCtn) count++;
            isCtn = true;
            alpha.clear();
        }
        System.out.println(count);
    }

}
