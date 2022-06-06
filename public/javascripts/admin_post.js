
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createNewMessage(size = 'md', message=". This content is a little bit longer.", nickname="hyunju", email="hyunju@connect.abc.com", image_path) {
    color_list = ["rgba()", "#eee4da", "#edc22e"];
    color = getRandomInt(0, 2);
    color = color_list[color];
    
    console.log(size);
      var height = 16,
          width = 16,
          top = 2;
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
  
      var str = `<div class="card card-md" style="background: ${color}; aspect-ratio: 16 / 9; width: fit-content;">
          <div class="row g-0 upper-part">
            <div class="col-md-6">
              <img src="${ image_path ? '/images/posts/' + image_path : '/images/wave.jpg'}" class="card-img" alt="..." />
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

        var str_without_img = `<div class="card card-md" style="background: ${color}; aspect-ratio: 16 / 9; width: fit-content;">
                    <div class="row g-0 upper-part">
                    <div class="col-md-12 full-height">
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
      var container = document.getElementById("modal-content");
      container.innerHTML = '';
      console.log("test", image_path);
      if(image_path) {
        var temp = parser.parseFromString(str, "text/html");
      } else {
        var temp = parser.parseFromString(str_without_img, "text/html");  
      } 
      

      return [container.appendChild(temp.body.firstChild), cur];
  }

// import postAPI from "./api/postAPI.js";

// console.log(postAPI.getItems(1));

// var boards = [b1posts,b2posts]

// function showPost(posts) {

// }

// $.each(boards,function(posts){
//     $.each(posts,function(){
        
//     });
    
// });

// document.getElementById("reject").onclick = function(){
//     post["status"] = 2;
//     console.log(post);
// }

// document.getElementById("approve").onclick = function(){
//     post["status"] = 1;
//     console.log(post);
// }

