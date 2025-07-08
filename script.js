// DOM MANIPULATION FOR BASIC STRUCTURE
const box = document.createElement("div")
const body = document.querySelector("body")
box.setAttribute("style", "display:flex; flex-wrap:wrap; width:500px ; height:500px")
body.appendChild(box)
box.classList.add("box")


// DEFAULT GRID
let previousnumber = 16;
grid(previousnumber);

// COMMON VARIABLES TO BE USED BY VARIOUS FUNCTIONS
let choice = '';
let count = 0;
let dict = {};//KEEPS THE COUNT OF MOUSEOVERS PER GRIDBOX
const button = Array.from(document.querySelectorAll("button"))


intialize();

button.forEach((item) => {

    item.addEventListener("click", () => {
        choice = item.getAttribute("class");
        // count = 0;
        intialize();


        if (choice == "reset") {
            // let no = select.value || 16;

            // grid(+no);
            location.reload(); //RELOADS THE PAGE [BETTER WAY TO RESET]
        }


        //HIGHLIGHTS THE MODE IN ACTION
        button.forEach((item) => {


            if (choice == item.getAttribute("class")) {
                item.classList.add("focusbutton")

            }
            else item.classList.remove("focusbutton")

        })


    })
})




box.addEventListener("mouseover", (e) => {

    dict[e.target.className]++
    console.log(dict) //PRINTS THE OBJECT FOR DUBBUGING REASONS


    //SWITCH CASE NEEDED AN EXPRESSION, we are using a variable to compare "choice"

    if ((e.target.className.slice(0, 7)) == "gridbox" && (choice == '' || choice == "Bw")) {
        e.target.style.backgroundColor = "black";
    }
    else if (e.target.className.slice(0, 7) == "gridbox" && choice == ("rgb")) {
        let red = Math.floor(Math.random() * 256);
        let blue = Math.floor(Math.random() * 256);
        let green = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${red},${blue},${green})`;
    }
    else if (e.target.className.slice(0, 7) == "gridbox" && choice == "Eraser") {
        e.target.style.backgroundColor = "White";
    }

    opacity(e);
})

//Handles Drop down menu for sizes
const select = document.querySelector("select");
select.addEventListener("change", () => {
    if (select.value == 'custom') {
        document.querySelector(".custom").classList.remove("custom")

    }
    else { document.querySelector(".select").classList.add("custom") }
    let selected = select.value;

    grid(+selected);
    intialize();

})


//handles the input value in case of custom size
document.querySelector(".input").addEventListener("click", () => {
    const input = document.querySelector("input")
    console.log(input.value);
    let givennumber = +input.value;
    givennumber > 50 ? alert("This is too large, it may cause lags") : 1
    grid(givennumber);
    intialize()

})




//*******FUNCTIONS DECLARATION CORNER *******



//HANDLES THE OPACITY, Makes the opaccity=1 in exactly 5 steps,resets when mode changes
function opacity(e) {

    let a = e.target.className.slice(0, 7);
    if (a == "gridbox") {



        let Ref = e.target
        let prevstyle = Ref.getAttribute("Style")



        let OpacityString = prevstyle.split(";").find((item) => {
            return item.trim()[0] == "o"
        })

        let correction = dict[e.target.className] == 1 ? -(OpacityString.split(":")[1]) : 0;
        let CurrentValue = +OpacityString.split(":")[1] + correction;

        let Op = CurrentValue + 0.2;
        e.target.style.opacity = Op;
    }
}


//GENERATE A GRID ON THE DRAWING BOX
function grid(number) {
    let existance = Array.from(document.querySelectorAll(".gridbox"))
    if (existance) {
        existance.forEach((item) => {
            item.remove();
        })
    }

    let calc = 500 / (+number);
    for (i = 1; i <= (number * number); i++) {
        const gridbox = document.createElement("div")
        box.appendChild(gridbox);
        // gridbox.textContent=i;
        gridbox.setAttribute("Style", "border:0.5px solid black;box-sizing:border-box;flex:0 0 auto;" + "Opacity : 0.2")
        gridbox.style.height = calc + "px"
        gridbox.style.width = calc + "px"
        gridbox.classList.add("gridbox", i)
        previousnumber = number;

    }
}



// FIXING OPACITY PROBLEM, HELPS IN REINIITIALIZING OF OPACITY PROPERTY
// //INITIALIZE THE HOVER COUNT STORED IN DICT [HELPS IN OPACITY PROPERTY RESET]
function intialize() {
    const arr = Array.from(document.querySelectorAll(".gridbox"));
    arr.forEach((item) => {
        dict[item.className] = 0;

    })
}