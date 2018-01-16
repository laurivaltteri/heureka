require.config({
    paths: {
        jquery: 'jquery-3.1.1.min',
        app: 'client',
    },

    shim: {
	'app' : {
	    deps: ['jquery']
	},

    }
    
});

require(["jquery",
	 "app"]);
