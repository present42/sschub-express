// var row = document.getElementsByClassName('row1')[0];
// console.log(row);
// row.classList.addClass('horizTranslate');
// console.log(row.ClassList);

var count = 0;
var messages = {};
let pid;

var webSocket = new WebSocket('ws://172.105.206.64/websockets');
webSocket.onopen = function (event) {
  pid = setInterval(() => {webSocket.send(JSON.stringify({msg: "give me new message"}));}, 6000);
};

webSocket.onmessage = function (event) {
  data = JSON.parse(event.data);
  console.log(JSON.parse(event.data));
  l = ['bg', 'md'];
  createNewMessage(0, 0, l[getRandomInt(0, 1)], data.message, data.nickname, data.email, data.imagepath);
}

webSocket.onclose = function (event) {
  clearInterval(pid);
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
 function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createNewMessage(pos_x = 0, pos_y = 0, size = 'md', message=". This content is a little bit longer.", nickname="hyunju", email="hyunju@connect.abc.com") {
  color_list = ["rgba()", "#eee4da", "#edc22e"];
  color = getRandomInt(0, 2);
  color = color_list[color];
  
  console.log(size);
    var height = 16,
        width = 16,
        top = 2;
    var cur = count++;
    if (size == 'bg') {
        height = 25;
        width = 25;
        // top: 2 - 73
        top = getRandomInt(2, 73);
    } else if (size == 'md') {
        height = 20;
        width = 20;
        // top: 2 - 79
        top = getRandomInt(2, 79);
    } else {
        size = "sm";
        // top: 2 - 82
        top = getRandomInt(2, 82);
    }

    console.log(pos_y);
    var str = `<div id="${cur}" class="card position-absolute card-${size}" style="background: ${color};top: ${top}%; left: -30%; height: ${height}vh; width: ${width}vw">
        <div class="row g-0 upper-part">
          <div class="col-md-6">
            <img src="/images/wave.jpg" class="card-img" alt="..." />
          </div>
          <div class="col-md-6 full-height">
            <div class="card-body">
              <p class="card-text">${message}</p>
            </div>
          </div>
        </div>
        <div class="card-footer lower-part">
          <i class="material-icons" style="font-size: 1.5vh">
            account_circle</i
          >
          ${nickname}
          <i class="material-icons" style="font-size: 1.5vh"> mail</i>
          ${email}
        </div>
      </div>`;
    var parser = new DOMParser();
    var container = document.getElementById("container");
    var temp = parser.parseFromString(str, "text/html");
    messages[cur] = temp.body.firstChild;
    temp.body.firstChild.addEventListener('animationiteration', () => {
        console.log(`animation (id:${cur}) iteration finished`);
        deleteMessage(cur);
    })
    return [container.appendChild(temp.body.firstChild), cur];
}

function deleteMessage(id) {
    if (id in messages) {
        messages[id].remove();
    }
}

l = ['bg', 'md']

// setInterval(() => createNewMessage(0, 0, l[getRandomInt(0, 1)]), 6000)