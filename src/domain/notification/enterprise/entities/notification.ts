import { Entity } from "@/core/entities/entity";
import type { UniqueEntityID } from "@/core/entities/unique-entity-id";
import type { Optional } from "@/core/types/optional";

export interface NotificationProps {
    recipientId: UniqueEntityID
    title: string
    content: string
    readAt?: Date | null
    createdAt: Date
}

export class Notification extends Entity<NotificationProps> {
    get recipientId(): UniqueEntityID {
        return this.props.recipientId;
    }

    get title(): string {
        return this.props.title;
    }



    get content(): string {
        return this.props.content;
    }


    get createdAt(): Date {
        return this.props.createdAt;
    }
    get readAt(){
        return this.props.readAt
    }

    read() {
        return this.props.readAt = new Date()
    }

    static create(props: Optional<NotificationProps, 'createdAt'>,
        id?: UniqueEntityID
    ) {
        const notification = new Notification(
            {
                ...props,
                createdAt: props.createdAt ?? new Date()
            },
            id
        )
        return notification
    }
}