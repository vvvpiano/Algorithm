package basic;
import java.util.Scanner;

public class baek_5622 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String address = sc.next();
        int time = 0;
        for(int i = 0; i < address.length(); i++) {
            int c = address.charAt(i);
            if(65<=c&&c<68) time += 3;
            else if(68<=c&&c<71) time += 4;
            else if(71<=c&&c<74) time += 5;
            else if(74<=c&&c<77) time += 6;
            else if(77<=c&&c<80) time += 7;
            else if(80<=c&&c<84) time += 8;
            else if(84<=c&&c<87) time += 9;
            else if(87<=c&&c<91) time += 10;
        }
        System.out.println(time);
    }
}
