function method01() {
    let process_id = Process.id
    console.log(`process id:${process_id}`)
    let Intrinsics = Java.use("kotlin.jvm.internal.Intrinsics");
    Intrinsics["checkNotNullExpressionValue"].implementation = function (obj, str) {
        console.log('checkNotNullExpressionValue is called' + ', ' + 'obj: ' + obj + ', ' + 'str: ' + str);
        let ret = this.checkNotNullExpressionValue(obj, str);
        console.log('checkNotNullExpressionValue ret value is ' + ret);
        return ret;
    };
}


function main() {

    Java.perform(function () {
        method01();
    })

}


setImmediate(main)

