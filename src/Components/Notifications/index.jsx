import "./index.css";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { GetNotifications } from "../../Services/Profile";
import { useEffect, useState } from "react";

export const NotificationsComponent = () => {
  const [userNotifications, setUserNotifications] = useState([]);

  const fetchNotificationsApi = async () => {
    const data = await GetNotifications();
    return data;
  };

  const fetchNotifications = () => {
    fetchNotificationsApi().then((data) => {
      setUserNotifications(data?.data);
    });
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="body-wrapper">
      <div className="content">
        <section className="section-padding">
          <ul>
            {userNotifications?.map((item) => (
              <li
                className="notifications shadow-xl h-20 pl-5 mt-2 rounded -2px pt-4 hover:bg-sky-200 bg-white"
                key={item.id}
              >
                <NotificationsNoneOutlinedIcon style={{ fontSize: "25px" }} />
                {item.body}
              </li>
            ))}
          </ul>
        </section>
        <script src="./assets/js/mlib.js"></script>
        <script src="./assets/js/functions.js"></script>
      </div>
    </div>
  );
};
