/* 
written by b. bolles

so there's this weird bug that happens, whenever the selection index resets (past 2 to 0 or past 0 to 2)
all the shapes change to look slightly different (even though they ultimately look better). 

just pretend like that was intentional. 'cause it looks better anyway after the bug occurs.
*/

//tracks an index for selecting shapes
var selection = 0;
//array which holds every "drawn" object
var objectsOnscreen = [];

//i could have made an interface for these or something probably but whatever
//these three classes are objects that can be drawn onscreen

class Circle 
{
	constructor()
	{
		this.radius = 30;
		this.x = 0;
		this.y = 0;
	}

	setPos()
	{
		this.x = mouseX;
		this.y = mouseY;
	}

	draw(amp)
	{
		fill(amp * 1850, 0, amp * 1850)
		ellipse(this.x, this.y, this.radius * amp * 10, this.radius * amp * 10);
	}
}

class Square
{
	constructor()
	{
		this.length = 30;
		this.x = 0;
		this.y = 0;
	}

	setPos()
	{
		this.x = mouseX;
		this.y = mouseY;
	}

	draw(amp)
	{
		fill(amp * 600, 0, amp * 1850)
		rectMode(CENTER);
		rect(this.x, this.y, this.length * amp * 10, this.length * amp * 10, 5);
	}
}

class Line
{
	constructor()
	{
		this.x = 0;
		this.y = 0;
		this.oldX = 0;
		this.oldY = 0;
	}

	setPos()
	{
		this.x = mouseX;
		this.y = mouseY;
		this.oldX = pmouseX;
		this.oldY = pmouseY;
	}

	draw(amp)
	{
		stroke(amp * 1000, amp * 1000, amp * 1850)
		strokeWeight(amp * 100);
		line(this.x, this.y, this.oldX, this.oldY);
	}
}

function preload()
{
	song = loadSound('assets/song.mp3');
}

function setup() 
{
	c = createCanvas(800, 600);
	song.setVolume(0.5);
	song.play();
	amplitude = new p5.Amplitude();
}

function draw() 
{
	var amp = amplitude.getLevel();
	//amplitude affects background
	background(255, amp * 450, amp * 1850)
	//determining which shape is on mouse and drawing it at mouse pos
	switch(selection)
	{
		case 0: 
			var newShape = new Circle();
			break;
		case 1: 
			var newShape = new Square();
			break;
		case 2: 
			var newShape = new Line();
			break;
		default:
			console.log("What the f***?");
	}
	newShape.setPos();
	newShape.draw(amp);
	//adds selected object to the list 
	if (mouseIsPressed)
	{
		objectsOnscreen.push(newShape);
	}
	//now update all already "drawn" objects
	for(i = 0; i < objectsOnscreen.length; i++)
	{
		objectsOnscreen[i].draw(amp);
	}
}

//up and down arrows change selection index
function keyPressed()
{
	if (keyCode == UP_ARROW)
	{
		if (selection < 2)
		{
			selection++;
		}
		else
		{
			selection = 0;
		}
	}
	if (keyCode == DOWN_ARROW)
	{
		if (selection > 0)
		{
			selection--;
		}
		else
		{
			selection = 2;
		}
	}
}