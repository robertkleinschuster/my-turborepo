import NavSearchbar from "../../../../components/nav-searchbar";
import Scroll from "../../../../components/scroll";

export default function Layout({ children }) {
    return <>
        <NavSearchbar />
        <Scroll>
            {children}
        </Scroll>
    </>
}