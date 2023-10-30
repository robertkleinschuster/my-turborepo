import NavSearchbar from "../../../../components/nav-searchbar";

export default function Layout({ children }) {
    return <>
        <NavSearchbar />
        {children}
    </>
}