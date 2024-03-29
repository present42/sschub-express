var btn_delete = document.querySelector("#delete");
var btn_cancel = document.querySelector("#cancel");
var board = document.querySelectorAll('.selectable');

/* OnClick event handler for every board */

board.forEach(function(i){
    i.addEventListener("click", e=> {
        console.log("Board ID ", i.id, " was clicked");
    });
});

/* Funtion for deleting boards */

function deleteBoards(){
    var board_id=[];
    /* Collect selected boards */
    board.forEach(function(i){
        if(i.classList.contains("is-active")){
            if (i.children[0].childElementCount == 0) {
                board_id.push(i.id);
            }  
        }
    });

    if(board_id.length == 0){
        alert("No boards were selected.");
        return;
    }

    if (confirm("Are you sure you want to delete these boards?")){
        /* Send selected board id to route */
        for (let i=0; i<board_id.length; i++){
            $.post(`/boards/${board_id[i]}/delete`, function (data) {
            });
        }
        location.reload();
        
    }
};

function activateDelete(){
    btn_delete.classList.toggle("is-active");
    document.querySelector('.floating-container').classList.toggle("is-active");
    /* Ables/Disables redirection to editing page */
    $("#thumbnails a").bind("click.myclick", function(event) {
        event.preventDefault();   
    });
    /* Activates/Deactivates selection for each boards */
    board.forEach(function(i){
        
        i.classList.toggle("select");
        if (i.classList.contains("is-active")){
            i.classList.toggle("is-active");
        }
        i.addEventListener("click", function(e) {
            i.classList.toggle("is-active");
        });
        if (i.children[0].childElementCount != 0) {
            i.classList.toggle("select");
            if (i.classList.contains("is-active")){
                i.classList.toggle("is-active");
            }
        }  
   });
};

btn_cancel.addEventListener("click", function(e){
    activateDelete();
    $("#thumbnails a").unbind(".myclick");
});

/* Event handler for delete button */

btn_delete.addEventListener("click", function(e) {
    /* Delete selected boards when delete button is-active */
   if(this.classList.contains("is-active")){deleteBoards();}
   /* Activates/Deactivates delete button */
   activateDelete();
   if(!this.classList.contains("is-active")){$("#thumbnails a").unbind(".myclick");}
});

