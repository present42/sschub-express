function rgbToHex(rgb) {
    rgb = rgb.split("(")[1].split(")")[0];
    rgb = rgb.split(",");
    var hex = rgb.map(function(x){             //For each array element
        x = parseInt(x).toString(16);      //Convert to a base16 string
        return (x.length==1) ? "0"+x : x;  //Add zero if we get only one character
    })
    hex = "#"+hex.join("");
    return hex;
  }

function darkerColor(hexInput, percent) {
    let hex = hexInput;

    // strip the leading # if it's there
    hex = hex.replace(/^\s*#|\s*$/g, "");

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if (hex.length === 3) {
        hex = hex.replace(/(.)/g, "$1$1");
    }

    let r = parseInt(hex.substr(0, 2), 16);
    let g = parseInt(hex.substr(2, 2), 16);
    let b = parseInt(hex.substr(4, 2), 16);

    const calculatedPercent = (100 + percent) / 100;

    r = Math.round(Math.min(255, Math.max(0, r * calculatedPercent)));
    g = Math.round(Math.min(255, Math.max(0, g * calculatedPercent)));
    b = Math.round(Math.min(255, Math.max(0, b * calculatedPercent)));

    return `#${r.toString(16).toUpperCase()}${g.toString(16).toUpperCase()}${b
        .toString(16)
        .toUpperCase()}`;
}

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
                    } else if ($(this)[0] === document.getElementById("post_color_1")) {
                        document.documentElement.style.setProperty('--msg1',value);
                        document.querySelector(".card1").style.setProperty('--paper-dark',darkerColor(rgbToHex(value), 20));
                    } else if ($(this)[0] === document.getElementById("post_color_2")) {
                        document.documentElement.style.setProperty('--msg2',value);
                        document.querySelector(".card2").style.setProperty('--paper-dark',darkerColor(rgbToHex(value), 20));
                    } else if ($(this)[0] === document.getElementById("post_color_3")) {
                        document.documentElement.style.setProperty('--msg3',value);
                        document.querySelector(".card3").style.setProperty('--paper-dark',darkerColor(rgbToHex(value), 20));
                    } else if ($(this)[0] === document.getElementById("post_color_4")) {
                        document.documentElement.style.setProperty('--msg4',value);
                        document.querySelector(".card4").style.setProperty('--paper-dark',darkerColor(rgbToHex(value), 20));
                    } else if ($(this)[0] === document.getElementById("post_color_5")) {
                        document.documentElement.style.setProperty('--msg5',value);
                        document.querySelector(".card5").style.setProperty('--paper-dark',darkerColor(rgbToHex(value), 20));
                    }
                }
            },
            theme: 'bootstrap'
        });

    });

    document.getElementById("titleInput").addEventListener('input', function (evt) {
        document.getElementById("board-title").innerHTML = this.value;
    });

    document.getElementById("customFile").addEventListener('input', function (evt) {
        var input = this;
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                document.getElementById("content").style.backgroundImage = 'url(' + e.target.result + ')';
            };
            document.getElementById("bgColor").value = null;
            var $inlinehex = $('#inlinecolorhex h3 small');
            $('#inlinecolors').minicolors({
                inline: true,
                theme: 'bootstrap',
                change: function (hex) {
                    if (!hex) return;
                    $inlinehex.html(hex);
                }
            });
            reader.readAsDataURL(input.files[0]);
        }
    });

    document.getElementById("flying-check").addEventListener('input', function (evt) {
        setMessageType(0);
    });

    document.getElementById("card-check").addEventListener('input', function (evt) {
        setMessageType(1);
    });

    document.getElementById("pin-check").addEventListener('input', function (evt) {
        setMessageType(2);
    });

    document.getElementById("tape-check").addEventListener('input', function (evt) {
        setMessageType(3);
    });
});

