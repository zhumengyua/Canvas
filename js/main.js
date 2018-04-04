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
c.onmousedown = function (aaa) {
    var x = aaa.clientX
    var y = aaa.clientY
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
c.onmousemove = function (aaa) {
    var x = aaa.clientX
    var y = aaa.clientY
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
c.onmouseup = function (aaa) {
    using = false;

}

function dramLine(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1) //起点    
    ctx.lineWidth = 5
    ctx.lineTo(x2, y2) //终点
    ctx.stroke()
    ctx.closePath()
}
//橡皮擦
var eraserEnabled = false
eraser.onclick = function () {
    eraserEnabled = !eraserEnabled
}