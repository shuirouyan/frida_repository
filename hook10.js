function method01() {

    const openPtr = Module.findExportByName(null, "open");
    const open_old = new NativeFunction(openPtr, 'int', ['pointer', 'int']); //创建一个原函数指针，用于之后返回原函数
    var fakePath = "/data/data/com.touchtv.touchtv/maps";                //设置对应的fakepath
    Interceptor.replace(openPtr, new NativeCallback(function (pathnameptr, flag) {
        var pathname = Memory.readUtf8String(pathnameptr);
        console.log("open:", pathname);
        if (pathname.indexOf("maps") >= 0) {
            console.log("find", pathname, ",redirect to", fakePath);
            var filename = Memory.allocUtf8String(fakePath);
            return open_old(filename, flag); //设置我们cp下的maps
        } else {
            return open_old(pathname, flag);//原函数
        }
    }, 'int', ['pointer', 'int']));

}

function method02(soName = '') {
    // 找到 android_dlopen_ext 函数的地址并挂钩
    Interceptor.attach(Module.findExportByName(null, "android_dlopen_ext"), {
        onEnter: function (args) {
            // 获取加载的库路径
            var pathptr = args[0];
            if (pathptr !== undefined && pathptr != null) {
                var path = ptr(pathptr).readCString();
                // 如果路径中包含目标动态库名，则标记为可以进行 hook
                if (path.indexOf(soName) !== -1) {
                    this.is_can_hook = true;
                    console.log("Library " + soName + " loaded, dumping...");
                    // 执行 Dump 操作
                    dump_so(path); // 传入动态库路径
                }
            }
        },
        onLeave: function (retval) {
            // 其他操作，暂时不需要处理
        }
    });
}

function main() {

    Java.perform(function () {
        // method01();
        method02('libjgdtc.so')
    })

}


setImmediate(main)