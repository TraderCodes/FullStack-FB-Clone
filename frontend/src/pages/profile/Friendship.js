import { useRef, useState } from "react";

export default function Friendship() {
  const [friendsMenu, setFriendsMenu] = useState(true);
  const menu = useRef(null);

  const friendship = {
    friends: true,
    following: false,
    requestSent: false,
    requestReceived: false,
  };
  return (
    <div className="friendship">
      {
        // 🔴 If Have Friends

        friendship.friends ? (
          <div className="friends_menu_wrap">
            <button classNamde="gray_btn">
              <img src="../../../icons/friends.png" alt="friends" />
              <span>Friends</span>
            </button>
            {friendsMenu && (
              <div className="open_cover_menu" ref={menu}>
                <div className="open_cover_menu_item hover1">
                  <img src="../../../icons/favoritesOutline.png" alt="" />
                  Favorites
                </div>
                <div className="open_cover_menu_item hover1">
                  <img src="../../../icons/editFriends.png" alt="" />
                  Edit Friend list
                </div>
                {friendship?.following ? (
                  <div
                    className="open_cover_menu_item hover1"
                
                  >
                    <img src="../../../icons/unfollowOutlined.png" alt="" />
                    Unfollow
                  </div>
                ) : (
                  <div
                    className="open_cover_menu_item hover1"
           
                  >
                    <img src="../../../icons/unfollowOutlined.png" alt="" />
                    Follow
                  </div>
                )}
                <div
                  className="open_cover_menu_item hover1"
              
                >
                  <i className="unfriend_outlined_icon"></i>
                  Unfriend
                </div>
              </div>
            )}
          </div>
        ) : (
          ''
        )
      }
    </div>
  );
}
