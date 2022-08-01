var btn_delete = document.querySelector("#delete");
var board = document.querySelectorAll('.board');

/* OnClick event handler for every board */

board.forEach(function(i){
    i.addEventListener("click", e => {
        console.log("Board ID ", e.target.id, " was clicked");
    });
});

/* Funtion for deleting boards */

function deleteBoards(){
    if (confirm("Are you sure you want to delete these boards?")){
        /* Collect selected boards */
        /* Send selected board id to route */
        console.log("Delete boards.");
    }
}

/* Event handler for delete button */

btn_delete.addEventListener("click", function(e) {
    /* Delete selected boards when delete button is-active */
   this.classList.forEach(function(i){
     if (i == 'is-active'){
        deleteBoards();
     }
   });
   /* Activates/Deactivates delete button */
   this.classList.toggle("is-active");
   document.querySelector('.floating-container').classList.toggle("is-active");
   /* Activates/Deactivates selection for each boards */
   board.forEach(function(i){
        i.classList.toggle("select");  
   });

   /* Ables/Disables redirection to editing page */
   document.querySelectorAll('.thumbnail').forEach(function(i){
    i.disabled = !i.disabled;
   });
});

