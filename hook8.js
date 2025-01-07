function method01() {
    let OnlineJudgeApp = Java.use("com.yuanrenxue.onlinejudge2020.OnlineJudgeApp");
    console.log(`OnlineJudgeApp:${OnlineJudgeApp}`)
    // OnlineJudgeApp["getSign1"].implementation = function (j) {
    //     console.log('getSign1 is called' + ', ' + 'j: ' + j);
    //     let ret = this.getSign1(j);
    //     console.log('getSign1 ret value is ' + ret);
    //     return ret;
    // };
    let param = 3;
    let res = OnlineJudgeApp.getSign1(param);
    console.log(`res:${res}\tDate:${Date.now()}\t url:https://match.yuanrenxue.com/api/match/11/query?id=${param}&sign=${res}`)
}

// 查找RegisterNatives
function method02() {
    let module_name = Process.getModuleByName('libart.so')
    console.log(`module_name:${module_name}`)
    let registerNativesAddr;
    if (module_name) {
        let symbols = module_name.enumerateSymbols()
        for (let i = 0; i < symbols.length; i++) {
            let symbol = symbols[i]
            console.log(`symbol.name:${symbol.name}`)
            if (symbol.name.indexOf('CheckJNI') == -1
                && symbol.name.indexOf('RegisterNatives') != -1
                && symbol.name.indexOf('art') >= 0
                && symbol.name.indexOf('JNI') >= 0) {
                registerNativesAddr = symbol.address;
            }
        }
    }
    console.log(`registerNativesAddr:${registerNativesAddr}`)

    if (registerNativesAddr) {
        console.log(`date:${new Date()}`)
        console.log(`class_name:${JSON.stringify(Java.vm.tryGetEnv())}`)
        Interceptor.attach(registerNativesAddr, {
            onEnter: function (args) {
                let env = args[0]
                let java_class = args[1]
                let class_name = Java.vm.tryGetEnv().getClassName(java_class)
                // target class 
                // Java_com_mobile_auth_gatewayauth_utils_security_CheckRoot_checkDeviceDebuggable__
                let target_class = 'com.mobile.auth.gatewayauth.utils.security.CheckRoot'
                if (class_name === target_class) {
                    console.log(`RegisterNatives count:${args[3]}`)
                }
            },
            onLeave: function (retval) {

            }
        })

    }

}

function method03() {
    let funcName = 'yuaurenxue'
    var modules = Process.enumerateModules()
    for (let k = 0; k < modules.length; k++) {
        let module = modules[k]
        // enumerateSymbols
        let _symbols = module.enumerateSymbols()
        for (let i = 0; i < _symbols.length; i++) {
            let symbol = _symbols[i]
            // console.log(`symbol.name:${symbol.name}`)
            if (symbol.name.indexOf(funcName) != -1) {
                console.log(`module name:${module.name} enumerateSymbols symbol.name:${symbol.name} JSON.stringify:{JSON.stringify(_symbols)}`)
            }
        }

        // enumerateExports
        let _exports = module.enumerateExports()
        for (let i = 0; i < _exports.length; i++) {
            let _exportModule = _exports[i]
            // console.log(`exportModule.name:${exportModule.name}`)
            if (_exportModule.name.indexOf(funcName) != -1) {
                console.log(`module name:${module.name} enumerateExports exportModule.name:${_exportModule.name} JSON.stringify:{JSON.stringify(_exportModule)}`)
            }
        }

    }
    // let libName = '/data/app/com.touchtv.touchtv-tUIYUpE1-RCIE_w0Oct9rA==/lib/arm64/libpns-2.13.2.1-LogOnlineStandardCuumRelease_alijtca_plus.so'
    // let load_so = Module.load(libName)
    // console.log(`load_so module:${load_so}`)
    // let libProcess = Process.getModuleByName(libName)
    // console.log(`libProcess:${libProcess}`)
    const fgetsPtr = Module.findExportByName(null, 'fgets');
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
                if (result.indexOf('pn') != -1) {
                    console.log("  Original fgets Output: " + result);
                }


                // 修改 fgets 返回的内容
                // var newContent = "Modified by Frida\n";
                // Memory.writeUtf8String(this.buffer, newContent);

                // console.log("  Modified fgets Output: " + newContent);
            }
        }
    });

}

