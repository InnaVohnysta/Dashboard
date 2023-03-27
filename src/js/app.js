import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();

let userPhoto = document.querySelector('.header__user-photo');
let userName = document.querySelector('.header__user-name');
let userJobTitle = document.querySelector('.header__user-job-title');

const user = {
    name: 'Evano',
    jobTitle: 'Project manager',
    photoURL: 'https://uploads-ssl.webflow.com/6365240251819de787535624/6369d739dae2e93ba38c48f0_Jaime%20C.png'
};
userPhoto.style.backgroundImage=`url(${user.photoURL})`;
userName.textContent=user.name;
userJobTitle.textContent=user.jobTitle;

let mainHeaderName = document.querySelector('.main__header-name');
mainHeaderName.textContent= user.name;

import customers from './modules/customers.json';

const perPage = 8;
const userTable = document.querySelector('.table__body');
const pagination = document.querySelector('.footer__pagination');

const pageCount = Math.ceil(customers.length / perPage);
let currentPage = 1;
let formatCustomers = formatPhoneNumbers(customers)
renderTable(formatCustomers, currentPage);
renderPaginationText(currentPage,perPage);

renderPagination(currentPage, pageCount);
pagination.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        currentPage = parseInt(e.target.dataset.page);
        renderTable(customers, currentPage);
        renderPagination(currentPage, pageCount);
        renderPaginationText(currentPage,perPage);}
});
function formatPhoneNumbers(data) {
    // Регулярний вираз, який відповідає за формат номера телефону з двома знаками "-"
    const phoneRegex = /^(\d{3})-(\d{3})-(\d{4})$/;

    // Проходимось по кожному елементу в масиві даних та змінюємо формат номера телефону
    data.forEach((item) => {
    if (phoneRegex.test(item.phone)) {
        // Якщо номер телефону відповідає потрібному формату з двома знаками "-" Замінюємо перший знак "-" на "(" та додаємо знак ")" та " " щоб отримати формат "(***) ***-****"
        item.phone = `(${item.phone.substring(0, 3)}) ${item.phone.substring(4, 7)}-${item.phone.substring(8)}`;
    }
    });

    // Повертаємо змінений масив даних
    return data;
}

function renderTable(data, page) {
    userTable.innerHTML = '';
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const pageData = data.slice(start, end);
    pageData.forEach(user => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td class='table__cell'>${user.name}</td>
        <td class='table__cell'>${user.company}</td>
        <td class='table__cell'><a class='table__phone' href='tel:${user.phone}'>${user.phone}</a></td>
        <td class='table__cell'><a class='table__email' href="mailto:${user.email}">${user.email}</a></td>
        <td class='table__cell'>${user.country}</td>
        <td class='table__cell'><div>${user.active}</div></td>
    `;
    
    tr.classList.add('table__row')
    userTable.appendChild(tr);
    let statuses = userTable.querySelectorAll('tr td:nth-child(6) div');
    statuses.forEach(status =>{
        if (status.innerHTML==="Active"){
            status.classList.add('active');}else{
                status.classList.add('inactive');
            }
})
});
}

function renderPaginationText(currentPage,perPage){
    let footerText= document.querySelector('.footer__text');
    let startCount = currentPage*perPage-(perPage-1);
    let endCount = startCount+perPage-1;
    if (endCount > customers.length){
        endCount=customers.length;
    };
    let textPagination = `<p> Showing data ${startCount} to ${endCount} of ${customers.length}</p>`;
    footerText.innerHTML= textPagination;
}
function renderPagination(currentPage, pageCount) {
    let html = '';
    const visiblePages = 3;
    const ellipsis = '<span>...</span>';

    // Ліва стрілка
    if (currentPage > 0) {
        html += `<button class="button" data-page="${currentPage - 1}">&lt;</button>`;
    }

    // Перша сторінка
    html += `<button class="button ${currentPage === 1 ? 'button-active' : ''}" data-page="1" ${currentPage === 1 ? 'disabled' : ''}>1</button>`;
    if (currentPage > visiblePages) {
        html += ellipsis;
    }

    // Середні сторінки
    let start = Math.max(currentPage - visiblePages, 2);
    let end = Math.min(currentPage + visiblePages, pageCount - 1);
    for (let i = start; i <= end; i++) {
        html += `<button class="button ${i === currentPage ? 'button-active' : ''}" data-page="${i}" ${i === currentPage ? 'disabled' : ''}>${i}</button>`;
    }

    // Остання сторінка
    if (currentPage < pageCount - visiblePages) {
        html += ellipsis;
    }
    if (pageCount > 1) {
        html += `<button class="button ${currentPage === pageCount ? 'button-active' : ''}" data-page="${pageCount}" ${currentPage === pageCount ? 'disabled' : ''}>${pageCount}</button>`;
    }

    // права стрілка
    if (currentPage < pageCount) {
        html += `<button class="button" data-page="${currentPage + 1}">&gt;</button>`;
    }

    pagination.innerHTML = html;

    // Обробник подій для кнопок пагінації
    const buttons = pagination.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const active = pagination.querySelector('.button-active');
            if (active) {
                active.classList.remove('button-active');
            }
            button.classList.add('button-active');
        });
    });
}


const hamburger = document.querySelector('.header__hamburger');
const nav = document.querySelector('.header__nav');

hamburger.addEventListener('click', () => {
hamburger.classList.toggle('header__hamburger-active');
nav.classList.toggle('header__nav-active');
});