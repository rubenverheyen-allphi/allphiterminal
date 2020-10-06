let allphiCommands = [
    { name: 'ceo', man: 'Who leads the company?', fn: function(ARGV) { return 'Roel Vaneerdewegh' } },
    { name: 'whois', man: 'What is the defenition of AllPhi?', fn: function(ARGV) { return '"AllPhi is een onafhankelijk consultancy bedrijf gespecialiseerd in software ontwikkeling met een duidelijke focus op technologie (Microsoft .NET)."' } },
    { name: 'mission', man: 'Outputs the mission statement of AllPhi', fn: function(ARGV) { return '\"AllPhi enables the next generation software developers who will change and build the world of tomorrow in which we live, love and work.\"' } },
    { name: 'logo', man: 'Displays the logo in ascii art', fn: function() { return logo(); } }
];

var customCommands = {
    allphi: {
        name: 'allphi',
        man: 'todo: manual for AllPhi',
        fn: function allphi(ARGV) {
            if (!ARGV || !ARGV['_'].length) {
                return this.man;
            }

            let input = ARGV['_'];

            var temp = allphiCommands.find(el => el.name === input[0]);
            if (temp) {
                return temp.fn();
            }

            return `No action found for "allphi ${input[0]}"`;
        }
    }
}

var myShell = new TermlyPrompt('#terminal-container', { env: { USER: 'dev ', HOSTNAME: ' &phi;' } });
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