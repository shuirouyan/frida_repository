
function hook() {
    // let a = Java.use("com.tianyu.util.a");
    // a["a"].overload('android.content.Context', 'java.lang.String', 'java.lang.String', 'java.lang.String').implementation = function (context, str, str2, str3) {
    //     console.log('a is called' + ', ' + 'context: ' + context + ', ' + 'str: ' + str + ', ' + 'str2: ' + str2 + ', ' + 'str3: ' + str3);
    //     let ret = this.a(context, str, str2, str3);
    //     console.log('a ret value is ' + ret);
    //     return ret;
    // };

    setTimeout(() => {
        let a = Java.use("com.tianyu.util.a");
        a["a"].overload('java.lang.String').implementation = function (str) {
            console.log('a is called' + ', ' + 'str: ' + str);
            let ret = this.a(str);
            console.log('a ret value is ' + ret);
            return ret;
        };

        let o = Java.use("g.m.a.q.o");
        o["w"].implementation = function () {
            console.log('w is called');
            let ret = this.w();
            console.log('w ret value is ' + ret);
            return false;
        };

        // public class CheckRoot {
        //     private static String LOG_TAG;

        //     static {
        //         g.b.a.a.a("pns-2.13.2.1-LogOnlineStandardCuumRelease_alijtca_plus");
        //         LOG_TAG = "CheckRoot";
        //     }

        //     private static native boolean checkDeviceDebuggable();

        //     private static native boolean checkRootPathSU();

        //     private static native boolean checkSuperuserApk();

        //     public static native String isDeviceRooted();
        // }
        // LOAD:0000000000000E98		                           Java_com_mobile_auth_gatewayauth_utils_security_CheckRoot_checkDeviceDebuggable__,\
        // LOAD:0000000000001078		                           Java_com_mobile_auth_gatewayauth_utils_security_CheckRoot_isDeviceRooted__,\
        // LOAD:00000000000014F8		                           Java_com_mobile_auth_gatewayauth_utils_security_CheckRoot_checkRootPathSU__,\
        // LOAD:00000000000014F8		                           Java_com_mobile_auth_gatewayauth_utils_security_CheckRoot_checkRootPathSU__,\
        // Java_com_mobile_auth_gatewayauth_utils_security_CheckRoot_checkDeviceDebuggable__	.text	00000000000222B0	000002B8	000003A0	FFFFFFFFFFFFFFF8	R	.	.	.	.	B	.	.
        var targetAddress = Module.findExportByName("libpns-2.13.2.1-LogOnlineStandardCuumRelease_alijtca_plus.so", "CheckRoot");
        console.log("Strcmp Address: ", targetAddress.toString(16));

        Interceptor.attach(targetAddress, {
            onEnter: function (args) {
                console.log("Strcmp Address:::::", args)
            }, onLeave: function (retval) {

            }
        })

        let j = Java.use("g.o.a.a.q0.j");
        j["postDelayed"].implementation = function (runnable, j2) {
            console.log('postDelayed is called' + ', ' + 'runnable: ' + runnable + ', ' + 'j2: ' + j2);
            if (j2 == 500) {
                console.log('500 come in ....')
                j2 = 5000000
            }
            let ret = this.postDelayed(runnable, j2);
            console.log('postDelayed ret value is ' + ret);
            return ret;
        };


        // 
        let CheckRoot = Java.use("com.mobile.auth.gatewayauth.utils.security.CheckRoot");
        CheckRoot["isDeviceRooted"].implementation = function () {
            console.log('isDeviceRooted is called');
            let ret = this.isDeviceRooted();
            console.log('isDeviceRooted ret value is ' + ret);
            return "";
        };

        CheckRoot["checkRootPathSU"].implementation = function () {
            console.log('checkRootPathSU is called');
            let ret = this.checkRootPathSU();
            console.log('checkRootPathSU ret value is ' + ret);
            return false;
        };

        CheckRoot["isDeviceRooted"].implementation = function () {
            console.log('isDeviceRooted is called');
            let ret = this.isDeviceRooted();
            console.log('isDeviceRooted ret value is ' + ret);
            return false;
        };

        CheckRoot["checkSuperuserApk"].implementation = function () {
            console.log('checkSuperuserApk is called');
            let ret = this.checkSuperuserApk();
            console.log('checkSuperuserApk ret value is ' + ret);
            return false;
        };

    }, 5000)

}

