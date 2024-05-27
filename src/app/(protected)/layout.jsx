import Navbar from "@/app/components/Navbar";
import {AppWraper} from "@/app/context";


export default function Layout({children}){
    return (
        <>
            <AppWraper>
            <Navbar/>
            {children}
            </AppWraper>
        </>
    )
}