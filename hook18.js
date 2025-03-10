function method01() {
    let process_id = Process.id
    console.log(`process id:${process_id}`)

}


function method07() {
    let module_name = Process.getModuleByName('libart.so')
    console.log(`module_name:${JSON.stringify(module_name)}`)
    let registerNativesAddr;
    if (module_name) {
        let symbols = module_name.enumerateSymbols()
        for (let i = 0; i < symbols.length; i++) {
            let symbol = symbols[i]
            // console.log(`symbol.name:${symbol.name}`)
            if (symbol.name.indexOf('CheckJNI') == -1
                && symbol.name.indexOf('RegisterNatives') != -1) {
                registerNativesAddr = symbol.address;
                break;
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
                console.log(`class name:${args[2]}`)
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
                    let module_so = Process.findModuleByAddress(fn_ptr)
                    console.log(`fn_ptr:${fn_ptr}, module_so:${JSON.stringify(module_so)}`)
                    console.log(`class name:${class_name}, method_count:${method_count}, method name:${method_name}, 
                    signature:${signature}, module:${JSON.stringify(fn_ptr.sub(0x40600))}`)
                    // 
                    // class name:com.yuanrenxue.onlinejudge2020.OnlineJudgeApp, method_count:1, method name:getSign, 
                    // signature:(J)Ljava/lang/String;, module:"0xf3d36a10"

                    // let so_find = Process.findModuleByName('libyuanrenxue_native.so')
                    // console.log(`so_find:${JSON.stringify(so_find)}`)
                    // let module_so_addr = Process.findModuleByAddress('0xf3c2ea10')
                    // console.log(`module_so_addr:${JSON.stringify(module_so_addr)}`)
                    // Interceptor.attach(module_so_addr.base.add(0x1), {
                    //     onEnter: function (args) {
                    //         console.log(`0x40600:${new Date()}`)
                    //     }, onLeave: function (retval) {

                    //     }
                    // })
                }

            },
            onLeave: function (retval) {


            }
        })
    }
    let so_find = Process.findModuleByName('libyuanrenxue_native.so')
    console.log(`so_find:${JSON.stringify(so_find)}`)
}

function method14() {
    var linker64_base_addr = Module.getBaseAddress("linker64")
    var android_dlopen_ext_func_off = 0x0000000000031098
    var android_dlopen_ext_func_addr = linker64_base_addr.add(android_dlopen_ext_func_off)
    Interceptor.attach(android_dlopen_ext_func_addr, {
        onEnter: function (args) {
            console.log("android_dlopen_ext -> enter : " + args[0].readCString())
        },
        onLeave: function (ret) {
            console.log("android_dlopen_ext -> leave")
        }
    })

}

function method15() {
    // 获取libc模块的基地址
    var libc = Module.findBaseAddress('libc.so');

    if (!libc) {
        console.error('无法找到libc模块');
        process.exit(1);
    }

    // 查找pthread_create函数的地址
    var pthread_create_addr = Module.findExportByName('libc.so', 'pthread_create');

    if (!pthread_create_addr) {
        console.error('无法找到pthread_create函数');
        process.exit(1);
    }

    // 定义钩子回调函数
    Interceptor.attach(pthread_create_addr, {
        onEnter: function (args) {
            // pthread_create的参数：thread, attr, start_routine, arg
            var threadPtr = args[0];
            var attrPtr = args[1];
            var startRoutineAddr = args[2].toInt32();
            var argPtr = args[3];

            console.log('pthread_create被调用，参数如下:');
            console.log('线程指针地址: ' + threadPtr);
            console.log('属性指针地址: ' + attrPtr);
            console.log('启动例程地址: 0x' + startRoutineAddr.toString(16));
            console.log('传递的参数地址: ' + argPtr);



            // 如果需要，可以在此处修改参数

        },

        onLeave: function (retval) {
            var result = retval.toInt32();

            console.log('pthread_create返回，结果: ' + result);
            if (result !== 0) {
                console.log('线程创建失败，错误码: ' + result);
            }
        }
    });

    console.log('已成功Hook pthread_create函数，等待事件...');

}

