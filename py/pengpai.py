import json, requests

import logging, asyncio

logging.basicConfig(level=logging.INFO)


async def get_home_page():
    url = "https://app.thepaper.cn/api/appHome/homePage"
    payload = {
        "smallTopicsCount": 27,
        "insertFinancial": False,
        "adCount": 29,
        "pageNum": 2,
        "specialCardCount": 30,
        "filterIdArray": [
            "32489612",
            "32209583",
            "32489798",
            "32489636",
            "32489796",
            "32489666",
            "32489889",
            "32489888",
            "32489856",
            "32489887",
            "32488927",
            "32489306",
            "32489658",
            "32488915",
            "32488307",
            "32484819",
        ],
    }

    headers = {
        "User-Agent": "okhttp/3.14.9",
        "wd-version": "11.1.5",
        "wd-version-code": "11150",
        "os": "Android",
        "wd-ua": "Dalvik%2F2.1.0%20%28Linux%3B%20U%3B%20Android%209%3B%20GM1900%20Build%2FPQ3A.190705.11211812%29%20%E6%BE%8E%E6%B9%83%E6%96%B0%E9%97%BB%2F11.1.5",
        "wd-token": "",
        "paper-device-id": "767CDD8237CA74E9201723FC054AB82C",
        "build_id": "2",
        "wd-channel": "yingyb",
        "userid": "",
        "network": "1",
        "sdk_int": "28",
        "gps-location": "",
        "wd-uuid": "767CDD8237CA74E9201723FC054AB82C",
        "osv": "28",
        "wd-system": "9",
        "package_name": "com.wondertek.paper",
        "wd-resolution": "900*1600",
        "paper-client-type": "04",
        "wd-client-type": "04",
        "thepaper-timestamp": "1769675019072",
        "thepaper-sign": "4DA80CE6E07871B8FEF23A1B9C3A105F",
        "piccardmode": "3",
        "wd-version": "11.1.5",
        "content-type": "application/json; charset=utf-8",
    }
    resp = requests.post(url=url, headers=headers, json=payload)
    name_list = []
    contId = {}
    if resp.json() != None:
        datas = resp.json()["data"]["pageInfo"]["list"]
        name_list = [{item["contId"]: item["name"]} for item in datas]
        contId = {"contId": [item["contId"] for item in datas]}
    # logging.info("resp:{}".format(resp.text))
    contId["contId"] = sorted(contId["contId"])
    logging.info("name_list:{},contId:{}".format(name_list, contId))
    return contId


async def get_page_content():
    contId_list = await get_home_page()

    headers = {
        "User-Agent": "okhttp/3.14.9",
        "wd-version": "11.1.5",
        "wd-version-code": "11150",
        "os": "Android",
        "wd-ua": "Dalvik%2F2.1.0%20%28Linux%3B%20U%3B%20Android%209%3B%20GM1900%20Build%2FPQ3A.190705.11211812%29%20%E6%BE%8E%E6%B9%83%E6%96%B0%E9%97%BB%2F11.1.5",
        "wd-token": "",
        "paper-device-id": "767CDD8237CA74E9201723FC054AB82C",
        "build_id": "2",
        "wd-channel": "yingyb",
        "userid": "",
        "network": "1",
        "sdk_int": "28",
        "gps-location": "",
        "wd-uuid": "767CDD8237CA74E9201723FC054AB82C",
        "osv": "28",
        "wd-system": "9",
        "package_name": "com.wondertek.paper",
        "wd-resolution": "900*1600",
        "paper-client-type": "04",
        "wd-client-type": "04",
        "thepaper-timestamp": "1769676083024",
        "thepaper-sign": "22A491E32E28BBA56632C0C3576B148C",
        "piccardmode": "3",
        "wd-version": "11.1.5",
    }
    if contId_list != None:
        for contId in contId_list["contId"]:
            url = (
                f"https://app.thepaper.cn/appapi/contentapi/article/appDetail/{contId}"
            )
            logging.info(f"Requesting content for {contId}, url:{url}")
            # await asyncio.sleep(3)
            resp = requests.get(url=url, headers=headers)
            # logging.info("content response:{}".format(resp.text))
            if resp.json() != None:
                datas = resp.json()["data"]["contentDetail"]["html"]
                logging.info("datas:{}".format(datas))
                local_url = f"http://localhost:8000/v4/save?id={contId}"
                local_result_resp = requests.post(url=local_url, json=datas)
                logging.info(f"local_resp:{local_result_resp}")


async def get_content_one():
    headers = {
        "User-Agent": "okhttp/3.14.9",
        "wd-version": "11.1.5",
        "wd-version-code": "11150",
        "os": "Android",
        "wd-ua": "Dalvik%2F2.1.0%20%28Linux%3B%20U%3B%20Android%209%3B%20GM1900%20Build%2FPQ3A.190705.11211812%29%20%E6%BE%8E%E6%B9%83%E6%96%B0%E9%97%BB%2F11.1.5",
        "wd-token": "",
        "paper-device-id": "767CDD8237CA74E9201723FC054AB82C",
        "build_id": "2",
        "wd-channel": "yingyb",
        "userid": "",
        "network": "1",
        "sdk_int": "28",
        "gps-location": "",
        "wd-uuid": "767CDD8237CA74E9201723FC054AB82C",
        "osv": "28",
        "wd-system": "9",
        "package_name": "com.wondertek.paper",
        "wd-resolution": "900*1600",
        "paper-client-type": "04",
        "wd-client-type": "04",
        "thepaper-timestamp": "1769676083024",
        "thepaper-sign": "22A491E32E28BBA56632C0C3576B148C",
        "piccardmode": "3",
        "wd-version": "11.1.5",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    contId = "32490116"
    url = f"https://app.thepaper.cn/appapi/contentapi/article/appDetail/{contId}"
    proxy_host = "127.0.0.1"
    proxy_port = 10002
    # pip install requests[socks]
    proxies = {
        "http": f"socks5://{proxy_host}:{proxy_port}",
        "https": f"socks5://{proxy_host}:{proxy_port}",
    }
    logging.info(f"Requesting content for {contId}, url:{url}")
    await asyncio.sleep(3)
    resp = requests.get(url=url, headers=headers, proxies=proxies, verify=False)
    logging.info("content response:{}".format(resp.text))


if __name__ == "__main__":
    asyncio.run(get_page_content())
