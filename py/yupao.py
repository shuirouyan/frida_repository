import requests

def pre_method01(phone):
    # url = f"http://localhost:8200/yupao/17767383234?nonce=204560&timestamp=1756889115785"
    url = f"http://localhost:8200/yupao/{phone}"
    resp = requests.get(url=url)
    json_data = resp.json()
    nonce = str(json_data["nonce"])
    timestamp = str(json_data["timestamp"])
    print(f'nonce:{nonce},timestamp:{timestamp},sign:{json_data["sign"]},user-agent:{json_data["user-agent"]},phone:{json_data["phone"]}')
    return json_data


def send_method01(phone):
    pre_data = pre_method01(phone)
    # header = {"Content-Type":"application/json; charset=UTF-8","Host":"yupao-prod.yupaowang.com","advertisingid":"","brand":"OnePlus","business":"YPZP","channel":"yinyongbao","deviceId":"DVrxPK4blp6P1GDmdjRccH2sTqhvjl4OfwWFdKpCmJs=","deviceImei":"","deviceName":"GM1900","encrypted":"1.0","imei":"DVrxPK4blp6P1GDmdjRccH2sTqhvjl4OfwWFdKpCmJs=","model":"GM1900","nonce":"204560","occversion":"2","os":"ANDROID","osVersion":"9","packageName":"io.dcloud.H576E6CC7","packageVersion":"9.12.0","packageVersionCode":"309012021","page_path":"default--OneKeyLoginActivity","referrer_page_path":"default--OneKeyLoginActivity","reqsource":"YPZP","runtime":"ANDROID","runtimeVersion":"9","sdkVersion":"1.0.1","sign":"ca41eb985719f0fdeecc6ee13e76059857f722c181486bf9052efa0a7752b6fc","signVersion":"1","source":"android","timestamp":"1756889115785","token":"","track_seed":"","uid":"","user-agent":"yGQv5+tFWcADa2br+C2tpC89eANbRaMQR6eAOW+168v5NocZ6lb6tR3gwQigU0Kgg4zbvg0NIiSB/5ZadiNtXg==","userrole":""}
    headers = {
        "Content-Type": "application/json; charset=UTF-8",
        "Host": "yupao-prod.yupaowang.com",
        "advertisingid": "",
        "brand": "OnePlus",
        "business": "YPZP",
        "channel": "yinyongbao",
        "deviceId": "DVrxPK4blp6P1GDmdjRccH2sTqhvjl4OfwWFdKpCmJs=",
        "deviceImei": "",
        "deviceName": "GM1900",
        "encrypted": "1.0",
        "imei": "DVrxPK4blp6P1GDmdjRccH2sTqhvjl4OfwWFdKpCmJs=",
        "model": "GM1900",
        "nonce": str(pre_data["nonce"]),
        "occversion": "2",
        "os": "ANDROID",
        "osVersion": "9",
        "packageName": "io.dcloud.H576E6CC7",
        "packageVersion": "9.12.0",
        "packageVersionCode": "309012021",
        "page_path": "default--OneKeyLoginActivity",
        "referrer_page_path": "default--OneKeyLoginActivity",
        "reqsource": "YPZP",
        "runtime": "ANDROID",
        "runtimeVersion": "9",
        "sdkVersion": "1.0.1",
        "sign": pre_data["sign"],
        "signVersion": "1",
        "source": "android",
        "timestamp": str(pre_data['timestamp']),
        "token": "",
        "track_seed": "",
        "uid": "",
        "user-agent": pre_data["user-agent"],
        "userrole": "",
    }
    url = "https://yupao-prod.yupaowang.com/reach/v1/verifyCode/loginIgnore/send"
    data = {"biz": "login", "tel": pre_data['phone']}
    response = requests.post(url=url, headers=headers, json=data)
    print(response.text)


if __name__ == "__main__":
    send_method01('17777777777')
