let
    D = document,
    cross = D.getElementById('cross'),
    menu = D.getElementById('menu'),
    aside = D.getElementById('aside')

menu.addEventListener('click', () => {
    aside.style.left = '0px'
})

cross.addEventListener('click', () => {
    aside.style.left = '-302px'
})