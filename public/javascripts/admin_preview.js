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
                    } else if ($(this)[0] === document.getElementById("textColor")){
                        document.documentElement.style.setProperty('--msg-text',value);
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
        document.getElementById("postColorDrop").setAttribute('data-bs-toggle', 'collapse');
        document.getElementById("postColorDrop").style.color = '';
        setMessageType(0);
    });

    document.getElementById("card-check").addEventListener('input', function (evt) {
        document.getElementById("postColorDrop").setAttribute('data-bs-toggle', 'collapse');
        document.getElementById("postColorDrop").style.color = '';
        setMessageType(1);
    });

    document.getElementById("pin-check").addEventListener('input', function (evt) {
        document.getElementById("postColorDrop").setAttribute('data-bs-toggle', 'collapse');
        document.getElementById("postColorDrop").style.color = '';
        setMessageType(2);
    });

    document.getElementById("tape-check").addEventListener('input', function (evt) {
        document.getElementById("postColorDrop").setAttribute('data-bs-toggle', 'collapse');
        document.getElementById("postColorDrop").style.color = '';
        setMessageType(3);
    });
    // NEW YEAR EVENT
    document.getElementById("newyear-check").addEventListener('input', function (evt) {
        document.getElementById("postColorDrop").setAttribute('data-bs-toggle', '');
        document.getElementById("postColorDrop").setAttribute('aria-expanded','false');
        document.getElementById("postColorSubmenu").classList.remove('show');
        document.getElementById("postColorDrop").style.color = 'rgb(201, 201, 201)';
        setMessageType(4);
    });
    document.getElementById("rabbit-check").addEventListener('input', function (evt) {
        document.getElementById("postColorDrop").setAttribute('data-bs-toggle', '');
        document.getElementById("postColorDrop").setAttribute('aria-expanded','false');
        document.getElementById("postColorSubmenu").classList.remove('show');
        document.getElementById("postColorDrop").style.color = 'rgb(201, 201, 201)';
        setMessageType(5);
    });
});

