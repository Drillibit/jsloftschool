/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

const displayData = (data, input) => {
    listTable.innerHTML = '';
    for (let cookie in data) {
        if (data.hasOwnProperty(cookie)) {
            let name = cookie;

            let value = data[name];

            if (!input) {
                dataRow(name, value);
            } else {
                let res = filtered(name, input);

                if (res) {
                    dataRow(name, value);
                }
            }
        }
    }
};

const dataRow = (name, value) => {
    listTable.innerHTML += `<tr><th>${name}</th><th>${value}</th><th><button>Удалить</button></th></tr>`;

};

const filtered = (whole, part) => {
    let res = whole.toLowerCase().includes(part.toLowerCase());

    return res;
}

const getCookies = () => {
    return document.cookie.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');

        prev[name] = value;
        
        return prev;
    }, {})
};

const addCookie = (inputName, inputValue) => {
    document.cookie = `${inputName}=${inputValue}`;
    displayData(getCookies());
};

const deleteCookie = (cookieName, removeRow) => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    listTable.removeChild(removeRow);
};

displayData(getCookies());

listTable.addEventListener('click', (e) => {
    let removedRow = e.target.parentNode.parentNode;
    let cookieName = e.target.parentNode.parentNode.firstChild.textContent;

    deleteCookie(cookieName, removedRow);
});

filterNameInput.addEventListener('keyup', function (e) {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    listTable.innerHTML = '';
    displayData(getCookies(), e.target.value);    
});

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    let inputName = addNameInput.value;
    let inputValue = addValueInput.value;

    const data = getCookies();

    for (let cookieName in data) {
        if (data.hasOwnProperty(cookieName)) {
            if (cookieName === inputName) {
                inputName = cookieName;
            }
            addCookie(inputName, inputValue);
        }
    }
});
