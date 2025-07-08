const box = document.createElement("div")
const body = document.querySelector("body")
box.setAttribute("style", "display:flex; flex-wrap:wrap; width:700px;height:700px")
body.appendChild(box)
box.classList.add("box")



let previousnumber = 16;
grid(previousnumber);


const button = Array.from(document.querySelectorAll("button"))
console.log(button)
let choice = '';


let count = 0;
let dict = {};
intialize();

button.forEach((item) => {

    item.addEventListener("click", () => {
        choice = item.getAttribute("class");
        count = 0;
        intialize();



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

    console.log(dict)


    if ((e.target.className.slice(0, 7)) == "gridbox" && (choice == '' || choice == "Bw")) {


        e.target.style.backgroundColor = "black";
    }

    else if (e.target.className.slice(0, 7) == "gridbox" && choice == ("rgb")) {

        e.target.style.backgroundColor = "red";
    }

    else if (e.target.className.slice(0, 7) == "gridbox" && choice == "Eraser") {

        e.target.style.backgroundColor = "White";
    }

    opacity(e);



})


const select = document.querySelector("select");
select.addEventListener("change", () => {
    let selected = select.value;
    grid(+selected);
    intialize();

})










function opacity(e) {

    let a = e.target.className.slice(0,7);
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



function grid(number) {
    let existance = Array.from(document.querySelectorAll(".gridbox"))
    if (existance) {
        existance.forEach((item) => {
            item.remove();
        })
    }

    let calc = 700 / (+number);
    for (i = 1; i <= (number * number); i++) {
        const gridbox = document.createElement("div")
        box.appendChild(gridbox);
        // gridbox.textContent=i;
        gridbox.setAttribute("Style", "border:1px solid black;box-sizing:border-box;flex:0 0 auto;" + "Opacity : 0.2")
        gridbox.style.height = calc + "px"
        gridbox.style.width = calc + "px"
        gridbox.classList.add("gridbox", i)
        previousnumber = number;

    }
}



// FIXING OPACITY PROBLEM
function intialize() {
    const arr = Array.from(document.querySelectorAll(".gridbox"));
    arr.forEach((item) => {
        dict[item.className] = 0;

    })
}