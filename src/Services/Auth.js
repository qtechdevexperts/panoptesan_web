import { useNavigate } from "react-router-dom";
import appConfig from "../SharedComponents/appConfig";
import APP_ROLES from "../SharedComponents/role";

export const Login = (role, body) => {
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL =
    role === APP_ROLES.ADMIN
      ? appConfig.ADMIN_BASE_URL
      : appConfig.FLEET_LOGIN_URL;
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  };
  return fetch(`${APP_URL}${BASE_URL}${appConfig.LOGIN}`, requestOptions).then(
    (response) => {
      return response.json();
    }
  );
};
export const Profile = (role, body) => {
  const token = localStorage.getItem("token");
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL =
    role === APP_ROLES.ADMIN
      ? appConfig.ADMIN_BASE_URL
      : appConfig.FLEET_BASE_URL;
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body,
  };
  return fetch(
    `${APP_URL}${BASE_URL}${appConfig.PROFILE}/update`,
    requestOptions
  ).then((response) => {
    return response.json();
  });
};
export const GoogleLogin = (role, body) => {
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL =
    role === APP_ROLES.ADMIN
      ? appConfig.ADMIN_BASE_URL
      : appConfig.FLEET_BASE_URL;
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  };
  return fetch(
    `${APP_URL}${BASE_URL}${appConfig.GOOGLE_LOGIN}`,
    requestOptions
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};
export const FacebookLogin = (role, body) => {
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL =
    role === APP_ROLES.ADMIN
      ? appConfig.ADMIN_BASE_URL
      : appConfig.FLEET_BASE_URL;
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  };
  return fetch(
    `${APP_URL}${BASE_URL}${appConfig.FACEBOOK_LOGIN}`,
    requestOptions
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};
export const Register = (role, body) => {
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL =
    role === APP_ROLES.ADMIN
      ? appConfig.ADMIN_BASE_URL
      : appConfig.FLEET_BASE_URL;
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  };

  return fetch(
    `${APP_URL}${BASE_URL}${appConfig.REGISTER}`,
    requestOptions
  ).then((response) => {
    return response.json();
  });
};
export const UploadProfile = (role, body, params) => {
  const token = localStorage.getItem("token");
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL =
    role === APP_ROLES.ADMIN
      ? appConfig.ADMIN_BASE_URL
      : appConfig.FLEET_BASE_URL;
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body,
  };
  return fetch(
    `${APP_URL}${BASE_URL}${appConfig.UPLOAD}?type=${params}`,
    requestOptions
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};

export const ForgotPassword = (role, body) => {
  console.log("BODY Forgot Password");
  console.log(body);
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL =
    role === APP_ROLES.ADMIN
      ? appConfig.ADMIN_BASE_URL
      : appConfig.FLEET_BASE_URL;
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  };

  return fetch(
    `${APP_URL}${BASE_URL}${appConfig.FORGOT_PASSWORD}`,
    requestOptions
  ).then((response) => {
    return response.json();
  });
};
export const SetPassword = (role, body) => {
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL =
    role === APP_ROLES.ADMIN
      ? appConfig.ADMIN_BASE_URL
      : appConfig.FLEET_BASE_URL;
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  };

  return fetch(
    `${APP_URL}${BASE_URL}${appConfig.SET_PASSWORD}`,
    requestOptions
  ).then((response) => {
    return response.json();
  });
};
export const VerifyOTP = (role, body) => {
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL =
    role === APP_ROLES.ADMIN
      ? appConfig.ADMIN_BASE_URL
      : appConfig.FLEET_BASE_URL;
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  };

  return fetch(
    `${APP_URL}${BASE_URL}${appConfig.VERIFY_OTP}`,
    requestOptions
  ).then((response) => {
    return response.json();
  });
};
export const InviteDriver = (role, body) => {
  const token = localStorage.getItem("token");
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL =
    role === APP_ROLES.ADMIN
      ? appConfig.ADMIN_BASE_URL
      : appConfig.FLEET_BASE_URL;
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body,
  };

  return fetch(
    `${APP_URL}${BASE_URL}${appConfig.INVITE_DRIVER}`,
    requestOptions
  ).then((response) => {
    return response.json();
  });
};

