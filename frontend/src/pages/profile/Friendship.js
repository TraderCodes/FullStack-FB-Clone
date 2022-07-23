export default function Friendship() {
  const friendship = {
    friends: true,
    following: false,
    requestSent: false,
    requestReceived: false,
  };
  return (
    <div>
      {
        // 🔴 If Have Friends
        friendship.friends ? (
          <div className="friends_menu_wrap">
            <button classNamde="gray_btn">
              <img src="../../../icons/friends.png" alt="friends" />
              <span>Friends</span>
            </button>
          </div>
        ) : (
          ''
        )
      }
    </div>
  );
}
