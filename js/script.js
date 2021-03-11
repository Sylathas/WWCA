//Clock
var tday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var tmonth=["January","February","March","April","May","June","July","August","September","October","November","December"];

function GetClock(){
var d=new Date();
var nday=d.getDay(),nmonth=d.getMonth(),ndate=d.getDate(),nyear=d.getFullYear();
var nhour=d.getHours(),nmin=d.getMinutes(),nsec=d.getSeconds(),ap;

if(nhour==0){ap=" AM";nhour=12;}
else if(nhour<12){ap=" AM";}
else if(nhour==12){ap=" PM";}
else if(nhour>12){ap=" PM";nhour-=12;}

if(nmin<=9) nmin="0"+nmin;
if(nsec<=9) nsec="0"+nsec;

var clocktext=""+tday[nday]+", "+tmonth[nmonth]+" "+ndate+", "+nyear+" "+nhour+":"+nmin+":"+nsec+ap+"";
document.getElementById('clockbox').innerHTML=clocktext;
}

GetClock();
setInterval(GetClock,1000);

//Resize and Drag with JQueryUI
var shell = $('.shell').resizable({
  minHeight: 430,
  minWidth: 650
}).draggable({
  handle: '> .status-bar .title',
  containment: "#container"
});

figlet.defaults({
  fontPath: 'https://unpkg.com/figlet@1.4.0/fonts/'
});
figlet.preloadFonts(["Standard", "Slant"], ready);

var terminaliaperti = 1;
var galleryIndex = 0;
var openterminale = $(`
  <div class="shell osx light shadow">
    <div class="status-bar">
      <div class="title">Weekly Word Challenge Archive</div>
      <div class='close' onclick='closeDiv(0, "div.shell", false)'></div>
    </div>
    <div class="content"></div>
  </div>`);
var week1div = $(`<div class='project'><img src='http://placekitten.com/200/300' onclick='imageGallery(1, "Niccolò Abate")'><p>Niccolò Abate</p></div>
  <div class='project'><img src='http://placekitten.com/200/300' onclick='imageGallery(1,"Alvise Aspesi")'><p>Alvise Aspesi</p></div>
  <div class='project'><img src='http://placekitten.com/200/300' onclick='imageGallery(1,"Massimiliano Villa")'><p>Massimiliano Villa</p></div>
  <div class='project'><img src='http://placekitten.com/200/300' onclick='imageGallery(1,"Marta Crippa")'><p>Marta Crippa</p></div>
  <div class='project'><img src='http://placekitten.com/200/300' onclick='imageGallery(1,"Davide Perucchini")'><p>Davide Perucchini</p></div>
  <div class='project'><img src='http://placekitten.com/200/300' onclick='imageGallery(1,"Federico Cordelli")'><p>Federico Cordelli</p></div>
  <div class='project'><img src='http://placekitten.com/200/300' onclick='imageGallery(1,"Elisa Carbone")'><p>Elisa Carbone</p></div>`);
var term;
var nome;
var commands = {
  help: function() {
    this.echo($(`<p><span style=\'color: green\'>info</span>  - description of the project</br>
<span style=\'color: green\'>weeks</span> - list of the available weeks</br>
<span style=\'color: green\'>weekx</span> - as x the number of the week</p>`));
  },
  weeks: function() {
    this.echo(render('Week 1', 'Slant'));
    this.echo($('<p><span style=\'color: red\'>Week 1</span> is currently in progress.</br>The words are: <span style=\'color: green\'>Spirit</span> and <span style=\'color: green\'>Advertisement</span>.</p>'));
  },
  info: function() {
    this.echo(render('Info', 'Slant'));
    this.echo($(`<p>The <span style=\'color: red\'>Weekly Word Challenge</span> is a creative game. <br>The rules consist in making a creative project on any medium you like linked to two words chosen randomly every week.
    At the end of the week we meet up virtually on Discord to discuss the projects and the thought process behind them.</br> This website is an archive of those project.</br></br>
    We are:</br><a href='https://www.instagram.com/sylathas/'>Niccolò Abate</a></br><a href='https://www.instagram.com/alvise_aspesi'>Alvise Aspesi</a></br><a href='https://www.instagram.com/massimilianocasonvilla'>Massimiliano Cason Villa</a>
    </br><a href='https://www.instagram.com/martacrippaa'>Marta Crippa</a></br><a href='https://www.instagram.com/lerman.theboy'>Davide Perucchini</a></p>`));
  },
  week1: function() {
    this.echo('\n');
    this.echo(week1div);
    this.echo('\n');
  },
  reset: function() {
    this.destroy();
  }

};

function ready() {
  var term = $('.content').terminal(commands, {
    prompt: '[[;blue;]User@server:/ ',
    enabled: $('body').attr('onload') === undefined,
    greetings: function() {
      this.echo(render('Weekly Word Challenge Archive', 'Standard'));
      this.echo($('<p style=\"color: green\">Welcome to the Weekly Words Challenge Archive!<br>Type <span style=\"color: blue\">help</span> to get the list of commands.<br> </p>'));
    }
  });
}

