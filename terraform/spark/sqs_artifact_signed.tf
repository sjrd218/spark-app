resource "aws_sqs_queue" "artifact_signed" {
  name                      = "${local.short_env}-spark-artifact-signed"
  redrive_policy            = "{\"deadLetterTargetArn\":\"${aws_sqs_queue.artifact_signed_deadletter.arn}\",\"maxReceiveCount\":4}"
}

resource "aws_sqs_queue" "artifact_signed_deadletter" {
  name                      = "${local.short_env}-spark-artifact-signed-deadletter"
}

resource "aws_sqs_queue_policy" "artifact_signed" {
  queue_url = "${aws_sqs_queue.artifact_signed.id}"
  policy = "${data.aws_iam_policy_document.artifact-signed-sqs-policy.json}"
}

data "aws_iam_policy_document" "artifact-signed-sqs-policy" {
  policy_id = "__default_policy_ID"

  statement {
    actions = ["sqs:SendMessage"]

    condition {
      test     = "ArnEquals"
      variable = "aws:SourceArn"

      values = [
        "${aws_sns_topic.artifact_signed.arn}",
      ]
    }

    effect = "Allow"

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    resources = [
      "${aws_sqs_queue.artifact_signed.arn}",
    ]

    sid = "__default_statement_ID"
  }
}

output "sqs_queue_spark_artifact_signed" {
  value = {
    "arn" = "${aws_sqs_queue.artifact_signed.arn}"
    "url" = "${aws_sqs_queue.artifact_signed.id}"
  }
}
