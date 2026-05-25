import { AggregateRoot } from "../entities/aggregate-root";
import type { UniqueEntityID } from "../entities/unique-entity-id";
import type { DomainEvent } from "./domain-event";
import { DomainEvents } from "./domain-events";
import { vi } from 'vitest'

class CustomAggregateCreated implements DomainEvent {

    public ocurredAt: Date;
    private aggregate: CustomAggregate

    constructor(aggregate: CustomAggregate) {
        this.ocurredAt = new Date()
        this.aggregate = aggregate
    }


    public getAggregateId(): UniqueEntityID {
        return this.aggregate.id
    }


}

class CustomAggregate extends AggregateRoot<any> {

    static create() {
        const aggregate = new CustomAggregate(null)

        aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))

        return aggregate
    }

}


describe('damain events', () => {
    it('should be able to dispatch and listen to events', () => {

        const callbackSpy = vi.fn()

        // Subscriber cadastrado (ouve o evento de resposta criada)
        DomainEvents.register(callbackSpy, CustomAggregateCreated.name)

        // Cria uma resposta sem salvar no banco
        const aggregate = CustomAggregate.create()

        // garante que o evento foi criado mas não foi disparado
        expect(aggregate.domainEvents).toHaveLength(1)

        // salva a resposta no banco a dispara o evento
        DomainEvents.dispatchEventsForAggregate(aggregate.id)

        // o subscriber ouve o evento e faz o que precisa ser feito com o dado
        expect(callbackSpy).toHaveBeenCalled()

        // limpa a fila
        expect(aggregate.domainEvents).toHaveLength(0)
    })
})