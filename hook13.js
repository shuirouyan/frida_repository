function method01() {
    let process_id = Process.id
    console.log(`process id:${process_id}`)

    let json_obj = Java.use("org.json.JSONObject");
    let y = Java.use("com.bytedance.sdk.account.l.b.y");
    y["a"].overload('com.bytedance.sdk.account.l.a.w').implementation = function (wVar) {
        let alog = json_obj.$new(wVar)
        console.log('a is called' + ', ' + 'wVar: ' + alog.toString());
        let ret = this.a(wVar);
        console.log('a ret value is ' + ret);
        return ret;
    };

}


function main() {

    Java.perform(function () {
        method01();
    })

}


setImmediate(main)

