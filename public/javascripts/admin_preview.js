$(document).ready(function () {
    $('.color-picker').each(function () {
        //
        // Dear reader, it's actually very easy to initialize MiniColors. For example:
        //
        //  $(selector).minicolors();
        //
        // The way I've done it below is just for the demo, so don't get confused
        // by it. Also, data- attributes aren't supported at this time...they're
        // only used for this demo.
        //
        $(this).minicolors({
            control: $(this).attr('data-control') || 'hue',
            defaultValue: $(this).attr('data-defaultValue') || '',
            format: $(this).attr('data-format') || 'hex',
            keywords: $(this).attr('data-keywords') || '',
            inline: $(this).attr('data-inline') === 'true',
            letterCase: $(this).attr('data-letterCase') || 'lowercase',
            opacity: $(this).attr('data-opacity'),
            position: $(this).attr('data-position') || 'bottom',
            swatches: $(this).attr('data-swatches') ? $(this).attr('data-swatches').split('|') : [],
            change: function (value, opacity) {
                if (!value) return;
                if (typeof console === 'object') {
                    if ($(this)[0] === document.getElementById("titleColor")) {
                        // change in title color (event)
                        document.getElementById("board-title").style.color = value;
                    } else if ($(this)[0] === document.getElementById("bgColor")) {
                        document.getElementById("content").style.background = value;
                    }
                }
            },
            theme: 'bootstrap'
        });

    });
});

document.getElementById("titleInput").addEventListener('input', function (evt) {
    document.getElementById("board-title").innerHTML = this.value;
});

document.getElementById("titleColor").addEventListener('input', function (evt) {
    console.log("test");
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
        document.getElementById("bgColor").value=null;
        var $inlinehex = $('#inlinecolorhex h3 small');
          $('#inlinecolors').minicolors({
            inline: true,
            theme: 'bootstrap',
            change: function(hex) {
              if(!hex) return;
              $inlinehex.html(hex);
            }
          });
        reader.readAsDataURL(input.files[0]);
    }
});

// Post Colors
document.getElementById("sky-check").addEventListener('input', function (evt) {
    console.log("Sky is selected.");
});

document.getElementById("grass-check").addEventListener('input', function(evt){
    console.log("Grass is selected.");
});

document.getElementById("card-check").addEventListener('input', function (evt) {
    setMessageType(0);     
});

document.getElementById("pin-check").addEventListener('input', function(evt){
    setMessageType(1);
});

document.getElementById("tape-check").addEventListener('input', function(evt){
    setMessageType(2);
});

function setMessageType(type){
    console.log("Initializing message type");
    document.getElementById("messages").innerHTML = "";
    var str = '';
    if (type == 0){
        str = `<div class="paper green"> 
            <div class = "content">
                <div class="upper-part">
                    <div class="left-half">
                        <img class="message-img" src="/images/posts/cat.jpg">
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
                        <img class="message-img" src="/images/posts/cat.jpg">
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
    } else if (type == 1){
        str = `<div class="paper green animate">
            <div class="top-pin pin_blue">
                <div class="top-pin-head">
                    <div class="top-pin-highlight"></div>
                </div>
                </div>
            <div class = "message-content">
                <div class="upper-part">
                    <div class="left-half">
                        <img class="message-img" src="/images/posts/cat.jpg">
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
                        <img class="message-img" src="/images/posts/wave.jpg">
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
        </div>`;
    } else {
        str = `<div class="paper green"> 
        <div class="top-tape"></div>
        <div class = "content">
            <div class="upper-part">
                <div class="left-half">
                    <img class="message-img" src="/images/posts/cat.jpg">
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
                    <img class="message-img" src="/images/posts/wave.jpg">
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
}