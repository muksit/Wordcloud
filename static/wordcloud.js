$(document).ready(function(){
  $("#submitbutton").click(function(){
    $("svg").remove();

    var fill = d3.scale.ordinal()
        .range(colorbrewer.RdGy[5]);


    var inputword = $('#word').val();


    $.get("/ask", {word: inputword}, function(data){

        var sampletext = (Object.keys(data))
        
        d3.layout.cloud().size([800, 800])
            .words(sampletext.map(function(d) {
                return {text: d.toUpperCase(), size: 5 * (data[d])+ 5 };
                }))
            .rotate(function() { return ~~(Math.random() * 2) * 90; })
            .font("Impact")
            .fontSize(function(d) { return d.size; })
            .on("end", draw)
            .start();


        function draw(words) {
          d3.select("body").append("svg")
              .attr("width", 800)
              .attr("height", 800)
            .append("g")
              .attr("transform", "translate(400,400)")
            .selectAll("text")
              .data(words)
            .enter().append("text")
              .style("font-size", function(d) { return d.size + "px"; })
              .style("font-family", "Impact")
              .style("fill", function(d, i) { return fill(i); })
              .attr("text-anchor", "middle")
              .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
              })
              .text(function(d) { return d.text; });
        };

        


      
      }, "json");
      

      





  });

});

