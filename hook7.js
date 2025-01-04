
function method01() {
    console.log(`date:${Date.now()}`)
    const tag = 'anti_fgets';
    const fgetsPtr = Module.findExportByName(null, 'fgets');
    console.log(`fgetsPtr:${fgetsPtr}`)
    if (null == fgetsPtr) {
        return;
    }
    // Hook fgets 方法
    Interceptor.attach(fgetsPtr, {
        onEnter: function (args) {
            // 第一个参数是 buffer，存储 fgets 读取的字符串
            this.buffer = args[0];
            
            // 第二个参数是读取的最大字节数
            this.size = args[1].toInt32();
            
            // 第三个参数是文件指针
            this.stream = args[2];

            // console.log("Hooked fgets:");
            // console.log("  Buffer Address: " + this.buffer);
            // console.log("  Size: " + this.size);
            // console.log("  Stream: " + this.stream);
        },
        onLeave: function (retval) {
            if (retval.toInt32() !== 0) {
                // 输出拦截的字符串
                var result = Memory.readUtf8String(this.buffer);
                if(result.indexOf('pn') != -1) {
                    console.log("  Original fgets Output: " + result);
                }


                // 修改 fgets 返回的内容
                // var newContent = "Modified by Frida\n";
                // Memory.writeUtf8String(this.buffer, newContent);

                // console.log("  Modified fgets Output: " + newContent);
            }
        }
    });


    if(false) {
        let check_root = Java.use('com.mobile.auth.gatewayauth.utils.security.CheckRoot')
        let rootInstance = check_root.$new()
        console.log(`checkRoot:${check_root}, instance:${rootInstance}`)
        let result = rootInstance.isDeviceRooted()
        let result2 = rootInstance.checkSuperuserApk()
        let result3 = rootInstance.checkRootPathSU()
        let result4 = rootInstance.checkDeviceDebuggable()
        console.log(`result:${result}\t checkSuperuserapk:${result2}\t checkRootPathSU:${result3}\t checkDeviceDebuggable:${result4}`)

        let f = Java.use("g.m.b.d.f");
        f["s"].implementation = function (url, body, Method) {
            console.log('s is called' + ', ' + 'url: ' + url + ', ' + 'body: ' + body + ', ' + 'Method: ' + Method);
            let ret = this.s(url, body, Method);
            var JSONObject = Java.use("org.json.JSONObject");
            var jsonParams = JSONObject.$new(ret);
            console.log('s ret value is ' + JSON.stringify(JSON.parse(jsonParams.toString())));
            
            return ret;
        };
    }

    // 列出目标进程加载的所有模块（.so 文件）
    Process.enumerateModules({
        onMatch: function (module) {
            // 如果模块的路径包含 ".so"，则打印该模块
            if (module.name.endsWith('.so') && module.name == 'libdl.so') {
                console.log('Loaded SO module: ' + module.name + ', Path: ' + module.path);
            }
        },
        onComplete: function () {
            console.log('Finished listing loaded .so files.');
        }
    });

    var registerNativesAddr = Module.findExportByName("libart.so", "art::JNI::RegisterNatives");
    if (registerNativesAddr) {
        Interceptor.attach(registerNativesAddr, {
            onEnter: function (args) {
                console.log("RegisterNatives called!");
                console.log("Env: " + args[0]);
                console.log("Class: " + args[1]);
                console.log("Methods: " + args[2]);
                console.log("Num Methods: " + args[3].toInt32());
            },
            onLeave: function (retval) {
                console.log("RegisterNatives returned: " + retval);
            }
        });
    } else {
        console.log("RegisterNatives not found!");
    }

    // var dlopenAdd = Module.findExportByName("libdl.so", "android_dlopen_ext");
    // Interceptor.attach(dlopenAdd, {
    //     onEnter: function (args) {
    //         console.log("Loaded dlopen with -> " + args[0].readCString());
    //     }, onLeave(retVal) {

    //     }
    // });

    // var symbols = Process.getModuleByName("libart.so").enumerateSymbols();
    // var addr_GetStringUTFChars = NULL;
    // for (var index = 0; index < symbols.length; index++) {
    // const symbols_one = symbols[index];
    // if (symbols_one.name.indexOf("art") >= 0){
    //     if (symbols_one.name.indexOf("checkJNI") == -1 && symbols_one.name.indexOf("GetStringUTFChar")>= 0){
    //         console.log("GetStringUTFChar ",JSON.stringify(symbols_one));
    //         addr_GetStringUTFChars = symbols_one.address;
    //         break
    //     }
    // }    
    // }
    // Interceptor.attach(addr_GetStringUTFChars,{
    // onEnter:function(args){
    //     var env = args[0];
    //     var param1 = args[1];
    //     console.log("env :",env,"param1 ",ptr(param1).readAnsiString);
    // },onLeave:function (retval) {
    //     console.log("addr_GetStringUTFChars retval :",ptr(retval).readCString())
    // }
    // })
    
    // var dlsym_addr = Module.findExportByName("libdl.so","dlsym");
    // var argsl = NULL;
    // Interceptor.attach(dlsym_addr,{
    //     onEnter:function(args){
    //         this.argsl = args[1];
    //     },onLeave:function(retval){
    //         var modeule = Process.findModuleByAddress(retval);
    //         if (modeule ==null) return;
    //         if (this.argsl.readCString().indexOf("JNI_OnLoad") >=0){
    //             console.log("modeule info :",modeule.base,modeule.name)
    //             console.log(this.argsl.readCString(),retval)
    //         }
    //     }
    // });

    var symbols = Process.getModuleByName("libart.so").enumerateSymbols();
    var RegisterNatives_addr = NULL;
    for (var index = 0; index < symbols.length; index++) {
        const symbol = symbols[index];
        if (symbol.name.indexOf("CheckJNI")==-1 &&  symbol.name.indexOf("RegisterNatives") >=0){
            RegisterNatives_addr = symbol.address;
        }
            
    }

    console.log("RegisterNatives_addr :",RegisterNatives_addr);

    Interceptor.attach(RegisterNatives_addr,{
        onEnter:function(args){
            var env = Java.vm.tryGetEnv();
            var class_name = env.getClassName(args[1]);
            console.log("class_name ",class_name)
            var method_count = args[3].toInt32();
            for (var index = 0; index < method_count; index++) {
                var method_name = args[2].add(Process.pointerSize*3*index).readPointer().readCString();
                console.log("method_name ",method_name);

                var signature = args[2].add(Process.pointerSize*3*index).add(Process.pointerSize).readPointer().readCString();
                console.log("signature ",signature);

                var fnPtr = args[2].add(Process.pointerSize*3*index).add(Process.pointerSize*2).readPointer();
                console.log("fnPtr ",fnPtr);

                var modeule = Process.findModuleByAddress(fnPtr);
                console.log("modeule ",JSON.stringify(modeule))

                console.log(" func in IDA addr 32 :",fnPtr.sub(modeule.base).sub(1))
                console.log(" func in IDA addr 64 :",fnPtr.sub(modeule.base))
            }

        },onLeave:function(retval){

        }
    })

}

function main() {

    Java.perform(function () {
        method01();
    })

}


setImmediate(main)