export const SendNotification = (role, body) => {
  const token = localStorage.getItem("token");
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL =
    role === APP_ROLES.ADMIN
      ? appConfig.ADMIN_BASE_URL
      : appConfig.FLEET_BASE_URL;
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body,
  };

  return fetch(
    `${APP_URL}${BASE_URL}${appConfig.NOTIFICATIONS}`,
    requestOptions
  ).then((response) => {
    return response.json();
  });
};

export const GetDriver = (role) => {
  const token = localStorage.getItem("token");
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL =
    role === APP_ROLES.ADMIN
      ? appConfig.ADMIN_BASE_URL
      : appConfig.FLEET_BASE_URL;
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(
    `${APP_URL}${BASE_URL}${appConfig.DRIVERS}`,
    requestOptions
  ).then((response) => {
    return response.json();
  });
};
export const GetVideos = (role, offset, limit) => {
  const token = localStorage.getItem("token");
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL =
    role === APP_ROLES.ADMIN
      ? appConfig.ADMIN_BASE_URL
      : appConfig.FLEET_BASE_URL;
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(
    `${APP_URL}${BASE_URL}${appConfig.VIDEOS}?offset=${offset}&limit=${limit}`,
    requestOptions
  ).then((response) => {
    return response.json();
  });
};

export const CreateDriver = (role, body) => {
  const token = localStorage.getItem("token");
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL =
    role === APP_ROLES.ADMIN
      ? appConfig.ADMIN_BASE_URL
      : appConfig.FLEET_BASE_URL;
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body,
  };

  return fetch(
    `${APP_URL}${BASE_URL}${appConfig.CREATE_DRIVER}`,
    requestOptions
  ).then((response) => {
    return response.json();
  });
};
export const EditDriver = (role, body, id) => {
  const token = localStorage.getItem("token");
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL =
    role === APP_ROLES.ADMIN
      ? appConfig.ADMIN_BASE_URL
      : appConfig.FLEET_BASE_URL;
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body,
  };

  return fetch(
    `${APP_URL}${BASE_URL}${appConfig.EDIT_DRIVER}/${id}`,
    requestOptions
  ).then((response) => {
    return response.json();
  });
};
export const GetDriverById = (role, id) => {
  const token = localStorage.getItem("token");
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL =
    role === APP_ROLES.ADMIN
      ? appConfig.ADMIN_BASE_URL
      : appConfig.FLEET_BASE_URL;
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(
    `${APP_URL}${BASE_URL}${appConfig.DRIVER_DETAIL}/${id}`,
    requestOptions
  ).then((response) => {
    return response.json();
  });
};
export const GetRequests = (role, category, offset, limit) => {
  const token = localStorage.getItem("token");
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL =
    role === APP_ROLES.ADMIN
      ? appConfig.ADMIN_BASE_URL
      : appConfig.FLEET_BASE_URL;
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(
    `${APP_URL}${BASE_URL}${appConfig.TICKETS}?offset=${offset}&limit=${limit}&type=${category}`,
    requestOptions
  ).then((response) => {
    return response.json();
  });
};

export const ApproveRequests = (role, id) => {
  const token = localStorage.getItem("token");
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL =
    role === APP_ROLES.ADMIN
      ? appConfig.ADMIN_BASE_URL
      : appConfig.FLEET_BASE_URL;
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(
    `${APP_URL}${BASE_URL}${appConfig.APPROVE}${appConfig.TICKET}/${id}`,
    requestOptions
  ).then((response) => {
    return response.json();
  });
};
export const GetArchiveVideos = (role) => {
  const token = localStorage.getItem("token");
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL =
    role === APP_ROLES.ADMIN
      ? appConfig.ADMIN_BASE_URL
      : appConfig.FLEET_BASE_URL;
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(
    `${APP_URL}${BASE_URL}${appConfig.ARCHIVE}${appConfig.VIDEOS}`,
    requestOptions
  ).then((response) => {
    return response.json();
  });
};
export const ArchiveVideos = (role, videoId) => {
  const token = localStorage.getItem("token");
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL =
    role === APP_ROLES.ADMIN
      ? appConfig.ADMIN_BASE_URL
      : appConfig.FLEET_BASE_URL;
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(
    `${APP_URL}${BASE_URL}/${videoId}${appConfig.VIDEO}${appConfig.ARCHIVE}`,
    requestOptions
  ).then((response) => {
    return response.json();
  });
};
export const logoutUser = (role) => {
  localStorage.clear();
};

