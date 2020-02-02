package basic;

public class baek_4673 {
    public static void main(String[] args) {
        selfNumber();
    }
    public static void selfNumber(){
        for(int i = 1; i < 100; i++){
            if((i%11)%2 != 0)
                System.out.println(i);
        }
    }
}
