console.clear();

const nav = document.querySelector("nav");
const navLinksContainer = document.querySelector(".nav-links");
const navLinks = [...document.querySelectorAll(".link")];
const menuBtn = document.querySelector(".menu-btn");
const subMenuBtn = document.querySelector(".sub-menu-btn");

function createHoverEl() {
    let hoverEl = document.createElement("div");
    hoverEl.className = "hover-el";
    hoverEl.style.setProperty("--y", "0px");
    hoverEl.style.setProperty("--mousex", "0px");
    hoverEl.style.setProperty("--mousey", "0px");
    navLinksContainer.appendChild(hoverEl);
}
createHoverEl();

navLinks.forEach((link, index) => {
    let hoverEl = navLinksContainer.querySelector(".hover-el");
    link.style.setProperty("--delay", `${index * 50}ms`);
    link.addEventListener("mousemove", function(e) {
        hoverEl.style.setProperty("--y", `${index * 60}px`);
        hoverEl.style.setProperty("opacity", "1");
        hoverEl.style.setProperty("--mousex", `${e.pageX - hoverEl.offsetLeft}px`);
        hoverEl.style.setProperty("--mousey", `${e.pageY - hoverEl.offsetTop}px`);
    });
    navLinksContainer.addEventListener("mouseout", function() {
        hoverEl.style.setProperty("opacity", "0");
    });
    link.addEventListener("click", function() {
        let hoverEl = navLinksContainer.querySelector(".hover-el");
        hoverEl.style.opacity = '0';
        toggleSubmenu(link);
    });
});

menuBtn.addEventListener("click", function() {
    nav.classList.toggle("nav-open");
    menuBtn.classList.toggle("close");
});
subMenuBtn.addEventListener("click", function() {
    nav.classList.toggle("sub-menu-open");
    removeSubmenu();
});

function toggleSubmenu(el) {
    let subMenu = nav.querySelector(".sub-menu");
    if (el.children[1]) {
        createSubmenu(el);
    } else if (nav.contains(subMenu)) {
        removeSubmenu();
    } else {
        return;
    }
}

function createSubmenu(el) {
    let subMenuContainer = document.createElement("div");
    subMenuContainer.className = "sub-menu";
    let subMenuItem = el.children[1].cloneNode(true);
    let subMenuItemList = [...subMenuItem.children];
    subMenuItemList.forEach((item, index) => {
        item.classList.add("off-menu");
        item.style.setProperty("--delay", `${index * 40}ms`);
    });
    nav.classList.toggle("sub-menu-open");
    nav.appendChild(subMenuContainer);
    subMenuContainer.appendChild(subMenuItem);
    setTimeout(function() {
        subMenuItemList.forEach(item => {
            item.classList.remove("off-menu");
            item.classList.add("on-menu");
        });
    }, 200);
}
function removeSubmenu() {
    let subMenu = nav.querySelector(".sub-menu");
    let subMenuItemList = [...subMenu.children[0].children];
    if (nav.contains(subMenu)) {
        subMenuItemList.forEach(item => {
            item.classList.add("off-menu");
            item.classList.remove("on-menu");
        });
        setTimeout(function() {
            nav.removeChild(subMenu);
        }, 500);
    }
}


$(document).ready(function() {
    $(".owl-carousel1").owlCarousel({
        loop: true,
        nav: true,
        dots: true,
        navText: ['', ' '],
        dotsEach: true,

        responsive: {
            0: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });

    $(".owl-carousel2").owlCarousel({
        loop: true,
        nav: true,
        dots: true,
        navText: ['', ' '],
        dotsEach: true,

        responsive: {
            0: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });

    $('.owl-carousel3').owlCarousel({
        loop:true,
        margin:25,
        responsiveClass:true,
        nav:true,
        responsive:{
            0:{
                items:1,
            },
            600:{
                items:2,
            },
            1000:{
                items:3,
            }
        }
    })
});


$(document).ready(function(){
    $(".accordion").on("click", ".heading", function() {

        $(this).toggleClass("active").next().slideToggle();

        $(".contents").not($(this).next()).slideUp(300);

        $(this).siblings().removeClass("active");
    });
});




class PriceRange extends HTMLElement {
    constructor() {
        super();

        console.log('Price Range: Constructor', this);
    }

    connectedCallback() {
        // Elements
        this.elements = {
            container: this.querySelector('div'),
            track: this.querySelector('div > div'),
            from: this.querySelector('input:first-of-type'),
            to: this.querySelector('input:last-of-type'),
            output: this.querySelector('output')
        }

        // Event listeners
        this.elements.from.addEventListener('input', this.handleInput.bind(this));
        this.elements.to.addEventListener('input', this.handleInput.bind(this));

        // Properties
        this.currency = (this.hasAttribute('currency') &&
            this.getAttribute('currency') !== undefined &&
            this.getAttribute('currency') !== '') ? this.getAttribute('currency') : '£';

        // Update the DOM
        this.updateDom();

        console.log('Price Range: Connected', this);
    }

    disconnectedCallback() {
        delete this.elements;
        delete this.currency;

        console.log('Price Range: Disconnected', this);
    }

    get from() {
        return parseInt(this.elements.from.value);
    }
    get to() {
        return parseInt(this.elements.to.value);
    }

    handleInput(event) {
        if (parseInt(this.elements.to.value) - parseInt(this.elements.from.value) <= 1) {
            if (event.target === this.elements.from) {
                this.elements.from.value = (parseInt(this.elements.to.value) - 1);
            } else if (event.target === this.elements.to) {
                this.elements.to.value = (parseInt(this.elements.from.value) + 1);
            }
        }

        // Update the DOM
        this.updateDom();

        console.log('Price Range: Updated!!', {
            from: parseInt(this.elements.from.value),
            to: parseInt(this.elements.to.value)
        });
    }

    updateDom() {
        this.drawFill();
        this.drawOutput();
    }

    drawFill() {
        const percent1 = (this.elements.from.value / this.elements.from.max) * 100,
            percent2 = (this.elements.to.value / this.elements.to.max) * 100;

        this.elements.track.style.background = `linear-gradient(to right, var(--track-color) ${percent1}%, var(--track-highlight-color) ${percent1}%, var(--track-highlight-color) ${percent2}%, var(--track-color) ${percent2}%)`;
    }

    drawOutput() {
        this.elements.output.textContent = `${this.elements.from.value} ${this.currency} - ${this.elements.to.value} ${this.currency}`;
    }
}

customElements.define('price-range', PriceRange);




$(document).ready(function(){
    var $searchIcon = $('.search-icon');
    var $searchInput = $('.search-input');

    $searchIcon.click(function(){
        $searchInput.toggleClass('open');
    });
});



$(document).ready(function () {
    $('.mobile_filter').click(function (event) {
        $('.filter_block').toggleClass('active');
        $(body).toggleClass('lock');
    })
    $('.search_mobile').click(function (event){
        $('.search_block').toggleClass('active')
    })
})
