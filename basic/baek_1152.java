package basic;

        import java.io.*;
        import java.util.StringTokenizer;

public class baek_1152 {
    public static void main(String[] args) throws IOException {
        File file = new File("C:/Users/user/IdeaProjects/Start/src/test.txt");
        BufferedReader br = new BufferedReader(new FileReader(file));
//        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        System.out.println(st.countTokens());

    }
}
