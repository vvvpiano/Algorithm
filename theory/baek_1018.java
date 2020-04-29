package theory;

import java.io.*;

public class baek_1018 {
    public static void main(String[] args) throws IOException {
        File file = new File("C:/Users/user/IdeaProjects/Start/src/test.txt");
        BufferedReader br = new BufferedReader(new FileReader(file));
//        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String[] input = br.readLine().split(" ");
        int n = Integer.parseInt(input[0]);
        int m = Integer.parseInt(input[1]);

        char[][] board = new char[n][m];
        for (int i = 0; i < n ; i++)
            board[i] = br.readLine().toCharArray();

        int Wver = checkMain('w', board);
        int Bver = checkMain('b', board);

        System.out.println(Math.min(Wver, Bver));

    }
    static int checkMain(char startColor, char[][] board) {
        int minChange = Integer.MAX_VALUE;
        int n = board.length, m = board[0].length;

        char[][] checkBoard = makeCB(startColor,n,m);
        int[][] diff = checkDiff(checkBoard, board);

        int sum = 0;
        for (int i = 0; i <= n-8 ; i++) {
            for (int j = 0; j <= m-8 ; j++) {
                // i,j부터 아래, 오른쪽으로 8칸씩 더하기
                for (int k = i; k < i+8 ; k++) {
                    for (int l = j; l < j+8 ; l++) {
                        sum += diff[k][l];
                    }
                }
                if(sum < minChange) minChange = sum;
                sum = 0;
            }
        }
        return minChange;
    }
    static char[][] makeCB(char startColor, int n, int m){
        String[] s = {makeString('w',m), makeString('b',m)}; int start = 0;
        char[][] board = new char[n][m];
        if(startColor == 'b') start = 1;
        for (int i = 0; i < n ; i++) {
            board[i] = s[start].toCharArray();
            start=(start+1)%2;
        }
        return board;
    }

    static String makeString(char startColor, int m){
        String s = ""; int start = 0;
        if(startColor == 'b') start = 1;
        for (int i = 0; i < m ; i++) {
            if(start==0) s += "W";
            else s+="B";
            start=(start+1)%2;
        }
        return s;
    }

    static int[][] checkDiff(char[][] cb, char[][] board){
        int[][] diff = new int[cb.length][cb[0].length];
        for (int i = 0; i < cb.length; i++) {
            for (int j = 0; j < cb[1].length; j++) {
                if(cb[i][j] == board[i][j]) diff[i][j] = 0; // 같으면 0
                else diff[i][j] = 1; // 다르면 1
            }
        }
        return diff;
    }
}
