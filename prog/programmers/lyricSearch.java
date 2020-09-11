package prog.programmers;

public class lyricSearch {
    public static void main(String[] args) {
        String[] words = {"frodo", "front", "frost", "frozen", "frame", "kakao"};
        String[] queries = {"fro??", "????o", "fr???", "fro???", "pro?"};

        int[] result = solution(words, queries);
        printArr(result);
    }

    public static void printArr(int[] result) {
        for (int i = 0; i < result.length - 1; i++) {
            System.out.print(result[i] + ", ");
        }
        System.out.println(result[result.length - 1]);
    }

    public static int[] solution(String[] words, String[] queries) {
        int[] answer = new int[queries.length];

        for (int i = 0; i < queries.length; i++) {
            answer[i] = find(queries[i], words);
        }
        return answer;
    }

    public static int find(String query, String[] words) {
        int count = 0;
        int[] wildArr = transformWild(query);
        for (int i = 0; i < words.length; i++) {
            boolean isMatch = compare(query, words[i], wildArr);
            if (isMatch)
                count++;
        }
        return count;
    }

    public static int[] transformWild(String query) {
        int[] wildArr = new int[query.length()];
        for (int i = 0; i < query.length(); i++) {
            if (query.charAt(i) == '?')
                wildArr[i] = 1;
            else
                wildArr[i] = 0;
        }
        return wildArr;
    }

    public static boolean compare(String query, String word, int[] wildArr) {
        if (query.length() != word.length())
            return false;

        for (int i = 0; i < wildArr.length; i++) {
            if (wildArr[i] == 0) { // wildCard 아닌부분에 해당
                if (query.charAt(i) != word.charAt(i))
                    return false;
            }
        }
        return true;
    }
}
