
function method01() {
    console.log(`date:${Date.now()}`)

    let check_root = Java.use('com.mobile.auth.gatewayauth.utils.security.CheckRoot')
    let rootInstance = check_root.$new()
    console.log(`checkRoot:${check_root}, instance:${rootInstance}`)
    let result = rootInstance.isDeviceRooted()
    let result2 = rootInstance.checkSuperuserApk()
    let result3 = rootInstance.checkRootPathSU()
    let result4 = rootInstance.checkDeviceDebuggable()
    console.log(`result:${result}\t checkSuperuserapk:${result2}\t checkRootPathSU:${result3}\t checkDeviceDebuggable:${result4}`)

    let f = Java.use("g.m.b.d.f");
    f["s"].implementation = function (url, body, Method) {
        console.log('s is called' + ', ' + 'url: ' + url + ', ' + 'body: ' + body + ', ' + 'Method: ' + Method);
        let ret = this.s(url, body, Method);
        var JSONObject = Java.use("org.json.JSONObject");
        var jsonParams = JSONObject.$new(ret);
        console.log('s ret value is ' + JSON.stringify(JSON.parse(jsonParams.toString())));
        
        return ret;
    };


}

function main() {

    Java.perform(function () {
        method01();
    })

}


setImmediate(main)