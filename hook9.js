
function method01() {
    // let zsus = Process.getModuleByName('libzeus_direct_dex.so')
    // console.log(`zsus:${zsus}`)
    let module_name = Process.getModuleByName('libart.so')
    console.log(`module_name:${module_name}`)
    var dlopen = Module.findExportByName(null, "dlopen");
    var android_dlopen_ext = Module.findExportByName(null, "android_dlopen_ext");
    // Interceptor.attach(dlopen, {
    //     onEnter: function (args) {
    //         var path_ptr = args[0];
    //         var path = ptr(path_ptr).readCString();
    //         console.log("[dlopen:]", path);
    //     },
    //     onLeave: function (retval) {
    //     }
    // });
    // Interceptor.attach(android_dlopen_ext, {
    //     onEnter: function (args) {
    //         var path_ptr = args[0];
    //         var path = ptr(path_ptr).readCString();
    //         console.log("[dlopen_ext:]", path);
    //     },
    //     onLeave: function (retval) {
    //     }
    // });

    //创建一个DexClassLoader的wapper
    // var dexclassLoader = Java.use("dalvik.system.DexClassLoader");
    // //hook 它的构造函数$init，我们将它的四个参数打印出来看看。
    // dexclassLoader.$init.implementation = function(dexPath,optimizedDirectory,librarySearchPath,parent){
    //      console.log("dexPath:"+dexPath);
    //     console.log("optimizedDirectory:"+optimizedDirectory);
    //      console.log("librarySearchPath:"+librarySearchPath);
    //     console.log("parent:"+parent);
    //     //不破换它原本的逻辑，我们调用它原本的构造函数。
    //   this.$init(dexPath,optimizedDirectory,librarySearchPath,parent);
    // }
    // console.log("down!");

    let DeviceUtil = Java.use("com.baidu.ocr.sdk.utils.DeviceUtil");
    let context_param = Java.use('com.zdst.weex.module.SplashActivity')
    let ocr_param = Java.use('com.baidu.ocr.sdk.OCR')
    console.log(`device util:${DeviceUtil.instance}`)
    // console.log(`ocr util:${ocr_param.getInstance(null)}`)
    console.log(`context_param util:${context_param}`)
    DeviceUtil["getDeviceInfo"].implementation = function (context) {
        console.log('getDeviceInfo is called' + ', ' + 'context: ' + context);
        let ret = this.getDeviceInfo(context);
        console.log('getDeviceInfo ret value is ' + ret);
        return ret;
    };

    Java.choose('com.zdst.weex.module.SplashActivity',{
        onMatch(instance){
            console.log(`instance:${instance}`)
            ocr_param.getInstance(instance)
        },onComplete(){

        }
    })

    Java.choose('com.baidu.ocr.sdk.OCR',{
        onMatch(instance){
            console.log(`instance:${instance}`)

            let byCache = instance.getLicense()
            console.log(`byCache:${byCache}`)
        },onComplete(){

        }
    })

    Java.choose('com.baidu.ocr.sdk.utils.DeviceUtil',{
        onMatch(instance){
            console.log(`instance:${instance.getBuildVersion()}`)
        },onComplete(){

        }
    })
}


function main() {

    Java.perform(function () {
        method01();
    })

}


setImmediate(main)