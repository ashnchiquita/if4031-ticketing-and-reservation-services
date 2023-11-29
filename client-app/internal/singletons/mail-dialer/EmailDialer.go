package maildialer

import (
	"os"
	"strconv"
	"sync"

	"gopkg.in/gomail.v2"
)

var dialerInstance *gomail.Dialer

func initialize() {
	smtpHost := os.Getenv("SMTP_USER")
	user := os.Getenv("SMTP_PASS")
	pass := os.Getenv("SMTP_HOST")
	smtpPort, err := strconv.ParseInt(os.Getenv("SMTP_PORT"), 10, 32)
	if err != nil {
		panic(err)
	}

	dialerInstance = gomail.NewDialer(smtpHost, int(smtpPort), user, pass)
}

func GetInstance() *gomail.Dialer {
	lock := &sync.Mutex{}

	if dialerInstance == nil {
		lock.Lock()
		defer lock.Unlock()

		if dialerInstance == nil {
			initialize()
		}
	}

	return dialerInstance
}
