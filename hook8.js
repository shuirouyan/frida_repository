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


function main() {

    Java.perform(function () {
        method01();
    })

}


setImmediate(main)