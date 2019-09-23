/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "242px";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "-8px";
} 

// ASCII only
function bytesToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
}

// ASCII only
function stringToBytes(string) {
    var array = new Uint8Array(string.length);
    for (var i = 0, l = string.length; i < l; i++) {
        array[i] = string.charCodeAt(i);
    }
    return array.buffer;
}



//the bluefruit UART Service
var blue ={
	serviceUUID: '6e400001-b5a3-f393-e0a9-e50e24dcca9e',
    txCharacteristic: '6e400002-b5a3-f393-e0a9-e50e24dcca9e', // transmit is from the phone's perspective
    rxCharacteristic: '6e400003-b5a3-f393-e0a9-e50e24dcca9e'  // receive is from the phone's perspective
}

var ConnDeviceId;
var bleDeviceName;
var deviceList =[];

setTimeout("window.location.reload();",5000); //reload siden hvert 20. sekund. Dermed genindlæses Bluetooth-liste

function onLoad(){
	document.addEventListener('deviceready', onDeviceReady, false);
    bleDeviceList.addEventListener('touchstart', conn, false); // assume not scrolling
}

function onDeviceReady(){
	refreshDeviceList();
}

	 
function refreshDeviceList(){
	//deviceList =[];
	document.getElementById("bleDeviceList").innerHTML = ''; // empties the list
	if (cordova.platformId === 'android') { // Android filtering is broken
		ble.scan([], 5, insertText, onError);
	} else {
		//alert("Disconnected");
		ble.scan([blue.serviceUUID], 5, insertText, onError);
	}
}

function onDiscoverDevice(device){
	//Make a list in html and show devises
    if(device.name == "Elektronik" && device.name == "Have"){
		var listItem = document.createElement('li'),
		html = device.name+ "," + device.id;
		listItem.innerHTML = html;
		document.getElementById("bleDeviceList").appendChild(listItem);
	} else if(device.name == "Elektronik" || device.name == "Have"){
		var listItem = document.createElement('li'),
		html = device.name+ "," + device.id;
		listItem.innerHTML = html;
		document.getElementById("bleDeviceList").appendChild(listItem);
	} else {
        var listItem = document.createElement('li'),
		html = "test";
		listItem.innerHTML = html;
		document.getElementById("bleDeviceList").appendChild(listItem);
    }
}



function conn(){
	var  deviceTouch= event.srcElement.innerHTML;
	document.getElementById("debugDiv").innerHTML =""; // empty debugDiv
	var deviceTouchArr = deviceTouch.split(",");
	ConnDeviceId = deviceTouchArr[1];
	bleDeviceName = deviceTouchArr[0];
	document.getElementById("debugDiv").innerHTML += "<br>Debug: <br>"+deviceTouchArr[0]+"<br>"+deviceTouchArr[1]; //for debug:
 }

function onError(reason)  {
	alert("ERROR: " + reason); // real apps should use notification.alert
}