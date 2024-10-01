import React from "react";
import ProfileCard from "../component/profilecard.jsx";
import "../../styles/team.css";

export const Team = () => {
/**add const profile 
 * 
 * 
 */
const profiles = [
    {
        name: "Maribel Maza",
        jobTitle: "Starcraft 1",
        image: "https://avatars.githubusercontent.com/u/80657076?v=4",
        description: "Simply a developer.",
    },
    {
        name: "Maribel Maza",
        jobTitle: "Starcraft 1",
        image: "https://avatars.githubusercontent.com/u/80657076?v=4",
        description: "Simply a developer.",
    },
    {
      name: "Maribel Maza",
      jobTitle: "Starcraft 1",
      image: "https://avatars.githubusercontent.com/u/80657076?v=4",
      description: "Simply a developer.",
    },
  ];

  return (
    <section id="team" className="bg-black">
      <div className="container bg-black text-white py-5 container text-center my-auto mt-5 ">
             <h1 className="text-center my-5">Meet the Team</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 d-flex justify-content-center">
        {profiles.map((profile, index) => (
          <div className="col" key={index}>
            <ProfileCard
              name={profile.name}
              jobTitle={profile.jobTitle}
              image={profile.image}
              description={profile.description}
            />
          </div>
        ))}
      </div>
    </div>
    </section>
  );
};

