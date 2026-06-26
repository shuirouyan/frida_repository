import requests

def method01(num: int=1):
    session = requests.session()
    headers = {
    "User-Agent": "WeRead/9.3.0 WRBrand/oneplus Dalvik/2.1.0 (Linux; U; Android 9; GM1900 Build/PQ3A.190705.11211812)",
    "Connection": "Keep-Alive",
    "Accept": "*/*",
    "Accept-Encoding": "gzip",
    "accessToken": "F1s0JzFN",
    "vid": "171959952",
    "baseapi": "28",
    "appver": "9.3.0.10165975",
    "osver": "9",
    "channelId": "11",
    "basever": "9.3.0.10165973"
    }
    weixin_url = f'https://i.weread.qq.com/promo/list?cardNewType=6&guessscene=3&maxInsertPageType=&maxInsertPageIndex=-1&count=12&requestPageIndex={str(num)}&type=recommend_new&rn=1'
    resp = session.get(url=weixin_url, headers=headers)
    print(f'resp:{resp.text}, status_code:{resp.status_code}, num:{num}')
    if resp.status_code == 200:
        resp_json = resp.json()
        url = 'http://localhost:8002/v6/weixinreader'
        resp2 = session.post(url=url, headers=headers, json=resp_json)
        print(f'resp2:{resp2.text}')
        
if __name__=='__main__':
    for item in range(101, 1000, 2):
        method01(item)