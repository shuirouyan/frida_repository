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
}


function main() {

    Java.perform(function () {
        method01();
    })

}


setImmediate(main)

