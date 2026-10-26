# Coleção Digital – Museu Etnográfico da Casa da Cultura de Vimioso

Protótipo do repositório digital da coleção, preparado pela equipa do MORE CoLAB no âmbito do projeto
“Entre Memórias e Píxeis” (NORTE2030-FEDER-03007300), para o Município de Vimioso.

**Página da coleção:** `https://<utilizador>.github.io/<repositório>/`
**Ficha-modelo:** `ficha.html?id=MECC.0193`

Cada ficha reúne o registo de inventário, o património imaterial associado (com testemunhos da comunidade),
as representações digitais (modelo 3D, imagens, paradados) e a preparação do registo para a Europeana
(Europeana Data Model, níveis de qualidade e XML gerado automaticamente).

## Ficheiros

| Ficheiro | Conteúdo |
|---|---|
| `index.html` | Lista da coleção, com pesquisa |
| `ficha.html` | Ficha de inventário de um objeto (`ficha.html?id=<n.º de inventário>`) |
| `objects.json` | **Os dados da coleção** – um registo por objeto |
| `core.js` | Modelo de campos, avaliação Europeana e geração do registo EDM |
| `style.css` | Aspeto das páginas |
| `media/` | Imagens e áudios dos objetos |

## Como acrescentar um objeto

1. Carregar as imagens (e o áudio, se houver) para a pasta `media/`.
2. Abrir `objects.json` no GitHub e carregar no lápis (Edit).
3. Copiar o bloco da cântara (de `{` a `}`), colá-lo a seguir, separado por uma vírgula, e substituir os valores.
   Campos sem informação podem ser apagados.
4. Guardar com **Commit changes**. A página atualiza-se em 1–2 minutos.

O campo `inv` (n.º de inventário) é obrigatório e identifica a ficha no endereço. Os nomes dos campos e a
propriedade EDM correspondente estão definidos em `core.js` (lista `F`).

## Estado

Ficha-modelo em validação pela museóloga do projeto. Pendentes para a submissão à Europeana: declaração de
direitos (decisão do Município), finalidade da digitalização, agregador, endereços estáveis do ficheiro 3D,
da miniatura e da página do objeto, datação.
