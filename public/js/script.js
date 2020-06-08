
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
var da = 0;
// da = x.get()
//   .then((ss) => {
//     d = ss.docs;
//     // return d
//     // x = JSON.parse(d[6].id)
//     // console.log(x)
//     // ex(x)
//     d.forEach((i) => {
//       console.log(i.id);
//     });
//   })
//   .catch((err) => {
//     console.log("Error getting documents", err);
//   });


google.charts.load('current', {'packages':['corechart']});    
     var userdata = [
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
       {
        id: 1,
        user_name: "udaya",
        p1: 5,
        p2: 6,
        p3: 9,
       },
       ];
  var backcontrol =(function(){

    var data ={
        cienma : [],
    };

    var session_Ddown =[]

    var editd = function(n,d,idn){
      var film;
      data.cienma.forEach(e =>
        {
          if(idn === e.id){
            e.Name = n;
            e.Description = d;
            film= e;
          }
        });
            return film;
    };

    return{

      UpdateMovies: function(Data){
          data.cienma=Data[0];
      },

      updateSession:function(updated){
          session_Ddown = updated;
          // console.log(session_Ddown)
      },

      session_data:function(){
        return session_Ddown;
      },

      addItem: function(name,desp){
        var ID;
        console.log(data.cienma.length)
      if (data.cienma.length > 0) {
        ID = parseInt(data.cienma[data.cienma.length - 1].id) + 1;
      } else {
        ID = 1;
      }
        var newMovie = {
          Name : name,
          Description :desp,
          Count : 0,
          p_1 : 0,
          p_2 : 0,
          p_3 : 0,
          id : ID,
        }
        return newMovie;
      },

      editDeatils: function(en,ed,eid){
         var edit= editd(en,ed,eid);
         return edit;
      },

      del: function(idno)
      {
        var allId = data.cienma.map(e => e.id);

        var index = allId.indexOf(idno);

        if(index >= 0)
        {
          data.cienma.splice(index,1);
        };
      },

    pieArray: function(){
      // console.log(data.cienma)
          return data.cienma;
    },

    };

  })();

  var uicontrol =(function(){
    var domstrings = {
      verify: '.verify',
      inputPass: '.inputPassword',
      login: '.login',
      mainpage: '.mainpage',
      Add: '.addMovie',
      AddMovie:'.addMovieDetails',
      cancel:'.cancel',
      Details:'.movieDetails',
      displayMovie: '.movie-list',
      displayUser: '.user_list'

    };

    var piechart2 = function(objp)
    {
      // console.log(objp)
      var i;
      for( i =1;i<=3;i++){
        var pdata = [['movie','count']]
          objp.forEach(e =>{
            var ename = e.Name;
            var ecount = parseFloat((i==1)? e.p_1:(i==2)?e.p_2:e.p_3)
            var arrp = [ename,ecount];
            pdata.push(arrp);
          })
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

    
        return{
          Display_movie:function(Details){
              Details[0].forEach((i)=>{
               this.addMovie(i)
              })
          },

      getdomstrings : function(){
          return domstrings;
      },
      display: function(){
        document.querySelector(domstrings.login).classList.add('d-none');
        document.querySelector(domstrings.mainpage).classList.toggle('d-none');
        document.querySelector('.animated').classList.add("delay-1s");

      },

      addMovie: function(nM){
          var html;

          html = `<tr class= f-${nM.id}>
          <th scope="row">1</th>
          <td><p class="d-inline-block en0-${nM.id}">${nM.Name}</p><input class="form-control en1-${nM.id} d-none" type="text"> </td>
          <td><p class="d-inline-block ed0-${nM.id}">${nM.Description}</p><input class="form-control ed1-${nM.id} d-none" type="text"></td>
          <td><button type="button" class="btn btn-warning d-inline-block" id="e-${nM.id}"><ion-icon class="del" name="create-outline"></ion-icon></button><button type="button" id="s-${nM.id}"class="btn btn-success d-none"><ion-icon class="del"name="checkmark-circle-outline"></ion-icon></button> </td>
          <td> <button type="button" class="btn btn-danger" id="d-${nM.id}"><ion-icon class="del"name="close-circle-outline"></ion-icon></button></td>
        </tr>`;

        document.querySelector(domstrings.displayMovie).insertAdjacentHTML('beforeend',html);
        document.querySelector(domstrings.Add).classList.remove('d-none');
        document.querySelector(domstrings.AddMovie).classList.add('d-none');
            },

      editMovie: function(idno){
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
        
      },

      editMovie2: function(idno2){

        var name2,desp2;  
        name2 = document.querySelector(`.en1-${idno2}`).value;
          desp2 =document.querySelector(`.ed1-${idno2}`).value;
        document.querySelector(`.en1-${idno2}`).classList.add('d-none');
        document.querySelector(`.ed1-${idno2}`).classList.add('d-none');
        document.querySelector(`#e-${idno2}`).classList.remove('d-none');
        document.querySelector(`#s-${idno2}`).classList.add('d-none');
        // printPiehar()
        return[name2,desp2];

        },

        update: function(movie){
          document.querySelector(`.en0-${movie.id}`).innerHTML = movie.Name;
          document.querySelector(`.ed0-${movie.id}`).innerHTML = movie.Description;
        },

        del: function(idno){
          document.querySelector(`.f-${idno}`).remove();
        },

        displayUser: function(obj){
          obj.forEach( (e,i)=>{
          var userHtml=`<tr>
          <th scope="row">${i+1}</th>
          <td>${e.user_name}</td>
          <td>${e.p1}</td>
          <td>${e.p2}</td>
          <td>${e.p3}</td>
        </tr>`;
        
        document.querySelector(domstrings.displayUser).insertAdjacentHTML('beforeend',userHtml);
      
      });

        },

        ArrayDetails : function(objA){
          
            piechart2(objA);

        },
    };

  })();

  var control = (function(bctrl,uctrl){

    var sessions = bctrl.session_data();
    var Movie_data = bctrl.pieArray();

     var printPiehar = function(){
       setTimeout(()=>{
      var pieAtD=bctrl.pieArray();
      uctrl.ArrayDetails(pieAtD);},1000);
    
    };

    var setUpEvent = function(){

      var dom = uctrl.getdomstrings();
      console.log('hi');
      var form = document.querySelector('.login');
      form.onsubmit = function(e){
        e.preventDefault();
        var verifyit = form.password.value;
        verify(verifyit);
        form.reset();
      }
      
      getSession();

      document.querySelector(dom.Add).addEventListener('click',function(){
        document.querySelector(dom.AddMovie).classList.remove('d-none');
        document.querySelector(dom.Add).classList.add('d-none');
      });

      document.querySelector(dom.cancel).addEventListener('click',function(){
        document.querySelector(dom.Add).classList.remove('d-none');
        document.querySelector(dom.AddMovie).classList.add('d-none');
      });

      var cal = document.querySelector(".cal")
      cal.onsubmit= function(e){
        e.preventDefault();
          var date =cal.date.value
        Createsession(date)
        cal.reset();
      }

      document.querySelector(".selectedDate").addEventListener('click',SelectedDate)
      
      var detailsForm =document.querySelector(dom.Details);
      detailsForm.onsubmit = function(e){
        e.preventDefault();
        var movieNmae = detailsForm.movieName.value;
        var Description = detailsForm.movieDescription.value
        addmovie(movieNmae,Description);
        detailsForm.reset();
      };

      document.querySelector(dom.displayMovie).addEventListener('click',ctrlED);
      
    };

    var SelectedDate = function(){
     var Seldate= document.querySelector(".selectSession").value;
     moviesRef.doc(`"${Seldate}"`).get().then(function(doc) {
       if (doc.exists) {
          var movieNames = doc.data()["cinema"];
          Movie_data.push(movieNames);
          bctrl.UpdateMovies(Movie_data);
          console.log(Movie_data)
          uctrl.Display_movie(Movie_data)
          printPiehar();
      } else {
          // doc.data() will be undefined in this case
          alert("No such date!");
      }
  })
    }

    var displaySession = function(){
      
      const myNode = document.querySelector(".session_form");
            myNode.innerHTML = '';
            var formHtml= ` <option></option>`;
        myNode.insertAdjacentHTML('beforeend',formHtml);
      
      sessions.forEach(e=>{
        var formHtml= `<option> ${e}</option>`;
        myNode.insertAdjacentHTML('beforeend',formHtml);
      })
     }

    var addmovie = function(Name,Desp){
      var newMovie;
      newMovie = bctrl.addItem(Name,Desp);
      uctrl.addMovie(newMovie);
      console.log(newMovie)
      Movie_data[0].push(newMovie)
      console.log(Movie_data)
      printPiehar();
    };
     
    
    var verify = function(pass){
      if(pass === '1')
      uctrl.display();

    };

    var ctrlED = function(event){
      var itemid =  event.target.parentNode.id;
      
      var type, idno,splitid;
      splitid = itemid.split('-');
      type = splitid[0];
      idno = parseInt(splitid[1]);

      if ( type === 'e')
      {  
         uctrl.editMovie(idno);
          // bctrl.editMovie(idno);
      }else if (type=== 's'){
        console.log(idno)
        var [ename,edesp]= uctrl.editMovie2(idno);
        var newMovie = bctrl.editDeatils(ename,edesp,idno);
        uctrl.update(newMovie);
        printPiehar();
        Movie_data = bctrl.pieArray();
        console.log(Movie_data);
      }else if ( type === 'd'){  
        bctrl.del(idno);
        uctrl.del(idno);
        printPiehar();  
        console.log(Movie_data)

      };
    

    };

    var getSession = function(){
        sessionWeekendRef.get()
        .then((e)=>{
          var dt = e.docs;
          dt=dt[0].data()["ses_arr"]; 
          
          bctrl.updateSession(dt)
          sessions = bctrl.session_data();
          displaySession();
          
        })
        .catch(e => console.log(e))
          
      

    }
      //create a session and post it to firebase and also add session to drop down list
    var Createsession = function(cal){
      sessions.push(cal)
      bctrl.updateSession(sessions);
      sessions = bctrl.session_data();
      displaySession();
      sessionWeekendRef.doc("list").update({"ses_arr" : sessions}).then((a) => alert("session created")).catch( e => console.log(e))
    }

    return{
       init: function(obj){
        uctrl.displayUser(obj);
        
        da = moviesRef.get()
    .then((ss) => {
      d = ss.docs;
      var data1={};
     var z= d.forEach((i) => {
        var y = i.id;
        var x = i.data()
        return x;
      });
     
    })
    .catch((err) => {
      console.log("Error getting documents", err);
    });
        setUpEvent();
    },  
    };

  })(backcontrol,uicontrol);

  control.init(userdata);
  



  




 
