function hook1() {
    // 获取目标模块

    // const moduleName = "libart.so";
    // const moduleBase = Module.findBaseAddress(moduleName);
    // console.log("Module Base Address: ", moduleBase);
    // Module.enumerateSymbols(moduleName).forEach(symbol => {
    //     if (symbol.name.indexOf("LogOnlineStandardCuumRelease_alijtca_plus") !== -1) {
    //         console.log("Function Name:", symbol.name, "Address:", symbol.address);
    //     }
    // });


    // Process.enumerateModules().forEach(m => {
    //     if (m.name.indexOf(".so") !== -1) {
    //         console.log(m.name, m.base);
    //         Module.enumerateSymbols(m.name).forEach(symbol => {
    //             console.log("Function Name:", symbol.name, "Address:", symbol.address);
    //             if (symbol.name.indexOf("LogOnlineStandardCuumRelease_alijtca_plus") !== -1) {
    //             }
    //         });
    //     }
    // });


    // let f = Module.findExportByName(null, 'dlopen')
    // if (f != null) {
    //     Interceptor.attach(f, {
    //         onEnter(args) {
    //             console.log('CCCryptorCreate called from:\n' + '\n');
    //         }
    //     })
    // }
    // 获取 Base64 类
    var Base64 = Java.use("org.apache.commons.codec.binary.Base64");

    // 钩住 decodeBase64 方法
    Base64.decodeBase64.overload('[B').implementation = function (byteArray) {
        // 在调用 decodeBase64 方法之前，截取字节数组的部分内容并打印
        var stringData = Java.array('byte', byteArray);
        var decodedString = Java.use('java.lang.String').$new(stringData);
        console.log("Decoded String: " + decodedString);

        // 你可以在这里修改参数或执行其他操作
        // 调用原始的 decodeBase64 方法
        return this.decodeBase64(byteArray);
    };



    let C16515g = Java.use("g.m.a.q.g");
    C16515g["D"].implementation = function () {
        console.log('D is called');
        let ret = this.D();
        console.log('D ret value is ' + ret);
        return ret;
    };



}

function main() {
    Java.perform(function () {
        hook1();
    })
}

setImmediate(main)