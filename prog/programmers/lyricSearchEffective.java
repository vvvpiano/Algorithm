package prog.programmers;

public class lyricSearchEffective {
    public static void main(String[] args) {
        String[] words = { "a","b","frodo", "front", "frost", "frozen", "kakao", "frame" };
        String[] queries = { "?","fro??", "????o", "fr???", "fro???", "pro??", "??ont", "????o" };

    }

    public int[] solution(String[] words, String[] queries) {
        int[] answer = new int[queries.length];

        // 접미사(suffix)용 트라이 구조
        Trie[] tries = new Trie[10001];
        // 접두사(prefix)용 트라이 구조
        Trie[] rtries = new Trie[10001];

        // words 길이 별 분류
        for(String word : words) {
            int size = word.length();
            // 길이에 해당하는 트라이 만들기
            try { // size길이에 해당하는 트라이에 insert 시도
                tries[size].insert(word.toCharArray());
            } catch (Exception e) { // 실패했다면 지금까지 size길이 단어의 트라이가 한번도 생성되지 않았다는 것. 새로 생성 후 insert
                tries[size] = new Trie();
                tries[size].insert(word.toCharArray());
            }

            // 반대 문자도 트라이생성
            word = (new StringBuffer(word)).reverse().toString();
            try {
                rtries[size].insert(word.toCharArray());
            } catch (Exception e){
                rtries[size] = new Trie();
                rtries[size].insert(word.toCharArray());
            }
        }

        // trie 이용하여 해당 쿼리에 맞는 갯수들 찾기
        for (int i = 0; i < queries.length; i++) {
            String query = queries[i];
            if (query.indexOf('?') == 0) {
                // prefix
                try {
                    query = (new StringBuffer(query)).reverse().toString();
                    answer[i] = rtries[query.length()].search(query.toCharArray());
                } catch (Exception e) {
                    continue;
                }
            } else {
                // suffix
                try {
                    answer[i] = tries[query.length()].search(query.toCharArray());
                } catch (Exception e) {
                    continue;
                }
            }
        }
        return answer;
    }
}

// Trie Node
class Trie {
    int count; // 이 트리에 포함하고 있는 word개수
    Trie[] childList;

    Trie() {
        childList = new Trie[26];
        count = 0;
    }

    void insert(char[] word) {
        Trie current = this;
        for (char no : word) {
            ++current.count;
            if (current.childList[no - 'a'] != null) {
                current = current.childList[no - 'a'];
            } else {
                current.childList[no - 'a'] = new Trie();
                current = current.childList[no - 'a'];
            }
        }
    }

    int search(char[] query) {
        Trie current = this;
        for (char no : query) {
            if (no == '?') {
                return current.count;
            }

            if (current.childList[no - 'a'] != null) {
                current = current.childList[no - 'a'];
            } else {
                return 0;
            }
        }
        return current.count;
    }
}