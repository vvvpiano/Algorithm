function solution(program, flag_rules, commands) {

    let answer = [];
    const cli_flag_validator = new CLIFlagValidator(program, flag_rules);
    commands.forEach(command => {
        let result = cli_flag_validator.isValidFlag(command);
        answer.push(result);
    });
    return answer;
}

class CLIFlagValidator {
    constructor(program, flag_rules) {
        this.program = program;
        this.flag_rules = this.makeFlagRulesDict(flag_rules);
    }

    makeFlagRulesDict(flag_rules) {
        let flag_rules_dict = {};
        flag_rules.forEach(rule => {
            const [flag_name, flag_argument_type] = rule.split(' ');
            flag_rules_dict[flag_name] = {
                flag_name: flag_name,
                flag_argument_type: flag_argument_type
            }
        })
        return flag_rules_dict;
    }

    isValidFlag(command) {
        let splitCommand = command.split(' ');
        const input_program_name = splitCommand.shift();
        if (!this.isStartWithProgram(input_program_name, this.program))
            return false;

        // flag에 관한 검증은 조건2를 마지막으로 검증해야 오답조건 제거에 유리함.
        // (dict에 없는 flag등장한 경우(조건4) -> flag가 중복하여 등장한 경우(조건 3) -> flag argument type이 맞지 않는 경우(조건2))
        if (!this.isValidFlagNames(splitCommand))
            return false;
        if (!this.isFlagNotDuplicated(splitCommand))
            return false;
        if (!this.isCorrectFlagArgumentType(splitCommand))
            return false;
        return true;
    }

    // command 조건 1. program으로 시작한다
    isStartWithProgram(input_program_name) {
        if (input_program_name == this.program)
            return true;
        return false;
    }
    
    // command 조건 2. 각 flag_argument는 대응하는 flag의 flag_argument_type과 일치한다
    isCorrectFlagArgumentType (input_flags) {
        const input_flag_type_dict = this.getFlagArgumentTypeDict(input_flags);
        const flags = Object.keys(input_flag_type_dict);
        for (let i = 0; i < flags.length; i++) {
            if (input_flag_type_dict[flags[i]].flag_name == "NONE")
                return false;
            if (input_flag_type_dict[flags[i]].flag_argument_type 
                != this.flag_rules[flags[i]].flag_argument_type)
                return false;
        }
        return true;
    }
    
    // command 조건 3. 각 flag는 0번이나 1번 나타난다.
    isFlagNotDuplicated (input_flags) {
        let flag_re = /^-[a-zA-Z]/;
        let flags = input_flags.filter(e => flag_re.test(e))
        let flag_set = new Set(flags);
        if (flags.length !== flag_set.size)
            return false;
        return true;
    }
    
    // command 조건 4. flag_rules에 존재하는 flag만 나타난다.
    isValidFlagNames (input_flags) {
        let flag_re = /^-[a-zA-Z]/;
        let flags = input_flags.filter(e => flag_re.test(e))
        let flags_in_rule = Object.keys(this.flag_rules);
        for (let i = 0; i < flags.length; i++) {
            if (!flags_in_rule.includes(flags[i])) 
                return false;
        }
        return true;
    }

    // input으로 들어온 플래그들의 실제 타입을 구하여 객체로 리턴
    getFlagArgumentTypeDict(input_flags) {
        const flag_re = /^-[a-zA-Z]/;
        // const flags = input_flags.filter(e => flag_re.test(e))
        let flag_argument_type_dict = {};
        let i = 0;
        while (i < input_flags.length) {
            let flag = input_flags[i];
            if (!flag_re.test(flag)) { // 플래그 없이 argument만 들어온 경우
                flag_argument_type_dict["NONE"] = {
                    flag_name: "NONE",
                    flag_argument_type: "NONE"
                }
                i++;
                continue;
            }
            let arguement_type;
            let next_argument = input_flags[i + 1];
            if (!next_argument || flag_re.test(next_argument)) // 다음 인자가 없거나 플래그인 경우는 해당 플래그에 대해 argument가 안 들어온 상태
                arguement_type = "NULL";
            else 
                arguement_type = this.getFlagArgumentType(next_argument);
            flag_argument_type_dict[flag] = {
                flag_name: flag,
                flag_argument_type: arguement_type
            }
            i += 2;
        }
        return flag_argument_type_dict;
    }

    // argument의 타입을 구하여 리턴
    getFlagArgumentType (argument) {
        let chars = [...argument];
        for (let i = 0; i < chars.length; i++) {
            // 숫자가 아닌 문자를 발견하면 그 argument의 type = STRING
            if (isNaN(parseInt(chars[i])))
                return "STRING"
        }
        // 모두 숫자면 type = NUMBER
        return "NUMBER"
    }
}



const program = "line"
const flag_rules = ["-s STRING", "-n NUMBER", "-e NULL"];
const commands = ["line -n 100 -s hi -e", "lien -s Bye"];

console.log(solution(program, flag_rules, commands));