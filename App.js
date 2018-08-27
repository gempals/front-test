    var parse = "";
    var loop = 1;
    var urlAPI = "https://my-json-server.typicode.com/destri8/demo/data";
       
    function getData(){
      $(".loading").removeAttr('style'); 
      parse = "";
      $.ajax({
              type: "GET",
              contentType: "application/json; charset=utf-8",
              url: urlAPI,
              data: "{}",
              dataType: "json",
              success: function (data){
                  $.each(data,function(key,val){
                    parse += "<tr>";
                    parse += "<td>"+data[key].fullname+"</td>";
                    parse += "<td><img src="+data[key].photo+"></td>";
                    parse += "<td>"+data[key].trx_count+"</td>";
                    parse += "<td class='progress' id='"+data[key].trx_amount+"'><canvas id='cav_"+data[key].trx_amount+"' height='20' class='prog'></canvas></td>";
                    parse += "</tr>";
                    loop++;
                  });
                  setData(parse);
              },
              error: function (result) {
                  alert("Error");
              }
      });
    }

    function setData(data){
      $(".grid tbody").html(data);
      $(".loading").attr('style','display:none;'); 

      var total = 0;
      var persentance = 0;
      var ids = $('.progress').map(function() {
        return $(this).attr('id');
      });
      $.each(ids,function(key,val){
        total += val*1;
      });
      $.each(ids,function(key,val){
        persentance  = (val*1/total)*100;
        setBar(100,persentance,val);
      }); 
      
    }

    function setBar(max,value,id){
        var ids = "cav_"+id;
        var bar = document.getElementById(ids);
        var bar_chart = new Chart(bar, {
          type: 'horizontalBar',
          data: {
            labels: [],
            datasets: [{
              data: [value],
              backgroundColor: "rgba(51,230,125,1)"
            }, {
              data: [max - value],
              backgroundColor: "lightgrey",
            }, ]
          },
          options: {
            legend: {
              display: false
            },
            tooltips: {
              enabled: false
            },
            scales: {
              xAxes: [{
                display: false,
                stacked: true
              }],
              yAxes: [{
                display: false,
                stacked: true
              }],
            } // scales
          } // options
        });
    }
