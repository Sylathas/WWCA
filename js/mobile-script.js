// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

// We listen to the resize event
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

var week1div = $(`<div class='project'><img src='http://placekitten.com/100/150' onclick='imageGallery(1, "Niccolò Abate")'><p>Niccolò<br>Abate</p></div>
  <div class='project'><img src='http://placekitten.com/100/150' onclick='imageGallery(1,"Alvise Aspesi")'><p>Alvise<br>Aspesi</p></div>
  <div class='project'><img src='http://placekitten.com/100/150' onclick='imageGallery(1,"Massimiliano Villa")'><p>Massimiliano<br>Villa</p></div>
  <div class='project'><img src='http://placekitten.com/100/150' onclick='imageGallery(1,"Marta Crippa")'><p>Marta<br>Crippa</p></div>
  <div class='project'><img src='http://placekitten.com/100/150' onclick='imageGallery(1,"Davide Perucchini")'><p>Davide<br>Perucchini</p></div>
  <div class='project'><img src='http://placekitten.com/100/150' onclick='imageGallery(1,"Federico Cordelli")'><p>Federico<br>Cordelli</p></div>
  <div class='project'><img src='http://placekitten.com/100/150' onclick='imageGallery(1,"Elisa Carbone")'><p>Elisa<br>Carbone</p></div>`);
var term;
var nome;
var commands = {
  help: function() {
    this.echo(`\n[[;rgba(0,150,0,1);]info [[;rgba(0,0,0,0.8);] - description of the project
[[;rgba(0,150,0,1);]weeks[[;rgba(0,0,0,0.8);] - list of the available weeks
[[;rgba(0,150,0,1);]weekx[[;rgba(0,0,0,0.8);] - as x the number of the week\n`)
  },
  weeks: function() {
    this.echo("This week is currently in progress. \nThe words are [[;rgba(0,150,0,1);]Spirit[[;rgba(0,0,0,0.8);] and [[;rgba(0,150,0,1);]Advertisement.\n")
  },
  info: function() {
    this.echo(`The Weekly Word Challenge is a creative game.
The rules consist in choosing 2 random words every week and making a completely free creative project linked to them.
At the end of the week we meet up virtually on Discord and discuss the projects and the thought process behind them.
This website is an archive of those project.
\n\nWe are:\n[[!;;;;https://www.instagram.com/sylathas/]Niccolò Abate]\n[[!;;;;https://www.instagram.com/alvise_aspesi]Alvise Aspesi]
[[!;;;;https://www.instagram.com/massimilianocasonvilla]Massimiliano Cason Villa]\n[[!;;;;https://www.instagram.com/martacrippaa]Marta Crippa]
[[!;;;;https://www.instagram.com/lerman.theboy]Davide Perucchini]\n`)
  },
  week1: function() {
    this.echo('\n');
    this.echo(week1div);
    this.echo('\n');
  }

};

function ready() {
  $('body').terminal(commands, {
      greetings: '\n[[;rgba(0,150,0,1);]Welcome to the Weekly Words Challenge Archive!\nType [[;rgba(0,0,255,1);]help [[;rgba(0,150,0,1);]to get the list of commands.\n The mobile website is a stripped down version of the desktop one. We recommend going there to get the full experience.\n',
      prompt: '[[;blue;]User@server:/ '
  });
}

function imageGallery(week, author) {
  var imageGallery = $(`
    <div class='imageGallery galleria'>
      <div class='status-bar_big' style="margin-bottom:5px">
        <div class="title">` + author + " " + week +`</div>
        <div class='close' onclick='closeDiv()'></div>
      </div>
      <div id='contenuto_galleria'>
        <span class='changeImage' onclick='lastphoto()'>&#60;</span>
        <img class='galleria' src='http://placekitten.com/200/300'>
        <span class='changeImage' onclick='nextphoto()'>&#62;</span>
      </div>
    </div>
  `);
  $( ".terminal" ).css("display", "none");
  $( "body" ).append(imageGallery);
}

function lastphoto() {
  var imageindexfull = $("img.galleria").attr('src');
  var oldimageindex = parseInt(imageindexfull.substr(imageindexfull.length - 3));
  var imageindex = oldimageindex - 1;
  if(oldimageindex > 300)
    $("img.galleria").attr("src","http://placekitten.com/200/" + imageindex);
}

function nextphoto() {
  var imageindexfull = $("img.galleria").attr('src');
  var oldimageindex = parseInt(imageindexfull.substr(imageindexfull.length - 3));
  var imageindex = oldimageindex + 1;
  if(oldimageindex < 310)
    $("img.galleria").attr("src","http://placekitten.com/200/" + imageindex);
}

function closeDiv(index) {
  $( ".terminal" ).css("display", "block");
  $("div.galleria").remove();
}
