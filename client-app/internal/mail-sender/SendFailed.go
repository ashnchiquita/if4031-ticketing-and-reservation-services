package mailsender

import (
	maildialer "github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/singletons/mail-dialer"
	"gopkg.in/gomail.v2"
)

func SendFailedMail(email, url string) error {
	mail := gomail.NewMessage()
	mail.SetHeader("From", "halo@gmail.com")
	mail.SetHeader("To", email)

	mail.SetHeader("Subject", "Booking Failed")
	mail.SetBody("text/html", "Please open this URL: <a>"+url+"</a>")

	dialer := maildialer.GetInstance()

	if err := dialer.DialAndSend(mail); err != nil {
		return err
	}

	return nil
}
