// function loadjscssfile(filename){
//   console.log("hi");
//   var fileref=document.createElement('script')
//   fileref.setAttribute("type","text/javascript")
//   fileref.setAttribute("src", filename)
// }

$("#mainViz > svg:nth-child(2)").css("height", "0")
console.log(timeTicks);



//line
let width = 180 * len[0];

let hr = `<hr class = "line" style="width:${width}px";>`
// console.log(hr);


$(".lineContainer").append(hr);


//time
var timeA = [];
for(val of timeTicks){
  timeA.push(val.text);
}

// let lenofTime = timeA.length;
// console.log(lenofTime);
console.log(timeA);
let mar = 140;

for(let val of timeA){
  
  let str = `<span class="time" style="margin-right:${mar}px">${val}</span>`
  $(".timeContainer").append(str);

 
    mar += 2;


  
}


$('select').on('change', function() {


  switch(this.value) {
    case "0":
      // code block
      window.open("./../TOPICVIZ/index.html");
      break;
    case "1":
      // code block
      window.open("../TOPICVIZ/index1.html");
      break;
    case "2":
      // code block
      window.open("../TOPICVIZ/index2.html");
      break;
    case "3":
      // code block
      window.open("../TOPICVIZ/index3.html");
      break;
    case "4":
      // code block
      window.open("../TOPICVIZ/index4.html");
      break;
    case "5":
      // code block
      window.open("../TOPICVIZ/index5.html");
      break;
    case "6":
      // code block
      window.open("../TOPICVIZ/index6.html");
      break;
    case "7":
      // code block
      window.open("../TOPICVIZ/index7.html");
      break;
    case "8":
      // code block
      window.open("../TOPICVIZ/index8.html");
      break;
    case "9":
      // code block
      window.open("../TOPICVIZ/index9.html");
      break;
    case "10":
      // code block
      window.open("../TOPICVIZ/index10.html");
      break;
    case "11":
      // code block
      window.open("../TOPICVIZ/index11.html");
      break;
  
    default:
      // code block
      alert('select a valid statement');
  }
});

$("button").click(function(){
  window.open("../TOPICVIZ/index.html");
});

$("#mainViz > svg:nth-child(1) > g > g > g").on("mouseover", "g", function (event) {
  event.preventDefault();
  let className = (this.className)
  let a = [];

  for (let prop in className) {
    var c = className[prop];
    a.push(c);

  }

  let finalClass = a[0].slice(-2).match(/\d+/)[0];

  display(finalClass);
});


function display(n) {
  $(".stats").empty();
  let total = doc_counts_total[n];
  let mostFreqInt = '';
  let mostFreqStr = '';
  let count = 0;
  let sum = 0;
  let sum1 = 0;



  ///frequent
let sortable1 = [];
for(let prop in int_count_in_interval[n]){
  sortable1.push([prop, int_count_in_interval[n][prop]]);

}

sortable1.sort(function (a, b) {
  return b[1] - a[1];
});

for (let i = 0; i < 3; i++) {
  sum1 += sortable1[i][1];
  mostFreqInt += sortable1[i][0] + ",";
}




///other
  let breadth = doc_counts_total[n];


  let sortable = [];
  for (let prop in doc_count_in_interval[n]) {
    sortable.push([prop, doc_count_in_interval[n][prop]]);
  }

  sortable.sort(function (a, b) {
    return b[1] - a[1];
  });


  for (let i = 0; i < 3; i++) {
    sum += sortable[i][1];
    mostFreqStr += sortable[i][0] + ",";
  }

  let ratio = breadth / sum;

  let dispStr = `<table class = 'statsTable' style="width:100%">
<tr>
<th>Total documents</th>
<th>Most Frequently interacted</th>
<th>Breadth/Depth</th>
<th>Most frequent interactions</th>

</tr>
<tr>
<td id = '1'>${total}</td>
<td id = '2'>${mostFreqStr}</td>
<td id = '3'> ${ratio}</td>
<td id = '4'> ${mostFreqInt}</td>


</tr>

</table>`;

  $('.stats').append(dispStr);
}

// $( "#mainViz > svg:nth-child(1) > g > g > g > g.a0" ).mouseover(function(ev) {





//     $(".stats").empty();
//     let total = doc_counts_total[0];
//     let mostFreqStr = '';
//     let count = 0;
//     let sum = 0;

//     let breadth = doc_counts_total[0];


// let sortable = [];
// for(let prop in doc_count_in_interval[0]){
//     sortable.push([prop, doc_count_in_interval[0][prop]]);
// }

// sortable.sort(function(a, b) {
//     return b[1] - a[1];
// });


// for(let i = 0; i< 5; i++){
//     sum += sortable[i][1];
//     mostFreqStr += sortable[i][0] + ",";
// }

// let ratio = breadth/sum;

// console.log(`dsfs: ${sortable}`);
// let dispStr = `<table class = 'statsTable' style="width:100%">
// <tr>
//   <th>Total documents</th>
//   <th>Most Frequently interacted</th>
//   <th>Breadth/Depth</th>
// </tr>
// <tr>
//   <td id = '1'>${total}</td>
//   <td id = '2'>${mostFreqStr}</td>
//   <td id = '3'> ${ratio}</td>
// </tr>

// </table>`;

// $('.stats').append(dispStr);

// // $("#1").html = total ;
// // $("#2").html = mostFreqStr;
// // $("#3").html = ratio;






//   });


//   $( "#mainViz > svg:nth-child(1) > g > g > g > g.a1" ).mouseover(function(ev) {

//     var target = $(ev.target);
//     console.log(target);

//     $(".stats").empty();
//     let total = doc_counts_total[1];
//     let mostFreqStr = '';
//     let count = 0;
//     let sum = 0;

