const username=document.querySelector("#username")
const userpin = document.querySelector("#userpin");
const submit=document.querySelector(".subm")
const bookID=document.querySelector("#bookID")
const issueDuration = document.querySelector("#issueDuration");
const bookName = document.querySelector("#bookName");
const issueBook=document.querySelector(".submit-book")
let curUser="a";
let curEl = document.querySelector("#homepage");

let database = {
  a: {
    pin: "1111",
    books: ["harry potter","stranger"],
    bookid: ["1111","2222"],
    issueFor: [31,1],
    date: [new Date(),new Date()],
  },
};
const displayBooks = function () {
  for (i in database[curUser].books) {
    let date=new Date()
    let retDate = database[curUser].date[i];
    let rdate = new Date(retDate.getTime() + 5 * 24 * 60 * 60 * 1000);
    // let rdate = new Date(
    //   date.setDate(database[curUser].date[i] + database[curUser].issueFor[i])
    // );
    date=new Date()
    let fine =
      (date - rdate) / (1000 * 3600 * 24) > 0
        ? Math.abs((date - rdate) / (1000 * 3600 * 24))
        : 0;
    document.querySelector(".table").insertAdjacentHTML(
      "beforeend",
      `<div class="col-12 datarow">
                        <div class="row blocks">
                        <div class="col-2">${database[curUser].bookid[i]}</div>
                        <div class="col-4">${database[curUser].books[i]}</div>
                        <div class="col-2">${database[curUser].date[i]}</div>
                        <div class="col-2">${rdate}</div>
                        <div class="col-2">${fine*25}</div>
                    </div>`
    );
  }
};
const clearDisplay=function(){
  document.querySelector(".table").innerHTML=" ";
}
const isEmp=function(a){
    if(!a.value){
        return true
    }else{
        return false
    }
}
const handleLength =function(el){
  if (el.value.length > 4) {
    el.value = el.value.slice(0, 4);
  }  
}
document.querySelectorAll("input").forEach(el=>el.addEventListener("input",function(){
  document.querySelectorAll(".popup").forEach(el=> el.classList.add("hidden"))
}))
submit.addEventListener("click",function(){
    if(isEmp(username)&&isEmp(userpin)){
        document.querySelector(".err").classList.remove("hidden");
        return
    }
    curUser=username.value;
    if (Object.keys(database).includes(username.value)){
      if(database[curUser].pin!==userpin.value) {
      document.querySelector(".err").classList.remove("hidden")
      return;
      }
    }else{
      database[curUser] = {
        pin: `${userpin.value}`,
        books: [],
        bookid: [],
        issueFor: [],
        date:[]
      };
    }
    clearDisplay();
    displayBooks();
    document
      .querySelectorAll(".hidden-p")
      .forEach((el) => el.classList.remove("hidden"));
    displayManager(document.querySelector("#crud"))
    document.querySelectorAll("input").forEach((el) => (el.value = ""));
})
issueBook.addEventListener("click", function () {
  if (isEmp(bookID) && isEmp(issueDuration) && isEmp(bookName)) {
    document.querySelector(".err-issue").classList.remove("hidden");
    return;
  }
  if(issueDuration.value>50||issueDuration.value<0){
    document.querySelector(".err-issue").classList.remove("hidden");
    return;
  }
  database[curUser].books.push(`${bookName.value}`)
  database[curUser].bookid.push(`${bookID.value}`);
  database[curUser].issueFor.push(`${issueDuration.value}`);
  let date=new Date()
  database[curUser].date.push(date);
  clearDisplay();
  displayBooks();
  displayManager(document.querySelector("#crud"));
  document.querySelectorAll("input").forEach(el=>el.value="")
  store()
});
userpin.addEventListener("input",function(){
    handleLength(userpin)
})
bookID.addEventListener("input",function(){
    handleLength(bookID);
})
document.querySelector(".submit-return").addEventListener("click",function(){
    if(!database[curUser].bookid.includes(document.querySelector("#returnId").value)){
      document.querySelector(".err-return").classList.remove("hidden");
      return
    }
    let index = database[curUser].bookid.indexOf(returnId.value);
    ["bookid", "books", "issueFor", "date"].forEach((el) => database[curUser][el].splice(index,1));
    document.querySelectorAll("input").forEach((el) => (el.value = ""));
    document.querySelector(".return-form").insertAdjacentHTML('beforeend', `<p class="white popup">book submitted </p>`)
    store()
  })
const displayManager=function(el){
  curEl.classList.add("hidden")
  curEl=el
  if (el == document.querySelector("#directory")){
    clearDisplay();
    displayBooks();
  }
  curEl.classList.remove("hidden");
}
document.querySelector("#issue-sel").addEventListener("click",function(){
    displayManager(document.querySelector("#issue-form"))
})
document.querySelector("#return-sel").addEventListener("click", function () {
  displayManager(document.querySelector("#return-form"));
});
document.querySelector("#directory-sel").addEventListener("click",function(){
  displayManager(document.querySelector("#directory"));
})
document.querySelector("nav").addEventListener("click", function (e) {
  if(!e.target.dataset.page) return
    displayManager(document.querySelector(e.target.dataset.page));
});
const store=function(){
  localStorage.setItem("data",JSON.stringify(database))
}
const localData=JSON.parse(localStorage.getItem("data"))
database=localData
for(i in database){
  for(j in database[i].date){
    database[i].date[j] = new Date(database[i].date[j]);
  }
}
console.log(typeof database[curUser].date[0]);
