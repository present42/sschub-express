// var row = document.getElementsByClassName('row1')[0];
// console.log(row);
// row.classList.addClass('horizTranslate');
// console.log(row.ClassList);
// (() => {
var count = 0;
var messages = {};
let pid;

var webSocket = new WebSocket('ws://localhost:3000/websockets');
var board_details;
var color_list;

webSocket.onopen = function (event) {
  pid = setInterval(() => { webSocket.send(JSON.stringify({ msg: "give me new message" })); }, 9000);
};

webSocket.onmessage = function (event) {
  data = JSON.parse(event.data);
  console.log(data);

  board_details = data[1][0];
  color_list = board_details.post_colors.split('  ');
  
  var board_title = document.getElementById("board_title");
  board_title.innerHTML = board_details.title;
  board_title.style.color = board_details.title_color;
  data = data[0];

  console.log(JSON.parse(event.data));
  l = ['bg', 'md'];
  createNewMessage(0, 0, l[getRandomInt(0, 1)], data.message, data.nickname, data.email, data.image_path, data.approved_time);
  textFit(document.getElementsByClassName('card-text'));
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

function createNewMessage(pos_x = 0, pos_y = 0, size = 'md', message = ". This content is a little bit longer.", nickname = "hyunju", email = "hyunju@connect.abc.com", filename, time) {
  console.log(board_details);
  // color_list = ["rgba(255, 255, 255, 0.856)", "rgba(238, 228, 218, 0.87)", "rgba(237, 194, 46, 0.87)"];
  color = getRandomInt(0, 2);
  color = color_list[color];


  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  var date = undefined;
  if (time) date = new Date(time);

  console.log(time);
  console.log(size);
  var height = 16,
    width = 16,
    top = 2;
  var cur = count++;
  if (size == 'bg') {
    height = 25;
    width = 25 * 2.25;
    // top: 2 - 73
    top = getRandomInt(2, 73);
  } else if (size == 'md') {
    height = 20;
    width = 45;
    // top: 2 - 79
    top = getRandomInt(2, 79);
  } else {
    size = "sm";
    // top: 2 - 82
    top = getRandomInt(2, 82);
  }

  console.log(pos_y);
  var str = `<div id="${cur}" class="card position-absolute card-${size}" style="background: ${color};top: ${top}%; left: -30%; height: ${height}vh; width: ${width}vh">
        <div class="row g-0">
          <div class="col-md-6 full-height" style="padding: 0.5vh">
            <img src="/images/posts/${filename}" class="card-img" alt="..." />
          </div>
          <div class="col-md-6 full-height">
            <div class="card-body">
              <p class="card-text">${message}</p>
            </div>
          </div>
        </div>
        <div class="card-footer lower-part" style="clear: both">
          <div style="float: left; font-size: 1.8vh"> 
          ${nickname ? `<i class="material-icons" style="font-size: 1.5vh">
          account_circle</i
        > ${nickname}` : ""}
          </div>
          <div style="float: right; font-size: 1.8vh">
          ${date ? `<i class="material-icons" style="font-size: 1.5vh"> access_time</i> ${monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()}` : ""}
          </div>
        </div>
      </div>`;

  var str_without_img = `<div id="${cur}" class="card position-absolute card-${size}" style="background: ${color};top: ${top}%; left: -30%; height: ${height}vh; width: ${width}vh">
    <div class="row g-0 upper-part">
      <div class="col-md-12 full-height">
        <div class="card-body">
          <p class="card-text">${message}</p>
        </div>
      </div>
    </div>
    <div class="card-footer lower-part" style="clear: both">
          <div style="float: left"> 
          ${nickname ? `<i class="material-icons" style="font-size: 1.5vh">
          account_circle</i
        > ${nickname}` : ""}
          </div>
          <div style="float: right">
          ${date ? `<i class="material-icons" style="font-size: 1.5vh"> mail</i> ${monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()}` : ""}
          </div>
        </div>
  </div>`;

  var str_without_text = `<div id="${cur}" class="card position-absolute card-${size}" style="background: ${color};top: ${top}%; left: -30%; height: ${height}vh; width: ${width}vh">
  <div class="row g-0">
    <div class="col-md-12 full-height">
      <img src="/images/posts/${filename}" class="card-img" alt="..." />
    </div>
  </div>
  <div class="card-footer lower-part" style="clear: both">
          <div style="float: left"> 
          ${nickname ? `<i class="material-icons" style="font-size: 1.5vh">
          account_circle</i
        > ${nickname}` : ""}
          </div>
          <div style="float: right">
          ${date ? `<i class="material-icons" style="font-size: 1.5vh"> mail</i> ${monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()}` : ""}
          </div>
        </div>
</div>`;
  var parser = new DOMParser();
  var container = document.getElementById("container");
  if (filename) {
    if (message) {
      var temp = parser.parseFromString(str, "text/html");
    } else {
      var temp = parser.parseFromString(str_without_text, "text/html");
    }

  } else {
    var temp = parser.parseFromString(str_without_img, "text/html");
  }
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
// })();

// setInterval(() => createNewMessage(0, 0, l[getRandomInt(0, 1)]), 6000)