var shell = $('.shell').resizable({
    minHeight: 108,
    minWidth: 250
}).draggable({
    handle: '> .status-bar .title'
});

figlet.defaults({fontPath: 'https://unpkg.com/figlet@1.4.0/fonts/'});
figlet.preloadFonts(["Slant"], ready);

var term;
var commands = {
  help: function() {
    this.echo("\n[[;rgba(0,150,0,1);]info [[;rgba(0,0,0,0.8);] - description of the project \n" +
    "[[;rgba(0,150,0,1);]weeks[[;rgba(0,0,0,0.8);] - list of the available weeks \n" +
    "[[;rgba(0,150,0,1);]week(x)[[;rgba(0,0,0,0.8);] - x is the number of the week\n")
  }
};

function ready() {
  var term = $('.content').terminal(commands, {
      prompt: 'user@host:/',
      // detect iframe codepen preview
      enabled: $('body').attr('onload') === undefined,
      greetings: function() {
        return render('Weekly Word Challenge Archive', 'Slant') +
        '\n[[;rgba(0,150,0,1);]Welcome to the Weekly Words Challenge Archive! Type help to get the list of commands necessary to browse the website.\n';
      }
  });
}

function render(text, font) {
  return figlet.textSync(text, {
    font: font || 'Slant',
    width: !term ? 80 : term.cols(),
    whitespaceBreak: true
  });
}
