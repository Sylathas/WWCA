var shell = $('.shell').resizable({
  minHeight: 108,
  minWidth: 250
}).draggable({
  handle: '> .status-bar .title'
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
  <div class='project'><img src='http://placekitten.com/200/300' onclick='imageGallery(1,"Davide Perucchini")'><p>Davide Perucchini</p></div>`);
var term;
var nome;
var commands = {
  help: function() {
    this.echo(`\n[[;rgba(0,150,0,1);]info [[;rgba(0,0,0,0.8);] - description of the project
[[;rgba(0,150,0,1);]weeks[[;rgba(0,0,0,0.8);] - list of the available weeks
[[;rgba(0,150,0,1);]weekx[[;rgba(0,0,0,0.8);] - as x the number of the week\n`)
  },
  weeks: function() {
    this.echo(render('Week 1', 'Slant') + "\nThis week is currently in progress. \nThe words are [[;rgba(0,150,0,1);]Spirit[[;rgba(0,0,0,0.8);] and [[;rgba(0,150,0,1);]Advertisement.\n")
  },
  info: function() {
    this.echo(render('Info', 'Slant') + `\nThe Weekly Word Challenge is a creative game.
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
  console.log('ciao');
  $("div.galleria" + index).remove();
}
