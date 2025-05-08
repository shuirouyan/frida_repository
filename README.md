## Custom Frida Hook 
1. hooking android app
2. hook[number].js文件是frida hook的脚本，这些是自定义的脚本，包括查找so文件中的函数地址
3. hook19.js是hook 3dbody的脚本
    - hook后，请求接口看到的响应数据在data里面的加密字符串，需要使用解密接口，解密接口已经自定义一个Java工程
    - Java工程地址在GitHub上，[地址](https://github.com/shuirouyan/decrypt-string),工程是**私有的(private)** 
4. empty.js是frida脚本模板
5. py文件夹是python脚本，用于发送请求，获取响应数据，解密数据，还有frida rpc相关信息
6. find_RegisterNatives.js是查找so函数地址的脚本
7. hook_linker.js是so文件连接的脚本
8. log文件夹是存放python脚本运行过程中存放的文件(日志,图片,数据文件)