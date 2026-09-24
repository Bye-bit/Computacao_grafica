# Transformações Geométricas 2D

Projeto desenvolvido para demonstrar o uso de transformações geométricas 2D utilizando **HTML, JavaScript e Canvas 2D**.
A aplicação apresenta uma cena urbana ao entardecer, com um carro que pode ser movimentado e transformado através do teclado.

##  Integrantes

* Lucas Fernandes
* Anna Beatriz

##  Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript
* Canvas 2D

##  Funcionamento

O carro pode ser controlado pelas seguintes teclas:

* **A** — movimenta o carro para a esquerda.
* **D** — movimenta o carro para a direita.
* **W** — diminui o tamanho do carro.
* **S** — aumenta o tamanho do carro.

Enquanto o carro se movimenta, suas rodas também realizam uma rotação, criando uma animação contínua.

## Estrutura do projeto

```text
/
├── index.html
├── style.css
├── script.js
└── README.md
```

### `index.html`

Responsável pela estrutura da página e pelo elemento `<canvas>` utilizado para desenhar a cena.

### `style.css`

Responsável pela apresentação visual da página, incluindo o layout, cores, bordas, espaçamentos e área do Canvas.

### `script.js`

Contém toda a lógica da cena, desenho dos objetos, transformações geométricas, animação e interação com o teclado.

##  Transformações geométricas

### Translação

A translação é utilizada principalmente para movimentar o carro horizontalmente:

```js
ctx.translate(100 + carX, 0);
```

O valor de `carX` é atualizado de acordo com as teclas **A** e **D**, permitindo movimentar o carro pela cena.

Também é utilizada para posicionar o sistema de coordenadas no centro das rodas.

### Rotação

A rotação é aplicada às rodas:

```js
ctx.rotate(wheel_angle);
```

O valor de `wheel_angle` é atualizado enquanto o carro se movimenta, fazendo com que as rodas girem.

### Escala

A escala é utilizada nas nuvens:

```js
ctx.scale(scale, scale);
```

Isso permite utilizar a mesma função para criar nuvens de tamanhos diferentes.

Também é utilizada no carro:

```js
ctx.scale(car_scale * car_facing, car_scale);
```

O valor de `car_scale` permite aumentar ou diminuir o tamanho do carro através das teclas **W** e **S**.

## 🔗 Composição de transformações

O projeto combina diferentes transformações em sequência.

Nas rodas, por exemplo:

```js
ctx.translate(x, y);
ctx.rotate(wheel_angle);
```

Primeiro o sistema de coordenadas é deslocado para o centro da roda e, em seguida, a rotação é aplicada.

No carro também são combinadas translação, escala e reflexão.

##  Transformação em ponto fixo

A escala do carro utiliza um ponto fixo localizado aproximadamente na base do veículo.

A transformação segue o padrão:

```text
T → Op → T⁻¹
```

No código:

```js
ctx.translate(500, 455);
ctx.scale(car_scale * car_facing, car_scale);
ctx.translate(-500, -455);
```

Primeiro o ponto escolhido é levado para a origem, depois a escala é aplicada e, por fim, a transformação inversa retorna o sistema de coordenadas à posição original.

Dessa forma, o carro pode ser redimensionado mantendo sua base como referência.

##  Animação

A animação é realizada utilizando:

```js
requestAnimationFrame(animate);
```

A cada frame, a cena é atualizada e redesenhada.

Antes de realizar as transformações do novo frame, a matriz de transformação é restaurada:

```js
ctx.setTransform(1, 0, 0, 1, 0, 0);
```

Isso evita que as transformações sejam acumuladas entre os frames.

##  `save()` e `restore()`

O projeto utiliza `save()` e `restore()` para isolar as transformações de diferentes objetos.

Por exemplo, nas rodas:

```js
ctx.save();

ctx.translate(x, y);
ctx.rotate(wheel_angle);

...

ctx.restore();
```

Assim, a rotação aplicada à roda não interfere nos demais elementos da cena.

##  Reflexão

Como transformação adicional, o projeto utiliza uma reflexão horizontal para alterar a direção do carro:

```js
ctx.scale(car_scale * car_facing, car_scale);
```

Quando `car_facing` vale `1`, o carro mantém sua orientação normal.

Quando vale `-1`, o carro é refletido horizontalmente.

Essa transformação é utilizada quando o jogador alterna entre os movimentos para a direita e para a esquerda.

##  Cena

A cena é composta por:

* Céu com gradiente;
* Sol;
* Nuvens;
* Montanhas;
* Prédios;
* Estrada;
* Faixas da estrada;
* Carro;
* Rodas animadas.

Todos os elementos são desenhados diretamente utilizando a API **Canvas 2D**.

##  Como executar

Não é necessário instalar nenhuma dependência.

Basta abrir o arquivo:

```text
index.html
```

em um navegador compatível com HTML5 Canvas e utilizar as teclas **A**, **D**, **W** e **S** para interagir com o carro.



