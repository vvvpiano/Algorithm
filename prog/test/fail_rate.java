package prog;

import java.util.Arrays;

public class fail_rate {
    public static void main(String[] args) {
        int N = 4;
        int[] stages = {4,4,4,4,4};
// 풀이 시작

        int[] remains = countRemain(N, stages);
        double[] failRate = calFailRate(stages.length, remains);
        double[] sortedFR = Arrays.copyOf(failRate,failRate.length-1);
        Arrays.sort(sortedFR);
        for (int i = 0; i < sortedFR.length; i++) {
            System.out.println(sortedFR[i]);
        }
        System.out.println("===========");

        int[] index = new int[sortedFR.length];
        for (int i = sortedFR.length-1; i >= 0 ; i--) {
            for (int j = 0; j < failRate.length-1 ; j++) {
                if(sortedFR[i]==failRate[j]){
                    index[sortedFR.length-1-i] = j+1;
                    failRate[j] = -1;
                    System.out.printf("sortedFR인덱스 %d찾는 중, 값:%f, failRate 인덱스%d와 일치, index[i]:%d\n",i,sortedFR[i],j,index[i]);
                    break;
                }
            }
        }

        for (int i = 0; i < index.length ; i++) {
            System.out.print(index[i]+" ");
        }

    }
    static int[] countRemain(int N, int[] stages) {
        int[] remains = new int[N+1];
        for(int i = 0; i < stages.length; i++)
            remains[stages[i]-1]++;
        return remains;
    }

    static double[] calFailRate (int userNumber, int[] remains) {
        int passedUsers = userNumber;
        double[] failRate = new double[remains.length];

        for (int i = 0; i < remains.length; i++) {
            failRate[i] = (double)remains[i]/passedUsers;
            System.out.printf("%d명 도전, %d명 아직 도전중, 실패율:%f\n",passedUsers, remains[i], failRate[i]);
            passedUsers -= remains[i];
        }

        return failRate;
    }
}
