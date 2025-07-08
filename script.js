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



button.forEach((item) => {

    item.addEventListener("click", () => {
        choice = item.getAttribute("class");



        button.forEach((item) => {


            if (choice == item.getAttribute("class")) {
                item.classList.add("focusbutton")

            }
            else item.classList.remove("focusbutton")

        })
    })
})




box.addEventListener("mouseover", (e) => {
    
    if (e.target.className == "gridbox" && (choice == '' || choice == "Bw")) {

        
        e.target.style.backgroundColor = "black";
    }

    else if (e.target.className == "gridbox" && choice == ("rgb")) {
        
        e.target.style.backgroundColor = "red";
    }

    else if (e.target.className == "gridbox" && choice == "Eraser") {
        
        e.target.style.backgroundColor = "White";
    }

    opacity(e);



})


const select = document.querySelector("select");
select.addEventListener("change", () => {
    let selected = select.value;
    grid(+selected);

})










function opacity(e) {
    if(e.target.className == "gridbox"){
    let Ref = e.target
    let prevstyle = Ref.getAttribute("Style")
   


    let OpacityString = prevstyle.split(";").find((item) => {
        return item.trim()[0] == "o"
    })
    let CurrentValue = +OpacityString.split(":")[1]

    let Op = CurrentValue + 0.2;
    e.target.style.opacity = Op;}
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
        gridbox.classList.add("gridbox")
        previousnumber = number;

    }
}