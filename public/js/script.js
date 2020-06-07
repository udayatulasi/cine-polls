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

x = db.collection("movies");
var da = 0;
da = x.get()
  .then((ss) => {
    d = ss.docs;
    // return d
    x = JSON.parse(d[6].id)
    console.log(typeof x)
    ex(x)
    // d.forEach((i) => {
    //   console.log(i.id);
    // });
  })
  .catch((err) => {
    console.log("Error getting documents", err);
  });

function ex(x) {
  x.doc(d)
    .set(docDat0a)
    .then(function () {
      console.log("Document successfully written!");
    });
}
date = new Date();
d = JSON.stringify(date);
var docDat0a = {
  0: {
    count: 0,
    description: "",
    name: "first",
    p_1: 0,
    p_2: 0,
    p_3: 0,
  },
  1: {
    count: 0,
    description: "",
    name: "first",
    p_1: 0,
    p_2: 0,
    p_3: 0
  },
  users: [
    1 - 1,
    1 - 2
  ]
}

google.charts.load("current", {
  packages: ["corechart"],
});
var userdata = [{
    id: 1,
    user_name: "udaya",
    p1: 5,
    p2: 6,
    p3: 9,
  },
  {
    id: 1,
    user_name: "udaya",
    p1: 5,
    p2: 6,
    p3: 9,
  },
  {
    id: 1,
    user_name: "udaya",
    p1: 5,
    p2: 6,
    p3: 9,
  },
];
var backcontrol = (function () {
  var Movie = function (ID, Name, Description) {
    this.ID = ID;
    this.Name = Name;
    this.Description = Description;
    this.Count = 0;
    this.p_1 = 0;
    this.p_2 = 0;
    this.p_3 = 0;
  };

  var data = {
    cinema: [{
        ID: 1,
        Name: "hdghjs",
        Description: "djsj",
        Count: 0,
        p_1: 4,
        p_2: 2,
        p_3: 3,
      },
      {
        ID: 2,
        Name: "hdghjs",
        Description: "djsj",
        Count: 0,
        p_1: 4,
        p_2: 2,
        p_3: 3,
      },
      {
        ID: 3,
        Name: "hdghjs",
        Description: "djsj",
        Count: 0,
        p_1: 4,
        p_2: 2,
        p_3: 3,
      },
    ],
  };

  var editd = function (n, d, idn) {
    var film;
    data.cienma.forEach((e) => {
      if (idn === e.ID) {
        e.Name = n;
        e.Description = d;
        film = e;
      }
    });
    return film;
  };

  return {
    addItem: function (name, desp) {
      var ID;
      if (data.cienma.length > 0) {
        ID = data.cienma[data.cienma.length - 1].ID + 1;
      } else {
        ID = 1;
      }
      var newMovie = new Movie(ID, name, desp);
      data.cienma.push(newMovie);
      return newMovie;
    },

    editDeatils: function (en, ed, eid) {
      var edit = editd(en, ed, eid);
      return edit;
    },

    del: function (idno) {
      var allId = data.cienma.map((e) => e.ID);

      var index = allId.indexOf(idno);

      if (index >= 0) {
        data.cienma.splice(index, 1);
      }

      console.log(index);
    },

    pieArray: function () {
      return data.cienma;
    },
  };
})();

