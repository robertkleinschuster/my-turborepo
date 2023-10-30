import NavSearchbar from "../../../../components/nav-searchbar";
import Scroll from "../../../../components/scroll";

export default function Layout({ children }) {
    return <>
        <NavSearchbar title="Stationen" />
        <Scroll>
            {children}
        </Scroll>
    </>
}