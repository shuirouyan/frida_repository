import base64

def bytes_to_str(b):
    print(f'type:{type(b)}')
    return base64.b64encode(b).decode('utf-8')

if __name__ == '__main__':
    str=bytes_to_str(b'hello world')
    print(f'str:{str}')