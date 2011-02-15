dojo.provide("inputwizard.FormBackendDelegate");

dojo.declare(
	"inputwizard.FormBackendDelegate",
	null,
	{
		loadFormDataFromBackend: function(form, /* function(Map <String, Object>) */ callback)  {
			console.log("Trying to call unimplemented method inputwizard.FormBackendDelegate.loadFormDataFromBackend()");
		},
		saveFormDataToBackend: function(form) {
			console.log("Trying to call unimplemented method inputwizard.FormBackendDelegate.saveFormDataToBackend()");
		},
		validateFormFromBackend: function(form,/* function(Map <String, Array<String>>) */ callback) {
			console.log("Trying to call unimplemented method inputwizard.FormBackendDelegate.validateFormFromBackend()");
		}
	}
);
