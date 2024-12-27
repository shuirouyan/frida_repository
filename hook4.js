

function hook1() {
    let id = Process.id
    console.log(`id:${id}`)

    // let debuggable = Process.isDebuggerAttached()
    // console.log(`debuggable:${debuggable}`)

    let enumerateThreads = Process.enumerateThreads();
    // enumerateThreads.forEach(element => {
    //     console.log(`enumerateThreads:${JSON.stringify(element)}`)
    // });

    // let enumerateModules = Process.enumerateModules()
    // enumerateModules.forEach(element => {
    //     if (element.name.indexOf('convertToGcj') != -1)
    //         console.log(`enumerateModules:${JSON.stringify(element)}`)
    //     let exName = Module.enumerateExports(element.name)
    //     exName.forEach(item => {
    //         // console.log(`so name:${element.name}, exName:${JSON.stringify(item)}`)
    //         if (item.name.startsWith('Java_com_umeng')) {
    //             console.log(`so name:${element.name}, exName:${JSON.stringify(item)}`)
    //         }
    //     })
    // });

    // let baseOdex = Process.getModuleByName('base.odex')

    // let enumerateSymbols = Module.enumerateExports('libc.so')
    // console.log(`baseOdex:${JSON.stringify(enumerateSymbols)}`)

    // let getExportByName = Module.findExportByName('libc.so', 'strlen')
    // console.log(getExportByName)
    // Interceptor.attach(getExportByName, {
    //     onEnter(args) {
    //         // console.log('CCCryptorCreate called from:\n' + '\n');
    //         console.log("in strlen, arg0=" + Memory.readUtf8String(args[0]));

    //     }
    // });

    // let DeviceConfig = Java.use("com.umeng.commonsdk.statistics.common.DeviceConfig");
    // let a = DeviceConfig.$new()
    // console.log(`a:${a}`)
    // DeviceConfig["getMacByJavaAPI"].implementation = function () {
    //     let ret = this.getMacByJavaAPI();
    //     console.log('getMacByJavaAPI ret value is ' + ret);
    //     return ret;
    // };


    // var TextUtils = Java.use("android.text.TextUtils");
    // TextUtils.isEmpty.implementation = function (str) {
    //     console.log("Hooked isEmpty method called with: " + str);
    //     // 调用原来的isEmpty方法
    //     var result = this.isEmpty(str);
    //     console.log("Original isEmpty result: " + result);
    //     return result;
    // };

    var Log = Java.use('android.util.Log');
    // 获取Log.d方法的第一个重载（通常是两个字符串参数的情况）
    var originalDebug = Log.d.overload('java.lang.String', 'java.lang.String');
    originalDebug.implementation = function (tag, msg) {
        console.log("Hooked Log.d called with tag: " + tag + ", msg: " + msg);
        // 可以在这里根据需求对传入的tag、msg做一些处理，比如修改内容等
        var result = originalDebug.call(this, tag, msg);
        return result;
    };

    // Java.choose('com.umeng.commonsdk.statistics.common.DeviceConfig', {
    //     onMatch: function (instance) {
    //         console.log('Instance found:', instance);
    //         let contexta = Java.use('android.content.Context')
    //         console.log(`${contexta}`)
    //         let res = 'instance.KEY_EMUI_VERSION_CODE'
    //         console.log('res:', res, '|', Date.now())
    //     },
    //     onComplete: function () {
    //         console.log('Search complete.');
    //     }
    // })

    let al = Java.use('com.umeng.commonsdk.statistics.common.DeviceConfig')
    // console.log(`${al}`)
    let result = al.getMacByJavaAPI()
    // console.log(`result:${result}`)

    let NetConfig = Java.use("com.gdtv.data.network.NetConfig");
    // console.log(`${NetConfig.localChannel}`)

    // let Gson = Java.use("com.google.gson.Gson");
    // Gson["fromJson"].overload('java.lang.String', 'java.lang.Class').implementation = function (str, cls) {
    //     console.log('fromJson is called' + ', ' + 'str: ' + str + ', ' + 'cls: ' + cls);
    //     let ret = this.fromJson(str, cls);
    //     console.log('fromJson ret value is ' + ret);
    //     return ret;
    // };


    // Java.choose('com.touchtv.internetSDK.TouchtvInternet', {
    //     onMatch: function (instance) {
    //         console.log('Instance found:', instance);
    //         let asm = instance.getContext()
    //         console.log(`${asm}`)
    //     },
    //     onComplete: function () {
    //         console.log('Search complete.');
    //     }
    // })


    // Java.choose('g.c0.e.a.e', {
    //     onMatch: function (instance) {
    //         console.log('g.c0.e.a.e Instance found:', instance);

    //     },
    //     onComplete: function () {
    //         console.log('g.c0.e.a.e Search complete.');
    //     }
    // })

    // let d = Java.use("com.touchtv.internetSDK.network.d");
    // d["L"].implementation = function (url, body, Method, extraParams) {
    //     console.log('L is called' + ', ' + 'url: ' + url + ', ' + 'body: ' + body + ', ' + 'Method: ' + Method + ', ' + 'extraParams: ' + extraParams);
    //     let ret = this.L(url, body, Method, extraParams);
    //     console.log('L ret value is ' + ret);
    //     return ret;
    // };com.touchtv.internetSDK.network

    let d0 = Java.use("g.m.c.d.h.d0");
    d0["Q4"].implementation = function (channelId, channelType, oldestTime, snapshotNumber, md5Hash, size, pageNum, focusPictureHash, pluginHash, up, listener) {
        console.log('Q4 is called' + ', ' + 'channelId: ' + channelId + ', ' + 'channelType: ' + channelType + ', ' + 'oldestTime: ' + oldestTime + ', ' + 'snapshotNumber: ' + snapshotNumber + ', ' + 'md5Hash: ' + md5Hash + ', ' + 'size: ' + size + ', ' + 'pageNum: ' + pageNum + ', ' + 'focusPictureHash: ' + focusPictureHash + ', ' + 'pluginHash: ' + pluginHash + ', ' + 'up: ' + up + ', ' + 'listener: ' + listener);
        let ret = this.Q4(channelId, channelType, oldestTime, snapshotNumber, md5Hash, size, pageNum, focusPictureHash, pluginHash, up, listener);
        console.log('Q4 ret value is ' + ret);
        return ret;
    };


    let networkConfig = Java.use('com.touchtv.internetSDK.network.d')

    console.log(`${networkConfig.z()}`)

    let d = Java.use("com.touchtv.internetSDK.network.d");
    d["F"].implementation = function (url, stringToSigned) {
        console.log('F is called' + ', ' + 'url: ' + url + ', ' + 'stringToSigned: ' + stringToSigned);
        let ret = this.F(url, stringToSigned);
        console.log('F ret value is ' + ret);
        return ret;
    };

}

function main() {
    Java.perform(function () {
        hook1();
    })
}

setImmediate(main)
