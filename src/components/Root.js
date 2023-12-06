import { Outlet } from "react-router-dom"
import TopNav from "./TopNav"
const Root = () => {
    return <>
        <TopNav />
        <Outlet />
    </>
}
export default Root