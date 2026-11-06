import json
import boto3
from decimal import Decimal

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("cloudbus-booking")


class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            if obj % 1 == 0:
                return int(obj)
            return float(obj)
        return super().default(obj)


def lambda_handler(event, context):

    try:

        params = event.get("queryStringParameters") or {}

        busId = params.get("busId")
        journeyDate = params.get("journeyDate")

        if not busId or not journeyDate:
            return {
                "statusCode": 400,
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                "body": json.dumps({
                    "message": "busId and journeyDate are required"
                })
            }

        response = table.get_item(
            Key={
                "busId": busId,
                "journeyDate": journeyDate
            }
        )

        item = response.get("Item")

        if item:

            bookedSeats = item.get("seatNumbers", [])

            bookedSeats = [
                int(x) if isinstance(x, Decimal) else x
                for x in bookedSeats
            ]

        else:

            bookedSeats = []

        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({
                "bookedSeats": bookedSeats
            })
        }

    except Exception as e:

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