import { CabecalhoComponent } from "./cabecalho.component"
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('CabecalhoComponent', () => {

  let component: CabecalhoComponent;
  let fixture: ComponentFixture<CabecalhoComponent>; // contem as informações do nosso componente "simulado"

  beforeEach(() => {
    // utilitario do angular
    TestBed.configureTestingModule({ // mocka modulo de testes
      imports: [CabecalhoComponent],
    });
    fixture = TestBed.createComponent(CabecalhoComponent); // Cria uma instancia segura do component
    component = fixture.componentInstance; // acessando a instancia do componente
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should define properties alt and src', () => {
    expect(component.alt).toBeDefined();
    expect(component.src).toBeDefined();
  });

  // teste snapshot
  it('should render correctly properties src and alt', () => {
    component.src = "https://example.com/test-image.jpg";
    component.alt = "Imagem teste";
    expect(component).toMatchSnapshot();
  });

})
