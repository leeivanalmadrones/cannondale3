let slide_index = 0
let slide_play = true
let slides = document.querySelectorAll('.slide')

hideAllSlide = () => {
    slides.forEach(e => {
        e.classList.remove('active')
    })
}

showSlide = () => {
    hideAllSlide()
    slides[slide_index].classList.add('active')
}

nextSlide = () => slide_index = slide_index + 1 === slides.length ? 0 : slide_index + 1

prevSlide = () => slide_index = slide_index - 1 < 0 ? slides.length - 1 : slide_index - 1

// pause slide when hover slider

document.querySelector('.slider').addEventListener('mouseover', () => slide_play = false)

// enable slide when mouse leave out slider
document.querySelector('.slider').addEventListener('mouseleave', () => slide_play = true)

// slider controll

document.querySelector('.slide-next').addEventListener('click', () => {
    nextSlide()
    showSlide()
})

document.querySelector('.slide-prev').addEventListener('click', () => {
    prevSlide()
    showSlide()
})

showSlide()

// setInterval(() => {
//     if (!slide_play) return
//     nextSlide()
//     showSlide()
// }, 3000);

// render products

let products = [
    {
        name: 'CAAD Optimo 1',
        image1: './images/caad1.png',
        image2: './images/caad2.png',
        old_price: '₱55,000.00 ',
        curr_price: '₱41,250.00'
    },
    {
        name: 'Supersix EVO 1',
        image1: './images/ssix.png',
        image2: './images/ssix1.png',
        old_price: '₱260,000.00',
        curr_price: '₱195,000.00 '
    },
    {
        name: 'Scalpel HT Carbon-3',
        image1: './images/scalp1.png',
        image2: './images/scalp.png',
        old_price: '₱265,000.00',
        curr_price: '₱198,750.00'
    },
    {
        name: 'Scalpel Carbon SE 1',
        image1: './images/se1.webp',
        image2: './images/se.png',
        old_price: '₱105,000.00',
        curr_price: '₱78,750.00'
    },
    {
        name: 'Moterra SL 1',
        image1: './images/sl1.png',
        image2: './images/sl.png',
        old_price: '₱165,000.00',
        curr_price: '₱98,750.00'
    },
    {
        name: 'Synapse Carbon LTD',
        image1: './images/ltd1.png',
        image2: './images/ltd.png',
        old_price: '₱95,000.00',
        curr_price: '₱70,750.00'
    },
    {
        name: 'Adventure NEO 1',
        image1: './images/neo1.png',
        image2: './images/neo.png',
        old_price: '₱65,000.00',
        curr_price: '₱51,250.00'
    },
]

let product_list = document.querySelector('#latest-products')

products.forEach(e => {
    let prod = `
        <div class="col-3 col-md-6 col-sm-12">
            <div class="product-card">
                <div class="product-card-img">
                    <img src="${e.image1}" alt="">
                    <img src="${e.image2}" alt="">
                </div>
                <div class="product-card-info">
                    <div class="product-btn">
                        <button class="btn-flat btn-hover btn-shop-now">shop now</button>
                        <button class="btn-flat btn-hover btn-cart-add">
                            <i class='bx bxs-cart-add'></i>
                        </button>
                    </div>
                    <div class="product-card-name">
                        ${e.name}
                    </div>
                    <div class="product-card-price">
                        <span><del>${e.old_price}</del></span>
                        <span class="curr-price">${e.curr_price}</span>
                    </div>
                </div>
            </div>
        </div>
    `

    product_list.insertAdjacentHTML("beforeend", prod)
})