function method04() {
    let funcName = ''
    let _symbols = Module.enumerateSymbols()
    for (let i = 0; i < _symbols.length; i++) {
        let symbol = _symbols[i]
        // console.log(`symbol.name:${symbol.name}`)
        if (symbol.name.indexOf(funcName) != -1) {
            console.log(`module name:${module.name} enumerateSymbols symbol.name:${symbol.name} JSON.stringify:{JSON.stringify(_symbols)}`)
        }
    }
}

function method05() {
    let dlsym_addr = Module.findExportByName('libdl.so', 'dlsym')
    let args1;
    console.log(`dlsym_addr:${dlsym_addr}`)
    Interceptor.attach(dlsym_addr, {
        onEnter: function (args) {
            args1 = args[1]
        },
        onLeave: function (retval) {
            if (args1 != null && args1.readCString().indexOf('JNI') != -1) {
                let process_module = Process.getModuleByAddress(retval)
                console.log(`======> ${args1.readCString()} retval:${retval}, module.name:${process_module.name}`)

            }

        }
    })
}

function method06() {
    let module_name = Process.getModuleByName('libart.so')
    console.log(`module_name:${module_name}`)
    let registerNativesAddr;
    if (module_name) {
        let symbols = module_name.enumerateSymbols()
        for (let i = 0; i < symbols.length; i++) {
            let symbol = symbols[i]
            // console.log(`symbol.name:${symbol.name}`)
            if (symbol.name.indexOf('CheckJNI') == -1
                && symbol.name.indexOf('RegisterNatives') != -1) {
                registerNativesAddr = symbol.address;
            }
        }
    }
    console.log(`registerNativesAddr:${registerNativesAddr}`)

    if (registerNativesAddr != null) {
        Interceptor.attach(registerNativesAddr, {
            onEnter: function (args) {
                let env = Java.vm.tryGetEnv()
                // class name
                let class_name = env.getClassName(args[1])
                // 注册函数个数
                let method_count = args[3].toInt32()
                // 函数名称
                let method_name = args[2].readPointer().readCString()
                // 函数签名
                let signature = args[2].add(Process.pointerSize).readPointer().readCString();
                // 函数地址
                let fn_ptr = args[2].add(Process.pointerSize * 2).readPointer()
                // 函数地址模块 
                let module = Process.findModuleByAddress(fn_ptr)
                console.log(`class name:${class_name}, method_count:${method_count}, method name:${method_name}, 
                signature:${signature}, module:${JSON.stringify(module)}`)
            },
            onLeave: function (retval) {


            }
        })
    }

}


function method07() {
    let module_name = Process.getModuleByName('libart.so')
    console.log(`module_name:${module_name}`)
    let registerNativesAddr;
    if (module_name) {
        let symbols = module_name.enumerateSymbols()
        for (let i = 0; i < symbols.length; i++) {
            let symbol = symbols[i]
            // console.log(`symbol.name:${symbol.name}`)
            if (symbol.name.indexOf('CheckJNI') == -1
                && symbol.name.indexOf('RegisterNatives') != -1) {
                registerNativesAddr = symbol.address;
            }
        }
    }
    console.log(`registerNativesAddr:${registerNativesAddr}`)

    if (registerNativesAddr != null) {
        Interceptor.attach(registerNativesAddr, {
            onEnter: function (args) {
                let env = Java.vm.tryGetEnv()
                // class name
                let class_name = env.getClassName(args[1])
                // 注册函数个数
                let method_count = args[3].toInt32()
                for (let i = 0; i < method_count; i++) {
                    // 函数名称
                    let method_name = args[2].add(Process.pointerSize * 3 * i).readPointer().readCString()
                    // 函数签名
                    let signature = args[2].add(Process.pointerSize * 3 * i).add(Process.pointerSize).readPointer().readCString();
                    // 函数地址
                    let fn_ptr = args[2].add(Process.pointerSize * 3 * i).add(Process.pointerSize * 2).readPointer()
                    // 函数地址模块 
                    let module = Process.findModuleByAddress(fn_ptr)
                    console.log(`class name:${class_name}, method_count:${method_count}, method name:${method_name}, 
                    signature:${signature}, module:${JSON.stringify(module)}`)
                }

            },
            onLeave: function (retval) {


            }
        })
    }
    let a = Java.use("g.b.a.a");
    a["a"].implementation = function (str) {
        console.log('a is called' + ', ' + 'str: ' + str);
        let ret = this.a(str);
        console.log('a ret value is ' + ret);
        return ret;
    };

}

