function method01() {
    let process_id = Process.id
    console.log(`process id:${process_id}`)


    let JSONAli = Java.use("com.alibaba.fastjson.JSON");
    let a = Java.use("el.a");
    a["o"].implementation = function (sendCodeParamsModel, continuation) {
        console.log('o is called' + ', ' + 'sendCodeParamsModel: ' + sendCodeParamsModel + ', ' + 'continuation: ' + continuation);
        let ret = this.o(sendCodeParamsModel, continuation);
        console.log('o ret value is ' + ret);
        return ret;
    };

    let Builder = Java.use("okhttp3.Request$Builder");
    Builder["addHeader"].implementation = function (name, value) {
        console.log('addHeader is called' + ', ' + 'name: ' + name + ', ' + 'value: ' + value);
        let ret = this.addHeader(name, value);
        //console.log('addHeader ret value is ' + ret);
        return ret;
    };

    let hashMap = Java.use("java.util.HashMap").$new();
    let p = Java.use("z20.p");
    p["l"].implementation = function (httpUrl) {
        console.log('l is called' + ', ' + 'httpUrl: ' + httpUrl);
        let ret = this.l(httpUrl);
        console.log('ret is ' + JSON.stringify(ret));
        hashMap.putAll(ret);
        hashMap.put("1", "a")
        console.log('l ret value is ' + JSONAli.toJSONString(hashMap));
        return ret;
    };
    // let p = Java.use("z20.p");
    p["d"].implementation = function (request) {
        console.log('d is called' + ', ' + 'request: ' + request);
        let ret = this.d(request);
        console.log('d ret value is ' + JSON.stringify(ret));
        return ret;
    };
    // let p = Java.use("z20.p");
    p["g"].implementation = function (request) {
        console.log('g is called' + ', ' + 'request: ' + request);
        let ret = this.g(request);
        console.log('g ret value is ' + ret);
        return ret;
    };
    let treMap = Java.use("java.util.TreeMap");
    treMap.put.implementation = function (key, value) {
        console.log('put is called' + ', ' + 'key: ' + key + ', ' + 'value: ' + value);
        let ret = this.put(key, value);
        //console.log('put ret value is ' + ret);
        return ret;
    };

    // let stringBuilder = Java.use("java.lang.StringBuilder");
    // stringBuilder.toString.implementation = function () {

    //     let ret = this.toString();
    //     // if (ret != null && ret.indexOf("&") != -1) {
    //     //     console.log('toString is called');
    //     //     console.log('toString ret value is ' + ret);
    //     // }
    //     return ret;
    // };

    let HttpUrl = Java.use("okhttp3.HttpUrl");

    Java.choose("okhttp3.HttpUrl", {
        onMatch: function (instance) {
            let listArr = Java.use("java.util.ArrayList").$new();
            listArr = instance.queryNamesAndValues;
            for (let i = 0; i < listArr.length; i++) {
                console.log("Query name: " + listArr.get(i));
            }
            //console.log("Found instance of com.alibaba.fastjson.JSON at: " + JSON.stringify(listArr));
        },
        onComplete: function () {
            console.log("Completed searching for okhttp3.HttpUrl");
        }
    });

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

