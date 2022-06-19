import Admin from "./pages/Admin";
import {
    ADMIN_ROUTER,
    COLLECTION_ROUTER,
    ITEM_ROUTER,
    LOGIN_ROUTER,
    REGISTRATION_ROUTER,
    USER_PAGE_ROUTER
} from "./utils/consts";
import Collection from "./pages/Collection";
import Item from "./pages/Item";
import Auth from "./pages/Auth";
import UserPage from "./pages/UserPage";


export const authRoutes = [
    {
        path: ADMIN_ROUTER,
        element: <Admin/>
    },
    {
        path: USER_PAGE_ROUTER,
        element: <UserPage/>
    }
];

export const publicRoutes = [
    {
        path: COLLECTION_ROUTER,
        element: <Collection/>
    },
    {
        path: ITEM_ROUTER,
        element: <Item/>
    },
    {
        path: LOGIN_ROUTER,
        element: <Auth/>
    },
    {
        path: REGISTRATION_ROUTER,
        element: <Auth/>
    }
];