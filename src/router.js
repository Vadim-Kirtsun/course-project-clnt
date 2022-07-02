import Admin from "./pages/Admin";
import {
    ADMIN_ROUTER,
    COLLECTION_ROUTER,
    ITEM_ROUTER,
    LOGIN_ROUTER,
    REGISTRATION_ROUTER,
    MY_COLLECTIONS_ROUTER,
    COLLECTION_ID_ROUTER,
    MY_COLLECTIONS_ID_ROUTER
} from "./utils/consts";
import CollectionId from "./pages/CollectionId";
import Item from "./pages/Item";
import Auth from "./pages/Auth";
import MyCollections from "./pages/MyCollections";
import Collections from "./pages/Collections";
import MyCollection from "./pages/MyCollection";


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
        element: <CollectionId/>
    },
    {
        path: ITEM_ROUTER,
        element: <Item/>
    }
];

export const publicRoutes = [
    {
        path: COLLECTION_ROUTER,
        element: <Collections/>
    },
    {
        path: COLLECTION_ID_ROUTER,
        element: <CollectionId/>
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