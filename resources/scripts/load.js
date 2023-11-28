document.addEventListener("DOMContentLoaded", function () {
    const preloader = document.getElementById("preloader");
    const postsContainer = document.getElementById("posts");
    const paginationContainer = document.getElementById("pagination");

    const postsPerPage = 10;

    async function fetchData(userId) {
        try
        {
            if (userId instanceof Event){
                userId = 1
            }
            var response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            
            hidePreloader();
            renderData(data);
            renderPagination(data.length);
        }
        catch(error) {
            console.error("Error fetching data:", error);
            displayError();
        };
    }

    function hidePreloader() {
        preloader.style.display = "none";
    }

    function renderData(data) {
        // Очищаем контейнер перед добавлением новых данных
        postsContainer.innerHTML = "";

        // Перебираем массив постов и добавляем их в контейнер
        data.forEach(post => {
            // use <template>
            let postElement = document.querySelector('#template').content.cloneNode(true);
            let h2 = postElement.querySelector('h2');
            let text = postElement.querySelector('p')
            let boldText = postElement.querySelector('strong')
            h2.textContent = post.title;
            text.textContent = post.body;
            boldText.textContent = "User id: " + post.userId;
            postsContainer.appendChild(postElement);
        });
    }

    function renderPagination(totalPosts) {
        const totalPages = Math.ceil(totalPosts / postsPerPage);

        // Очищаем контейнер пагинации перед добавлением новых данных
        paginationContainer.innerHTML = "";

        // Создаем кнопки пагинации
        for (let i = 1; i <= 10; i++) {
            const button = document.createElement("button");
            button.textContent = i;
            button.addEventListener("click", () => {
                currentPage = i;
                fetchData(i);
            });
            paginationContainer.appendChild(button);
        }
    }

    function displayError() {
        preloader.innerHTML = "<p>⚠ Что-то пошло не так</p>";
    }

    window.addEventListener("load", fetchData);
});