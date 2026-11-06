# 🚌 CloudBus – AWS Serverless Bus Booking System

CloudBus is a serverless bus booking application built using HTML, CSS, JavaScript and AWS services.

Users can search for buses, select seats, enter passenger details, complete a demo payment and view their booking confirmation.

## 🚀 Project Overview

The application uses AWS serverless services to handle bus searches, seat availability, passenger bookings and email notifications.

## 🏗️ AWS Architecture

The project uses the following AWS services:

| AWS Service | Purpose |
|---|---|
| Amazon S3 | Static website hosting |
| AWS Lambda | Serverless backend processing |
| Amazon API Gateway | REST API endpoints |
| Amazon DynamoDB | Store bus, seat and booking data |
| Amazon SNS | Booking confirmation email notifications |
| Amazon CloudWatch | Lambda logs and monitoring |
| AWS IAM | Permissions and execution roles |

## ⚙️ Application Features

- Search buses by source and destination.
- View available seats.
- Select seats for a journey.
- Enter passenger details.
- Demo payment simulation.
- Generate booking confirmation and e-ticket.
- Receive booking confirmation through email.

## 🗄️ DynamoDB Tables

Three DynamoDB tables are used:

1. `cloudbus` – Stores bus information.
2. `cloudbus-booking` – Stores seat booking information.
3. `cloudbus-passengerbooking` – Stores passenger booking records.

## ⚡ AWS Lambda Functions

Three Lambda functions handle backend operations:

- `CloudBus-SearchBus` – Searches available buses.
- `CloudBus-GetSeats` – Retrieves seat availability.
- `CloudBus-BookTicket` – Processes passenger bookings and sends SNS notifications.

## 🌐 API Gateway Endpoints

| Method | Endpoint | Function |
|---|---|---|
| GET | /buses | SearchBus |
| GET | /seats | GetSeats |
| POST | /bookingticket | BookTicket |

## 📧 Email Notifications

Amazon SNS is integrated with the booking process to send booking confirmation emails.

## 📊 Monitoring

Amazon CloudWatch is used to monitor Lambda execution logs and troubleshoot errors.

## 💻 Technologies Used

- HTML
- CSS
- JavaScript
- Python
- AWS Lambda
- Amazon S3
- Amazon API Gateway
- Amazon DynamoDB
- Amazon SNS
- Amazon CloudWatch
- AWS IAM
- Git & GitHub

## 🔄 Booking Workflow

1. User opens the CloudBus website.
2. Searches for buses.
3. Selects available seats.
4. Enters passenger details.
5. Booking information is processed by AWS Lambda.
6. Booking data is stored in DynamoDB.
7. SNS sends a booking confirmation email.
8. User completes the demo payment flow and views the ticket confirmation.

## 📌 Project Information

**Project Name:** CloudBus – AWS Serverless Bus Booking System

**AWS Region:** Asia Pacific (Mumbai) – `ap-south-1`

**Hosting:** Amazon S3 Static Website Hosting

**Architecture:** Serverless

---

Developed as a hands-on AWS and Cloud Computing project.