function hook2() {


    let Utils = Java.use("anet.channel.util.Utils");
    Utils["invokeStaticMethodThrowException"].implementation = function (str, str2, clsArr, objArr) {
        console.log('invokeStaticMethodThrowException is called' + ', ' + 'str: ' + str + ', ' + 'str2: ' + str2 + ', ' + 'clsArr: ' + clsArr + ', ' + 'objArr: ' + objArr);
        let ret = this.invokeStaticMethodThrowException(str, str2, clsArr, objArr);
        console.log('invokeStaticMethodThrowException ret value is ' + ret);
        return ret;
    };
    // let TaobaoNetworkAdapter = Java.use("anet.channel.TaobaoNetworkAdapter");
    // TaobaoNetworkAdapter["init"].implementation = function (context, hashMap) {
    //     // 获取Java中的HashMap类
    //     const HashMap = Java.use('java.util.HashMap');
    //     // 创建一个空的HashMap实例
    //     const emptyHashMap = HashMap.$new();
    //     console.log('init is called' + ', ' + 'context: ' + context + ', ' + 'hashMap: ' + hashMap);
    //     let ret = this.init(context, emptyHashMap);
    //     console.log('init ret value is ' + ret);
    //     return ret;
    // };

    setTimeout(() => {
        let a = Java.use("com.tianyu.util.a");
        a["a"].overload('java.lang.String').implementation = function (str) {
            console.log('a is called' + ', ' + 'str: ' + str);
            let ret = this.a(str);
            console.log('a ret value is ' + ret);
            return ret;
        };

        let o = Java.use("g.m.a.q.o");
        o["w"].implementation = function () {
            console.log('w is called');
            let ret = this.w();
            console.log('w ret value is ' + ret);
            return false;
        };
        var targetAddress = Module.findExportByName("pns-2.13.2.1-LogOnlineStandardCuumRelease_alijtca_plus.so", "CheckRoot");
        console.log("Strcmp Address: ", targetAddress.toString(16));

        Interceptor.attach(targetAddress, {
            onEnter: function (args) {
                console.log("Strcmp Address:::::", args)
            }, onLeave: function (retval) {

            }
        })

        let j = Java.use("g.o.a.a.q0.j");
        j["postDelayed"].implementation = function (runnable, j2) {
            console.log('postDelayed is called' + ', ' + 'runnable: ' + runnable + ', ' + 'j2: ' + j2);
            if (j2 == 500) {
                console.log('500 come in ....')
                j2 = 5000000
            }
            let ret = this.postDelayed(runnable, j2);
            console.log('postDelayed ret value is ' + ret);
            return ret;
        };


        // 
        let CheckRoot = Java.use("com.mobile.auth.gatewayauth.utils.security.CheckRoot");
        CheckRoot["isDeviceRooted"].implementation = function () {
            console.log('isDeviceRooted is called');
            let ret = this.isDeviceRooted();
            console.log('isDeviceRooted ret value is ' + ret);
            return "";
        };

        CheckRoot["checkRootPathSU"].implementation = function () {
            console.log('checkRootPathSU is called');
            let ret = this.checkRootPathSU();
            console.log('checkRootPathSU ret value is ' + ret);
            return false;
        };

        CheckRoot["isDeviceRooted"].implementation = function () {
            console.log('isDeviceRooted is called');
            let ret = this.isDeviceRooted();
            console.log('isDeviceRooted ret value is ' + ret);
            return false;
        };

        CheckRoot["checkSuperuserApk"].implementation = function () {
            console.log('checkSuperuserApk is called');
            let ret = this.checkSuperuserApk();
            console.log('checkSuperuserApk ret value is ' + ret);
            return false;
        };

    }, 30000);


}


