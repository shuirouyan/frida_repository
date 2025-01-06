import frida
import requests, json

hook_code = """
rpc.exports = {
    getsig:function(param){
        var sig = "";

        Java.perform(
            function(){
                
                let OnlineJudgeApp = Java.use("com.yuanrenxue.onlinejudge2020.OnlineJudgeApp");
                let res = OnlineJudgeApp.getSign1(param);
                console.log(`res:${res}\tDate:${Date.now()}\t url:https://match.yuanrenxue.com/api/match/11/query?id=${param}&sign=${res}`)

                sig = `https://match.yuanrenxue.com/api/match/11/query?id=${param}&sign=${res}`
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
    process = frida.get_usb_device().attach('猿人学2020')
    script = process.create_script(hook_code)
    script.on('message', on_message)
    script.load()
    return script

def remote_interface(param):
    script = prepare_hook()
    result = script.exports.getsig(param)
    remote_result = requests.get(url=result, headers={'Content-Type':'application/json charset=UTF-8'})
    print(f'remote_result:{remote_result.text}, status:{remote_result.status_code}')
    return json.loads(remote_result.text)

if __name__ == '__main__':
    # pass
    remote_interface(1)
    