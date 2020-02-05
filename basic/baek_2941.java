package basic;

import java.util.Scanner;

public class baek_2941 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        String[] cro = {"c=","c-","dz=","d-","lj","nj","s=","z="};
        int count = 0;
        System.out.println(s);
        while(s.length()>0){
            for(int i = 0; i < cro.length; i++){
                if(s.startsWith(cro[i])){
                    count++;
                    s = s.substring(cro[i].length(),s.length());
                    System.out.println(s);
                    break;
                }
            }
            count++;
            s = s.substring(1,s.length());
        }
        System.out.println(count);
    }
}