function hook3() {
    // var targetAddress = Module.findExportByName("libpns-2.13.2.1-LogOnlineStandardCuumRelease_alijtca_plus", "Java_com_mobile_auth_gatewayauth_utils_security_CheckRoot_checkDeviceDebuggable__");
    // console.log("Strcmp Address: ", targetAddress);
    setTimeout(function () {
        let a = Java.use("g.b.a.a");
        a["a"].implementation = function (str) {
            console.log('a is called' + ', ' + 'str: ' + str);
            let ret = this.a(str);
            console.log('a ret value is ' + ret);
            return ret;
        };
    }, 5000)

    // let View$OnKeyListenerC9873k = Java.use("com.touchtv.module_search.view.activity.SearchActivity$k");
    // View$OnKeyListenerC9873k["onKey"].implementation = function (v, keyCode, event) {
    //     console.log('onKey is called' + ', ' + 'v: ' + v + ', ' + 'keyCode: ' + keyCode + ', ' + 'event: ' + event);
    //     let ret = this.onKey(v, keyCode, event);
    //     console.log('onKey ret value is ' + ret);
    //     return ret;
    // };

    // let C9878o = Java.use("com.touchtv.module_search.view.activity.SearchActivity$o");
    // C9878o["$init"].implementation = function (fm, fragments) {
    //     console.log('$init is called' + ', ' + 'fm: ' + fm + ', ' + 'fragments: ' + fragments);
    //     let ret = this.$new(fm, fragments);
    //     console.log('$init ret value is ' + ret);
    //     return ret;
    // };

    // let MainCommentFragment = Java.use("com.touchtv.module_news.view.fragment.MainCommentFragment");
    // MainCommentFragment["c"].implementation = function () {
    //     console.log('c is called');
    //     let ret = this.c();
    //     console.log('c ret value is ' + ret);
    //     return ret;
    // };


    // let C11187d = Java.use("com.umeng.umzid.d");
    // C11187d["j"].implementation = function (context) {
    //     console.log('j is called' + ', ' + 'context: ' + context);
    //     let ret = this.j(context);
    //     console.log('j ret value is ' + ret);
    //     return ret;
    // };

    // 获取 java.net.NetworkInterface 类
    var NetworkInterface = Java.use('java.net.NetworkInterface');

    // Hook getName 方法
    NetworkInterface.getName.implementation = function () {
        // 调用原始方法获取接口名
        var originalName = this.getName();

        // 打印原始接口名
        console.log('NetworkInterface.getName called: Original name -> ' + originalName);

        if (originalName == 'wlan0' || originalName == 'tun0') {
            originalName = 'ip6_vti0'
        }

        console.log('Returning fake name: ' + originalName);

        // 返回伪造的网络接口名
        return originalName;
    };
    // Hook getInetAddresses 方法
    NetworkInterface.getInetAddresses.implementation = function () {
        console.log('NetworkInterface.getInetAddresses called on interface: ' + this.getName());

        // 调用原始方法，获取原始返回值
        var originalAddresses = this.getInetAddresses();


        console.log(`Original addresses intercepted. Returning empty enumeration., ${originalAddresses.toString()}`);

        // 返回空的 Enumeration 对象，表示没有关联地址
        return originalAddresses;
    };

    let C13513v = Java.use("g.c0.h.k.v");
    C13513v["s0"].implementation = function (liveType, weMediaSid, currentPage) {
        console.log('s0 is called' + ', ' + 'liveType: ' + liveType + ', ' + 'weMediaSid: ' + weMediaSid + ', ' + 'currentPage: ' + currentPage);
        let ret = this.s0(liveType, weMediaSid, currentPage);
        console.log('s0 ret value is ' + ret);
        return ret;
    };

    // let MainCommentFragment = Java.use("com.touchtv.module_news.view.fragment.MainCommentFragment");
    // MainCommentFragment["c"].implementation = function () {
    //     console.log('c is called');
    //     let ret = this.c();
    //     console.log('c ret value is ' + ret + new Date());
    //     return ret;
    // };

    let TouchtvInternet = Java.use("com.touchtv.internetSDK.TouchtvInternet");
    TouchtvInternet["request"].implementation = function (requestObservable, extraParams, subscriber) {
        console.log('request is called' + ', ' + 'requestObservable: ' + requestObservable + ', ' + 'extraParams: ' + extraParams + ', ' + 'subscriber: ' + subscriber);
        let ret = this.request(requestObservable, extraParams, subscriber);

        var ExtraParams = Java.use("com.touchtv.internetSDK.data.ExtraParams");

        // 创建一个 JSONObject
        var JSONObject = Java.use("org.json.JSONObject");
        var jsonParams = JSONObject.$new();

        // 将 ExtraParams 对象的字段值添加到 JSONObject 中
        jsonParams.put("areaCode", extraParams.getAreaCode());
        jsonParams.put("cityCode", extraParams.getCityCode());
        jsonParams.put("jwt", extraParams.getJwt());
        jsonParams.put("latitude", extraParams.getLatitude());
        jsonParams.put("longitude", extraParams.getLongitude());
        jsonParams.put("provinceCode", extraParams.getProvinceCode());
        jsonParams.put("userid", extraParams.getUserid());

        // 打印 extraParams 的 JSON 字符串
        console.log('extraParams as JSONObject: ' + jsonParams.toString());

        console.log('request ret value is ' + ret);
        return ret;
    };

    let C7098d = Java.use("com.touchtv.internetSDK.network.d");
    // C7098d["K"].implementation = function (url, body, method, extraParams, needAutoSetPhpHead) {
    //     console.log('K is called' + ', ' + 'url: ' + url + ', ' + 'body: ' + body + ', ' + 'method: ' + method + ', ' + 'extraParams: ' + extraParams + ', ' + 'needAutoSetPhpHead: ' + needAutoSetPhpHead);
    //     let ret = this.K(url, body, method, extraParams, needAutoSetPhpHead);
    //     console.log('K ret value is ' + ret);
    //     return ret;
    // };

    C7098d["C"].implementation = function (url, body, Method, extraParams) {
        console.log('C is called' + ', ' + 'url: ' + url + ', ' + 'body: ' + body + ', ' + 'Method: ' + Method + ', ' + 'extraParams: ' + extraParams);
        let ret = this.C(url, body, Method, extraParams);
        console.log('C ret value is ' + ret);
        return ret;
    };

    // C7098d["K"].implementation = function (url, body, method, extraParams, needAutoSetPhpHead) {
    //     console.log('=======' + ', ' + 'url: ' + url + ', ' + 'body: ' + body + ', ' + 'method: ' + method + ', ' + 'extraParams: ' + extraParams + ', ' + 'needAutoSetPhpHead: ' + needAutoSetPhpHead);
    //     let ret = this.K(url, body, method, extraParams, needAutoSetPhpHead);
    //     console.log('K ret value is ' + ret);
    //     var JSONObject = Java.use("org.json.JSONObject");

    //     // 将 extraParams 转换为 JSONObject
    //     var jsonParams = JSONObject.$new(ret);

    //     // 打印 extraParams 的 JSON 字符串
    //     console.log('extraParams as JSONObject: ' + jsonParams.toString());
    //     return ret;
    // };

    let C13425s = Java.use("g.c0.h.k.s");
    C13425s["K1"].implementation = function (channelBackground, channelId, channelType, oldestTime, snapshotNumber, md5Hash, size, pageNum, focusPictureHash, pluginHash) {
        console.log('K1 is called' + ', ' + 'channelBackground: ' + channelBackground + ', ' + 'channelId: ' + channelId + ', ' + 'channelType: ' + channelType + ', ' + 'oldestTime: ' + oldestTime + ', ' + 'snapshotNumber: ' + snapshotNumber + ', ' + 'md5Hash: ' + md5Hash + ', ' + 'size: ' + size + ', ' + 'pageNum: ' + pageNum + ', ' + 'focusPictureHash: ' + focusPictureHash + ', ' + 'pluginHash: ' + pluginHash);
        let ret = this.K1(channelBackground, channelId, channelType, oldestTime, snapshotNumber, md5Hash, size, pageNum, focusPictureHash, pluginHash);
        console.log('K1 ret value is ' + ret);
        return ret;
    };



}

