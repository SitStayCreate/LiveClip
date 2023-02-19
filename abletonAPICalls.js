outlets = 1;
//Log function from compusition
function log() {
  for(var i=0,len=arguments.length; i<len; i++) {
    var message = arguments[i];
    if(message && message.toString) {
      var s = message.toString();
      if(s.indexOf("[object ") >= 0) {
        s = JSON.stringify(message);
      }
      post(s);
    }
    else if(message === null) {
      post("<null>");
    }
    else {
      post(message);
    }
  }
  post("\n");
}

function getNotes(startTime, startPitch, timeRange, pitchRange){
    //Create LiveAPI oject
    var clipPath = "live_set view highlighted_clip_slot clip";
    var clip = new LiveAPI(clipPath);
	//TODO: Error handling for if no clip is highlighted?
	
    var notes = clip.call("get_notes", startTime, startPitch, timeRange, pitchRange);
    outlet(0, notes);
}

//notesString is just a way to get around not having args in Max 7
//it takes an array of 5 args [note_pitch, start_time, duration, velocity, muted(bool)]
//Represented as a string using spaces to delimit the args
//total args have to be divisible by 5
function setNotes(notesString){
	//TODO: Error handling for if no clip is highlighted?
	//TODO: get clip length from Live
    var clipPath = "live_set view highlighted_clip_slot clip";
    var clip = new LiveAPI(clipPath);

	//This isn't necessary in newer versions of Max, can just use args
    var notesArgs = notesString.split(" ");
	var argsLength = notesArgs.length;
	//API calls to set notes
    clip.call("set_notes");
    clip.call("notes", (argsLength / 5));
	for(var i = 0; i < argsLength; i+=5){
    	clip.call("note", 
			notesArgs[i],
			notesArgs[(i+1)],
			notesArgs[(i+2)],
			notesArgs[(i+3)],
			notesArgs[(i+4)]);
	}
    clip.call("done");
}

//notesString is just a way to get around not having args in Max 7
//it takes an array of 5 args [note_pitch, start_time, duration, velocity, muted(bool)]
//Represented as a string using spaces to delimit the args
//total args have to be divisible by 5
function replaceAllNotes(notesString){
	//TODO: Error handling for if no clip is highlighted?
	//TODO: get clip length from Live
	var clipPath = "live_set view highlighted_clip_slot clip";
    var clip = new LiveAPI(clipPath);
	
	if(notesString === "clear"){
		clip.call("select_all_notes");
		clip.call("replace_selected_notes");
		clip.call("notes", 0);
		clip.call("done");
	} else {
		//This isn't necessary in newer versions of Max, can just use args
		var notes = notesString.split(";")
		//API calls to replace notes
		clip.call("select_all_notes");
		clip.call("replace_selected_notes");

		clip.call("notes", (notes.length -1));
		for(var i = 0; i < (notes.length - 1); i++){
			var note = notes[i].split(",");
    		clip.call("note", 
				note[0],
				note[1],
				note[2],
				note[3],
				true);
		}
    	clip.call("done");
	}
}

//notesString is just a way to get around not having args in Max 7
//it takes an array of 5 args [note_pitch, start_time, duration, velocity, muted(bool)]
//Represented as a string using spaces to delimit the args
//total args have to be divisible by 5
function replaceSelectedNotes(notesString){
	//TODO: Error handling for if no clip is highlighted?
	var clipPath = "live_set view highlighted_clip_slot clip";
    var clip = new LiveAPI(clipPath);

	//API calls to replace notes
	clip.call("select_all_notes");
	//when there are no notes to add, notesString == "clear"
	if(notesString === "clear"){
		clip.call("replace_selected_notes");
		clip.call("notes 0");
	} else {
	//This isn't necessary in newer versions of Max, can just use args
    	var notesArgs = notesString.split(" ");
		var argsLength = notesArgs.length;
		
		clip.call("replace_selected_notes");
		clip.call("notes", (argsLength / 5));
	
		for(var i = 0; i < argsLength; i+=5){
    		clip.call("note", 
				notesArgs[i],
				notesArgs[(i+1)],
				notesArgs[(i+2)],
				notesArgs[(i+3)],
				notesArgs[(i+4)]);
		}
		clip.call("done");
	}
}