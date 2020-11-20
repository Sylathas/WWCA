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

var galleryIndex = 0;
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
  }

};

function ready() {
  var term = $('.content').terminal(commands, {
    prompt: '[[;blue;]User@server:/ ',
    enabled: $('body').attr('onload') === undefined,
    greetings: function() {
      return render('Weekly Word Challenge Archive', 'Standard') +
      '\n[[;rgba(0,150,0,1);]Welcome to the Weekly Words Challenge Archive!\nType [[;rgba(0,0,255,1);]help [[;rgba(0,150,0,1);]to get the list of commands.\n';
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
    <div class='imageGallery galleria` + galleryIndex + `'>
      <div class='status-bar' style="margin-bottom:5px">
        <div class="title">` + author + " " + week +`</div>
        <div class='close' onclick='closeDiv(` + galleryIndex + `)'></div>
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

function closeDiv(index) {
  $("div.galleria" + index).remove();
}
