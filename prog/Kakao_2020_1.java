package prog;

public class Kakao_2020_1 {
    static int[] d2 = {1,0,1,2,1,2,3,2,3,4,3,4};
    static int[] d5 = {2,1,2,1,0,1,2,1,2,3,2,3};
    static int[] d8 = {3,2,3,2,1,2,1,0,1,2,1,2};
    static int[] d0 = {4,3,4,3,2,3,2,1,2,1,0,1};

    public static void main(String[] args) {

        int[] numbers = {7, 0, 8, 2, 8, 3, 1, 5, 7, 6, 2};
        String hand = "left"; String answer = "";
        int leftNow = '*'; int rightNow = '#';

        for (int i = 0; i < numbers.length; i++) {
            if (numbers[i] == 1 || numbers[i] == 4 || numbers[i] == 7) {answer += "L"; leftNow = numbers[i];}
            else if (numbers[i] == 3 || numbers[i] == 6 || numbers[i] == 9) {answer += "R"; rightNow = numbers[i];}
            else {
                int leftD = distance(leftNow, numbers[i]);
                int rightD = distance(rightNow, numbers[i]);
//                System.out.printf("leftD:%d, rightD:%d\n",leftD,rightD);

                if(leftD==rightD) {
                    if (hand.equals("left")) {
                        answer += "L";
                        leftNow = numbers[i];
                    } else if (hand.equals("right")) {
                        answer += "R";
                        rightNow = numbers[i];
                    } else answer += "?";
                } else if(leftD < rightD) {
                    answer += "L";
                    leftNow = numbers[i];
                } else if(leftD > rightD) {
                    answer += "R";
                    rightNow = numbers[i];
                } else answer += "!";
            }
//            System.out.format("leftNow:%d rightNow:%d %d번버튼 눌렀음 answer:%s\n",leftNow,rightNow,numbers[i],answer.substring(answer.length()-1));
        }
        System.out.println(answer);
    }

    static int distance(int now, int num) {
        int position = now;
        if(now == '*') position = 10;
        if(now == 0) position = 11;
        if(now == '#') position = 12;
        switch (num) {
            case 2:
                return d2[position-1];
            case 5:
                return d5[position-1];
            case 8:
                return d8[position-1];
            case 0:
                return d0[position-1];
            default:
                return -1;
        }
    }
}
