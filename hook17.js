/**
 * Intercepts and logs method calls for specific classes in the application.
 * 
 * This function hooks into the methods of the classes `a.a` and 
 * `com.zj.wuaipojie2025_game.ui.BattleActivityKt`, allowing for 
 * logging of parameters and return values. It also uses `Java.choose` 
 * to find instances of `BattleActivityKt$BattleScreen$1$7$1` and logs 
 * their labels.
 * 
 * @function method01
 * @returns {void}
 */
function method01() {
    let process_id = Process.id
    console.log(`process id:${process_id}`)
    let AbstractC0135a = Java.use("a.a");
    AbstractC0135a["a"].implementation = function (componentActivity, eVar) {
        console.log('a is called' + ', ' + 'componentActivity: ' + componentActivity + ', ' + 'eVar: ' + eVar);
        let ret = this.a(componentActivity, eVar);
        console.log('a ret value is ' + ret);
        return ret;
    };

    let BattleActivityKt = Java.use("com.zj.wuaipojie2025_game.ui.BattleActivityKt");
    // BattleActivityKt["updateResult$lambda$1"].implementation = function (battleActivity, str) {
    //     console.log('updateResult$lambda$1 is called' + ', ' + 'battleActivity: ' + battleActivity + ', ' + 'str: ' + str);
    //     let ret = this.updateResult$lambda$1(battleActivity, str);
    //     console.log('updateResult$lambda$1 ret value is ' + ret);
    //     return ret;
    // };

    var act = Java.use('com.zj.wuaipojie2025_game.ui.BattleActivityKt$BattleScreen$1$7$1')
    act.invokeSuspend.implementation = function (args) {
        console.log(`invokeSuspend args:${args}`)
        let result = this.invokeSuspend(args)
        console.log(`invokeSuspend result:${result}`)
        return result
    }
    let instanceGlobal;
    Java.choose('com.zj.wuaipojie2025_game.ui.BattleActivityKt$BattleScreen$1$7$1', {
        onMatch: function (instance) {
            console.log(`instance:${instance.label.value}`)
            let delegate = instance.$playerHp$delegate
            console.log(`delegate:${delegate}`)
            instanceGlobal = instance
        }, onComplete() {
            // console.log(`onComplete:${new Date()}`)
            if (instanceGlobal) {
                console.log(`instanceGlobal.I$0.value:${instanceGlobal.I$0.value}, instanceGlobal.I$1.value:${instanceGlobal.I$1.value}, label:${instanceGlobal.label.value}`)
                instanceGlobal.I$1.value = 3
            }
        }
    })

    // Context 获取及调用
    let MainActivity = Java.use('com.zj.wuaipojie2025_game.MainActivity')
    let ActivityThread = Java.use('android.app.ActivityThread')
    let application = ActivityThread.currentApplication();
    let context = application.getApplicationContext();
    console.log(`context:${context}`)
    let intentW = Java.use('android.content.Intent')
    Java.scheduleOnMainThread(function () {
        console.log(`onComplete:${new Date()}`)
        let intent = intentW.$new(context, MainActivity.$new().getClass());
        // android.content.Intent.FLAG_ACTIVITY_NEW_TASK = 0x10000000
        intent.setFlags(0x10000000);
        context.startActivity(intent);
        console.log(`intent:${intent}`)
    })
}


function main() {

    Java.perform(function () {
        method01();
    })

}


setImmediate(main)

