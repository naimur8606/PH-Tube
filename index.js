const catchCategories = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    loadCategories(data?.data)
}
const loadCategories = (categories) => {
    const categoriesContainer = document.getElementById("categories-container");
    categories.forEach(category => {
        const createA = document.createElement("a");
        createA.innerHTML = `<a onclick="catchCategoriesDetails('${category.category_id}')" class="tab btn font-semibold text-xl  my-2 hover:bg-[#FF1F3D] hover:text-white bg-gray-300">${category?.category}</a>`
        categoriesContainer.appendChild(createA);
    });
}
const catchCategoriesDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await res.json();
    console.log(data.data);
}
catchCategories()