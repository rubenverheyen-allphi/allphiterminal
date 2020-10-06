var customCommands = {
    allphi: {
        name: 'allphi',
        man: 'todo: manual for AllPhi',
        fn: function allphi(ARGV) {
          if (!ARGV || !ARGV['_'].length) {
            return this.man;
          }

          let input = ARGV['_'];

          if (input[0].toLowerCase().trim() === 'ceo') {
            return 'Roel Vaneerdewegh';
          }

          if (input[0].toLowerCase().trim() === 'whois') {
            return '"AllPhi is een onafhankelijk consultancy bedrijf gespecialiseerd in software ontwikkeling met een duidelijke focus op technologie (Microsoft .NET)."';
          }

          if (input[0].toLowerCase().trim() === 'mission') {
            return '\"AllPhi enables the next generation software developers who will change and build the world of tomorrow in which we live, love and work.\"'
          }

          if (input[0].toLowerCase().trim() === 'logo') {
            return logo();
          }

          return `No action found for "allphi ${input[0]}"`;
        }
    }
  }

var myShell = new TermlyPrompt('#terminal-container', {env: {USER: 'dev ', HOSTNAME: ' &phi;'}});
customCommands.help = myShell.ShellCommands.help;
customCommands.man = myShell.ShellCommands.man;
myShell.ShellCommands = myShell.registerCommands(myShell, customCommands);

function logo() { 
  return `@@@@@@@@@@@@@@@@@@@@@@(((((//@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@((((((((((((((((((((((/@@@@@@@@@@@@@
@@@@@@@@@@(((((((((((((((((((((((((((((((@@@@@@@@@
@@@@@@@(((((((((((.   ((((       /(((((((((/@@@@@@
@@@@@((((((((((    (((((    ((/     ,((((((((/@@@@
@@@*(((((((((    /((((((   ((((((     (((((((((@@@
@@((((((((((     (((((((   (((((((     (((((((((,@
@/((((((((((    *(((((((   ((((((((    ((((((((((@
@((((((((((/    ,(((((((   ((((((((    (((((((((((
/(((((((((((     (((((((   ((((((((    (((((((((((
(((((((((((((    ,((((((   (((((((    ((((((((((((
/(((((((((((((     (((((   ((((((   *(((((((((((((
@((((((((((((((((     ((   ((     ((((((((((((((((
@/((((((((((((((((((((((   ((((((((((((((((((((((@
@@/(((((((((((((((((((((  .(((((((((((((((((((((@@
@@@@((((((((((((((((((((  .((((((((((((((((((((@@@
@@@@@/((((((((((((((((((   (((((((((((((((((( @@@@
@@@@@@@/((((((((((((((((   ((((((((((((((((@@@@@@@
@@@@@@@@@@/((((((((((((((((((((((((((((( @@@@@@@@@
@@@@@@@@@@@@@@/(((((((((((((((((((((@@@@@@@@@@@@@@  
`;
}