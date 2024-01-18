import axios from "axios";

export default function Profile() {
  const logout = () => {
    axios({
      url: "/logout",
      method: "POST",
      withCredentials: true,
    }).then((result) => {
      if (result.status === 200) {
        window.open("/", "_self");
      }
    });
  };
  return (
    <>
      Profile
      <button onClick={logout}>Logout</button>
    </>
  );
}
