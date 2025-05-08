## Custom Frida Hook 
1. hooking android app
2. hook[number].js文件是frida hook的脚本
3. hook19.js是hook 3dbody的脚本
    - hook后，请求接口看到的响应数据在data里面的加密字符串，需要使用解密接口，解密接口已经自定义一个Java工程
    - Java工程地址在GitHub上，[地址](https://github.com/shuirouyan/decrypt-string),工程是**私有的(private)** 