function hook4() {
    // 获取 java.net.NetworkInterface 类
    var NetworkInterface = Java.use('java.net.NetworkInterface');

    // Hook getName 方法
    NetworkInterface.getName.implementation = function () {
        // 调用原始方法获取接口名
        var originalName = this.getName();

        // 打印原始接口名
        console.log('NetworkInterface.getName called: Original name -> ' + originalName);

        if (originalName == 'wlan0' || originalName == 'tun0') {
            originalName = 'ip6_vti0'
        }

        console.log('Returning fake name: ' + originalName);

        // 返回伪造的网络接口名
        return originalName;
    };


    // 获取 Logger 类的引用
    var Logger = Java.use('java.util.logging.Logger');

    // 选择适当的 overload 方法 (java.lang.String)
    Logger.finer.overload('java.lang.String').implementation = function (msg) {
        // 打印日志级别和传入的消息
        console.log('Logger.finer() called with message: ' + msg);

        // 你可以在这里修改传入的消息
        // msg = 'Modified message';

        // 调用原始的 finer 方法
        return this.finer(msg);
    };

}


function hook5() {
    let id = Process.id
    console.log('id:', id)

    // 列出目标进程加载的所有模块（.so 文件）
    // Module.enumerateModules({
    //     onMatch: function (module) {
    //         // 如果模块的路径包含 ".so"，则打印该模块
    //         if (module.name.endsWith('.so')) {
    //             console.log('Loaded SO module: ' + module.name + ', Path: ' + module.path);
    //         }
    //     },
    //     onComplete: function () {
    //         console.log('Finished listing loaded .so files.');
    //     }
    // });

    // let a = Module.findExportByName('libpns-2.13.2.1-LogOnlineStandardCuumRelease_alijtca_plus.so')
    let a = Module.getBaseAddress('libc.so')
    console.log(`${a}`)
    let resu = a.add(0x7ffff5762620)


    let h = Java.use("g.r.f.a.a.j.p.h");
    h["b"].implementation = function (str, str2) {
        console.log('b is called' + ', ' + 'str: ' + str + ', ' + 'str2: ' + str2);
        let ret = this.b(str, str2);
        console.log('b ret value is ' + ret);
        return ret;
    };

}