function render(text,font) {
  return figlet.textSync(text, {
    font: font || 'Slant',
    width: !term ? 80 : term.cols(),
    whitespaceBreak: true
  });
}

function imageGallery(week, author) {
  var imageGallery = $(`
    <div class='imageGallery galleria` + galleryIndex + `' style='top:` + Math.floor((Math.random() * window.innerHeight) + 1) + `px; left: ` + Math.floor((Math.random() * window.innerWidth) + 1) + `px; z-index: 2;'>
      <div class='status-bar' style="margin-bottom:5px">
        <div class="title">` + author + " " + week +`</div>
        <div class='close' onclick='closeDiv(` + galleryIndex + "," + "\"div.galleria\"," + "true" +`)'></div>
      </div>
      <span class='changeImage' onclick='lastphoto(` + galleryIndex + `)'>&#60;</span>
      <img class='galleria` + galleryIndex + `' src='http://placekitten.com/200/300'>
      <span class='changeImage' onclick='nextphoto(` + galleryIndex + `)'>&#62;</span>
    </div>
  `);
  $( "body" ).append(imageGallery);
  $('.imageGallery').draggable({
    handle: '> .status-bar .title'
  });
  galleryIndex++;
}

function lastphoto(index) {
  var imageindexfull = $("img.galleria" + index).attr('src');
  var oldimageindex = parseInt(imageindexfull.substr(imageindexfull.length - 3));
  var imageindex = oldimageindex - 1;
  if(oldimageindex > 300)
    $("img.galleria" + index).attr("src","http://placekitten.com/200/" + imageindex);
}

function nextphoto(index) {
  var imageindexfull = $("img.galleria" + index).attr('src');
  var oldimageindex = parseInt(imageindexfull.substr(imageindexfull.length - 3));
  var imageindex = oldimageindex + 1;
  if(oldimageindex < 310)
    $("img.galleria" + index).attr("src","http://placekitten.com/200/" + imageindex);
}

function closeDiv(index, div, gallery) {
  if (gallery)
    $(div + index).remove();
  else {
    $('.content').terminal().destroy();
    $(div).remove();
    terminaliaperti--;
    $('#open_terminale').removeClass('open_terminale');
    $('#open_terminale').addClass('open_terminale1');
  }
}

function openTerminal() {
  if(terminaliaperti == 0){
    $( "body" ).append(openterminale);
    var term = $('.content').terminal(commands, {
      prompt: '[[;blue;]User@server:/ ',
      enabled: $('body').attr('onload') === undefined,
      greetings: function() {
        this.echo(render('Weekly Word Challenge Archive', 'Standard'));
        this.echo($('<p style=\"color: green\">Welcome to the Weekly Words Challenge Archive!<br>Type <span style=\"color: blue\">help</span> to get the list of commands.<br> </p>'));
      }
    });
    var shell = $('.shell').resizable({
      minHeight: 430,
      minWidth: 650
    }).draggable({
      handle: '> .status-bar .title',
      containment: "#container"
    });
    terminaliaperti++;
    changeMode(true);
    $('#open_terminale').removeClass('open_terminale1');
    $('#open_terminale').addClass('open_terminale');
  }
}

function changeMode(ans) {
  var mode = $('.modalita').text();
  console.log(mode);
  if ((mode == 'Dark Mode' && !ans) || (mode == 'Light Mode' && ans)){
    $('.shell').css({'border': '2px solid gray'});
    $(".shell .terminal").css({'--color': 'white', "--background": "black"});
    $('.cmd').css({'color': 'white', 'background': '#303030'});
    $('.status-bar').css('background', '#303030	');
    $('.upper-bar').css({'background-color': '#303030	', 'color': 'white', 'border': '1px solid gray'});
    $('.title').css('color', 'white');
    $('.close').css('border', '1px solid gray');
    $('body').css({'background': 'linear-gradient(90deg, black 2px, transparent 1%) center, linear-gradient(black 2px, transparent 1%) center, #303030	', 'background-size': '4px 4px'});
    if(!ans){$('.modalita').text('Light Mode')}
  } else if ((mode == 'Light Mode' && !ans) || (mode == 'Dark Mode' && ans)){
    console.log(ans);
    $('.shell').css({'--background': 'white', '--color': 'black', 'border': '2px solid black'});
    $(".shell .terminal").css({'--color': 'black', "--background": "white"});
    $('.status-bar').css('background', '#fff');
    $('.upper-bar').css({'background-color': '#fff', 'color': 'black', 'border': '2px solid black'});
    $('.title').css('color', 'black');
    $('.close').css('border', '2px solid black');
    $('body').css({'background': 'linear-gradient(90deg, white 2px, transparent 1%) center, linear-gradient(white 2px, transparent 1%) center, black', 'background-size': '4px 4px'});
    if(!ans){$('.modalita').text('Dark Mode')};
  }
}
