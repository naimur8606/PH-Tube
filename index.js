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
const loadCategoriesDetails = (items) => {
    const itemsDiv = document.getElementById("items");
    itemsDiv.textContent = "";
    if(items.length === 0){
        document.getElementById("items-error").textContent="";
        const defoltitem = document.createElement("div");
        defoltitem.classList.add = "h-screen"
        defoltitem.innerHTML=`
            <div class="flex mt-14 flex-col items-center text-center">
                <img src="./Icon.png">
                <h2 class="text-3xl font-bold">Oops!! Sorry, There is no content here</h2>
            </div>
        `
        document.getElementById("items-error").appendChild(defoltitem);
    }
    items.forEach(item =>{
        const itemDiv = document.createElement("div");
        itemDiv.classList ="";
        const hrs= parseInt(parseInt(item?.others?.posted_date) / 3600);
        const min= parseInt(((parseInt(item?.others?.posted_date) / 3600)-hrs)*60);
        const views = `<h3 class="h-6 text-right pr-2 relative bottom-10 text-[#f6f1f1] bg-[#352d2da8]">${hrs} hrs ${min} min ago </h3>`
        itemDiv.innerHTML = `
            <div>
                <img class="h-[220px] w-[100%] rounded-lg" src="${item?.thumbnail}">
                ${item?.others?.posted_date? views : "<h1 class='h-6'></h1>"}
            </div>
            <div class="flex space-x-2">
                <img class="w-[38px] h-[38px] rounded-[50%]" src="${item?.authors[0]?.profile_picture}">
                
                <div class="space-y-2">
                    <h2 class="text-2xl font-semibold">${item?.title}</h2>
                    <div class="flex items-center space-x-2">
                    <h5 class="text-xl text-[#5d5d5d] font-normal">${item?.authors[0]?.profile_name}</h5>
                    <p>${ item?.authors[0]?.verified? '<img class="w-4" src="./checklist.png">' : ""} </p>
                    </div>
                    <p class="text-[18px] text-[#5d5d5d] font-normal">${item?.others?.views} views</p>
                </div>
            </div>
        `
        itemsDiv.appendChild(itemDiv);
    })
    document.querySelector(".sort").addEventListener("click",function(){
        viewer(items)
    })
}
// try to make sort
const viewer = (x) => {
    const items = x.sort((a, b) => parseInt(b.others.views) - parseInt(a.others.views))
    const itemsDiv = document.getElementById("items");
    itemsDiv.textContent = "";
    items.forEach(item =>{
        const itemDiv = document.createElement("div");
        itemDiv.classList ="";
        const hrs= parseInt(parseInt(item?.others?.posted_date) / 3600);
        const min= parseInt(((parseInt(item?.others?.posted_date) / 3600)-hrs)*60);
        const views = `<h3 class="h-6 text-right pr-2 relative bottom-10 text-[#f6f1f1] bg-[#352d2da8]">${hrs} hrs ${min} min ago </h3>`
        itemDiv.innerHTML = `
            <div>
                <img class="h-[220px] w-[100%] rounded-lg" src="${item?.thumbnail}">
                ${item?.others?.posted_date? views : "<h1 class='h-6'></h1>"}
            </div>
            <div class="flex space-x-2">
                <img class="w-[38px] h-[38px] rounded-[50%]" src="${item?.authors[0]?.profile_picture}">
                
                <div class="space-y-2">
                    <h2 class="text-2xl font-semibold">${item?.title}</h2>
                    <div class="flex items-center space-x-2">
                    <h5 class="text-xl text-[#5d5d5d] font-normal">${item?.authors[0]?.profile_name}</h5>
                    <p>${ item?.authors[0]?.verified? '<img class="w-4" src="./checklist.png">' : ""} </p>
                    </div>
                    <p class="text-[18px] text-[#5d5d5d] font-normal">${item?.others?.views} views</p>
                </div>
            </div>
        `
        itemsDiv.appendChild(itemDiv);
    })
}

catchCategories()
catchCategoriesDetails()