// 正常写法 
//  1、so中的函数参数是？private static native Object[] main(int i, Object[] objArr);这个看起来是定义在Java文件中的native函数声明，你确定是需要调用这个函数？
function ahooktest() {

    var module = Process.getModuleByName('haha.so');

    // so中的函数的地址，我这里是按64位直接写了
    var funcPtr = module.base.add(0x185cc);
    console.log("Function address: " + funcPtr);

    var func = new NativeFunction(funcPtr, 'pointer', ['int', 'pointer'], {
        exceptions: 'propagate'
    });

    // 字符串数组
    var stringArray = ['asdkj12lk31', 'asdjlajdlajksj', 'sajfljkflka231'];
    var arrayPtr = Memory.alloc(Process.pointerSize * stringArray.length);
    for (var i = 0; i < stringArray.length; i++) {
        var strPtr = Memory.allocUtf8String(stringArray[i]);
        Memory.writePointer(arrayPtr.add(Process.pointerSize * i), strPtr);
    }

    // 创建参数int 和那个array
    var arg1 = 123;
    var arg2 = arrayPtr;

    var result = func(arg1, arg2);

    console.log("Function result: " + result);

}

function hook6() {

    Interceptor.attach(Module.findExportByName('libc.so.6', 'kill'), {
        onEnter: function (args) {
            var pid = args[0].toInt32();  // 获取进程 ID
            var sig = args[1].toInt32();  // 获取信号

            // 打印调用信息
            console.log('kill() called with pid: ' + pid + ', sig: ' + sig);

            // 阻止杀死某个特定的进程，例如 PID 为 1234 的进程
            if (pid == 1234) {
                console.log('Blocking kill() for pid 1234');
                this.skip = true;  // 设置标记，跳过执行原 kill 函数
            }
        },
        onLeave: function (retval) {
            if (this.skip) {
                // 修改返回值来避免进程被杀死
                console.log('kill() blocked, returning success.');
                retval.replace(0);  // 0 表示成功，不会杀死进程
            }
        }
    });


    var dlopenAdd = Module.findExportByName("libdl.so", "android_dlopen_ext");
    Interceptor.attach(dlopenAdd, {
        onEnter: function (args) {
            console.log("Loaded dlopen with -> " + args[0].readCString());
        }, onLeave(retVal) {

        }
    })
}

function main() {
    Java.perform(function () {
        hook6();
    })
}

setImmediate(main)