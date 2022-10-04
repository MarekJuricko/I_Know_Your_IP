//array of objects with messages
let array = [
    {name: "message1", value: "Hello, my name is Marek Juricko"},
    {name: "message2", value: "If you have any job offers for me, let me know ;)"},
    {name: "message3", value: "But this is not important right now, I have something better for discussion"},
    {name: "message4", value: "Much better..... but only if you want of course"},
    {name: "message5", value: "So... I wanted to talk about my hacking skills"},
    {name: "message6", value: "Sorry, I had to remove the text above..."},
    {name: "message7", value: "Okay... the purpose of this project is to get public IP and location of device"},
    {name: "message8", value: "So.. would you like to continue? y/n"},
    {name: "message10", value: "This is cool, isn't it?"},
    {name: "message11", value: "Would you like it more specific? y/n"},
    {name: "message12", value: "So these are current coordinates of the device, which you are using right now"},
    {name: "message13", value: "And that would be all from me :)"},
    {name: "message14", value: "I hope that you liked this project, that I have created..."},
    {name: "message15", value: "Thank you for your attention and co-operation ;)"},
    {name: "message16", value: "Goodbye and have a nice day :D"},
    {name: "message16", value: "PS: look at your location on the map, so you will believe me :D"},
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
    
        array.splice(11,0,{name: "message12",value: 'Your current position is:'});
        array.splice(12,0,{name: "message13",value: `Latitude : ${crd.latitude}`});
        array.splice(13,0,{name: "message14",value: `Longitude: ${crd.longitude}`});
        array.splice(14,0,{name: "message15",value: `More or less ${Math.floor(crd.accuracy)} meters.`});
    });
}

//function which opens window google map with cooderinates of device
function showLocSite(){
    navigator.geolocation.getCurrentPosition((position,options) => {
        options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          };
    
        const crd = position.coords;
    
        window.open(`https://www.google.com/maps/place/${crd.latitude}${crd.longitude}`);
    }); 
}

//function for catching info from the second input
function checkSecondInfo(){
    let inTwo = document.querySelector("#two");
    inTwo.addEventListener("change",function(){
        //if input value has "y" or "Y", showLoc function is called, then messages are generated
        if(inTwo.value === "y" || inTwo.value === "Y"){
            inTwo.setAttribute("disabled", "disabled");           
            showLoc();

            //messages from showLoc function are generated
            generateMessage(11,1000);
            generateMessage(12,6000);
            generateMessage(13,11000);
            generateMessage(14,16000);   

            //final messages for goodbyes are generated
            generateMessage(15,21000);
            generateMessage(16,26000);
            generateMessage(17,31000);
            generateMessage(18,36000); 
            generateMessage(19,41000);
            generateMessage(20,46000);

            //after 51 seconds, the showLocSite function is called
            setTimeout(function(){
                showLocSite();
            }, 51000); 

        //if input value has "n" or "N", lastMessage is written, then after six seconds window closes    
        }else if(inTwo.value === "n" || inTwo.value === "N"){
            inTwo.setAttribute("disabled", "disabled");
            let lastMessage = "Well, if you don't want to allow that... goodbye then";
            write(lastMessage);
            setTimeout(function(){
                window.close();
            }, 6000);
            
        }
    });
}

//function for catching info from the input
function checkInfo(){
    let inOne = document.querySelector("#one");
    inOne.addEventListener("change",function(){
        //if input value has "y" or "Y", messages with IP info are generated
        if(inOne.value === "y" || inOne.value === "Y"){
            inOne.setAttribute("disabled", "disabled"); 
            //messages with IP info          
            generateMessage(8,1000);
            generateMessage(9,6000);
            generateMessage(10, 11000);

            //after 16 seconds, new input is created and new function for catching info is called
            setTimeout(function(){
                writeInput("two");
                checkSecondInfo();
            }, 16000);

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
