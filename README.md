# Component Render

Vamos começar pelo tipo de teste mais simples, a rederização correta de um componente.

Vá para a pasta `src/components/EmptyResult`;

Crie um pasta `__test__`, vamos usar esse tipo de padrão para agrupar os testes.

E por fim crie o teste `EmptyResult.test.js`:

```
import React from "react";
import {render} from "@testing-library/react";
import EmptyResult from "../EmptyResult";

describe('EmptyResult', () => {
    test('should render with default props', () => {
        const {container, getByAltText, getByText} = render(<EmptyResult/>);
        const defaultMessage = 'Oops... Não encontramos nada.';
        const defaultWidth = 200;

        const image = getByAltText(/empty result/i);

        expect(container).toBeInTheDocument();
        expect(image).toBeInTheDocument();
        expect(getByText(defaultMessage)).toBeInTheDocument();
        expect(image.width).toBe(defaultWidth);
    });

    test('should render with message', () => {
        const message = 'Mensagem de teste.'

        const {getByText} = render(<EmptyResult message={message}/>);

        expect(getByText(message)).toBeInTheDocument();
    });

    test('image should have correct width', () => {
        const width = 300;

        const {getByAltText} = render(<EmptyResult width={width}/>);
        const image = getByAltText(/empty result/i);

        expect(image.width).toBe(width);
    });
});
```

#### Mudança de prop

Para exemplificar a mudança de uma prop num component, vamos testar o `PokeballLoading`

```
import React from "react";
import {render} from "@testing-library/react";
import PokeballLoading from "../PokeballLoading";

describe('PokeballLoading', () => {
    test('should render with default props', ()=>{
        const {container, getByAltText} = render(<PokeballLoading/>);

        const image = getByAltText(/Pokeball Loading/i);

        expect(container).toBeInTheDocument();
        expect(image).toBeInTheDocument();
        expect(image.width).toBe(200);
    });

    test('message should change', () => {
        const {queryByText, rerender} = render(<PokeballLoading/>);
        const message = 'Nova mensagem';

        expect(queryByText(message)).not.toBeInTheDocument();

        rerender(<PokeballLoading message={message}/>);

        expect(queryByText(message)).toBeInTheDocument();
    });

    test('image should have correct size', () => {
        const size = 100;
        const {getByAltText} = render(<PokeballLoading size={size}/>);

        const image = getByAltText(/Pokeball Loading/i);

        expect(image.width).toBe(size);
        expect(image.height).toBe(size);
    });
});
```