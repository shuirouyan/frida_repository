function hook_call_constructors() {
    // 初始化变量
    let get_soname = null;
    let call_constructors_addr = null;
    let hook_call_constructors_addr = true;
    // 根据进程的指针大小找到对应的linker模块
    let linker = null;
    if (Process.pointerSize == 4) {
        linker = Process.findModuleByName("linker");
    } else {
        linker = Process.findModuleByName("linker64");
    }
    // 枚举linker模块中的所有符号
    let symbols = linker.enumerateSymbols();
    for (let index = 0; index < symbols.length; index++) {
        let symbol = symbols[index];
        // 查找名为"__dl__ZN6soinfo17call_constructorsEv"的符号地址
        if (symbol.name == "__dl__ZN6soinfo17call_constructorsEv") {
            call_constructors_addr = symbol.address;
            // 查找名为"__dl__ZNK6soinfo10get_sonameEv"的符号地址，获取soname
        } else if (symbol.name == "__dl__ZNK6soinfo10get_sonameEv") {
            get_soname = new NativeFunction(symbol.address, "pointer", ["pointer"]);
        }
    }
    // 如果找到了所有需要的地址和函数
    if (hook_call_constructors_addr && call_constructors_addr && get_soname) {
        // 挂钩call_constructors函数
        Interceptor.attach(call_constructors_addr, {
            onEnter: function (args) {
                // 从参数获取soinfo对象
                let soinfo = args[0];
                // 使用get_soname函数获取模块名称
                let soname = get_soname(soinfo).readCString();
                // 调用tell_init_info函数并传递一个回调，用于记录构造函数的调用信息
                tell_init_info(soinfo, new NativeCallback((count, init_array_ptr, init_func) => {
                    console.log(`[call_constructors] ${soname} count:${count}`);
                    console.log(`[call_constructors] init_array_ptr:${init_array_ptr}`);
                    console.log(`[call_constructors] init_func:${init_func} -> ${get_addr_info(init_func)}`);
                    // 遍历所有初始化函数，并打印它们的信息
                    for (let index = 0; index < count; index++) {
                        let init_array_func = init_array_ptr.add(Process.pointerSize * index).readPointer();
                        let func_info = get_addr_info(init_array_func);
                        console.log(`[call_constructors] init_array:${index} ${init_array_func} -> ${func_info}`);
                    }
                }, "void", ["int", "pointer", "pointer"]));
            }
        });
    }
}


setImmediate(hook_call_constructors);