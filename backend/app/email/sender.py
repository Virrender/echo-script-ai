
import smtplib
from email.message import EmailMessage

from app.config import (
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USERNAME,
    SMTP_PASSWORD,
)


def send_email(to_email: str, subject: str, body: str):
    message = EmailMessage()

    message["From"] = SMTP_USERNAME
    message["To"] = to_email
    message["Subject"] = subject

    message.set_content(body)


    with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=10) as server:
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
        server.send_message(message)