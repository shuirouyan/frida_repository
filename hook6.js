
function method01() {
    let DevicesUtil = Java.use("com.zdst.weex.utils.DevicesUtil");
    // DevicesUtil["fetchDeviceId"].implementation = function () {
    //     console.log('fetchDeviceId is called');
    //     let ret = this.fetchDeviceId();
    //     console.log('fetchDeviceId ret value is ' + ret);
    //     return ret;
    // };

    console.log('======================')
    // let ResultApi = Java.use("com.zdst.weex.network.ResultApi");
    // ResultApi["a"].overload('java.lang.String', 'java.lang.String').implementation = function (str, str2) {
    //     console.log('a is called' + ', ' + 'str: ' + str + ', ' + 'str2: ' + str2);
    //     let ret = this.a(str, str2);
    //     console.log('a ret value is ' + ret);
    //     return ret;
    // };

    console.log('-------------------------')

    // let cv = ParamsInterceptor["a"].overload('java.lang.String', 'long', 'java.lang.String', 'java.lang.String').implementation = function (str, j, str2, str3) {
    //     console.log('a is called' + ', ' + 'str: ' + str + ', ' + 'j: ' + j + ', ' + 'str2: ' + str2 + ', ' + 'str3: ' + str3);

    //     let ret = this.a(str, j, str2, str3);
    //     console.log('a ret value is ' + ret);
    //     return ret;
    // };
    Java.choose('com.zdst.weex.network.intercepter.ParamsInterceptor', {
        onMatch: function (instance) {
            console.log('Instance found:', instance);
            let d_time = Date.now()
            let chose_resp = instance.a('ZaKlAyWS', d_time, '/service/usersystem/register/checkPhone', '{"areacode":"+86","phone":"15587453426","requestid":"767cdd8237ca74e9201723fc054ab82c"}')
            console.log('choose_choose_choose:', chose_resp, ' d_time:', d_time)
        },
        onComplete: function () {
            console.log('Search complete.');
        }
    })
    // let parares = targetMethod.call('ZaKlAyWS', 1735024648768, '/service/usersystem/register/checkPhone', '{"areacode":"+86","phone":"15587453426","requestid":"767cdd8237ca74e9201723fc054ab82c"}')
    // console.log('aaaaaaaaaaaaaaaaaaaaaaaaa:', parares)

    console.log('+++++++++++++++++++++++++')
    // let Builder = Java.use("okhttp3.Request$Builder");
    // Builder["a"].overload().implementation = function () {
    //     console.log('a is called');
    //     let ret = this.a();
    //     console.log('a ret value is ' + ret);
    //     return ret;
    // };



}

function main() {

    Java.perform(function () {
        method01();
    })

}


setImmediate(main)