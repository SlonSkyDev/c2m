// function parse(code, tabSize) {
// 	var tabsCount = [];
// 	code = code.split("\n");
// 	for(i in code) { // for every string

// 		var s = code[i];
// 		var entries = s.match(/ +/g);

// 		if(entries == null || (entries[0])[0] != " ") {
// 			tabsCount[i] = 0;
// 		} else {
// 			var tab = entries[0];
// 			tabsCount[i] = Math.floor(tab.length/tabSize);
// 		}			
// 	}
// 	return tabsCount;
// }

function parse(code) {
	var result = [];
	code = code.split("\n");
	for(i in code) { // for every string

		var s = code[i];
		var entries = s.match(/ +/g);
		var tab_length = 0;
		if(entries == null || (entries[0])[0] != " ") {
			tab_length = 0;
		} else {
			var tab = entries[0];
			tab_length = tab.length;
		}		
		var lineLength = s.length - tab_length;
		result.push({
			tab_length: tab_length,
			length: lineLength
		});
	}
	return result;
}


var TEMP_RESULT_OF_ANALYZER = [
	{
		tab_length: 4,
		length: 26
	},

	{
		tab_length: 8,
		length: 32
	},

	{
		tab_length: 7,
		length: 50
	},
	
	{
		tab_length: 4,
		length: 41
	},
	
	{
		tab_length: 0,
		length: 96
	}
];


function makeMelody(analysed, tabSize) {
	const TONICS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
	const SCALE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] ;
	const BASE_OCTAVE = 3;
	var melody = [];

	for(var i = 0; i < analysed.length; i++) {

		var line = analysed[i];

		// Get notes of chord

		var tonic = TONICS[Math.floor(line.tab_length / tabSize) % TONICS.length];
		var tonicOctave = BASE_OCTAVE + Math.floor(Math.floor(line.tab_length / tabSize) / TONICS.length);
		var chord = buildChord(tonic, tonicOctave);

		if (line.tab_length % tabSize != 0) {
			tonic = SCALE[
							(SCALE.indexOf(tonic) 						// original tonic
						    + line.tab_length % tabSize)    // shifted on difference semitons
						    % SCALE.length 								// in current octave
						 ];

			chord[0] = tonic + tonicOctave;
		}

		// Create arpegio

		chord.push(chord[chord.length - 2]); // add II level

		// Get duration

		var durations = makeDurations(chord.length, (line.length > 80)); // for length > 80 wrong beat

		// Add arpegio to melody

		for(var j = 0; j < chord.length; j++) {
			melody.push(
				{
					// FOR NEW PLAYER
					// note: chord[j],
				 	
				 	// FOR OLD PLAYER
				 	note: chord[j][0],
				 	octave: chord[j][1],  
				 	// ---------------

				 	duration: durations[j]
				}
			);
			console.log(chord[j] + ' ' + durations[j]);
		}
	}

	return melody;

	function buildChord(tonic, octave) {
		var chord = [];
		var tonicIndex = TONICS.indexOf(tonic);

		var IIlevelIndex = (tonicIndex + 2);
		var IIlevelOctave = octave + Math.floor(IIlevelIndex / TONICS.length);

		var IIIlevelIndex = (tonicIndex + 4); 
		var IIIlevelOctave = octave + Math.floor(IIIlevelIndex / TONICS.length);

		chord.push(TONICS[tonicIndex] + octave);
		chord.push(TONICS[IIlevelIndex % TONICS.length] + IIlevelOctave);
		chord.push(TONICS[IIIlevelIndex % TONICS.length] + IIIlevelOctave);

		return chord;
	}

	function makeDurations(count, incorrect) {

		// FOR NEW PLAYER
		// var DURATIONS_SET = ['1n', '2n', '4n', '8n']; 

		// FOR_OLD PLAYER
		var DURATIONS_SET = [1, 0.5, 0.25, 0.125];
		// ------------------------

		var durations = [];
		for(var i = 0; i < count; i++) {
			if(incorrect) {
				durations.push(DURATIONS_SET[Math.floor(Math.random()*DURATIONS_SET.length)]); // random duration
			} else {
				durations.push(DURATIONS_SET[2]);
			}
		}
		return durations;
	}

}


// var synth = new Tone.FMSynth().toMaster();

// function playMelody(melody) {
// 	for(var i = 0; i < melody.length; i++) {
// 		var n = melody[i];
// 		synth.triggerAttackRelease(n.note, n.duration);
// 	}
// }

//schedule a series of notes to play as soon as the page loads
// synth.triggerAttackRelease('C4', '4n', '8n');


// OLD CODE

// function makeMelody(tabsCount) {
// 	var notes = ["C", "D", "E", "F", "G", "A", "B"];
// 	var durations = [1, 0.5, 0.25, 0.125, 0.0625];
// 	var melody = [];
// 	for(i in tabsCount) {
// 		var note = tabsCount[i] % 7;
// 		var octave = 4 + Math.floor(tabsCount[i]/7);
		
// 		var duration = durations[2];

// 		if(i % 4 == 0 || i % 5 == 0 || i % 13 == 0) {
// 			duration = durations[3];
// 		}

// 		melody[i] = { 
// 			'note':notes[note], 
// 			'octave':octave, 
// 			'duration':duration
// 		};
// 	}
// 	return melody;
// }

var stop;
function playMelody(melody) {
	var piano = Synth.createInstrument('acoustic');
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



