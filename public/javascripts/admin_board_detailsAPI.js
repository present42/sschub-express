export default class boardDetailsAPI{
    
    static getBoard(boardId){
        const board = read().find(board => board.id == boardId);
        if (!board) return [];
        return board.config;
    }

    static setTitle(){
        if (document.getElementById("titleInput") == null) return;
        var input = document.getElementById("titleInput").value;
        board['title'] = input;
    }
    
    static setTitleColor(){
        if (document.getElementById("board-title").style.color == null) return;
        var input = document.getElementById("board-title").style.color;
        console.log("Set title color: " + input);
        board['titleColor'] = input;
    }
    
    static setBgColor(){
        if (document.getElementById("bgColor") == null) return;
        var input = document.getElementById("bgColor").value;
        board['bgColor'] = input;
    }
    
    static setBgImage(){
        if (document.getElementById("bgImage") == null) return;
        var input = document.getElementById("bgImage").value;
        board['bgImage'] = input;
    }
    
    static updateBoard() {
        this.setTitle();
        this.setTitleColor();
        this.setBgColor();
        this.setBgImage();
    }
}

function read(){
    const json = localStorage.getItem("board-data");
    if (!json) {
        return [
            {
                id: "2948192", config:{
                titleColor: "#230123",
                bgColor: "#ff6161",
                bgImage: null,
                font: "Arial",
                title: "First SSC Hub board"}
            },
            {
                id: "1294829", config:{
                titleColor: "#230123",
                bgColor: "#ff6161",
                bgImage: null,
                font: "Arial",
                title: "Second SSC Hub board"}
            },
            {
                id: "3847292", config:{
                titleColor: "#230123",
                bgColor: "#ff6161",
                bgImage: null,
                font: "Arial",
                title: "Third SSC Hub board"}
            }
        ];
    }
    return JSON.parse(json);
}

function save(data){
    localStorage.setItem("board-data",JSON.stringify(data));
}