export const GetFilterVideos = (role, startDate, endDate) => {
  const token = localStorage.getItem("token");
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL =
    role === APP_ROLES.ADMIN
      ? appConfig.ADMIN_BASE_URL
      : appConfig.FLEET_BASE_URL;
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return fetch(
    `${APP_URL}${BASE_URL}${appConfig.FILTER_VIDEO}?startDate=${startDate}&endDate=${endDate}`,
    requestOptions
  ).then((response) => {
    return response.json();
  });
};

export const ToggleNotifications = (role, status) => {
  console.log(status);
  const token = localStorage.getItem("token");
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL =
    role === APP_ROLES.ADMIN
      ? appConfig.ADMIN_BASE_URL
      : appConfig.FLEET_BASE_URL;
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(
    `${APP_URL}${BASE_URL}${appConfig.NOTIFICATIONS}/${status}`,
    requestOptions
  ).then((response) => {
    return response.json();
  });
};

export const GetAllUsers = (role, offset, limit) => {
  const token = localStorage.getItem("token");
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL =
    role === APP_ROLES.ADMIN
      ? appConfig.ADMIN_BASE_URL
      : appConfig.FLEET_BASE_URL;
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return fetch(
    `${APP_URL}/superadmin/users?offset=${offset}&limit=${limit}`,
    requestOptions
  ).then((response) => {
    return response.json();
  });
};

export const EditUserById = (body) => {
  console.log("USER EDIT BODY");
  console.log(body);
  const token = localStorage.getItem("token");
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL = `/superadmin/user/edit/${body.id}`;
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body,
  };

  return fetch(`${APP_URL}${BASE_URL}${body.id}`, requestOptions).then(
    (response) => {
      return response.json();
    }
  );
};

export const DeleteUser = (id) => {
  const token = localStorage.getItem("token");
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL = `/superadmin/user/delete/${id}`;
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return fetch(`${APP_URL}${BASE_URL}`, requestOptions).then((response) => {
    return response.json();
  });
};

export const DeleteDriverById = (role, id) => {
  const token = localStorage.getItem("token");
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL =
    role === APP_ROLES.ADMIN
      ? appConfig.ADMIN_BASE_URL
      : appConfig.FLEET_BASE_URL;
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(`${APP_URL}${BASE_URL}/remove/fleet/${id}`, requestOptions).then(
    (response) => {
      console.log("JSON");
      console.log(response.json());
      return response.json();
    }
  );
};

export const GetGraphData = () => {
  const token = localStorage.getItem("token");
  const APP_URL = process.env.REACT_APP_DOMAIN;

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(`${APP_URL}/superadmin/dashboard`, requestOptions).then(
    (response) => {
      return response.json();
    }
  );
};

export const GetCrashVideos = (role, offset, limit) => {
  const token = localStorage.getItem("token");
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL =
    role === APP_ROLES.ADMIN
      ? appConfig.ADMIN_BASE_URL
      : appConfig.FLEET_BASE_URL;
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(
    `${APP_URL}${BASE_URL}${appConfig.VIDEOS}?video=CRASH&offset=${offset}&limit=${limit}`,
    requestOptions
  ).then((response) => {
    return response.json();
  });
};

export const ToggleCrashVideos = (role, status) => {
  console.log(status);
  const token = localStorage.getItem("token");
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL =
    role === APP_ROLES.ADMIN
      ? appConfig.ADMIN_BASE_URL
      : appConfig.FLEET_BASE_URL;
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(
    `${APP_URL}${BASE_URL}/crash/setting/${status}`,
    requestOptions
  ).then((response) => {
    return response.json();
  });
};

export const GetDriverDetailsByIdSuperAdmin = (role, id, offset, limit) => {
  const token = localStorage.getItem("token");
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL =
    role === APP_ROLES.ADMIN
      ? appConfig.ADMIN_BASE_URL
      : appConfig.FLEET_BASE_URL;
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(
    `${APP_URL}${BASE_URL}/user/${id}/videos?offset=${offset}&limit=${limit}`,
    requestOptions
  ).then((response) => {
    return response.json();
  });
};
