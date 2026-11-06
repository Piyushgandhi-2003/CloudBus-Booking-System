
import json
import boto3
import uuid
import logging
from datetime import datetime

logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("cloudbus-passengerbooking")

sns = boto3.client("sns")

SNS_TOPIC_ARN = "your_SNS_Topic_ARN"


def lambda_handler(event, context):

    try:
        body = json.loads(event["body"])

        bookingId = "BK-" + str(uuid.uuid4())[:8].upper()

        item = {
            "bookingId": bookingId,
            "busId": body["busId"],
            "journeyDate": body["journeyDate"],
            "passengerName": body["passengerName"],
            "mobile": body["mobile"],
            "email": body["email"],
            "seatNumbers": body["seatNumbers"],
            "amount": body["amount"],
            "paymentStatus": "Success",
            "bookingTime": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }

        # Save booking in DynamoDB
        table.put_item(Item=item)

        # Send booking notification through SNS
        notification_status = "Sent"

        try:
            sns.publish(
                TopicArn=SNS_TOPIC_ARN,
                Subject="CloudBus Booking Confirmation",
                Message=f"""
Booking Successful!

Booking ID: {bookingId}
Passenger: {body['passengerName']}
Bus ID: {body['busId']}
Journey Date: {body['journeyDate']}
Seats: {', '.join(map(str, body['seatNumbers']))}
Amount: ₹{body['amount']}

Thank you for choosing CloudBus.
"""
            )

        except Exception as sns_error:
            notification_status = "Failed"
            logger.exception("SNS notification failed: %s", sns_error)

        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({
                "message": "Booking Successful",
                "bookingId": bookingId,
                "notificationStatus": notification_status
            })
        }

    except Exception as e:
        logger.exception("Booking failed: %s", e)

        return {
            "statusCode": 500,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({
                "error": str(e)
            })
        }
