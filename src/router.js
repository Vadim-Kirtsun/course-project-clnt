import Admin from "./pages/Admin";
import {ADMIN_ROUTER, COLLECTIONS_ROUTER, ITEMS_ROUTER, LOGIN_ROUTER, REGISTRATION_ROUTER} from "./utils/consts";
import Collections from "./pages/Collections";
import Items from "./pages/Items";
import Auth from "./pages/Auth";


export const authRoutes = [
    {
        path: ADMIN_ROUTER,
        element: <Admin/>
    }
];

export const publicRoutes = [
    {
        path: COLLECTIONS_ROUTER,
        element: <Collections/>
    },
    {
        path: ITEMS_ROUTER,
        element: <Items/>
    },
    {
        path: LOGIN_ROUTER,
        element: <Auth/>
    },
    {
        path: REGISTRATION_ROUTER,
        element: <Auth/>
    },

];