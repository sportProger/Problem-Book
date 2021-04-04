import 'reset.css'
import '../sass/style.sass'
import '../sass/includes/header.sass'
import '../sass/includes/aisde.sass'
import '../sass/pages/canvas.sass'
import './includes/aside'

const
    D = document,
    tools = D.querySelectorAll('.tools'),
    canvas = D.getElementById('canvas'),
    inputColor = D.getElementById('color'),
    ctx = canvas.getContext('2d')

let
    color: string = '#333',
    down: boolean = false,
    penFlag: boolean = false,
    earaserFlag: boolean = false,
    verticalFlag: boolean = false,
    horizontalFlag: boolean = false,
    fx: number = 0,
    fy: number = 0,
    cords: Array<any> = []
    
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let pen = (x: number, y:number) => {
    ctx.lineWidth = 5
    ctx.fillStyle = color
    ctx.strokeStyle = color
    ctx.globalCompositeOperation = 'source-over'

    cords.push([x, y, color, 5, earaserFlag])

    ctx.lineTo (x, y)
    ctx.stroke ()

    ctx.beginPath ()
    ctx.arc (x, y, 2.5, 0, Math.PI * 2)
    ctx.fill ()

    ctx.beginPath ()
    ctx.moveTo (x, y)
}

let earaser = (x: number, y: number) => {
    ctx.lineWidth = 20
    ctx.globalCompositeOperation = 'destination-out'

    cords.push([x, y, color, 20, earaserFlag])

    ctx.lineTo (x, y)
    ctx.stroke ()

    ctx.beginPath ()
    ctx.arc (x, y, 10, 0, Math.PI * 2)
    ctx.fill ()

    ctx.beginPath ()
    ctx.moveTo (x, y)
}

let clear = () => {
    cords = []
    localStorage.setItem('coords', JSON.stringify([]))
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
}

let reproduce = () => {
    let cords: Array<any> = JSON.parse(localStorage.getItem('coords'))
    if (cords[0] !== undefined) {
        clear()
        let interval = setInterval(() => {
            if (cords.length === 0) {
                clearInterval(interval)
            }
            else {
                let
                    crd: any = cords.shift(),
                    x: number = crd[0],
                    y: number = crd[1],
                    clr: string = crd[2],
                    lw: number = crd[3],
                    ef: boolean = crd[4];

                if (crd === 'up') {
                    ctx.beginPath()
                }
                
                (ef) ? ctx.globalCompositeOperation = 'destination-out': ctx.globalCompositeOperation = 'source-over'

                ctx.lineWidth = lw
                ctx.fillStyle = clr
                ctx.strokeStyle = clr

                ctx.lineTo(x, y)
                ctx.stroke()

                ctx.beginPath()
                ctx.arc(x, y, lw / 2, 0, Math.PI * 2)
                ctx.fill()

                ctx.beginPath()
                ctx.moveTo(x, y)
            }
        }, 25)
    }
}

let dragElement = elem => {
    let
        pos1: number = 0,
        pos2: number = 0,
        pos3: number = 0,
        pos4: number = 0,
        flag: boolean = false

    elem.addEventListener('mousedown', e => {
        pos3 = e.clientX
        pos4 = e.clientY
        flag = true
    })

    D.addEventListener('mouseup', () => {
        D.onmouseup = null
        D.onmousemove = null
        flag = false
    })

    D.addEventListener('mousemove', e => {
        if (flag === true) {
            pos1 = pos3 - e.clientX
            pos2 = pos4 - e.clientY
            pos3 = e.clientX
            pos4 = e.clientY
            elem.style.top = `${(elem.offsetTop - pos2)}px`
            elem.style.left = `${(elem.offsetLeft - pos1)}px`
        }
    })
}

window.onresize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

canvas.addEventListener('mouseup', () => {
    down = false
    ctx.beginPath()
    cords.push('up')
})

canvas.addEventListener('touchend', () => {
    down = false
    ctx.beginPath()
    cords.push('up')
})

canvas.addEventListener('mousedown', e => {
    if (verticalFlag) fx = e.clientX
    if (horizontalFlag) fy = e.clientY
    down = true
})

canvas.addEventListener('touchstart', e => {
    if (verticalFlag) fx = e.changedTouches[0].clientX
    if (horizontalFlag) fy = e.changedTouches[0].clientY
    down = true
})

let canvasMove = e => {
    if (down && penFlag && !horizontalFlag && !verticalFlag) {
        pen(e.clientX || e.changedTouches[0].clientX, e.clientY || e.changedTouches[0].clientY)
    }

    if (down && penFlag && horizontalFlag) {
        pen(e.clientX || e.changedTouches[0].clientX, fy)
    }

    if (down && penFlag && verticalFlag) {
        pen(fx, e.clientY || e.changedTouches[0].clientY)
    }

    if (down && earaserFlag) {
        earaser(e.clientX || e.changedTouches[0].clientX, e.clientY || e.changedTouches[0].clientY)
    }
}

canvas.addEventListener('mousemove', e => {
    canvasMove(e)
})

canvas.addEventListener('touchmove', e => {
    canvasMove(e)
})

tools[0].addEventListener('click', e => {
    switch(e.target.id) {
        case 'pen':
            penFlag = true
            earaserFlag = false
            break
        case 'eraser':
            penFlag = false
            earaserFlag = true
            break
        case 'palette':
            inputColor.click()
            inputColor.addEventListener('change', () => color = inputColor.value)
            break
    }
})

tools[1].addEventListener('click', e => {
    switch(e.target.id) {
        case 'vertical':
            verticalFlag = true
            horizontalFlag = false
            break
        case 'horizontal':
            verticalFlag = false
            horizontalFlag = true
            break
        case 'oblique':
            verticalFlag = false
            horizontalFlag = false
            break
        case 'save':
            localStorage.setItem('coords', JSON.stringify(cords))
            break
        case 'reproduce':
            reproduce()
            break
        case 'clear':
            clear()
    }
})

tools.forEach(tool => dragElement(tool))