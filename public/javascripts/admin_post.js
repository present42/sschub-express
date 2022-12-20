
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createNewMessage(id, size = 'md', message = "This content is a little bit longer.", nickname = "hyunju", filename, time) {
  // color_list = ["rgba(255, 255, 255, 0.856)", "rgba(238, 228, 218, 0.87)", "rgba(237, 194, 46, 0.87)"];
  // color = getRandomInt(0, 2);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  var date = undefined;
  if (time) date = new Date(time);
  
  var str = `<div class="card ${size}" style="background: white; ">
        <div class="msg-body">
          <div class="msg-half">
            <img src="/images/posts/${filename}" class="msg-img rounded" alt="..." />
          </div>
          <div class="msg-half msg-text"><div id=${id} class="msg" style="vertical-align: middle; ">
              ${message}
              </div>
          </div>
        </div>
        <div style="height:4.5%;border-bottom: 0.5px rgba(76, 76, 76, 0.492) solid; box-shadow: 0 1.2px 1px -1px rgba(104, 104, 104, 0.444);"></div>
        <div style="height:2.5%"></div>
        <div class="msg-footer">
          <div style="float: left; height: 100%"> 
          ${nickname ? `<i class="material-icons">account_circle</i><span style="vertical-align:middle;">   ${nickname}</span>` : ""}
          </div>
          <div style="float: right; height: 100%">
          ${date ? `<i class="material-icons"> access_time</i><span style="vertical-align:middle">   ${monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()}</span>` : ""}
          </div>
        </div>
      </div>`;

  var str_without_img = `<div class="card ${size}" style="background: white;">
    <div class="msg-body">
      <div class="msg-text" style="padding: 0 0 0 0">
        <div class="msg" id=${id} style="vertical-align: middle;">
          ${message}
        </div>
      </div>
    </div>
    <div style="height:4.5%;border-bottom: 0.5px rgba(76, 76, 76, 0.492) solid; box-shadow: 0 1.2px 1px -1px rgba(104, 104, 104, 0.444);"></div>
    <div style="height:2.5%"></div>
    <div class="msg-footer">
      <div style="float: left; height: 100%;"> 
      ${nickname ? `<i class="material-icons">account_circle</i><span style="vertical-align:middle">${nickname}</span>` : ""}
      </div>
      <div style="float: right; height: 100%">
      ${date ? `<i class="material-icons"> access_time</i><span style="vertical-align:middle">${monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()}</span>` : ""}
    </div>
  </div>`;

  var str_without_text = `<div class="card ${size}" style="background: white;">
  <div class="msg-body">
    <div class="msg-image">
      <img src="/images/posts/${filename}" class="msg-img" alt="..." />
    </div>
  </div>
  <div style="height:4.5%;border-bottom: 0.5px rgba(76, 76, 76, 0.492) solid; box-shadow: 0 1.2px 1px -1px rgba(104, 104, 104, 0.444);"></div>
    <div style="height:2.5%"></div>
    <div class="msg-footer">
      <div style="float: left; height: 100%"> 
      ${nickname ? `<i class="material-icons">account_circle</i><span style="vertical-align:middle;">${nickname}</span>` : ""}
      </div>
      <div style="float: right; height: 100%">
      ${date ? `<i class="material-icons"> access_time</i><span style="vertical-align:middle">${monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()}</span>` : ""}
    </div>
</div>`;
var parser = new DOMParser();
var container = document.getElementById("modal-content");
container.innerHTML = '';
if(filename) {
  var temp = parser.parseFromString(str, "text/html");
} else {
  var temp = parser.parseFromString(str_without_img, "text/html");  
} 
  return [container.appendChild(temp.body.firstChild)];
}