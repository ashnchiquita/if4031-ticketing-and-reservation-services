package messagebroker

import (
	"fmt"
	"log"
	"os"
	"sync"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
)

var brokerInstance *amqp.Connection

func initialize() {
	var err error

	tryAttempt := 0

	user := os.Getenv("MESSAGE_BROKER_USER")
	pass := os.Getenv("MESSAGE_BROKER_PASSWORD")
	port := os.Getenv("MESSAGE_BROKER_PORT")

	dsn := fmt.Sprintf("amqp://%s:%s@tubes-message-broker:%s/", user, pass, port)

	brokerInstance, err = amqp.Dial(dsn)
	for err != nil && tryAttempt < 5 {
		log.Printf("[RETRYING] Failed to connect to RabbitMQ: %s", err.Error())
		time.Sleep(10 * time.Second)
		brokerInstance, err = amqp.Dial(dsn)
		tryAttempt++
	}

	if err != nil {
		log.Panicf("[FAIL] Failed to connect to RabbitMQ: %s", err.Error())
		return
	}
}

func GetInstance() *amqp.Connection {
	lock := &sync.Mutex{}

	if brokerInstance == nil {
		lock.Lock()
		defer lock.Unlock()

		if brokerInstance == nil {
			initialize()
		}
	}

	return brokerInstance
}

func CloseInstance() {
	brokerInstance.Close()
}
