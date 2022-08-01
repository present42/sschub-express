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