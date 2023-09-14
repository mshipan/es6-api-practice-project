// categories section
let fetchData = [];
const fetchCategories = () => {
    const URL = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(URL)
        .then(response => response.json())
        .then(data => showCategories(data.data));
}
const showCategories = (data) => {
    console.log(data);
    const categoriesContainer = document.getElementById('categories-container');
    data.news_category.forEach((singleCategory) => {
        const linkContainer = document.createElement("p");
        linkContainer.innerHTML = `
            <a href="">${singleCategory.category_name}</a>
        `
        categoriesContainer.appendChild(linkContainer);
    });
}

const fetchCategoryNews = (category_id, category_name) => {
    const URL = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            fetchData = data.data;
            showAllNews(data.data, category_name);
        });
}
const showAllNews = (data, category_name) => {
    console.log(data, category_name);
    document.getElementById("news-count").innerText = data.length;
    document.getElementById("category-name").innerText = category_name;
}
fetchCategoryNews();