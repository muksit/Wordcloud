$(document).ready(function(){
  $("#hashform").submit(function(){
    $("svg").remove(); 

    $(".loading").toggle();

    var fill = d3.scale.ordinal()
        .range(colorbrewer.Spectral[5]);

    var inputword = $('#word').val();
    var words = {};

    $.get("/ask", {word: inputword}, function(data){

        var sampletext = (Object.keys(data))

        $('#word').val('');
        
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
          draw(words);
      }, "json");

    event.preventDefault();
  });
});

function drawwordcloud(newword){
  $("svg").remove(); 
  

  var inputword = newword.toLowerCase()
  var words = {};

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

          draw(words);
    }, "json");
}

function draw(words) {
  
  var fill = d3.scale.ordinal()
    .range(colorbrewer.Spectral[5]);


  d3.select("body").append("svg")
      .attr("width", 1000)
      .attr("height", 800)
    .append("g")
      .attr("transform", "translate(500,400)")
    .selectAll("text")
      .data(words)
    .enter().append("a")
        .on("click", function(d){
          d3.select(".loading").text("Graphing " + d.text + " ...")
          drawwordcloud(d.text);
        })
      .append("text")
      .style("font-family", "Impact")
      .attr("text-anchor", "middle")
      .style("opacity", 0)
      .attr("class", "text")
      .text(function(d) { return d.text;})
      .on("mouseover", function(){
        d3.select(this)
        .transition()
        .duration(250)
        .style("opacity", 0.75)})
      .on("mouseout", function(){
        d3.select(this)
        .transition()
        .duration(150)
        .style("opacity", 1)})
      .transition()
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .style("fill", function(d, i) { return fill(i); })
        .style("opacity", 1)
        .duration(500)
      .transition()
        .style("font-size", function(d) { return d.size + "px"; })
        .duration(1500)
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
