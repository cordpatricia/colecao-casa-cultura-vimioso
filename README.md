# Coleção Digital – Museu Etnográfico da Casa da Cultura de Vimioso

Protótipo do repositório digital da coleção, preparado pela equipa do MORE CoLAB no âmbito do projeto
“Entre Memórias e Píxeis” (NORTE2030-FEDER-03007300), para o Município de Vimioso.

**Página da coleção:** https://cordpatricia.github.io/colecao-casa-cultura-vimioso/
**Ficha-modelo (cântara MECC.0193):** https://cordpatricia.github.io/colecao-casa-cultura-vimioso/ficha.html?id=MECC.0193

Cada ficha reúne:

- **Ficha de inventário** – identificação, tipologia, matéria, técnica, dimensões, descrição, proveniência,
  estado de conservação e localização, com o modelo 3D do objeto quando existe;
- **Património imaterial associado** – saber-fazer, usos e práticas, e testemunhos da comunidade
  (áudio e transcrição).

## Ficheiros

| Ficheiro | Conteúdo |
|---|---|
| `index.html` | Lista da coleção, com pesquisa |
| `ficha.html` | Ficha de um objeto (`ficha.html?id=<n.º de inventário>`) |
| `objects.json` | **Os dados da coleção** – um registo por objeto |
| `core.js` | Modelo de campos e funções comuns às páginas |
| `style.css` | Aspeto das páginas |
| `media/` | Imagens e áudios dos objetos |

## Como acrescentar um objeto

1. Carregar as imagens (e o áudio, se houver) para a pasta `media/`.
2. Abrir `objects.json` no GitHub e carregar no lápis (Edit).
3. Copiar o bloco da cântara (de `{` a `}`), colá-lo a seguir, separado por uma vírgula, e substituir os valores.
   Campos sem informação podem ser apagados.
4. Guardar com **Commit changes**. A página atualiza-se em 1–2 minutos.

O campo `inv` (n.º de inventário) é obrigatório e identifica a ficha no endereço. Os nomes dos campos estão
definidos em `core.js` (lista `F`).

## Estado

Ficha-modelo em validação pela museóloga do projeto. Conteúdos publicados com autorização do Município de
Vimioso e com o consentimento dos entrevistados. Todos os direitos reservados.
