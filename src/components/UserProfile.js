import React from "react";
import "./UserProfile.css";

const UserProfile = () => {
  const user = {
    name: "John Doe",
    image: "https://cdn-icons-png.flaticon.com/512/64/64572.png",
    points: 1500,
    badges: [
      { name: "Gold Badge", type: "gold" },
      { name: "Silver Badge", type: "silver" },
      { name: "Bronze Badge", type: "bronze" },
    ],
  };

  const badgeColor = {
    bronze: "#cd7f32",
    silver: "#c0c0c0",
    gold: "#ffd700",
  };

  return (
    <div className="user-profile">
      <img src={user.image} alt={user.name} className="user-profile-image" />
      <h2 className="user__name">{user.name}</h2>
      <p>Points: {user.points}</p>
      {user.badges.length > 0 && (
        <div className="badges">
          <h3>Badges:</h3>
          <ul>
            {user.badges.map((badge, index) => (
              <li key={index} style={{ color: badgeColor[badge.type] }}>
                {badge.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
