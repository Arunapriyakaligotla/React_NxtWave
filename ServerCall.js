import axios from "axios";
export const ListCreation = async () => {
  let Res = await axios.get("https://apis.ccbp.in/list-creation/lists");
  return Res;
};
