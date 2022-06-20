import Admin from "./pages/Admin";
import {
    HOME,
    ADMIN_ROUTER,
    COLLECTION_ROUTER,
    ITEM_ROUTER,
    LOGIN_ROUTER,
    REGISTRATION_ROUTER,
    MY_COLLECTIONS_ROUTER
} from "./utils/consts";
import Collection from "./pages/Collection";
import Item from "./pages/Item";
import Auth from "./pages/Auth";
import MyCollections from "./pages/MyCollections";
import Home from "./components/Home";


export const authRoutes = [
    {
        path: ADMIN_ROUTER,
        element: <Admin/>
    },
    {
        path: MY_COLLECTIONS_ROUTER,
        element: <MyCollections/>
    }
];

export const publicRoutes = [
    {
        path: HOME,
        element: <Home/>
    },
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