
let timeTicks = [];
let len = [];

;
(function () {
	
	var xMarks = [];
	var num1 = 10;
	var num2 = 30;
	var buff01=2;
	var buff1 = 2*buff01;
	var length2 = 5;
	var length3 = 6;
	var height1 = 30;
	var height4 = height1 - length2;
	var height5 = 40;
	var pad = 0;
	var kmark = -10;
	var tag_width = 149;
	
	var tag_widthGrad = 50;
	var count = 0;
	var topMargin=30;
	var rightMargin=1200;
	var bottomMargin=20;
	var leftMargin=40 ;
	var width = 4320;
	var chartHeight = 550;
	var interval_list = [];
	var counter = [];
	var leave_blank_size = 1060;
	
	var marginheight=chartHeight-height1;
	
	
	var topic_list = list_of_topics
	
	var topicTags = topic_list.length;
	len.push(topicTags);


	console.log("topicTags", topicTags)

	var no_of_topics_inatag = 3;
	var topicInEachInts = topic_list[0]["text_in_topic"].length;
	// console.log(topicInEachInts, "topicInEachInts")
	var init_no = 0;
	var ColourScale = d3.scale.linear()
		.domain([0, 0.98])
		.range(["#ffffff", "#ffffff"]);
	
	var init_s = 0;
	var text_scale = d3.scale.linear()
		.domain([0, 25])
		.range([10, 10])

	var mainTopics = 1;
	var lineshape = d3.svg.line()
		.x(function (d) {
			return d.x;
		})
		.y(function (d) {
			return d.y;
		})


	// Descriptive Statistics
	// Most interacted documents and  No. of documents interacted

	var des;
	doc_count_in_interval = []
	doc_counts_total = []
	topic_prob = []
	int_count_in_interval = []

	for (des = 0; des < topicTags; des++) {
		int_count_in_interval.push(topic_list[des]["interval_int_count"]);
	}

	for (des = 0; des < topicTags; des++) {
		doc_count_in_interval.push(topic_list[des]["interval_doc_count"]);
	}
	for (des = 0; des < topicTags; des++) {
		doc_counts_total.push(topic_list[des]["total_doc_count"]);
	}
	for (des = 0; des < topicTags; des++) {
		topic_prob.push(topic_list[des]["probability"]);
	}
	var topicHeight=marginheight * 1 / no_of_topics_inatag 

	var gradscale = d3.scale.linear()
		.domain([0, 0.5])
		.range(["#ffffff", "#ffffff"]);
	
	// var	maincanvas = d3.select("#mainDiv").append("svg")
	// 	.attr("width", width + leftMargin + rightMargin)
	// 	.attr("height", marginheight + topMargin + bottomMargin)
	// 	.append("g")
	// 	.attr("transform", "translate(" + leftMargin + "," + topMargin + ")");

	var canvas = d3.select("#mainViz").append("svg")
		.attr("width", width)
		.attr("height", marginheight +2*height1)
		.append("g")
		.attr("transform", "translate(" + leftMargin + "," + topMargin + ")");
	
	var front = canvas.append("g");

	var textTopic_scale = d3.scale.linear()
		.domain([0, 32])
		.range([topicHeight - 2*buff1, 2*length3]);
		
	var maintopicScale = d3.scale.linear()
		.domain([0, 100])
		.range([0, 100]);

	var othcanvas = d3.select("#mainViz").append("svg")
		.attr("width", width)
		.attr("height", marginheight+height1)
		.append("g")
		.attr("transform", "translate(" + leftMargin + "," + topMargin + ")");

	var frontDiag = othcanvas.append("g");
	


	var init_1 = 0;
	var init_3 = 1;
	var init_2 = 1;

	init();
	
	var last, next;
	var xtick;
	var timetick;
	// function init() {

	// 	console.log("initiating!")

	// 	chartWidth = width - leftMargin - rightMargin;
	// 	chartHeight = height - topMargin - bottomMargin;

	// 	// load data from json
	// 	d3.json("./data/stream_1.json").then(function(json){

	// 		data = json;
	// 		console.log("JSON loaded");
	// 		initializeChart();
	// 		createAxes();

	// 		drawDots();
	// 		d3.json("./data/stream_2.json").then(function(json){

	// 			data = json;
	// 			console.log("JSON2 loaded");
	// 			//initializeChart();
	// 			//createAxes()
	// 			drawSquare();
	// 		}).catch(function(error) {console.warn(error)})
	// 		// hint HERE!
	// 		// you could load more data here using d3.json() again...

	// 	}).catch(function(error) {console.warn(error)})

	// }//end init

	function initializeChart() {
		chart = d3.select("#chartDiv").append("svg")
			.attr("width", width)
			.attr("height", height);

		chart.plotArea = chart.append("g")
			.attr("transform", "translate(" + leftMargin + "," + topMargin + ")");
	}

	function createAxes() {

		// x axis
		chart.xScale = d3.scaleLinear()
			.domain([dataXRange.min, dataXRange.max])
			.range([0, chartWidth]);

		chart.xAxis = d3.axisBottom()
			.tickSizeOuter(0)
			.scale(chart.xScale);

		chart.xAxisContainer = chart.append("g")
			.attr("class", "x axis scatter-xaxis")
			.attr("transform", "translate(" + (leftMargin) + ", " + (chartHeight + topMargin) + ")")
			.call(chart.xAxis);

		// x axis header label
		chart.append("text")
			.attr("class", "x axis scatter-xaxis")
			.style("font-size", "12px")
			.attr("text-anchor", "middle")
			.attr("transform", "translate(" + (leftMargin + chartWidth / 2.0) + ", " + (chartHeight + (bottomMargin / 2.0)) + ")")
			.text(xAxisLabelHeader);

		// y axis labels
		chart.yScale = d3.scaleLinear()
			.domain([dataYRange.min, dataYRange.max])
			.range([chartHeight, 0]);

		chart.yAxis = d3.axisLeft()
			.scale(chart.yScale);

		chart.yAxisContainer = chart.append("g")
			.attr("class", "y axis scatter-yaxis")
			.attr("transform", "translate(" + leftMargin + ", " + topMargin + ")")
			.call(chart.yAxis);

		// y axis header label
		chart.append('text')
			.style("font-size", "12px")
			.attr("class", "heatmap-yaxis")
			.attr("text-anchor", "middle")
			.attr("transform", "translate(" + (leftMargin / 2.0) + ", " + (chartHeight / 2.0) + ") rotate(-90)")
			.text(yAxisLabelHeader);
	}






	function wordsinbin(topicTags) {

		// For each topicInterval(topicTag), we need to put text in each of the bins in the tag

		for (var k = 0; k < topicTags; k += 1) {

			putwordsinbin(k)
		}
	}

	function drawBins() {
		// do something with the data here!

		// plot dots
		var dots = chart.plotArea.selectAll(".dot")
			.data(data)
			.enter().append("circle")
				.attr("class", "dot")
				.attr("cx", function(d) { return chart.xScale(d.xVal); })
				.attr("cy", function(d) { return chart.yScale(d.yVal); })
				.attr("r", circleRadius)
				.attr("fill", "blue")
				.on("click", function(d) { 
					console.log("circle: ", d.xVal, ", ", d.yVal);
					d3.selectAll(".dot")
					.each(function(d1){
						if(d3.select(this).attr("x") == d.xVal){
							d3.select(this).style("fill", "yellow")
						}
					});	
				})
				.on('mouseover', function(d) {
					d3.select(this).style('fill','red')
					console.log('mouseover');})
				.on('mouseout', function(d) {
						d3.select(this).style('fill', 'blue');
						console.log('out');
					});
	}
	function drawSquare() {
		
		var shapes = chart.plotArea.selectAll(".rect")
			.data(data)
			.enter().append("rect")
				.attr("class", "rect")
				.attr("x", function(d) { return chart.xScale(d.xVal); })
				.attr("y", function(d) { return chart.yScale(d.yVal); })
				.attr("width", squareSize)
				.attr("height",squareSize)
				.attr("fill", "green")
				.on("click", function(d) {
					console.log("square: ", d.xVal, ", ", d.yVal);
					d3.selectAll(".rect")
					.each(function(d1){
						if(d3.select(this).attr("x") == d.xVal){
							d3.select(this).style("fill", "yellow")
						}
					})})
				.on('mouseover', function(d) {
					d3.select(this).style('fill','red')
					console.log('mouseover');})
				.on('mouseout', function(d) {
						d3.select(this).style('fill', 'green');
						console.log('out');
					})
	}
	function putwordsinbin(k) {


		var text_in_topiclist = topic_list[k]["text_in_topic"];
		// console.log("text_in_topiclist", typeof text_in_topiclist)

		putwordsinbins(text_in_topiclist, k)
	}



	function putwordsinbins(text_in_topiclist, k) {
		var each


		for (each of Array(topicInEachInts).keys()) {

			terms_in_dict = text_in_topiclist[each]["terms"];
			// console.log("terms_in_dict",(terms_in_dict))
			putwordsinbins1(text_in_topiclist, each, terms_in_dict, k)
			// console.log("allright")



		}

	}

	function putwordsinbins1(text_in_topiclist, each, terms_in_dict, k) {
		topic_id = "a" + k + "b" + each
		// terms_in_summary = terms_in_dict
		x_cord=xMarks[k]
		// terms_in_summary = terms_in_topic.map(function (d, k) {
		// 	return {
		// 		text: d.text
		// 	};

		// });
		// console.log("terms_in_summary",(terms_in_summary))
		putTerms(topic_id, each, terms_in_dict, x_cord)

	}
	// function drawSquare() {
	// 	// do something with the data here!

	// 	// plot dots
	// 	var dots = chart.plotArea.selectAll(".rect")
	// 		.data(data)
	// 		.enter().append("rect")
	// 			.attr("class", "rect")
	// 			.attr("x", function(d) { return chart.xScale(d.xVal); })
	// 			.attr("y", function(d) { return chart.yScale(d.yVal); })
	// 			.attr("width", squareSize)
	// 			.attr("height",squareSize)
	// 			.attr("fill", "green")
	// 			.on("click", function(d) {
	// 				console.log("square: ", d.xVal, ", ", d.yVal);
	// 				d3.selectAll(".rect")
	// 				.each(function(d1){
	// 					if(d3.select(this).attr("x") == d.xVal){
	// 						d3.select(this).style("fill", "yellow")
	// 					}
	// 				})})
	// 			.on('mouseover', function(d) {
	// 				d3.select(this).style('fill','red')
	// 				console.log('mouseover');})
	// 			.on('mouseout', function(d) {
	// 					d3.select(this).style('fill', 'green');
	// 					console.log('out');
	// 				})
	// }
	// function putwordsinbin(k) {
	function putTerms(topic_id, each, terms_in_topic, cord) {
		var topicSize=terms_in_topic.length;
		var namevar1="." + topic_id
		yvar=topicHeight * each
		d3.select(namevar1)
			.selectAll("text")
			.data(terms_in_topic)
			.enter().append("text")
			.style("text-anchor", "middle")
			.attr("x", cord)
			.attr("y", function (d, i) {
				// console.log("data", d,i)
				return ((yvar+6*buff1)+(topicHeight-33)/topicSize*i);})
			.attr("font-family", 'Helvetica')
			.attr('font-size', "15px")
			.style('fill', function (d) {
				return "0B615E";	
			})
			.text(function (d, i) {
				return d.text;
			});

	}

	function init() {

		var xbar = 0;
		var ybar = 0;
		var zbar = 1;
		var hbar = 1;
		var count = 440;
	
		for(let i = 0; i< topicTags; i++ ){
			xMarks.push(count);
			count+= 180;
		}
		makenupdatebins();

	}

	function create_id(i) {

		//for each of the topics in the Interval create and pass name of the bin to each of those bins 
		for (j in [...Array(topicInEachInts).keys()]){
				int_name="a" + i;
				top_name="b" + j
			
				// elem_name = "a" + i + 
				
				pass_name_to_bin(int_name, top_name, i, j)
			   
		}
	}



	function makenupdatebins() {

		// var count = 440;
	
		// for(let i = 0; i< topicTags; i++ ){
		// 	xMarks.push(count);
		// 	count+= 180;
		// }


	

		// xMarks = [460, 640, 820, 1000, 1180, 1360, 1540, 1720, 1900, 2080, 2260, 2440, 2620, 2800, 2980, 3160, 3340 ]



		front.append("g")
			.attr("class", "textBins");


		primaryAxis(interval_list,topicTags, topic_list);

		createnmakebins(topicTags, no_of_topics_inatag, topicHeight,xMarks)
		addwordinbin(topicTags)
	}

	// function makenaddaxes() {
	// 	primaryAxis();

	// }

	function createnmakebins(topicTags, no_of_topics_inatag, topicHeight,xMarks) {
		createbin(topicTags);

		makebin(topicTags, no_of_topics_inatag, topicHeight,xMarks);


	
	}




	function pass_name_to_bin(int_name,top_name, i, j) {
			xcord=xMarks[i]
			ycord=textTopic_scale(height1)
			classname="textBins"
			elem_name=int_name+top_name;
			width=height5;

		
			getwordsintobin(xcord,ycord, classname, elem_name, width, int_name);
	}
	// var init_time=("00") + ":" + ("00")
			// if (i == 0) {
			// 	interval_list.push({
			// 		"text": init_time
			// 	});
			// }
	function addwordinbin(topicTags) {
		wordsinbin(topicTags);

	}

	function getwordsintobin(xcord, ycord, classname, name, width, name2) {
		namevar = "." + classname;
		xvar = xcord - 1 / 2 * width;
		yvar = ycord - 1 / 2 * maintopicScale(50) * 2 ;
		wvar = width * 2 ;
		hvar = maintopicScale(50) * 2;

		d3.selectAll(namevar)
			.append("g")
			.attr("class", name + " " + name2)
			.append("rect")
			.attr("x", xvar)
			.attr("y", yvar)
			.attr("width", wvar)
			.attr("height", hvar)
			.attr("rx", 10)
			.attr("ry", 10)
			.style("fill", "none")
			.attr("stroke", "#0B615E")
			.attr("stroke-width", 4)
			.style("opacity",1);
			;
	}

	function createbin(topicTags) {
		//for each topic Interval create ID for each of the three topics
		for (i in [...Array(topicTags).keys()]){
			create_id(i)
		}
	}
	var interval_list = [];
	var counter = [];

	function makebin(topicTags, no_of_topics_inatag, topicHeight,xMarks) {
		//for each of the topic intervals we need to fix the bin coordinates
		for (i in [...Array(topicTags).keys()]) {
			
			for (const j of Array(no_of_topics_inatag).keys()) {
				
				// for each of the topics we need to fix the bin coordinates
				var yvar=(topicHeight) * (j)-0.5*buff1;
				var xcord=xMarks[i] - tag_width / 2;
				topic_id=".a" + i + "b" + j
				d3.select(topic_id).select("rect")
					.attr("x", function () {
						return xcord;})
					.attr("y", function () {
						return yvar;})
					.attr("height", function () {
						return topicHeight-2.75*buff1;})
					.attr("width", function () {
						return tag_width;})
						}
		}
	}
	function primaryAxis(interval_list,topicTags, topic_list) {
		var init_time=("00") + ":" + ("00")
		interval_list.push({
			"text": init_time
		})
		// var mins=
		for (i in [...Array(topicTags).keys()]) {
			var axis_time = topic_list[i]["since_end_time"];
			var mm=Math.floor(axis_time/60)
			var ss=axis_time%60
			var mm_str= "0"+mm
			var ss_str="0"+ss
			var min_str="00"+mm
			var lenmm=mm_str.length
			var lenss=ss_str.length
			var lenmin=min_str.length
			var mm_str_trunc=mm_str.slice(lenmm-2, lenmm)
			var ss_str_trunc=ss_str.slice(lenss-2, lenss)
			var min_str_trunc=min_str.slice(lenmin-3,lenmin)	
			var time_str=mm_str_trunc+":"+ss_str_trunc	
			// console.log("axis_time", axis_time)
			var timeTop = topic_list[i]["text_in_topic"];
			interval_list.push({
				"text": time_str,
				"minute": min_str_trunc
			});			
		}
		print(interval_list);
	}
	function print(list){
		for(ob in list){
			timeTicks.push(list[ob]);
		}
		console.log(timeTicks);
	}
})();