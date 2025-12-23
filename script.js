let BASE_URL = "https://api.github.com/users";
const night = document.querySelector(".Night");
const day = document.querySelector(".Day");
const search = document.querySelector(".search-button");
const img = document.querySelector(".left img");
const nameEL = document.querySelector(".heading h1");
const userlink = document.querySelector(".heading a");
const joined = document.querySelector(".joined");
const bio = document.querySelector(".about-data");
const repo = document.querySelector(".repo-data");
const followers = document.querySelector(".followers-data");
const following = document.querySelector(".following-data");
const locationEl = document.querySelector(".location span");
const twiter = document.querySelector(".twiter span a");
const link = document.querySelector(".link span a");
const business = document.querySelector(".bussiness span a");



night.addEventListener("click", () => {
  document.body.classList.add("dark");
  night.classList.add("hidden");
  day.classList.remove("hidden");
  localStorage.setItem("theme" , "dark");
});

day.addEventListener("click", () => {
  document.body.classList.remove("dark");
  day.classList.add("hidden");
  night.classList.remove("hidden");
   localStorage.setItem("theme" , "light");

});

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  night.classList.add("hidden");
  day.classList.remove("hidden");
}

const getData = async () => {
  
    let username = document.querySelector(".inp").value.trim();



       if (username == ""){
            alert("Please Enter Username");
            return;
         }
      let url = `${BASE_URL}/${username}`;

    let response = await fetch(url);
    
      

            if (response.status === 404) {
      alert(" Invalid GitHub username");
      return;
    }

    else if (response.status === 403) {
      alert(" API rate limit exceeded");
      return;
    }

    else if (!response.ok) {
      alert("Something went wrong");
      return;
    }
    
else{

      
    let data = await response.json();
    // console.log(data);

    localStorage.setItem("lastUser" , data.login);
    img.src=data.avatar_url;

    let joindate = data.created_at;
    
    joined.innerText=formatJoinDate(joindate);

    nameEL.innerText= data.name || data.login;

    userlink.innerText = `@${data.login}`;
    userlink.href = data.html_url;
      
    bio.innerText = data.bio || "This profile has no bio";
  
    repo.innerText = data.public_repos;
    followers.innerText = data.followers;
    following.innerText = data.following;
    

locationEl.innerText = data.location || "Not Available";


if (data.twitter_username) {
  twiter.innerText = data.twitter_username;
  twiter.href = `https://twitter.com/${data.twitter_username}`;
} else {
  twiter.innerText = "Not Available";
  twiter.removeAttribute("href");
}

if (data.blog && data.blog.startsWith("http")) {
  link.href = data.blog;
    link.innerText = data.blog;
} else if (data.blog) {
  link.href = `https://${data.blog}`;
  link.innerText = data.blog;
} else {
   link.removeAttribute("href");
  link.innerText = "Not Available";
} 
 

if (data.company) {
  business.innerText = data.company;
  business.href = `https://github.com/${data.company.replace("@", "")}`;
} else {
  business.innerText = "Not Available";
  business.removeAttribute("href");
}




}
 



}


window.addEventListener("load", ()=>{
    const lastUser = localStorage.getItem("lastUser");
    if(lastUser){
     document.querySelector(".inp").value = lastUser;
    getData();
    }
})

function formatJoinDate(created_at) {

     
const date = new Date(created_at);
const day = date.getDate();
const month = date.toLocaleString("en-US" , {month : "short"});
const year = date.getFullYear();
   
return `Joined ${day} ${month} ${year}`;

}

search.addEventListener("click" , getData)




