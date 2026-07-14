// AP Shamsi Calendar
// Part 1/4


const daysContainer = document.getElementById("days");
const title = document.getElementById("title");

const prev = document.getElementById("prev");
const next = document.getElementById("next");
const todayBtn = document.getElementById("today");



const shamsiMonths = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند"
];



const weekDays = [
    "شنبه",
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنجشنبه",
    "جمعه"
];



// تاریخ امروز میلادی

let now = new Date();


// تبدیل امروز به شمسی

let todayJalali = gregorianToJalali(
    now.getFullYear(),
    now.getMonth()+1,
    now.getDate()
);



// تاریخ فعلی نمایش داده شده

let currentYear = todayJalali[0];

let currentMonth = todayJalali[1];





// تبدیل میلادی به شمسی

function gregorianToJalali(gy, gm, gd){

    let gdm = [
        0,
        31,
        59,
        90,
        120,
        151,
        181,
        212,
        243,
        273,
        304,
        334
    ];


    let jy;

    if(gy > 1600)
        jy = 979;
    else
        jy = 0;



    gy -= (gy > 1600) ? 1600 : 621;



    let gy2 =
    (gm > 2) ? gy + 1 : gy;



    let days =
        365 * gy
        + Math.floor((gy2 + 3) / 4)
        - Math.floor((gy2 + 99) / 100)
        + Math.floor((gy2 + 399) / 400)
        - 80
        + gd
        + gdm[gm-1];



    jy += 33 * Math.floor(days / 12053);

    days %= 12053;



    jy += 4 * Math.floor(days / 1461);

    days %= 1461;



    if(days > 365){

        jy += Math.floor((days-1)/365);

        days = (days-1)%365;

    }



    let jm;
    let jd;



    if(days < 186){

        jm = 1 + Math.floor(days / 31);

        jd = 1 + (days % 31);

    }

    else{

        jm = 7 + Math.floor((days-186)/30);

        jd = 1 + ((days-186)%30);

    }



    return [
        jy,
        jm,
        jd
    ];

}

// تعداد روزهای ماه شمسی

function getDaysInShamsiMonth(year, month){


    if(month <= 6){

        return 31;

    }


    else if(month <= 11){

        return 30;

    }


    else{

        // اسفند (بعداً با کبیسه کامل‌تر می‌شود)

        return 29;

    }

}




// پیدا کردن روز شروع ماه

function getFirstDayOfMonth(year, month){


    let miladi =
        jalaliToGregorian(
            year,
            month,
            1
        );


    let date = new Date(

        miladi[0],
        miladi[1]-1,
        miladi[2]

    );


    // تبدیل یکشنبه=0 به شنبه=0

    return (date.getDay()+1)%7;

}




// ساخت تقویم

function renderCalendar(){


    daysContainer.innerHTML = "";



    title.innerHTML =

        "AP Calendar - " +

        shamsiMonths[currentMonth-1] +

        " " +

        currentYear;



    let firstDay =

        getFirstDayOfMonth(
            currentYear,
            currentMonth
        );



    // خانه های خالی اول ماه

    for(let i=0;i<firstDay;i++){


        let empty = document.createElement("div");


        empty.classList.add("empty");


        daysContainer.appendChild(empty);


    }




    let totalDays =

        getDaysInShamsiMonth(

            currentYear,

            currentMonth

        );





    // ساخت روزهای ماه

    for(let dayNumber=1; dayNumber<=totalDays; dayNumber++){


        let day = document.createElement("div");


        day.innerHTML = dayNumber;



        // تشخیص امروز

        if(

            dayNumber === todayJalali[2] &&

            currentMonth === todayJalali[1] &&

            currentYear === todayJalali[0]

        ){

            day.classList.add("today");

        }



        daysContainer.appendChild(day);


    }



}

// تعداد روزهای ماه شمسی

function getDaysInShamsiMonth(year, month){


    if(month <= 6){

        return 31;

    }


    else if(month <= 11){

        return 30;

    }


    else{

        // اسفند (بعداً با کبیسه کامل‌تر می‌شود)

        return 29;

    }

}




// پیدا کردن روز شروع ماه

