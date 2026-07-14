const daysContainer = document.getElementById("days");
const title = document.getElementById("title");

const prev = document.getElementById("prev");
const next = document.getElementById("next");
const todayBtn = document.getElementById("today");


let date = new Date();


const months = [

"January",
"February",
"March",
"April",
"May",
"June",
"July",
"August",
"September",
"October",
"November",
"December"

];


function renderCalendar(){


    daysContainer.innerHTML = "";


    let year = date.getFullYear();

    let month = date.getMonth();



    title.innerHTML =
    "AP Calendar - " +
    months[month] +
    " " +
    year;



    // اولین روز ماه
    let firstDay =
    new Date(year,month,1).getDay();



    // تعداد روزهای ماه
    let lastDate =
    new Date(year,month + 1,0).getDate();



    // خانه های خالی اول ماه

    for(let i=0;i<firstDay;i++){

        let empty =
        document.createElement("div");

        empty.classList.add("empty");

        daysContainer.appendChild(empty);

    }



    // ساخت روزها

    for(let i=1;i<=lastDate;i++){


        let day =
        document.createElement("div");


        day.innerHTML=i;



        let current =
        new Date();



        if(

        i === current.getDate() &&
        month === current.getMonth() &&
        year === current.getFullYear()

        ){

            day.classList.add("today");

        }



        daysContainer.appendChild(day);


    }


}




prev.onclick=function(){

    date.setMonth(
        date.getMonth()-1
    );

    renderCalendar();

};



next.onclick=function(){

    date.setMonth(
        date.getMonth()+1
    );

    renderCalendar();

};



todayBtn.onclick=function(){

    date=new Date();

    renderCalendar();

};



renderCalendar();