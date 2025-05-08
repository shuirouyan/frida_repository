function method01() {
    let process_id = Process.id
    console.log(`process id:${process_id}`)

}

function hook_kill() {
    Interceptor.attach(Module.findExportByName(null, 'kill'), {
        onEnter: function (args) {
            var pid = args[0].toInt32();  // 目标进程 ID
            var sig = args[1].toInt32();  // 信号类型
            console.log('kill() called with pid: ' + pid + ' and signal: ' + sig);
        },
        onLeave: function (retval) {
            console.log('kill() returned');
        }
    });

}

function hook_login() {
    let Gson = Java.use("com.google.gson.Gson");
    Gson["toJson"].overload('java.lang.Object').implementation = function (obj) {
        console.log('toJson is called' + ', ' + 'obj: ' + obj);
        let ret = this.toJson(obj);
        console.log('toJson ret value is ' + ret);
        return ret;
    };

    let SendCodePresenter = Java.use("com.disanrenti.threedbody.business.SendCodePresenter");
    SendCodePresenter["httpGetSign"].implementation = function (context, str, str2, i, onResultsListener, subscriptionList) {
        console.log('httpGetSign is called' + ', ' + 'context: ' + context + ', ' + 'str: ' + str + ', ' + 'str2: ' + str2 + ', ' + 'i: ' + i + ', ' + 'onResultsListener: ' + onResultsListener + ', ' + 'subscriptionList: ' + subscriptionList);
        let ret = this.httpGetSign(context, str, str2, i, onResultsListener, subscriptionList);
        console.log('httpGetSign ret value is ' + ret);
        return ret;
    };

    let BlockPuzzleDialog = Java.use("com.disanrenti.threedbody.modules.login.view.verificationcode.widget.BlockPuzzleDialog");
    BlockPuzzleDialog["checkCaptcha"].implementation = function (d) {
        console.log('checkCaptcha is called' + ', ' + 'd: ' + d);
        let ret = this.checkCaptcha(d);
        console.log('checkCaptcha ret value is ' + ret);
        return ret;
    };
    let LogUtil = Java.use("cn.forward.androids.utils.LogUtil");
    LogUtil["i"].overload('java.lang.String', 'java.lang.String').implementation = function (str, str2) {
        console.log('i is called' + ', ' + 'str: ' + str + ', ' + 'str2: ' + str2);
        let ret = this.i(str, str2);
        console.log('i ret value is ' + ret);
        return ret;
    };

    let CaptchaBean = Java.use("com.hanniu.common.all_bean.CaptchaBean");
    CaptchaBean["getSecretKey"].implementation = function () {
        console.log('getSecretKey is called');
        let ret = this.getSecretKey();
        console.log('getSecretKey ret value is ' + ret);
        return ret;
    };
    CaptchaBean["getToken"].implementation = function () {
        console.log('getToken is called');
        let ret = this.getToken();
        console.log('getToken ret value is ' + ret);
        return ret;
    };

    let SoftMoreDetailDialog = Java.use("com.disanrenti.threedbody.modules.soft.dialog.SoftMoreDetailDialog");
    SoftMoreDetailDialog["httpGetListData"].implementation = function (softDetailBean) {
        console.log('httpGetListData is called' + ', ' + 'softDetailBean: ' + softDetailBean);
        let ret = this.httpGetListData(softDetailBean);
        console.log('httpGetListData ret value is ' + ret);
        return ret;
    };
}

function main() {

    Java.perform(function () {
        method01();
        hook_kill();
        hook_login()
    })

}


setImmediate(main)

