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
                    let module_so = Process.findModuleByAddress(fn_ptr)
                    console.log(`fn_ptr:${fn_ptr}, module_so:${JSON.stringify(module_so)}`)
                    console.log(`class name:${class_name}, method_count:${method_count}, method name:${method_name}, 
                    signature:${signature}, module:${JSON.stringify(fn_ptr.sub(0x40600))}`)
                }

            },
            onLeave: function (retval) {


            }
        })
    }


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
        method07();

        hook_kill();
    })

}


setImmediate(main)

