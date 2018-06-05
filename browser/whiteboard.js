window.whiteboard = new window.EventEmitter();

(function () {

    var color;

    var colorElements = [].slice.call(document.querySelectorAll('.marker'));

    colorElements.forEach(function (el) {

        el.style.backgroundColor = el.id;

        el.addEventListener('click', function () {
            color = this.id;
            document.querySelector('.selected').classList.remove('selected');
            this.classList.add('selected');
        });

    });

    var canvas = document.querySelector('#paint');
    var sketch = document.querySelector('#sketch');
    var sketchStyle = getComputedStyle(sketch);

    canvas.width = parseInt(sketchStyle.getPropertyValue('width'));
    canvas.height = parseInt(sketchStyle.getPropertyValue('height'));

    var ctx = canvas.getContext('2d');

    ctx.lineWidth = 5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    var currentMousePosition = {
        x: 0,
        y: 0
    };

    var lastMousePosition = {
        x: 0,
        y: 0
    };

    var drawing = false;

    canvas.addEventListener('mousedown', function (e) {
        drawing = true;
        currentMousePosition.x = e.pageX - this.offsetLeft;
        currentMousePosition.y = e.pageY - this.offsetTop;
    });

    canvas.addEventListener('mouseup', function () {
        drawing = false;
    });

    canvas.addEventListener('mousemove', function (e) {

        if (!drawing) return;

        lastMousePosition.x = currentMousePosition.x;
        lastMousePosition.y = currentMousePosition.y;

        currentMousePosition.x = e.pageX - this.offsetLeft;
        currentMousePosition.y = e.pageY - this.offsetTop;

        whiteboard.draw(lastMousePosition, currentMousePosition, color, true);

    });

    whiteboard.draw = function (start, end, strokeColor, shouldBroadcast) {

        ctx.beginPath();
        ctx.strokeStyle = strokeColor || 'black';
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.closePath();
        ctx.stroke();

        if (shouldBroadcast) {
            whiteboard.emit('draw', start, end, strokeColor);
        }

    };

})();