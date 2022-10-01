//array of objects with messages
let array = [
    {name: "message1", value: "Hello, my name is MarekJuricko"},
    {name: "message2", value: "If you have any job offers for me, let me know ;)"},
    {name: "message3", value: "But this is not important right now, I have something better for discussion"},
    {name: "message4", value: "Much better..... but only if you want of course"},
    {name: "message5", value: "So... I wanted to talk about my hacking skills"},
    {name: "message6", value: "Sorry, I had to remove the text above..."},
    {name: "message7", value: "I don't like reading a lot of text, only the documentation :D"},
    {name: "message8", value: "So.. would you like to continue? y/n"},
    {name: "message10", value: "This is cool, isn't it?"},
];

//calling function for IP
getInfo();

//function for getting public IP via API
async function getInfo(){
    let IP = await (await fetch("https://api.ipify.org/?format=json")).json();

    let myIP = IP.ip;

    array.splice(8,0,{name: "message9", value: `Your IP adress is: ${myIP}`});
}

//function for generating message
function write(x){
    //creating div, adding class attribute
    let line = document.createElement("div");
    line.setAttribute("class", "divny");

    //creating system text, adding class attribute, innerHTML and then it is appended to the div
    let system = document.createElement("p");
    system.setAttribute("class","system");
    system.innerHTML = "C:/Windows/System64>";
    line.appendChild(system);

    //after one second, the text element is created, added class attribute, id attribute, innerHTML and appended to the div
    setTimeout(function() {
        let message = document.createElement("p");
        message.setAttribute("class","typing-demo");
        message.setAttribute("id","typeAnimation");
        message.style.width = `${x.length}ch`;
        message.innerHTML = x;
        //after four seconds, the blink animation is removed by removing id attribute
        line.appendChild(message);
        setTimeout(function(){
            message.removeAttribute("id");
        }, 4000);
    }, 1000);

    //div is appended to the body of the document
    document.body.appendChild(line);

    //space between each message is created
    let space = document.createElement("br");
    document.body.appendChild(space);   
}

//function for creating input element
function writeInput(x){
    //creating div, adding class attribute
    let line = document.createElement("div");
    line.setAttribute("class", "divny");

    //creating system text, adding class attribute, innerHTML and then it is appended to the div
    let system = document.createElement("p");
    system.setAttribute("class","system");
    system.innerHTML = "C:/Windows/System64>";
    line.appendChild(system);

    //after one second, the text input is created, added type attribute, class attribute and appended to the div
    let input = document.createElement("INPUT");
    input.setAttribute("type","text");
    input.setAttribute("id", x);
    input.setAttribute("class","inputText");
    line.appendChild(input);
    

    //div is appended to the body of the document
    document.body.appendChild(line);

    //focus is added on the input
    document.getElementById(x).focus();

    //space between each message is created
    let space = document.createElement("br");
    document.body.appendChild(space);   
}

//refactored function for generating messages, so we don´t have to write it over and over
function generateMessage(messagePosition,time){
    setTimeout(function() {
        write(array[messagePosition].value); 
    }, time); 
}

//refactored function for removing messages
function clearSite(amount, time){
    setTimeout(function() {
        for(let i = 0; i < amount; i++){
            line = document.querySelector(".divny").remove();   
            spaces = document.querySelector("br").remove();   
        }
    }, time);
}


//function showLoc returns coordinates (latitude and longitude) of user's position, then the information is sent to array
function showLoc(){
    navigator.geolocation.getCurrentPosition((position,options) => {
        options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          };
    
        const crd = position.coords;
    
        //window.open(`https://www.google.com/maps/place/${crd.latitude}${crd.longitude}`);
    
        array.splice(9,0,{name: "message11",value: 'Your current position is:'});
        array.splice(10,0,{name: "message12",value: `Latitude : ${crd.latitude}`});
        array.splice(11,0,{name: "message13",value: `Longitude: ${crd.longitude}`});
        array.splice(12,0,{name: "message14",value: `More or less ${Math.floor(crd.accuracy)} meters.`});
    });
}

//function for catching info from the input
function checkInfo(){
    let inOne = document.querySelector("#one");
    inOne.addEventListener("change",function(){
        //if input value has "y" or "Y", showLoc function is called, then messages are generated
        if(inOne.value === "y" || inOne.value === "Y"){
            inOne.setAttribute("disabled", "disabled");
            showLoc();

            generateMessage(8,1000);
            generateMessage(9,6000);
            generateMessage(10,11000);
            generateMessage(11,16000);
            generateMessage(12,21000);
            generateMessage(13,26000);

        //if input value has "n" or "N", lastMessage is written, then after six seconds window closes    
        }else if(inOne.value === "n" || inOne.value === "N"){
            inOne.setAttribute("disabled", "disabled");
            let lastMessage = "Well, if you don't want to allow that... goodbye then";
            write(lastMessage);
            setTimeout(function(){
                window.close();
            }, 6000);
            
        }
    });
}

generateMessage(0,1000);
generateMessage(1,6000);
generateMessage(2,11000);
generateMessage(3,16000);
generateMessage(4,21000);

clearSite(5, 27000);

generateMessage(5,27000);
generateMessage(6,32000);
generateMessage(7,37000);

setTimeout(function(){
    writeInput("one");
    checkInfo();
}, 42000); 



