/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
    const url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

    const towns = fetch(url).then(response => {
        if (response.status >= 400) {
            loadingBlock.innerText = 'Не удалось загрузить города';
            const btn = document.createElement('button');

            btn.innerText = 'Повторить';
            btn.addEventListener('click', () => {
                loadTowns();
            })
            loadingBlock.appendChild(btn)
        }
        
        return response.json().then(json => {

            loadingBlock.style.display = 'none';
            filterBlock.style.display = 'block';

            const sorted = json.sort((a, b) => {

                if (a.name > b.name) {
                    return 1;
                } else if (a.name < b.name) {
                    return -1
                }
                    
                return 0;
            });

            return sorted;
        })
    })

    return towns;
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
const addTown = (town) => {

    const div = document.createElement('div');

    div.textContent = town.name;
    
    return div;
}

function isMatching(full, chunk) {
    return full.toLowerCase().includes(chunk.toLowerCase());
}

loadTowns().then(towns => {
    filterInput.addEventListener('keyup', function (e) {
    // это обработчик нажатия кливиш в текстовом поле
        const filtered = towns.filter((town) => {
          
            const founded = town.name.toLowerCase().includes(e.target.value.toLowerCase());

            return founded;
        })

        filterResult.innerHTML = '';

        for (let towns of filtered) {
            let added = addTown(towns);

            filterResult.appendChild(added);
        }

        if (filterInput.value === '') {
            filterResult.innerHTML = '';
        }
    });
})

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

export {
    loadTowns,
    isMatching
};
