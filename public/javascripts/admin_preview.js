import boardDetailsAPI from "../javascripts/admin_board_detailsAPI.js";

document.getElementById("titleInput").addEventListener('input', function (evt) {
    document.getElementById("board-title").innerHTML = this.value;
});

document.getElementById("titleColor").addEventListener('input', function (evt) {

    document.getElementById("board-title").style.color = color;
    console.log(document.getElementById("board-title").style);
});


document.getElementById("customFile").addEventListener('input', function (evt) {
    var input = this;
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById("content").style.backgroundImage = 'url(' + e.target.result + ')';
        };

        reader.readAsDataURL(input.files[0]);
    }
});
console.log(document.getElementById("theme-check"));

document.getElementById("theme-check").addEventListener('input', function (evt) {
    var input = new FormData(this);
    var output = "";
    //entry[1] is the value of selected
    for (const entry of input) {
        output = output + entry[0] + "=" + entry[1] + "\r";
      };

    console.log(output);
});

document.getElementById("type-check").addEventListener('input', function (evt) {
    var input = new FormData(this);
    for (const entry of input) {
        document.getElementById("messages").innerHTML = "";
        if (entry[1] == 'pin'){
            var str = `<div class="paper green animate">
            <div class="top-pin pin_blue">
                <div class="top-pin-head">
                    <div class="top-pin-highlight"></div>
                </div>
                </div>
            <div class = "message-content">
                <div class="upper-part">
                    <div class="left-half">
                        <img class="message-img" src="../resources/cat.jpg">
                    </div>
                    <div class="right-half">
                        <p class="card-text">This is a sample message for a pin type post-it. The user is allowed to enter up to nnn words per post. They can choose the color of the post-it, but the pin color will be randomized.</p>
                    </div>
                </div>
                <div class="card-footer lower-part">
                    <i class="material-icons" style="font-size: 1.5vh; margin-right:1vh">
                        account_circle</i>User_1
                </div>
            </div>
        </div>
        <div class="paper pink animate">
            <div class="top-pin pin_yellow">
                <div class="top-pin-head">
                    <div class="top-pin-highlight"></div>
                </div>
            </div>
            <div class = "message-content">
                <div class="upper-part">
                    <div class="left-half">
                        <img class="message-img" src="../resources/wave.jpg">
                    </div>
                    <div class="right-half">
                        <p class="card-text">This is a sample message for a pin type post-it. The user is allowed to enter up to nnn words per post. They can choose the color of the post-it, but the pin color will be randomized.</p>
                    </div>
                </div>
                <div class="card-footer lower-part">
                    <i class="material-icons" style="font-size: 1.5vh; margin-right:1vh">
                        account_circle</i>User_2
                </div>
            </div>
        </div>`;}else if (entry[1]=="tape") {
                var str = `<div class="paper green"> 
            <div class="top-tape"></div>
            <div class = "content">
                <div class="upper-part">
                    <div class="left-half">
                        <img class="message-img" src='../resources/wave.jpg'>
                    </div>
                    <div class="right-half">
                        <p class="card-text">This is a sample message for a pin type post-it. The user is allowed to enter up to nnn words per post. They can choose the color of the post-it, but the pin color will be randomized.</p>
                    </div>
                </div>
                <div class="card-footer lower-part">
                    <i class="material-icons" style="font-size: 1.5vh; margin-right:1vh">
                        account_circle</i>User_2
                </div>
            </div>
            <div class="paper pink"> 
            <div class="top-tape"></div>
            <div class = "content">
                <div class="upper-part">
                    <div class="left-half">
                        <img class="message-img" src='../resources/wave.jpg'>
                    </div>
                    <div class="right-half">
                        <p class="card-text">This is a sample message for a pin type post-it. The user is allowed to enter up to nnn words per post. They can choose the color of the post-it, but the pin color will be randomized.</p>
                    </div>
                </div>
                <div class="card-footer lower-part">
                    <i class="material-icons" style="font-size: 1.5vh; margin-right:1vh">
                        account_circle</i>User_2
                </div>
            </div>`;
            }else{
                var str = `<div class="paper green"> 
            <div class = "content">
                <div class="upper-part">
                    <div class="left-half">
                        <img class="message-img" src='../resources/wave.jpg'>
                    </div>
                    <div class="right-half">
                        <p class="card-text">This is a sample message for a pin type post-it. The user is allowed to enter up to nnn words per post. They can choose the color of the post-it, but the pin color will be randomized.</p>
                    </div>
                </div>
                <div class="card-footer lower-part">
                    <i class="material-icons" style="font-size: 1.5vh; margin-right:1vh">
                        account_circle</i>User_2
                </div>
            </div>
            <div class="paper pink"> 
            <div class = "content">
                <div class="upper-part">
                    <div class="left-half">
                        <img class="message-img" src='../resources/wave.jpg'>
                    </div>
                    <div class="right-half">
                        <p class="card-text">This is a sample message for a pin type post-it. The user is allowed to enter up to nnn words per post. They can choose the color of the post-it, but the pin color will be randomized.</p>
                    </div>
                </div>
                <div class="card-footer lower-part">
                    <i class="material-icons" style="font-size: 1.5vh; margin-right:1vh">
                        account_circle</i>User_2
                </div>
            </div>`;
            }
            var parser = new DOMParser();
            var board = document.getElementById("messages");
            var temp = parser.parseFromString(str, "text/html");
            board.appendChild(temp.body);
            return;
      };
});

