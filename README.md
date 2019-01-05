**IMPROVEMENTS**

    1.-We use toastr for the notifications.
    2.-We have angular-apollo where graphQL requests are made which attack another graphQL that receives the requests and extracts them from a BBDD in mysSQL, all       in a prisma server.
    3.-We create a little form to update the user information, which serves to use a graphql mutation.
    4.-In another branch of the project you can see the angular social login working, only if you use firefox, in chrome don't works for errors with the library.
    5.-We add a like and dislike button that works in laravel with traits.
    6.- A component of the search engine with an autocomplet of angular material, when selecting the search engine the autocomplet shows the latest searches, are saved in localStorage, adding a letter shows you the titles or creators that contain those letters.
    7.- In the search module are used up to 4 components, 2 videos and 2 users.
    8.- In the list of the home page there is a different paginate to the normal one, since it is done of right or left.
    9.- As you prefer you can put or not paginate and various other features.
    10.- The video component uses a function to calculate the time that the video has since it has been uploaded.
    11.- In the home page when making the screen bigger or smaller, different videos are shown, for example if the resolution is very small, 3 videos will be shown and 3 videos will be paginated, if the resolution is high, 5 videos will be shown and 5 videos will be paginated.
    12.- You can subscribe to a content creator, using the traits of laravel.
    13.- In the following module you will be able to see the videos of the creators you follow.
    14.- We use http://avatars.adorable.io/ to assign a default avatar to the user when registering locally.
    15.- In the video upload module you can upload a video and a thumbnail, which will be saved in the firebase storage.
    16.- Use of progress bar of angular material in video upload when uploading image or video.

**MEJORAS**

    1.-Usamos una libreria de toastr para las notificaciones.
    2.-Tenemos angular-apollo donde se hacen las peticiones de graphQL, las cuales atacan otro graphQL, el cual recive las peticiones y extrae la información de una     BBDD en mySQL, todo en un servidor prisma.
    3.-Creamos un pequeño formulario para cambiar la información del usuario, el cual sirve para usar una mutation de graphQL.
    4.-En otra rama del proyecto se puede ver el uso de la libreria de angular social login, la cual solo se puede usar en firefox, ya que chrome no deja.
    5.-Hemos añadido la funcionalidad de dar me gusta o no a los videos, los cuales funcionan con traits de laravel.    
    6.- Un componente del buscador con un autocomplet de angular material, al seleccionar el buscador el autocomplet muestra las ultimas búsquedas, se guardan en el localStorage, al añadir una letra te muestra los títulos o creadores que contengan esas letras.
    7.- En el modulo de search se utilizan hasta 4 componentes, 2 de video y 2 de usuario.
    8.- En el list del home hay un paginate diferente al normal, ya que se hace de derecha o izquierda.
    9.- Según lo prefieras puedes poner o no paginate y diversas funcionalidades mas.
    10.- El componente video utiliza un función para calcular el tiempo que tiene el video desde que se ha subido.
    11.- En el home al hacer la pantalla mas grande o pequeña se muestran diferentes videos, por ejemplo si la resolución es muy pequeña se mostraran 3 videos y se paginara por 3 videos, si la resolución es alta saldrán 5 videos y se paginara por 5 videos.
    12.- Te puedes subscribir a un creador de contenido, utilizando los traits de laravel.
    13.- En el modulo de following podrás ver los videos de los creadores que sigues.
    14.- Utilizamos http://avatars.adorable.io/ para hacer asignarle un avatar por defecto al usuario al registrarse localmente.
    15.- En el modulo de upload video puedes subir un video y una miniatura, que se guardaran en el firebase storage.
    16.- Utilización de progress bar de angular material en upload video al subir imagen o video.

