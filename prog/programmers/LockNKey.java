package prog.programmers;

public class LockNKey {
    public static void main(String[] args) {
        int[][] key = {
                {0, 0, 0},
                {1, 0, 0},
                {0, 1, 1}
        };
        int[][] lock = {
                {1, 1, 1},
                {1, 1, 0},
                {1, 0, 1}
        };
        System.out.println(solution(key, lock));
    }

    public static boolean solution(int[][] key, int[][] lock) {
        int[][] padArr = makePadding(key.length, lock);
        for (int i = 0; i < 4; i++) { // 0, 1, 2, 3
            System.out.println("========================");
            if (tryWith(key, padArr))
                return true;
            key = turn90Clockwise(key);
        }
        return false;
    }

    public static int[][] makePadding(int keyLength, int[][] lock) {
        int size = keyLength * 2 + lock.length;
        int[][] padArr = new int[size][size];

        for (int i = 0; i < lock.length; i++) {
            for (int j = 0; j < lock.length; j++) {
                padArr[keyLength + i][keyLength + j] = lock[i][j];
            }
        }
        return padArr;
    }

    public static boolean tryWith(int[][] key, int[][] lock) {
        for (int i = 0; i < lock.length - key.length + 1; i++) {
            for (int j = 0; j < lock.length - key.length + 1; j++) {
                if (canOpen(key.length, fillLock(key, lock, i, j)))
                    return true;
            }
        }
        return false;
    }

    public static int[][] turn90Clockwise(int[][] arr) {
        int w = arr.length;
        int[][] newArr = new int[w][w];
        for (int i = 0; i < w; i++) {
            for (int j = 0; j < w; j++) {
                newArr[i][j] = arr[w - j - 1][i];
            }
        }
        return newArr;
    }

    public static boolean canOpen(int keyLength, int[][] padLock) {
        int lockLength = padLock.length - keyLength * 2;
        for (int i = 0; i < lockLength; i++) {
            for (int j = 0; j < lockLength; j++) {
                if (padLock[keyLength + i][keyLength + j] == 0)
                    return false;
            }
        }
        return true;
    }

    public static int[][] fillLock(int[][] key, int[][] lock, int istart, int jstart) {
        System.out.println("istart: " + istart);
        System.out.println("jstart: " + jstart);
        System.out.println("key");
        print2D(key);
        int[][] filledLock = copy2D(lock);
        for (int i = 0; i < key.length; i++) {
            for (int j = 0; j < key[i].length; j++) {
                if (filledLock[istart + i][jstart + j] == 0)
                    filledLock[istart + i][jstart + j] = key[i][j];
                else if (filledLock[istart + i][jstart + j] == 1 && key[i][j] == 1)
                    filledLock[istart + i][jstart + j] = 0;
            }
        }
        System.out.println("filledLock");
        print2D(filledLock);
        return filledLock;
    }

    public static int[][] copy2D(int[][] arr) {
        int[][] newArr = new int[arr.length][arr[0].length];
        for (int i = 0; i < newArr.length; i++) {
            for (int j = 0; j < newArr[i].length; j++) {
                newArr[i][j] = arr[i][j];
            }
        }
        return newArr;
    }

    public static void print2D(int[][] arr) {
        for (int i = 0; i < arr.length; i++) {
            for (int j = 0; j < arr[i].length; j++) {
                System.out.print(arr[i][j] + " ");
            }
            System.out.println();
        }
    }
}
