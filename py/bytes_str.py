import base64

import time
import json

def bytes_to_str(b):
    print(f'type:{type(b)}')
    return base64.b64encode(b).decode('utf-8')

def read_unicode_method():
    with open("D:\\temp\json\lianjia.json", 'r', encoding='utf-8') as f:
        str_json = f.read()
        print(f'str:{json.loads(str_json)}')
        with open('D:\\temp\json\lianjia1.json', 'w', encoding='utf-8') as f:
            f.write(json.dumps(json.loads(str_json), ensure_ascii=False))
if __name__ == '__main__':
    str=bytes_to_str(b'hello world')
    print(f'str:{str}')
    print(f'datatime:{int(time.time() * 1000)}')
    read_unicode_method()