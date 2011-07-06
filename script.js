function main() {
	// jsGraphics Init
	set_canvas_size(640,480);
	set_timer(80); // milliseconds
	install_keyboard();
	
	var buffer = create_canvas(640,480),
		 bg = load_image('map.jpg'),
		 //mario = load_image('mario.png'),
		 offset = -(bg.width) + WW;
	
	var player = {
		frames : {
			0 : '0.bmp',
			1 : '1.bmp',
			2 : '2.bmp',
			3 : '3.bmp'
		},
		shape : load_image('0.bmp'),
		f : 0,
		NextFrame : function() {
			this.f++;
			if(this.f>3) 
				this.f = 1;
			this.shape = load_image(this.frames[this.f])
		}
	}
	
	onCall('KEY_LEFT', function() {
		if(offset < 0) offset+=10;
		player.NextFrame();
	}, 1, function() {
		player.shape = load_image(player.frames[0])
	});
	
	onCall('KEY_RIGHT', function() {
		if(offset > -(bg.width-WW-10)) offset-=10;
	}, 1);
	
	onCall('KEY_ESC', function() {
		alert('Game quit.');
	});
	
	// refresh rate
	setInterval(draw, 33);
	
	function draw() {		
		buffer.clear();
		blit(bg, buffer, offset, 0);
		blit(player.shape, buffer, 500, 270);
		//console.log(player.shape);
		blit(buffer, screen, 0, 0);
	}
}