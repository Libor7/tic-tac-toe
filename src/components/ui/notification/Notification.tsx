/** LIBRARIES */
import React, { FC } from "react";

/** STYLES */
import classes from "./Notification.module.css";

interface NotificationProps {
  message: string;
}

const Notification: FC<NotificationProps> = (props) => {
  const { message } = props;
  return <div className={`${classes["notification-base"]} ${classes["notification-size"]}`}>{message}</div>;
};

export default Notification;
