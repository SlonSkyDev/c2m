function parse(code, tabSize) {
	var tabsCount = [];
	code = code.split("\n");
	for(i in code) { // for every string

		var s = code[i];
		var entries = s.match(/ +/g);

		if(entries == null || (entries[0])[0] != " ") {
			tabsCount[i] = 0;
		} else {
			var tab = entries[0];
			tabsCount[i] = Math.floor(tab.length/tabSize);
		}			
	}
	return tabsCount;
}

function makeMelody(tabsCount) {
	var notes = ["C", "D", "E", "F", "G", "A", "B"];
	var durations = [1, 0.5, 0.25, 0.125, 0.0625];
	var melody = [];
	for(i in tabsCount) {
		var note = tabsCount[i] % 7;
		var octave = 4 + Math.floor(tabsCount[i]/7);
		
		var duration = durations[2];

		if(i % 4 == 0 || i % 5 == 0 || i % 13 == 0) {
			duration = durations[3];
		}

		melody[i] = { 
			'note':notes[note], 
			'octave':octave, 
			'duration':duration
		};
	}
	return melody;
}

var stop;
function playMelody(melody) {
	var piano = Synth.createInstrument('piano');
	var n = 0;
	stop = false;
	play();

	function play() {
		var note = melody[n++];
		piano.play(note['note'], note['octave'], note['duration']);	
		if(n == melody.length || stop) {

    		$("#play").prop("disabled", false);

			return;
		}
		setTimeout(play, note['duration']*1000-25);
	}

}

function stopPlaying() {
	stop = true;
}



