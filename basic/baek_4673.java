package basic;

public class baek_4673 {
    static boolean[] isSelf = new boolean[10001];
    public static void main(String[] args) {
        for(int i = 1; i < 10001; i++)
            isSelf[i] = true;

        for(int i = 1; i < 10000; i++) {
            if(isSelf[i]==true){ // 아직 검사를 거치지 않은 수
                d(i);
            }
        }

        System.out.println("d(n)끝, 배열 isSelf 출력 시작");
        for(int i = 1; i < 10000; i++) {
            if(isSelf[i] == true)
                System.out.println(i);
        }
    }
    public static void d(int n){
        int number = n, result = n;
        while(number > 0) {
            result += number % 10;
            number = (int) number / 10;
        }
        if(result < 10000) {
            isSelf[result] = false;
//            System.out.println(result);
            d(result);
        }
    }
}
