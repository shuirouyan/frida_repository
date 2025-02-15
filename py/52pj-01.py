from struct import *
from base64 import *
def shift(z, y, x, k, p, e):
    return ((((z >> 5) ^ (y << 2)) + ((y >> 3) ^ (z << 4))) ^ ((x ^ y) + (k[(p & 3) ^ e] ^ z)))
def encrypt(v, k):
    delta = 0x9E3779B9
    n = len(v)
    rounds = 6 + 52 // n
    x = 0
    z = v[n - 1]
    for i in range(rounds):
        x = (x + delta) & 0xFFFFFFFF
        e = (x >> 2) & 3
        for p in range(n - 1):
            y = v[p + 1]
            v[p] = (v[p] + shift(z, y, x, k, p, e)) & 0xFFFFFFFF
            z = v[p]
        p += 1
        y = v[0]
        v[n - 1] = (v[n - 1] + shift(z, y, x, k, p, e)) & 0xFFFFFFFF
        z = v[n - 1]
    return v
def decrypt(v, k):
    delta = 0x9E3779B9
    n = len(v)
    rounds = 6 + 52 // n
    x = (rounds * delta) & 0xFFFFFFFF
    y = v[0]
    for i in range(rounds):
        e = (x >> 2) & 3
        for p in range(n - 1, 0, -1):
            z = v[p - 1]
            v[p] = (v[p] - shift(z, y, x, k, p, e)) & 0xFFFFFFFF
            y = v[p]
        p -= 1
        z = v[n - 1]
        v[0] = (v[0] - shift(z, y, x, k, p, e)) & 0xFFFFFFFF
        y = v[0]
        x = (x - delta) & 0xFFFFFFFF
    return v

if __name__ == '__main__':
    key = list(unpack("<4I",b"my-xxtea-secret\x00"))
    enc = b64decode(b"hjyaQ8jNSdp+mZic7Kdtyw==")
    # print(len(enc))
    enc = list(unpack(f"<{len(enc)//4}I",enc))
    # print(enc)
    pt = decrypt(enc,key)
    s = b''
    for i in range(len(pt)):
        s+=pack("<I",pt[i])
    print(s.decode())