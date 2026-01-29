
function bytesToString(bytes) {
    let result = '';
    for (let i = 0; i < bytes.length; i++) {
        result += String.fromCharCode(bytes[i]);
    }
    return result;
}
function method01() {
    let process_id = Process.id
    console.log(`process id:${process_id}`)
    // let a = Java.use("okhttp3.d0$a");
    // a["b"].implementation = function () {
    //     console.log('b is called');
    //     let ret = this.b();
    //     console.log('b ret value is ' + ret);
    //     return ret;
    // };

    let d0 = Java.use("okhttp3.d0");
    d0["$init"].implementation = function (aVar) {
        // console.log('$init is called' + ', ' + 'aVar: ' + aVar);
        let jsonObj = Java.use('org.json.JSONObject')
        // aVar.f55648d
        let jsonObjInstance = jsonObj.$new()
        // jsonObjInstance.put("aVar.f55648d", aVar.f55648d.getClass().getName())
        let ret = this.$new(aVar);
        console.log('$init ret value is ' + ret + '\t' + jsonObjInstance.toString());
        // return ret;
    };

    let b = Java.use("okhttp3.RequestBody$b");
    b["$init"].implementation = function (mediaType, i11, bArr, i12) {
        // console.log('$init is called' + ', ' + 'mediaType: ' + mediaType + ', ' + 'i11: ' + i11 + ', ' + 'bArr: ' + bArr + ', ' + 'i12: ' + i12);
        let funcText = ''
        if (bArr.length > 0) {
            funcText = bytesToString(bArr)
        }
        let textStr = funcText

        let ret = this.$new(mediaType, i11, bArr, i12);
        console.log('$init ret value is ' + ret + "\t" + textStr);
        // return ret;
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

