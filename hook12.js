function method01() {
	let process_id=Process.id
	console.log(`\nprocess id:${process_id}\n`)
	
    let BasicModeRequestUrls = Java.use("com.netease.newsreader.basic.constants.BasicModeRequestUrls");
    let f17065c = BasicModeRequestUrls.c.value;
    console.log(`value:${f17065c}`)

    let RequestSignInterceptor = Java.use("com.netease.newsreader.common.net.interceptor.RequestSignInterceptor");
    RequestSignInterceptor["a"].implementation = function (str, j2) {
        console.log('a is called' + ', ' + 'str: ' + str + ', ' + 'j2: ' + j2);
        let ret = this.a(str, j2);
        console.log('a ret value is ' + ret);
        return ret;
    };
    
    let aTime=Math.floor(Date.now()/1000)
    console.log(`aTime:${aTime}`)
    let str='ZTQ3ODUzZDI4NTY1NGM3Y19fT25lUGx1c19HTTE5MDA%3D' + aTime
    let StringUtil = Java.use("com.netease.newsreader.framework.util.string.StringUtils");
    let nStr = StringUtil.n(str)
    console.log(`n:${nStr}`)

    let Encrypt = Java.use("com.netease.nr.biz.pc.sync.Encrypt");
    let eStr=Encrypt.getEncryptedParams(nStr)
    console.log(`eStr:${eStr}`)

    let StringUtilc = Java.use("com.netease.newsreader.support.utils.string.StringUtil");
    let cStr=StringUtilc.c(eStr)
    console.log(`cStr:${cStr}`)

}


function main() {

    Java.perform(function () {
        method01();
    })

}


setImmediate(main)

