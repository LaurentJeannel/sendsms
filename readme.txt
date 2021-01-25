!!!!!!! peut entrer en concurence avec le plug push !!!!!!!!! aux phrases du xml

inscription sur pushbulett
https://www.pushbullet.com

puis Create Access Token
https://www.pushbullet.com/#settings/account

copier ce token dans sendsms.js ligne 3

vérifier au premier sms si cela fonctionne sinon
ligne 43 du js
target_device_iden=jsonDevice.devices[0].iden

modifier le [0] par le numéro target_device_iden afficher au lancement

relancer le serveur

utilisation : 

Mathilde envoie une notifivation à laurent je suis en route