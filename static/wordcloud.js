$(document).ready(function(){
  $("#hashform").submit(function(){
    $("svg").remove(); 

    var fill = d3.scale.ordinal()
        .range(colorbrewer.Spectral[5]);


    var inputword = $('#word').val();


    $.get("/ask", {word: inputword}, function(data){

        var sampletext = (Object.keys(data))
        
        d3.layout.cloud().size([1000, 800])
            .words(sampletext.map(function(d) {
                return {text: d.toUpperCase(), size: 5 * (data[d])+ 5 };
                }))
            .rotate(function() { return ~~(Math.random() * 2) * 90; })
            .font(function(d){
                for (x=0; x < d.text.length; x++){
                  character = d.text
                  if (character.charCodeAt(x) > 2600)
                    {return "emoji"} 
                  else
                    {return "Impact"}
                }
            })
            .fontSize(function(d) { return d.size; })
            .on("end", draw)
            .start();


        function draw(words) {
          d3.select("body").append("svg")
              .attr("width", 1000)
              .attr("height", 800)
            .append("g")
              .attr("transform", "translate(500,400)")
            .selectAll("text")
              .data(words)
            
            .enter().append("a")
              .text(function(d) { return d.text;})
              .attr("href", function(d){return "/?word=" + "d.text"})
              .on("click", function(d){
                drawwordcloud(d.text);
              })
              .append("text")
              .style("font-family", "Impact")
              .attr("text-anchor", "middle")
              .style("opacity", 0)
              .attr("href", function(d){
                return "/?word=" + d.text+ "";})
              .text(function(d) { return d.text;})
              .transition()
                .attr("transform", function(d) {
                  return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .style("fill", function(d, i) { return fill(i); })
                .style("opacity", 1)
                .duration(500)
              .transition()
                .style("font-size", function(d) { return d.size + "px"; })
                .duration(2000)
              .style("font-family",  function(d){
                for (x=0; x < d.text.length; x++){
                  character = d.text
                  if (character.charCodeAt(x) > 2600)
                    {return "emoji"} 
                  else
                    {return "Impact"}
                }
              })
              
              

              ;

        };

        
          
        


      
      }, "json");
      

      

  

    event.preventDefault();

  });

});

function drawwordcloud(newword){
  $("svg").remove(); 
  var fill = d3.scale.ordinal()
    .range(colorbrewer.Spectral[5]);

  var inputword = newword

  $.get("/ask", {word: inputword}, function(data){
      var sampletext = (Object.keys(data))
      
      d3.layout.cloud().size([1000, 800])
          .words(sampletext.map(function(d) {
              return {text: d.toUpperCase(), size: 5 * (data[d])+ 5 };
              }))
          .rotate(function() { return ~~(Math.random() * 2) * 90; })
          /*.font("Impact")*/
          .font(function(d){
              for (x=0; x < d.text.length; x++){
                character = d.text
                if (character.charCodeAt(x) > 2600)
                  {return "emoji"} 
                else
                  {return "Impact"}
              }
          })
          .fontSize(function(d) { return d.size; })
          .on("end", draw)
          .start();


      function draw(words) {
        d3.select("body").append("svg")
            .attr("width", 1000)
            .attr("height", 800)
          .append("g")
            .attr("transform", "translate(500,400)")
          .selectAll("text")
            .data(words)
          .enter().append("a")
              .text(function(d) { return d.text;})
              .attr("href", function(d){return "/?word=" + "d.text"})
              .on("click", function(d){
                
                drawwordcloud(d.text);
              })
            .append("text")
            .style("font-family", "Impact")
            .attr("text-anchor", "middle")
            .style("opacity", 0)
            .attr("href", function(d){
              return "/?word=" + d.text+ "";})
            .text(function(d) { return d.text;})
            .transition()
              .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
              })
              .style("fill", function(d, i) { return fill(i); })
              .style("opacity", 1)
              .duration(500)
            .transition()
              .style("font-size", function(d) { return d.size + "px"; })
              .duration(2000)
            .style("font-family",  function(d){
              for (x=0; x < d.text.length; x++){
                character = d.text
                if (character.charCodeAt(x) > 2600)
                  {return "emoji"} 
                else
                  {return "Impact"}
              }
            })
            
            

            ;

      };

      
        
      


    
    }, "json");
}

