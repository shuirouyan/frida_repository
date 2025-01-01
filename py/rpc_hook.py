import frida
import requests, json

hook_code = """
rpc.exports = {
    getsig:function(url, body, method){
        var sig = "";

        Java.perform(
            function(){
                let f = Java.use("g.m.b.d.f");
                console.log(`f:${f}`)
                let res = f.s(url, body, method)
                //console.log(`consoleconsoleconsole:${res}`)
                var JSONObject = Java.use("org.json.JSONObject");
                var jsonParams = JSONObject.$new(res);
                let rpc_result = JSON.stringify(JSON.parse(jsonParams.toString()))
                //console.log('s ret value is ' + rpc_result);
                sig = rpc_result
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
    # 10.17.202.177
    # device = frida.get_device_manager().add_remote_device("10.17.202.177:5557")
    # processes = frida.get_usb_device().enumerate_processes()
    process = frida.get_usb_device().attach('触电新闻')
    script = process.create_script(hook_code)
    script.on('message', on_message)
    script.load()
    return script


if __name__ == '__main__':
    script = prepare_hook()
    # url = 'https://api.itouchtv.cn/userservice/v6/activity?type=0'
    # url = 'https://api.itouchtv.cn/newsservice/v2/adUrl'
    url = 'https://api.itouchtv.cn/newsservice/v4/uniteChannelNews?installChannel=TengXun&ac=1&cCode=3300&oldestTime=0&romVersion=OnePlus&snapshotNumber=0&latitude=0.0&pluginHash=41af1e06a6fe6154%2C699d15c694656ac9%2Ca729882b84484625%2Ced35d1665ff945c9%2C5e1a3cc7836cbde3%2C614f542624586bdc&channelType=0&language=zh&focusPictureHash=6d49bf4919159664aed38f46675a9f16&devicePlatform=android&pageNum=1&md5Hash=e7cb5872be5ef8db59e2cb80eb41b681&osVersion=9&pCode=33&aCode=0&refreshType=0&deviceModel=GM1900&channelId=0&deviceBrand=OnePlus&longitude=0.0'
    method = 'GET'
    result = script.exports.getsig(url, '', method)
    print(f'result:{result}')
    headers = json.loads(result)
    remote_result = requests.get(url=url, headers=headers)
    print(f'remote_result:{remote_result.text}, status:{remote_result.status_code}')