//     let breadth = doc_counts_total[1];


// let sortable = [];
// for(let prop in doc_count_in_interval[1]){
//     sortable.push([prop, doc_count_in_interval[1][prop]]);
// }

// sortable.sort(function(a, b) {
//     return b[1] - a[1];
// });


// for(let i = 0; i< 5; i++){
//     sum += sortable[i][1];
//     mostFreqStr += sortable[i][0] + ",";
// }

// let ratio = breadth/sum;


// let dispStr = `<table class = 'statsTable' style="width:100%">
// <tr>
//   <th>Total documents</th>
//   <th>Most Frequently interacted</th>
//   <th>Breadth/Depth</th>
// </tr>
// <tr>
//   <td id = '1'>${total}</td>
//   <td id = '2'>${mostFreqStr}</td>
//   <td id = '3'> ${ratio}</td>
// </tr>

// </table>`;

// $('.stats').append(dispStr);
//   });




//   $( "#mainViz > svg:nth-child(1) > g > g > g > g.a2" ).mouseover(function() {
//     $(".stats").empty();
//     let total = doc_counts_total[2];
//     let mostFreqStr = '';
//     let count = 0;
//     let sum = 0;

//     let breadth = doc_counts_total[2];


// let sortable = [];
// for(let prop in doc_count_in_interval[2]){
//     sortable.push([prop, doc_count_in_interval[2][prop]]);
// }

// sortable.sort(function(a, b) {
//     return b[1] - a[1];
// });


// for(let i = 0; i< 5; i++){
//     sum += sortable[i][1];
//     mostFreqStr += sortable[i][0] + ",";
// }

// let ratio = breadth/sum;


// let dispStr = `<table class = 'statsTable' style="width:100%">
// <tr>
//   <th>Total documents</th>
//   <th>Most Frequently interacted</th>
//   <th>Breadth/Depth</th>
// </tr>
// <tr>
//   <td id = '1'>${total}</td>
//   <td id = '2'>${mostFreqStr}</td>
//   <td id = '3'> ${ratio}</td>
// </tr>

// </table>`;

// $('.stats').append(dispStr);
//   });

//   $( "#mainViz > svg:nth-child(1) > g > g > g > g.a3" ).mouseover(function() {
//     $(".stats").empty();
//     let total = doc_counts_total[3];
//     let mostFreqStr = '';
//     let count = 0;
//     let sum = 0;

//     let breadth = doc_counts_total[3];


// let sortable = [];
// for(let prop in doc_count_in_interval[3]){
//     sortable.push([prop, doc_count_in_interval[3][prop]]);
// }

// sortable.sort(function(a, b) {
//     return b[1] - a[1];
// });


// for(let i = 0; i< 5; i++){
//     sum += sortable[i][1];
//     mostFreqStr += sortable[i][0] + ",";
// }

// let ratio = breadth/sum;


// let dispStr = `<table class = 'statsTable' style="width:100%">
// <tr>
//   <th>Total documents</th>
//   <th>Most Frequently interacted</th>
//   <th>Breadth/Depth</th>
// </tr>
// <tr>
//   <td id = '1'>${total}</td>
//   <td id = '2'>${mostFreqStr}</td>
//   <td id = '3'> ${ratio}</td>
// </tr>

// </table>`;

// $('.stats').append(dispStr);
//   });

//   $( "#mainViz > svg:nth-child(1) > g > g > g > g.a4" ).mouseover(function() {
//     $(".stats").empty();
//     let total = doc_counts_total[4];
//     let mostFreqStr = '';
//     let count = 0;
//     let sum = 0;

//     let breadth = doc_counts_total[4];


// console.log(doc_count_in_interval[4]);
// let sortable = [];
// for(let prop in doc_count_in_interval[4]){
//     sortable.push([prop, doc_count_in_interval[4][prop]]);
// }

// sortable.sort(function(a, b) {
//     return b[1] - a[1];
// });


// for(let i = 0; i< 5; i++){
//     sum += sortable[i][1];
//     mostFreqStr += sortable[i][0] + ",";
// }

// let ratio = breadth/sum;


// let dispStr = `<table class = 'statsTable' style="width:100%">
// <tr>
//   <th>Total documents</th>
//   <th>Most Frequently interacted</th>
//   <th>Breadth/Depth</th>
// </tr>
// <tr>
//   <td id = '1'>${total}</td>
//   <td id = '2'>${mostFreqStr}</td>
//   <td id = '3'> ${ratio}</td>
// </tr>

// </table>`;

// $('.stats').append(dispStr);
//   });

//   $( "#mainViz > svg:nth-child(1) > g > g > g > g.a5" ).mouseover(function() {
//     $(".stats").empty();
//     let total = doc_counts_total[5];
//     let mostFreqStr = '';
//     let count = 0;
//     let sum = 0;

//     let breadth = doc_counts_total[5];


// let sortable = [];
// for(let prop in doc_count_in_interval[5]){
//     sortable.push([prop, doc_count_in_interval[5][prop]]);
// }

// sortable.sort(function(a, b) {
//     return b[1] - a[1];
// });


// for(let i = 0; i< 5; i++){
//     sum += sortable[i][1];
//     mostFreqStr += sortable[i][0] + ",";
// }

// let ratio = breadth/sum;


// let dispStr = `<table class = 'statsTable' style="width:100%">
// <tr>
//   <th>Total documents</th>
//   <th>Most Frequently interacted</th>
//   <th>Breadth/Depth</th>
// </tr>
// <tr>
//   <td id = '1'>${total}</td>
//   <td id = '2'>${mostFreqStr}</td>
//   <td id = '3'> ${ratio}</td>
// </tr>

// </table>`;

// $('.stats').append(dispStr);
//   });