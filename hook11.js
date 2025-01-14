// 挂钩 android_dlopen_ext 函数，当加载特定动态库时进行处理
function my_hook_dlopen(soName = '') {
    // 找到 android_dlopen_ext 函数的地址并挂钩
    Interceptor.attach(Module.findExportByName(null, "android_dlopen_ext"), {
        onEnter: function (args) {
            // 获取加载的库路径
            var pathptr = args[0];
            if (pathptr !== undefined && pathptr != null) {
                var path = ptr(pathptr).readCString();
                // 如果路径中包含目标动态库名，则标记为可以进行 hook
                if (path.indexOf("libjiagu_64") !== -1) {
                    this.is_can_hook = true;
                    console.log("hook libjiagu_64 started ......");
                    // 执行 Hook 任务
                    //...
                }

            }
        },
        onLeave: function (retval) {
            // 如果满足条件，执行 dump 操作
            if (this.is_can_hook) {
                // dump_so(soName); // Dump 目标 SO 文件
                hook_open();

            }
        }
    });
}

// Dump SO 文件到指定目录
function dump_so(so_name) {
    try {
        // 获取指定 SO 模块的相关信息
        var libso = Process.getModuleByName(so_name);
        console.log("[name]:", libso.name);
        console.log("[base]:", libso.base);
        console.log("[size]:", ptr(libso.size));
        console.log("[path]:", libso.path);

        // 设置 dump 文件的保存路径
        var file_path = "/data/data/com.touchtv.touchtv/" + libso.name + "_" + libso.base + "_" + ptr(libso.size) + ".so";

        // 创建文件句柄并准备写入
        var file_handle = new File(file_path, "wb");
        if (file_handle != null) {
            // 修改内存权限为可读写执行
            Memory.protect(ptr(libso.base), libso.size, 'rwx');

            // 读取内存中的 SO 数据
            var libso_buffer = ptr(libso.base).readByteArray(libso.size);

            // 写入到文件
            file_handle.write(libso_buffer);
            file_handle.flush();
            file_handle.close();

            console.log("[dump]:", file_path); // 输出 dump 文件路径
        }
    } catch (e) {
        console.error("Error during dump: " + e.message);
    }
}

// 延时执行 hook 操作
setImmediate(function () {
    Java.perform(function () {
        my_hook_dlopen("libjiagu_64.so"); // 传入目标库名

    })
});
function hook_open() {
    var pth = Module.findExportByName(null, "open");
    Interceptor.attach(ptr(pth), {
        onEnter: function (args) {
            this.filename = args[0];
            console.log("", this.filename.readCString())
        }, onLeave: function (retval) {
        }
    })
}