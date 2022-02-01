outlets=7;
function Major(tonic) {
	var second = tonic + 2;
	var third = second + 2;
	var fourth = third + 1;
	var fifth = fourth + 2;
	var sixth = fifth + 2;
	var seventh = sixth + 2;
	outlet(0, seventh);
	outlet(1, sixth);
	outlet(2, fifth);
	outlet(3, fourth);
	outlet(4, third);
	outlet(5, second);
	outlet(6, tonic);
}

function Minor(tonic){
	var second = tonic + 2;
	var third = second + 1;
	var fourth = third + 2;
	var fifth = fourth + 2;
	var sixth = fifth + 1;
	var seventh = sixth + 2;
	outlet(0, seventh);
	outlet(1, sixth);
	outlet(2, fifth);
	outlet(3, fourth);
	outlet(4, third);
	outlet(5, second);
	outlet(6, tonic);
}

function DrumRack(){
	outlet(0, 42);
	outlet(1, 41);
	outlet(2, 40);
	outlet(3, 39);
	outlet(4, 38);
	outlet(5, 37);
	outlet(6, 36);
}