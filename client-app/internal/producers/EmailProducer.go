package producers

import (
	"context"
	"log"
	"time"

	messagebroker "github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/singletons/message-broker"
	amqp "github.com/rabbitmq/amqp091-go"
)

func EmailProducer(email, subject, url string) error {
	conn := messagebroker.GetInstance()

	ch, err := conn.Channel()
	if err != nil {
		log.Printf("Failed to open a channel: %s", err.Error())
		return err
	}

	defer ch.Close()

	queue, err := ch.QueueDeclare("email_message", true, false, false, false, nil)
	if err != nil {
		log.Panicf("Failed to declare a queue: %s", err.Error())
		return err
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	body := []byte(`{
		"email": "` + email + `",
		"subject": "` + subject + `",
		"url": "` + url + `"
	}`)

	err = ch.PublishWithContext(ctx, "", queue.Name, false, false, amqp.Publishing{
		ContentType: "application/json",
		Body:        body,
	})
	if err != nil {
		log.Println(err.Error())
		return err
	}

	return nil
}
