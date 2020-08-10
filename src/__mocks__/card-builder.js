export const cardBuilder = (props = {}) => {
    return {
        id: Math.random().toString(36).substr(2,9),
        name: 'Pikachu',
        count: 1,
        types: [
            "Lightning"
        ],
        supertype: 'Pokémon',
        imageUrl: 'http://localhost/pikachu.png',
        ...props
    };
};
