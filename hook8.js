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
            if (symbol.name.indexOf('CheckJNI') == -1 && symbol.name.indexOf('RegisterNatives') != -1) {
                registerNativesAddr = symbol.address;
            }
        }
    }
    console.log(`registerNativesAddr:${registerNativesAddr}`)
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
    let libName = 'libyuanrenxue_native.so'
    // Module.load(libName)
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
                if (result.indexOf('.so') != -1) {
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
function main() {

    Java.perform(function () {
        method03();
    })

}


setImmediate(main)