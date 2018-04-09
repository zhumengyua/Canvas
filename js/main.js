var c = document.getElementById("myCanvas");
RepeterW()
Window.onresize = function () {
    RepeterW()
}
var ctx = c.getContext("2d");

function RepeterW() {
    //设置屏幕宽度高度
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    c.width = pageWidth
    c.height = pageHeight
}

function dramCircle(x, y, radius) {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 7)
    ctx.fill()
}
var using = false
var lastPoint = {
    x: undefined,
    y: undefined
}
if (document.body.ontouchstart !== undefined) { //特性检测！！
    //触屏设备
    console.log('开始')
    c.ontouchstart = function (aaa) {
        var x = aaa.touches[0].clientX
        var y = aaa.touches[0].clientY
        if (eraserEnabled) {
            using = true
            ctx.clearRect(x - 5, y - 5, 10, 10)
        } else {
            using = true
            lastPoint = {
                "x": x,
                "y": y
            }
        }
    }
    c.ontouchmove = function (aaa) {
        var x = aaa.touches[0].clientX
        var y = aaa.touches[0].clientY
        if (eraserEnabled) {
            if (using) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            }
        } else {
            if (using) {
                var newPoint = {
                    "x": x,
                    "y": y
                }
                dramLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint;

            }
        }
    }

    c.ontouchend = function (aaa) {
        using = false;
    }
} else {
    //非触屏设备
    c.onmousedown = function (aaa) {
        var x = aaa.clientX
        var y = aaa.clientY
        if (eraserEnabled) {
            using = true
            ctx.clearRect(x, y, 10, 10)
        } else {
            using = true
            lastPoint = {
                "x": x,
                "y": y
            }
        }
    }
    c.onmousemove = function (aaa) {
        var x = aaa.clientX
        var y = aaa.clientY
        if (eraserEnabled) {
            if (using) {
                ctx.clearRect(x, y, 20, 20) //橡皮擦实现
            }
        } else {
            if (using) {
                var newPoint = {
                    "x": x,
                    "y": y
                }
                dramLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint;
            }
        }
    }
    c.onmouseup = function (aaa) {
        using = false;
    }
}

var x3 = 6
//笔尖加减
add.onclick = function () {
    x3 = x3 + 1;
}
subtraction.onclick = function () {
    x3 = x3 - 1;
}

function dramLine(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1) //起点    
    ctx.lineWidth = x3
    ctx.lineTo(x2, y2) //终点
    ctx.stroke()
    ctx.closePath()
}


//颜色选择
green.onclick = function () {
    ctx.strokeStyle = 'green'
    green.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
    black.classList.remove('active')
}
red.onclick = function () {
    ctx.strokeStyle = 'red'
    green.classList.remove('active')
    red.classList.add('active')
    blue.classList.remove('active')
    black.classList.remove('active')
}
blue.onclick = function () {
    ctx.strokeStyle = 'blue'
    green.classList.remove('active')
    red.classList.remove('active')
    blue.classList.add('active')
    black.classList.remove('active')
}
black.onclick = function () {
    ctx.strokeStyle = 'black'
    green.classList.remove('active')
    red.classList.remove('active')
    blue.classList.remove('active')
    black.classList.add('active')
}
//橡皮擦
var eraserEnabled = false //橡皮擦是否打开
pen.onclick = function () {
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
    span.style.display = 'inline'

}
eraser.onclick = function () {
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
    span.style.display = 'none'
}
//清空
empty.onclick = function () {
    location.reload();

}