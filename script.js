const container = document.querySelector('.page-container');
const side = document.querySelector('aside');

let pageCount = 4;
let currentPage = 0;
let pageHeight = window.innerHeight;
let scrollAble = true;

function debounce(func, timeout = 1010){
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this.args)
        }, timeout);
    }
}

function saveInput() {
    console.log('saving data');
}

const processChange = debounce(() => saveInput);

window.addEventListener('resize', e => {
    pageHeight = window.innerHeight;
    pageTo(currentPage);
})

window.addEventListener('wheel', e => {
    e.stopPropagation();
    console.log('wheel');
    if(!scrollAble) return;

    if(e.deltaY > 0){
        currentPage++;
        if(currentPage == pageCount){
            currentPage = pageCount - 1;
        }
    }
    else if(e.deltaY < 0){
        currentPage--;
        if(currentPage < 0){
            currentPage = 0;
        }
    }

    pageTo(currentPage);
    scrollAble = false;
    console.log(scrollAble);
    setTimeout(() => {
        scrollAble = true;
        console.log(scrollAble);
    }, 1350);
})

function initDots(){
    let dot = `<i class="fas fa-circle"></i>`;
    for(let i = 0; i < pageCount; i++){
        side.insertAdjacentHTML('beforeend', dot);
    }
    changeDots(currentPage);
}

function changeDots(pageNum){
    let dots = side.children;
    for(let i = 0; i < dots.length; i++){
        dots[i].style = `font-size : 4px`;
    }
    dots[pageNum].style = `font-size : 12px`;
}

function pageTo(pageNum){
    container.style = `transform : translate(0, -${pageNum * pageHeight}px)`;
    changeDots(pageNum);
}

initDots();