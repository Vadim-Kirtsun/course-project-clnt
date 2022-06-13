import Admin from "./pages/Admin";
import {ADMIN_ROUTER, COLLECTIONS_ROUTER} from "./utils/consts";
import Collections from "./pages/Collections";


export const authRoutes = [
    {
        path: ADMIN_ROUTER,
        element: <Admin/>
    }
];

export const authRoutes = [
    {
        path: COLLECTIONS_ROUTER,
        element: <Collections/>
    }
];