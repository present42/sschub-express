var btn_delete = document.querySelector("#delete");


btn_delete.addEventListener("click", function(e) {
   this.classList.toggle("is-active"); 
   console.log(document.querySelectorAll('.board'));
   document.querySelectorAll('.board').forEach(function(i){
    console.log(i);
     i.classList.toggle("select");
   });
   document.querySelectorAll('.thumbnail').forEach(function(i){
    i.disabled = !i.disabled;
   });
   document.querySelectorAll('.img-inside-button').forEach(function(i){
    i.disabled = !i.disabled;
   });
});