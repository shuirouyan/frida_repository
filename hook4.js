

function hook1() {
    let id = Process.id
    console.log(`id:${id}`)

    // let debuggable = Process.isDebuggerAttached()
    // console.log(`debuggable:${debuggable}`)

    let enumerateThreads = Process.enumerateThreads();
    // enumerateThreads.forEach(element => {
    //     console.log(`enumerateThreads:${JSON.stringify(element)}`)
    // });

    let enumerateModules = Process.enumerateModules()
    enumerateModules.forEach(element => {
        if (element.name.indexOf('convertToGcj') != -1)
            console.log(`enumerateModules:${JSON.stringify(element)}`)
        let exName = Module.enumerateExports(element.name)
        exName.forEach(item => {
            // console.log(`so name:${element.name}, exName:${JSON.stringify(item)}`)
            if (item.name.startsWith('Java_com_umeng')) {
                console.log(`so name:${element.name}, exName:${JSON.stringify(item)}`)
            }
        })
    });

    let baseOdex = Process.getModuleByName('base.odex')

    let enumerateSymbols = Module.enumerateExports('libc.so')
    // console.log(`baseOdex:${JSON.stringify(enumerateSymbols)}`)

    let getExportByName = Module.findExportByName('libc.so', 'strlen')
    console.log(getExportByName)
    Interceptor.attach(getExportByName, {
        onEnter(args) {
            // console.log('CCCryptorCreate called from:\n' + '\n');
            console.log("in strlen, arg0=" + Memory.readUtf8String(args[0]));

        }
    });
}

function main() {
    Java.perform(function () {
        hook1();
    })
}

setImmediate(main)
