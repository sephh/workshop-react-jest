# Redux

Redux não faz parte do React, mas é uma lib muito comum nesse contexto, então vamos abordar os teste com redux.

Antes de testar nosso reducer vamos criar o mock do axios, que é usado para buscar os dados que utilizaremos.

```
import axiosMock from 'axios';

jest.mock('axios');

axiosMock.create = () => axiosMock;

export default axiosMock;
```

Agora o teste do `card.store.js`:

```

```

#### Component com redux

Agora vamos testar o component `DeckAddView` que usa o redux.

```

```