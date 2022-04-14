export default class postAPI{
    static getItems(rowId){
        const row = read().find(row => row.id == rowId);
        if (!row) return [];
        return row.posts;
    }
    static insertPost(rowId, post){
        const data = read();
        const row = data.find(row => row.id == rowId);
    }
}

function read(){
    const json = localStorage.getItem("post-data");
    if (!json) {
        return [
            {id:1, posts:[
            {
            id: "0",
            author: "A",
            message: "Hi",
            email: "A@ust.hk",
            image: "filepath?",
            status: 0 // 0: pending 1: approved 2: rejected
            },
            {
            id: "1",
            author: "B",
            message: "Good",
            email: "B@ust.hk",
            image: "filepath?",
            status: 0 // 0: pending 1: approved 2: rejected
            },
            {
            id: "2",
            author: "C",
            message: "Bye",
            email: "C@ust.hk",
            image: "filepath?",
            status: 0 // 0: pending 1: approved 2: rejected
            }]},
            {id:2, posts:[
            {
            id: "3",
            author: "A",
            message: "Hi",
            email: "A@ust.hk",
            image: "filepath?",
            status: 0 // 0: pending 1: approved 2: rejected
            },
            {
            id: "4",
            author: "B",
            message: "Good",
            email: "B@ust.hk",
            image: "filepath?",
            status: 0 // 0: pending 1: approved 2: rejected
            },
            {
            id: "5",
            author: "C",
            message: "Bye",
            email: "C@ust.hk",
            image: "filepath?",
            status: 0 // 0: pending 1: approved 2: rejected
            }]}
        ];
    }
    return JSON.parse(json);
}

function save(data){
    localStorage.setItem("post-data",JSON.stringify(data));
}