package theory;

import java.util.Scanner;

public class baek_9663 {
    static int count = 0;
    static int N;
    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
        N = s.nextInt();
        int[] queenIdx = new int[N];
        backtracking(0, queenIdx);
        System.out.println(count);
    }

    public static void backtracking(int currentRow, int[] queenIdx) {
        if (currentRow >= N) {
            count++;
            return;
        }
        for (int i = 0; i < N; i++) {
            int newQueenPosition = i;
            if (isPossible(queenIdx, newQueenPosition, currentRow)) {
                queenIdx[currentRow] = i;
                backtracking(currentRow + 1, queenIdx);
            }
        }
    }

    public  static boolean isPossible(int[] queenIdx, int newQueenPosition, int currentRow) {
        for (int j = 0; j < currentRow; j++) {
            if (newQueenPosition == queenIdx[j])
                return false;
            if (Math.abs(newQueenPosition - queenIdx[j]) == currentRow - j)
                return false;
        }
        return true;
    }
}
