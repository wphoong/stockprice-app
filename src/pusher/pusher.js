const pusherConfig = () => {
	// pusher configuration
	Pusher.logToConsole = true;
	var pusher = new Pusher(process.env.PUSHER_API_KEY, {
	  cluster: 'us2',
	  encrypted: true
	});

	pusher.connection.bind( 'error', function( err ) {
	  if( err.error.data.code === 4004 ) {
	    log('>>> detected limit error');
	  }
	});
};

export default pusherConfig;
