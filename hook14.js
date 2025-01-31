function method01() {
    let process_id = Process.id
    console.log(`process id:${process_id}`)
    // 示例：Hook Android 的 Log 类
    var Log = Java.use("android.util.Log");

    // Hook Log.d 方法
    Log.d.overload('java.lang.String', 'java.lang.String').implementation = function (tag, message) {
        console.log("Log.d called: " + tag + ", " + message);
        // 调用原始方法
        return this.d(tag, message);
    };

    // Hook Log.i 方法
    Log.i.overload('java.lang.String', 'java.lang.String').implementation = function (tag, message) {
        console.log("Log.i called: " + tag + ", " + message);
        // 调用原始方法
        return this.i(tag, message);
    };

    // Hook Log.e 方法
    Log.e.overload('java.lang.String', 'java.lang.String').implementation = function (tag, message) {
        console.log("Log.e called: " + tag + ", " + message);
        // 调用原始方法
        return this.e(tag, message);
    };
}


function main() {

    Java.perform(function () {
        method01();
    })

}


setImmediate(main)