function getFirstDayOfMonth(year, month){


    let miladi =
        jalaliToGregorian(
            year,
            month,
            1
        );


    let date = new Date(

        miladi[0],
        miladi[1]-1,
        miladi[2]

    );


    // تبدیل یکشنبه=0 به شنبه=0

    return (date.getDay()+1)%7;

}




// ساخت تقویم

function renderCalendar(){


    daysContainer.innerHTML = "";



    title.innerHTML =

        "AP Calendar - " +

        shamsiMonths[currentMonth-1] +

        " " +

        currentYear;



    let firstDay =

        getFirstDayOfMonth(
            currentYear,
            currentMonth
        );



    // خانه های خالی اول ماه

    for(let i=0;i<firstDay;i++){


        let empty = document.createElement("div");


        empty.classList.add("empty");


        daysContainer.appendChild(empty);


    }




    let totalDays =

        getDaysInShamsiMonth(

            currentYear,

            currentMonth

        );





    // ساخت روزهای ماه

    for(let dayNumber=1; dayNumber<=totalDays; dayNumber++){


        let day = document.createElement("div");


        day.innerHTML = dayNumber;



        // تشخیص امروز

        if(

            dayNumber === todayJalali[2] &&

            currentMonth === todayJalali[1] &&

            currentYear === todayJalali[0]

        ){

            day.classList.add("today");

        }



        daysContainer.appendChild(day);


    }



}

// تبدیل شمسی به میلادی

function jalaliToGregorian(jy, jm, jd){


    let gy;


    if(jy > 979){

        gy = 1600;

        jy -= 979;

    }

    else{

        gy = 621;

        jy -= 0;

    }



    let days =

        365 * jy +

        Math.floor(jy / 33) * 8 +

        Math.floor(((jy % 33) + 3) / 4) +

        78 +

        jd;



    if(jm < 7){

        days += (jm - 1) * 31;

    }

    else{

        days += ((jm - 7) * 30) + 186;

    }




    gy += 400 * Math.floor(days / 146097);

    days %= 146097;



    if(days > 36524){

        gy += 100 * Math.floor(--days / 36524);

        days %= 36524;


        if(days >= 365){

            days++;

        }

    }



    gy += 4 * Math.floor(days / 1461);

    days %= 1461;



    if(days > 365){

        gy += Math.floor((days - 1) / 365);

        days = (days - 1) % 365;

    }



    let gd = days + 1;



    let months = [

        0,

        31,

        28,

        31,

        30,

        31,

        30,

        31,

        31,

        30,

        31,

        30,

        31

    ];



    let leap =

        (gy % 4 === 0 &&
        gy % 100 !== 0)
        ||
        (gy % 400 === 0);



    if(leap){

        months[2] = 29;

    }



    let gm = 1;



    while(gd > months[gm]){

        gd -= months[gm];

        gm++;

    }



    return [

        gy,

        gm,

        gd

    ];

}





// ماه قبل

prev.onclick = function(){


    currentMonth--;



    if(currentMonth < 1){

        currentMonth = 12;

        currentYear--;

    }



    renderCalendar();


};





// ماه بعد

next.onclick = function(){


    currentMonth++;



    if(currentMonth > 12){

        currentMonth = 1;

        currentYear++;

    }



    renderCalendar();


};






// رفتن به امروز

todayBtn.onclick = function(){


    let now = new Date();



    let today = gregorianToJalali(

        now.getFullYear(),

        now.getMonth()+1,

        now.getDate()

    );



    currentYear = today[0];

    currentMonth = today[1];



    renderCalendar();


};


// نمایش تاریخ انتخاب شده

function showSelectedDate(year, month, day){


    let selected = document.createElement("div");


    selected.className = "selected-date";


    selected.innerHTML =

    "تاریخ انتخاب شده: " +

    day +

    " " +

    shamsiMonths[month-1] +

    " " +

    year;



    let old = document.querySelector(".selected-date");


    if(old){

        old.remove();

    }



    document.querySelector(".calendar")

    .appendChild(selected);


}





// اضافه کردن کلیک روی روزها

function addDayEvents(){


    let allDays =

    document.querySelectorAll(

        ".days div:not(.empty)"

    );



    allDays.forEach(day=>{


        day.onclick=function(){



            showSelectedDate(

                currentYear,

                currentMonth,

                this.innerHTML

            );



        };


    });


}



renderCalendar();
addDayEvents();

// نسخه جدید نمایش تقویم

let oldRender
