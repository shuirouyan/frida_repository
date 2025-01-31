function method01() {
    let process_id = Process.id
    console.log(`process id:${process_id}`)
    let Intrinsics = Java.use("kotlin.jvm.internal.Intrinsics");
    // Intrinsics["checkNotNullExpressionValue"].implementation = function (obj, str) {
    //     console.log('checkNotNullExpressionValue is called' + ', ' + 'obj: ' + obj + ', ' + 'str: ' + str);
    //     let ret = this.checkNotNullExpressionValue(obj, str);
    //     console.log('checkNotNullExpressionValue ret value is ' + ret);
    //     return ret;
    // };

    var Log = Java.use("android.util.Log");

    // Hook Log.d 方法
    Log.d.overload('java.lang.String', 'java.lang.String').implementation = function (tag, message) {
        console.log("Log.d called: " + tag + ", " + message);
        // 调用原始方法
        return this.d(tag, message);
    };

    let ViewPager2 = Java.use("androidx.viewpager2.widget.ViewPager2");
    ViewPager2["setUserInputEnabled"].implementation = function (z) {
        console.log('setUserInputEnabled is called' + ', ' + 'z: ' + z);
        let ret = this.setUserInputEnabled(true);
        console.log('setUserInputEnabled ret value is ' + ret);
        return ret;
    };

    let AppCompatActivity = Java.use("androidx.appcompat.app.AppCompatActivity");
    AppCompatActivity["findViewById"].implementation = function (i) {
        console.log('findViewById is called' + ', ' + 'i: ' + i);
        let ret = this.findViewById(i);
        console.log('findViewById ret value is ' + ret);
        return ret;
    };



    let ProfileInstaller = Java.use("androidx.profileinstaller.ProfileInstaller");
    ProfileInstaller["transcodeAndWrite"].implementation = function (assetManager, str, packageInfo, file, str2, executor, diagnosticsCallback) {
        console.log('transcodeAndWrite is called' + ', ' + 'assetManager: ' + assetManager + ', ' + 'str: ' + str + ', ' + 'packageInfo: ' + packageInfo + ', ' + 'file: ' + file + ', ' + 'str2: ' + str2 + ', ' + 'executor: ' + executor + ', ' + 'diagnosticsCallback: ' + diagnosticsCallback);
        let ret = this.transcodeAndWrite(assetManager, str, packageInfo, file, str2, executor, diagnosticsCallback);
        console.log('transcodeAndWrite ret value is ' + ret);
        return ret;
    };


    let Builder = Java.use("androidx.activity.result.IntentSenderRequest$Builder");
    Builder["setFlags"].implementation = function (i, i2) {
        console.log('setFlags is called' + ', ' + 'i: ' + i + ', ' + 'i2: ' + i2);
        let ret = this.setFlags(i, i2);
        console.log('setFlags ret value is ' + ret);
        return ret;
    };

    let FoldFragment2$onViewCreated$gestureDetector$1 = Java.use("com.zj.wuaipojie2025.FoldFragment2$onViewCreated$gestureDetector$1");
    FoldFragment2$onViewCreated$gestureDetector$1["onScroll"].implementation = function (motionEvent, e2, f, f2) {
        console.log('onScroll is called' + ', ' + 'motionEvent: ' + motionEvent + ', ' + 'e2: ' + e2 + ', ' + 'f: ' + f + ', ' + 'f2: ' + f2);
        let ret = this.onScroll(motionEvent, e2, f, f2);
        console.log('onScroll ret value is ' + ret);
        return ret;
    };
}


function main() {

    Java.perform(function () {
        method01();
    })

}


setImmediate(main)

