
function setcolor(list){
  console.log(list[0]);
  document.getElementById("color1").style.background = list[0];
  document.getElementById("color2").style.background = list[1];
  document.getElementById("color3").style.background = list[2];
  document.getElementById("color4").style.background = list[3];
  document.getElementById("color5").style.background = list[4];
}

window.onload = (event) => {
  let area = document.querySelector("#message");
  let word_count = document.querySelector("#word-count");

  let imgInp = document.querySelector("#formFile");

  let thumbnail = document.querySelector("img.img-thumbnail");
  let thumbnail_crop = document.querySelector("img#crop_img_tool");
  let preview_button = document.querySelector("button.btn-secondary");
  let crop_button = document.querySelector("button#crop_done");
  let submit_button = document.querySelector("button#submit_button");
  let crop_input = document.querySelector("input#formFile_crop");
  let crop_cancel_button = document.querySelector("button#crop_cancel");

  const myModal = new bootstrap.Modal(document.getElementById('cropImageModal'));
  var cropper;
  const form_data = new FormData();
  var color_list;
  let pid;
  console.log("new Obj");
  //var webSocket = new WebSocket('ws://localhost:3000/websockets');
  var webSocket = new WebSocket('ws://143.89.6.61/websockets');
  webSocket.onopen = function (event) {
      pid = webSocket.send(JSON.stringify({ msg: "give me new message" }));
      console.log(pid);
  };

  webSocket.onmessage = function(event) {
    
    data = JSON.parse(event.data);
    board_details = data[1][0];
    color_list = board_details.post_colors.split('  ');
    console.log(color_list);
    setcolor(color_list);
    data = data[0];
  }
  

  area.addEventListener(
    "input",
    function () {
      temp = area.value.trim();
      word_count.textContent =
        temp != "" ? (temp.match(/ /g) || []).length + 1 : 0;
    },
    false
  );

  imgInp.onchange = (evt) => {
    myModal.show();
  };
  
  document.querySelectorAll('textarea[data-max-words]').forEach(input => {
    // Remember the word limit for the current input
    let maxWords = parseInt(input.getAttribute('data-max-words') || 0)
    // Add an eventlistener to test for key inputs
    input.addEventListener('keydown', e => {
      let target = e.currentTarget
      // Split the text in the input and get the current number of words
      let words = target.value.split(/\s+/).length
      // If the word count is > than the max amount and a space is pressed
      // Don't allow for the space to be inserted
      if (!target.getAttribute('data-announce'))
        // Note: this is a shorthand if statement
        // If the first two tests fail allow the key to be inserted
        // Otherwise we prevent the default from happening
        words >= maxWords && e.keyCode == 32 && e.preventDefault()
      else
        words >= maxWords && e.keyCode == 32 && (e.preventDefault() || alert('Word Limit Reached'))
    })
  })


  let crop_modal = document.getElementById("cropImageModal");
  crop_modal.addEventListener('shown.bs.modal', (evt) => {
    const [file] = imgInp.files;
    if (file) {
      thumbnail_crop.src = URL.createObjectURL(file);
      document.getElementById("spinner").style.setProperty('display', 'none', 'important');
    }

    cropper = new Cropper(thumbnail_crop, {
      aspectRatio: 1 / 1,
      crop(event) {
        console.log(event.detail.x);
        console.log(event.detail.y);
        console.log(event.detail.width);
        console.log(event.detail.height);
        console.log(event.detail.rotate);
        console.log(event.detail.scaleX);
        console.log(event.detail.scaleY);
      }
    });
  });

  const toastLiveExample = document.getElementById('liveToast')
  console.log(location.href.split('/')[3] == 'form?success');
  if (location.href.split('/')[3] == 'form?success') {
    const toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
  }

  preview_button.onclick = (evt) => {
  }

  crop_button.onclick = (evt) => {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => {
        thumbnail.src = URL.createObjectURL(blob);
        // crop_input.value = blob;
        let cropped_file = new File([blob], "cropped_file", {type:"image/png", lastModified: new Date().getTime()});
        let container = new DataTransfer();
        container.items.add(cropped_file);
        imgInp.files = container.files;
      });
      cropper.destroy();
    }
    myModal.hide();
    thumbnail_crop.src = '';
    document.getElementById("spinner").style.display = '';
  };

  crop_cancel_button.onclick = (evt) => {
    if(cropper) cropper.destroy();
    myModal.hide();
    thumbnail_crop.src = '';
    document.getElementById("spinner").style.display = '';
  }

  
};