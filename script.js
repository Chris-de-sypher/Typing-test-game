/** @format */

// rendom quote url api
// let url = "https://jsonplaceholder.typicode.com/posts";
let url = "https://api.quotable.io/random?minLength=80&maxLength=100";

let time = 60;
let timer = "";
let mistakes = 0;
let AllQuotes = "";

const user_input = document.querySelector("#typing");
const quote_display = document.querySelector(".quote-display");

// set the result ad stop btn to display none
window.onload = () => {
  document.querySelector("button[title='btn2']").style.display = "none";
  document.querySelector(".result-output").style.display = "none";
  user_input.disabled = true;
};

// display result
const displayResult = () => {
    // display result div
    document.querySelector(".result-output").style.display = "block";
      document.querySelector("button[title='btn2']").style.display = "none";
    clearInterval(timer);
    user_input.disabled = true;
    let timeTaken = 1;
    if (time != 0) {
        timeTaken = (60 - time) / 100;
    }
    document.querySelector(".speed").innerHTML = (user_input.value.length / 5 / timeTaken).toFixed() + "wpm";
    document.querySelector(".result").innerHTML =
      Math.round(
        ((user_input.value.length - mistakes) / user_input.value.length) * 100
      ) + "%";
}

// update timer 
const updateTimer = () => {
    if (time == 0) {
        // End test 
        displayResult();
    } else {
        document.getElementById("time").innerHTML = --time + "s";
    }
}

// timer
const timeReduced = () => {
    timer = setInterval(() => {
        updateTimer();
    }, 1000)
}

// fetch the quote
async function fetchingQuote() {
  const fetches = await fetch(url);

  // get the response and parse it as a json
  let data = await fetches.json();

  AllQuotes = data.content;
  console.log(AllQuotes);

  // map my quotes into my html by passing it to function as an arguement
  // charactersMap(AllQuotes);

  let arr = AllQuotes.split("").map((value) => {
    return " <span class='quotes'>" + value + "</span> ";
  });
  document.querySelector(".quote-display").innerHTML += arr.join("");
}
fetchingQuote();

user_input.addEventListener("input", (e) => {
  //   const contents = e.target.value;
  let quotes = document.querySelectorAll(".quotes");

  // create an array that receives span tags
  quotes = Array.from(quotes);
  console.log(quotes);

  // array of user_input value
  let usersInputs = user_input.value.split("");

  // loop through all characters in the user_input value
  quotes.forEach((pos, index) => {
    // check if it matches
    if (pos.textContent == usersInputs[index]) {
      pos.classList.add("success");
    }
    // if user haven't entered anything yet
    else if (usersInputs[index] == null) {
      //    remove the class if any
      if (pos.classList.contains("success")) {
        pos.classList.remove("success");
      } else {
        pos.classList.remove("fail");
      }
    }
    // if user enter wrong character
    else {
      // check if we already added the fail class
      if (!pos.classList.contains("fail")) {
        // increment and display the number of fail
        mistakes += 1;
        pos.classList.add("fail");
      }
      document.querySelector("#mis").innerHTML = mistakes;
    }
    //   return if every characters are entered correctly
    let check = quotes.every((element) => {
      return element.classList.contains("success");
    });
    //   End test if all characters are correct
    if (check) {
      displayResult();
    }
  });
});

function start() {
    mistakes = 0;
    timer = '';
    timeReduced();
  document.querySelector("button[title='btn1']").style.display = "none";
  document.querySelector("button[title='btn2']").style.display = "block";
  user_input.disabled = false;
  user_input.focus();
}

