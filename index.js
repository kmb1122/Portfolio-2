// template_neqjd78
// service_mbp1cxn
// cYMCtYadw1AaV-lFw
let isModalOpen = false;
let contrastToggle = false;
const scaleFactor = 1 / 20;

function openMenu () {
    document.body.classList += " menu--open"
} 

function closeMenu () {
    document.body.classList.remove('menu--open')
}

function moveBackground(event) {
    const shapes = document.querySelectorAll(".shape");
    const x = event.clientX * scaleFactor;
    const y = event.clientY * scaleFactor;
    
    for (let i = 0; i < shapes.length; i++) {
        const isOdd = i % 2 !== 0;
        const boolInt = isOdd ? -1 : 1;
        shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px)`;
    }
}

function toggleContrast() {
    contrastToggle = !contrastToggle;
    if (contrastToggle) {
        document.body.classList += " dark-theme";    
    }
    else {
        document.body.classList.remove ("dark-theme");
    }
}

function contact(event) {
    event.preventDefault();
    const loading = document.querySelector('.modal__overlay--loading');
    const success = document.querySelector('.modal__overlay--success');
    loading.classList += " modal__overlay--visible";
    emailjs
        .sendForm(
            'service_mbp1cxn',
            'template_neqjd78',
            event.target,
            'cYMCtYadw1AaV-lFw'
        ).then(() => {
            loading.classList.remove("modal__overlay--visible")
            success.classList += " modal__overlay--visible"
        }).catch(() => {
            loading.classList.remove("modal__overlay--visible");
            alert(
                "This email service is temporarily unavaible. Please conact me directly at silverspace@gmail.com."
            );
        });
}

function toggleModal() {
    if (isModalOpen) {
        isModalOpen = false;
        return document.body.classList.remove("modal__open");
    }
    isModalOpen = true;
    document.body.classList += " modal__open";
}