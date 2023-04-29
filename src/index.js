document.addEventListener("DOMContentLoaded",() => {
    const baseUrl = 'https://my-json-server.typicode.com/Wambuiwambugu/Phase-1-Independent-Project/services'

    // create calender
    let nav = 0;
    let clicked = null;
    let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

    const newEventModal = document.querySelector('.eventModalWrapper')
    const calender = document.querySelector('#calender');
    console.log(calender)
    const weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

    function openModal(date){
        clicked = date;

        const eventForDay = events.find(e => e.date === clicked);

        if (eventForDay){
            console.log('Event already exists')
        }
        else {
            newEventModal.style.opacity = '1';
            newEventModal.style.pointerEvents = 'auto'
        }
    }
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
                daySquare.addEventListener('click', () => openModal(`${month + 1}/${i - paddingDays}/${year}`));
            }
            else{
                daySquare.classList.add('padding');
            }
            calender.appendChild(daySquare);
        }


    }
    function initializebtns(){-
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
          <img src="${service.image_url}"/>
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
    function displayReviews(){
        fetch('https://my-json-server.typicode.com/Wambuiwambugu/Phase-1-Independent-Project/reviews')
        .then(res => res.json())
        .then(data => {
            data.forEach(review => {
                let reviewCard = document.createElement('div');
                reviewCard.className = 'reviewCard';
                reviewCard.innerHTML = `
                <p>${review.comment}</p>
                `
                document.querySelector('.reviews').append(reviewCard)
            })
        })
    }
    function leaveReview(){
        document.querySelector('#review').addEventListener('submit',e => {
            e.preventDefault();
            let newReview = e.target.new_review.value;
            let newReviewCard = document.createElement('div');
            newReviewCard.className = 'reviewCard'
            newReviewCard.innerHTML = `
            
                <p>${newReview}</p>
            `
            document.querySelector('.reviews').append(newReviewCard)

        })
        
    }
    function showCalender(){
        document.querySelector('.book').addEventListener('click',() => {
            if (document.querySelector('.calender-wrapper').style.display === 'none'){
                document.querySelector('.calender-wrapper').style.display = 'block'
            }
            else {
                document.querySelector('.calender-wrapper').style.display = 'none'
            }
        })
    }
    
  
    function logo(){
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.font = "25px Sedgwick Ave Display";
        ctx.fillText("Curl Station", 10, 35);
    }
    logo();
    showCalender();
    leaveReview();
    displayReviews();
    serviceCard();
    initializebtns();
    loadCalender();
    
    //create services card
    

    
})





