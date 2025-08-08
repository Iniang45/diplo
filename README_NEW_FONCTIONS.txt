Documentation technique – Nouvelles fonctionnalités

I - Refonte de l'interface (modifications principales effectuées sur content_game.jsx qui est le fichier gérant l'interface) : 

1 - Suppression de toutes les autres informations hormis la carte, ces informations et fonctionnalités liés à cette portion de la carte 
seront centralisés autre part

2 - Changement de phases 
Nouveaux boutons pour changer de phases temporelles en haut au milieu de la carte 
Méthodes _form_phases modifiée pour correspondre aux nouveaux boutons

3 - Créations de nouveaux components bandeau et bandeau_adversaire situés à gauche de la carte 

Ces components permettent de centralisés les informations qui étaient hors de la carte précedemment tels que le controller de la puissance, le nombre de troupes disponibles, les ordres ainsi que l'instance de "waiting"
Utilisation des méthodes déjà existantes dans content_game pour reset, update les ordres, voter pour une draw. 
Créations de nouveaux components tels que chat_window et order_window qui sont des petites fenêtres pour gêrer les boutons du bandeau
Rien de compliquer dans ces components, ce n'est que de l'interface qui utilise les méthodes déjà existantes

4 - Ajoute de nouveaux selects et boutons 
Ajout du select pour choisir le type d'ordre, le texte NavAfterTitle a été réduit pour render uniquement la deadline et ajout d'un bouton ready en bas de la carte 
Si on est omniscient on a le bouton proccess_game ainsi qu'un select pour sélectionner d'autre puissances

II - Nouveaux Droits pour les observateurs 

1 - Changement de droits pour les observateurs (de potentiels bugs peuvent provenir de cela)
Les observateurs devait être capable d'envoyer des messages au nom d'une puissance 
Pour cela il a fallu donner une puissance à l'observateur dont il fait le choix lors de la connexion (content_game)
    à faire : limiter à un seul choix car l'observateur peut changer si il se reconnecte
Levée des exceptions (situées dans plusieurs if statements ainsi que dans les paramêtres de veriify_request) à l'envoi de message dans request_managers.py et pour autoriser l'observateur à le faire
Gestion de la reception de la notification dans notifier.py en récupérant les adresses des observateurs et en les notifiant aussi.

2 - Nouveaux droits permattant à un joueur ou observateur d'envoyer un message à sa propre nation 
III - Messages privés

1 - Récupération des adresses (peut poser problème car le premier joueur doit se recconecter pour avoir les pseudos des joueurs suivants qui apparaissent dans la liste)
Get_reception_addresses est une méthode existante dans server_game.py permettant de récupérer les addresses des joueurs connectés
Création d'un pont entre le front et le back à l'aide de channel.js 
Il a fallu faire passer cette méthodes comme une requête et donc l'implémenter dans request.py et request.js puis gérer la réponse de ces réquêtes à l'aide de response_managers et request_managers

2 - Création d'une nouvelle instante PrivateMessage 
*Cette fonctionnalitée peut être sujet à des bugs 
En s'inspirant des messages entre puissances, on créer les messages privés
Il y'a d'abord les méthodes d'envoi et de réception qui fonctionnent de la même manière que les messages normaux (voir on_send_private_message)
Rechercher sendPrivate et on_send_Private pour comprendre le code qui n'est pas compliqué
Gestion de la réception des messages en s'inspirant de on_game_message
game.py et game.js permettent de faire le pont entre le server et le client avec la méthode get_private_message pour les obtenir et les afficher



Si des bugs sont rencontrés : L'ancien code était très bien écrit donc il doit venir des nouvelles fonctionnalités et l'erreur vous redigera vers les fichiers posant poroblèmes
L'erreur est soit sur l'interface (content_game) ou c'est une erreur de notification/requètes (request_managers et notification_managers)

à réparer : 
- Limiter le choix de l'observateur à une seule nation 
- Actualiser la liste des utilisateurs ponctuellement 
- Actualiser la liste des messages privés plus souvent (actuellement elle l'est à chaque fois que la fênetre subit une modification ce qui arrive souvent)
- Rendre les bandeaux responsive au niveau de l'interface 
