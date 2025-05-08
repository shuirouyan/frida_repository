import requests, json, os
from urllib.parse import urlparse

def req_data(page, catogory):
    url = f'https://www.3dbody.com/api/resource/list?size=20&page={page}&keyword&categoryId={catogory}'
    headers = {
            "User-Agent": "okhttp/3.14.9",
            "Connection": "keep-alive",
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "authorization": "Bearer",
            "platformapp": "android",
            "devicetype": "android",
            "versioncode": "8843",
            "devicemodel": "app-28-OnePlus-GM1900-ISX5:false",
            "deviceid": "8b3afab8f3f61a136b74b11d64dac8c9",
            "platform": "app",
            "versionname": "8.8.43"
    }
    resp = requests.get(url=url, headers=headers)
    # print(resp.json()['data'])
    if resp.status_code == 200:
        # print(resp.json()['data'])
        local_url = 'http://localhost:8200/third/body/parse'
        data = {
            'content': resp.json()['data']
        }
        local_resp = requests.post(url=local_url, json=data, headers=headers)
        # print(local_resp.json())
        if local_resp.status_code == 200:
            local_json_handler = local_resp.json()
            list_arr = local_json_handler['list']
            for item in list_arr:
                title = item['title'].replace('/', '')
                image = json.loads(item['image'])['url']
                print(title, image)
                image_resp = requests.get(url=image, stream=True)
                if image_resp.status_code == 200:
                    if not os.path.exists('log/pic'):
                        os.makedirs('log/pic')  
                    with open(f'log/pic/{title}.jpg', 'wb') as f:
                        # f.write(image)
                        for chunk in image_resp.iter_content(chunk_size=1024):
                            if chunk:
                                f.write(chunk)
    else:
        print('请求失败')

def hanlder_data(page, catogory):
    url = f'https://www.3dbody.com/api/resource/list?size=20&page={page}&keyword&categoryId={catogory}'
    headers = {
            "User-Agent": "okhttp/3.14.9",
            "Connection": "keep-alive",
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "authorization": "Bearer",
            "platformapp": "android",
            "devicetype": "android",
            "versioncode": "8843",
            "devicemodel": "app-28-OnePlus-GM1900-ISX5:false",
            "deviceid": "8b3afab8f3f61a136b74b11d64dac8c9",
            "platform": "app",
            "versionname": "8.8.43"
    }
    resp = requests.get(url=url, headers=headers)
    # print(resp.json()['data'])
    if resp.status_code == 200:
        # print(resp.json()['data'])
        local_url = 'http://localhost:8200/third/body/parse'
        data = {
            'content': resp.json()['data']
        }
        local_resp = requests.post(url=local_url, json=data, headers=headers)
        # print(local_resp.json())
        if local_resp.status_code == 200:
            local_json_handler = local_resp.json()
            list_arr = local_json_handler['list']
            for item in list_arr:
                title = item['title'].replace('/', '')
                image = json.loads(item['image'])['file']
                # image = item['file']
                if not str(image).startswith('http'):
                    parse_url_info = urlparse(resp.request.url)
                    image = f'{parse_url_info.scheme}://{parse_url_info.netloc}' + image
                print(title, image)




def hanlder_data_save(page, catogory):
    '''
    首页列表中的数据
    '''
    url = f'https://www.3dbody.com/api/resource/list?size=20&page={page}&keyword&categoryId={catogory}'
    headers = {
            "User-Agent": "okhttp/3.14.9",
            "Connection": "keep-alive",
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "authorization": "Bearer",
            "platformapp": "android",
            "devicetype": "android",
            "versioncode": "8843",
            "devicemodel": "app-28-OnePlus-GM1900-ISX5:false",
            "deviceid": "8b3afab8f3f61a136b74b11d64dac8c9",
            "platform": "app",
            "versionname": "8.8.43"
    }
    resp = requests.get(url=url, headers=headers)
    # print(resp.json()['data'])
    if resp.status_code == 200:
        # print(resp.json()['data'])
        local_url = 'http://localhost:8200/third/body/parse'
        data = {
            'content': resp.json()['data']
        }
        local_resp = requests.post(url=local_url, json=data, headers=headers)
        # print(local_resp.json())
        if local_resp.status_code == 200:
            local_json_handler = local_resp.json()
            list_arr = local_json_handler['list']
            for item in list_arr:
                title = item['title'].replace('/', '')
                image = json.loads(item['image'])['file']
                # image = item['file']
                if not str(image).startswith('http'):
                    parse_url_info = urlparse(resp.request.url)
                    image = f'{parse_url_info.scheme}://{parse_url_info.netloc}' + image
                print(title, image)
                image_resp = requests.get(url=image, stream=True)
                if image_resp.status_code == 200:
                    directory = f'log/pic/'
                    if not os.path.exists(directory):
                        os.makedirs(directory)  
                    with open(f'{directory}{title}.jpg', 'wb') as f:
                        # f.write(image)
                        for chunk in image_resp.iter_content(chunk_size=1024):
                            if chunk:
                                f.write(chunk)
    else:
        print('请求失败')


def handler_data_illness(page):
    url = f'https://www.3dbody.com/api/illness/list?size=20&tab=1&page={page}&keyword&categorySecondId'
    headers = {
            "User-Agent": "okhttp/3.14.9",
            "Connection": "keep-alive",
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "authorization": "Bearer",
            "platformapp": "android",
            "devicetype": "android",
            "versioncode": "8843",
            "devicemodel": "app-28-OnePlus-GM1900-ISX5:false",
            "deviceid": "8b3afab8f3f61a136b74b11d64dac8c9",
            "platform": "app",
            "versionname": "8.8.43"
    }
    resp = requests.get(url=url, headers=headers)
    # print(resp.json()['data'])
    if resp.status_code == 200:
        # print(resp.json()['data'])
        local_url = 'http://localhost:8200/third/body/parse'
        data = {
            'content': resp.json()['data']
        }
        local_resp = requests.post(url=local_url, json=data, headers=headers)
        print(local_resp.json())
        if local_resp.status_code == 200:
            local_json_handler = local_resp.json()
            list_arr = local_json_handler['list']
            for item in list_arr:
                title = item['cnTitle'].replace('/', '').replace('*', '').replace('<', '').replace('>', '')
                image = json.loads(item['photo'])['file']
                # image = item['file']
                if not str(image).startswith('http'):
                    parse_url_info = urlparse(resp.request.url)
                    image = f'{parse_url_info.scheme}://{parse_url_info.netloc}' + image
                print(title, image)
                image_resp = requests.get(url=image, stream=True, headers=headers)
                if image_resp.status_code == 200:
                    directory = f'log/pic2/'
                    if not os.path.exists(directory):
                        os.makedirs(directory)  
                    with open(f'{directory}{title}.jpg', 'wb') as f:
                        # f.write(image)
                        for chunk in image_resp.iter_content(chunk_size=1024):
                            if chunk:
                                f.write(chunk)
    else:
        print('请求失败')


if __name__ == '__main__':
    # list_arr = [10555, 11211, 10456,10457,10458,
    #             10538, 10539, 11259, 11260, 11261, 
    #             11262, 11263, 11264, 11265, 11266]
    # for index,value in enumerate(list_arr):
    #     hanlder_data_save(1, value)

    for i in range(147, 382):
        handler_data_illness(i)