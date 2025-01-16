import frida
import requests, json

hook_code = """
rpc.exports = {
    getsig:function(){
        var sig = "";

        Java.perform(
            function(){
                let aTime=Math.floor(Date.now()/1000)
                console.log(`aTime:${aTime}`)
                let str='ZTQ3ODUzZDI4NTY1NGM3Y19fT25lUGx1c19HTTE5MDA%3D' + aTime
                let StringUtil = Java.use("com.netease.newsreader.framework.util.string.StringUtils");
                if (StringUtil) {
                    let nStr = StringUtil.n(str)
                    console.log(`n:${nStr}`)

                    let Encrypt = Java.use("com.netease.nr.biz.pc.sync.Encrypt");
                    let eStr=Encrypt.getEncryptedParams(nStr)
                    console.log(`eStr:${eStr}`)

                    let StringUtilc = Java.use("com.netease.newsreader.support.utils.string.StringUtil");
                    let cStr=StringUtilc.c(eStr)
                    console.log(`cStr:${cStr}`)
                    sig = JSON.stringify(`{"sign":"${cStr}","ts":"${aTime}"}`)
                }
                
            }
        )
        return sig;
    }
}
"""

def on_message(message, data):
    if message['type'] == 'send':
        print("[*] {0}".format(message['payload']))
    else:
        print(message)


def prepare_hook():
    '''
    获取到的app list,打印出来name 和process id，在attach的时候使用的是name，如果出现的是包名称，那么就使用包名称
    processes = frida.get_usb_device().enumerate_processes()
    for process in processes:
        print(f"Process name: {process.name}, pid: {process.pid}")
    '''
    # 10.17.202.177
    # device = frida.get_device_manager().add_remote_device("10.17.202.177:5557")
    # processes = frida.get_usb_device().enumerate_processes()
    process = frida.get_usb_device().attach('网易新闻')
    script = process.create_script(hook_code)
    script.on('message', on_message)
    script.load()
    return script

def remote_interface():
    script = prepare_hook()
    result = script.exports.getsig()
    print(f'result:{result} type:{type(result)}')
    if result != '':
        result = result.encode().decode('utf-8')
        res_json = json.loads(result)
        res_json = json.loads(res_json)
        print(f'res_json:{type(res_json)}')
        ts = res_json['ts']
        sign = res_json['sign']
        url = f'https://gw.m.163.com/nc/api/v1/feed/dynamic/headline-list?from=toutiao&tid=T1348647909107&aiTouTiaoSwitch=0&size=10&offset=0&fn=8&devId=f2M NqIzL9Ajj8Dl8s8Cii5u9ceaAZ/mF6y5bDYkkd8YnjOlXQUN7A2UXd6AL8W5&devVId=rY1ltNeSa71o 4WX0C rV uBmTRQwGCo/bixS1OG9/BQDBNWxV1vrgc0bfpdx pYePBK0dNsyevylzp8V9OOiA%3D%3D&encryption=1&version=113.2&net=wifi&canal=QQ_news_yunying4&ts={ts}&sign={sign}&refreshCard=dropdown'
        headers={
            "Host": "gw.m.163.com",
            "User-Agent": "NewsApp/113.2 Android/9 (OnePlus/GM1900)",
            "Connection": "Keep-Alive",
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Add-To-Queue-Millis": "1737007762573",
            "data4-Sent-Millis": "1737007762574",
            "Cache-Control": "no-cache",
            "X-NR-Trace-Id": "1737007762583_95212279_ZTQ3ODUzZDI4NTY1NGM3Y19fT25lUGx1c19HTTE5MDA%3D",
            "X-NR-ISE": "1",
            "X-XR-Original-Host": "gw.m.163.com",
            "User-C": "5aS05p2h",
            "User-RC": "UjgzLZ+E4Lemnj+sMro9qwqQ3xlDp4PUECu18073DbE2Sp1cMm3KWoG4EVq0Iff0",
            "User-D": "f2M+NqIzL9Ajj8Dl8s8Cii5u9ceaAZ/mF6y5bDYkkd8YnjOlXQUN7A2UXd6AL8W5",
            "User-VD": "rY1ltNeSa71o+4WX0C+rV+uBmTRQwGCo/bixS1OG9/BQDBNWxV1vrgc0bfpdx+pYePBK0dNsyevylzp8V9OOiA==",
            "User-appid": "TItcOwjV9bndQ91C5VadYg==",
            "User-sid": "uAbf+TS8rLsnSBkQGJ4GIlUv8vNV2T8RiF1NgKd372c=",
            "User-LC": "67NqtW9W02z/qXjaEOOHag==",
            "User-N": "VnE1Iqw3/SoXRqhFJu9cFg==",
            "User-CN": "8dabkxj70LEGQY+UurBODnjwStHTbMnr8pc6fFfTjog=",
            "X-NR-TS": "1737007762593",
            "X-NR-SIGN": "b67526b2be62c24500dcdd7738158077",
            "X-NR-Net-Lib": "okhttp"
            }
        remote_result = requests.get(url=url, headers=headers)
        # remote_result.content.decode('utf-8')

        print(f'remote_result:{remote_result.text}, status:{remote_result.status_code} Content-Type: {remote_result.headers.get("Content-Type")}')
        return remote_result.text
    else:
        return ""

if __name__ == '__main__':
    # pass
    remote_interface()
    # processes = frida.get_usb_device().enumerate_processes()
    # for process in processes:
        # print(f"Process name: {process.name}, pid: {process.pid}")