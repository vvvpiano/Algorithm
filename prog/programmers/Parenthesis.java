package prog.programmers;

import java.util.Stack;

public class Parenthesis {
    public static void main(String[] args) {
        String[] strings = {"(()())()", ")(", "()))((()"};
        for (int i = 0; i < strings.length; i++) {
            System.out.println(solution(strings[i]));
            System.out.println("================================");
        }
    }

    public static String solution(String p) {
        String answer = "";
        if (isCorrect(p))
            return p;

        int index = findBalanceIndex(p) + 1;
        String u = p.substring(0, index);
        String v = p.substring(index);

        System.out.println("u: " + u);
        System.out.println("v: " + v);

        if (isCorrect(u)) {
            answer += u;
            answer += solution(v);
        }
        else {
            answer += "(";
            answer += solution(v);
            answer += ")";
            answer += inverseParenthesis(u.substring(1, u.length() - 1));
        }
        return answer;
    }

    public static String inverseParenthesis(String s) {
        String inversed = "";
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == '(')
                inversed += ")";
            else
                inversed += "(";
        }
        return inversed;
    }

    public static int findBalanceIndex(String s) {
        int openP = 0;
        int closeP = 0;
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '(')
                openP++;
            else
                closeP++;
            if (openP == closeP)
                return i;
        }
        return -1;
    }

    public static boolean isCorrect(String s) {
        Stack<Character> stack = new Stack<>();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '(')
                stack.push(c);
            else { // c == ')'
                if (stack.isEmpty())
                    return false;
                stack.pop();
            }
        }
        return true;
    }
}
