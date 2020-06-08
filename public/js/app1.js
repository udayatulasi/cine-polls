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
ses_wend = db.collection("session_weekend")
google.charts.load('current', {
  'packages': ['corechart']
});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

  var data = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['Work', 11],
    ['Eat', 2],
    ['Commute', 2],
    ['Watch TV', 2],
    ['Sleep', 7]
  ]);

  var options = {
    title: 'My Daily Activities'
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  var chart1 = new google.visualization.PieChart(document.getElementById('piechart1'));
  var chart2 = new google.visualization.PieChart(document.getElementById('piechart2'));

  chart.draw(data, options);
  chart1.draw(data, options);
  chart2.draw(data, options);
}
// var newhtml = '<p>hi how are you</p>'

var movies_1 = []
movies = [{
    ID: 1,
    Name: 'khaidi',
    Description: 'feel good movie',
    Count: 0,
    p_1: 0,
    p_2: 0,
    p_3: 0
  },
  {
    ID: 2,
    Name: 'Rowdy',
    Description: 'story is good',
    Count: 0,
    p_1: 0,
    p_2: 0,
    p_3: 0
  },
  {
    ID: 3,
    Name: 'Arjun',
    Description: 'love story',
    Count: 0,
    p_1: 0,
    p_2: 0,
    p_3: 0
  },
  {
    ID: 4,
    Name: 'Idiot',
    Description: 'Comedy story',
    Count: 0,
    p_1: 0,
    p_2: 0,
    p_3: 0
  },
  {
    ID: 5,
    Name: 'Badshah',
    Description: 'Not so good',
    Count: 0,
    p_1: 0,
    p_2: 0,
    p_3: 0
  },
  {
    ID: 6,
    Name: 'Saaho',
    description: 'High Budget Movie',
    count: 0,
    p_1: 0,
    p_2: 0,
    p_3: 0
  }
]







document.querySelector(".primary-submit").addEventListener('click', function () {
  let password = document.querySelector('.form-control').value;
  if (password === "" || password !== "123") {
    let error = document.querySelector('.error-class');
    error.textContent = 'enter valid Password';
  } else if (password === '123') {

    document.querySelector('.error-class').classList.add('d-none');
    document.querySelector('#userName').classList.add('d-none');
    document.querySelector('.primary-submit').classList.add('d-none');
    date_ses =
      ses_wend.get().then((i) => {
        arr = i.docs[0].data()["ses_arr"]
        arr_last_ele = arr[arr.length - 1]
        get_movies(arr_last_ele)
      })



  }
});

function get_movies(d) {
  d_format = `"${d}"`
  moviesref.doc(`"2020-06-07T18:09:32.513Z"`).get().then((x) => {
    if (x.exists) {
      movies = x.data()["cinema"]
      Userfunction(movies);
    } else {
      console.log("doc no exits!")
    }

  })
}

function Userfunction(movies) {

  // display the movies
  displayMovies(movies);

  // add priority 
  addDisplay();

  //verify Priority
  // verPriority();

};

function displayMovies(movies) {
  html = '<form class="movieRating"><input type ="submit" class="after-submit"><table class="table"><br></br><thead><tr><th scope="col">#</th><th scope="col">Movie</th><th scope="col">Description</th><th scope="col">priority</th></tr></thead></table></form> ';
  document.querySelector('.primary-submit').insertAdjacentHTML('afterend', html);

  for (var i = 0; i < movies.length; i++) {
    newhtml = `<tr class = "table-width"><th scope="row">${movies[i].ID}</th><td>${movies[i].Name}</td><td>${movies[i].Description}</td><td><select id="choice-${i}" name="rating_ 1"><option selected value ="">Priority</option><option  value="1">priority-1</option><option value="2">priority-2</option><option value="3">priority-3</option></select></td></tr>`;
    document.querySelector('.table').insertAdjacentHTML('beforeend', newhtml);

  }
};

function addDisplay() {
  var movie_rating = document.querySelector('.movieRating')
  movie_rating.onsubmit = function (e) {
    e.preventDefault()
    var ratingArray = [];

    var display = 0;
    var count_1 = 0;
    var count_2 = 0;
    var count_3 = 0;

    for (let i = 0; i < movies.length; i++) {
      var val = parseInt(document.querySelector(`#choice-${i}`).value);
      if (val !== "") {
        if (val === 1) {
          if (count_1 === 1) {
            console.log('break');
            ratingArray = [];
            alert('hi')
            display = 1
            break;
          }
          count_1 += 1;
          ratingArray.push(i, 1)

        }
        if (val === 2) {
          if (count_2 === 1) {
            console.log('break');
            ratingArray = [];
            alert('hi')
            display = 1
            break;
          }
          count_2 += 1;
          //  console.log(val)
          ratingArray.push(i, 2)

        }
        if (val === 3) {
          if (count_3 === 1) {
            console.log('break');
            ratingArray = [];
            alert('hi')
            display = 1
            break;
          }
          count_3 += 1;
          // console.log(val)
          ratingArray.push(i, 3)

        }


      }
    }

    if (count_1 === 1 && count_2 === 1 && count_3 === 1) {
      console.log(ratingArray);
      priority_num = []
      movie_id = []
      for (let i = 0; i < ratingArray.length; i++) {
        if (i % 2 != 0) {
          priority_num.push(ratingArray[i])
        } else {
          movie_id.push(ratingArray[i])
        }
      }
      console.log(priority_num, movie_id, movies)

      for (let i = 0; i < priority_num.length; i++) {
        for (let j = 0; j < movies.length; j++) {
          if ((movie_id[i] + 1) == movies[j].id) {
            num = priority_num[i];
            val = movies[j]["p_" + num] + 1
            movies[j]["p_" + num] = val
          }
        }
      }
      console.log(movies)
      if (display === 0) {
        document.querySelector('.movieRating').classList.add('d-none');
        displayMovies(movies);
        document.querySelector('.after-submit').classList.add('d-none');
      }
    } else {
      alert('select 3')
    }
  }
};