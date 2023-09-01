// catch the categories
const catchCategories = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    loadCategories(data?.data)
}
// publish the category in categories filed
const loadCategories = (categories) => {
    const categoriesContainer = document.getElementById("categories-container");
    categories.forEach(category => {
        const createA = document.createElement("a");
        createA.innerHTML = `<a onclick="catchCategoriesDetails('${category?.category_id}')" class="tab btn font-semibold text-xl  my-2 hover:bg-[#FF1F3D] hover:text-white bg-gray-300">${category?.category}</a>`
        categoriesContainer.appendChild(createA);
    });
}
// catch the Categories Details
const catchCategoriesDetails = async (id="1000") => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await res.json();
    loadCategoriesDetails(data?.data);
}



// publish the catchCategory Details in catchCategory Details filed
const loadCategoriesDetails = (channels) => {
    const channelsDiv = document.getElementById("channels");
    channelsDiv.textContent = "";
        const Empty = document.getElementById("empty")
        Empty.textContent="";
    if(channels.length === 0){
        const emptyMsg = document.createElement("div");
        emptyMsg.classList.add("h-screen")
        emptyMsg.innerHTML=`
            <div class="flex mt-14 flex-col items-center text-center">
                <img src="./Icon.png">
                <h2 class="text-3xl font-bold">Oops!! Sorry, There is no content here</h2>
            </div>
        `
        Empty.appendChild(emptyMsg);
    }
    channels.forEach(channel =>{
        const channelDiv = document.createElement("div");
        channelDiv.classList ="";
        const hrs= parseInt(parseInt(channel?.others?.posted_date) / 3600);
        const min= parseInt(((parseInt(channel?.others?.posted_date) / 3600)-hrs)*60);
        const views = `<h3 class="h-6 text-right pr-2 relative bottom-10 text-[#f6f1f1] bg-[#352d2da8]">${hrs} hrs ${min} min ago </h3>`;
        channelDiv.innerHTML = `
            <div>
                <img class="h-[220px] w-[100%] rounded-lg" src="${channel?.thumbnail}">
                ${channel?.others?.posted_date? views : "<h1 class='h-6'></h1>"}
            </div>
            <div class="flex space-x-2">
                <img class="w-[38px] h-[38px] rounded-[50%]" src="${channel?.authors[0]?.profile_picture}">
                
                <div class="space-y-2">
                    <h2 class="text-2xl font-semibold">${channel?.title}</h2>
                    <div class="flex items-center space-x-2">
                    <h5 class="text-xl text-[#5d5d5d] font-normal">${channel?.authors[0]?.profile_name}</h5>
                    <p>${ channel?.authors[0]?.verified? '<img class="w-4" src="./checklist.png">' : ""} </p>
                    </div>
                    <p class="text-[18px] text-[#5d5d5d] font-normal">${channel?.others?.views} views</p>
                </div>
            </div>
        `
        channelsDiv.appendChild(channelDiv);
    })
    document.querySelector(".sort").addEventListener("click",function(){
        sortViewer(channels)
    })
}
// try to make sort
const sortViewer = (channelList) => {
    const channels = channelList.sort((a, b) => parseInt(b.others.views) - parseInt(a.others.views))
    loadCategoriesDetails(channels);
}

catchCategories()
catchCategoriesDetails()