function setMessageType(type) {
    console.log("Initializing message type");
    document.getElementById("messages").innerHTML = "";
    document.getElementById('cardtype').href='/css/preview-postit.css';
    var str = '';
    if (type == 0) {
        document.getElementById('cardtype').href='/css/preview-card.css';
        str = `
            <div class="card board-preview card1 fly">
                <div class="msg-body">
                    <div class="msg-half">
                        <img src="/images/posts/flower-sqr.png" class="msg-img rounded" alt="..." />
                    </div>
                    <div class="msg-half msg-text"><div class="msg" style="vertical-align: middle; ">
                        This is a sample message for a flying type post-it. The user is allowed to enter up to nnn words per post. The users are able to choose the background colors from the five pre-picked colors.
                    </div>
                </div>
                </div>
                <div style="height:4.5%;border-bottom: 0.5px rgba(76, 76, 76, 0.492) solid; box-shadow: 0 1.2px 1px -1px rgba(104, 104, 104, 0.444);"></div>
                <div style="height:2.5%"></div>
                <div class="msg-footer">
                    <div style="float: left; height: 100%"> 
                        <i class="material-icons">account_circle</i><span style="vertical-align:middle;">   Anon</span>
                    </div>
                    <div style="float: right; height: 100%">
                        <i class="material-icons"> access_time</i><span style="vertical-align:middle">   December 25, 2022</span>
                    </div>
                </div>
            </div>
            <div class="card board-preview card2 fly">
                <div class="msg-body">
                    <div class="msg-half">
                        <img src="/images/posts/flower-sqr.png" class="msg-img rounded" alt="..." />
                    </div>
                    <div class="msg-half msg-text"><div class="msg" style="vertical-align: middle; ">
                        This is a sample message for a flying type post-it. The user is allowed to enter up to nnn words per post. The users are able to choose the background colors from the five pre-picked colors.
                    </div>
                </div>
                </div>
                <div style="height:4.5%;border-bottom: 0.5px rgba(76, 76, 76, 0.492) solid; box-shadow: 0 1.2px 1px -1px rgba(104, 104, 104, 0.444);"></div>
                <div style="height:2.5%"></div>
                <div class="msg-footer">
                    <div style="float: left; height: 100%"> 
                        <i class="material-icons">account_circle</i><span style="vertical-align:middle;">   Anon</span>
                    </div>
                    <div style="float: right; height: 100%">
                    <i class="material-icons"> access_time</i><span style="vertical-align:middle">   December 25, 2022</span>
                    </div>
                </div>
            </div>
            <div class="card board-preview card3 fly">
                <div class="msg-body">
                    <div class="msg-half">
                        <img src="/images/posts/flower-sqr.png" class="msg-img rounded" alt="..." />
                    </div>
                    <div class="msg-half msg-text"><div class="msg" style="vertical-align: middle; ">
                        This is a sample message for a flying type post-it. The user is allowed to enter up to nnn words per post. The users are able to choose the background colors from the five pre-picked colors.
                    </div>
                </div>
                </div>
                <div style="height:4.5%;border-bottom: 0.5px rgba(76, 76, 76, 0.492) solid; box-shadow: 0 1.2px 1px -1px rgba(104, 104, 104, 0.444);"></div>
                <div style="height:2.5%"></div>
                <div class="msg-footer">
                    <div style="float: left; height: 100%"> 
                        <i class="material-icons">account_circle</i><span style="vertical-align:middle;">   Anon</span>
                    </div>
                    <div style="float: right; height: 100%">
                    <i class="material-icons"> access_time</i><span style="vertical-align:middle">   December 25, 2022</span>
                    </div>
                </div>
            </div>
            <div class="card board-preview card4 fly">
                <div class="msg-body">
                    <div class="msg-half">
                        <img src="/images/posts/flower-sqr.png" class="msg-img rounded" alt="..." />
                    </div>
                    <div class="msg-half msg-text"><div class="msg" style="vertical-align: middle; ">
                        This is a sample message for a flying type post-it. The user is allowed to enter up to nnn words per post. The users are able to choose the background colors from the five pre-picked colors.
                    </div>
                </div>
                </div>
                <div style="height:4.5%;border-bottom: 0.5px rgba(76, 76, 76, 0.492) solid; box-shadow: 0 1.2px 1px -1px rgba(104, 104, 104, 0.444);"></div>
                <div style="height:2.5%"></div>
                <div class="msg-footer">
                    <div style="float: left; height: 100%"> 
                        <i class="material-icons">account_circle</i><span style="vertical-align:middle;">   Anon</span>
                    </div>
                    <div style="float: right; height: 100%">
                    <i class="material-icons"> access_time</i><span style="vertical-align:middle">   December 25, 2022</span>
                    </div>
                </div>
            </div>
            <div class="card board-preview card5 fly">
                <div class="msg-body">
                    <div class="msg-half">
                        <img src="/images/posts/flower-sqr.png" class="msg-img rounded" alt="..." />
                    </div>
                    <div class="msg-half msg-text"><div class="msg" style="vertical-align: middle; ">
                        A sample message for a flying type message. Users are allowed to enter up to 100 words per post. Background colors are also available as an option.
                    </div>
                </div>
                </div>
                <div style="height:4.5%;border-bottom: 0.5px rgba(76, 76, 76, 0.492) solid; box-shadow: 0 1.2px 1px -1px rgba(104, 104, 104, 0.444);"></div>
                <div style="height:2.5%"></div>
                <div class="msg-footer">
                    <div style="float: left; height: 100%"> 
                        <i class="material-icons">account_circle</i><span style="vertical-align:middle;">   Anon</span>
                    </div>
                    <div style="float: right; height: 100%">
                    <i class="material-icons"> access_time</i><span style="vertical-align:middle">   December 25, 2022</span>
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
    } else if (type ==3) {
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
    // NEW YEAR EVENT
    } else if (type == 4) {
        document.getElementById('cardtype').href='/css/preview-newyear.css';
        str = `
            <div class="card board-preview card1 fly" style="background-image:url(/images/mainboard/newyear_half.png)">
                <div class="msg-body">
                    <div class="msg-half">
                    </div>
                    <div class="msg-half msg-text"><div class="msg" style="vertical-align: middle; ">
                        This is a sample message for a new year card with text below 190 characters. The user is allowed to enter up to nnn words per post. The users are not able to choose the background colors.
                    </div>
                </div>
                </div>
            </div>
            <div class="card board-preview card2 fly" style="background-image:url(/images/mainboard/newyear_full.png)">
                <div class="msg-body">
                    <div class="msg-full">
                        This is a sample message for a new year card with text over 190 characters. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </div>
                </div>
            </div>
            <div class="card board-preview card3 fly" style="background-image:url(/images/mainboard/newyear_half.png)">
                <div class="msg-body">
                    <div class="msg-half">
                    </div>
                    <div class="msg-half msg-text"><div class="msg" style="vertical-align: middle; ">
                        This is a sample message for a new year card with text below 190 characters. The user is allowed to enter up to nnn words per post. The users are not able to choose the background colors.
                    </div>
                </div>
                </div>

            </div>
            <div class="card board-preview card4 fly" style="background-image:url(/images/mainboard/newyear_half.png)">
                <div class="msg-body">
                    <div class="msg-half">
                    </div>
                    <div class="msg-half msg-text"><div class="msg" style="vertical-align: middle; ">
                        This is a sample message for a new year card with text below 190 characters. The user is allowed to enter up to nnn words per post. The users are not able to choose the background colors.
                    </div>
                </div>
                </div>
            </div>
            <div class="card board-preview card5 fly" style="background-image:url(/images/mainboard/newyear_full.png)">
                <div class="msg-body">
                    <div class="msg-full" style="vertical-align: middle; ">
                        This is a sample message for a new year card with text over 190 characters. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </div>
                </div>
            </div>
      `;
    }
    // NEW YEAR EVENT - RABBIT
    else {
        document.getElementById('cardtype').href='/css/preview-newyear-rabbit.css';
        str = 
        `   <div class="bg-img bg-img1 bg-img-rabbit fly">
                <div class="msg-top">
                </div>
                <div class="msg-body">
                    <div class="msg-full">
                        This is a sample message for a new year card with text below 190 characters. The user is allowed to enter up to nnn words per post. The users are not able to choose the background colors.
                    </div>
                </div>
            </div>
            <div class="bg-img bg-img2 fly bg-img-rabbit">
                <div class="msg-top">
                </div>
                <div class="msg-body">
                    <div class="msg-full">
                        This is a sample message for a new year card with text over 190 characters. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </div>
                </div>
            </div>
            <div class="bg-img bg-img3 fly bg-img-rabbit">
                <div class="msg-top">
                </div>
                <div class="msg-body">
                    <div class="msg-full">
                        This is a sample message for a new year card with text below 190 characters. The user is allowed to enter up to nnn words per post. The users are not able to choose the background colors.
                    </div>
                </div>
                </div>
            </div>
            <div class="bg-img bg-img4 fly bg-img-rabbit">
                <div class="msg-top">
                </div>
                <div class="msg-body">
                    <div class="msg-full">
                        This is a sample message for a new year card with text below 190 characters. The user is allowed to enter up to nnn words per post. The users are not able to choose the background colors.
                    </div>
                </div>
            </div>
            <div class="bg-img bg-img5 fly bg-img-rabbit">
                <div class="msg-top">
                </div>
                <div class="msg-body">
                    <div class="msg-full">
                        This is a sample message for a new year card with text over 190 characters. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </div>
                </div>
            </div>
      `;
    }
    var parser = new DOMParser();
    var board = document.getElementById("messages");
    var temp = parser.parseFromString(str, "text/html");
    board.appendChild(temp.body);
}