function method08() {
    var instance_singleton = null;
    let OnlineJudgeApp = Java.use('com.yuanrenxue.onlinejudge2020.OnlineJudgeApp')

    Java.choose('com.yuanrenxue.onlinejudge2020.OnlineJudgeApp', {
        onMatch: function (instance) {
            console.log(`instance:${JSON.stringify(instance.getSign(1))}`)
            instance_singleton = instance
        },
        onComplete: function () {
            console.log('finish')
        }
    })
    return instance_singleton
}
function method09() {
    var f = Process.findExportByName('libhoudini.so', 'getSign')
    var func_method = new NativeFunction(new NativePointer('0xf3fa6010'), 'pointer', ['long'])
    var num = 99
    var result = Memory.readCString(func_method(num))
    console.log(`result:${result}`)
}

function method10() {
    var loaded = false;
    Process.enumerateModules({
        onMatch: function (module) {
            if (module.name === "libyuanrenxue_native.so") {
                loaded = true;
                console.log("找到了 libtarget.so，基地址：", module.base);
            }
        },
        onComplete: function () {
            if (!loaded) {
                console.log("当前进程中未加载 libyuanrenxue_native.so");
            }
        }
    });

}

function method12() {
    Process.enumerateModules().forEach(function (module) {
        console.log(module.name);
    });

}

function method13() {
    // 目标模块名称，根据实际情况替换
    var targetLib = "libyuanrenxue_native.so";

    function isSystemLibrary(libPath) {
        // 这里只作为示例，根据实际情况调整过滤规则
        return libPath.indexOf("/system/") === 0;
    }

    var dlopenExt = Module.findExportByName("libdl.so", "android_dlopen_ext");
    if (dlopenExt) {
        Interceptor.attach(dlopenExt, {
            onEnter: function (args) {
                try {
                    this.libraryPath = Memory.readCString(args[0]);
                    if (isSystemLibrary(this.libraryPath)) {
                        // 对系统库不做处理，直接返回
                        return;
                    }
                    // 仅针对目标库或非系统库进行处理
                    if (this.libraryPath.indexOf(targetLib) !== -1) {
                        console.log("加载目标库: " + this.libraryPath);
                    } else {
                        console.log("加载非目标库: " + this.libraryPath);
                    }
                } catch (e) {
                    console.error("onEnter 异常: " + e);
                }
            },
            onLeave: function (retval) {
                try {
                    if (!this.libraryPath || isSystemLibrary(this.libraryPath))
                        return;
                    if (this.libraryPath.indexOf(targetLib) !== -1) {
                        var moduleBase = Module.findBaseAddress(targetLib);
                        console.log(targetLib + " 已加载，基地址: " + moduleBase);
                    }
                } catch (e) {
                    console.error("onLeave 异常: " + e);
                }
            }
        });
    } else {
        var dlopenAddr = Module.findExportByName("libdl.so", "dlopen");
        if (dlopenAddr) {
            Interceptor.attach(dlopenAddr, {
                onEnter: function (args) {
                    try {
                        this.libraryPath = Memory.readCString(args[0]);
                        if (isSystemLibrary(this.libraryPath))
                            return;
                        if (this.libraryPath.indexOf(targetLib) !== -1) {
                            console.log("dlopen 加载目标库: " + this.libraryPath);
                        } else {
                            console.log("dlopen 加载非目标库: " + this.libraryPath);
                        }
                    } catch (e) {
                        console.error("onEnter 异常: " + e);
                    }
                },
                onLeave: function (retval) {
                    try {
                        if (!this.libraryPath || isSystemLibrary(this.libraryPath))
                            return;
                        if (this.libraryPath.indexOf(targetLib) !== -1) {
                            var moduleBase = Module.findBaseAddress(targetLib);
                            console.log(targetLib + " 已加载，基地址: " + moduleBase);
                        }
                    } catch (e) {
                        console.error("onLeave 异常: " + e);
                    }
                }
            });
        } else {
            console.log("未能找到 android_dlopen_ext 或 dlopen 导出符号！");
        }
    }

}

function checkModule() {
    var dlopen = Module.findExportByName(null, "dlopen");
    Interceptor.attach(dlopen, {
        onEnter: function (args) {
            this.moduleName = Memory.readCString(args[0]);
        },
        onLeave: function (retval) {
            if (this.moduleName.indexOf("libyuanrenxue_native.so") >= 0) {
                console.log("libtarget.so 已加载, 基地址: " + Module.findBaseAddress("libyuanrenxue_native.so"));
            }
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
        // method01();
        // method07();
        // method09();
        // method13();
        // method14();
        method15();
        hook_kill();
    })

}


setImmediate(main)

