exports.init = () =>{
try{
	AccessToken="xxxxxxxxxxxxxxxxxxxxx"
var XMLHttpRequest = require("./XMLHttpRequest").XMLHttpRequest;

    var requete1 = new XMLHttpRequest(); // creer un objet de requete
    var url1 = "https://api.pushbullet.com/v2/users/me";
    var requete = new XMLHttpRequest(); // creer un objet de requete
    var url = "https://api.pushbullet.com/v2/devices";
 

    requete1.open("GET", url1, true); // On construit la requete
    requete1.setRequestHeader("Access-Token",AccessToken);
    requete1.send(null); // On envoie !
    requete1.onreadystatechange = () =>{ // on attend le retour
        if (requete1.readyState == 4) { // Revenu !
            if (requete1.status == 200) {// Retour s'est bien passe !
            	//console.log('*'+requete1+'*')
                 var jsonUser = JSON.parse(requete1.responseText)
                //console.log(jsonUser)
                source_user_iden = jsonUser.iden;
				console.log("source_user_iden "+source_user_iden)
            } else { }
        }
    };

    requete.open("GET", url, true); // On construit la requete
    requete.setRequestHeader("Access-Token",AccessToken);
    requete.send(null); // On envoie !
    requete.onreadystatechange = () =>{ // on attend le retour
        if (requete.readyState == 4) { // Revenu !
            if (requete.status == 200) {// Retour s'est bien passe !
                 var jsonDevice = JSON.parse(requete.responseText)
        
                 for (var i=0;i<jsonDevice.devices.length;i++){
                 	if ((jsonDevice.devices[i].nickname != undefined)&&(jsonDevice.devices[i].active!= 'false')){
                target_device_iden=jsonDevice.devices[i].iden
                    console.log("nom ou est instal : " +jsonDevice.devices[i].nickname)
                    console.log("target_device_iden : "+jsonDevice.devices[i].iden)
                  
                  }
                 }

                
            } else { 
                console.log("erreur dans le Access-Token")
            }
        }
    };


}
catch(err){}

}

exports.action = (data)=>{

function send(texte){

		// On structure la requête à envoyer
		var request = require('request');
		var body = 	{
			push : {
				'conversation_iden'	: data.numero,
				'message'			: texte,
				'package_name'		: 'com.pushbullet.android',
				'type'				: 'messaging_extension_reply',
				'target_device_iden': target_device_iden,
				'source_user_iden'	: source_user_iden
			},
			type : 'push'
		}
			
				var options = {
					method: 'POST',
					url: 'https://api.pushbullet.com/v2/ephemerals',
					headers: {
						'Content-Type':  'application/json',
						'Access-Token': AccessToken
						},
					json: true,
					body: body
				};
			
		
			// On envoi la requête
			request(options,  (err, response, body)=>{
				if ( (typeof err=='null') || (typeof response == 'undefined') ) {
					console.log('No Communication!');
					console.log('answer error!');JarvisIASpeech("un problème est survenu")
					
					return ;
				}
				else if  (response.statusCode != 200) {
					console.log('answer error!');JarvisIASpeech("un problème est survenu")
					
					return ;
				}
				else if  (response.statusCode == 200) {
						console.log("Message à " + data.destinataire + " envoyé.");

		JarvisIASpeech("Message à " + data.destinataire + " envoyé. "+"|en esperant que la personne le lise|si son portable est allumé|la personne va peut etre répondre")				

						return ;
				}
			});
			
	return ;
}	// fin fnct send

var reg="/"+data.pharsesms+"(.+)/i" ; var rgxp = eval(reg) ; var temp = JarvisIA.reco.match(rgxp) ; console.log(temp)
var texte = temp[1].trim() ; console.log("on envoie : ",texte)
 
send(texte)// c'est parti
}