function method08() {
    var dlopen = Module.findExportByName(null, "dlopen");
    var android_dlopen_ext = Module.findExportByName(null, "android_dlopen_ext");
    Interceptor.attach(dlopen, {
        onEnter: function (args) {
            var path_ptr = args[0];
            var path = ptr(path_ptr).readCString();
            console.log("[dlopen:]", path);
        },
        onLeave: function (retval) {
        }
    });
    Interceptor.attach(android_dlopen_ext, {
        onEnter: function (args) {
            var path_ptr = args[0];
            var path = ptr(path_ptr).readCString();
            console.log("[dlopen_ext:]", path);
        },
        onLeave: function (retval) {
        }
    });
}

function method09() {
    var dlopen = Module.findExportByName(null, "dlopen");
    var android_dlopen_ext = Module.findExportByName(null, "android_dlopen_ext");
    Interceptor.attach(dlopen, {
        onEnter: function (args) {
            var path_ptr = args[0];
            var path = ptr(path_ptr).readCString();
            console.log("[dlopen -> enter", path);
        },
        onLeave: function (retval) {
            console.log("dlopen -> leave")
        }
    });
    Interceptor.attach(android_dlopen_ext, {
        onEnter: function (args) {
            var path_ptr = args[0];
            var path = ptr(path_ptr).readCString();
            console.log("[android_dlopen_ext -> enter", path);
        },
        onLeave: function (retval) {
            console.log("android_dlopen_ext -> leave")
        }
    });
}

function method10() {
    var pth_create = Module.findExportByName("libc.so", "pthread_create");
    console.log("[pth_create]", pth_create);
    Interceptor.attach(pth_create, {
        onEnter: function (args) {
            var module = Process.findModuleByAddress(args[2]);
            if (module != null) {
                console.log("开启线程-->", module.name, args[2].sub(module.base));
            }

        },
        onLeave: function (retval) { }
    });
}

function method11() {
    var linker64_base_addr = Module.getBaseAddress("linker64")
    var call_constructors_func_off = 0x4a174
    var call_constructors_func_addr = linker64_base_addr.add(call_constructors_func_off)
    var listener = Interceptor.attach(call_constructors_func_addr, {
        onEnter: function (args) {
            console.log("call_constructors -> enter")
            var module = Process.findModuleByName("libmsaoaidsec.so")
            if (module != null) {
                Interceptor.replace(module.base.add(0x1B924), new NativeCallback(function () {
                    console.log("替换成功")
                }, "void", []))
                listener.detach()
            }
        },
    })
}

function method12() {
    let jiagu_module = Process.getModuleByName('libjiagu_64.so')
    console.log(`jiagu module : ${JSON.stringify(jiagu_module)}`)

    let symbols = jiagu_module.enumerateSymbols()

    for (let i = 0; i < symbols.length; i++) {
        let symbol = symbols[i]
        console.log(`symbol.name:${symbol.name}`)
        // if (symbol.name.indexOf('CheckJNI') == -1
        //     && symbol.name.indexOf('RegisterNatives') != -1) {
        //     registerNativesAddr = symbol.address;
        // }
    }

    Interceptor.attach(jiagu_module.base, {
        onEnter: function (args) {
            console.log("call_constructors -> enter")
            let address = args[0]
            let names = ptr(address).readCString()
            console.log(`names:${names}`)
        },
        onLeave: function (retval) { }
    })

}


function main() {

    Java.perform(function () {
        method12();
    })

}


setImmediate(main)