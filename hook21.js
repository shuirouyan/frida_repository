function method01() {
    let process_id = Process.id
    console.log(`process id:${process_id}`)

    let ParamsInterceptor = Java.use("com.zdst.weex.network.intercepter.ParamsInterceptor");
    ParamsInterceptor["a"].overload('java.lang.String', 'long', 'java.lang.String', 'java.lang.String').implementation = function (str, j, str2, str3) {
        console.log('a is called' + ', ' + 'str: ' + str + ', ' + 'j: ' + j + ', ' + 'str2: ' + str2 + ', ' + 'str3: ' + str3);
        let ret = this.a(str, j, str2, str3);
        console.log('a ret value is ' + ret);
        return ret;
    };
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
function main() {

    Java.perform(function () {
        method01();
        hook_kill();
    })

}


setImmediate(main)

