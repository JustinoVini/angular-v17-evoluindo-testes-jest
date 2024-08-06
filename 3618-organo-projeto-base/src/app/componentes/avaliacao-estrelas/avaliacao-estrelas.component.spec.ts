import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AvaliacaoEstrelasComponent } from "./avaliacao-estrelas.component";
import { forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

describe('AvaliacaoEstrelasComponent', () => {

  let component: AvaliacaoEstrelasComponent;
  let fixture: ComponentFixture<AvaliacaoEstrelasComponent>; // contem as informações do nosso componente "simulado"

  beforeEach(() => {
    // utilitario do angular
    TestBed.configureTestingModule({ // mocka modulo de testes
      // declarations: [],
      imports: [AvaliacaoEstrelasComponent],
      providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => AvaliacaoEstrelasComponent),
          multi: true
        }
      ]
    });

    fixture = TestBed.createComponent(AvaliacaoEstrelasComponent); // Cria uma instancia segura do component
    component = fixture.componentInstance; // acessando a instancia do componente
    component.readOnly = false;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be define a value for classificacao when method writeValue was called', () => {
    const classificacao = 3; // mock Classificacao
    component.writeValue(classificacao)
    expect(component.classificacao).toBe(3);
  });

  it('should call onChange when classificar was called', () => {
    const onChangeSpy = jest.spyOn(component, 'onChange'); // método e componente
    const classificacao = 4;
    component.classificar(classificacao);
    expect(onChangeSpy).toHaveBeenCalled(); // verifica se foi chamado
  });

  it('should call onTouched when classificar was called', () => {
    const onChangeSpy = jest.spyOn(component, 'onTouched'); // método e componente
    const classificacao = 4;
    component.classificar(classificacao);
    expect(onChangeSpy).toHaveBeenCalled(); // verifica se foi chamado
  });

  it('should do not call update when classificar was called', () => {
    const onChangeSpy = jest.spyOn(component, 'onChange'); // método e componente
    component.readOnly = true;
    const classificar = 5;
    component.classificar(classificar);
    expect(onChangeSpy).not.toHaveBeenCalled();
    expect(component.classificacao).not.toBe(classificar);
  })

  it('should ignore invalid values and to assign 1 to classificacao', () => {
    const valoresInvalidos = [-6, 0, 'abc', undefined];
    valoresInvalidos.forEach(valorInvalido => { // para cada valor invalido vai setar a classificacao
      component.writeValue(valorInvalido as any);
      expect(component.classificacao).toBe(1);
    });
  });

  it('should update DOM when classificao changes', () => {
    const classificao = 3;
    component.classificar(classificao);
    // fixture.detectChanges();
    const estrelaPreenchida = fixture.nativeElement.querySelector('.filled') // acessa a raiz do elemento
    expect(estrelaPreenchida).toBeTruthy();
  });

});
