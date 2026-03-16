function changeColor(btn) {
    let button = document.querySelectorAll(".btn-section button");

    button.forEach(btns=>{
        btns.classList.remove("active");
    })
    btn.classList.add("active");
}

function filterCards(status){
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(data => {

        if(status === "all"){
            displayCard(data.data);
        }
        else{
            const filtered = data.data.filter(card => card.status === status);
            displayCard(filtered);
        }

    })
}


function totalIssue(count){
    document.getElementById("issue").innerText = count;
}

const manageSpinner =(loading)=>{
if(loading==true){
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("card-container").classList.add("hidden");
}
else{
   document.getElementById("card-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
 
}
}

const loadCardDetails =async()=>{
    const url =`https://phi-lab-server.vercel.app/api/v1/lab/issues`;
   const res=await fetch(url);
   const details=await res.json();
 displayCardDetails(details.data)  
};

const displayCardDetails =(card)=>{
const detailsBox=document.getElementById("details-container");
detailsBox.innerHTML=""

const labels = card.labels.map(label => 
`<span class="bg-yellow-100 text-yellow-500 px-2 py-1 rounded-lg text-xs">${label}</span>`
).join(" ");

const cardDetail =document.createElement("div");
        cardDetail.innerHTML=`
         <h1 class="font-bold">${card.title}</h1>
        <div class="ul-list">
            <ul> <span class="bg-green-100 text-green-300" >Open</span>
                <li>Open by ${card.author} </li>
                <li>1/15/2024</li>
            </ul>

            <div class="flex gap-2 pt-2 flex-wrap">
                ${labels}
            </div>

            <div class="text-gray-500">${card.description}
        </div>`

         detailsBox.appendChild(cardDetail);
         
}




const loadCards = () =>{
     manageSpinner(true);
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res)=>res.json())
    .then((json)=>{
        displayCard(json.data);
        manageSpinner(false);
    });
}


const displayCard =(cards)=>{
    const cardContainer= document.getElementById("card-container");
    cardContainer.innerHTML="";




     totalIssue(cards.length);
    cards.forEach((card)=>{

        let statusClass = "";

if(card.status == "open"){
    statusClass = "border-t-4 border-green-500";
}
else if(card.status == "closed"){
    statusClass = "border-t-4 border-purple-500";
}

        let priorityClass = "";
if(card.priority=="high") priorityClass = "bg-red-100 text-red-500";
else if(card.priority=="medium") priorityClass = "bg-orange-100 text-orange-500";
else if(card.priority=="low") priorityClass = "bg-gray-100 text-gray-500";


const labels = card.labels.map(label => 
`<span class="bg-yellow-100 text-yellow-500 px-2 py-1 rounded-lg text-xs">${label}</span>`
).join(" ");

        const cardDiv =document.createElement("div");
        cardDiv.innerHTML=`
        <div class="bg-white px-2 shadow rounded-lg flex flex-col h-full space-y-1 onclick="my_modal_5.showModal()" ${statusClass}">
                <span class="flex justify-between pt-5  items-center ">
                <i class="fa-regular fa-circle text-green-600 bg-green-200 rounded-full items-center justify-center "></i>
                <div class="px-2 py-1 rounded-lg ${priorityClass}">  ${card.priority}</div>
                </span>
                <p class="font-semibold ">${card.title}</p>
                <p class="text-gray-500 ">${card.description}</p>
            <div class="flex gap-2 pt-2 flex-wrap">
                ${labels}
            </div>

            <div class=" h-0.5 bg-gray-100 w-full my-2"></div>

            <div class="text-gray-500 mt-auto pb-2">
                <p>#1 by ${card.author}</p>
                <p>${new Date(card.createdAt).toLocaleDateString()}</p>
            </div>
            </div>
           
        `;
        cardDiv.addEventListener("click", () => {
            
    // modal content set করা
    // document.getElementById("modal-title").innerText = card.title;

    // document.getElementById("modal-description").innerText = card.description;
    
    // modal show
    const modal = document.getElementById("my_modal_5");
    modal.showModal();
});
        cardContainer.appendChild(cardDiv);
    })
}

loadCards();
displayCardDetails(card);

//   "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z" 

document.getElementById("btn-search").addEventListener("click",()=>{
     const input =document.getElementById("input-search");
 const searchValue = input.value.trim().toLocaleLowerCase();

 const buttons = document.querySelectorAll(".btn-section button");
    buttons.forEach(btn => btn.classList.remove("active"));

const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues`;
fetch(url)
.then((res)=>res.json())
.then((data)=>{
    const allCards =data.data;
    const filterCards =allCards.filter((card)=> card.title.toLowerCase().includes(searchValue) ||
    card.description.toLowerCase().includes(searchValue));
    displayCard (filterCards);
})
 
})