var uicontrol = (function () {
  var domstrings = {
    verify: ".verify",
    inputPass: ".inputPassword",
    login: ".login",
    mainpage: ".mainpage",
    Add: ".addMovie",
    AddMovie: ".addMovieDetails",
    cancel: ".cancel",
    Details: ".movieDetails",
    displayMovie: ".movie-list",
    displayUser: ".user_list",
  };

  var piechart2 = function (objp) {
    var i;
    for (i = 1; i <= 3; i++) {
      var pdata = [
        ["movie", "count"]
      ];
      objp.forEach((e) => {
        var ename = e.Name;
        var ecount = parseFloat(i == 1 ? e.p_1 : i == 2 ? e.p_2 : e.p_3);
        var arrp = [ename, ecount];
        pdata.push(arrp);
      });
      console.log(pdata);
      drawChart(pdata);
      google.charts.setOnLoadCallback(drawChart(pdata));

      function drawChart(pdata2) {
        var data = google.visualization.arrayToDataTable(pdata2);
        var options = {
          title: `priority${i}`,
        };

        var chart = new google.visualization.PieChart(
          document.getElementById(`piechart${i}`)
        );

        chart.draw(data, options);
      }
    }
  };
  return {
    getdomstrings: function () {
      return domstrings;
    },
    display: function () {
      document.querySelector(domstrings.login).classList.add("d-none");
      document.querySelector(domstrings.mainpage).classList.toggle("d-none");
      document.querySelector(".animated").classList.add("delay-1s");
    },

    addMovie: function (nM) {
      var html;

      html = `<tr class= f-${nM.ID}>
          <th scope="row">1</th>
          <td><p class="d-inline-block en0-${nM.ID}">${nM.Name}</p><input class="form-control en1-${nM.ID} d-none" type="text"> </td>
          <td><p class="d-inline-block ed0-${nM.ID}">${nM.Description}</p><input class="form-control ed1-${nM.ID} d-none" type="text"></td>
          <td><button type="button" class="btn btn-warning d-inline-block" id="e-${nM.ID}"><ion-icon class="del" name="create-outline"></ion-icon></button><button type="button" id="s-${nM.ID}"class="btn btn-success d-none"><ion-icon class="del"name="checkmark-circle-outline"></ion-icon></button> </td>
          <td> <button type="button" class="btn btn-danger" id="d-${nM.ID}"><ion-icon class="del"name="close-circle-outline"></ion-icon></button></td>
        </tr>`;

      document
        .querySelector(domstrings.displayMovie)
        .insertAdjacentHTML("beforeend", html);
      document.querySelector(domstrings.Add).classList.remove("d-none");
      document.querySelector(domstrings.AddMovie).classList.add("d-none");
    },

    editMovie: function (idno) {
      // console.log('inedit');
      var name, desp;
      // console.log(`en0-${idno}`);
      name = document.querySelector(`.en0-${idno}`).textContent;
      desp = document.querySelector(`.ed0-${idno}`).textContent;
      document.querySelector(`.en0-${idno}`).classList.add("d-none");
      document.querySelector(`.ed0-${idno}`).classList.add("d-none");
      document.querySelector(`.en1-${idno}`).value = name;
      document.querySelector(`.ed1-${idno}`).value = desp;
      document.querySelector(`.en1-${idno}`).classList.remove("d-none");
      document.querySelector(`.ed1-${idno}`).classList.remove("d-none");
      document.querySelector(`#e-${idno}`).classList.add("d-none");
      document.querySelector(`#e-${idno}`).classList.remove("d-inline-block");
      document.querySelector(`#s-${idno}`).classList.remove("d-none");
    },

    editMovie2: function (idno2) {
      var name2, desp2;
      name2 = document.querySelector(`.en1-${idno2}`).value;
      desp2 = document.querySelector(`.ed1-${idno2}`).value;

      document.querySelector(`.en1-${idno2}`).classList.add("d-none");
      document.querySelector(`.ed1-${idno2}`).classList.add("d-none");
      document.querySelector(`#e-${idno2}`).classList.remove("d-none");
      document.querySelector(`#s-${idno2}`).classList.add("d-none");
      // printPiehar()
      return [name2, desp2];
    },

    update: function (movie) {
      document.querySelector(`.en0-${movie.ID}`).innerHTML = movie.Name;
      document.querySelector(`.ed0-${movie.ID}`).innerHTML = movie.Description;
    },

    del: function (idno) {
      document.querySelector(`.f-${idno}`).remove();
    },

    displayUser: function (obj) {
      obj.forEach((e, i) => {
        var userHtml = `<tr>
          <th scope="row">${i + 1}</th>
          <td>${e.user_name}</td>
          <td>${e.p1}</td>
          <td>${e.p2}</td>
          <td>${e.p3}</td>
        </tr>`;

        document
          .querySelector(domstrings.displayUser)
          .insertAdjacentHTML("beforeend", userHtml);
      });
    },

    ArrayDetails: function (objA) {
      console.log(objA);
      piechart2(objA);
    },
  };
})();

var control = (function (bctrl, uctrl) {
  var printPiehar = function () {
    setTimeout(() => {
      console.log("welcome");
      var pieAtD = bctrl.pieArray();
      uctrl.ArrayDetails(pieAtD);
    }, 200);
  };

  var setUpEvent = function () {
    // var pieAtDM=bctrl.pieArray();
    // console.log(pieAtDM);
    // uctrl.ArrayDetails(pieAtDM);
    // printPiehar();
    var dom = uctrl.getdomstrings();
    console.log("hi");
    var form = document.querySelector(".login");
    form.onsubmit = function (e) {
      e.preventDefault();

      var verifyit = form.password.value;
      verify(verifyit);
      form.reset();
    };

    //

    document.querySelector(dom.Add).addEventListener("click", function () {
      document.querySelector(dom.AddMovie).classList.remove("d-none");
      document.querySelector(dom.Add).classList.add("d-none");
    });

    document.querySelector(dom.cancel).addEventListener("click", function () {
      document.querySelector(dom.Add).classList.remove("d-none");
      document.querySelector(dom.AddMovie).classList.add("d-none");
    });

    var detailsForm = document.querySelector(dom.Details);
    detailsForm.onsubmit = function (e) {
      e.preventDefault();
      var movieNmae = detailsForm.movieName.value;
      var Description = detailsForm.movieDescription.value;
      addmovie(movieNmae, Description);
      detailsForm.reset();
    };

    document.querySelector(dom.displayMovie).addEventListener("click", ctrlED);

    printPiehar();
  };

  var addmovie = function (Name, Desp) {
    var newMovie;

    newMovie = bctrl.addItem(Name, Desp);
    uctrl.addMovie(newMovie);
    printPiehar();
  };

  var verify = function (pass) {
    if (pass === "1") uctrl.display();
  };

  var ctrlED = function (event) {
    var itemid = event.target.parentNode.id;

    var type, idno, splitid;
    splitid = itemid.split("-");
    type = splitid[0];
    idno = parseInt(splitid[1]);

    if (type === "e") {
      uctrl.editMovie(idno);
      // bctrl.editMovie(idno);
    } else if (type === "s") {
      var [ename, edesp] = uctrl.editMovie2(idno);
      var newMovie = bctrl.editDeatils(ename, edesp, idno);
      // console.log(newMovie);
      uctrl.update(newMovie);
      printPiehar();
    } else if (type === "d") {
      bctrl.del(idno);
      uctrl.del(idno);
    }
  };

  return {
    init: function (obj) {
      uctrl.displayUser(obj);
      // printPiehar();
      setUpEvent();
    },
  };
})(backcontrol, uicontrol);

control.init(userdata);