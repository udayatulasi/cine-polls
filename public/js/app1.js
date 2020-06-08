      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Work',     11],
          ['Eat',      2],
          ['Commute',  2],
          ['Watch TV', 2],
          ['Sleep',    7]
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


        movies = [
        {
            id: 1,
            movie_name: 'khaidi',
            description: 'feel good movie',
            count: 0,
            p_1: 0,
            p_2: 0,
            p_3: 0
          },
          {
            id: 2,
            movie_name: 'Rowdy',
            description: 'story is good',
            count: 0,
            p_1: 0,
            p_2: 0,
            p_3: 0
          },
          {
            id: 3,
            movie_name: 'Arjun',
            description: 'love story',
            count: 0,
            p_1: 0,
            p_2: 0,
            p_3: 0
          },
          {
            id: 4,
            movie_name: 'Idiot',
            description: 'Comedy story',
            count: 0,
            p_1: 0,
            p_2: 0,
            p_3: 0
          },
          {
            id: 5,
            movie_name: 'Badshah',
            description: 'Not so good',
            count: 0,
            p_1: 0,
            p_2: 0,
            p_3: 0
          },
          {
            id: 6,
            movie_name: 'Saaho',
            description: 'High Budget Movie',
            count: 0,
            p_1: 0,
            p_2: 0,
            p_3: 0
          }
        ]

        
       
         
        
        
       
      document.querySelector(".primary-submit").addEventListener('click', function () {
            let password = document.querySelector('.form-control').value;
            if(password === "" || password !== "123") {
               let error = document.querySelector('.error-class');
                 error.textContent = 'enter valid Password';      
            } else if(password === '123') {
                
                document.querySelector('.error-class').classList.add('d-none');
                 document.querySelector('#userName').classList.add('d-none');
                 document.querySelector('.primary-submit').classList.add('d-none');
                 Userfunction(movies);
    
              
             } 
      });
  
       function Userfunction (movies) {

      // display the movies
        displayMovies(movies);

      // add priority 
       addDisplay();
      
      //verify Priority
      // verPriority();
         
      };

      function displayMovies (movies) {
        html = '<form class="movieRating"><input type ="submit" class="after-submit"><table class="table"><br></br><thead><tr><th scope="col">#</th><th scope="col">Movie</th><th scope="col">Description</th><th scope="col">priority</th></tr></thead></table></form> ';
        document.querySelector('.primary-submit').insertAdjacentHTML('afterend', html);

        for(var i = 0; i <= 5; i++) {
          newhtml = `<tr class = "table-width"><th scope="row">${movies[i].id}</th><td>${movies[i].movie_name}</td><td>${movies[i].description}</td><td><select id="first-choice-${i}" name="rating_ 1"><option selected value ="">Priority</option><option  value="1">priority-1</option><option value="2">priority-2</option><option value="3">priority-3</option></select></td></tr>`;
          document.querySelector('.table').insertAdjacentHTML('beforeend', newhtml);
          
        }
      };

      function addDisplay () {
      
        
         var movie_rating = document.querySelector('.movieRating')
         movie_rating.onsubmit = function(e){
          e.preventDefault()
        var ratingArray = [];
           
        var display = 0;
        var count_1 = 0;
        var count_2 = 0;
        var count_3 = 0;
         
        for (let i = 0; i < 6 ; i++){
        var val = parseInt(document.querySelector(`#first-choice-${i}`).value);
        if (val !== "") {
          if(val === 1)
          {
            if(count_1 === 1) {
              console.log('break');
              ratingArray=[];
              alert('hi')
              display = 1
              break;
            }
            count_1 += 1;
            ratingArray.push(i,1)
            
          }
          if(val === 2)
          {
            if(count_2 === 1) {
              console.log('break');
              ratingArray=[];
              alert('hi')
              display = 1
              break;
            }
            count_2 += 1;
            //  console.log(val)
            ratingArray.push(i,2)

          }
          if(val === 3)
          {
            if(count_3 === 1) {
              console.log('break');
              ratingArray=[];
              alert('hi')
              display = 1
              break;
            }
            count_3 += 1;
            // console.log(val)
            ratingArray.push(i,3)

          }
        
         
           }
        }

if(count_1 === 1 && count_2 === 1 && count_3 === 1){
        console.log(ratingArray);
        if(display === 0){
        document.querySelector('.movieRating').classList.add('d-none');
        displayMovies(movies);
        document.querySelector('.after-submit').classList.add('d-none');
        }}
        else{
          alert('select 3')
        }
      }
    };