function method01() {
    let process_id = Process.id
    console.log(`process id:${process_id}`)

}

function hook_kill() {
    Interceptor.attach(Module.findExportByName(null, 'kill'), {
        onEnter: function (args) {
            var pid = args[0].toInt32();  // 目标进程 ID
            var sig = args[1].toInt32();  // 信号类型
            console.log('kill() called with pid: ' + pid + ' and signal: ' + sig);
        },
        onLeave: function (retval) {
            console.log('kill() returned');
        }
    });

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
        method01();
        hook_kill();
        hook_msg();
    })

}


setImmediate(main)

