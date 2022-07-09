import Admin from "./pages/Admin";
import {
    ADMIN_ROUTER,
    COLLECTION_ROUTER,
    ITEM_ID_ROUTER,
    LOGIN_ROUTER,
    REGISTRATION_ROUTER,
    MY_COLLECTIONS_ROUTER,
    COLLECTION_ID_ROUTER,
    MY_COLLECTIONS_ID_ROUTER, HOME_ROUTER
} from "./utils/consts";
import Collection from "./pages/Collection";
import Item from "./pages/Item";
import Auth from "./pages/Auth";
import MyCollections from "./pages/MyCollections";
import Collections from "./pages/Collections";
import MyCollection from "./pages/MyCollection";
import Home from "./pages/Home";


export const authRoutes = [
    {
        path: ADMIN_ROUTER,
        element: <Admin/>
    },
    {
        path: MY_COLLECTIONS_ROUTER,
        element: <MyCollections/>
    },
    {
        path: MY_COLLECTIONS_ID_ROUTER,
        element: <MyCollection/>
    },
    {
        path: COLLECTION_ROUTER,
        element: <Collections/>
    },
    {
        path: COLLECTION_ID_ROUTER,
        element: <Collection/>
    },
    {
        path: ITEM_ID_ROUTER,
        element: <Item/>
    },
    {
        path: HOME_ROUTER,
        element: <Home/>
    }
];

export const publicRoutes = [
    {
        path: COLLECTION_ROUTER,
        element: <Collections/>
    },
    {
        path: COLLECTION_ID_ROUTER,
        element: <Collection/>
    },
    {
        path: ITEM_ID_ROUTER,
        element: <Item/>
    },
    {
        path: LOGIN_ROUTER,
        element: <Auth/>
    },
    {
        path: REGISTRATION_ROUTER,
        element: <Auth/>
    },
    {
        path: HOME_ROUTER,
        element: <Home/>
    }
];