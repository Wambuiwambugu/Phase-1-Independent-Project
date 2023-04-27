document.addEventListener("DOMContentLoaded",() => {
    // create calender
    let nav = 0
    let booked = null
    const calender = document.querySelector('#calender');
    console.log(calender)
    const weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

    function loadCalender(){
        const dt = new Date();
        console.log(dt);
        if (nav !== 0){
            dt.setMonth(new Date().getMonth() + nav);
        }
        const day = dt.getDate();
        const month = dt.getMonth();
        const year = dt.getFullYear();
        console.log(day,month,year);

        const daysInMOnth = new Date(year,month + 1, 0).getDate();
        console.log(daysInMOnth);
        const firstDayOfMOnth = new Date(year,month,1)
        const dateString = firstDayOfMOnth.toLocaleDateString('en-us',{
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        })
        console.log(dateString)
        const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);
        document.querySelector('#monthDisplay').innerText = `${dt.toLocaleDateString('en-us',{month: "long"})} ${year}`;

        calender.innerHTML = '';
        for(let i = 1; i <= paddingDays + daysInMOnth; i++){
    
            const daySquare = document.createElement('div');
            daySquare.classList.add('day');
            if (i > paddingDays){
                daySquare.innerText = i - paddingDays;
                daySquare.addEventListener('click', () => console.log(clicked));
            }
            else{
                daySquare.classList.add('padding');
            }
            calender.appendChild(daySquare);
        }


    }
    function initializebtns(){
        document.querySelector('#nextbutton').addEventListener('click',() => {
            nav++;
            loadCalender();
        })
        //document.querySelector('#backbutton').addEventListener('click',() => {
        //    nav--;
        //    loadCalender();
        //})
    }
    initializebtns();
    loadCalender();
    
    //create services card
    
})





