
function hook() {
    //let oOoO0Oo0OoOoOoOo = Java.use("oOoO0Oo0o0Oo0O0O.oOoO0Oo0OoOoOoOo");

    // let Config = Java.use("com.fongmi.android.tv.bean.Config");
    // Config["getDesc"].implementation = function () {
    //     console.log('getDesc is called');
    //     let ret = this.getDesc();
    //     console.log('getDesc ret value is ' + ret);
    //     return ret;
    // };

    // let oOoO0OoO0oOo0oOo = Java.use("oOo0oO0OoOoO0oOo.oOoO0OoO0oOo0oOo");
    // oOoO0OoO0oOo0oOo["OoOoO0oOoO0O0OoO"].implementation = function (str) {
    //     console.log('OoOoO0oOoO0O0OoO is called' + ', ' + 'str: ' + str);
    //     let ret = this.OoOoO0oOoO0O0OoO(str);
    //     console.log('OoOoO0oOoO0O0OoO ret value is ' + ret);
    //     return ret;
    // };

    // let Gson = Java.use("com.google.gson.Gson");
    // Gson["fromJson"].overload('java.lang.String', 'java.lang.Class').implementation = function (str, cls) {
    //     console.log('fromJson is called' + ', ' + 'str: ' + str + ', ' + 'cls: ' + cls);
    //     let ret = this.fromJson(str, cls);
    //     console.log('fromJson ret value is ' + ret);
    //     return ret;
    // };



    // let SettingActivity = Java.use("com.fongmi.android.tv.ui.activity.SettingActivity");
    // SettingActivity["OoOo0Oo0OoOoO0O0"].implementation = function (settingActivity) {
    //     console.log('OoOo0Oo0OoOoO0O0 is called' + ', ' + 'settingActivity: ' + settingActivity.toString());
    //     let ret = this.OoOo0Oo0OoOoO0O0(settingActivity);
    //     console.log('OoOo0Oo0OoOoO0O0 ret value is ' + ret);
    //     return ret;
    // };


    // let SettingActivity = Java.use("com.fongmi.android.tv.ui.activity.SettingActivity");
    // f7536OoOoO0oOoO0O0OoO = SettingActivity.OoOoO0oOoO0O0OoO.value;
    // console.log('SettingActivity.OoOoO0oOoO0O0OoO.value:', SettingActivity.OoOoO0oOoO0O0OoO.value)

    // var TextView = Java.use('android.widget.TextView');
    // TextView.setText.overload('java.lang.CharSequence').implementation = function (charSequence) {
    //     console.log('setText called with: ' + charSequence);
    //     // 调用原始的 setText 方法
    //     this.setText(charSequence);
    // };

    // var TextView = Java.use('android.widget.TextView');

    // 输出所有 setText 的重载方法
    // TextView.setText.overloads.forEach(function (overload) {
    //     console.log(overload);
    // });

    var TextView = Java.use('android.widget.TextView');
    var BufferType = Java.use('android.widget.TextView$BufferType');
    var newCharString = Java.use('java.lang.String');

    // // Hook setText 方法，接收 CharSequence 和 BufferType 类型的参数
    TextView.setText.overload('java.lang.CharSequence', 'android.widget.TextView$BufferType').implementation = function (charSequence, bufferType) {
        console.log('setText called with CharSequence: ' + charSequence);
        console.log('BufferType: ' + bufferType);

        // 可以修改文本内容 软件接口免费，请勿受骗购买！
        if (charSequence == '肥猫：接口完全免费，请勿受骗购买！') {
            var newText = charSequence.toString().replace("肥猫：接口完全免费，请勿受骗购买！", "hook修改的内容");
            console.log('Modified text: ' + newText);
            // 调用原始的 setText 方法
            this.setText(newCharString.$new(newText), bufferType);
            // return;
        } else if (charSequence == '软件接口免费，请勿受骗购买！') {
            var newText = charSequence.toString().replace("软件接口免费，请勿受骗购买！", "我不想要的弹窗内容");
            console.log('Modified text: ' + newText);
            // 调用原始的 setText 方法
            this.setText(newCharString.$new(newText), bufferType);
            // return;
        } else {

            // 调用原始的 setText 方法
            this.setText(charSequence, bufferType);
        }


    };




}

function main() {
    Java.perform(function () {
        hook();


    })
}

setImmediate(main)