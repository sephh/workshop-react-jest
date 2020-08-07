import {lazy} from 'react';

const DeckAddView = lazy(() => import('../views/DeckAddView'));
const DeckDetailsView = lazy(() => import('../views/DeckDetailsView'));
const DeckListView = lazy(() => import('../views/DeckListView'));

const routes = () => [
    {
        path: '/deck/new',
        component: DeckAddView,
        exact: true
    },
    {
        path: '/deck/details',
        component: DeckDetailsView,
        exact: true
    },
    {
        path: '/deck/list',
        component: DeckListView,
        exact: true
    }
];

export default routes;