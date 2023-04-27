document.addEventListener("DOMContentLoaded",() => {
    const baseUrl = 'https://my-json-server.typicode.com/Wambuiwambugu/Phase-1-Independent-Project/services'

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
    //create services card
    function renderOneService(service){
        let card = document.createElement('div');
        card.className = 'card'
        card.innerHTML = `
          <img src="${service.image_url}">
          <div class="content">
            <h4>${service.name}</h4>
            <p>${service.description}</p>
            <p>${service.duration}</p>
            <p>${service.price}</p>
          </div>
        `
        document.querySelector('#cardContainer').append(card)
    }

    function serviceCard(){
        fetch('https://my-json-server.typicode.com/Wambuiwambugu/Phase-1-Independent-Project/services')
        .then(res => res.json())
        .then(data => {
            data.forEach(service => renderOneService(service))
        })

    }
    serviceCard()
    initializebtns();
    loadCalender();
    
    //create services card
    

    
})





