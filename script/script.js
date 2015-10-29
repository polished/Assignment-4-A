var margin = {t:50,r:125,b:50,l:125};
var width = document.getElementById('plot').clientWidth - margin.r - margin.l,
    height = document.getElementById('plot').clientWidth - margin.t - margin.b;

var canvas = d3.select('.plot')
    .append('svg')
    .attr('width',width+margin.r+margin.l)
    .attr('height',height + margin.t + margin.b)
    .append('g')
    .attr('class','canvas')
    .attr('transform','translate('+margin.l+','+margin.t+')');

//Scale for the size of the circles
var scaleR = d3.scale.sqrt().domain([5,100]).range([5,120]);


d3.csv('data/olympic_medal_count.csv', parse, dataLoaded);

function dataLoaded(err,rows){

    //TODO: fill out this function
    d3.selectAll('.btn-group .year')
        .on('click', function() {

            var year = d3.select(this).attr('data-year');



                rows.sort(function(a,b){
                    return b[year] - a[year];
                });
                var top5 = rows.slice(0,5);
                draw(top5, year);
                console.log("NEW DATA");


        }
    )

}



//function draw(rows, year){
function draw(rows, year){
    //TODO: Complete drawing function, accounting for enter, exit, update
    //Note that this function requires two parameters
    //The second parameter, "year", determines which one of the three years (1900,1960,2012) to draw the medal counts based on
    var nodes = canvas.selectAll('.country')
        .data(rows, function(d,i){
            //console.log(rows[i]);
            //console.log(rows[i][year]);
            return d.country;
        });

    var nodesEnter = nodes.enter()
        .append('g')
        .attr('class','country');

    nodesEnter
        .append('circle')
        .attr('r',function(d,i){
            //console.log(d[year]);
            return d[year];
        })
        //.attr('cy', '50')
        //.style('fill', function(d,i) {
        //    return '#' + Math.floor(Math.random()*16777215).toString(16)});

        .style('stroke-width', '3')
        .style('stroke', '#'+Math.floor(Math.random()*16777215).toString(16))
        .style('fill', 'none');


        //.attr('transform',function(d,i){return 'translate('+i*200+','+height/8+')';})
        //.attr('cy', '50');


    nodesEnter
        .append('text')
        .attr('class','label')
        .text(function(d){ return d.country; })
        .attr('text-anchor','middle')
        //.attr('x= ',function(d,i){return i*200})
        .style('font-size', '15px')
        .style('fill', 'black');
        //.attr('transform',function(d,i){return 'translate('+i*200+','+height/8+')';})
        //.attr('cy', '50');


    nodesEnter
        .append('text')
        .attr('class','count')
        .attr('text-anchor','middle')
        .attr('transform','translate(0,100)')
        .text(function(d){ return d[year]; });
        //.attr('transform',function(d,i){return 'translate('+i*200+','+height/8+')';})
        //.attr('cy', '50');

    //    //Exit

    nodes.exit()
        .transition()
        .duration(500)
        //.style('opacity','0')
        .remove();

    nodes
        .transition()
        .duration(500)
        .attr('transform',function(d,i){return 'translate('+i*200+','+height/8+')';})
        .select('circle')
        .attr('r', function(d){ return d[year]; } )
        .attr('cy', '50');


}

function parse(row){
    //@param row is each unparsed row from the dataset
    return {
        country: row['Country'],
        1900: +row['1900'],
        1960: +row['1960'],
        2012: +row['2012']
    };
}