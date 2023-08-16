import appConfig from "../SharedComponents/appConfig";
import APP_ROLES from "../SharedComponents/role";

export const GetProfile = (role) => {
  const token = localStorage.getItem("token");
  const APP_URL = process.env.REACT_APP_DOMAIN;
  // const BASE_URL = '/user/profile';
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
    `${APP_URL}${BASE_URL}${appConfig.PROFILE}`,
    requestOptions
  ).then((response) => {
    return response.json();
  });
};

export const GetPackage = () => {
  const token = localStorage.getItem("token");
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL = "/user/package";
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return fetch(`${APP_URL}${BASE_URL}`, requestOptions).then((response) => {
    return response.json();
  });
};

export const GetNotifications = () => {
  const token = localStorage.getItem("token");
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL = "/user/notification";
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return fetch(`${APP_URL}${BASE_URL}`, requestOptions).then((response) => {
    return response.json();
  });
};

export const GetStoragePackages = (offset, limit) => {
  const token = localStorage.getItem("token");
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL = "/superadmin/package";
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return fetch(
    `${APP_URL}${BASE_URL}?offset=${offset}&limit=${limit}`,
    requestOptions
  ).then((response) => {
    return response.json();
  });
};

export const DeleteStoragePackages = (id) => {
  const token = localStorage.getItem("token");
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL = `/superadmin/package/${id}`;
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

export const GetDrivers = (role) => {
  const token = localStorage.getItem("token");
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL =
    role === APP_ROLES.ADMIN ? "/superadmin/users" : "/user/list/drivers";
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return fetch(`${APP_URL}${BASE_URL}`, requestOptions).then((response) => {
    return response.json();
  });
};

export const MakeStripePurchase = (body) => {
  const token = localStorage.getItem("token");
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL = "/user/stripe-purchase";
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ pmId: body.pmId, amount: body.amount }),
  };
  return fetch(`${APP_URL}${BASE_URL}`, requestOptions).then((response) => {
    return response.json();
  });
};

export const PurchaseSubscription = (body) => {
  const token = localStorage.getItem("token");
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL = "/user/purchase";
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ subscription: body.packageId, pmId: body.pmId }),
  };
  return fetch(`${APP_URL}${BASE_URL}`, requestOptions).then((response) => {
    return response.json();
  });
};

export const GetVideos = (role, offset, limit) => {
  const token = localStorage.getItem("token");
  const APP_URL = process.env.REACT_APP_DOMAIN;
  // const BASE_URL = '/user/videos';
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

export const UpdateProfile = (payload) => {
  const token = localStorage.getItem("token");
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL = "/user/profile/update";
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  };
  return fetch(`${APP_URL}${BASE_URL}`, requestOptions).then((response) => {
    return response.json();
  });
};

export const CreatePackageAdmin = (payload) => {
  const token = localStorage.getItem("token");
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL = payload.id
    ? `/superadmin/package/${payload.id}`
    : "/superadmin/package";
  const requestOptions = {
    method: payload.id ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  };
  return fetch(`${APP_URL}${BASE_URL}`, requestOptions).then((response) => {
    return response.json();
  });
};

export const CreateSupportTicket = (payload) => {
  const token = localStorage.getItem("token");
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL = "/user/support";
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  };
  return fetch(`${APP_URL}${BASE_URL}`, requestOptions).then((response) => {
    return response.json();
  });
};

export const UploadProfilePic = (pic) => {
  const token = localStorage.getItem("token");
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL = "/user/upload?type=PROFILE";
  const requestOptions = {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: pic,
  };
  return fetch(`${APP_URL}${BASE_URL}`, requestOptions).then((response) => {
    return response.json();
  });
};

export const CheckSubscription = (id) => {
  console.log("API ID");
  console.log(id);
  const token = localStorage.getItem("token");
  const APP_URL = process.env.REACT_APP_DOMAIN;
  const BASE_URL = `/user`;
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return fetch(
    `${APP_URL}${BASE_URL}/check/subscription?user_id=${id}`,
    requestOptions
  ).then((response) => {
    return response.json();
  });
};
