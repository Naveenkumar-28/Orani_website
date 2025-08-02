import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";

export function useUserData() {
    const { isLoading, isSignedIn, user } = useSelector((state: RootState) => state.UserDetails)
    return { isLoading, isSignedIn, user }
}
