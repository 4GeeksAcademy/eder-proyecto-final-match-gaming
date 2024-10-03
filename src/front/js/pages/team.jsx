import React from "react";
import ProfileCard from "../component/profilecard.jsx";
import "../../styles/team.css";

export const Team = () => {
  const profiles = [
    {
      name: "Anjhelo Elvis Vela Yauri",
      jobTitle: "Full-stack developer",
      image: "https://media-lim1-1.cdn.whatsapp.net/v/t61.24694-24/461255185_1052817896513180_7610875561851600091_n.jpg?ccb=11-4&oh=01_Q5AaIMadDh2UsBcEl5JBRbPpvYX-CZ32mmiGB1JCAncg-TbA&oe=670ADB27&_nc_sid=5e03e0&_nc_cat=100",
      description: "Cyberpunk 2077",
      overlayText: "Mi pasión por los videojuegos comenzó cuando tenía 8 años. Recuerdo con mucho cariño las tardes que pasaba junto a mi padre, jugando títulos como Contra 1 y Starcraft. Esas experiencias no solo me hicieron disfrutar de los videojuegos, sino que también fortalecieron mi amor por este mundo. Hoy en día, los videojuegos son uno de mis hobbies favoritos y una forma de desconectar, explorar nuevos mundos y desafiar mis habilidades.",
      externalLink: "https://github.com/LOHAN2000"
    },
    {
      name: "Eder Fernández",
      jobTitle: "Full-stack developer",
      image: "https://imgur.com/Ml2rpnK.png",
      description: "Dota 2 & GTFO",
      overlayText: "Mi interés en los videojuegos viene desde pequeño cuando compartía momentos divertidos con mis amigo de la cuadra. En la actualidad no dispongo de mucho tiempo para jugar, pero cuando lo hago tengo preferencia por juegos de equipo y de dificultad media a alta. Soy una persona que siempre busca retos constantes, incluso en los juegos prefiero aquellos que representan un desafío.",
      externalLink: "https://github.com/zz-ederfs"
    },
    {
      name: "Yonil Hinostroza",
      jobTitle: "Full-stack developer",
      image: "https://i.imgur.com/B7m4QkJ.png",
      description: "Dota 2",
      overlayText: "Cuando comparé mi etapa de niñez de solo jugar con objetos que mis padres fabricaban, con lo de hoy los videojuegos fue que empecé a mostrar interés por Dota viendo jugar a mis compañeros de la universidad.  Estos te entretiene y sobre todo es de superar desafíos al igual que en la vida.",
      externalLink: "https://github.com/yonilhp"
    },
    {
      name: "Carlos Mera",
      jobTitle: "Full-stack developer",
      image: "https://imgur.com/cfADQGx.png",
      description: "FIFA,Dota 2 & Neverwinter",
      overlayText: "Desde pequeño, siempre me han gustado los videojuegos, disfruto de los juegos que mezclan estrategia y trabajo en equipo. Ahora, además de seguir disfrutando de esos retos, también paso tiempo jugando con mi hijo, lo que me ha permitido revivir esa emoción de cuando era niño. Aunque no tengo tanto tiempo como antes, esos momentos con él hacen que todo sea más divertido, y juntos seguimos aprendiendo mientras disfrutamos cada partida.",
      externalLink: "https://github.com/MVCSystems"
    },
    {
      name: "Maribel Maza",
      jobTitle: "Frontend developer / UX Designer",
      image: "https://avatars.githubusercontent.com/u/80657076?v=4",
      description: "Starcraft 1, SNES games",
      overlayText: "Hola!, en cuanto a videojuegos, mi hermano siempre fue mi gran amigo de aventuras, y lo que más nos gusta jugar hasta hoy es Metal Slug !",
      externalLink: "https://github.com/mysticBel"
    },

  ];

  return (
    <section id="team" className="bg-black">
      <div className="container bg-black text-white py-5 container text-center my-auto mt-5">
        <h1 className="text-center my-5">Meet the Team</h1>
        <p className="text-center my-5 fst-italic">Mouse over the card for more info</p>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 d-flex justify-content-center">
          {profiles.map((profile, index) => (
            <div className="col" key={index}>
              <ProfileCard
                name={profile.name}
                jobTitle={profile.jobTitle}
                image={profile.image}
                description={profile.description}
                overlayText={profile.overlayText}
                externalLink={profile.externalLink} // Enlace externo
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
