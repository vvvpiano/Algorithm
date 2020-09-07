package prog;

import java.util.ArrayList;
import java.util.Stack;
import java.util.StringTokenizer;

public class Kakao_2020_2 {
    public static void main(String[] args) {
        String expression = "100-200*300-500+20";
        long[] values = new long[6];
        long answer = 0;
        ArrayList<String> token = parseToken(expression);
        ArrayList<String> operator = parseOperator(expression);
        ArrayList<String> ex = new ArrayList<>();

        for (int i = 0; i < operator.size(); i++) {
            ex.add(token.get(i));
            ex.add(operator.get(i));
        }
        ex.add(token.get(token.size()-1));

        String[][] orders = {{"+", "-", "*"},{"+", "*", "-"},{"-", "+", "*"},{"-", "*", "+"},{"*", "+", "-"},{"*", "-", "+"}};
        for (int i = 0; i < orders.length ; i++) {
            String[] order = orders[i];
            ArrayList<String> postfix = infixToPrefix(ex, order);
//            postfix.forEach(p -> System.out.print(p + " "));
//            System.out.println();
            values[i] = ValueOfExpression(postfix);
//            System.out.println(values[i]);
        }

        long max = values[0];
        for (int i = 1; i < orders.length ; i++) {
            max = Math.max(max, values[i]);

        }
        answer = max;
//        System.out.println(max);

    }

    static ArrayList<String> parseToken(String expression) {
        ArrayList<String> token = new ArrayList<>();
        StringTokenizer st = new StringTokenizer(expression,"+-*");
        while(st.hasMoreTokens())
            token.add(st.nextToken());
        return token;
    }

    static ArrayList<String> parseOperator(String expression) {
        ArrayList<String> operator = new ArrayList<>();
        for (int i = 0; i < expression.length(); i++) {
            String s = String.valueOf(expression.charAt(i));
            if(s.equals("+")) operator.add(s);
            if(s.equals("-")) operator.add(s);
            if(s.equals("*")) operator.add(s);
        }
        return operator;
    }

    static ArrayList<String> infixToPrefix(ArrayList<String> expression, String[] opsOrder) {
        Stack<String> stk = new Stack<>();
        ArrayList<String> post = new ArrayList<>();
        for (String s: expression) {
            if(!(s.equals("+") || s.equals("-") || s.equals("*"))){
                post.add(s);
                continue;
            }else if(s.equals(opsOrder[0])) {
                while (!stk.empty() && (stk.peek().equals(opsOrder[0]))) {
                    post.add(stk.pop());
                }
                stk.push(s);
            } else if(s.equals(opsOrder[1])) {
                while(!stk.empty() && (stk.peek().equals(opsOrder[1]))) {
                    post.add(stk.pop());
                }
                stk.push(s);
            } else if(s.equals(opsOrder[2])) {
                while(!stk.empty())
                    post.add(stk.pop());
                stk.push(s);
            }
        }

        while(!stk.empty())
            post.add(stk.pop());

        return post;
    }

    static long ValueOfExpression(ArrayList<String> expression) {
        long value = 0;
        long a1, a2;
        Stack<String> stk = new Stack<>();
        for(String s : expression) {
            if(!(s.equals("+") || s.equals("-") || s.equals("*"))){
                stk.push(s);
            } else {
                a2 = Long.parseLong(stk.pop()); a1 = Long.parseLong(stk.pop());
                switch (s) {
                    case "+":
                        stk.push(Long.toString(a1+a2));
                        break;
                    case "-":
                        stk.push(Long.toString(a1-a2));
                        break;
                    case "*":
                        stk.push(Long.toString(a1*a2));
                        break;
                    default:
                        break;
                }
            }
        };
        value = Long.parseLong(stk.pop());
        return Math.abs(value);
    }
}
