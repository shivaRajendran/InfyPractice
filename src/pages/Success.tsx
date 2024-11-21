import { useUserSelector } from "../store/hooks";

export default function Success() {
  const users = useUserSelector((state) => state.user.users);
  return <h1>{users.map((user) => user.dob).join(" ")}</h1>;
}
