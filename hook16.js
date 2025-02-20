/**
 * Intercepts and logs calls to the `db` method of the `com.zj.wuaipojie2025.TO$Companion` Java class.
 * This function modifies the behavior of the `db` method to print the input value and return value to the console.
 * It also logs the current process ID for reference.
 * 
 * @function method01
 * @returns {void}
 */
function method01() {
    let process_id = Process.id
    console.log(`process id:${process_id}`)
    let Companion = Java.use("com.zj.wuaipojie2025.TO$Companion");
    Companion["db"].implementation = function (value) {
        console.log('db is called' + ', ' + 'value: ' + value);
        let ret = this.db(value);
        console.log('db ret value is ' + ret);
        return ret;
    };

    Java.choose('com.zj.wuaipojie2025.TO$Companion', {
        onMatch: function (instance) {
            /* 找到实例时的操作 */
            console.log(`instance:${instance}`)
            // cYoiUd2BfEDc/V9e4LdciBz9Mzwzs3yr0kgrLA==
            // 2hyWtSLN69+QWLHQ
            let res = instance.db('2hyWtSLN69+QWLHQ')
            let re = instance.db('hjyaQ8jNSdp+mZic7Kdtyw==')
            console.log(`==========>result:${res}${re}`)
        },
        onComplete: function () {
            /* 完成时的操作 */
            console.log(`onComplete:${new Date()}`)
        }
    })
    // Java.choose('com.zj.wuaipojie2025.T', {
    //     onMatch: function (instance) {
    //         /* 找到实例时的操作 */
    //         console.log(`instance:${instance}`)
    //         const str = "my-xxtea-secret";
    //         const length = Memory.alloc(Process.pointerSize);
    //         const buffer = Memory.allocUtf8String(str);
    //         Memory.writeUInt(ptr(length), buffer.readUtf8String().length);

    //         const byteArray = [];
    //         for (let i = 0; i < Memory.readUInt(length); i++) {
    //             byteArray.push(buffer.add(i).readU8());
    //         }

    //         const uint8Array = new Uint8Array(byteArray);


    //         // Base64 字符表
    //         const base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    //         // 自定义 Base64 解码函数
    //         function base64Decode(base64Str) {
    //             const output = [];
    //             let input = base64Str.replace(/=+$/, '');
    //             for (let i = 0; i < input.length; i += 4) {
    //                 const enc1 = base64Chars.indexOf(input[i]);
    //                 const enc2 = base64Chars.indexOf(input[i + 1]);
    //                 const enc3 = base64Chars.indexOf(input[i + 2]);
    //                 const enc4 = base64Chars.indexOf(input[i + 3]);

    //                 const chr1 = (enc1 << 2) | (enc2 >> 4);
    //                 const chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    //                 const chr3 = ((enc3 & 3) << 6) | enc4;

    //                 output.push(chr1);
    //                 if (enc3 !== -1) {
    //                     output.push(chr2);
    //                 }
    //                 if (enc4 !== -1) {
    //                     output.push(chr3);
    //                 }
    //             }
    //             return new Uint8Array(output);
    //         }

    //         // 要解码的 Base64 字符串
    //         const base64Str = "cYoiUd2BfEDc/V9e4LdciBz9Mzwzs3yr0kgrLA==";

    //         // 进行解码
    //         const decodedByteArray = base64Decode(base64Str);

    //         // 打印解码后的字节数组
    //         console.log("解码后的字节数组:");
    //         for (let i = 0; i < decodedByteArray.length; i++) {
    //             console.log(`索引 ${i}: ${decodedByteArray[i]}`);
    //         }

    //         // 打印字节数组
    //         console.log("转换后的字节数组:");
    //         for (let i = 0; i < uint8Array.length; i++) {
    //             console.log(`索引 ${i}: ${uint8Array[i]}`);
    //         }
    //         let re = instance.de(decodedByteArray, uint8Array)
    //         console.log(`==========>result:${re}`)


    //     },
    //     onComplete: function () {
    //         /* 完成时的操作 */
    //         console.log(`onComplete:${new Date()}`)
    //     }
    // })

    Java.scheduleOnMainThread(function () {
        console.log(`onComplete:${new Date()}`)
    })
    
}


function main() {

    Java.perform(function () {
        method01();
    })

}


setImmediate(main)

