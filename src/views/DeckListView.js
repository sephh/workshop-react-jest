import React, {useMemo, useState} from 'react';
import {useSelector} from "react-redux";

import View from "../layout/View";
import Wrapper from "../layout/Wrapper";
import SearchBar from "../components/SearchBar";

import deckStore from '../store/deck.store';
import scoredSearch from "../filters/scored-search";
import DeckGrid from "../components/DeckGrid";

const DeckListView = ({history}) => {
    const decks = useSelector(deckStore.selectors.decks);
    const [query, setQuery] = useState('');
    const filteredDecks = useMemo(() => scoredSearch(decks, query, 'name', 20), [decks, query]);

    const addDeck = () => {
        history.push('/deck/new');
    }

    const search = ({target}) => {
        setQuery(target.value);
    }

    return (
        <Wrapper>
            <View>
                <SearchBar
                    buttonLabel={'Novo baralho'}
                    onButtonClick={addDeck}
                    onChange={search}
                />

                <div className='row'>
                    <div className='col-md-12'>
                        <DeckGrid
                            decks={filteredDecks}
                        />
                    </div>
                </div>
            </View>
        </Wrapper>
    );
};

export default DeckListView;
