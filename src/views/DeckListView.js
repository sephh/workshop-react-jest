import React, {useCallback, useEffect} from 'react';
import {useDispatch} from "react-redux";

import View from "../layout/View";
import Wrapper from "../layout/Wrapper";
import SearchBar from "../components/SearchBar";

import cardStore from '../store/card.store';

const DeckListView = ({history}) => {
    const dispatch = useDispatch();

    const fetchCards = useCallback((query) => {
        const {getCards} = cardStore.actions;
        dispatch(getCards({query}));
    }, [dispatch])

    const addDeck = () => {
        history.push('/deck/new');
    }

    const search = ({target}) => {
        fetchCards(target.value);
    }

    useEffect(()=>{
        fetchCards();
    }, [fetchCards])

    return (
        <Wrapper>
            <View>
                <SearchBar
                    buttonLabel={'Novo baralho'}
                    onButtonClick={addDeck}
                    onChange={search}
                />
            </View>
        </Wrapper>
    );
};

export default DeckListView;