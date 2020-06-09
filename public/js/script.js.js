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
  var sessionWeekendRef = db.collection("session_weekend")
  var moviesRef = db.collection("movies");
  var users_collection = db.collection("users");
  var da = 0;

google.charts.load('current', {'packages':['corechart']});    


var control =(function(){

    var domstrings = {
        verify: '.verify',
        inputPass: '.inputPassword',
        login: '.login',
        mainpage: '.mainpage',
        Add: '.addMovie',
        AddMovie:'.addMovieDetails',
        cancel:'.cancel',
        Details:'.movieDetails',
        displayMovie:'.movie-list',
        displayUser:'.user_list'
      };

      var movieSessions =[]
      var sessDate;
      var movieNames = [];
      var userNames =[];
      

    //   to verify Admin password
    var form = document.querySelector('.login');
      form.onsubmit = function(e){
        e.preventDefault();
        var verifyit = form.password.value;
        if(verifyit === '1')
        display();
        form.reset();
        return false;
      }

    //   to display main page
       var display = function(){
        document.querySelector(domstrings.login).classList.add('d-none');
        document.querySelector(domstrings.mainpage).classList.toggle('d-none');
        document.querySelector('.animated').classList.add("delay-1s");
      };
      
    //   get sessions
    var getSession = function(){
        sessionWeekendRef.get()
        .then((e)=>{
          var dt = e.docs;
          dt=dt[0].data()["ses_arr"]; 
          movieSessions = dt;
          sessionsDisplay();
        })
        .catch(e => console.log(e))
    }

    getSession();   

    var sessionsDisplay = function(){
        const myNode = document.querySelector(".session_form");
            myNode.innerHTML = '';
            var formHtml= ` <option></option>`;
        myNode.insertAdjacentHTML('beforeend',formHtml);
      
      movieSessions.forEach(e=>{
        var formHtml= `<option> ${e}</option>`;
        myNode.insertAdjacentHTML('beforeend',formHtml);
      })
    }

    // to create Session
    var createSession = document.querySelector(".cal")
    createSession.onsubmit= function(e){
      e.preventDefault();
      var date =createSession.date.value
      if(date){
      Createsession(date)
      createSession.reset();
      return false;}
      else{
          alert("select date")
      }
    }

    var Createsession = function(cal){
        movieSessions.push(cal);
        console.log(movieSessions);
        sessionsDisplay();
        sessionWeekendRef.doc("list").set({"ses_arr" :movieSessions }).then((a) => alert("session created")).catch( e => console.log(e))
        moviesRef.doc(cal).set({Movie_data: [], users: []}).then(x => console.log("SESSION CREATED IN MOVIES")).catch(err => {console.log(err)})
        users_collection.doc(cal).set({user: []}).then(x => console.log("SESSION CREATED IN MOVIES")).catch(err => {console.log(err)})
      }

    // get selected session movies and display to UI
    var selectedSession =document.querySelector(".selectedDate");
    selectedSession.onsubmit =  function(e){
        e.preventDefault();
        sessDate = selectedSession.Session_data.value;
        users_collection.doc(`"${sessDate}"`).get()
     .then(function(doc){
        if(doc.exists){
          userNames = doc.data()["user"];
          console.log(userNames)
          const myNode6 = document.querySelector(".user_list");
          myNode6.innerHTML = '';
          if(userNames.length)
          {
            displayUserName(userNames)
          }}
          else{
            var htmlUser = `<tr>
            <th></th>
            <td>nousers</td>
            <td>~</td>
            <td>~</td>
            <td>~</td>
          </tr>`
          document.querySelector(".user_list").insertAdjacentHTML('beforeend',htmlUser);
        }
     })
        moviesRef.doc(`"${sessDate}"`).get()
        .then(function(doc) {
          if (doc.exists) {
            movieNames= doc.data()["Movie_data"];
            const myNode1 = document.querySelector(".movie-list");
            myNode1.innerHTML = '';
            if(movieNames.length)
            DisplayMovies(movieNames);
            else alert("no movies are present in current session")
             printPiehar();
         } else {
             // doc.data() will be undefined in this case
             alert("No current movies list");
         }
     }).catch(err => console.log(err));  
     
    //  selectedSession.reset();
     return false;
     }
    //  to display all movies
    var DisplayMovies = function(movieNames){
      const myNode4 = document.querySelector(".movie-list");
      myNode4.innerHTML = '';
            movieNames.forEach((i)=>{
                addMovieUI(i);
       })       
     }

    //  this function display each movie
    var addMovieUI = function(movie){
    var html;
          html = `<tr class= f-${movie.id}>
          <td><p class="d-inline-block en0-${movie.id}">${movie.Name}</p><input class="form-control en1-${movie.id} d-none" type="text"> </td>
          <td  class="despSize" style="width: 50px;" ><p class="d-inline-block  ed0-${movie.id}">${movie.Description}</p><input class="form-control ed1-${movie.id} d-none"  style="height: 100px;" type="text"></td>
          <td><button type="button" class="btn edit btn-warning d-inline-block" data-itemid="e-${movie.id}" id="e-${movie.id}">
          <ion-icon class="del" name="create-outline"></ion-icon></button>
          <button type="button" id="s-${movie.id}" data-itemid="s-${movie.id}" class="btn btn-success d-none">
          <ion-icon class="del" name="checkmark-circle-outline"></ion-icon></button> 
          </td>
          <td> <button type="button" data-itemid="d-${movie.id}" class="btn btn-danger" id="d-${movie.id}"><ion-icon class="del"name="close-circle-outline"></ion-icon></button></td>
        </tr>`;

        document.querySelector(domstrings.displayMovie).insertAdjacentHTML('beforeend',html);
        document.querySelector(domstrings.Add).classList.remove('d-none');
        document.querySelector(domstrings.AddMovie).classList.add('d-none');
    }
   
      document.querySelector(domstrings.Add).addEventListener('click',function(){
        document.querySelector(domstrings.AddMovie).classList.remove('d-none');
        document.querySelector(domstrings.Add).classList.add('d-none');
      });
    
      document.querySelector(domstrings.cancel).addEventListener('click',function(){
        document.querySelector(domstrings.Add).classList.remove('d-none');
        document.querySelector(domstrings.AddMovie).classList.add('d-none');
      });

    var detailsForm =document.querySelector(domstrings.Details);
      detailsForm.onsubmit = function(e){
        e.preventDefault();
        var movieNmae = detailsForm.movieName.value;
        var Description = detailsForm.movieDescription.value
        newMovie(movieNmae,Description);
        detailsForm.reset();
        return false;
      };

    var newMovie = function(name,desp){
        var IDno = Math.random().toString(36).substr(2,7)+"_"+Math.random().toString(36).substr(2,7);
        var movie = {
          Name : name,
          Description :desp,
          Count : 0,
          p_1 : 0,
          p_2 : 0,
          p_3 : 0,
          id : IDno,
        }
        movieNames.push(movie);
        addMovieUI(movie);
        moviesRef.doc(`"${sessDate}"`).set({"Movie_data" :movieNames })
        .then(x => alert("movie updated"))
        .catch(err => alert(err))
        printPiehar();
    }

    // to edit and delete movie names
    document.querySelector("#mL").addEventListener('click',
    function(){
            if(event.srcElement.id){
            var itemid = event.target.closest('.btn').dataset.itemid;
            var type, idno,splitid;
            splitid = itemid.split('-');
            type = splitid[0];
            idno = splitid[1];
            if ( type === 'e')
            {  
              // to edit the movie
               editMovie(idno);
            }
            else if (type=== 's'){
                // to update edited movie
              var flag = editToSave(idno);
            if(!flag)
            {
              console.log("changed")
              DisplayMovies(movieNames);
              moviesRef.doc(`"${sessDate}"`).set({"Movie_data" :movieNames })
              .then(x => alert("movie edited and updated"))
              .catch(err => alert(err))
              printPiehar();  
            }
            }else if ( type === 'd'){  
                // to delete movie
              deleteMovie(idno)
              moviesRef.doc(`"${sessDate}"`).set({"Movie_data" :movieNames })
              .then(x => alert("movie deleted"))
              .catch(err => alert(err))
              printPiehar();  
            };
          }
        })

      var editMovie = function(idno){
        var name,desp;
        name = document.querySelector(`.en0-${idno}`).textContent;
        desp = document.querySelector(`.ed0-${idno}`).textContent;
        document.querySelector(`.en0-${idno}`).classList.add('d-none');
        document.querySelector(`.ed0-${idno}`).classList.add('d-none');
        document.querySelector(`.en1-${idno}`).value = name;
        document.querySelector(`.ed1-${idno}`).value = desp;
        document.querySelector(`.en1-${idno}`).classList.remove('d-none');
        document.querySelector(`.ed1-${idno}`).classList.remove('d-none');
        document.querySelector(`#e-${idno}`).classList.add('d-none');
        document.querySelector(`#e-${idno}`).classList.remove('d-inline-block');
        document.querySelector(`#s-${idno}`).classList.remove('d-none');
      }
      
      var editToSave= function(idno2){

        var name2,desp2,flag=0;  
        name2 = document.querySelector(`.en1-${idno2}`).value;
          desp2 =document.querySelector(`.ed1-${idno2}`).value;
          movieNames.forEach((e,i)=>{
            if(e.id == idno2)
            {
              if(e.Name !== name2 || e.Description !== desp2)
                  {
                    e.Name = name2;
                    e.Description = desp2;
                    flag = 1;
                  }
            }
          })
        document.querySelector(`.en1-${idno2}`).classList.add('d-none');
        document.querySelector(`.ed1-${idno2}`).classList.add('d-none');
        document.querySelector(`#e-${idno2}`).classList.remove('d-none');
        document.querySelector(`#s-${idno2}`).classList.add('d-none');
         return flag ? false : true
        }

        var deleteMovie = function(idno2){
            var index;
          movieNames.forEach((e,i)=>{
            if(e.id == idno2){
                index = i;
            }
          })
          movieNames.splice(index,1);
          DisplayMovies(movieNames);
        }

        // to display piecharts
        var printPiehar = function(){
          setTimeout(()=>{
         pieArray(movieNames);
         ;},1000);
       };

       var pieArray = function(objp)
       {
         var i;
         for( i =1;i<=3;i++){
           var pdata = [['movie','count']]
             objp.forEach(e =>{
               var ename = e.Name;
               var ecount = parseFloat((i==1)? e.p_1:(i==2)?e.p_2:e.p_3)
               var arrp = [ename,ecount];
               pdata.push(arrp);
             })
             // console.log(pdata)
             drawChart(pdata);
             google.charts.setOnLoadCallback(drawChart(pdata));
   
       
       function drawChart(pdata2) {
         var data = google.visualization.arrayToDataTable(pdata2);
         var options = {
           title: `priority${i}`
         };
   
       var chart = new google.visualization.PieChart(document.getElementById(`piechart${i}`));
     
         chart.draw(data, options);
   
      }
           };
       };


      //  to display users
       var displayUserName =function(user){
        user.forEach( (e,i)=>{
          var userHtml=`<tr>
          <th scope="row">${i+1}</th>
          <td>${e.user_name}</td>
          <td>${e.p1}</td>
          <td>${e.p2}</td>
          <td>${e.p3}</td>
          </tr>`;  
        document.querySelector(domstrings.displayUser).insertAdjacentHTML('beforeend',userHtml);
        })
      }
    // end
});

control();