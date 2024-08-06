import { TestBed } from "@angular/core/testing";
import { GeneroLiterario, Livro } from "../componentes/livro/livro";
import { livros } from "../mock-livros";
import { ErroGeneroLiterario, LivroService } from "./livro.service";

// padrão AAA arrange act assert
describe('LivroService', () => {
  let service: LivroService; // inicializando o service

  beforeEach(() => { // executa antes de cada teste
    TestBed.configureTestingModule({
      providers: [LivroService]
    })
    // service = new LivroService(); jeito errado
    service = TestBed.inject(LivroService) // injeta o serviço para teste
  })

  it('should be created', () => {
    //condição
    expect(service).toBeTruthy(); //expectativa
  });

  it('should create a new book', () => {

    // cria um mock de livros
    const novoLivro: Livro = {
      titulo: "Novo Livro",
      autoria: "Autor Desconhecido",
      imagem: "http://example.com/cover.jpg",
      genero: {
        id: 'romance',
        value: 'romance'
      },
      dataLeitura: "2024-04-19",
      classificacao: 5
    };

    // chamando o método
    service.adicionarLivro(novoLivro); //chama o service e traz e mocka os livros

    const livrosPorGenero = service.obterLivrosPorGenero('romance');
    expect(livrosPorGenero).toContain(novoLivro); //expera que contenha um novo livro que contenha "romance"

  });

  it('should return correctly book with gender', () => {

    const livrosPorGenero = service.obterLivrosPorGenero("romance");

    const livrosEsperados = livros.filter(livros => livros.genero.id === "romance")
    expect(livrosPorGenero).toEqual(livrosEsperados);

  });

  it('should initialize genders correctly', () => {
    const generosEsperados: GeneroLiterario[] = [
      { id: 'romance', value: 'Romance' },
      { id: 'misterio', value: 'Mistério' },
      { id: 'fantasia', value: 'Fantasia' },
      { id: 'ficcao-cientifica', value: 'Ficção Científica' },
      { id: 'tecnicos', value: 'Técnicos' },
    ]

    expect(service.generos).toEqual(generosEsperados);

  });

  it('should throw error trying to create a new book', () => {
    const novoLivro: Livro = {
      titulo: "Novo Livro",
      autoria: "Autor Desconhecido",
      imagem: "http://example.com/cover.jpg",
      genero: {
        id: 'nao-existe',
        value: 'Não Existe'
      },
      dataLeitura: "2024-04-19",
      classificacao: 5
    };

    expect(() => service.adicionarLivro(novoLivro)).toThrow(ErroGeneroLiterario);
  });

});
