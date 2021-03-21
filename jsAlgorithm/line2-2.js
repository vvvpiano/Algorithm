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
        let flag_argument_type_dict = {};
        if (!flag_re.test(input_flags[0])) // 플래그 없이 argument로 시작하는것은 잘못된 인풋
            flag_argument_type_dict["NONE"] = {
                flag_name: "NONE",
                flag_argument_type: "NONE"
            }
        const flag_argument_pair = this.getFlagArgumentPair(input_flags);
        const flags = Object.keys(flag_argument_pair);
        for (let i = 0; i < flags.length; i++) {
            const argument_type = this.getFlagArgumentType(flag_argument_pair[flags[i]].flag_argument);
            flag_argument_type_dict[flags[i]] = {
                flag_name: flags[i],
                flag_argument_type: argument_type
            }
        }
        
        return flag_argument_type_dict;
    }

    getFlagArgumentPair(input_flags) {
        const flag_re = /^-[a-zA-Z]/;
        const flags = input_flags.filter(e => flag_re.test(e))
        const flag_indexs = flags.map(e => input_flags.indexOf(e));
        const flag_argument_pair = {};
        for (let i = 0; i < flags.length; i++) {
            flag_argument_pair[flags[i]] = {
                flag_name : flags[i],
                flag_argument: input_flags.slice(flag_indexs[i] + 1, flag_indexs[i + 1] || input_flags.length)
            }
        }
        return flag_argument_pair;
    }

    getFlagArgumentType (argument) {
        let type = this.getFlagSingleArgumentType(argument[0]);
        let count = 0;
        for (let i = 1; i < argument.length; i++) {
            let next_type = this.getFlagSingleArgumentType(argument[i]);
            if (type != next_type)
                return "TYPE_ERROR"
            count ++;
        }
        if (count == 0)
            return type;
        return type + "S";
    }

    // argument의 타입을 구하여 리턴
    getFlagSingleArgumentType (argument) {
        if (!argument)
            return "NULL"
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
const flag_rules = ["-s STRINGS", "-n NUMBERS", "-e NULL"];
const commands = ["line -n 100 102 -s hi -e", "line -n id pwd -n 100"];

console.log(solution(program, flag_rules, commands));