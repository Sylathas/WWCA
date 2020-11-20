figlet.defaults({
  fontPath: 'https://unpkg.com/figlet@1.4.0/fonts/'
});
figlet.preloadFonts(["Slant"], ready);


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
    this.echo($(`<p><span style=\'color: green\'>info</span>  - description of the project</br>
<span style=\'color: green\'>weeks</span> - list of the available weeks</br>
<span style=\'color: green\'>weekx</span> - as x the number of the week</p>`));
  },
  weeks: function() {
    this.echo($('<p><span style=\'color: red\'>Week 1</span> is currently in progress.</br>The words are:</br> <span style=\'color: green\'>Spirit</span> and <span style=\'color: green\'>Advertisement</span>.</p>'));
  },
  info: function() {
    this.echo($(`<p>The <span style=\'color: red\'>Weekly Word Challenge</span> is a creative game. The rules consist in making a completely free creative project linked to two words chosen randomly.</br>
    At the end of the week we meet up virtually on Discord and discuss the projects and the thought process behind them.</br> This website is an archive of those project. This website is an archive of those project.</br></br>
    We are:</br><a href='https://www.instagram.com/sylathas/'>Niccolò Abate</a></br><a href='https://www.instagram.com/alvise_aspesi'>Alvise Aspesi</a></br><a href='https://www.instagram.com/massimilianocasonvilla'>Massimiliano Cason Villa</a>
    </br><a href='https://www.instagram.com/martacrippaa'>Marta Crippa</a></br><a href='https://www.instagram.com/lerman.theboy'>Davide Perucchini</a></p>`));
  },
  week1: function() {
    this.echo('\n');
    this.echo(week1div);
    this.echo('\n');
  }

};

function ready() {
  $('body').terminal(commands, {
      greetings: function() {this.echo($('<p style=\"color: green\">Welcome to the Weekly Words Challenge Archive!<br>Type <span style=\"color: blue\">help</span> to get the list of commands.<br> The mobile website is a stripped down version of the desktop one. We recommend going there to get the full experience.</p>'));},
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

// Fix to keyboard covering input space
document.body.addEventListener("focus", event => {
    const target = event.target;
    switch (target.tagName) {
        case "INPUT":
        case "TEXTAREA":
        case "SELECT":
            document.body.classList.add("keyboard");
    }
}, true);
document.body.addEventListener("blur", () => {
    document.body.classList.remove("keyboard");
}, true);
