export const login = async (oReq, oRes) => {
  const { body } = oReq;
  return oRes.json({ body });
};

export const verify = async (oReq, oRes) => {
  return oRes.json({
    isLogued: true,
    user: {
      name: "Alejandro",
      lastName: "Casas",
      profileName: "Administrador",
    },
  });
};
