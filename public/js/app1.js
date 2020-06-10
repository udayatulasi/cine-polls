const firebaseConfig = {
  apiKey: "AIzaSyBQfxqDt6pmn-Tm-d2iQmQIDQps8gKC8GI",
  authDomain: "cine-polling.firebaseapp.com",
  databaseURL: "https://cine-polling.firebaseio.com",
  projectId: "cine-polling",
  storageBucket: "cine-polling.appspot.com",
  messagingSenderId: "300044700683",
  appId: "1:300044700683:web:4aa5331452e0a7cc420b0e",
  measurementId: "G-PLEFSGD3PP",
};
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
moviesref = db.collection("movies");
ses_wend = db.collection("session_weekend");
user_collection = db.collection("users");

google.charts.load("current", {
  packages: ["corechart"],
});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ]);

  var options = {
    title: "My Daily Activities",
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("piechart")
  );
  var chart1 = new google.visualization.PieChart(
    document.getElementById("piechart1")
  );
  var chart2 = new google.visualization.PieChart(
    document.getElementById("piechart2")
  );

  chart.draw(data, options);
  chart1.draw(data, options);
  chart2.draw(data, options);
}

var movies = [];
var users = [];
movies_1 = [
  {
    ID: 1,
    Name: "khaidi",
    Description: "feel good movie",
    Count: 0,
    p_1: 0,
    p_2: 0,
    p_3: 0,
  },
  {
    ID: 2,
    Name: "Rowdy",
    Description: "story is good",
    Count: 0,
    p_1: 0,
    p_2: 0,
    p_3: 0,
  },
  {
    ID: 3,
    Name: "Arjun",
    Description: "love story",
    Count: 0,
    p_1: 0,
    p_2: 0,
    p_3: 0,
  },
  {
    ID: 4,
    Name: "Idiot",
    Description: "Comedy story",
    Count: 0,
    p_1: 0,
    p_2: 0,
    p_3: 0,
  },
  {
    ID: 5,
    Name: "Badshah",
    Description: "Not so good",
    Count: 0,
    p_1: 0,
    p_2: 0,
    p_3: 0,
  },
  {
    ID: 6,
    Name: "Saaho",
    description: "High Budget Movie",
    count: 0,
    p_1: 0,
    p_2: 0,
    p_3: 0,
  },
];

// inits from here by getting password on click submit it verifies and gets the weekend sessions from the sesions colection from firebase and sends the last date from array to get_movies function to get movies
document
  .querySelector(".primary-submit")
  .addEventListener("click", function () {
    let password = document.querySelector(".form-control").value;
    if (password === "" || password !== "123") {
      let error = document.querySelector(".error-class");
      error.textContent = "enter valid Password";
    } else if (password === "123") {
      document.querySelector(".error-class").classList.add("d-none");
      document.querySelector("#userName").classList.add("d-none");
      document.querySelector(".primary-submit").classList.add("d-none");
      date_ses = ses_wend.get().then((i) => {
        arr = i.docs[0].data()["ses_arr"];
        arr_last_ele = arr[arr.length - 1];
        get_movies(arr_last_ele);
      });
    }
  });
var user_id_gen = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return "_" + Math.random().toString(36).substr(2, 12);
};

// step:2 - gets all the movies depending on the date that is sent from the sessions and takes out the cinema and users array to populate the data on website
function get_movies(d) {
  this.d_format = `"${d}"`;
  // this.d_format = `"2020-06-07T18:09:32.513Z"`;
  moviesref
    .doc(d_format)
    .get()
    .then((x) => {
      if (x.exists) {
        console.log(x.id);
        this.movies = x.data()["Movie_data"];
        users = x.data()["users"];
        // user function helps to send movies nad users list to populate
        Userfunction(this.movies, users);
      } else {
        alert("Poll hasn't started yet");
        console.log("no movies add yet in the session");
      }
    });
}

// Step-3 : calls the function to display movies and "adddsiplay()" helps to verify the priority of the movies given by the users
function Userfunction(movies, users) {
  // display the movies
  displayMovies(movies);

  // add priority
  addDisplay(users);
  //verify Priority
  // verPriority();
}