function setMessageType(type) {
    console.log("Initializing message type");
    document.getElementById("messages").innerHTML = "";
    document.getElementById('cardtype').href='/css/style_postit.css';
    var str = '';
    if (type == 0) {
        document.getElementById('cardtype').href='/css/style_card.css';
        str = `
        <div class="card position-absolute flying-md card1">
            <div class="row g-0">
                <div class="col-md-6 full-height" style="padding: 0.5vh">
                    <img src="/images/posts/cat.jpg" class="flying-img" alt="..." />
                </div>
                <div class="col-md-6 full-height">
                    <div class="card-body">
                        <p class="card-text">This is a sample message for a flying type post-it. The user is allowed to enter up to nnn words per post. The users are able to choose the background colors from the five pre-picked colors.</p>
                    </div>
                </div>
            </div>
            <div class="card-footer lower-flying">
                <i class="fa-solid fa-circle-user icon"></i>username
            </div>
        </div>
        <div class="card position-absolute flying-md card2">
            <div class="row g-0">
                <div class="col-md-6 full-height" style="padding: 0.5vh">
                    <img src="/images/posts/cat.jpg" class="flying-img" alt="..." />
                </div>
                <div class="col-md-6 full-height">
                    <div class="card-body">
                        <p class="card-text">This is a sample message for a flying type post-it. The user is allowed to enter up to nnn words per post. The users are able to choose the background colors from the five pre-picked colors.</p>
                    </div>
                </div>
            </div>
            <div class="card-footer lower-flying" style="clear: both">
                <i class="fa-solid fa-circle-user icon"></i>username
            </div>
        </div>
        <div class="card position-absolute flying-md card3">
            <div class="row g-0">
                <div class="col-md-6 full-height" style="padding: 0.5vh">
                    <img src="/images/posts/cat.jpg" class="flying-img" alt="..." />
                </div>
                <div class="col-md-6 full-height">
                    <div class="card-body">
                        <p class="card-text">This is a sample message for a flying type post-it. The user is allowed to enter up to nnn words per post. The users are able to choose the background colors from the five pre-picked colors.</p>
                    </div>
                </div>
            </div>
            <div class="card-footer lower-flying">
                <i class="fa-solid fa-circle-user icon"></i>username
            </div>
        </div>
        <div class="card position-absolute flying-md card4">
            <div class="row g-0">
                <div class="col-md-6 full-height" style="padding: 0.5vh">
                    <img src="/images/posts/flower-sqr.png" class="flying-img" alt="..." />
                </div>
                <div class="col-md-6 full-height">
                    <div class="card-body">
                        <p class="card-text">This is a sample message for a flying type post-it. The user is allowed to enter up to nnn words per post. The users are able to choose the background colors from the five pre-picked colors.</p>
                    </div>
                </div>
            </div>
            <div class="card-footer lower-flying" style="clear: both">
            <i class="fa-solid fa-circle-user icon"></i>username
            </div>
        </div>
        <div class="card position-absolute flying-md card5">
        <div class = "message-content">
            <div class="row g-0">
                <div class="col-md-6 full-height" style="padding: 0.5vh">
                    <img src="/images/posts/wave.jpg" class="flying-img" alt="..." />
                </div>
                <div class="col-md-6 full-height">
                    <div class="card-body">
                        <p class="card-text">This is a sample message for a flying type post-it. The user is allowed to enter up to nnn words per post. The users are able to choose the background colors from the five pre-picked colors.</p>
                    </div>
                </div>
            </div>
            <div class="card-footer lower-flying" style="clear: both">
                <i class="fa-solid fa-circle-user icon"></i>username
            </div>
            </div>
        </div>
      `;
    } else if (type == 1) {
        str = `<div class="paper green card1"> 
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
                <i class="fa-solid fa-circle-user icon"></i>
                        User_2
                </div>
            </div>
            <div class="paper pink card2"> 
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
                <i class="fa-solid fa-circle-user icon"></i>User_2
                </div>
            </div>
            <div class="paper pink card3"> 
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
                <i class="fa-solid fa-circle-user icon"></i>User_2
                </div>
            </div>
            <div class="paper pink card4"> 
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
                <i class="fa-solid fa-circle-user icon"></i>User_2
                </div>
            </div>
            <div class="paper pink card5"> 
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
                <i class="fa-solid fa-circle-user icon"></i>User_2
                </div>
            </div>`;
    } else if (type == 2) {
        str = `<div class="paper green animate card1">
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
                <i class="fa-solid fa-circle-user icon"></i>User_1
                </div>
            </div>
        </div>
        <div class="paper pink animate card2">
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
                <i class="fa-solid fa-circle-user icon"></i>User_2
                </div>
            </div>
        </div>
        <div class="paper green animate card3">
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
                <i class="fa-solid fa-circle-user icon"></i>User_1
                </div>
            </div>
        </div>
        <div class="paper green animate card4">
            <div class="top-pin pin_red">
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
                <i class="fa-solid fa-circle-user icon"></i>User_1
                </div>
            </div>
        </div>
        <div class="paper green animate card5">
            <div class="top-pin pin_yellow">
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
                <i class="fa-solid fa-circle-user icon"></i>User_1
                </div>
            </div>
        </div>`;
    } else {
        str = `<div class="paper green card1"> 
        <div class="top-tape"></div>
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
            <i class="fa-solid fa-circle-user icon"></i>User_2
            </div>
        </div>
        <div class="paper pink card2"> 
        <div class="top-tape"></div>
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
            <i class="fa-solid fa-circle-user icon"></i>User_2
            </div>
        </div>
        <div class="paper pink card3"> 
        <div class="top-tape"></div>
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
            <i class="fa-solid fa-circle-user icon"></i>User_2
            </div>
        </div>
        <div class="paper pink card4"> 
        <div class="top-tape"></div>
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
            <i class="fa-solid fa-circle-user icon"></i>User_2
            </div>
        </div>
        <div class="paper pink card5"> 
        <div class="top-tape"></div>
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
            <i class="fa-solid fa-circle-user icon"></i>User_2
            </div>
        </div>`;
    }
    var parser = new DOMParser();
    var board = document.getElementById("messages");
    var temp = parser.parseFromString(str, "text/html");
    board.appendChild(temp.body);
}