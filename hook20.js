function method01() {
    let process_id = Process.id
    console.log(`process id:${process_id}`)

}

function hook_kill() {
    // 确定要hook的库和函数
    var libc = Module.findBaseAddress("libc.so");
    var killPtr = Module.findExportByName("libc.so", "kill");

    if (killPtr) {
        // 开始hook kill函数
        Interceptor.attach(killPtr, {
            // 在函数调用前执行
            onEnter: function (args) {
                // 获取传递给kill函数的参数
                this.pid = args[0].toInt32();  // 目标进程ID
                this.signum = args[1].toInt32();  // 要发送的信号

                // 输出调用信息
                console.log("[+] kill() 被调用");
                console.log("    PID: " + this.pid);
                console.log("    信号: " + this.signum + " (" + getSignalName(this.signum) + ")");

                // 可以在这里添加条件来阻止特定信号的发送
                if (this.signum === 9 || this.signum === 15) {  // SIGKILL (9)
                    console.log("[-] 拦截了SIGKILL信号");
                    this.shouldBlock = true;
                }
            },

            // 函数调用后执行
            onLeave: function (retval) {
                // 如果决定拦截信号，修改返回值为错误
                if (this.shouldBlock) {
                    retval.replace(-1);  // 返回错误 (-1)
                    console.log("[*] kill() 返回值已修改为 -1");
                }
            }
        });

        console.log("[*] 成功hook kill() 函数");
    } else {
        console.log("[-] 无法找到 kill() 函数");
    }

    // 辅助函数：将信号编号转换为信号名称
    function getSignalName(signum) {
        var signals = {
            1: "SIGHUP", 2: "SIGINT", 3: "SIGQUIT", 4: "SIGILL",
            5: "SIGTRAP", 6: "SIGABRT", 7: "SIGBUS", 8: "SIGFPE",
            9: "SIGKILL", 10: "SIGUSR1", 11: "SIGSEGV", 12: "SIGUSR2",
            13: "SIGPIPE", 14: "SIGALRM", 15: "SIGTERM", 17: "SIGCHLD",
            18: "SIGCONT", 19: "SIGSTOP", 20: "SIGTSTP", 21: "SIGTTIN",
            22: "SIGTTOU", 23: "SIGURG", 24: "SIGXCPU", 25: "SIGXFSZ",
            26: "SIGVTALRM", 27: "SIGPROF", 28: "SIGWINCH", 29: "SIGIO",
            30: "SIGPWR", 31: "SIGSYS"
        };
        return signals[signum] || "未知信号(" + signum + ")";
    }

}

function hook_msg() {
    // let ow1 = Java.use("java.io.ByteArrayOutputStream");
    // ow1["toString"].overload('java.lang.String').implementation = function (request) {
    //     console.log('c is called' + ', ' + 'request: ' + request);
    //     let ret = this.toString(request);
    //     console.log('c ret value is ' + ret);
    //     return ret;
    // };

    let jsonObject = Java.use("org.json.JSONObject");
    jsonObject["put"].overload('java.lang.String', 'java.lang.Object').implementation = function (str1, str2) {
        if (str1 == 'request_sign_bj') {
            console.log('put is called' + ', ' + 'key: ' + str1 + ', ' + 'value: ' + str2);
        }
        let ret = this.put(str1, str2);
        // console.log('put ret value is ' + ret);
        return ret;
    }

    // let java_lang_string = Java.use("java.lang.String");
    // java_lang_string["getBytes"].overload('java.lang.String').implementation = function (str) {
    //     console.log('======>getBytes is called' + ', ' + 'str: ' + str + ' toString:' + this.toString());
    //     let ret = this.getBytes(str);
    //     console.log('getBytes ret value is ' + ret);
    //     return ret;
    // }
}
function main() {

    Java.perform(function () {
        // method01();
        hook_kill();
        hook_msg();
    })

}


setImmediate(main)

