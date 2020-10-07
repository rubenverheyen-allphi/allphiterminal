let allphiCommands = [
    { name: 'ceo', fn: function(ARGV) { return 'Roel Vaneerdewegh' } },
    { name: 'whois', fn: function(ARGV) { return '"AllPhi is een onafhankelijk consultancy bedrijf gespecialiseerd in software ontwikkeling met een duidelijke focus op technologie (Microsoft .NET)."' } },
    { name: 'mission', fn: function(ARGV) { return '\"AllPhi enables the next generation 🖥️ software developers who will change and build the 🌍 world of tomorrow in which we 🏡 live, ❤️ love and 💼 work.\"' } },
    { name: 'logo', fn: function() { return logo(); } },
    { name: 'offices', fn: function() { return 'Westerlo & Merelbeke' } },
    { name: 'bugs', fn: () => '🐛 🐜 🦗 🦟' }
];

var customCommands = {
    allphi: {
        name: 'allphi',
        man: man(),
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

function man() {
    let returnValue = 'Usage: allphi <command>\n\n';
    returnValue += 'where <command> is one of:\n    '
    allphiCommands.sort(function(a, b) {
        if (a.name > b.name) {
            return 1;
        } else if (a.name < b.name) {
            return -1;
        }
        return 0;
    }).forEach(function(el) {
        returnValue += `${el.name}, `;
    });
    return returnValue.substring(0, returnValue.length - 2);
}

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