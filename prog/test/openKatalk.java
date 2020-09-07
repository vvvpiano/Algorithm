package prog;

import java.util.*;

public class openKatalk {
    static HashMap<String, String> UN = new HashMap<>();
    static ArrayList<ComUser> CU = new ArrayList<>();
    public static void main(String[] args) {
        String[] record = {"Enter uid1234 Muzi",
                "Enter uid4567 Prodo",
                "Leave uid1234",
                "Enter uid1234 Prodo",
                "Change uid4567 Ryan"
        };

        for (int i = 0; i < record.length; i++) {
            String[] rec = record[i].split(" ");
            if(!rec[0].equals("Leave")) {UN.put(rec[1],rec[2]);}
            ComUser cu = new ComUser(rec[0], rec[1]);
            CU.add(cu);
        }

        HashMap<String, String> comString = new HashMap<>();
        comString.put("Enter","님이 들어왔습니다.");
        comString.put("Leave","님이 나갔습니다.");
        ArrayList<String> answerList = new ArrayList<>();
        CU.forEach(cu -> {
            if(!(cu.command.equals("Change"))) {
                String nickname = UN.get(cu.userId);
                String commandStr = comString.get(cu.command);
                answerList.add(nickname+commandStr);
            }
        });

        String[] answer = new String[answerList.size()];
        for(int i = 0 ; i < answer.length; i++)
            answer[i] = answerList.get(i);
    }
}

class ComUser {
    String command;
    String userId;
    ComUser(String command, String userId) {
        this.command = command;
        this.userId = userId;
    }
}
