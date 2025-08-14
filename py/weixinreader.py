import requests
import os

def req_weixin():
    url = 'https://i.weread.qq.com/market/category?count=1000&rank=1&categoryId=hot_search&maxIdx=0'
    headers = {
        "User-Agent": "WeRead/9.3.0 WRBrand/oneplus Dalvik/2.1.0 (Linux; U; Android 9; GM1900 Build/PQ3A.190705.11211812)",
        "Connection": "keep-alive",
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "accessToken": "HXpGztS5",
        "vid": "171959952",
        "baseapi": "28",
        "appver": "9.3.0.10165974",
        "osver": "9",
        "channelId": "11",
        "basever": "9.3.0.10165973"
    }
    res = requests.get(url, headers=headers).json()
    # print(res.json())
    for item in res['books']:
        # print(f'tpe:{type(item)}')
        bookinfo = item['bookInfo']
        title = bookinfo['title']
        author = bookinfo['author']
        cover = bookinfo['cover']
        print(f'书名:{title}, 作者：{author}, 图片封面:{cover} ')
        directory = f'log/pic2/'
        if not os.path.exists(directory):
            os.makedirs(directory)  
        image_resp = requests.get(url=cover, stream=True, headers=headers)
        with open(f'{directory}{title}.jpg', 'wb') as f:
            for chunk in image_resp.iter_content(chunk_size=1024):
                if chunk:
                    f.write(chunk)        

if __name__ == '__main__':
    req_weixin()