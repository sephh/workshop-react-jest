import {lazy} from 'react';

const DeckAddView = lazy(() => import('../views/DeckAddView'));
const DeckEditView = lazy(() => import('../views/DeckEditView'));
const DeckDetailsView = lazy(() => import('../views/DeckDetailsView'));
const DeckListView = lazy(() => import('../views/DeckListView'));

const routes = () => [
    {
        path: '/deck/new',
        component: DeckAddView,
        exact: true
    },
    {
        path: '/deck/edit/:id',
        component: DeckEditView,
        exact: true
    },
    {
        path: '/deck/details/:id',
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