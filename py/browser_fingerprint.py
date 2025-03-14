from curl_cffi import requests
import curl_cffi

def method01():
    '''
    浏览器指纹
    '''
    url = 'https://tls.browserleaks.com/json'
    resp = requests.get(url, impersonate='edge99')
    print(f'response:{resp.text}')

def method02():
    '''
    browser fingerprint
    '''
    resp = curl_cffi.get('https://tls.browserleaks.com/json', impersonate='chrome120')
    print(f'response:{resp.text}')


def method03():
    '''
    browser fingerprint
    官网文档中的示例，自定义修改加密套件，去除浏览器特定指纹
    '''
    
    url = "https://tls.browserleaks.com/json"

    okhttp4_android10_ja3 = ",".join(
    [
        "771",
        "4865-4866-4867-49195-49196-52393-49199-49200-52392-49171-49172-156-157-47-53",
        "0-23-65281-10-11-35-16-5-13-51-45-43-21",
        "29-23-24",
        "0",
    ])

    okhttp4_android10_akamai = "4:16777216|16711681|0|m,p,a,s"

    extra_fp = {
        "tls_signature_algorithms": [
            "ecdsa_secp256r1_sha256",
            "rsa_pss_rsae_sha256",
            "rsa_pkcs1_sha256",
            "ecdsa_secp384r1_sha384",
            "rsa_pss_rsae_sha384",
            "rsa_pkcs1_sha384",
            "rsa_pss_rsae_sha512",
            "rsa_pkcs1_sha512",
            "rsa_pkcs1_sha1",
        ]
        # other options:
        # tls_min_version: int = CurlSslVersion.TLSv1_2
        # tls_grease: bool = False
        # tls_permute_extensions: bool = False
        # tls_cert_compression: Literal["zlib", "brotli"] = "brotli"
        # tls_signature_algorithms: Optional[List[str]] = None
        # http2_stream_weight: int = 256
        # http2_stream_exclusive: int = 1

        # See requests/impersonate.py and tests/unittest/test_impersonate.py for more examples
    }


    r = curl_cffi.get(
        url, ja3=okhttp4_android10_ja3, akamai=okhttp4_android10_akamai, extra_fp=extra_fp
    )
    print(f'response:{r.text}')

if __name__ == "__main__":
    # method01()
    method02()
    # method03()
    