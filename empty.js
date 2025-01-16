function method01() {
	let process_id=Process.id
	console.log(`process id:${process_id}`)
	
}


function main() {

    Java.perform(function () {
        method01();
    })

}


setImmediate(main)