function displayMovies(movies) {
  html =
    '<form class="movieRating"><input type ="submit" class="after-submit"><table class="table"><br></br><thead><tr><th scope="col">#</th><th scope="col">Movie</th><th scope="col">Description</th><th scope="col">priority</th></tr></thead></table></form> ';
  document
    .querySelector(".primary-submit")
    .insertAdjacentHTML("afterend", html);

  for (var i = 0; i < movies.length; i++) {
    newhtml = `<tr class = "table-width"><th scope="row">${movies[i].id}</th><td>${movies[i].Name}</td><td>${movies[i].Description}</td><td><select id="choice-${i}" name="rating_ 1"><option selected value ="">Priority</option><option  value="1">priority-1</option><option value="2">priority-2</option><option value="3">priority-3</option></select></td></tr>`;
    document.querySelector(".table").insertAdjacentHTML("beforeend", newhtml);
  }
  user = `<br><form class="form-inline  form-group mx-sm-3 mb-2" id="userName"><div class="form-group mb-2"><label for="staticEmail2" class="sr-only">Email</label><input type="text" readonly class="form-control-plaintext" id="staticEmail2" value="Username :"></div><div class="form-group mx-sm-3 mb-2"><label for="inputPassword2" class="sr-only">Password</label><input type="text" class="primary-form second-submit" id="inputPassword2" placeholder="Username"></div></form>`;
  document.querySelector(".table").insertAdjacentHTML("beforebegin", user);
}

function addDisplay(users) {
  var movie_rating = document.querySelector(".movieRating");
  movie_rating.onsubmit = function (e) {
    e.preventDefault();
    var ratingArray = [];
    username = document.querySelector(".second-submit").value;
    u_id = user_id_gen();
    users.push(u_id);
    var display = 0;
    var count_1 = 0;
    var count_2 = 0;
    var count_3 = 0;

    for (let i = 0; i < movies.length; i++) {
      var val = parseInt(document.querySelector(`#choice-${i}`).value);
      if (val !== "") {
        if (val === 1) {
          if (count_1 === 1) {
            console.log("break");
            ratingArray = [];
            alert("hi");
            display = 1;
            break;
          }
          count_1 += 1;
          ratingArray.push(i, 1);
        }
        if (val === 2) {
          if (count_2 === 1) {
            console.log("break");
            ratingArray = [];
            alert("hi");
            display = 1;
            break;
          }
          count_2 += 1;
          //  console.log(val)
          ratingArray.push(i, 2);
        }
        if (val === 3) {
          if (count_3 === 1) {
            console.log("break");
            ratingArray = [];
            alert("hi");
            display = 1;
            break;
          }
          count_3 += 1;
          // console.log(val)
          ratingArray.push(i, 3);
        }
      }
    }

    if (count_1 === 1 && count_2 === 1 && count_3 === 1) {
      console.log(ratingArray);
      priority_num = [];
      movie_id = [];
      for (let i = 0; i < ratingArray.length; i++) {
        if (i % 2 != 0) {
          priority_num.push(ratingArray[i]);
        } else {
          movie_id.push(ratingArray[i]);
        }
      }
      console.log(priority_num, movie_id, movies);
      poll_user = new Object();
      for (let i = 0; i < priority_num.length; i++) {
        for (let j = 0; j < movies.length; j++) {
          if (movie_id[i] + 1 == movies[j].id) {
            num = priority_num[i];
            prio = "p_" + num;
            poll_user[prio] = movies[j].Name;
            val = movies[j][prio] + 1;
            movies[j]["p_" + num] = val;
          }
        }
      }
      poll_user["id"] = u_id;
      poll_user["user_name"] = username;
      create_user(poll_user);
      result = {
        Movie_data: movies,
        users: users,
      };
      update_movies(result);
      if (display === 0) {
        document.querySelector(".movieRating").classList.add("d-none");
        displayMovies(movies);
        document.querySelector(".after-submit").classList.add("d-none");
      }
    } else {
      alert("select 3");
    }
  };
}

// this function uses update call to update doc in firebase
// parameters are output is the final object to update and data is the document id to be updated
function update_movies(output) {
  moviesref
    .doc(this.d_format)
    .update(output)
    .then((x) => alert("your poll is submitted successfully!!, Thank you!"))
    .catch((err) => alert(err));
}
// getting user

function get_users() {}

// creating user

function create_user(c_user) {
  user_collection
    .doc(this.d_format)
    .update({
      users: firebase.firestore.FieldValue.arrayUnion(c_user),
    })
    .then((x) => alert("user succesfully created!!"))
    .catch((err) => alert(err));
}
