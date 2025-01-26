function method01() {
    let process_id = Process.id
    console.log(`process id:${process_id}`)

    let json_obj = Java.use("org.json.JSONObject");
    let y = Java.use("com.bytedance.sdk.account.l.b.y");
    y["a"].overload('com.bytedance.sdk.account.l.a.w').implementation = function (wVar) {

        console.log('a is called' + ', ' + ' wVar: ' + wVar);
        let ret = this.a(wVar);
        let alog = json_obj.$new(ret)
        console.log('a ret value is ' + alog.toString());
        return ret;
    };
    let w = Java.use("com.bytedance.sdk.account.l.a.w");
    w["$init"].overload('java.lang.String', 'java.lang.String', 'int').implementation = function (str, str2, i2) {
        console.log('$init is called' + ', ' + 'str: ' + str + ', ' + 'str2: ' + str2 + ', ' + 'i2: ' + i2);
        let ret = this.$new(str, str2, i2);
        console.log('$init ret value is ' + ret);
        return ret;
    };
}


function main() {

    Java.perform(function () {
        method01();
    })

}


setImmediate(main)

